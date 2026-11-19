"use client";

/**
 * A horizontal swipe rail for phones; an ordinary grid from md up.
 *
 * Stacking every card in one narrow column made the phone page a long,
 * squeezed scroll with everything at equal weight. A rail lays a set of
 * like things side by side instead: one card in focus, the next one
 * peeking in from the edge (which is what tells a thumb it can swipe),
 * and the page itself stays short.
 *
 *   - Native scroll with CSS snap: momentum and edge-bounce come from
 *     the platform, so it feels like the phone, not like a widget.
 *   - The rail bleeds to the screen edges (negative margin) but snaps
 *     cards to the page's own 20px gutter, so the first card lines up
 *     with the heading above it.
 *   - The indicator under it follows the scroll live — the current dot
 *     stretches into a short bar — and its dots are buttons, so the
 *     rail can be driven without swiping.
 *
 * At md+ the same children render in `gridClassName`, unchanged from
 * the desktop layout.
 */
import { Children, useEffect, useRef, useState, type ReactNode } from "react";

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
  const ref = useRef<HTMLElement>(null);
  const items = Children.toArray(children);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Scroll events already arrive at most once per frame, and this is a
    // handful of offsetLeft reads, so no extra frame scheduling is needed.
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

  const go = (i: number) => {
    const el = ref.current;
    const kid = el?.children[i] as HTMLElement | undefined;
    if (el && kid) el.scrollTo({ left: kid.offsetLeft - parseFloat(getComputedStyle(el).scrollPaddingLeft || "0"), behavior: "smooth" });
  };

  const dark = tone === "dark";

  return (
    // min-w-0: inside a grid or flex parent, a scroller's content width
    // would otherwise widen the parent past the screen.
    <div className="flex min-w-0 w-full flex-col gap-4">
      <Tag
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        aria-label={label}
        className={`no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-5 scroll-px-5 pb-1 md:mx-0 md:overflow-visible md:px-0 md:pb-0 ${gridClassName}`}
      >
        {items.map((child, i) => (
          <RailItem key={i} as={Tag === "ul" ? "li" : "div"} className={itemClassName}>
            {child}
          </RailItem>
        ))}
      </Tag>

      {items.length > 1 && (
        <div className="flex items-center justify-between md:hidden" aria-hidden="false">
          <div className="flex items-center">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show ${i + 1} of ${items.length}`}
                aria-current={i === active ? "true" : undefined}
                className="flex h-6 w-5 items-center"
              >
                {/* Each dot sits in a 20px slot; the current one stretches to fill
                    it via scaleX (a transform, so no layout work per frame). */}
                <span
                  className={`block h-1.5 w-full rounded-full transition-[transform,background-color] duration-300 ease-brand ${
                    i === active ? `scale-x-100 ${dark ? "bg-teal-light" : "bg-teal"}` : `scale-x-[0.3] ${dark ? "bg-white/30" : "bg-ink/20"}`
                  }`}
                />
              </button>
            ))}
          </div>
          <span className={`font-display font-semibold text-[0.875rem] tabular ${dark ? "text-white/70" : "text-ink-2"}`}>
            {active + 1} / {items.length}
          </span>
        </div>
      )}
    </div>
  );
}

function RailItem({ as: Tag, className, children }: { as: "li" | "div"; className: string; children: ReactNode }) {
  return <Tag className={`shrink-0 snap-start md:shrink md:basis-auto ${className}`}>{children}</Tag>;
}
