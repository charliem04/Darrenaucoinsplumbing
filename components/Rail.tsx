"use client";

/**
 * A horizontal swipe rail for phones; an ordinary grid from md up.
 *
 * Stacking every card in one narrow column made the phone page a long,
 * squeezed scroll with everything at equal weight. A rail lays a set of
 * like things side by side instead: one card in focus, the next one
 * peeking in from the edge, and the page itself stays short.
 *
 *   - Native scroll with CSS snap: momentum and edge-bounce come from
 *     the platform, so it feels like the phone, not like a widget.
 *   - The rail bleeds to the screen edges (negative margin) but snaps
 *     cards to the page's own 20px gutter.
 *   - The indicator under it follows the scroll live, and its dots are
 *     buttons, so the rail can be driven without swiping.
 *
 * ── PASSIVE DRIFT ───────────────────────────────────────────────────
 * Left alone, the rail softly moves to the next card every few seconds
 * — the motion itself is the hint that this scrolls sideways. The
 * current dot fills like a timer, so the next move is never a surprise.
 * It is deliberately polite:
 *
 *   - only while the rail is on screen and actually scrollable (never
 *     at md+, where it is a grid);
 *   - any touch, wheel, key or focus inside it stops the drift, which
 *     resumes RESUME_MS after the last interaction;
 *   - never while a dialog is open over the page;
 *   - never under prefers-reduced-motion;
 *   - a pause / play button beside the counter (WCAG 2.2.2: anything
 *     that moves on its own for more than five seconds must be
 *     pausable). An explicit pause sticks until play is pressed.
 *
 * At md+ the same children render in `gridClassName`, unchanged.
 */
import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/** Time on each card before drifting to the next. */
const DWELL_MS = 4500;
/** Quiet time after a touch before the drift picks up again. */
const RESUME_MS = 7000;

