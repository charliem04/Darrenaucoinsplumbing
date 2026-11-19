import type { Config } from "tailwindcss";

/**
 * ── BRAND ───────────────────────────────────────────────────────────
 * Every colour resolves to a CSS variable in app/globals.css; re-skin
 * there, not here. Roles, not just names — each colour has one job:
 *
 *   navy        #002f48  the dark bands (hero, reviews, contact)
 *   navy-deep   #001a2b  the darkest band and text on light
 *   navy-bar    #002336  nav and footer
 *   teal        #0b8483  THE action colour: buttons, links, the pipe
 *   teal-light  #0d9694  water in the pipe; hover lift on dark
 *   teal-dark   #0a7170  teal text on white (5.6:1) and pressed state
 *   ground      #F4F7F8  light bands — a cool neutral, biased to the navy
 *   ink         #0E1E28  text on light grounds
 *   ink-2       #4A5B66  secondary text on light grounds (6.4:1 on ground)
 *   rule        #D6DEE2  hairlines and field borders on light
 *   green       #006C42  the logo's own green. ONE meaning only:
 *                        "verified / available" — the 24/7 status dot and
 *                        credential badges. Do not use it for decoration.
 *   green-lift  #24A868  the same hue lifted to read on navy (the dot)
 * ────────────────────────────────────────────────────────────────────
 */
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: v("navy"), deep: v("navy-deep"), bar: v("navy-bar") },
        teal: {
          DEFAULT: v("teal"),
          light: v("teal-light"),
          dark: v("teal-dark"),
        },
        ground: v("ground"),
        ink: { DEFAULT: v("ink"), 2: v("ink-2") },
        rule: v("rule"),
        green: { DEFAULT: v("green"), lift: v("green-lift") },
        danger: { DEFAULT: v("danger"), ink: v("danger-ink") },
      },
      fontFamily: {
        /** Barlow Semi Condensed — headings, nav, figures */
        display: "var(--font-display)",
        /** Barlow — running text, form, buttons */
        body: "var(--font-body)",
      },
      fontSize: {
        // Two scales that meet at md. Display steps are far enough apart
        // to read as hierarchy without leaning on weight.
        "d-1": ["clamp(2.5rem, 5.2vw, 4.25rem)", { lineHeight: "1", letterSpacing: "-0.01em" }],
        "d-2": ["clamp(2rem, 3.6vw, 2.875rem)", { lineHeight: "1.05", letterSpacing: "-0.005em" }],
        "d-3": ["clamp(1.375rem, 2vw, 1.75rem)", { lineHeight: "1.15" }],
      },
      borderRadius: {
        // One radius for the whole site. Fittings and plates, not bubbles.
        DEFAULT: "8px",
      },
      transitionTimingFunction: {
        // The site curve — same numbers as ease.out in lib/motion.ts.
        brand: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      maxWidth: { content: "80rem" },
    },
  },
  plugins: [],
};
export default config;
