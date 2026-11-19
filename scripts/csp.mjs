/**
 * ════════════════════════════════════════════════════════════════════
 *  CONTENT-SECURITY-POLICY, generated at build time.
 *
 *  public/_headers carries the headers that never change; this script
 *  appends the CSP to out/_headers after `next build`.
 *
 *  The drift check is the part that keeps it honest: every https origin
 *  that appears anywhere in out/ must be allowed by the policy or
 *  declared below as something the browser never fetches. Adding an
 *  embed, a font CDN or an analytics script fails the build until
 *  somebody decides which of those it is. Nothing joins the
 *  third-party list by accident.
 *
 *  ── WHY script-src CARRIES 'unsafe-inline' ──────────────────────────
 *
 *  Next puts several inline <script> blocks on every page (the data
 *  that hydrates it), and a static export has no server to issue a
 *  nonce. Hashing them per build is fragile: one byte of drift and the
 *  browser blocks hydration, a total outage caused by a security header
 *  on a site whose job is to take phone calls.
 *
 *  What the policy still buys: no script from an unlisted origin, no
 *  plugins, no <base> hijack, no framing. That covers the realistic
 *  threat for a static brochure page, because nothing renders
 *  user-supplied HTML — React escapes every string, and the only
 *  dangerouslySetInnerHTML uses are our own: the JSON-LD built from
 *  client.config (components/JsonLd.tsx) and the <noscript> style in
 *  app/layout.tsx. If either ever takes a value from a URL, a form or
 *  an API, come back to this comment.
 * ════════════════════════════════════════════════════════════════════
 */
import { appendFileSync, existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const HEADERS = join(OUT, "_headers");
const MARKER = "# ── Content-Security-Policy (generated) ──";

function origin(u) {
  try {
    return new URL(u).origin;
  } catch {
    return "";
  }
}

/**
 * Origins in the output that are LINK TARGETS ONLY — an href a person
 * clicks, or a string inside JSON-LD / metadata. The browser never
 * fetches them as a subresource, so CSP has no say over them.
 */
const LINK_ONLY = new Set([
  "https://schema.org", // JSON-LD @context — a string, never fetched
  "https://darrenaucoinsplumbing.com", // our own canonical / og URLs
  "https://www.facebook.com", // sameAs in JSON-LD
  "https://www.google.com", // Google Maps listing in JSON-LD
  // Framework strings baked into React/Next error messages.
  "https://nextjs.org",
  "https://react.dev",
  "https://reactjs.org",
  "https://github.com",
]);

/**
 * Origins that appear only as constants inside framework code this site
 * never exercises (Next ships a table of font-provider URLs whether or
 * not next/font is used), or inside a CSS/licence comment.
 */
const INERT = new Set([
  "https://fonts.googleapis.com",
  "https://fonts.gstatic.com",
  "https://use.typekit.net",
  "https://tailwindcss.com",
  "https://www.w3.org", // SVG/XML namespaces
  "https://fontsource.org", // licence banner in the Fraunces CSS
]);

export function buildCsp() {
  return [
    "default-src 'self'",
    // See the header comment for why 'unsafe-inline' is here.
    "script-src 'self' 'unsafe-inline'",
    // React and Framer Motion write style attributes; no nonce for those.
    "style-src 'self' 'unsafe-inline'",
    // data: for any inlined SVG. Every photo is served from /images.
    "img-src 'self' data:",
    // Fraunces is self-hosted from @fontsource — nothing external.
    "font-src 'self'",
    // The contact form posts here from the browser (lib/submitContact.ts).
    // When the provider switches to Haptic Forms, its endpoint goes here.
    "connect-src 'self' https://api.web3forms.com",
    "frame-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

function originsInBuild(dir = OUT) {
  const found = new Set();
  const walk = (d) => {
    for (const name of readdirSync(d)) {
      const p = join(d, name);
      if (statSync(p).isDirectory()) {
        walk(p);
        continue;
      }
      if (!/\.(html|js|css|json|txt|xml)$/.test(name)) continue;
      for (const m of readFileSync(p, "utf8").matchAll(/https:\/\/[a-zA-Z0-9.-]+[a-zA-Z0-9]/g)) {
        const o = origin(m[0]);
        if (o) found.add(o);
      }
    }
  };
  walk(dir);
  return found;
}

function checkDrift(csp) {
  const allowed = new Set([...csp.matchAll(/https:\/\/[a-zA-Z0-9.*-]+/g)].map((m) => m[0]));
  return [...originsInBuild()].filter(
    (o) => !LINK_ONLY.has(o) && !INERT.has(o) && !allowed.has(o)
  );
}

export function applyCsp() {
  if (!existsSync(HEADERS)) {
    console.error(`[csp] ${HEADERS} missing — is public/_headers in place, and did next build run?`);
    return false;
  }
  if (readFileSync(HEADERS, "utf8").includes(MARKER)) {
    console.log("[csp] already applied, nothing to do");
    return true;
  }

  const csp = buildCsp();
  const drift = checkDrift(csp);
  if (drift.length) {
    console.error(
      "[csp] Origins in the build that the policy does not cover:\n" +
        drift.map((o) => `        ${o}`).join("\n") +
        "\n      Add each to the policy in scripts/csp.mjs if the browser fetches it,\n" +
        "      or to LINK_ONLY if it is only ever an href a person clicks."
    );
    return false;
  }

  appendFileSync(
    HEADERS,
    `\n${MARKER}\n# Generated by scripts/csp.mjs. Edit the policy there, not here.\n/*\n  Content-Security-Policy: ${csp}\n`
  );
  console.log(`[csp] applied (${csp.length} chars)`);
  return true;
}

if (process.argv[1] && process.argv[1].endsWith("csp.mjs")) {
  process.exit(applyCsp() ? 0 : 1);
}
