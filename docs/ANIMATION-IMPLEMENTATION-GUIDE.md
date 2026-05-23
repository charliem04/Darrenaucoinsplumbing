# Animation Implementation Guide
### Darren Aucoin's Plumbing — motion & polish layer

This guide adds a professional motion layer on top of the existing depth pass.
It is built to be **pure CSS + two tiny React hooks** — no new npm packages, no
bundle bloat, nothing to maintain.

Motion is split exactly the way you asked:

- **One-time animations** — hero entrance (on load) and scroll-reveal (first time
  each section enters view). These play once and never repeat.
- **Constant animations** — slow looping accents (ambient glow breathing, a
  floating decorative element, a shimmer sweep). These run continuously but are
  subtle and decorative.

Everything respects `prefers-reduced-motion` — users who disable motion in their
OS get a fully static, fully visible site.

---

## Files in this package

```
src/app/hooks/useScrollReveal.ts   — IntersectionObserver reveal hook (one-time)
src/app/hooks/useCountUp.ts        — animated stat counter hook (one-time)
src/styles/animations.css          — all keyframes + utility classes
```

**Files you will edit:**
- `src/styles/index.css`
- `src/app/components/InteractiveHomeDesktop.tsx`
- `src/app/components/InteractiveHomeMobile.tsx`

As with the depth guide: make a branch (`git checkout -b motion-layer`), apply
one numbered section at a time, and test before moving on.

---

## Step 0 — Install the files

