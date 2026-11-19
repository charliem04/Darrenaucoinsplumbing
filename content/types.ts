/**
 * ════════════════════════════════════════════════════════════════════
 *  CONTENT TYPES — the shapes the page's data arrays take.
 *
 *  Services, FAQs, testimonials and stats are data, not JSX. Components
 *  map over these; none of them should hold a string of their own that
 *  a client would ever ask to change.
 * ════════════════════════════════════════════════════════════════════
 */

export type Photo = {
  /** Path under /public, e.g. "/images/hero.webp" */
  src: string;
  alt: string;
  /** Intrinsic pixels, so the box is reserved before the photo lands */
  width: number;
  height: number;
};

/**
 * One tab of the "What we handle" panel.
 *
 * `objectPosition` is a CSS object-position value that travels with
 * the photo rather than living in a component conditional.
 *
 * The old markup *tried* to crop most photos at "center 15%" and a few
 * at "center 60%", but those classes lost to object-center later in
 * the stylesheet, so the live site renders them all centred (and the
 * septic photo right-aligned). The values here are what is actually on
 * screen today. Tuning them is a design-pass decision, not a port.
 */
export type ServiceTab = {
  /** Stable id; also the value the contact form records */
  key: string;
  /** Tab button label */
  label: string;
  /** Small heading above the title inside the panel */
  tagline: string;
  title: string;
  description: string;
  photo: Photo;
  objectPosition: string;
};

/** One row of the "Specialty services" accordion. */
export type SpecialtyService = {
  key: string;
  /** A 24×24 stroked SVG path, drawn in the row's icon tile */
  icon: string;
  name: string;
  meta: string;
  /** Credential pill shown when the row is open; omitted when none */
  badge?: string;
  description: string;
  bullets: string[];
};

export type Faq = {
  q: string;
  a: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  /** e.g. "Homeowner, Lafayette" */
  detail: string;
};

/**
 * A figure in the track-record band. `value` is shown exactly as
 * written; the count-up animates only its digits, so "30 min" counts
 * 0 → 30 with " min" held in place.
 */
export type Stat = {
  label: string;
  value: string;
  desc: string;
};
