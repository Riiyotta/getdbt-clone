// Image map for the T1-T4 templates (sibling of assets.js): role -> { src, width, height, alt }.
// Files under public/assets/pages/ are original placeholder SVG artwork for "Lattice" (product-UI
// mockups in the site palette, abstract gradient "photo" compositions, invented badges/wordmarks).
// Customer logos reuse the homepage marquee wordmarks.
import { assets } from './assets'

const A = '/assets/pages'
const img = (path, width, height, alt = '') => ({ src: `${A}/${path}`, width, height, alt })

// Natural sizes: split heroes 720 wide (rendered at column width, 612 at 1440) unless the spec's
// rendered width is smaller (catalog 506); centred heroes 1200 wide (rendered 1036 / 829).
export const heroes = {
  develop: img('hero/develop.svg', 720, 720, 'Lattice editor building a model from a source and a join, next to an analyst at work'),
  testAndObserve: img('hero/test-and-observe.svg', 720, 720, 'Test results panel showing passing checks for an orders model'),
  mesh: img('hero/mesh.svg', 720, 720, 'Five team projects connected around a shared finance project'),
  catalog: img('hero/catalog.svg', 506, 506, 'Catalog search returning a certified revenue model and metric'),
  deploy: img('hero/deploy.svg', 720, 468, 'Nightly production job timeline with four stages'),
  semanticLayer: img('hero/semantic-layer.svg', 720, 720, 'Metric card with a trend line and its YAML definition'),
  dataModernization: img('hero/data-modernization.svg', 1200, 677, 'A legacy job migrated into tested Lattice models'),
  ai: img('hero/ai.svg', 1036, 583, 'An assistant prompt answered with SQL built on certified models'),
  embeddedAnalytics: img('hero/embedded-analytics.svg', 1200, 677, 'Embedded usage chart served to customer tenants'),
  dataTrust: img('hero/data-trust.svg', 684, 445, 'Contract checks passing on a revenue model'),
  costOptimization: img('hero/cost-optimization.svg', 777, 517, 'Warehouse spend falling across six weeks'),
  cobalt: img('hero/cobalt.svg', 720, 558, 'Lattice and Cobalt DB tiles around a data team at work'),
  northwind: img('hero/northwind.svg', 720, 720, 'Lattice and Northwind tiles around a data team at work'),
  quarry: img('hero/quarry.svg', 720, 720, 'Lattice and Quarry tiles around a data team at work'),
  helixa: img('hero/helixa.svg', 720, 720, 'Lattice and Helixa tiles around a data team at work'),
  stratus: img('hero/stratus.svg', 720, 720, 'Lattice and Stratus tiles around a data team at work'),
  driftway: img('hero/driftway.svg', 720, 720, 'Lattice and Driftway tiles around a data team at work'),
  financialServices: img('hero/financial-services.svg', 1200, 1200, 'Ledger transactions flowing into balance and settlement models'),
  healthcare: img('hero/healthcare.svg', 1200, 1200, 'Clinic visits flowing into encounter and capacity models'),
  manufacturing: img('hero/manufacturing.svg', 1200, 1200, 'Line sensor readings flowing into yield and downtime models'),
  energyUtilities: img('hero/energy-utilities.svg', 1200, 1188, 'Meter reads flowing into load and outage models'),
  telecommunications: img('hero/telecommunications.svg', 1200, 1155, 'Call records flowing into network and churn models'),
}

