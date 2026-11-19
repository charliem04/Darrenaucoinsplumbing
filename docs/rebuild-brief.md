# DA Plumbing — Rebuild Brief

Nov 19, 2026 · @Charlie Meyers

Rebuild darrenaucoinplumbing.com on the CTL Pro template conventions. Structural change only — for now the visual design stays as it is.

## The job

Rebuild the Darren Aucoin Plumbing site on the structure and conventions used by `CTL_Roofing`, replacing the current Figma Make export. The site is and stays a **one-page site**. The visual design — colors, copy, section order, animations — is kept as it is. What changes is everything underneath it.

Why it is worth doing: the current site is a Figma Make export that was never cleaned up. It carries \~64,700 committed `node_modules` files, a complete shadcn component library plus MUI plus Emotion for a one-pager, and the entire page duplicated across a desktop component and a mobile component — each \~1,150 lines, each with its own copy of the contact-form logic. Any content change has to be made twice, and the two copies have already drifted.

Three hard constraints:

1. **No redesign.** The client knows this site. Same colors, same copy, same section order, same scroll reveals. If the rebuilt page does not look essentially identical to the current one, something has gone wrong.
2. **Forms stay on Web3Forms for now**, behind a small adapter. Haptic Forms is not finished and nothing moves onto it until it is, including client logins. The adapter is so that the swap is one config line later, not a second rebuild.
3. **No backend dependency.** Speed-to-lead Tier 0 does not exist yet. The site must work standing alone, and must stay buildable and deployable by someone who is not me.

## What is in the repo now

Repo: `github.com/charliem04/Darrenaucoinsplumbing`. Last commit 19 Jun 2026. Vite 6 + React 18, deployed as Cloudflare Workers static assets.

### Salvage

| File | What to take from it |
| --- | --- |
| `src/app/components/InteractiveHomeDesktop.tsx` | All copy, service list, FAQ text, testimonials, stats. The canonical source. |
| `src/app/components/InteractiveHomeMobile.tsx` | Read only to check for copy the desktop version lacks. Do not port it. |
| `src/app/hooks/useScrollReveal.ts`, `useCountUp.ts` | The reveal and count-up behavior. Reimplement on the template's motion primitives. |
| `src/styles/theme.css`, `globals.css` | The palette and type scale. |
| `src/imports/*.jpg`, `*.png` | The photography. Rename meaningfully — they are Figma content hashes today. |
| `public/` | `favicon.svg`, `logo.png`, `og-image.jpg`, `robots.txt`, `sitemap.xml` |
| `wrangler.jsonc` | The Worker name `darrenaucoinsplumbing`. Deploy target does not change. |

### Delete

- `node_modules/` from version control — 64,677 tracked files, \~457 MB of history. `git rm -r --cached node_modules` and add a real `.gitignore` as the first commit.
- `src/app/components/ui/` — the full shadcn set. The site uses a handful of these at most.
- MUI, Emotion, `recharts`, `react-dnd`, `react-slick`, `embla-carousel`, `canvas-confetti`, `input-otp`, `vaul`, `cmdk`, `react-day-picker`, `react-responsive-masonry`, `sonner`, `react-popper`, `react-resizable-panels`, and every unused Radix package.
- `src/imports/HomeDesktop/` and `src/imports/HomeMobile/` scaffolding, including the generated `svg-*.ts` files.
- `src/app/components/figma/ImageWithFallback.tsx` — replace with the template's image handling.
- `.idea/`, `default_shadcn_theme.css`, `ATTRIBUTIONS.md` if it only credits the Figma export.

The desktop/mobile split goes away entirely. One responsive page.

## Target structure

Next.js 14 with `output: "export"`, Tailwind, Framer Motion — matching `CTL_Roofing/ctl-roofing/`. Deployed as Workers static assets, as DA already is.

**Scope warning:** CTL has 23 routes because a roofing company needs them. DA is a one-pager with anchors. Copy CTL's *conventions*, not its page count. Build only what is listed below.

