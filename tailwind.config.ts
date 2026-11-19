import type { Config } from "tailwindcss";

/**
 * ── BRAND ───────────────────────────────────────────────────────────
 * Every colour resolves to a CSS variable defined in app/globals.css.
 * To re-skin, edit the values there; this file should not need to
 * change per client.
 *
 * The palette is the live site's, unchanged — the hex values the Figma
 * export hardcoded inline, given names:
 *
 *   navy        #002f48  services top, contact ground, photo frames
 *   navy-deep   #001a2b  services gradient end, testimonials (desktop)
 *   navy-bar    #002336  nav, footer, form and tab panels
 *   navy-lift   #003a59  testimonials gradient start (phones only)
 *   teal        #0b8483  FAQ ground, accents, stat cards
 *   teal-light  #0d9694  hero / stats gradient start
 *   teal-dark   #0a7170  hero / stats gradient end
 *   teal-hover  #0a7372  footer CTA hover
 *   mint        #5dcaa5  eyebrows and icons on navy
 *   blue        #0077b6  "Book" / submit / call-card number
 *   blue-press  #005a8a  blue hover
 *   ink         #070301  dark text on white
 * ────────────────────────────────────────────────────────────────────
 */
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: v("navy"),
          deep: v("navy-deep"),
          bar: v("navy-bar"),
          lift: v("navy-lift"),
        },
        teal: {
          DEFAULT: v("teal"),
          light: v("teal-light"),
          dark: v("teal-dark"),
          hover: v("teal-hover"),
        },
        mint: v("mint"),
        blue: {
          DEFAULT: v("blue"),
          press: v("blue-press"),
        },
        ink: v("ink"),
      },
      fontFamily: {
        /** Headings, eyebrows, labels on cards — the "Rubik" role */
        display: "var(--font-display)",
        /** Running text, buttons, form — the "Inter" role */
        body: "var(--font-body)",
        /** The big stat figures — the "Roboto" role */
        figure: "var(--font-figure)",
        /** "Darren Aucoin's Plumbing" in the nav */
        wordmark: "var(--font-wordmark)",
      },
    },
  },
  plugins: [],
};
export default config;
