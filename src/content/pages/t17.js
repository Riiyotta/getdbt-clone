// T17 partner directory content (specs/T14-T17.md T17): a static mock of a partner locator with 27
// invented consultancies (3 pages of 9). Logos are neutral placeholder wordmarks.
import { directory as A } from '../../pageAssets'

// [name, url line, blurb, service, tier, regions]
const P = [
  ['Alderpoint Analytics', 'https://alderpoint.example', 'Alderpoint helps finance and retail teams move legacy reporting onto tested, documented Lattice projects with clear owners and service levels.', 'Consulting', 'Pioneer', ['Americas']],
  ['Bramblecode', 'https://bramblecode.example/partners/lattice-practice/', 'A small studio of analytics engineers who pair with in-house teams, coaching them through their first production release and beyond.', 'Training', 'Pioneer', ['Europe & Africa']],
  ['Cairnfield Data', 'https://cairnfield.example', 'Cairnfield designs metric layers for subscription businesses, from revenue definitions to the dashboards that sit on top of them.', 'Consulting', 'Pioneer', ['Europe & Africa']],
  ['Driftmoor', 'driftmoor.example', 'Specialists in warehouse cost reviews. Driftmoor audits run history, trims waste and sets up alerts that keep spend predictable over time.', 'Consulting', 'Builder', ['Americas', 'Asia Pacific']],
  ['Embervale', 'https://embervale.example', 'Embervale runs hands-on bootcamps for analysts learning to model, test and ship their own data products with modern tooling.', 'Training', 'Pioneer', ['Americas']],
  ['Fernhollow Labs', 'https://fernhollow.example/en/services', 'An engineering-led firm that builds cross-project architectures for large organisations with many domain teams and strict governance rules.', 'Consulting', 'Pioneer', ['Europe & Africa']],
  ['Gantry & Loom', 'https://gantryloom.example', 'Gantry & Loom pairs data strategy with delivery, helping leadership teams decide what to build first and then building it alongside them.', 'Consulting', 'Pioneer', ['Asia Pacific']],
  ['Harbinlight', 'https://harbinlight.example', 'Harbinlight supports healthcare providers with compliant pipelines, careful access controls and models that clinicians can actually trust.', 'Consulting', 'Pioneer', ['Americas']],
  ['Ironbark Data', 'ironbark.example', 'A regional consultancy that modernises reporting for public sector agencies, with a strong focus on documentation and handover.', 'Consulting', 'Builder', ['Asia Pacific']],
  ['Juniper Row', 'https://juniperrow.example', 'Juniper Row teaches data teams to write maintainable SQL, structure projects well and review each other’s work with confidence.', 'Training', 'Pioneer', ['Europe & Africa']],
  ['Kestrelwise', 'https://kestrelwise.example', 'Kestrelwise builds product analytics stacks for fast-growing software companies, from event tracking through to activation metrics.', 'Consulting', 'Pioneer', ['Americas']],
  ['Larchmont Data Co', 'https://larchmont.example/partners', 'A boutique team that untangles inherited projects: mapping lineage, removing dead models and adding the tests that were always missing.', 'Consulting', 'Builder', ['Americas']],
  ['Mistral Bay', 'https://mistralbay.example', 'Mistral Bay helps logistics and travel companies forecast demand with clean, well-modelled operational data and reliable daily refreshes.', 'Consulting', 'Pioneer', ['Europe & Africa', 'Asia Pacific']],
  ['Northgable', 'northgable.example', 'Northgable offers managed analytics engineering for teams that need steady capacity without growing headcount this year.', 'Consulting', 'Pioneer', ['Europe & Africa']],
  ['Oakhaven Insights', 'https://oakhaven.example/what-we-do/modern-data-platform-delivery/', 'Oakhaven sets up end-to-end platforms for mid-sized firms, including ingestion, modelling, orchestration and a self-serve semantic layer.', 'Consulting', 'Pioneer', ['Americas']],
  ['Pinecrest Logic', 'https://pinecrest.example', 'A training partner running certification prep courses, live workshops and office hours for analysts moving into engineering roles.', 'Training', 'Pioneer', ['Asia Pacific']],
  ['Quarrystone', 'https://quarrystone.example', 'Quarrystone migrates stored-procedure estates into modular, version-controlled projects with automated tests at every layer.', 'Consulting', 'Pioneer', ['Europe & Africa']],
  ['Redwater Labs', 'https://redwater.example/lattice', 'Redwater Labs builds machine learning feature pipelines on top of governed models so data science teams can reuse trusted inputs.', 'Consulting', 'Builder', ['Americas']],
  ['Saltmarsh Data', 'https://saltmarsh.example', 'Saltmarsh focuses on data quality programs: contracts, freshness checks and incident playbooks that keep stakeholders informed.', 'Consulting', 'Pioneer', ['Europe & Africa']],
  ['Tidewell', 'tidewell.example', 'Tidewell coaches analytics leaders on team design, hiring plans and review rituals that help a growing data function scale calmly.', 'Training', 'Pioneer', ['Americas']],
  ['Umberlake', 'https://umberlake.example/services/analytics', 'Umberlake supports retailers with merchandising and inventory models that refresh hourly and feed planning tools across many stores.', 'Consulting', 'Pioneer', ['Asia Pacific']],
  ['Vantage Fold', 'https://vantagefold.example', 'A partner for media companies, modelling audience, subscription and advertising data into a single dependable reporting layer.', 'Consulting', 'Pioneer', ['Europe & Africa']],
  ['Willowmere', 'https://willowmere.example', 'Willowmere delivers short, focused engagements that set up a new Lattice project with conventions, CI checks and a working first release.', 'Consulting', 'Builder', ['Americas', 'Europe & Africa']],
  ['Yarrowfield', 'https://yarrowfield.example/partners/', 'Yarrowfield designs self-paced courses and certification study plans for teams adopting analytics engineering across several offices.', 'Training', 'Pioneer', ['Asia Pacific']],
  ['Zephyr Grove', 'zephyrgrove.example', 'Zephyr Grove helps energy and utilities firms model meter, outage and asset data with careful lineage for audit and regulatory review.', 'Consulting', 'Pioneer', ['Europe & Africa']],
  ['Ashgrove Metrics', 'https://ashgrove.example', 'Ashgrove specialises in metric definitions for executive reporting, aligning finance, sales and product on one shared set of numbers.', 'Consulting', 'Pioneer', ['Americas']],
  ['Birchline Partners', 'https://birchline.example/en-gb/lattice-services/', 'Birchline offers architecture reviews and health checks for mature projects, with a prioritised roadmap of fixes delivered in two weeks.', 'Consulting', 'Builder', ['Europe & Africa']],
]

export const partners = P.map(([name, url, text, service, tier, regions], i) => ({
  id: i + 1,
  name,
  url,
  text,
  service,
  tier,
  regions,
  logo: { ...A.logos[i], alt: name },
  badge: A.badges[tier],
}))

export default {
  '/partner-directory': {
    sections: [
      {
        type: 'dirHeader',
        title: 'Work with a vetted Lattice partner on your data project',
        body: 'Browse consultancies that help teams design, build and run Lattice.',
      },
      {
        type: 'directory',
        filtersTitle: 'Filters',
        clearAll: 'Clear all',
        apply: 'Apply filters',
        toggleFilters: 'Show filters',
        groups: [
          { key: 'service', title: 'Service type', options: ['Consulting', 'Training'] },
          { key: 'tier', title: 'Tier', options: ['Pioneer', 'Builder'] },
          { key: 'regions', title: 'Regions', options: ['Americas', 'Asia Pacific', 'Europe & Africa'] },
        ],
        search: 'Search by keyword, partner name, service type, tier, region or the industries served',
        clearSearch: 'Clear search',
        prev: 'Previous',
        next: 'Next',
        empty: 'No partners match these filters yet. Try removing one.',
        partners,
      },
    ],
  },
}
