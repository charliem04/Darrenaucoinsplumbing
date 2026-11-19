# Darren Aucoin's Plumbing

The one-page site for darrenaucoinsplumbing.com. Next.js 14 static
export, Tailwind, Framer Motion, served as Cloudflare Workers static
assets. No backend: the contact form posts straight to Web3Forms.

## Run it

```sh
npm install
cp .env.example .env.local   # then paste the Web3Forms key
npm run dev                  # http://localhost:3000
```

`npm run build` writes the site to `out/` and then runs two checks that
fail the build on purpose:

- `scripts/csp.mjs` — appends the Content-Security-Policy to
  `out/_headers` and fails if any external origin in the output is not
  accounted for.
- `scripts/seo.mjs` — fails on a missing or over-long title or
  description, or missing JSON-LD.

## Change something

| To change…                                   | Edit                         |
| -------------------------------------------- | ---------------------------- |
| Phone, email, address, hours, any copy line  | `client.config.ts`           |
| Services, FAQs, testimonials, stats          | `content/*.ts`               |
| Colours                                      | `app/globals.css` (tokens)   |
| Animation timing                             | `lib/motion.ts`              |
| Where the form sends                         | `lib/submitContact.ts`       |
| Photos                                       | `public/images/`             |

Change `phone` **and** `phoneE164` together — every number on the page
derives from them, and the build fails if they disagree.

## Deploy

```sh
npm run preview:deploy   # uploads a version and prints a preview URL — production untouched
npm run deploy           # promotes to production
```

`NEXT_PUBLIC_WEB3FORMS_KEY` must be set in the environment that runs the
build, or the deployed form will refuse to send (and say so).

`docs/` holds the motion and depth notes written for the old Figma
export; they reference files that no longer exist but are kept for the
design pass.
