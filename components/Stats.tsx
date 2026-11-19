"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { client } from "@/client.config";
import { stats } from "@/content/stats";
import type { Stat } from "@/content/types";
import { dur, ease, viewport } from "@/lib/motion";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

/**
 * Splits "2000+" into prefix "", number 2000, suffix "+", so only the
 * digits count. A value with no digits is shown as-is.
 */
function parse(value: string) {
  const m = value.match(/^(\D*)(\d[\d,]*)(.*)$/);
  if (!m) return null;
  return { prefix: m[1], n: parseInt(m[2].replace(/,/g, ""), 10), suffix: m[3], comma: m[2].includes(",") };
}

/**
 * The figure, counting up from zero the first time it is 40% on screen.
 *
 * It server-renders the FINAL value, then drops to zero on mount — so
 * with JavaScript off, or reduced motion on, the real figure is what
 * shows, never "0+".
 */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, viewport.countUp);
  const parts = parse(value);
  const [text, setText] = useState(value);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!parts) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setText(`${parts.prefix}0${parts.suffix}`);
    setArmed(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (!armed || !inView || !parts) return;
    const controls = animate(0, parts.n, {
      duration: dur.countUp,
      ease: ease.outCubic,
      onUpdate: (v) => {
        const r = Math.round(v);
        setText(`${parts.prefix}${parts.comma ? r.toLocaleString("en-US") : r}${parts.suffix}`);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [armed, inView]);

  return (
    <p
      ref={ref}
      aria-label={value}
      className="font-figure font-bold leading-[1.2] text-[80px] text-right w-full bg-gradient-to-b from-white to-white/65 bg-clip-text text-transparent"
      style={{ fontVariationSettings: "'wdth' 100" }}
    >
      <span aria-hidden="true">{text}</span>
    </p>
  );
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  return (
    <RevealItem
      index={index}
      className="bg-teal flex-[1_0_0] min-w-px relative rounded-[16px] border border-white/20"
    >
      <div className="flex flex-col gap-[48px] items-start p-[32px] relative size-full">
        <p className="font-display font-medium leading-[1.4] text-[22px] text-white tracking-[-0.22px] w-full">
          {stat.label}
        </p>
        <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
          <CountUp value={stat.value} />
          {/* Zero-height rule drawn 1px above its box, as the old SVG line was. */}
          <div className="h-0 w-full relative shrink-0" aria-hidden="true">
            <div className="absolute inset-x-0 -top-px h-px bg-white/20" />
          </div>
          <p className="font-body font-normal leading-[1.5] not-italic text-[16px] text-right text-white w-full">
            {stat.desc}
          </p>
        </div>
      </div>
    </RevealItem>
  );
}

export function Stats() {
  const s = client.stats;
  return (
    <section className="bg-gradient-to-b from-teal-light to-teal-dark relative shrink-0 w-full">
      <div className="flex flex-col items-center overflow-clip size-full">
        <div className="flex flex-col items-center px-[20px] py-[64px] md:px-[64px] md:py-[112px] relative size-full">
          <Reveal className="flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full">
            <div className="flex flex-col gap-[48px] items-start md:flex-row md:gap-[80px] md:items-center relative shrink-0 w-full">
              <div className="flex flex-col gap-[24px] items-start shrink-0 w-full md:gap-[32px] md:flex-[1_0_0] md:max-w-[400px] md:min-w-px relative">
                <div className="flex flex-col gap-[12px] md:gap-[16px] items-start relative shrink-0 w-full">
                  <p className="font-display font-medium text-[12px] tracking-[0.12em] uppercase text-white">{s.eyebrow}</p>
                  <div className="flex flex-col gap-[20px] md:gap-[24px] items-start relative shrink-0 text-white w-full">
                    <h2 className="font-display font-medium leading-[1.2] relative shrink-0 w-full text-[36px] tracking-[-0.36px] md:text-[52px] md:tracking-[-0.52px]">
                      {s.heading}
                    </h2>
                    <p className="font-body font-normal leading-[1.5] not-italic relative shrink-0 w-full text-[16px] md:text-[18px]">
                      {s.body}
                    </p>
                  </div>
                </div>
                <a
                  href="#contact"
                  className="flex items-center justify-center px-[12px] py-[6px] relative rounded-[12px] shrink-0 border border-white/20 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <span className="font-body font-medium leading-[1.5] not-italic text-[16px] text-white">{s.cta}</span>
                </a>
              </div>
              <RevealGroup className="flex flex-col gap-[32px] items-start w-full shrink-0 md:grid md:grid-cols-2 md:flex-[1_0_0] md:min-w-px relative">
                {stats.map((stat, idx) => (
                  <StatCard key={stat.label} stat={stat} index={idx} />
                ))}
              </RevealGroup>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
