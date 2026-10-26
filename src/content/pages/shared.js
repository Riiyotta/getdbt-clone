// Shared content pools for the T1-T4 templates (original placeholder copy for "Lattice").
// Lengths follow specs/T1-T4.md; targets are noted per field.
import { cards as cardImgs, customers, platforms, resources as resImgs, stats as statImgs, tabsDark } from '../../pageAssets'

export const to = {
  contact: { to: '/contact' },
  signup: { to: '/signup' },
}
export const cta = (label, path) => ({ label, to: path })

// ---------------------------------------------------------------- customer stories (N-cust-tabs)
// headline 48ch (2 lines) .. 79ch; quote ~233ch; name 12-14ch; role 21-36ch; stat number 1-5ch,
// stat label 40-92ch (kept to 2 lines except kestrel / fernway, whose originals run 3); button 19ch
const story = (o) => ({ cta: cta('Read customer story', o.path), ...o })
export const stories = {
  kestrel: story({
    name: 'Kestrel',
    logo: customers.kestrel,
    path: '/case-studies/kestrel',
    headline: 'Kestrel halves nightly build time with Lattice',
    quote:
      'Our nightly load used to finish after the morning stand-up, so nobody trusted the first dashboards of the day. With state-aware builds only the models that changed are rebuilt, and every number is ready before anyone on the team logs on.',
    person: 'Priya Raman',
    role: 'Head of Analytics Engineering',
    stats: [
      { number: '52.4%', label: 'shorter nightly runs after moving more than 400 production models to state-aware builds' },
      { number: '3.2x', label: 'more models shipped every sprint once review, testing and documentation lived in one place' },
    ],
  }),
  meridian: story({
    name: 'Meridian Partners',
    logo: customers.meridian,
    path: '/case-studies/meridian-partners',
    headline: 'Meridian Partners standardizes reporting across eleven regional desks',
    quote:
      'Every desk had its own version of assets under management, and reconciling them took a week each quarter. Now one tested definition feeds all eleven desks, and the quarterly close is now a short review meeting instead of a week-long firefight.',
    person: 'Tomas Ekberg',
    role: 'Director of Data Platforms',
    stats: [
      { number: '11', label: 'regional desks reporting from one governed project' },
      { number: '4d', label: 'saved on every quarterly close, with no manual reconciling' },
    ],
  }),
  tidepool: story({
    name: 'Tidepool',
    logo: customers.tidepool,
    path: '/case-studies',
    headline: 'Tidepool gives product teams self-serve data they can trust',
    quote:
      'Product managers wanted answers in hours, not tickets in a queue. Lattice gave them documented, tested models to build on, and our small data team finally spends its time on genuinely new questions instead of re-running old ones each week.',
    person: 'Ana Kowalski',
    role: 'Staff Data Engineer',
    stats: [
      { number: '70%', label: 'fewer ad hoc requests reaching the central data team' },
      { number: '140', label: 'product dashboards rebuilt on certified, documented models' },
    ],
  }),
  ferrocene: story({
    name: 'Ferrocene',
    logo: customers.ferrocene,
    path: '/case-studies',
    headline: 'Ferrocene brings plant and supply data into one tested project',
    quote:
      'We were stitching sensor exports and supplier files together by hand before every planning cycle. Now the pipeline is versioned, every join is tested, and planners open a forecast they can trace all the way back to the original source rows.',
    person: 'Lukas Brenner',
    role: 'Manager, Operations Analytics',
    stats: [
      { number: '9', label: 'plants feeding a single, versioned and tested forecast' },
      { number: '35%', label: 'less time preparing data before each planning cycle' },
    ],
  }),
  orbitly: story({
    name: 'Orbitly',
    logo: customers.orbitly,
    path: '/case-studies',
    headline: 'Orbitly cuts warehouse spend while shipping more models',
    quote:
      'Our compute bill grew faster than the team. Reusing results for models whose inputs had not changed brought spend down in the first month, and the same project now serves twice as many teams across the company without a single new hire.',
    person: 'Jonah Reyes',
    role: 'VP, Data and Insights',
    stats: [
      { number: '62%', label: 'lower warehouse spend after moving to state-aware builds' },
      { number: '2x', label: 'as many teams served from one project, with no new hires' },
    ],
  }),
  halcyon: story({
    name: 'Halcyon',
    logo: customers.halcyon,
    path: '/case-studies/halcyon',
    headline: 'Halcyon passes its audit with lineage on every regulated figure',
    quote:
      'Auditors asked where each reported figure came from, and for the first time we could simply show them. Every model is versioned and tested, every change is reviewed, and lineage traces each number all the way back to the exact source rows it came from.',
    person: 'Grace Okafor',
    role: 'Chief Data Officer',
    stats: [
      { number: '0', label: 'audit findings on lineage or change control in the last review' },
      { number: '100%', label: 'of regulated reports built on reviewed, tested models' },
    ],
  }),
  basalt: story({
    name: 'Basalt Health',
    logo: customers.basalt,
    path: '/case-studies/basalt-health',
    headline: 'Basalt Health unifies clinical and operational reporting',
    quote:
      'Clinical and finance teams were reading different bed counts in the same meeting. One governed model now feeds both, with tests on every load, so the conversation is about patient flow rather than about whose numbers are right this time around.',
    person: 'Dr. Mei Lin',
    role: 'Director, Clinical Informatics',
    stats: [
      { number: '24', label: 'hospitals reporting capacity from one tested model' },
      { number: '45%', label: 'faster monthly reporting for clinical and finance teams' },
    ],
  }),
  fernway: story({
    name: 'Fernway',
    logo: customers.fernway,
    path: '/case-studies',
    headline: 'Fernway moves from scripts to a governed, tested project',
    quote:
      'We had years of scheduled scripts that only their authors understood. Rebuilding them as Lattice models gave us documentation, tests and reviews for free, and new analysts now contribute in their very first week instead of their third month.',
    person: 'Jordan Ellis',
    role: 'Data Team Lead',
    stats: [
      { number: '1 wk', label: 'for a new analyst to ship a first reviewed, tested model into the production project' },
      { number: '600', label: 'legacy scripts retired and rebuilt as documented, tested models with clear owners' },
    ],
  }),
}
export const pickStories = (...keys) => keys.map((k) => stories[k])
// adds the optional summary paragraph shown under the headline on some originals
export const editStory = (section, key, edits) => ({
  ...section,
  stories: section.stories.map((s) => (s === stories[key] ? { ...s, ...edits } : s)),
})
export const withSummary = (section, key, summary) => ({
  ...section,
  stories: section.stories.map((s) => (s === stories[key] ? { ...s, summary } : s)),
})

