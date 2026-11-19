/**
 * The site's buttons, as links.
 *
 * Every button on the page scrolls to a section or calls, so each is an
 * <a>: it works before JavaScript loads. One shape (8px radius, 48px
 * tall — a comfortable thumb target), three looks:
 *
 *   primary   teal fill — the action colour. Call, Request service.
 *   ghost     hairline on a dark band.
 *   quiet     hairline on a light band.
 *
 * Every variant answers the press (.press scales to 97% on pointer-
 * down) and shows a focus ring for keyboards (globals.css).
 */
import type { ReactNode } from "react";
import { CallLink } from "./CallCard";
import { PhoneIcon } from "./Icons";

const base =
  "press inline-flex items-center justify-center gap-2.5 h-12 px-5 rounded font-body font-semibold text-[1rem] leading-none whitespace-nowrap select-none";

export const variants = {
  primary: "bg-teal text-white hover:bg-teal-dark active:bg-teal-dark",
  ghost: "border border-white/30 text-white hover:border-white/60 hover:bg-white/[0.06]",
  quiet: "border border-rule text-ink hover:border-ink/40 hover:bg-ground",
} as const;

type Props = {
  variant: keyof typeof variants;
  className?: string;
  children: ReactNode;
  /** Show the handset glyph (call buttons). */
  icon?: boolean;
} & ({ href: string; call?: never } | { call: true; href?: never });

export function Button({ variant, className = "", children, icon, ...rest }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {icon && <PhoneIcon className="size-[18px] shrink-0" />}
      <span>{children}</span>
    </>
  );
  if ("call" in rest && rest.call) {
    return <CallLink className={cls}>{inner}</CallLink>;
  }
  return (
    <a href={rest.href} className={cls}>
      {inner}
    </a>
  );
}
