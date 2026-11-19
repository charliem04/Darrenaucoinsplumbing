"use client";

/**
 * The four figures, directly under the hero — the proof sits next to
 * the promise instead of five sections further down.
 *
 * Visible on load (no reveal — it is above the fold on desktop, and the
 * count-up is its motion). Each figure counts up from zero the first time it is on screen. It
 * server-renders the FINAL value and drops to zero only once hydrated,
 * so with JavaScript off or reduced motion on, the real number shows.
 */
import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/content/stats";
import { dur, ease, viewport } from "@/lib/motion";
import { Rail } from "./Rail";


function parse(value: string) {
  const m = value.match(/^(\D*)(\d[\d,]*)(.*)$/);
  if (!m) return null;
  return { prefix: m[1], n: parseInt(m[2].replace(/,/g, ""), 10), suffix: m[3], comma: m[2].includes(",") };
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, viewport.countUp);
  const parts = parse(value);
  const [text, setText] = useState(value);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!parts || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setText(`${parts.prefix}0${parts.suffix}`);
    setArmed(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (!armed || !inView || !parts) return;
    const c = animate(0, parts.n, {
      duration: dur.countUp,
      ease: ease.outCubic,
      onUpdate: (v) => {
        const r = Math.round(v);
        setText(`${parts.prefix}${parts.comma ? r.toLocaleString("en-US") : r}${parts.suffix}`);
      },
    });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [armed, inView]);

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}

export function TrustStrip() {
  return (
    <div className="relative bg-white border-b border-rule">
      {/*
        Phones: a swipe rail of stat cards, two and a bit on screen, so
        the figures read as a set instead of a cramped 2×2 block.
      */}
      <div className="md:hidden px-5 py-6">
        <Rail label="Track record" gridClassName="" itemClassName="basis-[44%]" as="div">
          {stats.map((s) => (
            <div key={s.label} className="flex h-full flex-col gap-1.5 rounded border border-rule bg-ground/60 p-4">
              <span className="font-display font-bold text-[2.25rem] leading-none tabular text-teal-dark">
                <CountUp value={s.value} />
              </span>
              <span className="font-display font-semibold text-[0.9375rem] leading-tight text-ink">{s.label}</span>
              <span className="text-[0.8125rem] leading-snug text-ink-2">{s.desc}</span>
            </div>
          ))}
        </Rail>
      </div>

      <div className="hidden md:block px-5 md:px-10 lg:px-24">
        <dl
          className="mx-auto max-w-content grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-rule"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col gap-1.5 py-7 md:py-9 md:px-6 first:md:pl-0 ${
                i % 2 === 0 ? "pr-4" : "pl-4 border-l border-rule md:border-l-0"
              } ${i < 2 ? "border-b border-rule md:border-b-0" : ""}`}
            >
              <dt className="order-2 font-display font-semibold text-[1rem] text-ink">{s.label}</dt>
              <dd className="order-1 font-display font-bold text-[2.5rem] md:text-[2.75rem] leading-none tabular text-teal-dark">
                <CountUp value={s.value} />
              </dd>
              <dd className="order-3 text-[0.875rem] leading-snug text-ink-2 max-w-[28ch]">{s.desc}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
