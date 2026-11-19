/**
 * The site's three button looks, as links.
 *
 * Every button on this page either scrolls to a section or calls, so
 * each is an <a>: it works before JavaScript loads, and a middle-click
 * or long-press does what a visitor expects. Padding differs from one
 * placement to the next on the live site, so it is passed in rather
 * than baked into a variant.
 */
import type { ReactNode } from "react";
import { CallLink } from "./CallCard";

const base =
  "flex items-center justify-center relative rounded-[12px] shrink-0 transition-colors cursor-pointer";

export const variants = {
  /** White fill, blue hairline — "Call now" on dark grounds. */
  white: "bg-white border border-blue hover:bg-gray-100 text-ink",
  /** Hairline on a dark ground — "Learn more", "Contact us". */
  ghost: "border border-white/20 hover:bg-white/10 text-white",
  /** Blue fill — "Book", "See services". */
  blue: "bg-blue hover:bg-blue-press text-white",
} as const;

export const label =
  "font-body font-medium leading-[1.5] not-italic text-[16px] whitespace-nowrap";

type Props = {
  variant: keyof typeof variants;
  /** Padding and any per-placement overrides */
  className?: string;
  children: ReactNode;
} & ({ href: string; call?: never } | { call: true; href?: never });

export function Button({ variant, className = "px-[12px] py-[6px]", children, ...rest }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = <span className={label}>{children}</span>;
  if ("call" in rest && rest.call) {
    return <CallLink className={cls}>{inner}</CallLink>;
  }
  return (
    <a href={rest.href} className={cls}>
      {inner}
    </a>
  );
}