1. Copy `useScrollReveal.ts` and `useCountUp.ts` into `src/app/hooks/`
   (create the `hooks` folder if it doesn't exist).
2. Copy `animations.css` into `src/styles/`.
3. Register the stylesheet. Open `src/styles/index.css` — it currently reads:

   ```css
   @import './fonts.css';
   @import './tailwind.css';
   @import './theme.css';
   ```

   Add the animations import as the LAST line so it can override if needed:

   ```css
   @import './fonts.css';
   @import './tailwind.css';
   @import './theme.css';
   @import './animations.css';
   ```

Nothing visual changes yet — the classes are inert until you apply them.

---

## Step 1 — Hero entrance (one-time, on page load)
**Type: one-time. Impact: highest — it's the first thing visitors see.**

This animates the hero content in when the page loads: heading rises first, then
the subtext, then the buttons, then the image fades up. It uses pure CSS
animation classes (`hero-rise`, `hero-fade`) with staggered delays — no hook
needed, they auto-play once.

### Desktop — `InteractiveHomeDesktop.tsx`

In the Hero Section, find the `<h1>` and the paragraph beneath it. Add classes:

**Heading** — append `hero-rise hero-delay-1` to the existing className:
```jsx
<h1 className="... hero-rise hero-delay-1">Fast, honest plumbing when you need it most</h1>
```

**Sub-paragraph** — append `hero-rise hero-delay-2`:
```jsx
<p className="... hero-rise hero-delay-2">Darren Aucoin's Plumbing serves Lafayette...</p>
```

**Button row** — the `<div>` wrapping the two buttons. Append `hero-rise hero-delay-3`:
```jsx
<div className="content-stretch flex gap-[16px] items-start relative shrink-0 hero-rise hero-delay-3">
```

**Hero image** — the OUTER image wrapper `<div>` (the one casting the shadow).
Append `hero-fade hero-delay-4`:
```jsx
<div className="relative w-full max-w-[1266px] rounded-[32px] shadow-[...] hero-fade hero-delay-4">
```

### Mobile — `InteractiveHomeMobile.tsx`

Same idea, same class names. Find the mobile hero's heading, paragraph, button
container, and image wrapper and apply `hero-rise`/`hero-fade` with delays
`hero-delay-1` through `hero-delay-4` in that order. The delays are small enough
to feel snappy on a phone.

**Test:** reload the page. Content should rise/fade in over roughly one second,
top to bottom, then sit still permanently.

---

## Step 2 — Scroll-reveal for sections (one-time, on scroll)
**Type: one-time. Impact: high — this is the core "modernized" feel.**

Each major section fades + rises into view the first time you scroll to it, then
stays put. Driven by the `useScrollReveal` hook.

### 2a. Import the hook

At the top of **both** component files, add:
```jsx
import { useScrollReveal } from '../hooks/useScrollReveal';
```
(Adjust the relative path if your folder layout differs.)

### 2b. The pattern

For any block you want to reveal, create a hook instance and attach it:

```jsx
const servicesReveal = useScrollReveal();

// ...in JSX:
<div
  ref={servicesReveal.ref}
  className={`...existing classes... reveal ${servicesReveal.isVisible ? 'reveal-visible' : ''}`}
>
```

The element starts hidden (opacity 0, shifted down 28px) and animates to settled
the first time it enters the viewport.

> **Important:** don't put `.reveal` on a section's outermost background `<div>` —
> animating opacity on a full-bleed colored section looks heavy. Instead attach
> it to the **inner content wrapper** (the `max-w-[1280px]` block), so only the
> content moves, not the background color.

### 2c. Where to apply it

Apply one hook per section, to that section's content wrapper:

| Section | Element to attach to |
|---|---|
| Services | the `max-w-[1280px]` content wrapper |
| Specialty services | the `max-w-[1280px]` content wrapper |
| Testimonials | the `max-w-[1280px]` content wrapper |
| Stats | the `max-w-[1280px]` content wrapper |
| About | the `max-w-[1280px]` content wrapper |
| Contact | the `max-w-[1280px]` content wrapper |

Each needs its own hook call (`const servicesReveal = useScrollReveal();`,
`const statsReveal = useScrollReveal();`, etc.) — one hook instance per element.

Skip the Hero — it already has the Step 1 entrance animation.

### 2d. Optional — stagger the cards

For the row of testimonial cards or service panels, you can make them cascade
instead of arriving together. Inside the `.map()`, add `.reveal` plus a delay
class based on index:

```jsx
{testimonials.map((t, idx) => (
  <div
    key={idx}
    className={`...card classes... reveal reveal-scale reveal-delay-${idx + 1}
      ${cardsReveal.isVisible ? 'reveal-visible' : ''}`}
  >
```

Here a single `cardsReveal` hook on the parent row drives all the children, and
`reveal-delay-1..5` makes them appear in sequence. `reveal-scale` adds a slight
scale-up which reads nicely on cards.

**Test:** scroll down slowly. Each section should rise in once, then stay. Scroll
back up and down — it does NOT replay (that's intended; replaying on every pass
looks gimmicky).

---

## Step 3 — Animated stat counters (one-time, on scroll)
**Type: one-time. Impact: high — turns a static number into a moment.**

The Stats section numbers ("15+", "3", "30 min", "2000+") count up from zero the
first time the section scrolls into view.

### 3a. Import the hook

In **both** files:
```jsx
import { useCountUp } from '../hooks/useCountUp';
```

### 3b. Desktop

The desktop stats use an inline array of two `.map()`-ed stats, then more below.
Because hooks can't be called inside `.map()`, the cleanest approach is to make a
small component for a single stat. Add this near the top of the file:

```jsx
function AnimatedStat({ stat }: { stat: { label: string; value: string; desc: string } }) {
  const count = useCountUp(stat.value);
  return (
    <div className="bg-[#0b8483] flex-[1_0_0] min-w-px relative rounded-[16px] border border-[rgba(255,255,255,0.2)]">
      <div className="content-stretch flex flex-col gap-[48px] items-start p-[32px] relative size-full">
        <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.4] text-[22px] text-white tracking-[-0.22px] w-full">{stat.label}</p>
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
          <p
            ref={count.ref}
            className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] text-[80px] text-right w-full bg-gradient-to-b from-white to-[rgba(255,255,255,0.7)] bg-clip-text text-transparent"
          >
            {count.value}
          </p>
          {/* keep the existing description paragraph here */}
        </div>
      </div>
    </div>
  );
}
```

Then in the stats `.map()`, replace the inline card markup with:
```jsx
{statsArray.map((stat, idx) => <AnimatedStat key={idx} stat={stat} />)}
```

Match the inner markup to whatever your current stat card contains — the only
real changes are the `ref={count.ref}` on the number `<p>` and `{count.value}`
instead of `{stat.value}`.

### 3c. Mobile

Identical approach — make an `AnimatedStat` for the mobile card layout (it uses
`text-[40px]`-ish sizing and a single-column list). Same hook, same `ref` +
`value` swap.

**Test:** scroll to the Stats section. Numbers should sweep from 0 to their
target over ~1.6s, with a gentle ease-out, then stop. "30 min" animates the 30;
"15+" animates the 15 and keeps the "+".

---

## Step 4 — Constant motion accents (looping)
**Type: constant/repeating. Impact: medium — adds life without distraction.**

These run continuously. Keep them subtle — the goal is "the page feels alive,"
not "things are moving at me."

### 4a. Breathing ambient glow

Your depth guide added radial-glow `<div>`s in the Services and Testimonials
sections. Make them slowly breathe by adding `anim-pulse-glow` to that div's
className:

```jsx
<div aria-hidden="true"
     className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2
       w-[600px] h-[400px] blur-[120px] anim-pulse-glow
       bg-[radial-gradient(ellipse,rgba(11,132,131,0.22),transparent_70%)]" />
```

> Note: `anim-pulse-glow` includes `translateX(-50%)` in its keyframes so it
> keeps the glow centered while it pulses — you can drop the separate
> `-translate-x-1/2` class, or leave it (the animation overrides transform).

### 4b. Hero image shimmer (optional, nice touch)

A slow light sweep across the hero image. The INNER image wrapper already has
`overflow-hidden` and `rounded-[32px]` — add a shimmer overlay as its last child:

```jsx
<div className="rounded-[32px] overflow-hidden border-8 border-[#002f48] relative">
  <img alt="..." className="block w-full h-auto" src={imgHero} loading="eager" />
  <span className="anim-shimmer" aria-hidden="true" />
</div>
```

The sweep crosses every 6s. If it feels too frequent, raise the duration in
`animations.css` (`shimmer-sweep` on `.anim-shimmer`).

### 4c. Floating decorative accent (optional)

If you have any small decorative element — an icon badge, a "24/7" chip — adding
`anim-float` gives it a slow 7s vertical drift. Use it on at most one or two
NON-essential elements. Never put float on text people need to read or on
buttons.

### 4d. Scroll cue (optional)

If you add a downward chevron at the bottom of the hero to invite scrolling, give
it `anim-bob` for a gentle 1.8s up-down nudge.

**Test:** sit on the page without scrolling. The glow should slowly breathe; the
shimmer should drift across the hero every few seconds. If you notice it, it's
slightly too strong — these should be at the edge of perception.

---

## Step 5 — QA checklist

Before merging:

- [ ] `animations.css` imported in `index.css` (last line)
- [ ] Both hook files in `src/app/hooks/`, import paths correct
- [ ] Hero content rises/fades in once on load, top-to-bottom order
- [ ] Each section reveals once on scroll, does NOT replay on scroll-up
- [ ] `.reveal` is on inner content wrappers, never on full-bleed backgrounds
- [ ] Stat numbers count up from 0 when the Stats section enters view
- [ ] "15+", "30 min", "2000+" keep their non-digit parts after counting
- [ ] Ambient glow breathes slowly; stays centered
- [ ] No layout shift — `.reveal` only moves opacity/transform, never size
- [ ] All changes applied to BOTH Desktop and Mobile files
- [ ] Tested at 375px, 768px, 1280px, 1920px
- [ ] **Reduced motion:** enable "Reduce motion" in OS settings, reload —
      everything should be instantly visible and fully static, no hidden content

### Performance notes

- All animations use only `opacity` and `transform` — the two properties the
  browser can animate on the GPU without reflow. No `top`, `width`, `margin`
  animations anywhere, so there's no scroll jank.
- `useScrollReveal` calls `observer.unobserve()` after firing, so observers are
  cleaned up as you scroll — no lingering listeners.
- `will-change` is set only on `.reveal` elements and is harmless at this scale.

### Tuning

Everything is in `animations.css`:
- Reveal feels too slow/fast → change the `0.7s` durations on `.reveal`.
- Hero entrance too slow → shrink the `hero-delay-*` values.
- Constant motion too noticeable → increase the loop durations
  (`float-slow` 7s→12s, `pulse-glow` 9s→14s, etc.).
