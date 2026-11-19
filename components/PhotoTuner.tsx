"use client";

/**
 * The photo tuner: a local-only tool for reframing the site's photos by
 * dragging them. Never part of a production build — it only loads under
 * `npm run tune` (see components/PhotoTunerMount and scripts/tune.mjs).
 *
 *   - Every tunable photo (anything with data-photo, see lib/framing) is
 *     outlined. Drag one to slide the photo inside its frame.
 *   - The panel's slider zooms in; arrow keys nudge (Shift = bigger steps).
 *   - Each change is saved to content/photoFraming.json by the little
 *     writer that `npm run tune` starts, and the dev server reloads it.
 *     If the writer isn't running, "Copy values" puts them on the clipboard.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { framings as fromFile, type Framing, type FramingMap } from "@/lib/framing";

const WRITER = "http://127.0.0.1:4174/framing";
const ZOOM_MAX = 2.5;
const CENTRE: Framing = { x: 50, y: 50, zoom: 1 };

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const r1 = (v: number) => Math.round(v * 10) / 10;
const r2 = (v: number) => Math.round(v * 100) / 100;

/** Names shown in the panel. */
function nameOf(key: string) {
  if (key === "hero") return "Hero photo (truck)";
  if (key === "about") return "About photo (equipment)";
  if (key.startsWith("service:")) return `What we handle: ${key.slice(8)}`;
  return key;
}

/** Paint a framing onto every element showing that photo. */
function paint(key: string, f: Framing) {
  const at = `${f.x}% ${f.y}%`;
  document.querySelectorAll<HTMLElement>(`[data-photo="${CSS.escape(key)}"]`).forEach((el) => {
    el.style.objectPosition = at;
    el.style.transformOrigin = at;
    el.style.transform = f.zoom === 1 ? "" : `scale(${f.zoom})`;
  });
}

/**
 * How far the photo can travel inside its frame, in px, at a zoom.
 * x/y are percentages of exactly this distance (as with object-position
 * on the zoomed photo), so a drag of N px moves the value N/overflow.
 */
function overflow(img: HTMLImageElement, zoom: number) {
  const cw = img.clientWidth;
  const ch = img.clientHeight;
  const nw = img.naturalWidth || cw;
  const nh = img.naturalHeight || ch;
  const cover = getComputedStyle(img).objectFit === "cover";
  const s = cover ? Math.max(cw / nw, ch / nh) : 1;
  const rw = cover ? nw * s : cw;
  const rh = cover ? nh * s : ch;
  return { x: rw * zoom - cw, y: rh * zoom - ch };
}

type Status = "idle" | "saving" | "saved" | "offline";

