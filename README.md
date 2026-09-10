# Institute of Architects of Zimbabwe — site

A redesign of the IAZ website (zimarchitects.com) in the **Heron AI**
(heronaiapp.com) drawing-set visual language: warm paper, ruler edges,
`+` crosshair marks, tight Geist display caps, one vermilion accent, and a
GSAP + Lenis + Framer Motion animation layer.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router, TypeScript) |
| Smooth scroll | [`lenis`](https://github.com/darkroomengineering/lenis) synced to the GSAP ticker |
| Scroll timelines | `gsap` + `ScrollTrigger` (pin, scrub) via `@gsap/react` `useGSAP` |
| Text splitting | `gsap/SplitText` (free since GSAP 3.13) |
| Component motion | `framer-motion` (`whileInView` variants, magnetic pull) |
| Type | `next/font` — Geist + Geist Mono |
| Styling | one `globals.css` design-token sheet, no CSS framework |

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Animation vocabulary (lifted from heronaiapp.com)

- **Plotter loader** — `components/Loader.tsx`: count-up `000 → 100`, vermilion
  progress bar, cube mark, then the whole overlay lifts.
- **Line-mask headlines** — `SplitReveal.tsx`: SplitText lines rise out of an
  overflow mask on `expo.out`, 90 ms apart, on scroll.
- **Word-by-word ink fill** — `WordFill.tsx`: the statement starts grey and each
  word scrubs to full ink as the block scrolls through.
- **SVG path draw-on** — `DrawSVG.tsx`: every `.draw` shape is measured with
  `getTotalLength()` and drawn in with `stroke-dashoffset`; `.node` marks fade in
  after. Used by the hero elevation, the "stakes" isometrics, the institute
  panels and the footer **IAZ construction-drawing letterforms**.
- **Marching ants** — `.dash-flow` keyframe on dashed strokes.
- **Ink-mask reveal** — `Statement.tsx`: an SVG `<mask>` with a wavy quadratic
  edge (`M0,380 Q200,430 400,380 …`) scrubs up to reveal the drawing.
- **Pinned scroll sequence** — `RouteToReg.tsx`: the four registration stages
  light up in turn while the track is pinned; each progress bar fills.
- **Term marquee** — `Marquee.tsx`: seamless CSS `translateX(-50%)` belt.
- **Custom cursor** — `Cursor.tsx`: 6 px vermilion dot with a lagged ring; over
  `[data-cursor]` targets it becomes a `+` crosshair with a live `X/Y` HUD or the
  target's label.
- **Magnetic buttons** — `lib/useMagnetic.ts`: `gsap.quickTo` pointer pull.
- **Button label roll** — `Button.tsx` / `.btn-fill`: two stacked label copies
  clipped by `overflow:hidden`, rolling on `cubic-bezier(.625,.05,0,1)`, with a
  background fill wipe.
- **Button label roll** — `components/Button.tsx` / `.btn-fill`: two stacked
  label copies clipped by `overflow:hidden`, rolling on
  `cubic-bezier(.625,.05,0,1)` in `.48s`, arrow in its own clipped cell.
- **Pixel-mosaic sweep** — `components/PixelSweep.tsx`: a canvas grid of accent
  squares that dither in left→right on button hover and on the active nav item
  (heronaiapp.com's `.btn-fill-pixels`).
- **Barba-style route transition** — `components/Transition.tsx` +
  `TransLink.tsx` + `lib/transition.ts`: a curtain with a curved leading edge
  covers on link click, the route swaps, the curtain sweeps away and every
  `[data-enter]` element staggers in. Driven off `usePathname`.
- **Cursor tail** — `Cursor.tsx`: a canvas trail of ~22 chained points draws a
  tapering vermilion line behind the pointer.
- **Ink-image reveal** — `components/InkImage.tsx`: a photo (grayscale, paper
  blend) wiped in by a wavy quadratic `<mask>` edge on a scrubbed ScrollTrigger.

### Pages

`/` · `/practice` · `/register` · `/education` · `/news` · `/about` · `/contact`
— every one built on `components/PageShell.tsx` (nav, ruler, split-revealed
hero, ink image, footer). Content in `lib/content.ts`, sourced from
zimarchitects.com.

### Next: deeper ink dissolve

heronaiapp.com's image reveal also runs the masked layer through a shared
`feTurbulence → feDisplacementMap → feGaussianBlur → feComponentTransfer`
filter and animates `feDisplacementMap/@scale` 90→0 alongside the mask, so
pixels tear and resolve ("ink review" dissolve). `InkImage.tsx` is structured
to take that filter — add a `<defs>` `#sharedDisplacementFilter` and tween its
scale in the same timeline.

Every effect bails to a static, fully-visible state under
`prefers-reduced-motion` (the `.no-motion` class set in `SmoothScroll.tsx`).

## Content

`lib/content.ts` — sourced from zimarchitects.com. Founded 1924 as the Institute
of Southern Rhodesian Architects; the Architects (Private) Act of 1929 protected
the title; renamed 1980. One accredited school (NUST, Bulawayo). 2026 council
names as published.

## Structure

```
app/
  layout.tsx        fonts, <Loader>, <Cursor>, <SmoothScroll>
  page.tsx          home — composes every section
  practice/  register/  education/  news/  about/  contact/
  globals.css       design tokens + every component style + keyframes
components/         one file per section + the reusable motion primitives
lib/                gsap registration, content data, useMagnetic
```
