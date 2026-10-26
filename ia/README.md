# Lattice clone: information architecture

**Edit `ia.json` by hand. Don't edit `IA.md` or `matrix.csv`:** `build.mjs` regenerates them and overwrites any changes.

| file | kind | what it is |
|---|---|---|
| `ia.json` | **hand-edited** (source of truth) | 18 templates (T0–T17), 71 routes, 86 sections in 18 categories |
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

- **Ids match design-repo.** The 26 sections that have a contract in `design-repo/sections/` keep its exact id and record it in `contract`. Template ids are design-repo's `T0`–`T17`, and `slug` holds design-repo's template `name`. New ids (no contract yet) use the same `category.kebab-id` form.
- **`implementedBy`** is set only on sections whose component I found in src and that is reachable from a template registered in `src/App.jsx` (T0–T4, plus T12/T13 through the `Sections.jsx` registry). When a block has a homepage-specific component and a shared template component, both are listed.
- **`status`** (per template) has 3 values. `implemented` means registered in `src/App.jsx` and rendering (T0–T4). `registered-content-pending` means registered in App.jsx, with every section component built and wired into `Sections.jsx`, but the per-route content module (`src/content/pages/t12.js` / `t13.js`) doesn't exist yet (T12, T13). These two started as `in-progress` and changed during this run. Flip them to `implemented` once the content lands. `planned` means no code yet. `designRepoStatus` mirrors design-repo (`pending` for T5–T17). Status also appears as a suffix on each template `name`, because the generic `build.mjs` only prints `name`.
- **`chrome`** has 3 values. `full` means announcement bar, navbar, mega-menus, mobile drawer and footer. `event-subnav` (T16) keeps the announcement bar and footer but swaps the navbar for an event sub-nav. `none` (T17) has a minimal nav and no footer.
- **Sections list the union for the template.** A template's `sections` array holds every section any member route uses, in page order, each listed once. Slot swaps, per-member absences and repeated sections are recorded in the template's `notes`. Section order for T1–T4 comes from `src/content/pages/t1–t4.js`. T12/T13 order comes from `specs/T12-T13.md` §D/§E, because their content modules don't exist yet. Re-derive it from `t12.js`/`t13.js` when they land. Other planned templates follow `PAGES.md` §3 and design-repo's `draftSequence` / `decompositionNote`.
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

Any other path falls back to the `ComingSoon` stand-in (`src/App.jsx`, `path="*"`). Routes on unregistered templates render the same stand-in today.

## Findings (from this run of validate.mjs / build.mjs)

1. **Component coverage is far ahead of route coverage.** Only T0–T4 (23 of 71 routes, 32%) render today. Every section that T12/T13 list (19 routes) now has a component, though, and 23 of the 28 sections shared by more than one template have an `implementedBy`. The only shared sections still unbuilt are `listing.header`, `listing.card-grid`, `article.breadcrumb`, `article.prose-chapter` and `form.form-header`. Together they cover most of the listing, article and form templates (T6–T10, 18 routes).
2. **58 of 86 sections are single-use. They should stay page-local.** 22 of them belong to the four 1-route one-offs (pricing 3, champions 8, event microsite 8, partner directory 3), and 10 belong to individual T12 members (leadership, careers roles, compliance, courses, community bento and similar). Only the 5 shell sections plus `cta.closing-band` (9 templates, 51 routes), `editorial.resource-cards` (8 templates, 49 routes) and `features.card-grid` (8 templates, 46 routes) are truly site-wide.
3. **Two near-duplicate blocks now exist in code.** The T13 build added `DemoPanel.jsx` and `IntTiles.jsx` rather than extending the homepage's `FeaturePanel.jsx` and `Integrations.jsx`. The IA therefore records them as separate sections (`features.demo-panel`, `features.integration-tile-grid`). As a result, `features.gradient-panel` and `features.integration-tiles` are now homepage-only (T0 has 5 single-use sections). These two pairs are the clearest consolidation candidates.
4. **Chrome is uniform except on two routes.** 69 routes carry full chrome. Only `/summit` (event sub-nav) and `/partner-directory` (no chrome) differ, so `Layout.jsx` needs exactly two variants when T16/T17 are built.

### Informational: what the counts mean

`validate.mjs` reported no hard failures and no scope mismatches. Route counts in the generated tables are **per template, not per member**. For example, `company.leadership-list` shows 10 routes because T12 has 10 routes, even though only `/about-us` renders it. The scope strings therefore say "N routes across the template(s) that list it". Member-level placement is in each template's `notes`. Don't "correct" those numbers to member counts. The validator would then flag them, because it computes at template level.

## Sources that didn't reconcile (and the decision taken)

- **PAGES.md vs specs.** Where they disagree, the specs win (as instructed). The T4 §5 "logo/tech grid" is actually `social-proof.testimonial-slider`. `/product/lattice` has no dark tabs (it has a 6-card dark grid, so `features.card-grid`). The state and analyst pages have no image band (it's `social-proof.quote-band`). The self-hosted page has 5 comparison tables, not 6. The assistant page ends on resources and the charts page ends on the CTA card. About-us opens with a stat row, not a text block. The PAGES.md "N-img-band" block therefore never appears as its own section.
- **One id vs. material differences.** design-repo keeps the homepage and template versions of `hero.center`, `content.statement`, `content.media-split`, `features.card-grid` and `social-proof.testimonial-slider` as one contract with variants, backed by two components each (for example `Hero.jsx` and `HeroCenter.jsx`). The IA follows design-repo, keeping one id with both components in `implementedBy`, so the two vocabularies stay identical.
- **Spec "new components" that resemble existing ones.** My first pass mapped C-13 N-int-tiles to `features.integration-tiles` and C-16 N-demo-panel to `features.gradient-panel`. The build then implemented them as separate components (`IntTiles.jsx`, `DemoPanel.jsx`), so they now have their own ids (see finding 3). C-14, the integration directory, has no component of its own. It's built from `Feat.jsx` variant G, one section per category, so it's recorded as `features.card-grid` with a T13 note. C-3 N-news-band isn't treated as `editorial.news-band`. It has no lockup and has a side button, so it's `editorial.dark-news-strip` (`NewsStrip.jsx`).
- **One spec block, one component, two ids.** `Jobs.jsx` renders both the department filter and the role list. The IA keeps them as `company.role-filter` and `company.role-list`, following design-repo's decompositionNote that filters are runtime UI.
- **The dialog is wired up but unused so far.** `DevModal.jsx` opens through `parts.jsx > Btn` whenever a CTA sets `cta.dialog`. No existing content file sets it yet: T1 develop deliberately uses a link. `cta.dev-path-dialog` is listed on T12/T13 as an overlay, not an in-flow section.
- **T12/T13 can't render yet.** `T12.jsx`/`T13.jsx` import `src/content/pages/t12.js`/`t13.js`, and neither file existed when this run finished. Until they do, the app's module graph has a missing import.
- **Thin source material.** T15, T16 and T17 have only one-line descriptions in PAGES.md and no spec. Their sections are placeholders named from those descriptions and need recon before building.
