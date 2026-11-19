"use client";

/**
 * A horizontal rail for phones; an ordinary grid from md up.
 *
 * On phones the rail drifts: the cards glide left continuously at a
 * slow, even pace — no stops, no timers — and loop forever, so the
 * motion itself says "this scrolls sideways". The left and right screen
 * edges are softly blurred, so cards dissolve in and out at the borders
 * instead of being cut off by them.
 *
 * ── HOW THE LOOP WORKS ──────────────────────────────────────────────
 * The cards are rendered twice, the second set as a visual copy only
 * (inert, aria-hidden — screen readers and keyboards see one set).
 * When the drift has travelled exactly one set's width it jumps back by
 * that width; the copy is identical, so the jump is invisible.
 *
 * Components that must not appear twice for real (a Framer layoutId,
 * say) read `useRailClone()` and render a plain look-alike in the copy.
 *
 * ── STAYING OUT OF THE WAY ──────────────────────────────────────────
 *   - A touch, wheel, key or focus inside the rail holds the drift and
 *     restores snap scrolling, so a swipe behaves like a normal swipe;
 *     it picks up again RESUME_MS after the last touch.
 *   - Only while the rail is on screen, the tab is visible, and no
 *     dialog is open over the page.
 *   - Never at md+ (where it is a grid) or under reduced motion.
 *   - A pause / play button beside the counter (WCAG 2.2.2 — moving
 *     content must be pausable). An explicit pause sticks.
 */
