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
- Root IA (`ia/ia.json`, `IA.md`, `matrix.csv`, `README.md`) regenerated from design-repo: 18 templates all implemented, 84 contracted sections, planning-time section ids replaced. `PAGES.md` has an appended status note.
- Version 1.1.0 (documentation-only field).

## 1.0.0 - 2026-10-26

Initial build (from scratch) against the current clone source.

- Tokens: 205 foundation + 60 semantic + 41 component tokens (306 in the LLM catalog), 24 motion patterns, light theme.
- 11 primitives, 11 components, 84 section contracts (6 retrieval-ineligible runtime UI).
- Templates: 18 implemented (T0-T17) + 0 pending; 71 routes (71 implemented, 0 pending), 5 redirects. (This line originally read "18 implemented (T0-T4) + 0 pending (T5-T17)", which contradicted the data; corrected in 1.1.0.)
- PageSpec schema with required `mode` (reference|generated); 71 reference examples (one per implemented route) and 2 generation-safe examples (4 by the time of the 1.1.0 review).
- Asset roles with pinned 3-way availability; generated-mode leakage rules; wrapper-height gate with 1440 measurements of every implemented route.
- Pre-existing claims checked against code: see extraction/measured-values.json `preExistingClaimChecks`.