// ---------------------------------------------------------------- resources (N-resources)
// tag 4-13ch, title 23-46ch, body 84-119ch
const res = (i, tag, title, body, path) => ({ image: resImgs[i], tag, title, body, to: path })
export const resourcePool = {
  quickstart: res(0, 'Docs', 'Your first web project', 'Connect a warehouse, write a first staging model and run a first test from the browser.', '/learn'),
  canvas: res(1, 'Docs', 'Build models visually on the canvas', 'Drag sources, joins and aggregations onto a canvas while Lattice writes clean, reviewable SQL for every step.', '/learn'),
  editor: res(2, 'Docs', 'Get started with the desktop editor extension', 'Bring autocomplete, inline previews and lineage hovers into the desktop editor your engineers already know and use every day.', '/learn'),
  lifecycle: res(3, 'Guide', 'The modeling lifecycle, step by step', 'A practical map of how ideas move from a first query to a production model, with clear owners at every stage.', '/resources/analytics-lifecycle'),
  report: res(4, 'Report', 'State of data teams this year', 'What two hundred data teams told us about headcount, tooling, spend and the work that still slows them down.', '/resources/state-of-data-teams'),
  showcase: res(5, 'Webinar', 'Launch showcase: what is new this season', 'Product leads walk through the latest release, from faster incremental builds to a refreshed lineage explorer.', '/resources/webinars/launch-showcase'),
  controlPlane: res(6, 'Whitepaper', 'Coordinating many teams on one shared data layer', 'Why shared context, ownership and testing matter more as more teams and agents build on the same data.', '/resources/whitepaper-control-plane'),
  charts: res(7, 'Webinar', 'Charts as code, live', 'Keep dashboards right beside the models that power them, so every chart change gets reviewed with its SQL.', '/resources/webinars/charts-as-code'),
  summit: res(8, 'Blog', 'Our Summit launches, all gathered on one page', 'A recap of the launches, live demos and roadmap notes from this year’s user conference, gathered in one place.', '/blog/summit-announcements'),
  blog: res(9, 'Blog', 'How we test our own data platform', 'The checks, alerts and review habits our internal data team relies on to keep company metrics honest every day.', '/blog'),
  onDemand: res(10, 'On demand', 'Modeling patterns that scale', 'Recorded sessions on layering, naming and testing conventions from teams that run thousands of models daily.', '/resources/on-demand'),
  caseStudies: res(11, 'Case study', 'How Kestrel halved its nightly production runs', 'A look at the switch to state-aware builds, the tests the team added first and what it did to the monthly bill.', '/case-studies/kestrel'),
}
export const pickResources = (...keys) => keys.map((k) => resourcePool[k])

