# Depth & Polish Implementation Guide
### Darren Aucoin's Plumbing — final round of visual polish

This guide turns the flat, stacked-color layout into a layered, three-dimensional
site. Changes are ordered by impact-per-effort. Each change has a *why*, the files
to touch, and copy-paste class strings.

**Files affected throughout:**
- `src/app/components/InteractiveHomeDesktop.tsx`
- `src/app/components/InteractiveHomeMobile.tsx`

Apply every change to **both** files — they share structure but have different
padding/sizing values. Where a value differs, mobile is noted in parentheses.

**Before you start:** create a branch (`git checkout -b visual-polish`) so you can
diff and roll back. Test after each numbered section rather than all at once.

---

## Change 1 — Card shadows + hover lift
**Impact: highest. Effort: low.**

### Why
Cards (testimonials, service panels, specialty rows) currently sit flush on the
background with only a faint 1px border. Nothing floats. A real shadow plus a
small upward shift on hover is the single strongest depth cue available and also
makes the page feel responsive to the cursor.

### Testimonial cards
Find the testimonial card wrapper (the `<div>` directly inside the `.map()` over
the testimonials array).

REPLACE the card's className — currently a plain border/background — with:

```jsx
className="flex-1 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.12)]
  rounded-[16px] p-[32px] shadow-[0_8px_24px_rgba(0,0,0,0.25)]
  hover:shadow-[0_16px_40px_rgba(0,0,0,0.40)] hover:-translate-y-1
  transition-all duration-300"
```

(Mobile: use `p-[24px]` instead of `p-[32px]`.)

### Specialty service rows
These already have a hover state on desktop but no shadow and no lift. In the
specialty `.map()`, the non-open branch of the className currently reads roughly:

```
'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.08)] hover:bg-[rgba(11,132,131,0.08)] hover:border-[rgba(11,132,131,0.3)]'
```

REPLACE that non-open branch with:

```
'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:bg-[rgba(11,132,131,0.08)] hover:border-[rgba(11,132,131,0.3)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.32)] hover:-translate-y-0.5'
```

The button already has `transition-all duration-300`, so the lift animates for free.

### Rule of thumb for shadows
- Shadows are always **dark and soft**, never gray, never hard.
- Resting shadow is subtle; hover shadow is roughly 2x deeper.
- Every clickable card gets the SAME treatment — consistency reads as quality.

---

## Change 2 — Gradient section backgrounds
**Impact: high. Effort: low.**

### Why
A solid rectangle of `#002336` is the flattest possible surface. A gentle
top-to-bottom gradient between two near-shades reads as a light source and gives
the whole section depth with zero added elements.

### Replacements
Search each file for these solid backgrounds and swap them:

| Section | Find | Replace with |
|---|---|---|
| Hero (teal) | `bg-[#0b8483]` | `bg-gradient-to-b from-[#0d9694] to-[#0a7170]` |
| Services (dark navy) | `bg-[#002336]` | `bg-gradient-to-b from-[#002f48] to-[#001a2b]` |
| Testimonials (mid navy) | `bg-[#002f48]` | `bg-gradient-to-b from-[#003a59] to-[#002336]` |
| Stats (teal) | `bg-[#0b8483]` | `bg-gradient-to-b from-[#0d9694] to-[#0a7170]` |

Note the hero and stats share the teal gradient — that's intentional and fine.

**Keep gradients subtle.** Two close shades only. If you can clearly see a
"gradient," it's too strong — dial the two colors closer together.

---

## Change 3 — Fix the hard section seams
**Impact: high. Effort: medium.**

### Why
Right now teal meets navy at a hard horizontal line. Hard horizontal stripes are
the visual signature of a flat site. Two ways to fix it — do the color-match for
most seams and reserve the divider for one feature seam.

### Option A — invisible seam (use for most transitions)
Make the gradient of one section *end* on the exact color the next section
*begins* with. Using the Change 2 values, the seams already nearly match. To make
a seam fully invisible, set the bottom color of the upper section equal to the
top color of the lower section.

Example — Services into Testimonials:
- Services ends at `#001a2b`
- So Testimonials should start at `#001a2b`: `from-[#001a2b] to-[#002336]`

### Option B — shaped divider (use once, for the hero → services seam)
Add an SVG wave between the two sections so the boundary has a curve. Place this
`<div>` as the LAST child inside the hero section, after the hero content:

```jsx
{/* Wave divider into Services */}
<div className="relative w-full leading-[0] -mb-px" aria-hidden="true">
  <svg className="block w-full h-[60px]" viewBox="0 0 1440 60"
       preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,24 L1440,60 L0,60 Z"
          fill="#002f48" />
  </svg>
</div>
```

The `fill` MUST equal the `from-` color of the next section (`#002f48`). On mobile
reduce the height: `h-[36px]`.

Do this for ONE seam only. Multiple wave dividers look busy.

---

## Change 4 — Layer the hero image
**Impact: high. Effort: medium.**

### Why
The hero stacks text → buttons → photo as three separate blocks. Overlap is the
strongest depth signal there is: when an element crosses a section boundary, the
page stops looking like flat slices.

### Desktop
The hero image wrapper currently has `border-8 border-[#002f48]` and lives inside
the hero section. Two upgrades:

1. **Let it overlap the next section.** Add a negative bottom margin so the image
   pushes down into Services, and raise it above with z-index:

