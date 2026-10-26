// T3 data-platform pages (specs/T1-T4.md "T3"), keyed by route path. The platforms are fictional
// (routes.js); the platform name appears only in the places the spec's "Partner brand placement"
// lists (hero text, headings of N-feat C / CTA card / resources / closing CTA).
// Original placeholder copy for "Lattice"; body copy runs ~15% longer than the spec's character
// counts because the Outfit substitute sets narrower than the original face (line counts match).
import { heroes, misc, splits } from '../../pageAssets'
import { cta, imageCard, pickResources, pickStories, statsT2 } from './shared'

const demo = cta('Book your demo', '/contact')

function page(p) {
  const N = p.name
  const sections = [
    {
      type: 'heroSplit',
      stroke: p.stroke || 'S3',
      gradient: 'gradient-01',
      flush: p.flush ?? true,
      title: p.heroTitle,
      lead: p.heroLead,
      primary: demo,
      secondary: cta(`Start with Lattice + ${N}`, '/signup'),
      media: heroes[p.slug],
    },
    {
      type: 'feat',
      variant: 'C',
      eyebrow: p.featEyebrow, // members show an eyebrow where the representative shows the lockup
      lockup: p.lockup ? { image: misc.poweredBy, to: '/product/lattice' } : undefined,
      title: p.featTitle,
      body: p.featBody,
      primary: p.lockup ? cta('Learn more about the engine', '/product/lattice') : undefined,
      cards: p.cards.map(([title, body, link, path], i) => imageCard(p.cardOffset + i, title, body, link, path)),
    },
    p.middle,
    {
      type: 'ctaCard',
      title: p.ctaTitle || `What Lattice can do on ${N}.`,
      body: p.ctaBody || 'See what changes when every model ships with tests, an owner and lineage from day one.',
      primary: cta('Explore Lattice', '/product/lattice'),
    },
    p.stories && {
      type: 'custTabs',
      title: `Data teams trust Lattice + ${N}`,
      body: `Leading teams use Lattice with ${N} to lower the cost of insight, raise trust in data and ship work faster.`,
      stories: pickStories(...p.stories).map((s, i) => ({ ...s, ...p.storyEdits?.[p.stories[i]] })),
    },
    {
      type: 'resources',
      eyebrow: 'More resources',
      title: `Go further with Lattice + ${N}.`,
      body: p.resourcesBody === false ? undefined : `How Lattice supports AI and analytics on ${N}, from architecture to rollout.`,
      // tag + title only on T3 (helixa keeps the card paragraphs)
      cards: pickResources(...p.resources).map(({ body, ...c }, i) => ({
        ...c,
        title: p.resourceTitles?.[i] || c.title,
        ...(p.resourceBodies ? { body } : {}),
      })),
    },
    p.stats && { type: 'stats', ...statsT2 },
    {
      type: 'ctaBand',
      title: p.closingTitle,
      body: p.closingBody,
      primary: demo,
      secondary: cta('Explore Lattice', '/product/lattice'),
      aside: {
        title: `Join the Lattice + ${N} community.`, // 1 line
        body: `Get tips, patterns and direct advice from practitioners who run Lattice on ${N} every day.`,
        cta: cta('Join the community', '/community/join'),
      },
    },
  ].filter(Boolean)
  return { sections }
}

const statement = (title, body, extra = {}) => ({ type: 'statement', title, body, ...extra })