// ---------------------------------------------------------------- N-feat C image cards
export const imageCard = (i, title, body, link, path) => ({ image: cardImgs[i % cardImgs.length], title, body, cta: cta(link, path) })

// ---------------------------------------------------------------- N-stats (T2 / quarry and T4 versions)
const platformTiles = ['northwind', 'quarry', 'helixa', 'stratus', 'driftway'].map((k) => ({
  image: platforms[k],
  to: `/data-platforms/${k}`,
}))
export const statsT2 = {
  eyebrow: 'Why teams pick Lattice', // 19-22
  title: 'Relied on daily. Proven in production.', // 34
  cards: [
    {
      eyebrow: 'Proven in production', // 15-18
      title: '60,000+ teams on Lattice', // 13-42
      body: 'Lattice runs dependable analytics workflows for teams of every size, from startups to global firms.', // 90-108
    },
    {
      eyebrow: 'Reviewer approved',
      title: '96% would recommend us',
      body: 'Rated 4.8 out of 5 by thousands of data practitioners who run Lattice in production, every single working day.',
      image: statImgs.badge,
    },
    {
      eyebrow: 'Deep integrations',
      title: 'Runs where your data lives', // no paragraph on the original (tiles follow the heading)
      tiles: platformTiles,
    },
    {
      eyebrow: 'Community powered',
      title: '75K+ community members',
      body: 'Join an open community trading patterns, packages and reviews on how to build better data products.',
    },
  ],
}
export const statsT4 = {
  title: 'Relied on daily. Proven in production.',
  cards: [
    {
      eyebrow: 'Reviewer approved',
      title: '96% of users recommend us',
      body: 'Reviewers give Lattice 4.8 stars on average, citing its reliability for analytics and AI in production.',
      image: statImgs.award,
    },
    {
      eyebrow: 'Secure by default',
      title: 'Enterprise-grade controls built in', // no paragraph on the original
      image: statImgs.seals,
    },
    {
      eyebrow: 'Proven in production',
      title: '60,000+ teams',
      body: 'Teams worldwide rely on Lattice to run billions of model builds with confidence each year.',
    },
    {
      eyebrow: 'Partner recognition',
      title: 'Named partner of the year by two data platforms',
      body: 'Recognized by Cobalt DB and Helixa this year for customer impact and for deep joint engineering work.',
      image: statImgs.certified,
    },
  ],
}

// ---------------------------------------------------------------- H-cta long (community band)
export const communityT2 = {
  eyebrow: 'Lattice community', // 17
  title: 'Join the biggest community building with data', // 2 lines
  body: 'The Lattice community is where practitioners swap patterns, review each other’s projects and help steer the roadmap. Ask questions, share what worked, and learn alongside data leaders and AI builders from around the world.',
  primary: 'Join the community',
  secondary: 'Meet the community',
  stats: [
    { number: '75,000+', label: 'active members' },
    { number: '60,000+', label: 'teams on Lattice' },
    { number: '140+', label: 'local meetups' },
  ],
}
export const communityT4 = { ...communityT2, stats: communityT2.stats.slice(0, 2) }
export const communityLinks = { primaryTo: '/community/join', secondaryTo: '/community' }

// ---------------------------------------------------------------- closing CTA aside (T1, T3)
export const asideCommunity = {
  title: 'Great data people rarely do their best work alone', // 2 lines at every width (orig 41-43ch)
  body: 'The Lattice community connects you with 75,000+ practitioners who share your problems, your shortcuts and your goals.', // 90-122ch
  cta: cta('Join the community', '/community/join'), // 18
}

export { tabsDark }