```jsx
className="relative z-10 rounded-[32px] shrink-0 w-full max-w-[1266px]
  overflow-hidden border-8 border-[#002f48]
  shadow-[0_24px_60px_rgba(0,0,0,0.45)] -mb-[80px]"
```

   The `-mb-[80px]` pulls the section below up under the image; the shadow makes
   the image clearly float above the seam.

2. Because the image now overlaps, make sure the Services section's top padding
   has room — it already uses `py-[112px]`, which is enough clearance.

### Mobile
Mobile space is tight; skip the overlap, just add depth to the image:

```jsx
className="w-full rounded-[16px] overflow-hidden
  shadow-[0_16px_32px_rgba(0,0,0,0.4)]"
```

---

## Change 5 — Atmospheric glow behind section headings
**Impact: medium. Effort: low.**

### Why
The large dark sections are big fields of dead, even color. A very faint radial
glow behind each section heading gives the eye something to settle on and implies
depth and atmosphere.

### How
Each section's outer `<div>` already has `relative`. Add this as the FIRST child
inside the section, before the content:

```jsx
{/* Ambient glow */}
<div aria-hidden="true"
     className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2
       w-[600px] h-[400px] blur-[120px]
       bg-[radial-gradient(ellipse,rgba(11,132,131,0.22),transparent_70%)]" />
```

Use it in the Services and Testimonials sections (the dark ones). Skip it on the
teal sections — there's not enough contrast for it to read.

(Mobile: `w-[320px] h-[260px] blur-[80px]` and lower the opacity to `0.16`.)

**Watch:** ensure the actual section content sits in a `relative z-10` wrapper so
the glow stays behind it.

---

## Change 6 — Depth on icons and stat numbers
**Impact: medium. Effort: low.**

### Why
The specialty-service icon tiles and the stat numbers are flat. Small, consistent
depth moments accumulate into an overall polished feel.

### Icon tiles (specialty services)
The icon container in the open state is `bg-[#0b8483]`. Add a soft ring and a
subtle shadow so it reads as a raised chip:

```jsx
// open-state icon tile
'bg-[#0b8483] text-white shadow-[0_4px_12px_rgba(11,132,131,0.5)] ring-1 ring-[rgba(255,255,255,0.15)]'
```

### Testimonial avatar
The avatar circle is a flat `bg-[rgba(255,255,255,0.2)]`. Add an inset highlight
and ring:

```jsx
className="relative shrink-0 size-[48px] rounded-full flex items-center
  justify-center bg-[rgba(255,255,255,0.12)]
  ring-1 ring-[rgba(255,255,255,0.18)]
  shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]"
```

### Stat numbers
Give the big stat numbers a subtle gradient fill so they have presence:

```jsx
className="bg-gradient-to-b from-white to-[rgba(255,255,255,0.7)]
  bg-clip-text text-transparent font-['Rubik:Medium',sans-serif]
  font-medium text-[52px] tracking-[-0.5px]"
```

(Mobile: `text-[40px]`.)

---

## Change 7 — Tighten type hierarchy
**Impact: medium. Effort: low.**

### Why
Flatness is partly a contrast problem. The small eyebrow labels ("Services",
"Track record") are currently 16px semibold — nearly the same weight as body
text, so the hierarchy feels mushy. Widening the gap between levels makes the
page feel deliberate.

### Eyebrow labels
Find the eyebrow paragraphs (e.g. the "Services" label above "What we handle").
The Specialty section already uses the correct treatment — match it everywhere.

REPLACE the eyebrow className with:

```jsx
className="font-['Rubik:Medium',sans-serif] font-medium text-[13px]
  tracking-[0.12em] uppercase text-[#5dcaa5]"
```

(Mobile: `text-[12px]`.)

This makes eyebrows small, uppercase, letter-spaced, and a distinct accent color —
clearly subordinate to the 36–52px headings.

### Body text under headings
Drop section-intro body copy to a slightly lower opacity so headings dominate:
add `text-[rgba(255,255,255,0.75)]` to the intro paragraph (replacing plain
`text-white`).

---

## Final QA checklist

Before merging, verify:

- [ ] Every clickable card has a hover lift AND a hover shadow
- [ ] Hover lift direction is consistent (always up, `-translate-y`)
- [ ] All section backgrounds are gradients, none are solid fills
- [ ] No hard horizontal seam between any two sections
- [ ] Wave divider used at most ONCE
- [ ] Glow divs have `aria-hidden="true"` and `pointer-events-none`
- [ ] Section content sits in a `relative z-10` wrapper above any glow
- [ ] Changes applied to BOTH Desktop and Mobile files
- [ ] Mobile sizing values used on mobile (smaller padding/blur/text)
- [ ] Tested at 375px, 768px, 1280px, 1920px widths
- [ ] No layout shift from the hero `-mb-[80px]` overlap
- [ ] `prefers-reduced-motion` respected — see note below

### Accessibility note
The hover transforms are decorative. If the project has a global
`prefers-reduced-motion` rule, transitions are already disabled for users who
need that. If not, add this once to `src/styles/theme.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

### A note on restraint
Depth is easy to overdo. If after all seven changes it looks busy rather than
polished, the fix is always to *reduce*: softer shadows, closer gradient shades,
fewer glows. Professional and dimensional is the goal — not flashy.
