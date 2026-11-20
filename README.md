# Darren Aucoin's Plumbing

The one-page site for darrenaucoinsplumbing.com. Next.js 14 static
export, Tailwind, Framer Motion, served as Cloudflare Workers static
assets. No backend: the contact form posts straight to Web3Forms.

## Run it

```sh
npm install
cp .env.example .env.local   # then paste the Web3Forms access key
npm run dev                  # http://localhost:3000
```

| Command                  | What it does                                                        |
| ------------------------ | ------------------------------------------------------------------- |
| `npm run dev`            | Local dev server                                                    |
| `npm run tune`           | Dev server plus the photo tuner (see below)                         |
| `npm run build`          | Builds the site into `out/`, then runs the CSP and SEO checks       |
| `npm run typecheck`      | TypeScript check only                                               |
| `npm run preview:deploy` | Builds and uploads a **preview** version; production is untouched   |
| `npm run deploy`         | Builds and **publishes to production**                              |

`npm run build` fails on purpose when:

- `scripts/csp.mjs`: an external origin in the output isn't covered by the
  Content-Security-Policy it appends to `out/_headers`.
- `scripts/seo.mjs`: a page's title or description is missing or too long,
  its JSON-LD is missing or invalid, it doesn't have exactly one `<h1>`, or
  an image has no alt text (or a one-word one).

## Change something

| To change…                                   | Edit                         |
| -------------------------------------------- | ---------------------------- |
| Phone, email, address, hours, any copy line  | `client.config.ts`           |
| Services, FAQs, testimonials, stats          | `content/*.ts`               |
| How each photo is cropped / zoomed           | `npm run tune`, or `content/photoFraming.json` |
| Colours                                      | `app/globals.css` (tokens)   |
| Animation timing                             | `lib/motion.ts`              |
| Where the form sends                         | `lib/submitContact.ts`       |
| Photos                                       | `public/images/`             |

Change `phone` **and** `phoneE164` together. Every number on the page
derives from them, and the build fails if they disagree.

### Photo tuner

`npm run tune` starts the dev server with a panel for reframing photos:
drag a photo (orange outline) to choose which part shows, zoom with the
slider, nudge with the arrow keys. Each photo has a **mobile** framing
(under 1024px wide) and a **desktop** one; the tuner edits whichever
matches the window's width. Changes save straight to
`content/photoFraming.json`; commit that file. The tuner never ships: it is
compiled out of production builds.

A new photo becomes tunable by adding it to `content/photoFraming.json`
and spreading `framing("its-key")` onto its `<Image>` (see `lib/framing.ts`).

## SEO notes

It's one page on purpose. Everything a search engine needs is in that
page's HTML: every service's copy (tab panels and specialty details are
in the HTML, hidden until opened), descriptive alt text, and one JSON-LD
graph (Plumber, WebSite, WebPage, FAQPage) built from `client.config.ts`
and `content/`, so it can't disagree with the page. `/privacy/` is
`noindex`; the sitemap lists only `/`.

## Form security

The form posts from the browser straight to Web3Forms (its free plan
refuses server-side calls), so the checks here run in the page:

| Check | Where |
| --- | --- |
| Each box accepts only its own characters as you type; control, zero-width and bidi characters are stripped | `lib/formRules.ts` (`filter`, `stripControl`) |
| Answers must be the right shape (10-digit phone, real email, listed service, no links in details) | `lib/formRules.ts` (`validateContact`) |
| Only a fixed set of cleaned keys is sent | `lib/formRules.ts` (`serializeContact`), `lib/submitContact.ts` |
| Honeypot field: a filled one shows success and sends nothing | `components/ContactForm.tsx` |
| Too fast after page load (bot), 10s between sends, 3 per 15 min per browser | `components/ContactForm.tsx`, `lib/rateLimit.ts` |
| Cloudflare Turnstile, when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set | `components/Turnstile.tsx` |

A bot that posts to the Web3Forms API directly skips all of that. What
stops it is on Web3Forms' side: its spam filter, and the Turnstile check
once the widget's **secret** key is entered in the Web3Forms dashboard
(form Settings → captcha → turnstile, a Web3Forms Pro feature). Until
then the widget only stops bots that drive this page.

## Deploy

```sh
npm run preview:deploy   # prints a preview URL; production untouched
npm run deploy           # publishes to production
```

`NEXT_PUBLIC_WEB3FORMS_KEY` must be set (in `.env.local`) on the machine
that runs the build, or the deployed form refuses to send and tells the
visitor to call instead.

`docs/rebuild-brief.md` is the brief the Next.js rebuild was done to.
