"use client";

/**
 * The page's signature: one run of pipe down the left gutter on
 * desktop, filling with water as the reader scrolls.
 *
 * Each section heading draws a fitting across from this pipe to its
 * label (components/SectionHead), so the page reads as plumbing that
 * feeds every section — the subject's own material, rather than an
 * effect borrowed from somewhere else.
 *
 * Scroll-linked, so it has no duration of its own: the reader's finger
 * is the clock, and it runs backwards as convincingly as forwards.
 * Hidden below lg, where there is no gutter for it and a scroll-linked
 * element only fights the mobile URL bar.
 */
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function Pipe() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  // Critically damped smoothing so a flick of the wheel doesn't jitter.
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-8 top-[4.5rem] bottom-6 z-30 hidden lg:block w-[3px]"
    >
      {/* The empty pipe. */}
      <div className="absolute inset-0 rounded-full bg-teal/20" />
      {/* The water. */}
      <motion.div
        className="absolute inset-0 origin-top rounded-full bg-teal-light"
        style={{ scaleY: reduce ? scrollYProgress : fill }}
      />
      {/* Fittings at each end. */}
      <span className="absolute -top-1 left-1/2 -translate-x-1/2 size-[11px] rounded-[3px] border-[3px] border-teal bg-white/0" />
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-[11px] rounded-[3px] border-[3px] border-teal" />
    </div>
  );
}
