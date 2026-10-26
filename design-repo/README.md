# Design-repo: Lattice structural clone

Machine-validated design system + PageSpec contract extracted from the clone project that contains this folder:
a structural/visual clone of a real company's marketing-site layouts, rebuilt for a **fictional brand, "Lattice"**.
An AI can use it to compose new pages from real, measured sections without inventing colours, copy budgets or structure.

Status: **design-review-pending**, not production-approved. Version 1.0.0 (PageSpec 1.0.0, allowlist 1.0.0).

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
 "generatedExamples": 4,
 "themes": 2,
 "measuredRoutes1440": 71
}
```
<!-- counts:end -->

## Scope

- All 18 templates (T0-T17) and all 71 routes are implemented and contracted: tokens, three chrome variants (full: announcement bar, sticky nav,
  mega-menus, mobile drawer, footer; event: summit sub-nav + summit footer, no announcement bar, no global footer; none: minimal nav, no footer),
  84 section contracts, 71 reference PageSpecs (one per route) and 4 generation-safe examples.
- Template families: marketing (T0-T4, T12-T14), content (T5-T8 stories, listings, articles), conversion (T9 asset landing, T10 forms),
  legal (T11), community program (T15), event microsite (T16), partner directory (T17).
- Page-specific openers (listing header, story/guide header, form header, policy header, plan cards, directory header) are classified LISTING / ARTICLE /
  FORM / LEGAL / PRICING / DIRECTORY, not HERO; the hero-less templates are named exceptions in the ONE_HERO rule.
- Long single-DOM bodies (articles, guides, listings, policy text) are one section each, decomposed logically by chapter in their contract; 11 measured
  hits above 60% of their page carry reviewed whitelist entries in extraction/measured-values.json (agent attestation, not a human sign-off).
- Source stack (documentation only): React ^18.3.1 + Vite ^5.4.10 + Tailwind CSS ^3.4.14 (tailwind.config.cjs, CommonJS) + react-router-dom ^6.28.0 (package.json ranges); dev server port 5197. Nothing in the contracts depends on it.

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

## Known gaps (recorded, not hidden)

- Pixel parity against the live original was not measured; geometric parity against the specs' recorded heights exists for the T0-T4 representatives
  only (extraction/measured-values.json `specParity`: within 2px at 1440 except as listed, larger below 1440). T5-T17 have measured clone heights, no parity numbers.
- The event theme loads its three fonts from a public font-stylesheet host at runtime (src/components/chrome/EventChrome.jsx); every other page is request-free.
- Announcement autoplay and sliders have no reduced-motion rule (motion-patterns.json gap notes).
- Forms never submit; the partner locator, listing filters and pricing tooltips are static client-side mocks (contract `runtimeUi`).
