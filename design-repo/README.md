# Design-repo: Lattice structural clone

Machine-validated design system + PageSpec contract extracted from the clone project that contains this folder:
a structural/visual clone of a real company's marketing-site layouts, rebuilt for a **fictional brand, "Lattice"**.
An AI can use it to compose new pages from real, measured sections without inventing colours, copy budgets or structure.

Status: **design-review-pending**, not production-approved. Version 1.1.0 (PageSpec 1.0.0, allowlist 1.0.0). Complete: all 18 templates and all 71 routes are implemented and contracted, with a reference example per route and a generation-safe example per template.

## Counts (recomputed by the build; extraction/verify_all.py checks this block against registry.manifest.json)

<!-- counts:start -->
```json
{
 "tokensInCatalog": 306,
 "foundationTokens": 205,
 "semanticTokens": 60,
 "componentTokens": 41,
 "motionPatterns": 24,
 "primitives": 11,
 "components": 11,
 "sections": 84,
 "sectionsRetrievalIneligible": 6,
 "templates": 18,
 "templatesImplemented": 18,
 "templatesPending": 0,
 "routes": 71,
 "routesImplemented": 71,
 "routesPending": 0,
 "redirects": 5,
 "assetRoles": 37,
 "assetRolesGenerationSafe": 16,
 "graphRules": 15,
 "allowlistEntries": 106,
 "referenceExamples": 71,
 "generatedExamples": 18,
 "themes": 2,
 "measuredRoutes1440": 71
}
```
<!-- counts:end -->

## Scope

- Implemented and contracted: tokens, site chrome (announcement bar, sticky nav, mega-menus, mobile drawer, footer, and the event and minimal chrome variants), and **all 18 templates, T0 to T17 (71 routes)**: homepage; T1 product feature, T2 solution, T3 data platform, T4 industry; T5 case-study detail, T6 content hub listing, T7 filterable card grid, T8 article; T9 asset landing, T10 form, T11 legal prose; T12 company/program, T13 product landing, T14 pricing, T15 community champions, T16 event microsite, T17 partner directory. `templates/templates.json` marks every one `implemented`, `routes/routes.json` marks every route `implemented`, and the sibling clone registers a page component for each (`src/App.jsx`: T0 is the index route, T1-T17 are in its `templates` map; every route has a content entry). 0 templates and 0 routes are pending.
- `src/pages/ComingSoon.jsx` ("This page is being built") still exists in the clone, but only as the catch-all for paths that are not in the route table and as a guard for a route with no content entry. No served route reaches it. The `pending` template status remains valid in the schema for a future template that is registered before its contracts exist; none uses it today.
- Template families: marketing (T0-T4, T12-T14), content (T5-T8 stories, listings, articles), conversion (T9 asset landing, T10 forms),
  legal (T11), community program (T15), event microsite (T16), partner directory (T17).
- Page-specific openers (listing header, story/guide header, form header, policy header, plan cards, directory header) are classified LISTING / ARTICLE /
  FORM / LEGAL / PRICING / DIRECTORY, not HERO; the hero-less templates are named exceptions in the ONE_HERO rule.
- Long single-DOM bodies (articles, guides, listings, policy text) are one section each, decomposed logically by chapter in their contract; 11 measured
  hits above 60% of their page carry reviewed whitelist entries in extraction/measured-values.json (agent attestation, not a human sign-off).
- Source stack (documentation only): React ^18.3.1 + Vite ^5.4.10 + Tailwind CSS ^3.4.14 (tailwind.config.cjs, CommonJS) + react-router-dom ^6.28.0 (package.json ranges); dev server port 5197. Nothing in the contracts depends on it.

### Generation-safe example coverage (one per template, so one per family)

`extraction/verify_all.py` (check `GENERATED_COVERAGE`) fails if any implemented template lacks a `mode: "generated"` example, and the adversarial suite runs four leakage mutations (clone brand, proprietary logo role, non-reserved absolute URL, source-specific CTA; three for the partner directory, which has no CTA) against every one of them.

| template | name | family | routes | generated example (schema/examples/generated/) |
|---|---|---|---:|---|
| T0 | home | marketing-home | 1 | `home.generated.pagespec.json` |
| T1 | product-feature | marketing-product | 6 | `product-feature.generated.pagespec.json` |
| T2 | solution | marketing-solution | 5 | `solution.generated.pagespec.json` |
| T3 | data-platform | marketing-partner | 6 | `data-platform.generated.pagespec.json` |
| T4 | industry | marketing-industry | 5 | `industry.generated.pagespec.json` |
| T5 | case-study-detail | content-story | 4 | `case-study.generated.pagespec.json` |
| T6 | content-hub-listing | content-listing | 3 | `content-hub-listing.generated.pagespec.json` |
| T7 | filterable-card-grid | content-listing | 4 | `filterable-card-grid.generated.pagespec.json` |
| T8 | article | content-article | 4 | `article.generated.pagespec.json` |
| T9 | asset-landing | conversion-landing | 3 | `asset-landing.generated.pagespec.json` |
| T10 | form-page | conversion-form | 4 | `form-page.generated.pagespec.json` |
| T11 | legal-prose | legal | 3 | `legal.generated.pagespec.json` |
| T12 | company-program | marketing-company | 10 | `company-program.generated.pagespec.json` |
| T13 | product-landing | marketing-product-landing | 9 | `product-landing.generated.pagespec.json` |
| T14 | pricing | marketing-pricing | 1 | `pricing.generated.pagespec.json` |
| T15 | champions | community-program | 1 | `community-program.generated.pagespec.json` |
| T16 | event-microsite | event | 1 | `event-microsite.generated.pagespec.json` |
| T17 | partner-directory | directory | 1 | `partner-directory.generated.pagespec.json` |

