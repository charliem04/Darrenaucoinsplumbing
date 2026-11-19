/**
 * Photo framing: which part of each photo shows inside its frame, and
 * how far it is zoomed in, separately for mobile and desktop. The values
 * live in content/photoFraming.json so the local photo tuner
 * (`npm run tune`) can rewrite them; edit that file by hand or drag the
 * photos with the tuner.
 *
 *   mobile   below 1024px wide (phones and tablets: the stacked layouts)
 *   desktop  1024px and wider
 *
 *   x, y  0–100: the point of the photo kept in view (50 50 = centre;
 *         x 0 = left edge, 100 = right edge). Same as CSS object-position.
 *   zoom  1 = as framed by the layout; 1.5 = 50% closer, centred on x/y.
 *
 * The values ride on the <img> as custom properties and a rule in
 * globals.css picks the set for the screen width, so it works with no
 * JavaScript and no layout shift. Spread onto a next/image:
 *   <Image {...framing("about")} … />
 */
import type { CSSProperties } from "react";
import data from "@/content/photoFraming.json";

export type Framing = { x: number; y: number; zoom: number };
export type PhotoFraming = { mobile: Framing; desktop: Framing };
export type FrameMode = keyof PhotoFraming;
export type FramingMap = Record<string, PhotoFraming>;

/** Must match the breakpoint in globals.css. */
export const DESKTOP_QUERY = "(min-width: 1024px)";

export const framings: FramingMap = data;
export const CENTRE: Framing = { x: 50, y: 50, zoom: 1 };

const SUFFIX: Record<FrameMode, string> = { mobile: "m", desktop: "d" };

/** The custom properties for one mode, e.g. { "--photo-at-m": "50% 20%", … }. */
export function framingVars(mode: FrameMode, f: Framing): Record<string, string> {
  const s = SUFFIX[mode];
  return { [`--photo-at-${s}`]: `${f.x}% ${f.y}%`, [`--photo-zoom-${s}`]: String(f.zoom) };
}

export function framing(key: string) {
  const p = framings[key] ?? { mobile: CENTRE, desktop: CENTRE };
  return {
    "data-photo": key,
    style: { ...framingVars("mobile", p.mobile), ...framingVars("desktop", p.desktop) } as CSSProperties,
  };
}
