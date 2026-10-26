// Original placeholder copy for the fictional company "Lattice".
// Lengths are matched to the character counts in CLONE_SPEC.md (target noted per field).

export const announcements = [
  // 97
  'Lattice 4.0 is here with faster incremental builds, smarter tests, and a fresh lineage explorer.',
  // 56
  'Join our live workshop on modeling patterns this month.',
  // 102
  'New report: how two hundred data teams trimmed warehouse spend while shipping trusted models each week.',
  // 94
  'Lattice Cloud now runs in three new regions across Europe and Asia. Check region availability.',
]

export const navCtas = {
  secondary: 'Get started', // ~11 (label 82px; original button 114px)
  primary: 'Book a demo', // ~11 (label 92px; original button 125px)
}

const productMenu = {
  label: 'Product',
  groupA: {
    label: 'First steps', // 10
    items: [
      { icon: 'code', title: 'Why Lattice', desc: 'How Lattice turns SQL into trusted products' },
      { icon: 'layout', title: 'Platform tour', desc: 'Watch a ten-minute walkthrough of the full workspace' },
    ],
  },
  featured: {
    title: 'The modeling lifecycle',
    desc: 'Map how ideas move from first query to production model, with clear owners and checks at each step',
  },
  groupB: {
    label: 'Everything in the box', // 21
    items: [
      { icon: 'build', title: 'Build', desc: 'Author models in the browser, a desktop editor or the command line' },
      { icon: 'flask', title: 'Validate', desc: 'Assert rules on every model' },
      { icon: 'blocks', title: 'Design', desc: 'Split big projects by domain' },
      { icon: 'book', title: 'Explore', desc: 'Search docs, owners and lineage' },
      { icon: 'ship', title: 'Ship', desc: 'Trigger runs on merge or a timer' },
      { icon: 'layers', title: 'Measure', desc: 'Publish one definition of revenue to every tool that asks' },
    ],
  },
  side: {
    label: 'Feature spotlight', // 17
    links: ['Smart state', 'Guided setup', 'Charts', 'Governance', 'Security', 'Integrations'],
    cta: 'See the latest demo', // ~20
  },
  strip: 'Get a working project on your own warehouse in a 30-minute call.', // ~64
}

const simpleMenu = (label, groupALabel, a, groupBLabel, b, sideLabel, links, cta) => ({
  label,
  groupA: { label: groupALabel, items: a },
  featured: null,
  groupB: { label: groupBLabel, items: b },
  side: { label: sideLabel, links, cta },
  strip: productMenu.strip,
})

export const menus = [
  productMenu,
  simpleMenu(
    'Solutions',
    'By need',
    [
      { icon: 'layers', title: 'Analytics', desc: 'Give analysts a governed place to model data' },
      { icon: 'build', title: 'AI readiness', desc: 'Feed assistants with well-described data' },
    ],
    'By team',
    [
      { icon: 'blocks', title: 'Data engineers', desc: 'Ship pipelines with tests built in' },
      { icon: 'book', title: 'Analysts', desc: 'Own models end to end in plain SQL' },
      { icon: 'flask', title: 'Platform leads', desc: 'Standardize how every team builds' },
      { icon: 'ship', title: 'Executives', desc: 'Trust the numbers behind decisions' },
    ],
    'By industry',
    ['Finance', 'Retail', 'Healthcare', 'Media', 'Public sector', 'Software'],
    'See every use case',
  ),
  simpleMenu(
    'Customers',
    'Stories',
    [
      { icon: 'book', title: 'Case studies', desc: 'Read how teams run on Lattice' },
      { icon: 'layout', title: 'Reviews', desc: 'Independent ratings from practitioners' },
    ],
    'By outcome',
    [
      { icon: 'flask', title: 'Data quality', desc: 'Teams that caught issues earlier' },
      { icon: 'ship', title: 'Speed', desc: 'Teams that shipped models faster' },
      { icon: 'layers', title: 'Cost', desc: 'Teams that trimmed warehouse spend' },
      { icon: 'blocks', title: 'Scale', desc: 'Teams that grew past one project' },
    ],
    'Featured',
    ['Fernway', 'Orbitly', 'Kestrel', 'Tidepool', 'Meridian', 'Halcyon'],
    'View all customers',
  ),
  simpleMenu(
    'Resources',
    'Learn',
    [
      { icon: 'book', title: 'Docs', desc: 'Guides and reference for every feature' },
      { icon: 'code', title: 'Courses', desc: 'Free self-paced training' },
    ],
    'Explore',
    [
      { icon: 'layout', title: 'Blog', desc: 'Notes from the product team' },
      { icon: 'layers', title: 'Webinars', desc: 'Live and recorded sessions' },
      { icon: 'flask', title: 'Reports', desc: 'Research on modern data work' },
      { icon: 'blocks', title: 'Templates', desc: 'Starter projects you can fork' },
    ],
    'Popular',
    ['Getting started', 'Best practices', 'Release notes', 'Glossary', 'Events', 'Status'],
    'Browse all resources',
  ),
  simpleMenu(
    'Community',
    'Connect',
    [
      { icon: 'blocks', title: 'Forum', desc: 'Ask questions and share answers' },
      { icon: 'ship', title: 'Meetups', desc: 'Find a group near you' },
    ],
    'Contribute',
    [
      { icon: 'code', title: 'Open source', desc: 'Help build the core project' },
      { icon: 'book', title: 'Write a guide', desc: 'Share what you have learned' },
      { icon: 'layers', title: 'Speak', desc: 'Present at a community event' },
      { icon: 'flask', title: 'Champions', desc: 'Join the ambassador program' },
    ],
    'Get involved',
    ['Code of conduct', 'Chat space', 'Events', 'Newsletter', 'Awards', 'Jobs board'],
    'Join the community',
  ),
]

