/**
 * ── MOTION TOKENS ───────────────────────────────────────────────────
 * One vocabulary for every animation on the site. Components reach for
 * a name here rather than writing their own duration or curve.
 *
 * These values are a PORT, not a design: each one reproduces what the
 * Figma-export site did (its animations.css and useScrollReveal /
 * useCountUp hooks) so the rebuilt page moves exactly as the live one
 * does. The design pass is the time to change them — and when it does,
 * this is the only file it should need to touch.
 * ────────────────────────────────────────────────────────────────────
 */

/**
 * The reveal curve: cubic-bezier(0.22, 1, 0.36, 1), a strong ease-out
 * with no overshoot. Carried from animations.css.
 */
export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  /** easeOutCubic — the count-up's curve: fast start, gentle finish. */
  outCubic: (t: number) => 1 - Math.pow(1 - t, 3),
};

export const dur = {
  /** 700ms — every scroll reveal. */
  reveal: 0.7,
  /** 1000ms — the hero photo's fade on load. */
  heroFade: 1,
  /** 1600ms — a stat counting up. */
  countUp: 1.6,
  /** 300ms — accordion open/close. */
  accordion: 0.3,
} as const;

/** Travel distances, px. */
export const travel = {
  /** A block rising into place. */
  rise: 28,
  /** A card scaling in starts at 94%. */
  scaleFrom: 0.94,
} as const;

/**
 * Stagger for cards in a grid — the old REVEAL_DELAYS array
 * ("reveal-delay-1" … "-5"), which applied 80ms × (index + 1).
 * Note the +1: the first card waits 80ms too.
 */
export const STAGGER = 0.08;
export function cascade(index: number): number {
  return Math.min(index + 1, 5) * STAGGER;
}

/**
 * Viewport triggers. `once` everywhere: nothing re-hides on the way
 * back up.
 *
 *   reveal  — the old IntersectionObserver: 15% visible, with the
 *             bottom 10% of the viewport excluded.
 *   countUp — fires when 40% of the number is on screen.
 */
export const viewport = {
  reveal: { once: true, amount: 0.15, margin: "0px 0px -10% 0px" },
  countUp: { once: true, amount: 0.4 },
} as const;

/** The springs the old site used, named for where they appear. */
export const spring = {
  /** Desktop service tabs swapping. */
  tabs: { type: "spring", stiffness: 260, damping: 30, mass: 0.8 },
  /** Mobile service accordion opening. */
  accordion: { type: "spring", stiffness: 260, damping: 32 },
  /** The call card popping in. */
  callCard: { type: "spring", stiffness: 300, damping: 30 },
} as const;

/**
 * The phone/desktop split for the call buttons, matching Tailwind's
 * `md`. Below it, Call dials; at or above it, Call opens the call card.
 */
export const DESKTOP_QUERY = "(min-width: 768px)";