export function Rail({
  children,
  label,
  gridClassName,
  itemClassName = "basis-[84%]",
  tone = "light",
  as: Tag = "ul",
}: {
  children: ReactNode;
  /** Names the rail for screen readers, e.g. "Specialty services". */
  label: string;
  /** Layout at md and up. */
  gridClassName: string;
  /** Card width on phones — how much of the next card peeks in. */
  itemClassName?: string;
  tone?: "light" | "dark";
  as?: "ul" | "div";
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLElement>(null);
  const items = Children.toArray(children);
  const [active, setActive] = useState(0);

  // Drift conditions.
  const [canDrift, setCanDrift] = useState(false); // scrollable + motion allowed
  const [inView, setInView] = useState(false);
  const [holding, setHolding] = useState(false); // a hand was just here
  const [userPaused, setUserPaused] = useState(false); // the pause button
  const [tick, setTick] = useState(0); // re-arms the timer when a dialog blocked a step
  const resumeTimer = useRef<number>();
  const drifting = canDrift && inView && !holding && !userPaused;

  // Which card is current, from the scroll position.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const kids = Array.from(el.children) as HTMLElement[];
      const left = el.scrollLeft + el.clientWidth * 0.33;
      let i = 0;
      for (let k = 0; k < kids.length; k++) if (kids[k].offsetLeft <= left) i = k;
      // At the very end the last card may never reach the 1/3 line.
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) i = kids.length - 1;
      setActive(i);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Is drifting allowed here at all? Scrollable (phones) and motion OK.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const check = () => setCanDrift(!mq.matches && el.scrollWidth > el.clientWidth + 4);
    check();
    mq.addEventListener("change", check);
    window.addEventListener("resize", check);
    return () => {
      mq.removeEventListener("change", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  // On screen?
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // A hand on the rail (or its dots) holds the drift; quiet time releases it.
  useEffect(() => {
    const node = wrap.current;
    if (!node) return;
    const hold = (e: Event) => {
      // The pause/play button is a decision about the drift, not a hand
      // on the cards — pressing play should not then wait RESUME_MS.
      if ((e.target as Element | null)?.closest?.("[data-drift-toggle]")) return;
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
  }, []);

  const go = useCallback((i: number) => {
    const el = ref.current;
    const kid = el?.children[i] as HTMLElement | undefined;
    if (el && kid) {
      el.scrollTo({
        left: kid.offsetLeft - parseFloat(getComputedStyle(el).scrollPaddingLeft || "0"),
        behavior: "smooth",
      });
    }
  }, []);

  // The drift itself: after DWELL_MS on a card, soft-scroll to the next,
  // looping back to the first at the end.
  useEffect(() => {
    if (!drifting) return;
    const t = window.setTimeout(() => {
      if (document.querySelector('[role="dialog"]')) {
        setTick((n) => n + 1); // something is open over the page — wait a beat
        return;
      }
      go(active + 1 >= items.length ? 0 : active + 1);
    }, DWELL_MS);
    return () => window.clearTimeout(t);
  }, [drifting, active, items.length, go, tick]);

  const dark = tone === "dark";

  return (
    // min-w-0: inside a grid or flex parent, a scroller's content width
    // would otherwise widen the parent past the screen.
    <div ref={wrap} className="flex min-w-0 w-full flex-col gap-4">
      <Tag
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        aria-label={label}
        aria-roledescription="carousel"
        className={`no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-5 scroll-px-5 pb-1 md:mx-0 md:overflow-visible md:px-0 md:pb-0 ${gridClassName}`}
      >
        {items.map((child, i) => (
          <RailItem key={i} as={Tag === "ul" ? "li" : "div"} className={itemClassName}>
            {child}
          </RailItem>
        ))}
      </Tag>

      {items.length > 1 && (
        <div className="flex items-center justify-between md:hidden">
          <div className="flex items-center">
            {items.map((_, i) => {
              const on = i === active;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show ${i + 1} of ${items.length}`}
                  aria-current={on ? "true" : undefined}
                  className="flex h-6 w-5 items-center"
                >
                  {/*
                    Each dot sits in a 20px slot; the current one stretches to
                    fill it (scaleX — a transform, no layout per frame). While
                    drifting, it fills left-to-right like a timer.
                  */}
                  <span
                    className={`relative block h-1.5 w-full overflow-hidden rounded-full transition-[transform,background-color] duration-300 ease-brand ${
                      on
                        ? `scale-x-100 ${dark ? "bg-teal-light/35" : "bg-teal/30"}`
                        : `scale-x-[0.3] ${dark ? "bg-white/30" : "bg-ink/20"}`
                    }`}
                  >
                    {on && (
                      <span
                        key={`${active}-${tick}-${drifting}`}
                        className={`absolute inset-0 origin-left rounded-full ${dark ? "bg-teal-light" : "bg-teal"} ${
                          drifting ? "rail-timer" : ""
                        }`}
                        style={drifting ? { animationDuration: `${DWELL_MS}ms` } : undefined}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <span className={`font-display font-semibold text-[0.875rem] tabular ${dark ? "text-white/70" : "text-ink-2"}`}>
              {active + 1} / {items.length}
            </span>
            {canDrift && (
              <button
                type="button"
                data-drift-toggle=""
                onClick={() => {
                  setUserPaused((p) => !p);
                  setHolding(false);
                }}
                aria-label={userPaused ? `Play ${label}` : `Pause ${label}`}
                aria-pressed={userPaused}
                className={`flex size-8 items-center justify-center rounded-full border ${
                  dark ? "border-white/20 text-white/80 active:bg-white/10" : "border-rule text-ink-2 active:bg-ink/5"
                }`}
              >
                {userPaused ? (
                  <svg viewBox="0 0 16 16" className="size-3" aria-hidden="true">
                    <path d="M4.5 2.75v10.5L13 8 4.5 2.75Z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" className="size-3" aria-hidden="true">
                    <path d="M4 2.5h2.75v11H4zM9.25 2.5H12v11H9.25z" fill="currentColor" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function RailItem({ as: Tag, className, children }: { as: "li" | "div"; className: string; children: ReactNode }) {
  return <Tag className={`shrink-0 snap-start md:shrink md:basis-auto ${className}`}>{children}</Tag>;
}