How the 14 newer examples were made: each starts from the structure of its family's representative reference page (same section sequence and variants, so the template pattern validates), keeps the chrome of the existing generated examples, and replaces every text field with original copy for the fictional brand "Wrenly", every asset with a generation-safe role and a `generate:` reference, and every link with a placeholder path or a reserved `.example` URL. They are structurally faithful rather than editorially polished: the copy is deliberately generic filler that respects each field's word and character budget, and long lists are trimmed to six items. Use them as a validated shape, not as finished marketing copy.

## Content and licensing (read before generating)

The clone mirrors the *layout* of a real, live company's site. All copy, imagery and marks in it are original placeholder
material for the fictional Lattice brand (original SVG artwork; OFL fonts Outfit + IBM Plex Mono, Outfit substituting the original's
commercial face). This repo contains **no** copy, logos, photos or brand artwork of the original site.

- `mode: "reference"` PageSpecs reconstruct the clone (fictional Lattice content allowed).
- `mode: "generated"` PageSpecs are new pages for someone else: the semantic validator rejects the clone brand and its fictional
  customers/platforms/people, the clone's copy (hashed fingerprints), clone routes/assets, store links, rating claims, and any
  non-`.example`/`.invalid` absolute URL (`GENERATED_MODE_*` rules).
- In **every** mode the original site's identity, real third-party marks, real people's photos, store badges, live endpoints and the
  original's copy are forbidden (`SOURCE_REAL_IDENTITY`, `ASSET_FORBIDDEN_ALL_MODES`). Generators must use the generation-safe asset
  roles in `assets/asset-roles.json` (placeholder marks, generated product visuals and diagrams, fictional avatars, placeholder ratings)
  and draw new placeholder artwork in the existing style (ink neutrals, purple #632ff5, orange #fe6703, rounded 16px frames).
- Do not publish this repo or the clone publicly.

## Layout

```
registry.manifest.json      status, versions, counts, entry points (all inside this folder)
tokens/00-foundation/       colour, typography, radius, spacing(+container), breakpoint, elevation(+blur), motion, gradient, stroke, icon-size, z-index, motion-patterns
tokens/10-semantic|20-component|30-layout|themes/light.json + event.json
tokens/llm/                 token-catalog.json, token-policy.json, component-allowlist.json
primitives/ components/     building blocks with evidence
sections/                   one closed contract per semantic section (source vs semantic split, variants, budgets, motion, responsive, measured heights)
templates/templates.json    T0-T17 node patterns (slots, sequences), chrome + theme per template
routes/routes.json          every served route mapped once, redirects, fallback
compatibility/graph.json    rhythm/position rules (each implemented in the validator)
assets/asset-roles.json     closed media/link/copy roles with 3-way availability + licensing
schema/                     pagespec.schema.json (Draft-07), section-contract.schema.json, semantic_validate.py, examples/, tests/
extraction/                 measured-values.json (evidence ledger), verify_all.py, wrapper_gate.py, prove_drift.py, measure_sections.mjs
```

## Verify

```bash
pip install jsonschema                      # only third-party dependency (Draft-07 layer)
python3 extraction/verify_all.py            # schema, contracts, parity, citations, pins, counts, wrapper gate, hygiene
python3 schema/tests/adversarial_test.py    # every mutation rejected, every control passes
python3 extraction/prove_drift.py           # proves the drift checks fail on injected drift (scratch copies only)
python3 schema/semantic_validate.py <pagespec.json>
```

Citations (`path:line`) point into the clone project root (the folder containing `design-repo/`). Standalone, those checks
degrade to warnings. To rebuild the clone itself use its lockfile: `npm ci && npm run dev` (port 5197); never ship `node_modules`/`dist`.

## Delivery

This folder is the deliverable. No zip is shipped or tracked: a `design-repo.zip` next to the folder goes stale the moment any file changes, so it is git-ignored. If a zip is needed for transfer, create it fresh and last with the CLI zip tool from the parent folder (`zip -r design-repo.zip design-repo -x "*.DS_Store" -x "*__MACOSX*" -x "*__pycache__*"`), check it has no junk (`unzip -l design-repo.zip | grep -ic "__MACOSX\|\.DS_Store"` prints 0), and do not commit it.

## Known gaps (recorded, not hidden)

- Pixel parity against the live original was not measured in this build. Geometric parity against the specs' recorded original
  heights (`extraction/measured-values.json` `specParity`) exists only for the homepage and the T1-T4 representatives (within 2px at 1440 on those, larger below 1440); T5-T17 have measured clone heights (`sectionHeights`, every route at 1440) but no per-section comparison against recorded original heights.
- The clone's announcement autoplay and sliders have no reduced-motion rule (`tokens/00-foundation/motion-patterns.json` gap notes).
- Wrapper gate: 13 pages warn that one section holds more than half of the page (long article, guide, listing and careers pages). 11 are whitelisted with a justification and a height cap, reviewed by a build agent (agent attestation, not a human sign-off); two (`/case-studies/kestrel` article.story-body 54%, `/events` listing.event-grid 60%) are plain warnings below the 60% error line. `verify_all.py` prints the first four; `wrapper_gate.py` returns all 13.
- Generated examples are shape-faithful but use generic synthesized copy (see above).
- The event theme loads its three fonts from a public font-stylesheet host at runtime (src/components/chrome/EventChrome.jsx); every other page is request-free.
- Forms never submit; the partner locator, listing filters and pricing tooltips are static client-side mocks (contract `runtimeUi`).
