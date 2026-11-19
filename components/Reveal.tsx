"use client";

/**
 * Scroll reveals.
 *
 *   <Reveal>            one block that rises into place, once, when it
 *                       scrolls into view.
 *   <RevealGroup>       a container that watches the viewport for its
 *     <RevealItem i>    children, which scale in one after another —
 *                       the old site's card grids with REVEAL_DELAYS.
 *
 * Every hidden state carries data-reveal, so the stylesheet can force
 * it visible when JavaScript never runs or the visitor asked for
 * reduced motion (app/globals.css, app/layout.tsx).
 */
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cascade, dur, ease, travel, viewport } from "@/lib/motion";

const rise: Variants = {
  hidden: { opacity: 0, y: travel.rise },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: dur.reveal, ease: ease.out },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: travel.scaleFrom },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: dur.reveal, ease: ease.out, delay: cascade(i) },
  }),
};

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function Reveal({ children, className, id }: Props) {
  return (
    <motion.div
      id={id}
      data-reveal=""
      className={className}
      variants={rise}
      initial="hidden"
      whileInView="visible"
      viewport={viewport.reveal}
    >
      {children}
    </motion.div>
  );
}

/** Watches the viewport on behalf of its RevealItems. */
export function RevealGroup({ children, className }: Props) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport.reveal}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  index,
}: Props & { index: number }) {
  return (
    <motion.div data-reveal="" className={className} variants={scaleIn} custom={index}>
      {children}
    </motion.div>
  );
}
