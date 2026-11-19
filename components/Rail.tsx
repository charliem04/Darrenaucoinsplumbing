"use client";

/**
 * A horizontal rail for phones; an ordinary grid from md up.
 *
 * On phones the cards sit side by side and the rail drifts: a slow,
 * steady glide to the left that loops forever, with the screen edges
 * softly blurred so cards dissolve in and out (see components/drift for
 * how the loop and the hold-on-touch work). Snap scrolling comes back
 * whenever a hand is on it, so a swipe still lands on a card.
 *
 * The dots under it follow along and can be tapped to jump to a card.
 *
 * At md+ the same children render in `gridClassName`, unchanged.
 */
import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { copyProps, DriftCopyProvider, DriftEdges, useDrift } from "./drift";

/** Re-exported for components that render differently inside the loop copy. */
export { useDriftCopy as useRailClone } from "./drift";

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
  const { canDrift, drifting, setWidth } = useDrift({ scroller: ref, area: wrap, count: n });

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
                <DriftCopyProvider>{child}</DriftCopyProvider>
              </RailItem>
            ))}
        </Tag>
        {canDrift && <DriftEdges tone={tone} />}
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
          <span className={`font-display font-semibold text-[0.875rem] tabular ${dark ? "text-white/70" : "text-ink-2"}`}>
            {active + 1} / {n}
          </span>
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
  /** The visual copy for the loop: hidden from screen readers; taps are forwarded to the real item. */
  copy?: boolean;
  children: ReactNode;
}) {
  return (
    <Tag
      {...(copy ? copyProps : {})}
      className={`shrink-0 snap-start md:shrink md:basis-auto ${copy ? "md:hidden" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