export default {
  // ------------------------------------------------------------------ representative page
  '/data-platforms/cobalt': page({
    name: 'Cobalt DB',
    slug: 'cobalt',
    flush: false,
    lockup: true,
    heroTitle: 'Speed up your Cobalt DB analytics with Lattice.', // 45, 3 lines
    // 119, 2 lines
    heroLead:
      'Pair Cobalt DB compute with Lattice modeling to cut rebuild time and spend, with every change tested before it reaches users.',
    featTitle: 'Cobalt DB speed, paired with models you can trust.', // 53, 2 lines
    // 391, 3 lines
    featBody:
      'Cobalt DB runs storage and queries at scale. Lattice is the layer on top where your team defines, tests, documents and ships the models that turn raw tables into reliable data products for analytics and AI. Since the Lattice Core engine validates each model before anything runs in the warehouse, typos and broken references appear in your editor, not in tomorrow’s failed job.',
    cardOffset: 0,
    cards: [
      ['Trusted data, trusted AI', 'Built-in tests, alerts and column-level lineage keep every transformation reliable, while making the same metadata available to each AI application and agent your team runs.', 'See how teams make AI more reliable', '/resources/whitepaper-control-plane'],
      ['Lower your costs', 'Required checks keep faulty code out of production, and shared models mean teams stop rebuilding the same tables.', 'See how Kestrel cut its compute bill', '/case-studies/kestrel'],
      ['Build faster at scale', 'The Lattice Core engine gives developers instant feedback in the editor, smarter builds in production and a clear path to efficiency at any scale.', 'See how the engine speeds up builds', '/product/develop'],
    ],
    middle: statement(
      'Built to fit right into Cobalt DB.', // 1 line (original 36ch, 1 line)
      'Lattice runs directly inside your Cobalt DB workflow, adding governance, transparent lineage and a shared semantic layer that bring clarity to every analysis your team ships.', // 174, 2 lines
      { diagram: misc.diagram },
    ),
    stories: ['halcyon', 'tidepool', 'basalt'],
    // page-specific lengths for the first story (original: quote 360ch / 10 lines, stat labels 2 lines)
    storyEdits: {
      halcyon: {
        quote:
          'Auditors used to ask where a reported figure came from, and we would spend days rebuilding the answer from old scripts and email threads. Running Lattice on Cobalt DB changed that. Every model is versioned and tested, every change is reviewed, and lineage traces each number to its source rows, so the next audit was a short conversation.',
        stats: [
          { number: '0', label: 'audit findings on lineage or change control in the latest review' },
          { number: '100%', label: 'of regulated reports now built on reviewed, tested models' },
        ],
      },
    },
    resources: ['controlPlane', 'summit', 'showcase'],
    resourceTitles: [null, 'Summit launch recap', 'The launch showcase'], // 1 line each, as on the original
    closingTitle: 'Learn how to get more from your Cobalt DB stack, starting today.', // 2 lines at 1440, 3 at 1280
    closingBody:
      'Schedule a walkthrough and we will show you how Lattice trims Cobalt DB spend, shortens build times and gives your team room to grow.',
  }),

  // ------------------------------------------------------------------ members (lg:py-0 hero, 612 tall)
  '/data-platforms/northwind': page({
    name: 'Northwind',
    featEyebrow: 'Northwind',
    slug: 'northwind',
    heroTitle: 'Get more from Northwind with Lattice.',
    heroLead:
      'Put every Northwind model under Git, wrap it in tests and generated docs, and let analysts ship trustworthy tables in a fraction of the time.',
    featTitle: 'Everything your team needs to build on Northwind with confidence.', // 2 lines
    featBody:
      'Northwind stores and scales your data. Lattice gives the people who model it one shared, tested project.',
    cardOffset: 3,
    cards: [
      ['Fewer broken reports', 'Tests on every model catch null keys, duplicate rows and late data before they reach a dashboard, with alerts routed straight to the owner of each model and the failing rows attached.', 'See how teams catch issues early', '/product/test-and-observe'],
      ['Spend that tracks value', 'State-aware builds reuse unchanged models and skip redundant work, so Northwind compute goes to the queries that matter most.', 'See how Orbitly cut its spend', '/product/cost-optimization'],
      ['Onboard analysts faster', 'Documentation and lineage are generated from the project, so new analysts can find and trust the right model in their first week.', 'See how the catalog helps teams', '/product/catalog'],
    ],
    middle: statement(
      'Lattice and Northwind work together from day one.', // 46
      'Connect Lattice to Northwind in minutes, then build, test and deploy models with the warehouse features your team already relies on, from workload isolation to fine-grained access controls. Watch the short tour below to see a first project go from raw tables to tested models.',
      { video: misc.poster1 }, // the original embeds a video player here
    ),
    stories: ['meridian', 'kestrel', 'fernway'],
    storyEdits: {
      meridian: {
        quote:
          'Every desk had its own version of assets under management. Now one tested definition feeds all eleven desks, and the quarterly close is a short review meeting instead of a week of firefighting.',
        stats: [
          { number: 'Weeks to minutes', label: 'to close the quarterly books' },
          { number: '11', label: 'regional desks reporting from one governed project' },
        ],
      },
    }, // the original's first story here leads with a 3-line metric
    resources: ['quickstart', 'lifecycle', 'blog'],
    closingTitle: 'Build faster on Northwind with Lattice.',
    closingBody: 'Get a guided tour of tests, lineage and scheduling running across every Northwind workload you own, then see how teams roll it out.',
  }),

  '/data-platforms/quarry': page({
    name: 'Quarry',
    featEyebrow: 'Why Quarry teams',
    slug: 'quarry',
    heroTitle: 'Turn Quarry data into trusted answers.',
    heroLead:
      'Model, test and document your Quarry datasets in one governed project, and serve every team the same reliable numbers at any scale.',
    featTitle: 'A faster path from raw Quarry tables to decisions people trust.',
    featBody:
      'Quarry handles storage and compute at any scale. Lattice adds tested, versioned and documented models on top.',
    cardOffset: 6,
    cards: [
      ['Governed by design for every team', 'Contracts, access rules and model versions keep shared datasets stable while every team builds on them at its own pace.', 'See how governance works', '/product/mesh'],
      ['Smarter builds that cost less to run', 'Rebuild only what changed since the last good run and keep Quarry slot usage predictable as your project grows.', 'See how state-aware builds work', '/product/deploy'],
      ['Ready for assistants and agents today', 'Descriptions, owners and certified metrics travel with every model, giving assistants and agents context they can actually use, and giving reviewers a clear record of which sources every answer drew on.', 'See how teams prepare for AI', '/product/ai'],
    ],
    middle: {
      type: 'split',
      variant: 'textLeft',
      title: 'Bring the full modeling lifecycle to Quarry', // 42, 2 lines
      paragraphs: [
        'Lattice connects natively to Quarry so your team can design, test and ship models in one place, then keep them healthy in production.',
      ],
      bullets: [
        'Compile and check every model against the live Quarry schema',
        'Run tests in pull requests before changes reach production datasets',
        'Schedule state-aware jobs that only rebuild what actually changed',
      ],
      primary: cta('Talk to an expert', '/contact'),
      tertiary: cta('Read the docs', '/learn'),
      media: splits.quarry,
    },
    stories: ['tidepool', 'orbitly', 'ferrocene'],
    resources: ['report', 'caseStudies', 'onDemand'],
    stats: true,
    closingTitle: 'Learn how to get more from every Quarry dataset with Lattice today.', // 64, 3 lines
    closingBody: 'Book a demo to see how Lattice brings modeling, testing and orchestration to your Quarry projects, from first model to production.',
  }),

  '/data-platforms/helixa': page({
    name: 'Helixa',
    featEyebrow: 'Built for Helixa',
    slug: 'helixa',
    stroke: 'S5',
    heroTitle: 'Unify analytics and AI on Helixa.',
    heroLead:
      'Use Lattice to build governed, tested models on Helixa that serve dashboards, notebooks and machine learning features from one source.',
    featTitle: 'One modeling layer for all Helixa work.',
    featBody:
      'Helixa brings analytics and machine learning onto one platform. Lattice gives both sides a shared modeling layer with tests, lineage and documentation, so data scientists and analysts stop rebuilding the same logic in parallel, start building on each other’s work and ship features and dashboards from the same reviewed definitions.',
    cardOffset: 1,
    cards: [
      ['Shared features, fewer copies', 'Model features once and reuse them in dashboards and training pipelines, with tests guarding both.', 'See how teams share models', '/product/mesh'],
      ['Lineage across workloads', 'Trace a prediction or a chart back to the exact source rows, through every transformation in between, in one lineage graph.', 'See how lineage works', '/product/catalog'],
      ['Production without friction', 'Promote models through environments with tests at every step and schedule jobs that respect dependencies across projects.', 'See how deployment works', '/product/deploy'],
    ],
    middle: statement(
      'Built to fit right into Helixa.',
      'Lattice runs inside your Helixa workspace and works with its catalog and compute, adding governance, transparent lineage and a semantic layer that bring clarity to analytics and AI alike.',
      { diagram: misc.diagram },
    ),
    stories: ['basalt', 'kestrel'],
    storyEdits: {
      basalt: {
        summary: 'One governed model now feeds clinical and finance reporting, with tests on every load across 24 hospitals.',
        stats: [
          { number: '24', label: 'hospitals on one shared model' },
          { number: '45%', label: 'faster monthly operational reporting' },
        ],
      },
    }, // summary under the headline and 1-line stat labels on the original
    resources: ['controlPlane', 'charts', 'summit'],
    resourceTitles: ['One shared layer for many teams', null, 'Summit launch recap'],
    resourceBodies: true,
    closingTitle: 'Learn how to get more from your Helixa platform with Lattice.',
    closingBody: 'Join a live walkthrough of one governed modeling layer shared by analytics and AI teams on Helixa, with time for your questions.',
  }),

  '/data-platforms/stratus': page({
    name: 'Stratus',
    featEyebrow: 'Made for Stratus',
    slug: 'stratus',
    heroTitle: 'Build trusted analytics on Stratus.',
    heroLead:
      'Lattice brings tested, documented and governed models to Stratus, so every team in your organization can work from the same definitions.',
    featTitle: 'Analytics engineering for every team working on Stratus.',
    featBody:
      'Stratus brings your organization’s data into one place. Lattice gives the people who shape it a disciplined workflow, with code review, automated tests and generated documentation, so business users get reports they can rely on and engineers get a project they can maintain.',
    cardOffset: 4,
    cards: [
      ['One version of the truth', 'Define metrics once and serve them to every report and workbook, so finance and operations stop arguing about numbers and start acting on them.', 'See how the semantic layer works', '/product/semantic-layer'],
      ['Safer changes', 'Every change runs through review and tests in an isolated environment before it touches the reports people use every day.', 'See how testing works', '/product/test-and-observe'],
      ['Clear ownership', 'Owners, descriptions and lineage live next to the code, so anyone can see who to ask and what a change will affect.', 'See how the catalog works', '/product/catalog'],
    ],
    middle: {
      type: 'split',
      variant: 'textLeft',
      title: 'Bring the full modeling lifecycle to Stratus',
      paragraphs: [
        'Lattice connects to Stratus so your team can design, test and ship models in one governed project, then keep them healthy in production.',
      ],
      bullets: [
        'Version every model and review each change before it ships',
        'Test data in Stratus on every run, not once a quarter',
        'Document models automatically as part of every build you run',
        'Share certified models across every workspace',
      ],
      media: splits.stratus,
    },
    ctaTitle: 'See what Lattice can do for the teams that work on Stratus.', // 2 lines
    stories: ['meridian', 'ferrocene', 'halcyon'],
    storyEdits: {
      meridian: {
        quote:
          'Every desk had its own version of assets under management. Now one tested definition feeds all eleven desks, and the quarterly close is a short review meeting instead of a week of firefighting.',
        stats: [
          { number: 'Weeks to minutes', label: 'to close the quarterly books' },
          { number: '11', label: 'regional desks reporting from one governed project' },
        ],
      },
    }, // the original's first story here leads with a 3-line metric
    resources: ['lifecycle', 'quickstart', 'report'],
    resourceTitles: ['The modeling lifecycle, from first query to production', null, null], // 2 lines on the original
    resourcesBody: false,
    closingTitle: 'Learn how to get more from Stratus with Lattice.',
    closingBody: 'Watch analytics engineering habits come to life in every Stratus workspace on a live call, with a specialist answering your questions.',
  }),

  '/data-platforms/driftway': page({
    name: 'Driftway',
    featEyebrow: 'Why Driftway teams',
    slug: 'driftway',
    heroTitle: 'From ingestion to insight with Driftway.',
    heroLead:
      'Driftway moves your data in and Lattice turns it into tested, documented models, so fresh data becomes trusted answers without hand-offs.',
    featTitle: 'Connect ingestion and transformation into one reliable pipeline.',
    featBody:
      'Driftway keeps hundreds of sources in sync. Lattice picks up where it leaves off, modeling, testing and documenting the data as soon as it lands, so every sync is followed by a build and every build is checked before anyone downstream relies on it. Freshness checks, schema tests and lineage cover each source, and owners hear about upstream changes before a dashboard breaks.',
    cardOffset: 7,
    cards: [
      ['Builds that follow syncs', 'Trigger Lattice jobs the moment a Driftway sync finishes, so models are always as fresh as the data underneath them.', 'See how orchestration works', '/product/deploy'],
      ['Source-aware testing', 'Freshness checks and schema tests on every source catch upstream changes before they break the models built on top.', 'See how testing works', '/product/test-and-observe'],
      ['Lineage end to end', 'Follow each column from the source system Driftway syncs through every model to the dashboards that depend on it, and see the impact of a schema change before it lands.', 'See how lineage works', '/product/catalog'],
    ],
    middle: statement(
      'One pipeline from source system to trusted model.',
      'Watch how Driftway syncs and Lattice builds work together, with transformation jobs that start the moment new data lands and tests that check it before anyone downstream uses it. The tour covers setup, the first sync, the first build and the alerts that follow a schema change.',
      { video: misc.poster1 },
    ),
    resources: ['summit', 'quickstart', 'showcase'],
    resourceTitles: ['Summit launch recap', null, 'The launch showcase'], // 1 line each on the original
    closingTitle: 'Learn how to get much more from every single Driftway sync with Lattice today.', // 64, 3 lines
    closingBody: 'Watch Driftway syncs arrive as raw tables and leave as tested, documented models in a live demo, then bring your own questions along.',
  }),
}
