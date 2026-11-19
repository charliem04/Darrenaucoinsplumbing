/**
 * `npm run tune`: the dev server with the photo tuner switched on, plus
 * a tiny local writer that saves the tuner's changes into
 * content/photoFraming.json (the dev server then reloads them).
 *
 * Local only: the writer listens on 127.0.0.1, accepts requests only
 * from localhost pages, and only updates photos already in the file.
 */
import { spawn } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { delimiter, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const FILE = new URL("../content/photoFraming.json", import.meta.url);
const PORT = 4174;
const LOCAL = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

const num = (v, lo, hi, fallback) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : fallback;
};

const line = (f) => `{ "x": ${f.x}, "y": ${f.y}, "zoom": ${f.zoom} }`;

/** One setting per line, so a diff shows exactly which photo and size changed. */
const format = (m) =>
  "{\n" +
  Object.entries(m)
    .map(
      ([k, p]) =>
        `  ${JSON.stringify(k)}: {\n    "mobile": ${line(p.mobile)},\n    "desktop": ${line(p.desktop)}\n  }`,
    )
    .join(",\n") +
  "\n}\n";

const MODES = ["mobile", "desktop"];

const server = createServer((req, res) => {
  const origin = req.headers.origin ?? "";
  if (LOCAL.test(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
  }
  if (req.method === "OPTIONS") return res.writeHead(204).end();
  if (req.method !== "POST" || req.url !== "/framing" || !LOCAL.test(origin)) return res.writeHead(404).end();

  let body = "";
  req.on("data", (c) => {
    body += c;
    if (body.length > 100_000) req.destroy();
  });
  req.on("end", () => {
    try {
      const incoming = JSON.parse(body);
      const current = JSON.parse(readFileSync(FILE, "utf8"));
      let changed = 0;
      for (const key of Object.keys(current)) {
        for (const mode of MODES) {
          const f = incoming[key]?.[mode];
          const was = current[key][mode];
          if (!f || !was) continue;
          const next = {
            x: num(f.x, 0, 100, was.x),
            y: num(f.y, 0, 100, was.y),
            zoom: num(f.zoom, 1, 3, was.zoom),
          };
          if (JSON.stringify(next) !== JSON.stringify(was)) changed++;
          current[key][mode] = next;
        }
      }
      if (changed) {
        writeFileSync(FILE, format(current));
        console.log(`[tune] saved ${changed} change${changed === 1 ? "" : "s"} to content/photoFraming.json`);
      }
      res.writeHead(204).end();
    } catch (err) {
      res.writeHead(400).end(String(err));
    }
  });
});

server.on("error", (err) => {
  console.error(`[tune] writer could not start on port ${PORT}: ${err.message}`);
  process.exit(1);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`[tune] writer ready. Open the address Next prints below; drag the outlined photos.`);
  const dev = spawn("npx next dev", {
    stdio: "inherit",
    shell: true,
    cwd: ROOT, // works from any folder
    env: {
      ...process.env,
      // The node running this script, first on PATH, so npx is found.
      PATH: dirname(process.execPath) + delimiter + (process.env.PATH ?? ""),
      NEXT_PUBLIC_PHOTO_TUNER: "1",
    },
  });
  dev.on("exit", (code) => {
    server.close();
    process.exit(code ?? 0);
  });
});
