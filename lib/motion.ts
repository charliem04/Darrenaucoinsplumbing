/**
 * ── MOTION TOKENS ───────────────────────────────────────────────────
 * One vocabulary for every animation on the site. Components reach for
 * a name here instead of writing their own duration or curve.
 *
 * The page is meant to feel alive but never busy. Every moving part has
 * a job, and they come in three registers:
 *
 *   ambient   always running, barely there: flow lines in the navy
 *             bands, the availability dot. CSS, compositor-only.
 *   scroll    tied to the reader: the pipe filling down the gutter,
 *             sections and fittings settling in as they arrive.
 *   response  answering a hand: press, hover, tab indicator, accordion,
 *             call card. Fast — under 300ms — because it is feedback.
 *
 * Reduced motion keeps every state change and drops the travel.
 * ────────────────────────────────────────────────────────────────────
 */

/** The site curve: leaves fast, lands soft, no overshoot. */
export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  /** Symmetric, for anything that has to run backwards as well. */
  inOut: [0.65, 0, 0.35, 1] as const,
  /** easeOutCubic — the count-up. */
  outCubic: (t: number) => 1 - Math.pow(1 - t, 3),
};

export const dur = {
  /** Press, hover, small state change. */
  quick: 0.16,
  /** Accordion, tab panel, call card. */
  panel: 0.28,
  /** A section settling in as it scrolls into view. */
  reveal: 0.6,
  /** A pipe fitting drawing across to its heading. */
  fitting: 0.9,
  /** A stat counting up. */
  countUp: 1.4,
} as const;

/** Travel, px. Short: things settle into place, they don't fly in. */
export const travel = {
  rise: 16,
} as const;

/** Card cascades: 70ms per item, capped so a list never becomes a queue. */
export const STAGGER = 0.07;
export function cascade(index: number): number {
  return Math.min(index, 6) * STAGGER;
}

export const viewport = {
  reveal: { once: true, amount: 0.2, margin: "0px 0px -8% 0px" },
  countUp: { once: true, amount: 0.6 },
} as const;

/** Springs are critically damped (no bounce): nothing here was thrown. */
export const spring = {
  tabs: { type: "spring", stiffness: 380, damping: 38 },
  callCard: { type: "spring", stiffness: 420, damping: 40 },
} as const;

/** Call buttons dial below this width and open the call card above it. */
export const DESKTOP_QUERY = "(min-width: 768px)";

/** The pipe and its fittings appear from here up (Tailwind's lg). */
export const PIPE_MIN_WIDTH = 1024;
