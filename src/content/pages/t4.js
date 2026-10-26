// T4 industry pages (specs/T1-T4.md "T4"), keyed by route path. Same section sequence on all five
// pages; counts differ (slider slides, story cards). Customers are the fictional marquee names.
// Original placeholder copy for "Lattice"; body copy runs ~15% longer than the spec's character
// counts because the Outfit substitute sets narrower than the original face (line counts match).
import { customers, heroes, icons, resources as resImgs, tabsDark } from '../../pageAssets'
import { communityLinks, communityT4, cta, statsT4 } from './shared'

const quote = (logo, q, person, role, link, path) => ({ type: 'quote', logo, quote: q, person, role, cta: cta(link, path) })
const metric = (logo, m, line, link, path) => ({ type: 'metric', logo, metric: m, line, cta: cta(link, path) })
const story = (i, title, path) => ({ image: resImgs[i], title, to: path })

function page(p) {
  return {
    sections: [
      {
        type: 'heroCenter',
        stroke: 'S4',
        gradient: 'gradient-01',
        square: true,
        idleStroke: true,
        title: p.heroTitle, // 40, 2 lines
        lead: p.heroLead, // 125, 2 lines
        primary: cta(p.heroCta, '/contact'), // 37
        media: heroes[p.hero],
      },
      {
        type: 'feat',
        variant: 'D',
        pt0: true,
        eyebrow: p.useEyebrow, // 26
        title: p.useTitle, // 38
        body: p.useBody, // 233, 2 lines
        cards: p.useCards.map(([icon, title, body]) => ({ icon: icons[icon], title, body })),
      },
      { type: 'quoteBand', quotes: [p.quote] },
      {
        type: 'feat',
        variant: 'A',
        pt0: true,
        center: true,
        title: p.unlockTitle, // 28
        body: p.unlockBody, // 114, 1 line
        cards: p.unlockCards.map(([icon, title, body]) => ({ icon: icons[icon], title, body })),
      },
      {
        type: 'tabsDark',
        gradient: 'gradient-12',
        title: p.tabsTitle, // 52-65, 3-4 lines
        body: p.tabsBody,
        tabs: p.tabs.map(([title, body, m]) => ({ title, body, media: tabsDark[m] })),
      },
      { type: 'testiSlider', title: p.sliderTitle, body: p.sliderBody, cta: p.sliderCta, cards: p.slides },
      { type: 'resources', title: p.storiesTitle, body: p.storiesBody, cards: p.stories },
      { type: 'stats', ...statsT4 },
      { type: 'ctaLong', content: communityT4, ...communityLinks },
    ],
  }
}

