Source: https://www.getdbt.com/

# Build spec: homepage clone (React 18 + Vite + Tailwind v3)

Measured live with Playwright on 2026-10-23 at 1440x900, 1280x800, 768x1024 and 375x812. All numbers are computed values (`getComputedStyle` / `getBoundingClientRect`) unless marked **(inferred)**.
Reference screenshots (for layout only, do not copy assets out of them): `recon/full-page-1440.png`, `recon/above-fold-1440.png`, `recon/megamenu-product-1440.png`, `recon/mobile-menu-375.png`.
Asset inventory: `ASSET_MANIFEST.md`.

**Content rule:** do not reuse the original marketing copy. Each text block below lists its role and its length (characters, and lines at 1440 px). Write original placeholder copy of about the same length so wrapping and heights match. Short UI labels are described by role only.

Original stack, for context only: Next.js, Tailwind **v4** (CSS variables like `--color-*` and `--text-*`), Headless UI popovers for the nav, Splide.js for the testimonial slider, a custom IntersectionObserver that adds `.is-visible`, and plain CSS keyframes. **No GSAP, Lottie, Rive, `<video>` or `<canvas>`** on the page (checked: `window.gsap`/`ScrollTrigger` undefined, 0 video, 0 canvas, no lottie/dotlottie elements). The feature "videos" are animated GIFs.

---

## 0. Global tokens

