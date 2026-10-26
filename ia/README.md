# Lattice clone: information architecture

**Edit `ia.json` by hand. Don't edit `IA.md` or `matrix.csv`:** `build.mjs` regenerates them and overwrites any changes.

| file | kind | what it is |
|---|---|---|
| `ia.json` | **hand-edited** (source of truth) | 18 templates (T0–T17), 71 routes, 84 sections in 18 categories |
| `IA.md` | generated | readable IA: template shares, chrome split, sections by reuse (with implementation column), per-template tables, section reference |
| `matrix.csv` | generated | a section × template grid for spreadsheets |
| `validate.mjs`, `build.mjs` | copied unchanged from the `ia-builder` skill | generic. Everything they do comes from `ia.json` |

## Re-run

```bash
cd ia
node validate.mjs && node build.mjs
```

After any change to `src/routes.js`, `src/App.jsx`, `src/Layout.jsx`, `src/content/pages/*.js` or `design-repo/`, update `ia.json` and re-run both scripts. Every number in a section's `scope` must equal that section's computed route count. The validator flags any mismatch.

## Conventions

- **Ids are the design-repo's.** All 84 sections have a contract in `design-repo/sections/` with the same id, recorded in `contract`. Template ids are the design-repo's `T0`–`T17`; `slug` holds its template `name`. Sections the IA once planned from `PAGES.md` and the code never built (`listing.filter-toolbar`, `listing.featured-item`, `listing.card-grid`, `form.download-form`, `article.breadcrumb`, `article.prose-chapter`, `article.pull-quote`, `article.sticky-rail`, `article.story-meta`, `article.post-header`, `legal.policy-part`, `listing.media-contact`, `directory.filter-sidebar`, `directory.partner-results`, …) are gone: the code renders those as parts of one section component, so the IA follows the code (see "Merged and renamed" below).
- **`implementedBy`** is set on every section; each was checked against the component the design-repo contract cites (`file > Export`, plus the homepage component where a homepage-specific one still exists).
- **`status`** (per template): all 18 are `implemented` (registered in `src/App.jsx`, content module present, rendering). `designRepoStatus` is `implemented` for all 18. Status also appears as a suffix on each template `name`, because the generic `build.mjs` only prints `name`.
- **`chrome`** has 3 values, taken from `src/Layout.jsx` (`CHROME` map): `full` (announcement bar, navbar, mega-menus, mobile drawer, footer; 69 routes), `event-subnav` (`/summit`: own sub-nav and own event footer, **no announcement bar and no global footer**) and `none` (`/partner-directory`: minimal nav, no footer).
- **Sections list the union for the template**, in page order, each listed once. Per-member absences, slot swaps and repeats are in the template `notes` (generated from the member routes' reference PageSpecs).
- **Overlays.** `cta.dev-path-dialog` is not an in-flow section: it renders into the document body and opens from hero buttons on `/product/lattice`, `/product/governance`, `/product/integrations` and `/security`.
- Original-site URLs and copy are deliberately absent. Routes are the clone's own paths.

## Redirects (not rendered, so outside the route count)

The ia.json schema has no slot for non-rendering routes, so they're listed here. Source: `src/routes.js` `redirects` (mirrored in `design-repo/routes/routes.json`).

| from | to |
|---|---|
| `/product/explorer` | `/product/catalog` (T1) |
| `/lattice-labs/about-us` | `/about-us` (T12) |
| `/lattice-labs/belonging` | `/about-us/belonging` (T12) |
| `/lattice-labs/open-roles` | `/about-us/careers` (T12) |
| `/lattice-labs/services` | `/services` (T12) |

Any other path falls back to the `ComingSoon` stand-in (`src/App.jsx`, `path="*"`). No template renders it any more.

## Findings (from this run of validate.mjs / build.mjs)

1. **Every route renders.** All 71 routes (18 templates) are implemented and each section has a component and a design-repo contract. Routes per template: T0 1, T1 6, T2 5, T3 6, T4 5, T5 4, T6 3, T7 4, T8 4, T9 3, T10 4, T11 3, T12 10, T13 9, T14–T17 1 each. T12 and T13 (19 routes) are the two bespoke families; T1–T11 are 47 routes of repeated shapes.
2. **27 of 84 sections are shared, 57 are page-local.** The shared ones: the 5 full-chrome shell sections (16 templates, 69 routes), `cta.closing-band` (9 templates, 51 routes), `features.card-grid` (8 templates, 46 routes), `editorial.resource-cards` (6 templates, 41 routes), `content.media-split` (7 templates, 40 routes), `hero.split`, `hero.center`, `social-proof.stats-bento` and others. 26 of the page-local sections sit in one-route templates (the homepage and the four one-offs: pricing, champions, event microsite, partner directory) and the rest in single families (listing, article, form, legal, company).
3. **Components merged since the last IA.** `DemoPanel` is `FeaturePanel` (one `features.gradient-panel`, homepage and assistant page) and `IntTiles` is `Integrations` (one `features.integration-tiles`, variants `home` and `labelled`), so the near-duplicate pair recorded earlier no longer exists.
4. **Chrome is uniform except on two routes.** 69 routes carry full chrome; `/summit` uses `event-subnav` and `/partner-directory` uses `none`. `Layout.jsx` has exactly those two variants.
5. **Whole-body sections are real.** Article bodies, guide bodies, the card listings and the careers list are single DOM sections that hold more than 60% of their page (11 routes); the design-repo records reviewed wrapper-gate whitelist entries for them.

### Informational: what the counts mean

`validate.mjs` reported no hard failures and no scope mismatches. Route counts in the generated tables are **per template, not per member**. For example, `company.leadership-list` shows 10 routes because T12 has 10 routes, even though only `/about-us` renders it. The scope strings therefore say "N routes across the templates that list it". Member-level placement is in each template's `notes`. Don't "correct" those numbers to member counts. The validator would then flag them, because it computes at template level.

## Merged and renamed since the last IA (code and specs win over PAGES.md)

- **One id per component.** `listing.*`, `article.*`, `form.*` and `legal.*` follow the components: `listing.hub-grid` (featured row + card grid), `listing.case-grid` (filters menu, cards, featured story band, view more), `listing.event-grid`, `listing.session-grid`, `listing.press-grid`, `listing.latest-posts`; `article.post-body` (post header + prose + rail), `article.guide-body` (prose + TOC rail + embedded download form), `article.story-body` (prose + facts card); `form.form-header` (header + prose + form card); `legal.policy-body` (heading-bounded parts inside one body). `company.role-filter` merged into `company.role-list` (the filter is a runtime part of the same section).
- **Corrections to earlier claims.** `community.dark-quote-slider` is one static quote (`community.dark-quote`); `community.story-grid` is a slider (`community.story-slider`); `cta.champions-closing` is half orange, half white, not dark; `event.highlight-cards` are rows (`event.highlight-rows`); `event.media-block` is a single photo (`event.photo-band`); `event.closing-bands` split into `event.quote-band` and `event.closing-band`; pricing has two FAQ accordions, no billing toggle and no highlighted plan; the summit has no announcement bar and no global footer (`shell.event-subnav` + new `shell.event-footer`); the partner directory has `shell.minimal-nav` and no footer (new `directory.header` + `directory.partner-locator`); T4's "logo grid" is the testimonial slider; T1 heroes have two CTAs; `/product/lattice` has no dark tabs; the integrations directory has no filter; the self-hosted page has 5 comparison tables; champions uses the site's standard fonts.
- **Runtime UI.** `cta.dev-path-dialog`, `article.progress-bar`, `listing.category-nav` and the shell announcement bar, mega-menu and mobile drawer are retrieval-ineligible in the design-repo; the listing filters, pricing tooltips and partner facets are `runtimeUi` parts of their sections.
- **Spec vs code.** Where `PAGES.md` and the specs disagree with the code, the code is recorded here; the design-repo's `extraction/measured-values.json` (`preExistingClaimChecks`) lists each such claim with its citation.
