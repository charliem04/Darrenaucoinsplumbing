"use client";

/**
 * Scroll reveals.
 *
 *   <Reveal>            a block that settles into place, once, as it
 *                       scrolls into view — 16px of travel, 600ms.
 *   <RevealGroup>       watches the viewport for its children, which
 *     <RevealItem i>    settle one after another, 70ms apart.
 *
 * Hidden states carry data-reveal so the stylesheet can show them when
 * JavaScript never runs (app/layout.tsx) and drop the travel under
 * reduced motion (app/globals.css).
 */
import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { cascade, dur, ease, travel, viewport } from "@/lib/motion";

const settle: Variants = {
  hidden: { opacity: 0, y: travel.rise },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: dur.reveal, ease: ease.out, delay: cascade(i) },
  }),
};

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "ul" | "ol" | "dl";
};

export function Reveal({ children, className, as = "div" }: Props) {
  const M = motion[as] as ElementType;
  return (
    <M
      data-reveal=""
      className={className}
      variants={settle}
      initial="hidden"
      whileInView="visible"
      viewport={viewport.reveal}
    >
      {children}
    </M>
  );
}

export function RevealGroup({ children, className, as = "div" }: Props) {
  const M = motion[as] as ElementType;
  return (
    <M className={className} initial="hidden" whileInView="visible" viewport={viewport.reveal}>
      {children}
    </M>
  );
}

export function RevealItem({ children, className, index, as = "div" }: Props & { index: number }) {
  const M = motion[as] as ElementType;
  return (
    <M data-reveal="" className={className} variants={settle} custom={index}>
      {children}
    </M>
  );
}