// N-split images: T1 intro 1224x600 (~2.05:1), T3 text-left 1244x600 (~2.07:1), checklist split 736x550
export const splits = {
  develop: img('split/develop.svg', 1224, 600, 'The build loop: plan, write, review, test, ship, watch, learn, refine'),
  testAndObserve: img('split/test-and-observe.svg', 1224, 600, 'The quality loop: assert, run, alert, triage, fix, verify'),
  mesh: img('split/mesh.svg', 1224, 600, 'The domain loop: own, publish, version, consume, govern, retire'),
  catalog: img('split/catalog.svg', 1224, 600, 'The discovery loop: search, inspect, trace, trust, reuse, document'),
  deploy: img('split/deploy.svg', 1224, 600, 'The release loop: merge, build, check, promote, schedule, notify'),
  semanticLayer: img('split/semantic-layer.svg', 1224, 600, 'The metric loop: define, review, publish, query, cache, audit'),
  quarry: img('split/quarry.svg', 1244, 600, 'Sources flowing through a Lattice project into Quarry'),
  stratus: img('split/stratus.svg', 1244, 600, 'Sources flowing through a Lattice project into Stratus'),
  ai: img('split/ai.svg', 736, 550, 'An analyst reviewing model context prepared for an assistant'),
  embeddedAnalytics: img('split/embedded-analytics.svg', 736, 550, 'An analyst checking a tenant revenue metric'),
  costOptimization: img('split/cost-optimization.svg', 736, 550, 'An engineer reviewing a run that reused unchanged models'),
}

// 32x32 line icons (N-feat A/B/D); mesh renders them at 56x56
const iconNames = [
  'team', 'rocket', 'shield', 'cloud', 'branch', 'coin', 'badge', 'sparkle', 'clipboard', 'lock', 'chart', 'layers', 'plug',
  'clock', 'bell', 'search', 'book', 'gauge', 'target', 'globe', 'flask', 'grid', 'key', 'heart', 'bolt', 'factory', 'signal',
  'dollar', 'user',
]
export const icons = Object.fromEntries(iconNames.map((n) => [n, img(`icons/${n}.svg`, 32, 32)]))

// N-feat C image cards, 4:3 (736x550), object-cover
export const cards = Array.from({ length: 9 }, (_, i) => img(`cards/card-${i + 1}.svg`, 736, 550))

// N-tabs-dark media 1224x1224 (one 1224x1056), N-tabs-light 640x640, ai light tabs 518x518
const darkAlt = [
  'Visual model canvas joining event sources into a staging model',
  'Editor suggesting a uniqueness test while a model is written',
  'Check results for the last 24 hours with a pass-rate ring',
  'Column-level lineage from raw orders to a revenue model',
  'Assistant answering a revenue question with SQL on a certified model',
  'Nightly run timeline grouped by project layer',
  'Weekly active teams metric with a trend chart',
  'Catalog search results with owners and certification',
]
export const tabsDark = Object.fromEntries(darkAlt.map((alt, i) => [i + 1, img(`tabs/dark-${i + 1}.svg`, 1224, 1224, alt)]))
tabsDark.wide = img('tabs/dark-wide.svg', 1224, 1056, 'Metric query grouped by plan and month with its result table')
const lightAlt = [
  'Visual flow joining two staging tables and adding aggregations',
  'Plain-language request turned into a compiled model',
  'Catalog entry with column descriptions and an owner',
  'Run history with one retried run',
  'Metric definition next to its monthly chart',
  'Compute minutes per run falling after state-aware builds',
]
export const tabsLight = Object.fromEntries(lightAlt.map((alt, i) => [i + 1, img(`tabs/light-${i + 1}.svg`, 640, 640, alt)]))
export const tabsAi = [lightAlt[1], lightAlt[0], lightAlt[2], lightAlt[4]].map((alt, i) => img(`tabs/ai-${i + 1}.svg`, 518, 518, alt))

// N-resources 16:9 artwork (800x452)
export const resources = Array.from({ length: 12 }, (_, i) => img(`resources/r-${i + 1}.svg`, 800, 452))

// N-stats artwork
export const stats = {
  badge: img('stats/badge.svg', 869, 1000, 'Reviewers pick, fall 2026 badge'),
  award: img('stats/award.svg', 612, 705, 'Top rated platform, fall 2026 badge'),
  seals: img('stats/seals.svg', 328, 367, 'Encryption, key management and audit seals'),
  certified: img('stats/certified.svg', 612, 612, 'Annual ecosystem honor badge'),
}

