# Changelog

## 1.0.0 - 2026-10-26

Rebuilt against the current clone (all 18 templates, 71 routes implemented). The previous build covered T0-T4 only.

- Tokens: 205 foundation + 60 semantic + 41 component tokens (306 in the LLM catalog): all ten brush-stroke shapes, gradient 22 and the quote wash, form focus ring and error colour, journey status colours, summit- and directory-scoped colours, three summit font families (theme `event`), new shadows, durations, easings, z-indexes, container widths; font.size.display and the other tailwind roles re-read from source.
- 11 primitives, 11 components, 84 section contracts (6 retrieval-ineligible runtime UI: announcement bar, mega-menu, mobile drawer, developer-path dialog, reading progress bar, category/search bar), 24 motion patterns (stroke draw-on / idle / still, sticky pin, progress bar, TOC scroll-spy, linked scale, photo marquee, instant and height accordions, dialog, hover lift, skeleton pulse).
- Contracts gained `placement` (main | chrome | overlay), `runtimeUi` parts and `constraints.consecutiveVariants`; source ranges re-read from current code (fixes the SOURCE_PROVENANCE drift).
- Templates: 18 implemented, 0 pending; slots now accept fixed-sequence alternatives; chrome variant (full | event | none) and theme per template; 71 routes all implemented, 5 redirects.
- New graph rules: CHROME_VARIANT, TEMPLATE_THEME, DIALOG_PAIRING; ONE_HERO now has pinned hero-less exceptions; NO_ADJACENT_IDENTICAL honours observed repeats.
- 71 reference examples (one per route) and 4 generation-safe examples (home, product page, article, legal page; fictional brand Wrenly).
- Asset roles: +brand.event-mark, product.lockup, partner.wordmark, figure.article-image (all reference-only, pinned in code).
- Wrapper gate: 1440 measurements of all 71 routes; 11 reviewed whitelist entries for single-body articles, guides, listings and the careers list.
- Corrections of earlier claims against the code: see extraction/measured-values.json `preExistingClaimChecks`.
