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

After any change to `src/routes.js`, `src/App.jsx`, `src/content/pages/*.js` or `design-repo/`, update `ia.json` and re-run both scripts. Every number in a section's `scope` must equal that section's computed route count. The validator flags any mismatch.

## Conventions

- **Ids match design-repo.** All 84 sections have a contract in `design-repo/sections/` and keep its exact id (recorded in `contract`). Template ids are design-repo's `T0`-`T17`, and `slug` holds design-repo's template `name`. A template's `sections` array, its routes and its chrome are derived from `design-repo/templates/templates.json` and `routes/routes.json` (the union of the node pattern's sections, slot alternatives included, in page order, each listed once).
- **`implementedBy`** names the component that renders the section (`file > export`), taken from the section contract's `source`; where the homepage uses its own component for the same section, both are listed.
- **`status`** (per template) is `implemented` for all 18 templates: each is registered in `src/App.jsx` (T0 is the index route; T1-T17 are in the `templates` map) and every route renders from a content module in `src/content/pages/`. `designRepoStatus` mirrors design-repo (`implemented` for all). Status also appears as a suffix on each template `name`, because the generic `build.mjs` only prints `name`.
- **`chrome`** has 3 values. `full` means announcement bar, navbar, mega-menus, mobile drawer and footer (69 routes). `event-subnav` (T16, `/summit`) swaps the navbar for an event sub-nav and uses the event footer. `none` (T17, `/partner-directory`) has a minimal nav and no footer.
- **Sections list the union for the template.** Slot swaps, per-member absences and repeated sections are recorded in the template's `notes`.
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

Every route above has a registered page component (T0 and T1-T17 in `src/App.jsx`) and a content entry. The `ComingSoon` stand-in (`src/pages/ComingSoon.jsx`) remains only as the catch-all for paths that are not in `src/routes.js` (`path="*"`) and as the guard in `Sections.jsx` for a route with no content entry; no served route reaches it.

## Findings (from this run of validate.mjs / build.mjs)

1. **All 71 routes render.** Every one of the 18 templates is implemented, so route coverage is 71 of 71 (earlier drafts of this IA, written while only T0-T4 were built, said 23 of 71).
2. **57 of 84 sections are single-use and stay page-local.** 26 of them belong to the one-route one-offs (homepage 3, pricing 3, champions 7, event microsite 10, partner directory 3) and the rest to single multi-route templates. Only the 5 shell sections plus `cta.closing-band` (9 templates, 51 routes), `features.card-grid` (8 templates, 46 routes), `content.media-split` (7 templates, 40 routes) and `editorial.resource-cards` (6 templates, 41 routes) are truly site-wide.
3. **Remaining near-duplicates are homepage-only.** The gradient panel and integration tiles are now one component each, reused by T0 and T13 (`FeaturePanel.jsx`, `Integrations.jsx`). The homepage still keeps its own `Hero.jsx`, `Statement.jsx`, `DiagramSection.jsx`, `WhyCards.jsx` and `Testimonials.jsx` next to the shared template components, recorded as one id with two `implementedBy` entries; they are the remaining consolidation candidates.
4. **Chrome is uniform except on two routes.** 69 routes carry full chrome; `/summit` (event sub-nav) and `/partner-directory` (no chrome) are handled by the two `Layout.jsx` variants.

### Informational: what the counts mean

`validate.mjs` reports no hard failures and no scope mismatches. Route counts in the generated tables are **per template, not per member**. For example, `company.leadership-list` shows 10 routes because T12 has 10 routes, even though only `/about-us` renders it. The scope strings therefore say "N routes across the template(s) that list it". Member-level placement is in each template's `notes`. Don't "correct" those numbers to member counts: the validator computes at template level.

## Reconciliation decisions

- **PAGES.md vs specs.** PAGES.md is the original recon inventory (status as of the homepage-only build); where it disagrees with the specs, the specs win, and the shipped clone and design-repo win over both. PAGES.md now carries a status note pointing here.
- **One id vs. material differences.** design-repo keeps the homepage and template versions of `hero.center`, `content.statement`, `content.media-split`, `features.card-grid` and `social-proof.testimonial-slider` as one contract with variants, backed by two components each. The IA follows design-repo.
- **Planning-time section ids were replaced.** The first drafts used planned ids for the listing, article and form templates (for example `listing.card-grid`, `article.prose-chapter`, `article.story-meta`). The built templates decompose those pages differently, so the IA now uses design-repo's contracted ids (for example `listing.hub-grid`, `article.story-body`, `form.form-header`).