```
darrenaucoinsplumbing/
├── client.config.ts        # every per-client value, one file
├── next.config.mjs
├── tailwind.config.ts
├── wrangler.jsonc          # name: darrenaucoinsplumbing, assets: ./out
├── app/
│   ├── layout.tsx
│   ├── page.tsx            # the one page, composed of sections
│   ├── globals.css
│   ├── not-found.tsx
│   ├── privacy/page.tsx    # required — the form collects personal data
│   ├── robots.ts
│   └── sitemap.ts
├── components/             # Nav Hero Services About FaqList Contact Footer
│                           # CallCard StickyCTA Reveal SectionHead Button JsonLd
├── content/
│   ├── services.ts
│   ├── faqs.ts
│   ├── testimonials.ts
│   └── types.ts
├── lib/
│   ├── submitContact.ts    # the form adapter
│   ├── motion.ts
│   └── phone.ts
├── scripts/
│   ├── csp.mjs             # build fails if CSP drifts
│   └── seo.mjs
└── public/                 # images, renamed from the Figma hashes
```

### The conventions that matter

**Everything per-client lives in `client.config.ts`.** Identity, phone, email, hours, service areas, socials, section headings, CTA labels. If you find yourself editing a component to change a business fact, that fact belongs in the config. Copy CTL's section-comment style so the file reads as documentation.

**Content arrays live in `content/`, typed in `content/types.ts`.** Services, FAQs and testimonials are data, not JSX. Components map over them.

**No booking provider.** DA has no scheduler today. Set `booking: { provider: "none" }` and have the booking band render nothing. Leave the shape in place so adding Cal.com later is a config change.

**The form is an adapter,** `lib/submitContact.ts`:

```
// Today: web3forms. Later: hapticforms, when it is finished.
// Swapping providers must be a one-line change here plus an env var.
export type FormProvider = "web3forms" | "hapticforms";
```

Carry over from CTL's version: the honeypot check, the `scrub()` whitespace/control-character cleanup, and the fail-loudly-if-unconfigured behavior. Do **not** carry over the un-awaited relay POST — there is no relay here yet.

The current site's honeypot field is named `botcheck`. Keep a honeypot, but name it something a browser autofill will not touch, and comment why.

## What must survive verbatim

These are live business facts and client-approved copy. Read them out of the existing components rather than inventing anything; the values below are the ones to check your work against.

|  | Value |
| --- | --- |
| Phone | `337-224-4852` — `tel:` and E.164 `+13372244852` for the config |
| Email | `contact@darrenaucoinplumbing.com` |
| Hero headline | "Fast, Honest Plumbing When You Need it Most" |
| Deep navy | `#002f48` |
| Darker navy (gradient end) | `#001a2b` |
| Teal accent | `#0b8483` |

### Section order

Top to bottom, as the current desktop component builds it:

1. Hero
2. Services — navy gradient, `#002f48` → `#001a2b`
3. About — white ground
4. FAQ — teal ground, `#0b8483`
5. Contact — navy, `#002f48`
6. Footer

Between Services and About the current page also runs specialty, equipment, testimonials, stats and a CTA band. Pull each one's copy from `InteractiveHomeDesktop.tsx` and keep them in place.

### Behaviors to preserve

- Scroll-reveal on each section, with the staggered delays the current `REVEAL_DELAYS` array applies to card grids.
- The count-up animation on the stats figures.
- The call popup — clicking the phone CTA opens a small card rather than firing `tel:` immediately on desktop. Keep that; it is deliberate.
- Smooth in-page anchor scrolling to services, about, FAQ and contact.

All of the copy is currently hardcoded inline in JSX. Extracting it into `client.config.ts` and `content/` is a large part of this job — move the strings, do not retype them, so nothing is paraphrased by accident.

## Build steps

Work on a branch. Commit at the end of each step so any one of them can be reverted on its own.

