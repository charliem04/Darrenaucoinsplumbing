"use client";

/**
 * A section's heading, attached to the pipe.
 *
 * The label sits where an eyebrow would, but it is a pipe fitting: on
 * desktop a run of pipe draws across from the gutter (components/Pipe)
 * to the label, ending in an elbow, as the section arrives. On smaller
 * screens there is no gutter pipe, so a short stub draws in instead.
 *
 * The fitting fills with water — the same teal as the gutter pipe —
 * so the page reads as one run of plumbing feeding each section.
 */
import { motion } from "framer-motion";
import { dur, ease, viewport } from "@/lib/motion";

type Tone = "light" | "dark";

export function SectionHead({
  label,
  heading,
  lede,
  tone = "light",
  id,
  align = "left",
}: {
  label: string;
  heading: string;
  lede?: string;
  tone?: Tone;
  /** id for the heading, for aria-labelledby on the section */
  id?: string;
  align?: "left" | "center";
}) {
  const dark = tone === "dark";
  return (
    <motion.div
      className={`relative flex flex-col gap-4 ${align === "center" ? "items-center text-center" : ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewport.reveal}
    >
      <div className="relative flex items-center gap-3">
        {/*
          Desktop fitting: from the gutter pipe (2rem from the viewport
          edge, 3px wide) to the elbow. Every <Section> puts its content
          box at max(6rem, (100vw - 80rem) / 2) from the left at lg, so
          the run is that minus the gutter. Hidden when centred — there
          is nothing to connect to.
        */}
        {align === "left" && (
          <span
            aria-hidden="true"
            className="hidden lg:block absolute top-1/2 right-full h-[3px] -translate-y-1/2 w-[calc(max(6rem,(100vw-80rem)/2)-2rem-3px)] overflow-hidden bg-teal/25"
          >
            <motion.span
              className="absolute inset-0 origin-left bg-teal-light"
              variants={{
                hidden: { scaleX: 0 },
                visible: { scaleX: 1, transition: { duration: dur.fitting, ease: ease.inOut } },
              }}
            />
          </span>
        )}
        {/* Phone/tablet stub, and the elbow joint on every size. */}
        <span aria-hidden="true" className="relative flex items-center">
          <span className="lg:hidden relative h-[3px] w-6 overflow-hidden rounded-full bg-teal/25">
            <motion.span
              className="absolute inset-0 origin-left bg-teal-light"
              variants={{
                hidden: { scaleX: 0 },
                visible: { scaleX: 1, transition: { duration: dur.reveal, ease: ease.out } },
              }}
            />
          </span>
          <motion.span
            className={`block size-2.5 rounded-full border-[3px] ${dark ? "border-teal-light" : "border-teal"}`}
            variants={{
              hidden: { scale: 0.4, opacity: 0 },
              visible: {
                scale: 1,
                opacity: 1,
                transition: { duration: dur.panel, ease: ease.out, delay: 0.35 },
              },
            }}
          />
        </span>
        <span
          className={`font-display font-semibold text-[0.9375rem] tracking-[0.04em] ${
            dark ? "text-teal-light" : "text-teal-dark"
          }`}
        >
          {label}
        </span>
      </div>

      <motion.div
        className={`flex flex-col gap-4 ${align === "center" ? "items-center" : ""}`}
        variants={{
          hidden: { opacity: 0, y: 12 },
          visible: { opacity: 1, y: 0, transition: { duration: dur.reveal, ease: ease.out, delay: 0.1 } },
        }}
      >
        <h2
          id={id}
          className={`font-display font-semibold text-d-2 max-w-[22ch] text-balance ${dark ? "text-white" : "text-ink"}`}
        >
          {heading}
        </h2>
        {lede && (
          <p
            className={`text-[1.0625rem] md:text-lg leading-relaxed max-w-[60ch] text-pretty ${
              dark ? "text-white/75" : "text-ink-2"
            }`}
          >
            {lede}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
