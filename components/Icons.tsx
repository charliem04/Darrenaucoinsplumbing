/**
 * The page's icons: one 24px grid, one 1.75 stroke, round joins.
 *
 * A single drawing system, rather than the Figma export's mix of filled
 * glyphs and stroked ones at different weights — and each icon has its
 * own correct viewBox (the old contact icons shared the mail glyph's,
 * which cropped the phone and the pin).
 */
type P = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function PhoneIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M5.5 3.5h3l1.5 4-2 1.25a11 11 0 0 0 5.25 5.25L14.5 12l4 1.5v3a2 2 0 0 1-2 2A13.5 13.5 0 0 1 3.5 5.5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function MailIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </svg>
  );
}

export function PinIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.25" />
    </svg>
  );
}

export function ChevronDown({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Check({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={2.25}>
      <path d="M5 12.5 10 17.5 19 7" />
    </svg>
  );
}

export function ArrowRight({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function MenuIcon({ open, className }: P & { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={2}>
      <path d={open ? "M6 6l12 12M6 18 18 6" : "M4 7h16M4 12h16M4 17h16"} />
    </svg>
  );
}

/** A drop — the logo's own mark, used beside the availability line. */
export function DropIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5Z" />
    </svg>
  );
}

/** Specialty service glyphs: 24×24 stroked paths from content/services.ts. */
export function PathIcon({ d, className }: P & { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d={d} />
    </svg>
  );
}

/** Five stars at 16px, for review cards. */
export function Stars({ className = "" }: P) {
  const star = "M8 1.5l1.9 4.1 4.4.5-3.3 3 .9 4.4L8 11.3 4.1 13.5l.9-4.4-3.3-3 4.4-.5L8 1.5Z";
  return (
    <div className={`flex gap-0.5 ${className}`} role="img" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 16 16" className="size-4" aria-hidden="true">
          <path d={star} fill="currentColor" />
        </svg>
      ))}
    </div>
  );
}
