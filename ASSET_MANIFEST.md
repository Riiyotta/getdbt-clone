Source: https://www.getdbt.com/

# Asset manifest (homepage)

**Nothing here was downloaded.** All logos, photos, GIF screenshots, illustrations and commercial fonts are dbt Labs or third-party proprietary assets. Build with neutral placeholders at the listed rendered sizes (for example a `#e5e7eb` box, or a grey wordmark rectangle for logos). Generic UI icons can be recreated as inline SVG.

Notes: images are served through Next.js `/_next/image` from `cdn.sanity.io` with `fit=max&auto=format`. "Natural" is the intrinsic size of the source file; "rendered" sizes are at 1440 unless noted. All `<img>` use `loading="lazy"` except the nav logo.

| # | role / location | format (source) | natural | rendered @1440 | aspect | fit / radius | placeholder guidance |
|---|---|---|---|---|---|---|---|
| 1 | Nav logo (dark wordmark + mark) | SVG `/img/logos/dbt-labs-logo.svg` | 391×90 | 139×32 | 4.34:1 | fill | neutral wordmark block 139×32 (#030711 text-style "Brand") |
| 2 | Footer logo (light variant) | SVG | 391×90 | 147×34 | 4.34:1 | fill | same, white |
| 3–10 | Logo marquee, 8 customer/partner logos ×3 copies | 4 PNG, 2 SVG, 1 WebP, 1 PNG | 1672×425, 2560×727, 429×171, 149×40, 600×237, 1117×176, 3840×628, 841×379 | 120 wide × 31, 34, 40, 32, 40, 19, 20, 40 high | various | `object-contain`, `max-h-[40px]`, radius 0 | 8 grey (#99a1af) wordmark rectangles, 120px wide, same heights |
| 11 | Dark news band: partner + brand lockup (pill with gradient outline) | SVG | 291×63 | 326×71 | 4.6:1 | fill | rounded-full outline pill (border 2px gradient #632ff5→#fe8331) with two short grey wordmarks |
| 12 | Feature panel 1 media: animated IDE screen recording | **GIF** | 1920×1041 (served 1440×780) | 824×447 (1280: 760×412; 768: 672×364; 375: 279×151) | 1.844:1 | fill, radius 8px, max-h 550 | dark (#1e2939) rounded rect with fake code lines, or a static neutral image at 1.844:1 |
| 13 | Feature panel 2 media (lineage graph in IDE) | **GIF** | 1920×1038 (1440×778) | 824×445 | 1.85:1 | same | same |
| 14 | Feature panel 3 media (refactor in IDE) | **GIF** | 1920×1036 (1440×777) | 824×445 | 1.853:1 | same | same |
| 15–20 | Integration tile logos (6) | 3 SVG (40×40), 3 PNG (400×400) | 40×40 / 400×400 | box 40×40 (image `h-[30px] max-w-[30px]` inside, `object-contain`, `rounded-2xl`) | 1:1 | contain | 30px grey circle or rounded square |
| 21–23 | "Why" card icons (3D gradient glyphs: shield, coin, layers) | PNG | 192×192 | 56×56 | 1:1 | contain | 56px rounded square with a soft purple/orange gradient |
| 24 | Orchestration diagram (model DAG with status chips) | SVG | 555×409 | 555×409 (768: 332×245; 375: 327×241) | 1.357:1 | fill, radius 16px | light grid of 6–7 white node cards with grey borders and connector lines, or a #f9fafb box |
| 25–28 | IDE tile icons (4) | SVG | 40×40 | 40×40 | 1:1 | fill | 40px neutral icon square |
| 29 | Testimonial logo A | PNG | 800×116 (served 256×37) | box 100×50, `object-contain` | 6.9:1 | contain | grey wordmark 100×15 centered in a 100×50 box |
| 30 | Testimonial logo B | PNG | 866×260 (served 256×77) | box 100×50 | 3.33:1 | contain | grey wordmark |
| 31 | Mega-menu (Product) item icons ×8 | SVG | 28×28 | 20×20 (in a 40×40 tile) | 1:1 | – | generic line icons |
| 32 | Mega-menu featured thumbnail (infinity loop graphic) | PNG | ~224×603 source crop | 124×61 | 2.03:1 | – | soft purple/orange gradient rounded rect |
| 33 | Hero video thumbnail | PNG | 1872×936 | **not displayed** (`display:none` at all widths) | 2:1 | – | do not build |
| 34 | Grain texture | SVG `/_next/static/media/noise.0b501f65.svg` | tiles at 250px (300px on retina) | overlay | – | repeat | recreate with an inline `feTurbulence` SVG data URI (see CLONE_SPEC 0.5) |

## Inline SVG icons (generic, recreate)
| icon | size | where |
|---|---|---|
| chevron-down | 16×16 (`viewBox 0 0 16 16`) | nav triggers (rotates 180° when open) |
| chevron-down rotated −90° (reads as a right chevron) | 24×24 | card text links ("why" cards, testimonial cards), mobile drawer rows |
| small right chevron | 16×16 | mega-menu links and footer strip |
| arrow-left / arrow-right (stroke 1.5, square caps) | 20×21 (`viewBox 0 0 21 21`) | announcement bar arrows, dark-band CTA, slider arrows (24px) |
| search (magnifier) | 24×24 | nav |
| user / account | 24×24 | nav |
| hamburger / close | 24×24 | mobile nav |
| login (arrow into bracket), add-user | 24×24 | mobile drawer |
| quote mark | 24×24 | testimonial card A |
| play circle (white circle with orange #FE6703 triangle) | 56 / 80px | hidden hero video link only |
| social: GitHub, LinkedIn, YouTube, Instagram, X, Bluesky, RSS | 24×24 (LinkedIn 20×21) | footer; use generic glyphs or neutral circles |

## Fonts
| family | delivery | license | use instead |
|---|---|---|---|
| polymath (400, 600) | Adobe Fonts / Typekit kit `kvb8avc` | commercial, **do not self-host** | Google Fonts **Outfit** 400/600 |
| polymath-text (400, 500, 700) | Typekit | commercial | **Outfit** 400/500/700 |
| IBM Plex Mono (400/500) | Typekit-served, but the family is OFL | open | Google Fonts **IBM Plex Mono** 400;500 |
| bugrino (500) | self-hosted woff2 | commercial; declared but not used on this page | omit |

Suggested `<link>`: `https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap`

## No other media types
There is no `<video>`, Lottie, Rive or `<canvas>` on the homepage. Motion comes from CSS keyframes, transitions and the three GIFs only.