export default {
  // ------------------------------------------------------------------ representative page
  '/industry/financial-services': page({
    hero: 'financialServices',
    heroTitle: 'Numbers auditors can trace end to end.',
    heroLead:
      'Banks, insurers and fintechs answer to examiners for every figure. Lattice records how each number was built, tested and approved, one click away.',
    heroCta: 'Book a session with our finance data team',
    useEyebrow: 'Built for banking and insurance',
    useTitle: 'Where finance teams use Lattice',
    useBody:
      'From quarterly filings to fraud models, firms that move money need numbers that are right the first time and explainable years later. Here is where banks, insurers and payment firms use Lattice to keep reports accurate and products shipping.',
    useCards: [
      ['clipboard', 'Examination-ready reporting pipelines', 'Every change to a capital, liquidity or risk model is a reviewed pull request with a named approver and a timestamp. When an examiner asks how a figure came to be, you simply share the lineage graph and the commit log.'],
      ['dollar', 'One ledger, one answer', 'Finance, risk and treasury stop reconciling three versions of net interest margin. Shared metric logic lives in one tested project, so the close is quicker, variance meetings are shorter and restatements rare.'],
      ['shield', 'Lock down account and payment records', 'Mask card numbers and personal details by role, encrypt data in transit and at rest, and log each query against sensitive tables. Analysts get what their job requires and nothing more, which keeps auditors calm.'],
      ['chart', 'Keep up with trading-day volumes', 'Tick data, card swipes and claims arrive by the billion. Incremental models process only new records, parallel runs finish before markets open, and separate projects let each line of business scale its own pipelines.'],
    ],
    quote: {
      logo: customers.halcyon,
      quote: 'Our last exam closed without a single finding. Examiners saw lineage and approvals behind every number and finished early.',
      person: 'Grace Okafor',
      role: 'Chief Data Officer',
    },
    unlockTitle: 'Opening up new data use cases',
    unlockBody: 'Once reporting is under control, the same trusted models can power growth work in lending, risk and customer service.',
    unlockCards: [
      ['rocket', 'Faster product launches', 'Stand up the data behind a new card, loan or savings product in weeks by reusing tested customer and account models already in production.'],
      ['user', 'Every account holder in one profile', 'Link checking, mortgage, card and investment records into one household view, so pricing, credit limits and retention offers reflect the full relationship with each customer and adjust automatically as their circumstances shift.'],
      ['sparkle', 'Models your risk team can sign off', 'Feed credit scoring and fraud detection with documented, versioned training data, so model risk teams can approve faster and explain every input.'],
    ],
    tabsTitle: 'Move at fintech speed while keeping every control a modern bank requires', // 4 lines at 1440, 5 at 1280 (original 65ch)
    tabsBody:
      'Lattice gives finance data teams one reviewed workflow for every model, so controls hold up in audits, policies apply the same way everywhere and more people across the bank can use data safely.',
    tabs: [
      ['Reviewed SQL models with a sign-off on every change', 'Each model is plain SQL kept in Git, so every edit has a diff, a reviewer and a rollback path. Docs are generated as you build and tests run on every merge, letting teams ship every week and still satisfy model risk and audit.', 4],
      ['Trace every figure back to its source', 'Click any number in a regulatory return and walk upstream through each join and filter to the raw feed, next to the commits, reviews and approvals that shaped it.', 4],
      ['Separation of duties, enforced by design', 'Developers build against masked copies in their own environments, production runs under service accounts, and SSO plus role policies decide who sees raw account data.', 8],
      ['Compliance and finance sign off on a single shared change', 'Controllers and compliance officers read plain-language docs, comment on edits and approve them where engineers work, so sign-off is never an email chain.', 2],
      ['Grow lines of business safely', 'Retail, commercial and wealth units each own a project and share core models through versioned contracts, so one team’s edit never breaks another.', 6],
    ],
    sliderTitle: 'Finance teams shipping with Lattice',
    sliderBody: 'Halcyon, Meridian Partners and others run regulated reporting on Lattice. Here is what changed for their close, audits and compute bills.',
    slides: [
      // original order: short quote, metric, metric, long quote
      quote(customers.meridian, 'One tested exposure figure sits behind every desk, and the semantic layer paid for itself.', 'Tomas Ekberg', 'Director, Data Platforms', 'How Meridian did it', '/case-studies/meridian-partners'),
      metric(customers.halcyon, '10', 'conflicting upstream feeds caught by tests each month, long before a report could go out wrong', 'How Halcyon did it', '/case-studies/halcyon'),
      metric(customers.orbitly, '62%', 'cut in compute costs once risk runs skip unchanged models', 'How Orbitly did it', '/case-studies'),
      quote(customers.kestrel, 'Every regulatory return is now built from reviewed models with lineage attached. Month-end close went from three tense weeks to four ordinary days for our team.', 'Priya Raman', 'Head of Analytics Engineering', 'How Kestrel did it', '/case-studies/kestrel'),
    ],
    storiesTitle: 'Stories from regulated finance data teams',
    storiesBody:
      'Read how Meridian Partners and Halcyon rebuilt their reporting stacks, passed audits with less effort and gave customers faster, more accurate answers.',
    stories: [
      story(2, 'Meridian Partners cut reporting costs and now answers examiner questions in hours, not weeks', '/case-studies/meridian-partners'),
      story(5, 'Halcyon stops bad upstream data at ingestion, keeping every filing accurate since launch day', '/case-studies/halcyon'),
    ],
  }),

  // ------------------------------------------------------------------ members
  '/industry/healthcare': page({
    hero: 'healthcare',
    heroTitle: 'Better data for better patient outcomes.',
    heroLead:
      'Healthcare data is sensitive, fragmented and critical to care. Lattice helps you unify, govern and trust it, from the clinic floor to the boardroom and every report between.',
    heroCta: 'Book a call with our healthcare data team',
    useTitle: 'Where care and life sciences teams use Lattice', // 2 lines
    useBody:
      'Hospitals, health plans and drug developers juggle records from dozens of systems that rarely agree. Here is how Lattice gives their data teams one governed place to reconcile those records, guard patient privacy and get sound, explainable numbers to clinicians, researchers and executives every single day.',
    useCards: [
      ['heart', 'Clinical and operational reporting', 'Bring clinical, staffing and financial data together in one tested project, so bed counts, wait times and costs agree in every meeting and every report that leadership relies on to plan care. Owners and tests sit next to each model, so a broken feed is caught before the morning huddle.'],
      ['lock', 'Protect patient privacy at every step', 'Apply role-based access, masking and audit trails to sensitive patient data, so analysts see only what they need and every query can be accounted for when compliance teams ask. Policies live in code and are reviewed like any other change, so nothing slips through on a busy day.'],
      ['flask', 'Research-ready datasets you can rerun', 'Build reproducible, documented datasets for research and quality programs, with lineage that shows exactly how every cohort was defined and which source systems contributed. Researchers can rerun a study months later and get the same answer from the same reviewed logic.'],
      ['clock', 'Faster time to insight for every team', 'Replace manual extracts with scheduled, tested pipelines, so operational dashboards refresh reliably and teams spend their time improving care rather than reconciling spreadsheets. Freshness checks warn owners when a source is late, long before a clinician opens a stale report in the morning.'],
    ],
    quote: {
      logo: customers.basalt,
      quote: 'Clinical and finance teams finally read the same numbers, our monthly reporting is ready days earlier than it used to be, and nobody spends the first half of a leadership meeting arguing about which bed count is the right one.',
      person: 'Dr. Mei Lin',
      role: 'Director, Clinical Informatics',
    },
    unlockTitle: 'Opening up new data use cases',
    unlockBody: 'Beyond reporting, Lattice helps healthcare organizations use data to improve patient flow, outcomes and efficiency.',
    unlockCards: [
      ['gauge', 'Capacity planning', 'Forecast demand for beds, staff and equipment from trusted, timely data, so hospitals can plan ahead instead of reacting.'],
      ['team', 'Population health insights', 'Combine clinical, claims and social data to understand patient populations and target care programs where they will make the greatest difference.'],
      ['sparkle', 'AI with guardrails', 'Give clinical AI tools governed, documented data so their outputs can be traced, explained and trusted by the clinicians, nurses and analysts who rely on them every day.'],
    ],
    tabsTitle: 'Improve care and operations with data every team can trust',
    tabsBody:
      'Lattice brings governance, quality and speed to healthcare data, helping teams protect privacy while getting answers to the people who need them sooner.',
    tabs: [
      ['Governed transformation for sensitive data', 'Transform clinical and operational data with version control, peer review and automated tests, while access controls and masking keep protected information safe at every step of the pipeline. Every change is reviewed and every measure carries its lineage, so quality teams can answer questions in minutes.', 4],
      ['Lineage for every measure you report', 'Show regulators and quality teams exactly how each measure was calculated, from source system to final report.', 4],
      ['Patient privacy built in from the start', 'Role-based access, masking and audit trails make sure only the right people see sensitive patient data.', 8],
      ['Shared definitions across clinical, finance and care teams', 'Clinical, finance and operations teams use the same tested definitions for every key measure.', 2],
      ['Scale across hospitals and regions', 'Grow from one facility to a whole network with projects, contracts and owners for every domain.', 6],
    ],
    sliderTitle: 'Powering the future of healthcare data',
    sliderBody: 'See how leaders like Basalt Health and Tidepool use Lattice to bring clarity to complex healthcare data, protect patient privacy and make faster, better-informed decisions across clinical, operational and financial teams.',
    sliderCta: cta('See customer stories', '/case-studies'), // button under the paragraph on member pages
    slides: [
      // slide types in the original's order
      quote(customers.basalt, 'One governed model now feeds both clinical and finance reporting, with tests on every load, so leadership meetings are about patient flow rather than whose numbers are right. Analysts improve models instead of reconciling extracts.', 'Dr. Mei Lin', 'Director, Clinical Informatics', 'Read Basalt Health’s story', '/case-studies/basalt-health'),
      quote(customers.fernway, 'New analysts contribute in their first week, because every model is documented, tested and reviewed.', 'Jordan Ellis', 'Data Team Lead', 'Read Fernway’s story', '/case-studies'),
      metric(customers.tidepool, '24', 'hospitals reporting bed capacity from one tested model', 'Read Tidepool’s story', '/case-studies'),
    ],
    storiesTitle: 'How leading care teams use Lattice to improve care and reporting',
    storiesBody:
      'Explore how Basalt Health and Tidepool use Lattice to unify reporting, protect patient data and give care teams the answers they need sooner.',
    stories: [
      story(1, 'Basalt Health unified clinical and operational reporting across twenty-four hospitals on one governed model', '/case-studies/basalt-health'),
      story(6, 'Learn how Tidepool replaced manual extracts with tested pipelines that refresh before morning rounds', '/case-studies'),
    ],
  }),

  '/industry/manufacturing': page({
    hero: 'manufacturing',
    heroTitle: 'Turn plant data into better decisions.',
    heroLead:
      'Sensors, suppliers and systems all produce data at different speeds. Lattice brings it together into tested models, so planners and operators work from the same trusted numbers.',
    heroCta: 'Book a call with our manufacturing team',
    useTitle: 'Where plant data teams use Lattice',
    useBody:
      'Manufacturers depend on accurate, timely data to keep lines running and supply chains moving. These are the ways Lattice helps operations, quality and planning teams turn scattered plant, supplier and sensor data into decisions they can act on with confidence, on every shift and at every site.',
    useCards: [
      ['factory', 'Production and yield reporting', 'Combine machine, shift and quality data into tested models that show yield, scrap and throughput for every line, so plant managers spot problems early and act before they become expensive. Each metric has an owner and a definition, so every plant reports it in exactly the same way, every week.'],
      ['gauge', 'Predictive maintenance you can trust', 'Build reliable feature tables from sensor readings and maintenance logs, giving data scientists trusted inputs for models that predict failures before they stop a production line. Tests flag drifting sensors early, so a faulty reading never quietly skews the forecast.'],
      ['globe', 'Supply chain visibility across plants', 'Bring supplier, stock and freight records into one governed project, so planners can quickly spot late parts and shortages across every plant and region side by side, and act before a missing part stops a line.'],
      ['badge', 'Quality and traceability for every lot', 'Trace every batch and component back through each process step with lineage and tests, making recalls faster and audits far less painful for every team involved. When a customer asks about a lot, quality teams answer in minutes instead of weeks.'],
    ],
    quote: {
      logo: customers.ferrocene,
      quote: 'Planners now open a forecast they can trace back to the source rows, our planning cycle starts on time every month, and the plants finally compare their numbers with confidence instead of arguing over spreadsheets.',
      person: 'Lukas Brenner',
      role: 'Manager, Operations Analytics',
    },
    unlockTitle: 'Opening up new data use cases',
    unlockCards: [
      ['bolt', 'Energy and waste reduction', 'Track energy use and waste per line and per product, and target improvements where they will save the most money.'],
      ['chart', 'Demand-driven planning across every plant', 'Connect sales, inventory and production data so planning reflects real demand rather than last year’s spreadsheet and gut feeling.'],
      ['sparkle', 'AI assistants on the factory floor, safely', 'Give operators AI assistants grounded in governed production data, so their suggestions are explainable and safe to act on.'],
    ],
    tabsTitle: 'Run smarter, safer plants with data every team can trust',
    tabsBody:
      'Lattice brings structure and quality to manufacturing data, connecting plants, suppliers and systems into one reliable foundation for every decision. Operations, quality and planning teams share tested models, so the numbers on the shop floor match the numbers in the boardroom.',
    tabs: [
      ['Tested pipelines from every sensor to every plant dashboard', 'Transform high-volume sensor and machine data with version control, peer review and automated tests, so every model behind a yield report or a maintenance forecast has been checked before anyone acts on it, and every change carries a clear owner.', 6],
      ['Lineage for every batch and supplier', 'Trace a product back through every process step and supplier to the data it came from.', 4],
      ['Governed access across every plant', 'Control who sees which plant and supplier data, with audit trails for every query.', 8],
      ['Shared definitions for yield, uptime and scrap in every plant', 'Agree on yield, uptime and scrap definitions once, and use them in every plant.', 2],
      ['Scale from one plant to many', 'Add plants and regions as projects with owners and contracts, without losing consistency.', 1],
    ],
    sliderTitle: 'Powering the future of plant data',
    sliderBody: 'See how manufacturers like Ferrocene use Lattice to connect plants and suppliers, cut preparation time and plan production with numbers that every planner and plant manager trusts.',
    sliderCta: cta('See customer stories', '/case-studies'), // button under the paragraph on member pages
    slides: [
      // slide types in the original's order
      metric(customers.kestrel, '9', 'plants on one tested forecast', 'How Kestrel did it', '/case-studies/kestrel'),
      quote(customers.ferrocene, 'Every join is tested now, every source is checked for freshness, and planners trust the forecast enough to act on it the same day instead of rebuilding it by hand first.', 'Lukas Brenner', 'Manager, Operations Analytics', 'Read Ferrocene’s story', '/case-studies'),
    ],
    storiesTitle: 'How top manufacturers use Lattice to connect plants, suppliers and planning',
    storiesBody:
      'Explore how manufacturers use Lattice to unify plant data, improve traceability and plan production with more confidence. Each story covers the starting point, the first models the team built and what changed for planners and plant managers.',
    stories: [
      story(3, 'Ferrocene brought nine plants into one forecasting model with tests on every join and every load', '/case-studies'),
      story(8, 'How Kestrel cut nightly build times in half while adding new plant data sources each quarter', '/case-studies/kestrel'),
      story(10, 'Learn how a supplier network gained end-to-end traceability for every component it ships', '/resources/on-demand'),
    ],
  }),

  '/industry/energy-utilities': page({
    hero: 'energyUtilities',
    heroTitle: 'Power reliable decisions with trusted data.',
    heroLead:
      'Grid, meter and asset data arrive at enormous volume and speed. Lattice helps utilities transform, govern and trust it, from the substation to the regulator and the customer bill.',
    heroCta: 'Book a call with our energy data team',
    useTitle: 'Where energy and utility teams use Lattice',
    useBody:
      'Utilities and energy companies face rising demand, ageing assets and strict oversight all at once. These are the ways Lattice helps them turn high-volume operational data into reliable reporting, better planning and faster responses to change, from the control room to the regulator and the customer.',
    useCards: [
      ['bolt', 'Load and outage reporting on time', 'Turn meter and grid events into tested models for load, outages and reliability metrics, so operations and regulatory reports always agree and are ready on time every reporting period. Owners are alerted the moment a feed is late, long before anyone downstream relies on it.'],
      ['gauge', 'Asset performance and planning', 'Combine sensor, maintenance and inspection data into a trusted view of every asset, helping teams plan replacements and repairs before failures disrupt service to customers. Lineage shows how each health score was built, so engineers can challenge it with confidence.'],
      ['clipboard', 'Regulatory reporting without the scramble', 'Produce regulator-ready figures from versioned, reviewed models with full lineage, so every submitted number can be explained and reproduced on request at any time. Reviews happen in pull requests, leaving a clear record of who approved what and when.'],
      ['globe', 'Renewables integration at grid scale', 'Model generation forecasts and grid balancing data in one governed project, so planners can integrate renewable sources without losing sight of reliability. Tests on weather and output feeds catch gaps early, before they distort the forecast the control room uses.'],
    ],
    quote: {
      logo: customers.meridian,
      quote: 'Our regulatory submissions come straight from reviewed models now, every figure can be reproduced in minutes when asked, and the team spends its time improving forecasts instead of rebuilding last quarter’s numbers.',
      person: 'Tomas Ekberg',
      role: 'Director of Data Platforms',
    },
    unlockTitle: 'Opening up new data use cases',
    unlockBody: 'Beyond compliance, Lattice helps utilities use data to plan the grid, serve customers and cut operating costs.',
    unlockCards: [
      ['chart', 'Demand forecasting', 'Build reliable forecasts from trusted historical load, weather and customer data, refreshed on schedule and tested on every run, so planners always work from the latest numbers and can explain each assumption.'],
      ['user', 'Customer insights', 'Understand usage patterns and payment behavior across customer segments to design fairer tariffs and better support programs.'],
      ['sparkle', 'AI for grid operations', 'Ground AI tools in governed operational data, so recommendations for dispatch and maintenance can be traced, explained and trusted by the crews who act on them.'],
    ],
    tabsTitle: 'Keep the lights on with data your whole team can trust',
    tabsBody:
      'Lattice brings quality, governance and speed to energy data, giving operations, planning and regulatory teams one trusted foundation to work from.',
    tabs: [
      ['Tested pipelines for high-volume meter and grid data', 'Transform meter reads and grid events with version control and automated tests, so load, outage and reliability figures are checked before they ever reach operators, planners, finance teams or regulators.', 6],
      ['Lineage for every figure you submit', 'Show exactly how every submitted figure was produced, from source system to final report.', 4],
      ['Secure access to grid and asset data', 'Grid and asset records are restricted by role, and every read and write is fully logged.', 8],
      ['Shared definitions across operations, finance and regulatory teams', 'Operations, finance and regulatory teams use the same tested definitions for every metric.', 7],
      ['Scale with growing data volumes', 'Handle more meters, sensors and sources without slowing down builds or losing control.', 1],
    ],
    sliderTitle: 'Powering the future of energy data',
    sliderBody: 'See how utilities like Meridian Partners and Orbitly use Lattice to bring order to high-volume data and report with confidence.',
    sliderCta: cta('See customer stories', '/case-studies'), // button under the paragraph on member pages
    slides: [
      // slide types in the original's order
      metric(customers.orbitly, '62%', 'lower compute spend on nightly load and outage models', 'Read Orbitly’s story', '/case-studies'),
      quote(customers.meridian, 'Every regulatory figure we submit can now be traced back to its source rows and reproduced in minutes, which has changed how our reviews with the regulator go. Questions that took a week of digging are answered in the meeting, with lineage on screen.', 'Tomas Ekberg', 'Director of Data Platforms', 'How Meridian did it', '/case-studies/meridian-partners'),
      quote(customers.halcyon, 'Auditors asked where each number came from, and for the first time we could simply show them the lineage, the tests and the review history behind every single figure in the filing, without pulling anyone off their regular work for a week.', 'Grace Okafor', 'Chief Data Officer', 'How Halcyon did it', '/case-studies/halcyon'),
    ],
    storiesTitle: 'How leading utilities use Lattice to modernize reporting',
    storiesBody:
      'Explore how utilities use Lattice to modernize reporting, improve reliability and meet regulatory demands with less effort. Each story covers where the team started, the first models it rebuilt and what changed for operators and regulators alike.',
    stories: [
      story(4, 'Meridian Partners rebuilt regulatory reporting on reviewed models with full lineage for every figure', '/case-studies/meridian-partners'),
      story(9, 'How Orbitly cut compute spend on high-volume meter data while adding new sources each month', '/case-studies'),
      story(11, 'Learn how Halcyon passed its latest audit with lineage on every regulated figure it reports', '/case-studies/halcyon'),
    ],
  }),

  '/industry/telecommunications': page({
    hero: 'telecommunications',
    heroTitle: 'Connect every network signal to insight.',
    heroLead:
      'Call records, network events and customer data never stop flowing. Lattice turns them into tested, governed models, so every team can act on the same numbers in time.',
    heroCta: 'Book a call with our telecom data team',
    useTitle: 'Where telecom data teams put Lattice',
    useBody:
      'Telecom operators run some of the largest and fastest data pipelines anywhere. These are the ways Lattice helps network, product and customer teams turn that data into reliable insight while keeping costs and complexity under control, even as event volumes keep doubling year after year.',
    useCards: [
      ['signal', 'Network performance and capacity', 'Transform network events into tested models for coverage, capacity and quality, so engineering teams see problems early and can prioritize upgrades where customers feel them most. Every metric has an owner and a definition, so regional teams compare like with like when they plan their spend.'],
      ['user', 'Churn prediction and retention', 'Combine usage, billing and support data into trusted customer models that help teams spot churn risk early and target retention offers where they will actually make a difference. Tests on each source keep a late billing feed from quietly skewing the risk scores that marketing acts on every week.'],
      ['dollar', 'Revenue assurance and billing', 'Reconcile usage, rating and billing data with automated tests, catching leakage and errors before they reach invoices, financial reports or regulatory filings, and giving finance a clear trail for every adjustment.'],
      ['lock', 'Subscriber privacy and compliance', 'Mask subscriber details by role, log every query against them, and give regulators a clear record of where personal information flows between systems. Access policies are written in code and reviewed like any other change, so a rushed edit never exposes data.'],
    ],
    quote: {
      logo: customers.orbitly,
      quote: 'We now serve twice as many teams from the same project, and our compute bill actually went down while we did it.',
      person: 'Jonah Reyes',
      role: 'VP, Data and Insights',
    },
    unlockTitle: 'Opening up new data use cases',
    unlockCards: [
      ['rocket', 'Faster product launches', 'Give product teams trusted usage and revenue data, so new plans and bundles can be launched and measured quickly.'],
      ['target', 'Personalized offers', 'Unify customer data across channels to power relevant offers, better support and fewer surprises on the monthly bill.'],
      ['sparkle', 'AI for customer care', 'Ground support assistants in governed customer and network data, so their answers are accurate and safe to share.'],
    ],
    tabsTitle: 'Run a faster, smarter network on data that every engineering and product team can trust',
    tabsBody:
      'Lattice brings structure, quality and governance to telecom data at massive scale, giving every team one reliable foundation to build on. Network, product and customer teams share tested models with clear owners, so one change never quietly breaks another report.',
    tabs: [
      ['Tested pipelines for every network event, at any scale', 'Transform billions of network and usage events with version control, peer review and automated tests, so every model that feeds a capacity plan, a churn score or a regulatory report has been checked before anyone relies on it. Lineage shows how each figure was built, and owners hear about failures before customers notice a thing.', 6],
      ['Lineage for every churn metric', 'Trace churn, revenue and quality metrics back to the events and systems they came from.', 4],
      ['Subscriber privacy by design', 'Mask and restrict sensitive subscriber data while keeping it useful for analytics.', 8],
      ['Shared definitions across network, product and finance teams', 'Network, product and finance teams agree on one definition of every key metric.', 7],
      ['Scale across markets', 'Add new markets and brands as projects with clear owners and contracts.', 1],
    ],
    sliderTitle: 'Powering the future of telecom data',
    sliderBody: 'See how operators like Orbitly and Tidepool use Lattice to handle network and subscriber data at scale, cut compute costs, launch new plans faster and give every team, from network operations to marketing, answers they trust.',
    sliderCta: cta('See customer stories', '/case-studies'), // button under the paragraph on member pages
    slides: [
      quote(customers.orbitly, 'Reusing results for unchanged models brought our compute spend down in the very first month, and the same project now serves twice as many teams across the business. Network, product and finance analysts all build on the same tested models, and nobody waits for an overnight rebuild to trust what they see.', 'Jonah Reyes', 'VP, Data and Insights', 'Read Orbitly’s story', '/case-studies'),
      metric(customers.tidepool, '70%', 'fewer ad hoc data requests reaching the central data team each month', 'Read Tidepool’s story', '/case-studies'),
    ],
    storiesTitle: 'How leading operators use Lattice to run data at network scale',
    storiesBody:
      'Explore how telecom operators use Lattice to manage data at scale, protect subscribers and launch new products faster. Each story covers the starting point, the first models rebuilt and what changed for network and product teams.',
    stories: [
      story(0, 'Orbitly doubled the teams served from one project while cutting its warehouse bill', '/case-studies'),
      story(7, 'How Tidepool gave product teams self-serve data they trust, with far fewer tickets', '/case-studies'),
      story(5, 'Learn how one operator reconciled usage and billing data with automated tests on every run', '/resources/on-demand'),
    ],
  }),
}