### 0.1 Breakpoints (Tailwind defaults; keep v3 defaults)
`sm 640`, `md 768`, `lg 1024`, `xl 1280`, **`2xl 1440`** (the site's `2xl` is 90rem = 1440, not 1536: verified because the `2xl:gap-6` and `max-2xl:px-2.5` nav utilities switch between 1280 and 1440). Some original rules also use `max-width: 48rem` (768) and `min-width: 2100px`. Set `screens: { sm:'640px', md:'768px', lg:'1024px', xl:'1280px', '2xl':'1440px' }`.

### 0.2 `.container` (custom; override Tailwind's container)
| viewport | width | padding-x |
|---|---|---|
| < 640 | 100% | 24px |
| 640–767 | max 640px | 32px |
| 768–1023 | max 768px | 40px |
| 1024–1279 | max 1024px | 64px (the nav and announcement bar override this to 12px with `lg:max-xl:px-3`) |
| 1280–1439 | **width 1152px**, margin-inline auto | 0 |
| ≥ 1440 | **width 1248px** | 0 |

Measured: the content left edge is x=96 at 1440, x=64 at 1280, x=40 at 768 and x=24 at 375.

`.grid-container` = `display:grid; gap:16px; grid-template-columns: repeat(4,1fr)`. At ≥640 it is `repeat(8,1fr)`, at ≥768 the gap is 24px, and at ≥1024 it is `repeat(12,1fr)`. At 1440 that gives 12 columns of 82px with a 24px gap. A few sections use plain `grid grid-cols-12` with no gap (104px columns at 1440).

### 0.3 Colors (exact)
| token | value | used for |
|---|---|---|
| terminal-black-950 | `#030711` | primary text, dark section and footer bg, secondary button border |
| terminal-black-900 | `#101828` | |
| terminal-black-800 | `#1e2939` | "neutral-secondary" text (sub-paragraphs, mega-menu labels), secondary button hover bg |
| terminal-black-700 | `#364153` | |
| terminal-black-600 | `#4a5565` | neutral-tertiary text (mega-menu descriptions), footer region-select border |
| terminal-black-500 | `#6a7282` | quaternary text (testimonial role) |
| terminal-black-400 | `#99a1af` | disabled, hover border of integration tiles |
| terminal-black-300 | `#d1d5dc` | |
| terminal-black-200 | `#e5e7eb` | **all hairline borders** (nav bottom, cards, tiles) |
| terminal-black-100 | `#f3f4f6` | |
| terminal-black-50 | `#f9fafb` | mega-menu right column bg, IDE tile hover bg, IDE card text |
| coalesce-purple-600 | `#632ff5` | accent: eyebrows, announcement bar, mega-menu footer strip, active slider dot, "We're hiring" badge |
| coalesce-purple-400 | `#9786ff` | inverse accent |
| coalesce-purple-50/100/700/900 | `#f6f5ff` / `#ecebff` / `#5720e1` / `#3d189a` | |
| transform-orange-600 | `#fe6703` | **primary button bg** and focus ring |
| transform-orange-500 | `#fe8331` | announcement bar gradient end |
| transform-orange-400/700/50 | `#ff9e5f` / `#dd5604` / `#fff9f5` | |
| yellow-400 | `#ffcc25` | primary button hover gradient (at 50% alpha) |
| white | `#ffffff` | page bg |
| inverse-tertiary text | `rgba(255,255,255,.5)` | footer links |
| inverse-secondary text | `rgba(255,255,255,.8)` | |
| bg-blur | `rgba(255,255,255,.9)` + `backdrop-filter: blur(12px)` | "why dbt" cards |
| splide inactive dot | `#cccccc` | |

### 0.4 Radii, shadows, blur
- Radii: buttons `12px`; cards, tiles and feature panels `16px`; mega-menu items and feature images `8px`; IDE tiles `12px`; badge `4px`; slider dots `16px`.
- Shadow `shadow-primary` (mega-menu panel only): `0 32px 64px -16px rgba(3,7,17,.24)`. No other box-shadows on the page except the CTA circle glow (see 2.13).
- Blur scale: xs 4, sm 8, md 12, lg 16, xl 24, 3xl 64px. `bg-blur` uses 12px. Dark-variant button hover uses `backdrop-filter: blur(16px)`.

### 0.5 Gradients (exact; copy verbatim into CSS)
```css
/* announcement bar */
.announcement-bar { background-color:#632ff5; background-image:linear-gradient(to right,#632ff5 80%,#fe8331); }

/* feature panel 1 (orange/purple) */
.gradient-05 { background-color: rgb(255,140,0); background-image:
 radial-gradient(25% 40% at 100% 53%, rgb(255,222,57) 10%, transparent 50%),
 radial-gradient(35% 90% at 95% 80%, rgb(255,222,57) 10%, rgba(255,140,0,.7) 70%, transparent 100%),
 radial-gradient(38% 38% at 60% 78%, rgb(255,114,27) 20%, rgba(190,67,176,.65) 60%, transparent 130%),
 radial-gradient(47% 10% at 50% 40%, rgb(99,85,253) 25%, rgba(97,83,253,.5) 56%, transparent 60%),
 radial-gradient(69% 30% at 30% 27%, rgb(99,85,253) 37%, transparent 66%),
 radial-gradient(80% 20% at 30% 40%, rgb(99,85,253) 65%, transparent 100%),
 radial-gradient(60% 40% at 10% 50%, rgb(63,79,255) 40%, transparent 80%),
 radial-gradient(45% 15% at 45% 40%, rgb(99,85,253) 60%, rgba(99,85,253,.6) 68%, transparent 90%),
 radial-gradient(40% 20% at 90% 110%, rgb(99,85,253) 65%, rgba(99,85,253,.8) 75%, transparent 100%),
 radial-gradient(70% 200% at 0 50%, rgb(99,85,253) 40%, rgba(190,67,176,.85) 60%, transparent 80%),
 radial-gradient(40% 30% at 30% 34%, rgba(177,85,253,.7) 80%, transparent 100%); }
.gradient-05::before { mix-blend-mode: overlay !important; opacity: 1 !important; }

/* feature panel 2 (orange top-left, violet body) */
.gradient-02 { background-color: rgb(255,140,0); background-image:
 radial-gradient(48% 30% at 90% 19%, rgba(106,0,255,.4) 35%, transparent 70%),
 radial-gradient(38% 50% at 90% 39%, transparent 70%),
 radial-gradient(20% 10% at 65% 34%, rgba(76,0,255,.3) 5%, transparent 90%),
 radial-gradient(circle at 105% 88%, rgb(68,0,255) 10%, transparent 25%),
 radial-gradient(40% 100% at 57% 95%, rgba(68,0,255,.6) 15%, transparent 25%),
 radial-gradient(68% 38% at 52% 43%, rgba(60,0,255,.8) 5%, transparent 50%),
 radial-gradient(48% 38% at 42% 53%, rgba(106,0,255,.8) 25%, transparent 50%),
 radial-gradient(20% 25% at 65% 70%, rgba(190,79,255,.5) 50%, transparent 100%),
 radial-gradient(48% 30% at 52% 65%, rgb(106,0,255) 35%, transparent 70%),
 radial-gradient(48% 38% at 62% 83%, rgba(106,0,255,.8) 25%, transparent 50%),
 radial-gradient(48% 30% at 62% 85%, rgb(106,0,255) 35%, transparent 70%),
 radial-gradient(48% 38% at 70% 99%, rgba(106,0,255,.8) 25%, transparent 50%),
 radial-gradient(48% 30% at 70% 99%, rgb(106,0,255) 35%, transparent 70%),
 radial-gradient(circle at 2% 5%, rgb(255,182,10) 5%, transparent 20%),
 radial-gradient(70% 90% at 90% 70%, rgb(127,61,232) 30%, transparent 90%),
 radial-gradient(100% 140% at 70% 70%, rgb(255,140,0) 40%, transparent 50%); }
.gradient-02::before { mix-blend-mode: overlay !important; opacity: 1 !important; }

/* feature panel 3 + community CTA (blue/violet/cyan) */
.gradient-12 { background-color: rgb(6,42,224); background-image:
 radial-gradient(circle at -35% 10%, rgb(118,85,253) 12%, transparent 60%),
 radial-gradient(circle at -35% 100%, rgb(118,85,253) 35%, transparent 60%),
 radial-gradient(circle at 70% -30%, rgb(35,218,255) 22%, transparent 50%),
 radial-gradient(circle at 48% 30%, rgb(6,42,224) 20%, transparent 70%),
 radial-gradient(circle at 65% 110%, rgb(6,42,224) 15%, transparent 45%),
 radial-gradient(circle at 100% 100%, rgb(35,218,255) 40%, transparent 70%); }
.gradient-12::before { mix-blend-mode: multiply !important; opacity: .6 !important; }

/* IDE card */
.gradient-26 { background: linear-gradient(90deg, rgb(255,85,15) 35%, rgb(255,140,30) 55%, rgb(255,195,60) 65%, rgb(255,225,90) 75%, rgb(255,240,105)); }
@media (max-width: 48rem) { .gradient-26 { background: linear-gradient(90deg, rgb(255,85,15) 60%, rgb(255,140,30) 80%, rgb(255,240,105)); } }

/* hero brush stroke fill (see 2.3) */
.gradient-01 { background-color: rgb(255,174,0); background-image:
 radial-gradient(65% 60% at 70% 45%, rgba(255,135,7,.9) 20%, transparent 50%),
 radial-gradient(40% 100% at 73% 65%, rgb(255,38,0) 15%, transparent 34%),
 radial-gradient(40% 100% at 66% 90%, rgba(255,38,0,.9) 15%, transparent 30%),
 radial-gradient(85% 100% at 48% 45%, rgba(255,135,7,.7) 20%, transparent 45%); }

/* grain overlay on every .gradient-container */
.gradient-container { position: relative; }
.gradient-container:not(.disable-noise)::before { content:""; position:absolute; inset:0; z-index:2; width:100%; height:100%;
  background-image:url(NOISE_SVG); background-repeat:repeat; background-size:250px 250px; /* 300px at min-resolution:2x */
  opacity:.7; mix-blend-mode:multiply; border-radius:inherit; pointer-events:none; }
```
`NOISE_SVG`: the original is a 250px tiling noise SVG. Recreate it inline, for example `<svg xmlns='http://www.w3.org/2000/svg' width='250' height='250'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>` as a data URI. The grain must sit above the gradient (`z-index:2`) and below the content (give the content `relative z-10`).

The announcement bar also has a grain `::before` with `mix-blend-mode:overlay; opacity:1; mask: radial-gradient(100% 160px at 40% 100%, #000 0, #000 70%, transparent 100%)`.

### 0.6 Typography

**Fonts actually loaded** (network: `use.typekit.net/kvb8avc.css`, which loads 6 woff2 files with fvd n4/n6/n4/n5/n4/n7):
| family (CSS name) | role | weights loaded | license | free substitute (Google Fonts) |
|---|---|---|---|---|
| `polymath` | display: all `heading-*`, stat numbers | 400, 600 | **Commercial** (Adobe Fonts / Typekit, Polymath by Christian Robertson) | **Outfit** (closest geometric-humanist feel; use 400/600). Alternative: Plus Jakarta Sans |
| `polymath-text` | body, nav, buttons, everything else | 400, 500, 700 (italics declared, not loaded) | **Commercial** (Adobe Fonts) | **Outfit** 400/500/700 (alternative: DM Sans) |
| `ibm-plex-mono` | eyebrows, small badge | 400 (and 500 is used, rendered from the 400/800 faces available) | **Open (SIL OFL)**, on Google Fonts | **IBM Plex Mono** 400/500, identical |
| `bugrino` (self-hosted `/fonts/bugrino/Bugrino-Medium.woff2`) | declared for an event banner; **status "unloaded", not used on the homepage** | – | Commercial | ignore |
| `inter-variable-fallback` (`local(Arial)`, size-adjust 105.2%) | declared fallback; unused | – | – | ignore |

Stacks:
- display: `'Outfit', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', Ubuntu, Roboto, Noto, Arial, sans-serif`
- sans: same stack (original puts `polymath-text` first)
- mono: `'IBM Plex Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace`

Base settings: html font-size 16px, `-webkit-font-smoothing: antialiased`, `scroll-behavior: auto`. Letter-spacing is `normal` and `text-transform` is `none` for **every** role on the page (no uppercase anywhere, including eyebrows).

**Type roles** (font-size / line-height, weight). "<1280" means 0–1279; ≥1280 is the `xl` step.
| role | family | < 1280 | ≥ 1280 | color (on light / on dark) |
|---|---|---|---|---|
| heading-1 (hero h1) | display | 48/57.6, 600 | 64/76.8, 600 | #030711 |
| heading-2 (section titles) | display | 32/38.4, 600 | 48/57.6, 600 | #030711 / #fff (IDE card #f9fafb) |
| heading-3 (feature-panel titles, statement, dark news headline) | display | 24/28.8, 600 | 32/38.4, 600 | white on panels |
| heading-4 (card titles in "why" grid, mobile footer accordions) | display | 20/24, 600 | 24/28.8, 600 | #030711 |
| heading-5 (footer column titles) | display | 18/21.6, 600 | same | #fff |
| eyebrow (section) | mono | 16/24, 500 | same | #632ff5 / #fff |
| eyebrow (inside feature panels) | mono | 14/20, 500 | same | #fff |
| lead (hero sub, testimonial quote) | sans | 18/28, 400 | same | #030711 |
| body | sans | 16/24, 400 | same | #030711; "why" section uses #1e2939 |
| body-medium (IDE card paragraph) | sans | 16/24, 500 | same | #f9fafb |
| small (testimonial attribution, footer links, footer copyright) | sans | 14/20, 400 | same | #030711 / rgba(255,255,255,.5) |
| nav link / dropdown trigger | sans | 16/24, 500 | same | #030711 |
| button label | sans | 16/24, 500 (`small` size 14/20) | same | see buttons |
| stat number (CTA) | display | 32/38.4, **400** | same | #fff |
| stat label (CTA) | sans | 18/28, 400 | same | #fff |
| big metric (testimonial card 2) | sans | 64/64, 400 | same | #030711 |
| integration tile name | sans | 20/28, 600 | 24/32, 600 (switches at lg 1024) | #030711 |
| IDE tile label | sans | 18/28 (<768), 20/28 (≥768), 500 | same | #030711 |
| announcement text | sans | 16/24, 500 | same | #fff |
| mega-menu group label | sans | 12/16, 400 | | #1e2939 |
| mega-menu item title | sans | 14/20, 500 | | #030711 |
| mega-menu item description | sans | 12/16, 400 | | #4a5565 |
| mobile drawer item | sans | 20/28, 600 | | #030711 |
| badge ("hiring") | mono | 10/14.29, 500 | | #fff on #632ff5 |

### 0.7 Buttons (`.button`)
Base: `border-radius:12px; font: 500 16px/24px sans; white-space:nowrap; text-align:center; width:100%` (`width:auto` at ≥768). Transition: `color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, gradient stops, opacity, box-shadow, transform, translate, scale, rotate, filter, backdrop-filter, display…` all at **150ms cubic-bezier(.4,0,.2,1)**.

Sizes:
- `small`: padding 8px 16px, 14/20 (svg max-w 20)
- `medium`: padding 8px 16px, 16/24 → **40px tall** (42px with a border)
- `large`: padding 12px 24px, 16/24 → **48px tall** (50px with a border)

Variants (light context):
| variant | rest | hover (`@media (hover:hover)`) | active | focus-visible |
|---|---|---|---|---|
| primary | bg `#fe6703`, text `#030711`, no border | adds `background-image: linear-gradient(to bottom, rgba(255,204,37,.5) 0%, transparent 50%)` over the orange (subtle yellow sheen from the top) | same gradient with the transparent stop at 80% | outline 3px solid #fe6703, offset 4px |
| secondary | bg #fff, 1px solid #030711, text #030711 | bg `#1e2939`, text #fff | bg #030711 | bg #030711, text #fff, outline 3px #030711, offset 4px |
| tertiary (nav triggers) | transparent, text #030711 | bg `rgba(30,41,57,.05)` | bg `rgba(16,24,40,.1)` | same as active plus outline 3px #030711, offset 3px |
| text (card links) | transparent, padding 12px 0 in markup, rendered height 32px, `display:flex; justify-content:space-between; width:100%`, text #030711 (computed #1e2939 on some) | text `#632ff5` | – | – |
| disabled (all) | bg #f3f4f6, text #99a1af, pointer-events none | | | |

Dark-context variants (`.dark`):
| variant | rest | hover | active |
|---|---|---|---|
| primary.dark | bg #fff, text #030711 | linear-gradient(to bottom, rgba(153,161,175,.5) 0%, transparent 50%) | transparent stop at 80% |
| secondary.dark | transparent, 1px solid #fff, text #fff | bg rgba(255,255,255,.6), text #030711, backdrop-blur 16px | bg rgba(255,255,255,.8) |
| tertiary.dark | text #fff | bg rgba(255,255,255,.05) + blur 16px | bg rgba(255,255,255,.1) |

Text-link arrow: a 24px chevron-down icon rotated -90deg (it reads as a right chevron), placed at the far right of the link (`justify-between`). Generic icon; recreate as inline SVG.

---

## 1. Page map (1440 px, top to bottom; y = document offset after all lazy content loaded; total height 6986)

| # | section | y | height | bg |
|---|---|---|---|---|
| 1 | Announcement bar (hidden <1024) | 0 | 53 | purple→orange gradient |
| 2 | Nav (sticky) | 53 | 91 (90 + 1px border) | #fff |
| 3 | Hero | 144 | 498 | #fff |
| 4 | Logo marquee (margin-top −85px, overlaps hero) | 557 | 200 | #fff |
| 5 | Dark news band (partner announcement) | 757 | 285 | #030711 |
| 6 | Statement (single centered line) | 1042 | 205 | #fff |
| 7 | Feature panel 1: text left, GIF right (gradient-05) | 1246 | 553 | #fff (panel inside) |
| 8 | Feature panel 2: GIF left, text right (gradient-02) | 1799 | 591 | #fff |
| 9 | Feature panel 3: text left, GIF right (gradient-12) | 2390 | 591 | #fff |
| 10 | Integrations (text + 2×3 logo tiles) | 2982 | 414 | #fff |
| 11 | "Why" three-card grid | 3396 | 819 | #fff |
| 12 | Cost/orchestration split (text + diagram SVG) | 4214 | 537 | #fff |
| 13 | IDE card (gradient-26, 2×2 tiles) | 4751 | 400 | #fff |
| 14 | Testimonials (text + Splide slider, 2 cards) | 5151 | 624 | #fff |
| 15 | Community CTA + stats (gradient-12 + circles) | 5775 | 453 | #062ae0 + gradients |
| 16 | Footer | 6229 | 757 | #030711 |

Document height by viewport: 1440 → 6986, 1280 → 7185, 768 → 8388, 375 → 10688.

Default section shell (`py-12 md:py-16`): padding 48px vertical below 768, **64px** at ≥768. Background white, `position:relative; z-index:5`.

---

## 2. Sections

### 2.1 Announcement bar
- Visible only at **≥1024** (`hidden lg:block`). Height **53px**, padding 8px 0, gradient from 0.5, grain overlay as described there.
- Inner: `.container` (12px side padding at 1024–1279), flex row, `items-center justify-center`, full height (37px).
  - Left button: 20×21 arrow-left icon (stroke 1.5, square caps; generic icon), `margin-right:auto`. Right button: arrow-right, same size. Both white (currentColor).
  - Middle: `overflow:hidden; width:100%` viewport (1208px wide at 1440) containing a flex track `display:flex; width:100%; transition: transform .5s ease-in-out`. Each slide is `w-full flex-none`, centered text 16/24 500 white, no underline, and the whole slide is a link.
  - **4 real slides plus clones (6 children)** for an infinite loop. Lengths at 1440, all one line: 97, 56, 102 and 94 characters.
- Motion: **autoplay every 8000ms** (measured: 189588 → 197591 ms). Each step moves `translateX(-N*100%)` with a 0.5s ease-in-out transition. When it reaches the cloned last slide (−500%), it jumps without a transition to −100% about 500ms later. The arrows step ±1 with the same transition.

### 2.2 Nav
- `<nav>`: `position: sticky; top: 0; z-index: 60; background:#fff; border-bottom:1px solid #e5e7eb; padding: 24px 0; transition: all .2s cubic-bezier(.4,0,.2,1)`. Height **91px** at ≥1024 and **89px** below (40px inner row).
- **Hide on scroll down, show on scroll up:** JS sets the inline `top` to `-91px` (the nav height) when the user scrolls **down** and `scrollY` passes about **575px** (measured: still shown at 550, hidden at 600). It sets `top:0px` as soon as the user scrolls up by any amount (measured 700→690 restores it). The `transition: all .2s` animates the slide. There is no blur and no shadow change on scroll; the background stays white.
- Desktop (≥1024) row: `.container` flex `justify-between items-center`, height 42.
  - Logo: 139×32 (wordmark plus mark; placeholder).
  - Right group: flex, gap **8px** at 1024–1439 (measured 8px at 1280) and **24px at ≥1440** (classes `gap-2 2xl:gap-6`, where the site's `2xl` = 1440). It contains:
    - Link group (flex, no gap): 5 dropdown triggers plus 1 plain link. Each is `.button.tertiary.medium` with padding **8px 10px at 768–1439** (`md:max-2xl:px-2.5`) and **8px 16px at ≥1440**, height 40, flex `gap:4px`, a label, and a 16×16 chevron-down. Measured widths at 1440: 107, 117, 127, 124, 135 and 81px (label lengths 7, 9, 9, 9, 9 and 7 characters). The chevron has a `transition` (150ms) and gets `rotate-180` while open.
    - Utility group: flex gap **12px** (xl:gap-3, 8px at lg): search icon button (40×40, 24px icon), **secondary medium** button (114×42, label about 11 characters), **primary medium** button (125×40, label about 11 characters), account button (60×40: 24px user icon plus 16px chevron, gap 4px, padding 8px).
  - At 1280 the link group starts at x=213 and the triggers are 95–123px wide.
- **Mega-menu** (Headless UI Popover, opens on **hover**, also on click):
  - Trigger open state: bg `rgba(30,41,57,.05)`, chevron rotated 180°.
  - Panel wrapper: `lg:container lg:absolute lg:left-0 lg:right-0 lg:top-full lg:z-60 lg:mx-auto flex justify-center`. The card is centered under the nav (x=297–1143 at 1440, **846px wide**). Enter/leave: `transition-all duration-200 ease-in-out`; closed state = `opacity:0; translateY(-8px)` (`data-closed:-translate-y-2 data-closed:opacity-0`), open = `opacity:1; translateY(0)`.
  - Card: bg #fff, 1px #e5e7eb border, radius `16px 16px 0 0`, `shadow-primary` (0.4), flex row, height 507.
    - Left column (max-w 644, padding 24px 16px, flex-col gap 24): groups each have a label (12/16, inset 8px) and a grid of items `grid-cols-2 gap-8px`. Each item is a 294×70 link: `flex items-center gap-8px p-8px rounded-8px`, hover bg #f9fafb, with a **20×20 icon in a 40×40 tile**, then a title (14/20 500) and a 1–2 line description (12/16 #4a5565), stacked with gap 2px. A featured full-width item (612×95) has a 1px #e5e7eb border, radius 8, gap 16, a **124×61 thumbnail**, a title, and a 2-line description (about 100 characters).
      - Product panel content: group A label (10 chars) with 2 items, a featured item, group B label (21 chars) with 6 items (titles 4–14 chars, descriptions 23–79 chars).
    - Right column: bg **#f9fafb**, min-w 200, padding 24, flex-col gap 16, radius on the right corners. It has a label (17 chars) and 6 text links (14/20 500, hover underline, row pitch 36px). At the bottom (mt-auto) is a link of about 20 characters with a 16px right chevron that shifts 2px on hover (`group-hover:translate-x-0.5`).
  - Footer strip under the card: full card width (846×44), bg **#632ff5**, white 14/20 500 text (about 64 chars), padding 12px 24px, radius `0 0 16px 16px`. It has a 16px right chevron that moves 6px on hover (`group-hover:translate-x-1.5`) and the text underlines on hover.
- **Mobile/tablet nav (<1024)**: 89px tall. The `.container` padding is 24px even at 768 (`max-lg:px-6`). Logo 139×32 at x=24. Right side: search icon plus a 24×24 hamburger. The hamburger and close icons are two absolutely stacked SVGs that cross-fade: active `opacity:1; translateX(0)`, inactive `opacity:0; translateX(8px)`, `transition: all 250ms cubic-bezier(.4,0,.2,1)`. A hidden "Back" text button (72×24) at the left fades in the same way when a sub-level is open.
  - Drawer: `absolute left-0 right-0 top-[calc(100%+1px)]`, white, `height: calc(100vh - 90px)`, scrolls on overflow, `transition-all duration-250 ease-in-out`. Closed: `h-0 opacity-0 -translate-x-2` (and `-translate-y-2`). Open: `translate-y-0 opacity-100`. Items run full width inside 24px padding: 64px tall, 20/28 600, padding 12px 0, `border-bottom:1px #e5e7eb`, `justify-between` with a right chevron (24px) on the 5 category items. The order is the 5 categories, a plain link, then 2 account links with 24px icons (login and add-user icons, generic).
  - Fixed bottom bar (only while the drawer is open): `fixed bottom-0 left-0 right-0 z-50`, white, `border-top:1px #e5e7eb`, padding 24, flex gap 12 with two `grow` buttons (secondary and primary, **small** size 14/20, padding 8px 16px, 36–38px tall). Same 250ms transition.

### 2.3 Hero (`<header>`)
- Padding 48px (mobile) or 64px (≥768) top and bottom, `overflow:hidden; position:relative; background:#fff; z-index:5`. Height 498 at 1440/1280, 487 at 768, 668 at 375.
- `.container > .relative.z-10 > .relative.text-center > .grid-container`. Single column `col-span-12 flex flex-col items-center`.
  - **H1** heading-1, centered, 2 lines with a forced `<br>` (line 1 about 29 chars, line 2 about 28 chars, 58 total). The box is 877×154 at 1440 and 1280, 658×115 at 768, and 327×288 (6 lines) at 375. There is no max-width; the line break plus the container width set the wrap.
  - **Sub**: lead 18/28, `margin-top:24px`, centered, 171 chars, **2 lines at 1440** (604px and 743px line widths, forced break after about 73 chars). It is 3 lines at 768 and 5 lines at 375.
  - **CTA**: primary **large** button, label about 20 chars, 190×48, `margin-top:40px` (button top 482, sub bottom 442).
  - A hidden video-thumbnail link (`a.group` holding a 1872×936 image with a 113px play circle) is in the DOM but `display:none` at every width tested. **Do not build it.**
- **Brush-stroke decoration ("baton stroke")**: an absolutely positioned wrapper `absolute -left-20 -right-20 top-[60%] md:top-[38%] mx-auto max-w-[2506px] max-h-[697px]` holds an `<svg viewBox="0 0 2506 697">` with a `<foreignObject>` filled by a `.gradient-container.gradient-01` div, masked by a path. The mask path is (omitted: original artwork; the clone draws its own path in Baton.jsx) with `stroke:white; stroke-width:96; round caps/joins; fill:none`. It draws on mount: `stroke-dasharray:3233.17; stroke-dashoffset 3233.17 → 0; transition: stroke-dashoffset 1s ease-in-out` (inferred start value; the end state and transition were measured). The fill div fades `opacity 0 → 1` over 250ms (`md:opacity-0 md:transition-opacity md:duration-250`).
  - **Measured visibility:** at 1440 the stroke SVG is rendered 1600×445 at y=333–778. The header clips it (`overflow:hidden`, bottom at 642) and the white logo strip (z-5, starting at y=557) covers it, so **nothing of the stroke is visible in the 1440 screenshot**. Build it as an optional low-priority layer (orange brush swoosh behind the lower hero) or skip it; matching the screenshot means it stays hidden.

### 2.4 Logo marquee
- Section: `margin-top:-85px`, padding 48/64 top and bottom, bg #fff, z-5. Height 200 (≥768), 168 (375).
- `.container overflow-x-hidden max-w-[1240px]` (1240 wide at 1440, x=100).
- Track: `flex flex-nowrap items-center justify-center min-w-max`, base `translate-x-[-2%]`, `animation: slider 30s linear infinite` with
  `@keyframes slider { 0% { transform: translate(-2%) } 100% { transform: translate(-35.35%) } }`.
  The track is 4416px wide: **8 logos × 3 copies = 24 items**. Each item is `relative mx-8 my-4 w-full max-w-[120px]` (120px wide plus 32px margins each side = 184px pitch). The logo img is `max-h-[40px] object-contain`, rendered 120 × (19–40)px and vertically centered (72px row).
  - No hover pause, no edge fade mask (measured: none).
- Placeholders: 8 neutral grey wordmark blocks, 120px wide with heights 31, 34, 40, 32, 40, 19, 20 and 40 (keep the variety). See the manifest.

### 2.5 Dark news band
- bg **#030711**, padding **40px 0** (`!py-10`) at all widths. Height 285 (1440), 275 (768), 333 (375).
- Container flex-col, `items-start`, **gap 24px**, white text.
  - Logo-lockup image placeholder **326×71** (natural 291×63 SVG; rounded pill outline with a purple-to-orange border in the original). Use a neutral pill of the same size.
  - heading-3 (white), 57 chars, 1 line at 1440 (840px max box), 1 line at 768, 3 lines at 375. It is placed 31px below the logo (inside a 141px-tall group).
  - `.button.tertiary.dark.medium` with `pl-0 hover:bg-transparent`, label about 17 chars plus a 21px arrow-right icon, 192×40.

### 2.6 Statement line
- Padding 48/64. One centered `heading-3` block (span/h3, `block w-full text-center`), **106 chars, 2 lines at 1440** (box 832×77, centered at x=304). 2 lines at 768 (688 wide), 4 lines at 375.

### 2.7–2.9 Feature panels (three, alternating)
Section shell: `pt-0 pb-16` at ≥1024; `md:p-12` (48px sides; 64px top/bottom at 768); at <768 `py-0` with **border-bottom 8px solid #030711** (panels stack edge to edge with dark dividers on mobile).
Panel = `.container.gradient-container.relative` + gradient class (05, 02, 12):
- ≥768: `border-radius:16px` (and on the `::before` grain), `lg:overflow-hidden`, padding 0.
- <768: radius 0, padding 48px, full-bleed.
Inner grid: `md:grid-container`, so 12 columns at ≥1024 (82px at 1440, 74px at 1280) and **12 columns at 768 too (51px)**, but the children span 12 below lg, so the layout is stacked below 1024. At <768 it is `flex flex-col gap-48px`.
- Text column `lg:col-span-4` (400px at 1440, 368 at 1280), `relative z-10`, inner padding **48px 64px** at ≥1280 (`md:p-12 xl:px-16`; 48px all round at 768–1279):
  - eyebrow mono 14/20 500 white, mb 16 (11–13 chars)
  - heading-3 white, mb 16 (panel 1: 23 chars / 2 lines; panel 2: 47 / 3 lines; panel 3: 41 / 3 lines at 1440)
  - body 16/24 white (panel 1: 274 chars / 8 lines; panel 2: 271 / 8; panel 3: 245 / 8 at 1440, in a 272px measure)
  - CTA row `mt-8 flex gap-12px`: **primary.dark medium** button (labels 15–22 chars).
- Media column `lg:col-span-8 self-end` (824px at 1440, 760 at 1280): an animated GIF screenshot of an IDE, natural 1920×10xx (aspect about **1.85:1**), rendered **824×445–447** at 1440 and 760×410–412 at 1280. `border-radius:8px`, `max-height:550px`, no object-fit (fill). It is **flush with the panel's bottom edge** and with the outer side edge (right edge for panels 1 and 3, left edge for panel 2), leaving 42–83px of gradient above it.
- Order: panel 1 text then media; **panel 2 media then text** (lg:order-none with DOM order media-first); panel 3 text then media. Below 1024, text is always first and the media follows at full width (672×363 at 768, 279×151 at 375).
- Panel heights at 1440: 489, 527, 527 (set by the text column). At 1280: 537, 614, 527.
- Reveal: text column fadeUp delay 0ms; media column fadeUp delay **200ms** (panel 2: media 0ms, text 200ms).

### 2.10 Integrations
- Padding 48/64. `.container > grid grid-cols-12 justify-between` (no gap; 104px columns at 1440).
  - Left `md:col-span-5` (520px at 1440): eyebrow (mono 16/24 #632ff5, mb 16, 12 chars) → heading-2 (23 chars, 1 line at 1440, box 520×58) → body `mt-4` (196 chars, 3 lines) → **primary medium** button `mt-4` (about 20 chars, 174×40).
  - Right `md:col-span-6 md:col-start-7` (624px at 1440): `grid grid-cols-1 md:grid-cols-2 gap-20px`, **6 tiles**. Each tile is 302×82 (1440) / 278×82 (1280) / 162×82 (768) / 327×72 (375): `flex flex-row items-center gap-8px rounded-16px border 1px #e5e7eb padding 20px 24px`, `transition: all 300ms cubic-bezier(.4,0,.2,1)`, hover `border-color:#99a1af`. Contents: a **40×40 logo box** (image 30×30 contain inside, `rounded-2xl`) and a name (6–10 chars, 24/32 600 at ≥1024, 20/28 below).
  - <768: the columns stack, the right side gets `mt-8` and becomes a 1-column list.

### 2.11 "Why" three-card grid
- Padding 48/64, `relative overflow-hidden`.
- Header block (max about 930px wide at 1440): eyebrow (22 chars, mb 16) → heading-2 (57 chars, **2 lines**, mb 16) → paragraph 16/24 **#1e2939** (170 chars, 2 lines).
- Grid `relative z-10 mt-12 md:mt-20 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6` (gap 24 at ≥768, 40 on mobile). The grid starts 80px below the paragraph at ≥768.
- Card: `flex flex-col items-start rounded-16px border 1px #e5e7eb padding 40px`, bg `rgba(255,255,255,.9)` + `backdrop-filter: blur(12px)`, `max-w-[400px]`, height 392 (1440) / 416 (1280) / 526 (768) / about 406–430 (375).
  - icon image 56×56 (natural 192×192 PNG, 3D gradient glyph) → `mt-10`-ish gap: the title starts 40px below the icon (3856→3896)
  - heading-4 title (30, 30 and 40 chars; 2/1/2 lines at 1440), mb 12px
  - body #1e2939 (114–120 chars, 3 lines), mb 40px
  - `.button.text` link pinned to the bottom (`mt-auto`), 19–28 chars, 32px tall, with a right chevron. Hover text #632ff5.

### 2.12 Cost / orchestration split
- Padding 48/64. `grid-container items-center` (12 columns, gap 24).
  - Left (span 6, 612px at 1440): eyebrow (14 chars) → heading-2 (51 chars, **2 lines**, mb 16) → body (253 chars, 3 lines) → CTA row `mt-8`: **primary medium** (about 30 chars, 251×40).
  - Right (span 6): a diagram image (DAG of model nodes) **555×409 SVG**, `rounded-16px`, centered in the column (x=761 at 1440).
  - 768: 8-col grid, two 332px columns, image 332×245. 375: stacked with the **image first** (order) at 327×241, then the text.
- Reveal stagger: eyebrow 0ms, h2 100ms, body 200ms, CTA row 300ms (button 300ms); image column 0ms, image itself 200ms.

### 2.13 IDE card
- Padding 48/64. `.container` holds a single **`<button>` wrapper** (the whole card is clickable, `button primary block w-full rounded-2xl`; treat it as a non-styled clickable block) around:
- Card: `.gradient-container.gradient-container-rounded.gradient-26 rounded-16px p-40px flex flex-col gap-32px lg:flex-row lg:items-center lg:justify-between overflow-hidden`, text **#f9fafb**. 1248×272 at 1440.
  - Left (568px): heading-2 (20 chars, 1 line, `max-w-[824px]`, mb 16) → paragraph 16/24 **500** (134 chars, 2 lines, `max-w-[612px]`).
  - Right (`lg:w-1/2`, 568px): `grid grid-cols-1 sm:grid-cols-2 gap-16px`, 4 tiles of 276×88: `flex items-center gap-16px p-24px bg-white rounded-12px text-nowrap relative z-10`, hover bg #f9fafb, `transition: all 150ms`. Contents: a 40×40 icon and a label (6–11 chars, 20/28 500).
  - Grain overlay opacity .7, multiply (visible speckle).
- 768: stacked (flex-col), tiles 2 columns of 296px. 375: tiles 1 column of 247px.

### 2.14 Testimonials
- Padding 48/64, `relative overflow-hidden`. `grid grid-cols-12 gap-16px`.
  - Left `md:col-span-4` (405px at 1440): eyebrow (15 chars) → heading-2 (45 chars, **3 lines**, mb 16) → body (122 chars, 3 lines) → **secondary medium** button `mt-6`ish (26 chars, 230×42; top 24px below the body).
  - Right `md:col-span-8` (827px): **Splide** slider, `type:'slide'`, `perPage` = 2 at ≥1024 and 1 below, `gap:'1rem'` (slide style `margin-right:1rem`), `speed:400`, `easing: cubic-bezier(0.25,1,0.5,1)` (measured: `transition: transform 400ms cubic-bezier(0.25, 1, 0.5, 1)`), draggable, **no autoplay**. Track overflow hidden, root overflow visible. There are **2 slides**, so at ≥1024 both are visible and the arrows and pagination are hidden (`.splide:not(.is-overflow)`).
  - Slide card (400×496 at 1440): `flex flex-col h-full rounded-16px border 1px #e5e7eb p-40px lg:max-w-[400px]`.
    - Card A: logo placeholder 100×50 (`object-contain`, `h-[50px]`) → 48px gap → 24px quote-mark icon (mb 24) → quote 18/28 (213 chars, **6 lines**) → attribution `mt-6` 14/20: name (about 14 chars) plus a comma, then role in #6a7282 (14 chars) → `.button.text` link `mt-auto` (23 chars).
    - Card B: logo placeholder 100×50 → big metric 64/64 400 (10 chars, mb 24) → 18/28 line (65 chars, 2 lines) → text link (26 chars).
  - Below 1024: one slide per view. A controls row appears under the track (`flex justify-between`, 32px tall):
    - Pagination (left): bars **14×4px**, radius 16, margin 3px, inactive #cccccc, active **#632ff5**, opacity .7, `transition: transform .2s linear`.
    - Arrows (right, gap 16px): 19×19 hit area, 24px arrow icons (#030711), transparent bg, opacity .7 (disabled .3, hover .9).
  - 768: left span 4 (219px), right span 8 (453px slides). 375: stacked; slides are 327px wide and move 343px per step.

### 2.15 Community CTA + stats
- Section: `relative overflow-hidden text-white`, **gradient-12** (bg #062ae0), grain `::before` (multiply, .6), padding 48/64. Height 453 at 1440.
- **Concentric-circle overlay** `::after` (z-index 1, pointer-events none):
```css
.circle-bg::after { content:""; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
  width:125vw; max-width:125%; aspect-ratio:1/1; border-radius:50%; opacity:.64; z-index:1;
  background-blend-mode:multiply; background-position:50% center; background-repeat:no-repeat; background-size:cover;
  background-image:
    radial-gradient(circle, rgb(0,170,255) 0, rgb(0,170,255) 20%, transparent 20.1%),
    radial-gradient(circle, transparent 0, rgb(0,136,255) 40%, transparent 40.1%),
    radial-gradient(circle, transparent 0, rgb(0,136,255) 60%, transparent 60.1%),
    radial-gradient(circle, transparent 0, rgb(0,136,255) 80%, transparent 80.1%),
    radial-gradient(circle at 100% 0, rgb(0,136,255) 0, transparent 80%);
  box-shadow: 0 0 100px 40px rgba(255,0,255,.3); }
@media (max-width:48rem){ .circle-bg::after { width:250vw; max-width:250%; } }
```
(At 1440 it computes to 1800×1800, centered.)
- Content (`relative z-10` above the overlays): `grid-container gap-0` (12 columns of 104px, no gap at 1440).
  - Left `lg:col-span-7` (728px): eyebrow mono 16/24 white (17 chars) → heading-2 white (58 chars, **2 lines**) → body white (235 chars, 3 lines) → button row `mt-8 flex gap-12px` (column, centered, below 768): **primary.dark large** (18 chars, 189×48) and **secondary.dark large** (21 chars, 217×50).
  - Right `lg:col-span-4 lg:col-end-13` (416px): `border-left:1px solid #e5e7eb` (md+; border-top on mobile with pt 32), `padding-left:60px`, `space-y-24px`: **3 stat blocks** (`space-y-4px`): number (display 32/38.4 **400**, 4–9 chars, for example "NN,NNN +") and label (18/28, 14–23 chars). Each block is 66px tall.
  - 768: 8-col grid, left 344px, right 258px. 375: stacked; the stats come after the buttons.
- Reveal: the whole grid fades up (0ms); left column 0ms; right column 100ms; each stat 100ms; buttons row 300ms.

### 2.16 Footer
- bg #030711, `padding-top:48px; padding-bottom:0`. `.container`.
  - Logo (light variant) **147×34** at the top.
  - Main block `lg:grid grid-cols-8 lg:py-16` (64px vertical padding at ≥1024; columns 156px at 1440):
    - `col-span-6`: `grid grid-cols-3 gap-y-80px` (≥1024 only), 6 link columns in 2 rows (3+3). Column: heading-5 white (mb 16) + vertical list of links 14/20 400 rgba(255,255,255,.5), **28px row pitch** (20px line + 8px gap), hover white + underline. Column sizes: 6, 5, 4 (plus an inline badge), 4, 4 and 4 links; heading lengths 7–14 chars; link lengths 3–29 chars.
      - Badge next to one link: mono 10px 500, white on #632ff5, radius 4, padding 4, `margin-inline-start:16px` (86×22).
    - `col-span-2` (312px): `grid gap-y-48px gap-x-32px`:
      1. Newsletter block: heading-5 (16 chars) → paragraph 14/20 rgba(255,255,255,.5) (88 chars, 2 lines, mb 16) → **secondary.dark medium** button (8 chars, 108×42; full width below 1024).
      2. Region selector: heading-5 (13 chars) → a select-like button 312×42: bg #030711, `border:1px solid #4a5565`, radius (about 8–12px), padding 10px 12px, flag emoji plus label (14/20 white), and a 16px chevron at opacity .5 on the right (rotates on open; `transition-transform duration-200`).
      3. Social: heading-5 (15 chars) → `flex flex-wrap gap-y-20px gap-x-24px max-w-[200px]`: **7 icons** of 24×24, white (GitHub, LinkedIn, YouTube, Instagram, X, Bluesky, RSS; recreate as simple generic inline SVGs or neutral circles).
  - Bottom bar: `border-top:1px solid #1e2939; padding:24px 0` (32 at lg), `lg:flex justify-between gap-24`:
    - Copyright 14/20 white (42 chars, wraps to 2 lines in a 263px column; 4 lines in the measured box with spacing).
    - Legal links: `flex flex-wrap gap-32px` (24 below lg), 6 links of 14/20 rgba(255,255,255,.5) (8–25 chars), plus a "cookie preferences" text button on a second row.
- **<1024**: the 6 link columns become an **accordion** (`my-10 flex flex-col lg:hidden`): 6 rows of 57px, each a button with heading-4 styling (20/24 600 white), `border-top` (#1e2939), and a chevron. The newsletter, region and social blocks stack under it with gap 48; the social icons are one row with gap-x 24px. The bottom bar is flex-col gap 24.

---

## 3. Motion summary

| what | trigger | properties | duration / easing / delay |
|---|---|---|---|
| Scroll reveal `.animate-scroll-fade-up` (40 elements) | IntersectionObserver adds `.is-visible` **once** (never removed; verified by scrolling back up) | `@keyframes fadeUp { from {opacity:0; transform:translateY(1.25rem)} to {opacity:1; transform:none} }`. The element starts `opacity:0` with the animation **paused**; `.is-visible` sets `animation-play-state: running` | **400ms**, `cubic-bezier(0,0,0,1)`, `forwards`. Stagger is set by inline `animation-delay`: **0 / 100 / 200 / 300 / 400ms** (eyebrow 0, heading 100, body 200, CTA 300) |
| Reveal threshold | measured: fired after about 40px of a 24px-tall element (still translated 20px) and about 130px of a 489px panel had entered the viewport. Fired early enough that everything above the fold is visible on load | implement as `new IntersectionObserver(cb, { threshold: 0.25, rootMargin: '0px 0px -40px 0px' })` with unobserve after the first hit **(inferred settings that reproduce the measurements)** | |
| Also defined (unused on home) | | `fadeDown` (−1.25rem), `fade` (opacity, 150ms linear) | |
| Logo marquee | always | `translate(-2%) → translate(-35.35%)` | **30s linear infinite** |
| Announcement carousel | autoplay plus arrows | `translateX(-n*100%)` | **every 8s**, 500ms ease-in-out, infinite loop with clones |
| Nav hide/show | scroll direction, past about 575px | inline `top: -91px` / `0` | `transition: all 200ms cubic-bezier(.4,0,.2,1)` |
| Mega-menu | hover/click | opacity 0→1, translateY(-8px)→0 | 200ms ease-in-out (`cubic-bezier(.4,0,.2,1)`) |
| Nav chevron | open | rotate 0→180° | 150ms cubic-bezier(.4,0,.2,1) |
| Mobile drawer and bottom bar | hamburger | height/opacity/translate | 250ms cubic-bezier(.4,0,.2,1) |
| Hamburger and close swap | toggle | opacity + translateX(8px) | 250ms |
| Hero brush stroke | mount | stroke-dashoffset 3233→0 (mask), fill opacity 0→1 | 1s ease-in-out; fill 250ms |
| Testimonial slider | arrows/drag/dots (<1024) | translateX | 400ms cubic-bezier(.25,1,.5,1) |
| Buttons | hover/active/focus | bg, color, gradient overlay | 150ms cubic-bezier(.4,0,.2,1) |
| Integration tile | hover | border-color #e5e7eb→#99a1af | 300ms cubic-bezier(.4,0,.2,1) |
| IDE tile | hover | bg #fff→#f9fafb | 150ms |
| Mega-menu link arrows | group hover | translateX(2px) / (6px) | 150ms |
| `prefers-reduced-motion: reduce` | | the original has a `motion-reduce:animate-none` utility. Disable the marquee and reveal animations (show the elements immediately) | |

No parallax, no scroll-linked transforms, no GSAP/ScrollTrigger, no Lottie/Rive/video.

---

## 4. Tailwind v3 config hints (for Build)
```js
// tailwind.config.js (extend)
colors: { ink: { 950:'#030711',900:'#101828',800:'#1e2939',700:'#364153',600:'#4a5565',500:'#6a7282',400:'#99a1af',300:'#d1d5dc',200:'#e5e7eb',100:'#f3f4f6',50:'#f9fafb' },
          purple: { 50:'#f6f5ff',100:'#ecebff',400:'#9786ff',600:'#632ff5',700:'#5720e1',900:'#3d189a' },
          orange: { 50:'#fff9f5',400:'#ff9e5f',500:'#fe8331',600:'#fe6703',700:'#dd5604' },
          sun: '#ffcc25' },
fontFamily: { display:['Outfit', ...stack], sans:['Outfit', ...stack], mono:['"IBM Plex Mono"', ...monoStack] },
borderRadius: { lg:'8px', xl:'12px', '2xl':'16px' },
boxShadow: { primary:'0 32px 64px -16px rgba(3,7,17,.24)' },
keyframes: { fadeUp:{ '0%':{opacity:0,transform:'translateY(1.25rem)'}, '100%':{opacity:1,transform:'translateY(0)'} },
             slider:{ '0%':{transform:'translate(-2%)'}, '100%':{transform:'translate(-35.35%)'} } },
animation: { 'scroll-fade-up':'fadeUp .4s cubic-bezier(0,0,0,1) forwards', slider:'slider 30s linear infinite' },
```
Disable Tailwind's default `container` and implement the `.container` table from 0.2 in CSS.

## 5. Not measurable / caveats
- Typekit CSS is cross-origin, so its `@font-face` rules could not be read. Font identity comes from `document.fonts` (family, weight, status) and the 6 woff2 requests to `use.typekit.net`.
- The hero brush-stroke start state (dashoffset = full length) is inferred from the class and transition; the stroke finished before the first evaluate.
- The IntersectionObserver options are not readable at runtime; the threshold and rootMargin above reproduce the measured trigger points.
- Mega-menu contents were measured for the first trigger only. The other 4 triggers use the same component with different item counts (not individually measured).
- The cookie-consent banner (OneTrust, bottom-left floating card 375×326) is third-party. It was hidden during measurement and should not be built.