export default function PhotoTuner() {
  const [map, setMap] = useState<FramingMap>(() => JSON.parse(JSON.stringify(fromFile)));
  const mapRef = useRef(map);
  mapRef.current = map;
  const start = useRef<FramingMap>(JSON.parse(JSON.stringify(fromFile)));
  const [sel, setSel] = useState<string | null>(null);
  const selRef = useRef(sel);
  selRef.current = sel;
  const [status, setStatus] = useState<Status>("idle");
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const saveTimer = useRef<number>();

  const save = useCallback(async (m: FramingMap) => {
    setStatus("saving");
    try {
      const res = await fetch(WRITER, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(m),
      });
      setStatus(res.ok ? "saved" : "offline");
    } catch {
      setStatus("offline");
    }
  }, []);

  const saveSoon = useCallback(
    (m: FramingMap, wait = 400) => {
      window.clearTimeout(saveTimer.current);
      saveTimer.current = window.setTimeout(() => save(m), wait);
    },
    [save],
  );

  /** Change one photo's framing: paint it now, save shortly. */
  const set = useCallback(
    (key: string, f: Framing, wait?: number) => {
      const next = { ...mapRef.current, [key]: { x: r1(f.x), y: r1(f.y), zoom: r2(f.zoom) } };
      mapRef.current = next;
      setMap(next);
      paint(key, next[key]);
      saveSoon(next, wait);
    },
    [saveSoon],
  );

  // Outline the tunable photos; the selected one gets a solid outline.
  useEffect(() => {
    const style = document.createElement("style");
    const selRule = sel
      ? `:has(> [data-photo="${CSS.escape(sel)}"]){outline:3px solid #f59e0b!important;outline-offset:-3px}`
      : "";
    style.textContent = `
      [data-photo]{cursor:grab!important;-webkit-user-drag:none;user-select:none;touch-action:none}
      :has(> [data-photo]){outline:2px dashed rgba(245,158,11,.85);outline-offset:-2px}
      html.photo-tuner-dragging,html.photo-tuner-dragging *{cursor:grabbing!important}
      ${selRule}`;
    document.head.appendChild(style);
    return () => style.remove();
  }, [sel]);

  // Photos that mount later (switching a service tab) get the current values.
  useEffect(() => {
    const repaint = () => Object.entries(mapRef.current).forEach(([k, f]) => paint(k, f));
    repaint();
    const mo = new MutationObserver(repaint);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);

  // Dragging.
  useEffect(() => {
    let drag: {
      key: string;
      sx: number;
      sy: number;
      f0: Framing;
      ov: { x: number; y: number };
      moved: boolean;
    } | null = null;

    const photoAt = (x: number, y: number) =>
      document
        .elementsFromPoint(x, y)
        .find((el): el is HTMLImageElement => el instanceof HTMLImageElement && el.dataset.photo !== undefined);

    const down = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const t = e.target as Element;
      if (panel.current?.contains(t)) return;
      // A button or link sitting on a photo still works as itself.
      if (t.closest("button, a, input, select, textarea, [role=tab]")) return;
      const img = photoAt(e.clientX, e.clientY);
      if (!img) return;
      e.preventDefault();
      e.stopPropagation();
      const key = img.dataset.photo!;
      const f0 = mapRef.current[key] ?? CENTRE;
      setSel(key);
      setOpen(true);
      drag = { key, sx: e.clientX, sy: e.clientY, f0, ov: overflow(img, f0.zoom), moved: false };
      document.documentElement.classList.add("photo-tuner-dragging");
    };

    const move = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.sx;
      const dy = e.clientY - drag.sy;
      if (!drag.moved && Math.abs(dx) + Math.abs(dy) < 3) return;
      drag.moved = true;
      e.preventDefault();
      // Dragging right shows more of the left side: x goes down.
      const x = drag.ov.x > 1 ? clamp(drag.f0.x - (dx / drag.ov.x) * 100, 0, 100) : drag.f0.x;
      const y = drag.ov.y > 1 ? clamp(drag.f0.y - (dy / drag.ov.y) * 100, 0, 100) : drag.f0.y;
      set(drag.key, { ...drag.f0, x, y }, 600);
    };

    const up = () => {
      if (!drag) return;
      if (drag.moved) {
        // Swallow the click the drag would otherwise fire.
        const eat = (ev: MouseEvent) => {
          ev.preventDefault();
          ev.stopPropagation();
        };
        window.addEventListener("click", eat, { capture: true, once: true });
        window.setTimeout(() => window.removeEventListener("click", eat, { capture: true }), 50);
      }
      drag = null;
      document.documentElement.classList.remove("photo-tuner-dragging");
    };

    const noDrag = (e: DragEvent) => {
      if ((e.target as HTMLElement)?.dataset?.photo !== undefined) e.preventDefault();
    };

    window.addEventListener("pointerdown", down, { capture: true });
    window.addEventListener("pointermove", move, { capture: true });
    window.addEventListener("pointerup", up, { capture: true });
    window.addEventListener("pointercancel", up, { capture: true });
    window.addEventListener("dragstart", noDrag, { capture: true });
    return () => {
      window.removeEventListener("pointerdown", down, { capture: true });
      window.removeEventListener("pointermove", move, { capture: true });
      window.removeEventListener("pointerup", up, { capture: true });
      window.removeEventListener("pointercancel", up, { capture: true });
      window.removeEventListener("dragstart", noDrag, { capture: true });
    };
  }, [set]);

  // Arrow keys nudge the selected photo; Shift for bigger steps.
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      const k = selRef.current;
      if (!k) return;
      const t = e.target as HTMLElement;
      if (t.matches("input:not([type=range]), textarea, select")) return;
      const step = e.shiftKey ? 5 : 1;
      const f = mapRef.current[k] ?? CENTRE;
      const moves: Record<string, Partial<Framing>> = {
        ArrowLeft: { x: clamp(f.x - step, 0, 100) },
        ArrowRight: { x: clamp(f.x + step, 0, 100) },
        ArrowUp: { y: clamp(f.y - step, 0, 100) },
        ArrowDown: { y: clamp(f.y + step, 0, 100) },
      };
      if (!(e.key in moves)) return;
      e.preventDefault();
      set(k, { ...f, ...moves[e.key] });
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [set]);

  const f = sel ? (map[sel] ?? CENTRE) : null;
  const changed = Object.keys(map).filter(
    (k) => JSON.stringify(map[k]) !== JSON.stringify(start.current[k]),
  ).length;

  const copy = async () => {
    await navigator.clipboard.writeText(JSON.stringify(mapRef.current, null, 2));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const btn =
    "rounded border border-ink/20 px-2.5 py-1 font-semibold hover:bg-ink/5 active:bg-ink/10 disabled:opacity-40";

  return (
    <div
      ref={panel}
      role="region"
      aria-label="Photo tuner"
      className="fixed bottom-4 right-4 z-[200] w-[19rem] rounded-lg bg-white text-[0.8125rem] text-ink shadow-2xl"
    >
      <div className="flex items-center justify-between gap-2 border-b border-ink/10 px-3 py-2">
        <strong className="font-display text-[0.9375rem]">Photo tuner</strong>
        <button type="button" onClick={() => setOpen((o) => !o)} className={btn}>
          {open ? "Hide" : "Show"}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-3 p-3">
          {!sel || !f ? (
            <p className="text-ink-2">
              Drag any photo with an orange outline to choose which part of it shows. Select one to zoom.
            </p>
          ) : (
            <>
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold">{nameOf(sel)}</span>
                <span className="tabular text-ink-2">
                  x {f.x}% · y {f.y}% · zoom {f.zoom.toFixed(2)}×
                </span>
              </div>
              <label className="flex items-center gap-2">
                <span className="w-10 shrink-0">Zoom</span>
                <input
                  type="range"
                  min={1}
                  max={ZOOM_MAX}
                  step={0.01}
                  value={f.zoom}
                  onChange={(e) => set(sel, { ...f, zoom: Number(e.target.value) })}
                  className="w-full accent-[rgb(var(--teal))]"
                />
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button type="button" className={btn} onClick={() => set(sel, { ...f, x: 50, y: 50 })}>
                  Centre
                </button>
                <button type="button" className={btn} onClick={() => set(sel, { ...f, zoom: 1 })} disabled={f.zoom === 1}>
                  No zoom
                </button>
                <button
                  type="button"
                  className={btn}
                  onClick={() => set(sel, start.current[sel] ?? CENTRE)}
                  disabled={JSON.stringify(f) === JSON.stringify(start.current[sel])}
                >
                  Undo changes
                </button>
              </div>
              <p className="text-ink-2">
                Arrow keys nudge (Shift for bigger steps). The same framing is used at every screen size.
              </p>
            </>
          )}

          <div className="flex items-center justify-between gap-2 border-t border-ink/10 pt-2.5">
            <span className={status === "offline" ? "text-danger-ink" : "text-ink-2"}>
              {status === "saving" && "Saving…"}
              {status === "saved" && "Saved to photoFraming.json"}
              {status === "offline" && "Not saved: start with npm run tune"}
              {status === "idle" && (changed ? `${changed} changed` : "No changes yet")}
            </span>
            <button type="button" className={btn} onClick={copy}>
              {copied ? "Copied" : "Copy values"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