// Colour platform marks for dark logo tiles (30x30)
const platformNames = { northwind: 'Northwind', quarry: 'Quarry', helixa: 'Helixa', stratus: 'Stratus', driftway: 'Driftway', cobalt: 'Cobalt DB' }
export const platforms = Object.fromEntries(
  Object.entries(platformNames).map(([k, name]) => [k, img(`platforms/${k}.svg`, 30, 30, name)]),
)

export const misc = {
  diagram: img('misc/platform-diagram.svg', 832, 468, 'Layered stack: control plane, pipelines, Lattice Core engine and the data platform row'),
  poster1: img('misc/poster-1.svg', 1600, 900, 'Video: a ten-minute tour of the integration'),
  poster2: img('misc/poster-2.svg', 1600, 900, 'Video: building an assistant-ready project'),
  poweredBy: img('misc/powered-by.svg', 275, 56, 'Powered by Lattice Core'),
}

// Customer wordmarks (homepage marquee files), keyed by slug
const m = assets.marquee
const logo = (i) => ({ src: m[i].src, width: 120, height: m[i].height, alt: m[i].alt })
export const customers = {
  kestrel: logo(0),
  meridian: logo(1),
  tidepool: logo(2),
  ferrocene: logo(3),
  orbitly: logo(4),
  halcyon: logo(5),
  basalt: logo(6),
  fernway: logo(7),
}

// ---------------------------------------------------------------- T12-T13 (specs/T12-T13.md F)
// Illustrated avatars (480 square, abstract; no real people), shown as CSS-background circles
export const avatars = Array.from({ length: 12 }, (_, i) => img(`people/avatar-${i + 1}.svg`, 480, 480))

// Abstract "photo" scenes (1200x800): odd = group scenes, even = one person at a desk. Rendered
// object-cover in the spec's boxes via crop().
export const photos = Array.from({ length: 16 }, (_, i) => img(`photos/photo-${i + 1}.svg`, 1200, 800))

// Invented integration marks (30x30 monochrome / single accent) and wordmarks (118x32, 150x32)
export const intMarks = Array.from({ length: 44 }, (_, i) => img(`logos/int-${i + 1}.svg`, 30, 30))
export const intWords = [
  img('logos/word-1.svg', 118, 32, 'Quillstack'),
  img('logos/word-2.svg', 118, 32, 'Brightvane'),
  img('logos/word-3.svg', 150, 32, 'Harbor Signal'),
  img('logos/word-4.svg', 150, 32, 'Copperline Data'),
]

// Placeholder compliance marks at the spec's natural sizes (no real certification logos)
const badgeSizes = [[225, 76], [226, 77], [154, 152], [150, 151], [200, 61], [200, 123], [225, 76], [154, 152], [200, 61]]
const badgeAlt = ['Trustframe placeholder', 'Cloudward placeholder', 'Privacy seal placeholder', 'Assured seal placeholder', 'Datasafe placeholder', 'Healthguard placeholder', 'Openaudit placeholder', 'Global seal placeholder', 'Payshield placeholder']
export const badges = badgeSizes.map(([w, h], i) => img(`badges/badge-${i + 1}.svg`, w, h, badgeAlt[i]))

export const lockups = {
  state: img('lockups/state.svg', 214, 46, 'Lattice State'),
  assistant: img('lockups/assistant.svg', 247, 46, 'Lattice Assistant'),
  stateSquare: img('lockups/state-square.svg', 320, 320, 'Lattice State'),
  mark: img('lockups/mark.svg', 32, 32, 'Lattice'),
}

export const illus = {
  whatIs: img('illus/what-is.svg', 1200, 675, 'Video: a model compiled from two staging tables, with its tests passing'),
  platform: img('illus/platform.svg', 1036, 583, 'Lattice platform layers: assist, build, run and the engine'),
  analyst: img('illus/analyst.svg', 1036, 671, 'An analyst question answered with a chart built on certified models'),
  learn: img('illus/learn.svg', 1224, 1224, 'Four course steps from foundations to deploying'),
}

// Feature screenshots reused from the homepage (1920 wide) for demo panels and 16:9 tab media
export const shots = assets.features
