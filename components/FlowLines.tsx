/**
 * Slow currents drifting through a dark band — the ambient layer.
 *
 * Three long sine-like strokes at very low contrast, drawn twice side
 * by side and translated -50% on a loop, so the seam never shows. A
 * transform on the compositor: no layout, no paint, no JavaScript.
 * Stops under reduced motion (app/globals.css).
 *
 * Decorative only, and only on the navy bands: on light grounds it
 * would read as texture rather than water.
 */

// One period of each current, 720 wide. Each path starts and ends at
// the same y with the same slope, so two copies tile seamlessly.
const CURRENTS = [
  { d: "M0 40 C120 10 240 70 360 40 S600 10 720 40", y: "18%", w: 1.25, o: 0.07, dur: "56s" },
  { d: "M0 40 C180 70 300 10 360 40 S540 70 720 40", y: "52%", w: 1, o: 0.05, dur: "72s" },
  { d: "M0 40 C90 25 270 55 360 40 S630 25 720 40", y: "80%", w: 1.5, o: 0.06, dur: "64s" },
];

export function FlowLines() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {CURRENTS.map((c, i) => (
        <div
          key={i}
          className="absolute left-0 w-[200%] h-20 flow-strip"
          style={{ top: c.y, ["--flow-dur" as string]: c.dur }}
        >
          <svg className="block w-full h-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d={c.d} fill="none" stroke="white" strokeOpacity={c.o} strokeWidth={c.w} vectorEffect="non-scaling-stroke" />
            <path
              d={c.d}
              transform="translate(720 0)"
              fill="none"
              stroke="white"
              strokeOpacity={c.o}
              strokeWidth={c.w}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
