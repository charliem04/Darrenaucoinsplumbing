"use client";

/**
 * The phone "drift": a horizontal scroller that glides left on its own
 * at a slow, even pace and loops forever. Shared by the card rails
 * (components/Rail) and the service chip row (components/Services), so
 * every moving row on the page moves the same way.
 *
 * ── HOW THE LOOP WORKS ──────────────────────────────────────────────
 * The scroller's items are rendered twice; the second set is a visual
 * copy (<DriftCopy>: inert, aria-hidden). When the glide has travelled
 * exactly one set's width it jumps back by that width — the copy is
 * pixel-identical, so the jump can't be seen. Components that must not
 * exist twice for real (a Framer layoutId) read useDriftCopy() and
 * render a plain look-alike inside the copy.
 *
 * ── STAYING OUT OF THE WAY ──────────────────────────────────────────
 *   - A touch, wheel, key or focus in the row holds the glide (and, if
 *     the view is on the copy, moves it back onto the real items first,
 *     unseen); it resumes RESUME_MS after the last touch.
 *   - Only while the row is on screen, the tab is visible and no dialog
 *     is open; phones only; never under prefers-reduced-motion.
 *
 * There is deliberately no pause button (the client's call). A hand on
 * the row stops it; reduced motion stops it entirely.
 */
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

/** Glide speed, px per second: slow enough to read what passes. */
export const DRIFT_SPEED = 24;
/** Quiet time after a touch before the glide picks up again. */
const RESUME_MS = 6000;
const PHONE_QUERY = "(max-width: 767px)";

const CopyContext = createContext(false);
/** True inside the visual copy of a drifting row. */
export const useDriftCopy = () => useContext(CopyContext);

/** Wraps the copy set's content so children can tell they are the copy. */
export function DriftCopyProvider({ children }: { children: ReactNode }) {
  return <CopyContext.Provider value={true}>{children}</CopyContext.Provider>;
}

/** Ref callback for a copy item: unreachable by keyboard and assistive tech. */
export const inertRef = (el: HTMLElement | null) => {
  if (el) el.inert = true;
};

export function useDrift({
  scroller,
  area,
  count,
  speed = DRIFT_SPEED,
}: {
  /** The overflow-x element that scrolls. */
  scroller: RefObject<HTMLElement>;
  /** The element whose touches should hold the glide (the row and its extras). */
  area: RefObject<HTMLElement>;
  /** How many REAL items the scroller holds (the copy follows them). */
  count: number;
  speed?: number;
}) {
  const [canDrift, setCanDrift] = useState(false);
  const [inView, setInView] = useState(false);
  const [holding, setHolding] = useState(false);
  const resumeTimer = useRef<number>();
  const drifting = canDrift && inView && !holding;

  /** Width of one full set of items (the loop length). */
  const setWidth = useCallback(() => {
    const el = scroller.current;
    if (!el || el.children.length <= count) return 0;
    return (el.children[count] as HTMLElement).offsetLeft - (el.children[0] as HTMLElement).offsetLeft;
  }, [scroller, count]);

  // Phones only, motion allowed, something to loop.
  useEffect(() => {
    const phone = window.matchMedia(PHONE_QUERY);
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const check = () => setCanDrift(phone.matches && !calm.matches && count > 1);
    check();
    phone.addEventListener("change", check);
    calm.addEventListener("change", check);
    return () => {
      phone.removeEventListener("change", check);
      calm.removeEventListener("change", check);
    };
  }, [count]);

  // On screen?
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [scroller]);

  // A hand on the row holds the glide.
  useEffect(() => {
    const node = area.current;
    if (!node) return;
    const hold = () => {
      const el = scroller.current;
      const w = setWidth();
      if (el && w && el.scrollLeft >= w) el.scrollLeft -= w; // back onto the real items, unseen
      setHolding(true);
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = window.setTimeout(() => setHolding(false), RESUME_MS);
    };
    const events = ["pointerdown", "touchstart", "wheel", "keydown", "focusin"] as const;
    events.forEach((ev) => node.addEventListener(ev, hold, { passive: true }));
    return () => {
      events.forEach((ev) => node.removeEventListener(ev, hold));
      window.clearTimeout(resumeTimer.current);
    };
  }, [area, scroller, setWidth]);

  // The glide: frame by frame, looping by one set.
  useEffect(() => {
    const el = scroller.current;
    if (!drifting || !el) return;
    let raf = 0;
    let last = 0;
    let x = el.scrollLeft; // float accumulator — scrollLeft rounds
    const step = (t: number) => {
      if (last && !document.hidden && !document.querySelector('[role="dialog"]')) {
        x += speed * (Math.min(t - last, 64) / 1000); // clamp after a stall
        const w = setWidth();
        if (w && x >= w) x -= w;
        el.scrollLeft = x;
      } else {
        x = el.scrollLeft; // re-sync after a pause
      }
      last = t;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [drifting, scroller, setWidth, speed]);

  return { canDrift, drifting, setWidth };
}

/**
 * Blurred screen edges for a drifting row: at each border a strip that
 * blurs what passes under it, fading from full blur at the edge to none,
 * tinted to the ground the row sits on. Place inside a `relative`
 * wrapper around the scroller. Never catches a tap.
 */
export function DriftEdges({ tone = "light" }: { tone?: "light" | "dark" }) {
  const tint = tone === "dark" ? "from-navy/70" : "from-ground/80";
  const base =
    "pointer-events-none absolute inset-y-0 w-10 backdrop-blur-[3px] to-transparent";
  return (
    <>
      <span
        aria-hidden="true"
        className={`${base} -left-5 bg-gradient-to-r ${tint} [mask-image:linear-gradient(to_right,black,transparent)] [-webkit-mask-image:linear-gradient(to_right,black,transparent)]`}
      />
      <span
        aria-hidden="true"
        className={`${base} -right-5 bg-gradient-to-l ${tint} [mask-image:linear-gradient(to_left,black,transparent)] [-webkit-mask-image:linear-gradient(to_left,black,transparent)]`}
      />
    </>
  );
}
