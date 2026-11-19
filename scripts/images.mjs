/**
 * One-off: convert the Figma export's photographs (content-hash names
 * under src/imports/) to WebP under public/images/ with descriptive
 * names. Already run — its output is committed — and kept so the
 * mapping from old file to new name is on record.
 *
 *   node scripts/images.mjs   (needs `npm i -D sharp` first)
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const MAP = {
  "src/imports/header-1.jpg": "hero",
  "src/imports/header.jpg": "septic-tank-pump-out",
  "src/imports/imagejpeg_0-6.jpg": "emergency-water-line",
  "src/imports/imagejpeg_1-4-1.jpg": "sewer-work", // also the CTA band
  "src/imports/imagejpeg_0-4-1.jpg": "water-meter-installation",
  "src/imports/imagejpeg_1-1.jpg": "excavation",
  "src/imports/imagejpeg_0-7-1.jpg": "residential-plumbing",
  "src/imports/imagejpeg_1-5-2.jpg": "plumbing-repairs",
  "src/imports/imagejpeg_1.jpg": "equipment", // = HomeDesktop/07eab3cc….png
  "src/imports/HomeDesktop/6621e00db1f5dcbbe1342f61071d5f712fa2dd7a.png": "logo-nav",
  "src/imports/HomeDesktop/caef332c103340cf1afa0979e064e9a554d1c65c.jpg": "logo-footer",
};

/** Nothing on the page displays wider than this at 2× density. */
const MAX_WIDTH = 1280;

/*
 * WebP is the default, but several of these photos are noisy phone
 * shots that were already tightly compressed as JPEG — re-encoding made
 * them up to 60% LARGER. So each image keeps whichever is smaller: the
 * WebP, or the original JPEG/PNG bytes under the new name. (All sources
 * are already under MAX_WIDTH, so the original needs no resize.)
 */
mkdirSync("public/images", { recursive: true });
for (const [src, name] of Object.entries(MAP)) {
  const original = readFileSync(src);
  const meta = await sharp(original).metadata();
  const webp = await sharp(original)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 75, effort: 6 })
    .toBuffer();
  const keepOriginal = meta.width <= MAX_WIDTH && original.length <= webp.length;
  const ext = keepOriginal ? (meta.format === "jpeg" ? "jpg" : meta.format) : "webp";
  const out = `public/images/${name}.${ext}`;
  writeFileSync(out, keepOriginal ? original : webp);
  const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
  console.log(
    `${src} → ${out} (${meta.width}×${meta.height}, ${kb(keepOriginal ? original.length : webp.length)}; ` +
      `webp ${kb(webp.length)} vs original ${kb(original.length)})`
  );
}