1. **Stop tracking `node_modules`.** `git rm -r --cached node_modules`, write a real `.gitignore` (`node_modules/`, `.next/`, `out/`, `dist/`, `.env*.local`, `.idea/`), commit. Do this first — every later step is slower while 64,700 files are in the index.
2. **Extract the content before touching the build.** Read `InteractiveHomeDesktop.tsx` and write out `client.config.ts`, `content/services.ts`, `content/faqs.ts`, `content/testimonials.ts`. Move the strings across; do not paraphrase. At the end of this step the old site still runs and the content files are unused — that is fine, and it means the extraction can be reviewed on its own.
3. **Scaffold Next.js alongside the Vite app.** `app/`, `next.config.mjs` with `output: "export"`, `tailwind.config.ts` carrying the palette from step 2, `app/globals.css`. Do not delete the Vite app yet.
4. **Port section by section, in page order:** Hero, Services, About, FAQ, Contact, Footer, then the bands between them. One component per section, each reading from config and content. Check each against the live site as you go rather than at the end.
5. **Reimplement the motion.** Scroll reveal, staggered delays, count-up, call popup. Use Framer Motion and the template's `lib/motion.ts` conventions rather than porting the old hooks verbatim.
6. **Wire the form.** `lib/submitContact.ts` with the provider adapter, honeypot, `scrub()`, and loud failure when unconfigured. `NEXT_PUBLIC_WEB3FORMS_KEY` in `.env.local`, and document it in `.env.example`.
7. **Images.** Move `src/imports/*` into `public/`, renamed descriptively (`hero.jpg`, `water-heater-install.jpg`). Convert to WebP at a sensible max width. Update references.
8. **SEO and headers.** `app/sitemap.ts`, `app/robots.ts`, JSON-LD for a local plumbing business using the config's identity and address, `scripts/csp.mjs` wired into the build so CSP drift fails it.
9. **Delete the Vite app.** `src/`, `vite.config.ts`, `index.html`, `postcss.config.mjs` if superseded, and every dependency from the delete list. `package.json` should end up with roughly: next, react, react-dom, framer-motion, tailwindcss, and the fontsource packages.
10. **Point `wrangler.jsonc` at `./out`** and deploy to a preview first.

Steps 1 and 2 are worth doing even if the rest stalls — they are pure wins on their own.

## Rules

**Do not redesign.** Not the palette, not the copy, not the section order, not the layout. If something looks wrong to you, leave it and say so at the end rather than fixing it. This is a structural rebuild of a site a paying client already approved.

**Do not add pages.** No blog, no service detail routes, no case studies, no team page. The site is a one-pager plus a privacy page and a 404. CTL has 23 routes; that is CTL's business, not this one.

**Do not add a CMS, analytics, chat widget, cookie banner or consent manager** unless the existing site already has one. Nothing new goes in the third-party script list without being asked for.

**Do not build a backend.** No API routes, no Workers beyond the static-asset one, no database. The form posts to Web3Forms and that is the whole server story today.

**Do not touch the live deployment** until the preview has been reviewed. Deploy to a preview URL and stop.

**Ask before guessing at a business fact.** If a service, a price, a warranty claim, a license number or a service area is ambiguous in the old code, leave a `TODO(charlie)` and list it at the end. An invented credential on a tradesman's site is a real problem, not a cosmetic one.

**Keep the client-facing failure modes loud.** A contact form that silently drops a lead behind a success message is the worst bug this site can have. If the form is unconfigured or the request fails, say so to the visitor and tell them to call.

### Where to look things up

The reference implementation is `github.com/charliem04/CTL_Roofing`, in `ctl-roofing/`. Useful files: `client.config.ts` for config structure and comment style, `content/types.ts` and `content/services.ts` for content shape, `lib/submitContact.ts` for the form path, `components/Contact.tsx` and `components/FaqList.tsx` for section patterns, `scripts/csp.mjs` for the CSP check. Read it for conventions; do not copy CTL's content or its roofing-specific components.

## Done when

- [ ] `git ls-files | wc -l` is under 200, and `node_modules` is not tracked
- [ ] `npm run build` produces `out/` with no errors and no new warnings
- [ ] The rebuilt page is visually indistinguishable from the current live site at 390px, 768px and 1440px
- [ ] Every business fact on the page comes from `client.config.ts` or `content/` — no copy hardcoded in a component
- [ ] One responsive page; no desktop/mobile component pair anywhere
- [ ] Scroll reveals, stat count-ups and the call popup behave as they do today
- [ ] The contact form sends a real test submission and it arrives in the inbox
- [ ] With the Web3Forms key removed, the form shows a visible error telling the visitor to call — never a false success
- [ ] Changing `phone` in `client.config.ts` changes every phone number on the page
- [ ] Lighthouse on the built output is ≥ 95 for performance and accessibility
- [ ] Deployed to a preview URL, not to production
- [ ] Any `TODO(charlie)` items are listed in the final summary

### Report back

At the end, give: what changed, the before/after dependency count, anything in the old site whose intent was unclear, and anything deliberately left undone.