import {
  Children,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/** Drift speed, px per second: slow enough to read a card as it passes. */
const SPEED = 24;
/** Quiet time after a touch before the drift picks up again. */
const RESUME_MS = 6000;
const PHONE_QUERY = "(max-width: 767px)";

const RailClone = createContext(false);
/** True inside the visual copy of a drifting rail's cards. */
export const useRailClone = () => useContext(RailClone);

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
  /** Card width on phones — how much of the next card shows. */
  itemClassName?: string;
  tone?: "light" | "dark";
  as?: "ul" | "div";
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLElement>(null);
  const items = Children.toArray(children);
  const n = items.length;
  const [active, setActive] = useState(0);

  const [canDrift, setCanDrift] = useState(false); // phone width + motion allowed
  const [inView, setInView] = useState(false);
  const [holding, setHolding] = useState(false); // a hand was just here
  const [userPaused, setUserPaused] = useState(false); // the pause button
  const resumeTimer = useRef<number>();
  const drifting = canDrift && inView && !holding && !userPaused;

  /** Width of one full set of cards (the loop length). */
  const setWidth = useCallback(() => {
    const el = ref.current;
    if (!el || el.children.length <= n) return 0;
    return (el.children[n] as HTMLElement).offsetLeft - (el.children[0] as HTMLElement).offsetLeft;
  }, [n]);

  // Drift allowed? Phones only, and not under reduced motion.
  useEffect(() => {
    const phone = window.matchMedia(PHONE_QUERY);
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const check = () => setCanDrift(phone.matches && !calm.matches && n > 1);
    check();
    phone.addEventListener("change", check);
    calm.addEventListener("change", check);
    return () => {
      phone.removeEventListener("change", check);
      calm.removeEventListener("change", check);
    };
  }, [n]);

  // On screen?
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Which card is current (mod one set, so the copy counts as the original).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const w = setWidth();
      const x = w ? el.scrollLeft % w : el.scrollLeft;
      const kids = Array.from(el.children).slice(0, n) as HTMLElement[];
      const base = kids[0]?.offsetLeft ?? 0;
      const probe = x + el.clientWidth * 0.33 + base;
      let i = 0;
      for (let k = 0; k < kids.length; k++) if (kids[k].offsetLeft <= probe) i = k;
      if (!w && el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) i = n - 1;
      setActive(i);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [n, setWidth]);

  // A hand on the rail holds the drift. If it lands on the copy, quietly
  // move back onto the real cards first (pixel-identical, so unseen).
  useEffect(() => {
    const node = wrap.current;
    if (!node) return;
    const hold = (e: Event) => {
      if ((e.target as Element | null)?.closest?.("[data-drift-toggle]")) return;
      const el = ref.current;
      const w = setWidth();
      if (el && w && el.scrollLeft >= w) el.scrollLeft -= w;
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
  }, [setWidth]);

  // The drift: a steady glide, frame by frame, looping by one set.
  useEffect(() => {
    const el = ref.current;
    if (!drifting || !el) return;
    let raf = 0;
    let last = 0;
    let x = el.scrollLeft; // float accumulator — scrollLeft rounds
    const step = (t: number) => {
      if (last && !document.hidden && !document.querySelector('[role="dialog"]')) {
        const dt = Math.min(t - last, 64) / 1000; // clamp after a stall
        x += SPEED * dt;
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
  }, [drifting, setWidth]);

  const go = (i: number) => {
    const el = ref.current;
    const kid = el?.children[i] as HTMLElement | undefined;
    if (el && kid) {
      el.scrollTo({
        left: kid.offsetLeft - parseFloat(getComputedStyle(el).scrollPaddingLeft || "0"),
        behavior: "smooth",
      });
    }
  };

  const dark = tone === "dark";
  const ItemTag = Tag === "ul" ? "li" : "div";

  return (
    // min-w-0: inside a grid or flex parent, a scroller's content width
    // would otherwise widen the parent past the screen.
    <div ref={wrap} className="relative flex min-w-0 w-full flex-col gap-4">
      <div className="relative">
        <Tag
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ref={ref as any}
          aria-label={label}
          aria-roledescription="carousel"
          // Snap only when a hand is driving; while drifting it would
          // fight the glide and stutter it card to card.
          className={`no-scrollbar -mx-5 flex gap-3 overflow-x-auto overscroll-x-contain px-5 scroll-px-5 pb-1 md:mx-0 md:overflow-visible md:px-0 md:pb-0 ${
            drifting ? "" : "snap-x snap-mandatory"
          } ${gridClassName}`}
        >
          {items.map((child, i) => (
            <RailItem key={i} as={ItemTag} className={itemClassName}>
              {child}
            </RailItem>
          ))}
          {canDrift &&
            items.map((child, i) => (
              <RailItem key={`copy-${i}`} as={ItemTag} className={itemClassName} copy>
                <RailClone.Provider value={true}>{child}</RailClone.Provider>
              </RailItem>
            ))}
        </Tag>

        {/*
          Blurred edges: a strip at each screen border that blurs what
          passes under it, fading from full blur at the edge to none.
          Phones only; pointer-events-none so they never eat a tap.
        */}
        {canDrift && (
          <>
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-0 -left-5 w-10 backdrop-blur-[3px] [mask-image:linear-gradient(to_right,black,transparent)] [-webkit-mask-image:linear-gradient(to_right,black,transparent)] ${
                dark ? "bg-gradient-to-r from-navy/70 to-transparent" : "bg-gradient-to-r from-ground/80 to-transparent"
              }`}
            />
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-0 -right-5 w-10 backdrop-blur-[3px] [mask-image:linear-gradient(to_left,black,transparent)] [-webkit-mask-image:linear-gradient(to_left,black,transparent)] ${
                dark ? "bg-gradient-to-l from-navy/70 to-transparent" : "bg-gradient-to-l from-ground/80 to-transparent"
              }`}
            />
          </>
        )}
      </div>

      {n > 1 && (
        <div className="flex items-center justify-between md:hidden">
          <div className="flex items-center">
            {items.map((_, i) => {
              const on = i === active;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show ${i + 1} of ${n}`}
                  aria-current={on ? "true" : undefined}
                  className="flex h-6 w-5 items-center"
                >
                  {/* 20px slots; the current dot stretches to fill its slot (scaleX). */}
                  <span
                    className={`block h-1.5 w-full rounded-full transition-[transform,background-color] duration-500 ease-brand ${
                      on
                        ? `scale-x-100 ${dark ? "bg-teal-light" : "bg-teal"}`
                        : `scale-x-[0.3] ${dark ? "bg-white/30" : "bg-ink/20"}`
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <span className={`font-display font-semibold text-[0.875rem] tabular ${dark ? "text-white/70" : "text-ink-2"}`}>
              {active + 1} / {n}
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

function RailItem({
  as: Tag,
  className,
  copy = false,
  children,
}: {
  as: "li" | "div";
  className: string;
  /** The visual copy for the loop: unseen by screen readers, unreachable by keyboard. */
  copy?: boolean;
  children: ReactNode;
}) {
  return (
    <Tag
      aria-hidden={copy || undefined}
      ref={(el: HTMLElement | null) => {
        if (el && copy) el.inert = true;
      }}
      className={`shrink-0 snap-start md:shrink md:basis-auto ${copy ? "md:hidden" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
