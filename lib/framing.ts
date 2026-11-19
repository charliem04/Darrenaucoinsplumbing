/**
 * Photo framing: which part of each photo shows inside its frame, and
 * how far it is zoomed in. The values live in content/photoFraming.json
 * so the local photo tuner (`npm run tune`) can rewrite them; edit that
 * file by hand or drag the photos with the tuner.
 *
 *   x, y  0–100: the point of the photo kept in view (50 50 = centre;
 *         x 0 = left edge, 100 = right edge). Same as CSS object-position.
 *   zoom  1 = as framed by the layout; 1.5 = 50% closer, centred on x/y.
 *
 * Spread the result onto a next/image: <Image {...framing("about")} … />
 */
import type { CSSProperties } from "react";
import data from "@/content/photoFraming.json";

export type Framing = { x: number; y: number; zoom: number };
export type FramingMap = Record<string, Framing>;

export const framings: FramingMap = data;
const CENTRE: Framing = { x: 50, y: 50, zoom: 1 };

export function framingStyle({ x, y, zoom }: Framing): CSSProperties {
  const at = `${x}% ${y}%`;
  return {
    objectPosition: at,
    transform: zoom === 1 ? undefined : `scale(${zoom})`,
    transformOrigin: at,
  };
}

export function framing(key: string) {
  return { "data-photo": key, style: framingStyle(framings[key] ?? CENTRE) };
}
