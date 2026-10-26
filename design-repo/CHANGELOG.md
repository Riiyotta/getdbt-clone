# Changelog

## 1.1.0 - 2026-10-26

Revision pass after an independent review; all six findings reproduced. No schema change (PageSpec stays 1.0.0, allowlist 1.0.0).

- Counts: `generatedExamples` in the manifest and README counts table was stale (2 against 4 on disk), so `verify_all` failed `COUNTS`. Both now match the recomputed value (18 after the additions below).
- Docs vs data: README, the manifest scope note and the changelog still described T5-T17 as pending / "being built". The data (templates.json, routes.json, section contracts, reference examples) and the clone (`src/App.jsx` registers T1-T17, every route has a content entry) say all 18 templates and 71 routes are implemented. Prose rewritten to match; `ComingSoon` is documented as the unknown-path catch-all and no-content guard only. `measured-values.json` claim "T5-T17 render the ComingSoon stand-in" replaced with the real state.
- Adversarial suite: 4 mutations were not rejected because their targets had gone stale, not because a rule regressed (rules re-checked in `semantic_validate.py`, none weakened). TEMPLATE_PENDING targeted T8, which is implemented now: it uses a synthetic registry copy with T1 flagged pending. MAX_WORDS used 9 words on `hero.split` title, which is exactly the observed budget (9) after T5-T17 landed: it now derives budget+1 from the contract. VARIANT_REQUIRED_FIELD popped `primary` from `content.media-split#media-left`, which is no longer required: it pops `paragraphs`. MOTION_REQUIRED_PATTERN targeted `hero.split`, whose required list is empty now that some heroes use `static`: it targets `features.card-grid` (requires `reveal.fade-up`, also allows `stroke.still`).
- Generated-example coverage (R4: one per template family): 4 of 18 templates had one. Added 14 `mode: "generated"` examples (T2, T3, T4, T5, T6, T7, T9, T10, T12, T13, T14, T15, T16, T17), fictional brand Wrenly, original generic copy, generation-safe asset roles, placeholder and `.example` URLs. All pass the Draft-07 and semantic validators with zero errors.
- Adversarial suite: now 140 mutations (was 69) - the same four leakage mutations (brand, proprietary logo role, non-reserved absolute URL, source CTA) against each of the 18 generated examples.
- New check `GENERATED_COVERAGE` in `verify_all.py`: every implemented template needs a generated example, and the manifest scope lists must equal templates.json. `prove_drift.py` gained cases for both, and its "pending template" case now flips a template to pending (previously it only replaced T8's nodes).
- `design-repo.zip` was tracked in git and older than the folder: removed from the index and git-ignored; no zip is delivered (README "Delivery").
- Root IA (`ia/`): kept the version refreshed on main (18 templates, 71 routes, 84 contracted sections, every IA section id matches a section contract); `build.mjs`/`validate.mjs` re-run, "All hard invariants reconcile". `PAGES.md` has an appended status note.
- Version 1.1.0 (documentation-only field).

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
