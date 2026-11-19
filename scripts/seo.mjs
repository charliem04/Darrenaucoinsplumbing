/**
 * Post-build SEO invariants, checked against the real output.
 *
 * Cheap to get right, invisible when they go wrong, easy to undo by
 * accident: a title grows during a content edit and is truncated in
 * search results for months before anyone notices. Checking the built
 * HTML means it cannot be fooled by how a title is assembled.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

/** Google truncates around 600px, conventionally ~60 characters. */
const MAX_TITLE = 60;
/** Descriptions are truncated around here too. */
const MAX_DESCRIPTION = 160;

function pages(dir = "out", out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) pages(p, out);
    else if (name === "index.html") out.push(p);
  }
  return out;
}

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'");

export function checkSeo() {
  const problems = [];
  const found = pages();

  for (const f of found) {
    const path = "/" + relative("out", f).split(sep).join("/").replace("index.html", "");
    const html = readFileSync(f, "utf8");

    const title = decode((html.match(/<title>([^<]*)<\/title>/) ?? [, ""])[1]);
    const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) ?? [, ""])[1]);

    if (!title) problems.push(`${path} has no <title>`);
    else if (title.length > MAX_TITLE) problems.push(`${path} title is ${title.length} chars: ${title}`);

    // Pages kept out of search don't need a description tuned for it.
    if (/<meta name="robots" content="[^"]*noindex/.test(html)) continue;

    if (!desc) problems.push(`${path} has no description`);
    else if (desc.length > MAX_DESCRIPTION) problems.push(`${path} description is ${desc.length} chars`);

    // Structured data: present, and valid JSON (a syntax slip makes
    // search engines ignore the whole block, silently).
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    if (!blocks.length) problems.push(`${path} has no JSON-LD`);
    for (const [, json] of blocks) {
      try {
        JSON.parse(json);
      } catch (err) {
        problems.push(`${path} JSON-LD does not parse: ${err.message}`);
      }
    }

    // Exactly one main heading.
    const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
    if (h1s !== 1) problems.push(`${path} has ${h1s} <h1> elements (want exactly 1)`);

    // Every image says what it shows, or is marked decorative with alt="".
    for (const [img] of html.matchAll(/<img\b[^>]*>/g)) {
      if (!/\balt="/.test(img)) problems.push(`${path} image has no alt attribute: ${img.slice(0, 90)}…`);
      const alt = (img.match(/\balt="([^"]*)"/) ?? [, ""])[1];
      // One-word alts ("Equipment") describe nothing; a decorative "" is fine.
      if (alt && !/\s/.test(alt.trim())) problems.push(`${path} image alt "${alt}" is too vague`);
    }
  }

  if (problems.length) {
    console.error("[seo] " + problems.join("\n      "));
    return false;
  }
  console.log(`[seo] ${found.length} pages: titles, descriptions and schema in range`);
  return true;
}

if (process.argv[1] && process.argv[1].endsWith("seo.mjs")) {
  process.exit(checkSeo() ? 0 : 1);
}
