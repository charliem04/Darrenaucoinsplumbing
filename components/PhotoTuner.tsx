"use client";

/**
 * The photo tuner: a local-only tool for reframing the site's photos by
 * dragging them. Never part of a production build — it only loads under
 * `npm run tune` (see components/PhotoTunerMount and scripts/tune.mjs).
 *
 *   - Every tunable photo (anything with data-photo, see lib/framing) is
 *     outlined. Drag one to slide the photo inside its frame.
 *   - Each photo has a mobile and a desktop framing. The tuner edits the
 *     one for the width the window is at now (below 1024px = mobile), and
 *     the panel says which.
 *   - The panel's slider zooms in; arrow keys nudge (Shift = bigger steps).
 *   - Each change is saved to content/photoFraming.json by the little
 *     writer that `npm run tune` starts, and the dev server reloads it.
 *     If the writer isn't running, "Copy values" puts them on the clipboard.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CENTRE,
  DESKTOP_QUERY,
  framings as fromFile,
  framingVars,
  type FrameMode,
  type Framing,
  type FramingMap,
  type PhotoFraming,
} from "@/lib/framing";

const WRITER = "http://127.0.0.1:4174/framing";
const ZOOM_MAX = 2.5;
const MODES: FrameMode[] = ["mobile", "desktop"];
const MODE_LABEL: Record<FrameMode, string> = {
  mobile: "Mobile (under 1024px wide)",
  desktop: "Desktop (1024px and wider)",
};
const OTHER: Record<FrameMode, FrameMode> = { mobile: "desktop", desktop: "mobile" };

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const r1 = (v: number) => Math.round(v * 10) / 10;
const r2 = (v: number) => Math.round(v * 100) / 100;
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v));
const BOTH_CENTRE: PhotoFraming = { mobile: CENTRE, desktop: CENTRE };

/** Names shown in the panel. */
function nameOf(key: string) {
  if (key === "hero") return "Hero photo (truck)";
  if (key === "about") return "About photo (equipment)";
  if (key.startsWith("service:")) return `What we handle: ${key.slice(8)}`;
  return key;
}

/** Paint both framings onto every element showing that photo (CSS picks one by width). */
function paint(key: string, p: PhotoFraming) {
  document.querySelectorAll<HTMLElement>(`[data-photo="${CSS.escape(key)}"]`).forEach((el) => {
    for (const m of MODES) {
      for (const [prop, value] of Object.entries(framingVars(m, p[m]))) el.style.setProperty(prop, value);
    }
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
  const [map, setMap] = useState<FramingMap>(() => clone(fromFile));
  const mapRef = useRef(map);
  mapRef.current = map;
  const start = useRef<FramingMap>(clone(fromFile));
  const [sel, setSel] = useState<string | null>(null);
  const selRef = useRef(sel);
  selRef.current = sel;
  const [mode, setMode] = useState<FrameMode>("desktop");
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const [status, setStatus] = useState<Status>("idle");
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const saveTimer = useRef<number>();

  // Which framing is being edited follows the window width.
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const sync = () => setMode(mq.matches ? "desktop" : "mobile");
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

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

  /** Change one photo's framing for the current mode: paint it now, save shortly. */
  const set = useCallback(
    (key: string, f: Framing, wait?: number) => {
      const m = modeRef.current;
      const prev = mapRef.current[key] ?? BOTH_CENTRE;
      const photo: PhotoFraming = { ...prev, [m]: { x: r1(f.x), y: r1(f.y), zoom: r2(f.zoom) } };
      const next = { ...mapRef.current, [key]: photo };
      mapRef.current = next;
      setMap(next);
      paint(key, photo);
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
    const repaint = () => Object.entries(mapRef.current).forEach(([k, p]) => paint(k, p));
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
      const f0 = (mapRef.current[key] ?? BOTH_CENTRE)[modeRef.current];
      setSel(key);
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
      const f = (mapRef.current[k] ?? BOTH_CENTRE)[modeRef.current];
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

  const photo = sel ? (map[sel] ?? BOTH_CENTRE) : null;
  const f = photo ? photo[mode] : null;
  const other = photo ? photo[OTHER[mode]] : null;
  const changed = Object.keys(map).filter((k) => !same(map[k], start.current[k])).length;

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
      className="fixed bottom-4 right-4 z-[200] w-[19rem] max-w-[calc(100vw-2rem)] rounded-lg bg-white text-[0.8125rem] text-ink shadow-2xl"
    >
      <div className="flex items-center justify-between gap-2 border-b border-ink/10 px-3 py-2">
        <strong className="font-display text-[0.9375rem]">Photo tuner</strong>
        <button type="button" onClick={() => setOpen((o) => !o)} className={btn}>
          {open ? "Hide" : "Show"}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-3 p-3">
          {/* Which framing a drag will change. */}
          <div className="rounded bg-teal/10 px-2.5 py-1.5">
            <span className="text-ink-2">Editing: </span>
            <strong>{MODE_LABEL[mode]}</strong>
            <span className="block text-ink-2">
              {mode === "desktop"
                ? "Make the window narrower than 1024px to edit the mobile framing."
                : "Widen the window to 1024px or more to edit the desktop framing."}
            </span>
          </div>

          {!sel || !f || !other ? (
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
                <button type="button" className={btn} onClick={() => set(sel, other)} disabled={same(f, other)}>
                  Same as {OTHER[mode]}
                </button>
                <button
                  type="button"
                  className={btn}
                  onClick={() => set(sel, (start.current[sel] ?? BOTH_CENTRE)[mode])}
                  disabled={same(f, (start.current[sel] ?? BOTH_CENTRE)[mode])}
                >
                  Undo changes
                </button>
              </div>
              <p className="text-ink-2">Arrow keys nudge (Shift for bigger steps).</p>
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
