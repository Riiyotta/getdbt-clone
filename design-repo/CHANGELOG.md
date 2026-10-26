# Changelog

## 1.0.0 - 2026-10-26

Initial build (from scratch) against the current clone source.

- Tokens: 130 foundation + 40 semantic + 22 component tokens (192 in the LLM catalog), 11 motion patterns, light theme.
- 11 primitives, 11 components, 26 section contracts (3 retrieval-ineligible runtime UI).
- Templates: 5 implemented (T0-T4) + 13 pending (T5-T17); 71 routes (23 implemented, 48 pending), 5 redirects.
- PageSpec schema with required `mode` (reference|generated); 23 reference examples (one per implemented route) and 2 generation-safe examples.
- Asset roles with pinned 3-way availability; generated-mode leakage rules; wrapper-height gate with 1440 measurements of every implemented route.
- Pre-existing claims checked against code: see extraction/measured-values.json `preExistingClaimChecks`.