export const navPlainLink = 'Pricing'

export const accountLinks = ['Log in', 'Create an account']

export const hero = {
  // ~29 / ~28 chars
  h1: ['Model, test and ship the data', 'every decision depends on'],
  // 171 chars, forced break after ~73
  sub: [
    'Lattice gives every analyst a versioned SQL workspace that checks each edit',
    'against the live warehouse as you type, then rebuilds only what changed, on schedule and on budget.',
  ],
  cta: 'Start building today', // ~20
}




export const news = {
  headline: 'Northwind joins Lattice: one platform from ingestion to insight.', // 57 orig; 61 here to match the 840px line / 3 lines at 375
  link: 'Read the full blog post', // ~17 (button 192px)
}

// 106
export const statement =
  'From the first query to the nightly production run, Lattice keeps every model readable, tested and owned.'

export const panels = [
  {
    gradient: 'gradient-05',
    mediaFirst: false,
    eyebrow: 'Build faster', // 11-13
    title: 'Plain SQL, real software', // 23
    // 274
    body: 'Every model is a SELECT statement in a file, reviewed in pull requests and checked against the live warehouse schema while you type. Lattice flags a misspelled column, a broken join or a missing grain before anything runs, and compiles one project for each supported warehouse engine.',
    cta: 'Start a new free project', // 15-22 (button 194px)
  },
  {
    gradient: 'gradient-02',
    mediaFirst: true,
    eyebrow: 'Trace context',
    title: 'Follow every field from raw source to dashboard', // 47
    // 271
    body: 'Open the graph and see dependencies redraw the moment you edit. Color nodes by owner or project layer to spot who depends on whom. Pick a column and the graph traces its origin, every expression that reshapes it, and the dashboards and teams that would notice if it changed overnight.',
    cta: 'Explore lineage',
  },
  {
    gradient: 'gradient-12',
    mediaFirst: false,
    eyebrow: 'Change safely',
    title: 'Rename once. Every reference follows.', // 41 orig; 37 here = 3 lines at 1280 like the original
    // 245
    body: 'Repositories accumulate clutter: obsolete names, duplicated calculations, mysterious joins. Give any column a replacement name and the editor collects every dependent file, presenting a comparison awaiting approval. Nothing changes unannounced.',
    cta: 'See the refactor guide',
  },
]

export const integrations = {
  eyebrow: 'Connectivity', // 12
  title: "Fits the stack you've got", // 23 orig; 25 here = 502px-ish line (1 line at 520, 2 at 480)
  // 196
  body: 'Lattice runs inside the warehouse you already pay for and hands results to the tools your teams open daily. Hundreds of maintained connectors and open table formats keep each layer swappable.',
  cta: 'Browse integrations', // ~20
  tiles: ['Northwind', 'Quarry', 'Helixa', 'Stratus', 'Driftway', 'Cobalt DB'],
}

export const why = {
  eyebrow: 'Why teams pick Lattice', // 22
  title: 'Fewer surprises in production, more time for the real work.', // 57
  // 170
  body: 'Shared conventions, automated checks and clear ownership turn a pile of scripts into a dependable product, so analysts, engineers and AI agents all draw on the same agreed facts.',
  cards: [
    {
      title: 'Catch broken data before users do', // 30 (2 lines at 1440 like the original)
      // 114-120
      body: 'Tests run alongside every model, and each failure arrives with the precise rows and the upstream change that caused it.',
      cta: 'See how quality works',
    },
    {
      title: 'Lower bills, shorter run times', // 30 (1 line at 1440, 317px like the original)
      body: 'Lattice uncovers idle compute, consolidates duplicated workloads, and sequences each build, so invoices and queues shrink.',
      cta: 'Explore cost controls',
    },
    {
      title: 'Steer your AI with clearly defined data', // 40
      body: 'Descriptions, owners and certified metrics travel with each table, so agents answer from definitions your team owns.',
      cta: 'Learn about AI readiness',
    },
  ],
}

