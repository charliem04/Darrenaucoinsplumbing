import type { ReactNode } from "react";
import { FlowLines } from "./FlowLines";

/**
 * A band of the page. One padding system for every section, which is
 * what lets the pipe fittings in SectionHead meet the gutter pipe
 * exactly: content starts at max(6rem, (100vw - 80rem) / 2) at lg.
 *
 * Grounds alternate dark / light down the page so each band is a
 * distinct room, without gradients or glows doing that job:
 *
 *   navy    hero, reviews, contact — with drifting flow lines
 *   ground  services, FAQ — the cool neutral
 *   white   the quieter bands
 */
const GROUNDS = {
  navy: "bg-navy text-white",
  deep: "bg-navy-deep text-white",
  ground: "bg-ground text-ink",
  white: "bg-white text-ink",
} as const;

export function Section({
  id,
  ground,
  labelledBy,
  className = "",
  innerClassName = "",
  children,
}: {
  id?: string;
  ground: keyof typeof GROUNDS;
  labelledBy?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  const dark = ground === "navy" || ground === "deep";
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative isolate w-full ${GROUNDS[ground]} ${className}`}
    >
      {dark && <FlowLines />}
      <div className={`relative px-5 md:px-10 lg:px-24 py-16 md:py-24 ${innerClassName}`}>
        <div className="mx-auto w-full max-w-content">{children}</div>
      </div>
    </section>
  );
}