export const cost = {
  eyebrow: 'Cut your costs', // 14
  title: 'Skip untouched models and watch warehouse costs fall', // 51 orig; 55 here = 3 lines at 1280
  // 253
  body: 'Lattice compares each run with the last known good state, skips models whose inputs are untouched, and reuses their results safely. Production jobs finish sooner, warehouse credits go further, and nobody has to hand-tune a selector or a schedule again.',
  cta: 'Book a cost-review session now', // ~30
}

export const ide = {
  title: 'Bring your own editor', // 20
  // 134
  body: 'Autocomplete, inline previews and lineage hovers travel into whichever editor you prefer, from a terminal session to a desktop app or notebook.',
  tiles: [
    { icon: 'terminal', label: 'Terminal' },
    { icon: 'desktop', label: 'Desktop app' },
    { icon: 'web', label: 'Web editor' },
    { icon: 'notebook', label: 'Notebook' },
  ],
}

export const testimonials = {
  eyebrow: 'Customer voices', // 15
  title: 'Data teams worldwide run on Lattice daily.', // 45 orig; 42 here = 2 lines at 375
  // 122
  body: 'From two-person startups to global retailers, teams use Lattice to answer faster and spend less time fixing broken numbers.',
  cta: 'Discover more team stories', // 26
  cards: [
    {
      type: 'quote',
      logoW: 100,
      logoH: 15,
      // 213
      quote:
        '"Before Lattice, every new dashboard meant a week of arguing over which revenue number was right. Now the definitions live in one tested project, and our analysts can ship a brand-new view the same afternoon."',
      name: 'Jordan Ellis', // ~14 incl. comma
      role: 'Data Team Lead', // 14
      cta: 'Read the Fernway story', // 23
    },
    {
      type: 'metric',
      logoW: 100,
      logoH: 30,
      metric: '62% lower', // 10
      line: 'warehouse spend after moving nightly jobs to state-aware builds', // 65
      cta: "Read Orbitly's case study", // 26
    },
  ],
}

export const community = {
  eyebrow: 'Lattice community', // 17
  title: 'Learn from people who build data products every day.', // 58 orig; 55 here = 2 lines at 1280
  // 235
  body: 'Practitioners trade patterns, review each other\'s projects, and steer the roadmap in the open. Drop into the forum, catch a recorded talk, or host a meetup in your own city; whatever you bring, you will leave with ideas you can ship next week.',
  primary: 'Join the community', // 18 (button 189px)
  secondary: 'Explore member events', // 21
  stats: [
    { number: '75,000 +', label: 'Members in the forum' },
    { number: '3,400 +', label: 'Packages shared openly' },
    { number: '140 +', label: 'Local chapters worldwide' },
  ],
}

export const footer = {
  columns: [
    {
      title: 'Platform',
      links: ['Overview', 'What is Lattice?', 'Lattice for AI workflows', 'Customer stories', 'Connectors', 'Plans and pricing'],
    },
    {
      title: 'For Builders',
      links: ['Documentation', 'Quickstart guides', 'Supported data platforms', 'Engineering blog', 'Editor extension'],
    },
    {
      title: 'Company',
      links: ['About us', 'Belonging at Lattice', 'Careers', 'Press'],
      badgeOn: 2,
      badge: 'Join the team',
    },
    { title: 'Learning', links: ['Resource hub', 'Lattice Academy', 'Certification', 'Blog'] },
    { title: 'Community', links: ['Join the community', 'Become a contributor', 'Open source projects', 'Community forum'] },
    { title: 'Help & Support', links: ['Contact us', 'Professional services', 'Find a partner', 'System status'] },
  ],
  newsletter: {
    title: 'Subscribe today!', // 16
    // 88
    body: 'A monthly digest of field notes, release highlights and practical modeling advice.',
    cta: 'Join today', // 8 (button 108px)
  },
  region: { title: 'Select region', options: ['Global', 'Europe', 'Asia Pacific'] },
  social: 'Connect with us', // 15
  copyright: '© 2026 Lattice, Inc. All rights reserved.', // 42
  legal: [
    'Privacy policy',
    'Accessibility statement',
    'Terms of service',
    'Security',
    'Acceptable use',
    'Responsible AI principles',
  ],
  cookie: 'Cookie preferences',
}

// Short UI / accessibility labels
export const ui = {
  back: 'Back',
  search: 'Search',
  account: 'Account',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  prevAnnouncement: 'Previous announcement',
  nextAnnouncement: 'Next announcement',
  home: 'Lattice home',
  logosLabel: 'Customer logos',
  prevSlide: 'Previous slide',
  nextSlide: 'Next slide',
  goToSlide: 'Go to slide',
  socialLabels: ['GitHub', 'LinkedIn', 'YouTube', 'Instagram', 'X', 'Bluesky', 'RSS'],
}
