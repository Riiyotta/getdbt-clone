// T13 bespoke product landings (specs/T12-T13.md E), keyed by route path.
// Original placeholder copy for the fictional company "Lattice". Customers, tools and people are
// invented. Trailing `// n` comments give the spec's character target (n ch, or n/lines).
import { customers, heroes, icons, illus, intMarks, intWords, lockups, misc, shots, splits, tabsDark } from '../../pageAssets'
import { assets } from '../../assets'
import { crop } from '../../components/sections/parts'
import { cta, pickResources, statsT2 } from './shared'

const dialog = (label) => ({ label, dialog: true })
const shot = (i, w, h, alt) => crop({ ...shots[i], alt }, w, h)
const sq = (a, w = 612, h = w) => crop(a, w, h)
const logoBar = (title) => ({
  type: 'logoBar',
  title,
  logos: ['kestrel', 'meridian', 'tidepool', 'ferrocene', 'orbitly', 'halcyon'].map((k) => customers[k]),
})
const intTiles = assets.integrations.map((src, i) => ({ src, width: 30, height: 30, alt: ['Northwind', 'Quarry', 'Helixa', 'Stratus', 'Driftway', 'Cobalt DB'][i] }))
const intStrip = (kicker, title) => ({
  type: 'intStrip',
  kicker, // 20-21
  title, // 21
  tiles: intTiles,
  cta: cta('Browse all integrations', '/product/integrations'), // 20
})
const res = (keys, titles = [], bodies) =>
  pickResources(...keys).map((c, i) => ({ ...c, title: titles[i] ?? c.title, body: bodies ? bodies[i] : undefined }))
const story = (o) => ({ cta: cta('Read customer story', o.to || '/case-studies'), ...o })

// ---------------------------------------------------------------- comparison tables
const table = (title, rows) => ({ type: 'compareTable', title, heads: ['Open engine', 'Hosted Lattice'], rows })

// ---------------------------------------------------------------- integrations directory (C-14)
// 8 stacked categories with 9, 4, 10, 2, 8, 7, 3 and 1 cards (no filter, as on the original);
// invented tools with invented marks.
function directory() {
  let m = 0
  const card = (name, body, word) => {
    const logo = word !== undefined ? intWords[word] : { ...intMarks[m++ % intMarks.length], alt: name }
    return { logo, title: name, body, cta: cta('Learn more', '/contact') }
  }
  const cats = [
    ['data-platforms', 'Data platforms', [
      card('Northwind', 'Build and run models on Northwind with native support for its SQL dialect.'),
      card('Quarry', 'Transform data in Quarry with partitioned tables managed from your project.'),
      card('Helixa', 'Run SQL and Python models on Helixa clusters, in step with notebooks.'),
      card('Stratus', 'Model data in the Stratus lakehouse with its open table formats.'),
      card('Driftway', 'Pair Driftway ingestion with models that run the moment data lands.'),
      card('Cobalt DB', 'Use dynamic tables, warehouses and roles in Cobalt DB from your project.'),
      card('Pellucid', 'Run models on the Pellucid query engine across files in object storage without moving them first.'),
      card('Ironbark', 'Connect to Ironbark for low-latency analytical workloads and incremental model builds.'),
      card('Saltmarsh', 'Build on Saltmarsh with support for its materialized views, schemas and access grants.'),
    ]],
    ['ingestion', 'Ingestion and replication', [
      card('Quillstack', 'Sync data from hundreds of sources and trigger model runs as soon as each load finishes.', 0),
      card('Brightvane', 'Stream change data from databases and transform it incrementally on arrival.', 1),
      card('Tideline', 'Replicate files and application data into your warehouse on a schedule.'),
      card('Fernbrook', 'Load event data from your product and keep raw tables documented as sources.'),
    ]],
    ['orchestration', 'Orchestration', [
      card('Harbor Signal', 'Trigger Lattice jobs from your pipelines and pass run results, artifacts and status codes to the next task in the chain.', 2),
      card('Wayfarer', 'Schedule models alongside other workloads and see every run in one timeline.'),
      card('Cadence Flow', 'Run Lattice jobs as steps in a larger workflow with retries and notifications.'),
      card('Lanternwork', 'Orchestrate projects from code with typed assets that map to your models one to one, including tests and freshness checks.'),
      card('Ridgepole', 'Kick off jobs from event triggers and wait for them to finish before moving on.'),
      card('Moorgate', 'Coordinate batch and streaming jobs, with Lattice runs as first-class tasks.'),
      card('Sunstitch', 'Use a visual pipeline builder that includes Lattice jobs as a native step type.'),
      card('Pinegrove', 'Run Lattice commands inside containers on your own cluster with a ready-made operator that handles logs, retries and secrets for you.'),
      card('Ashfall', 'Chain jobs across projects and teams with dependencies tracked automatically.'),
      card('Driftwood CI', 'Run checks on every pull request and post results, changed models and test failures back to the review thread.'),
    ]],
    ['activation', 'Activation and reverse sync', [
      card('Copperline Data', 'Send modeled audiences and metrics back into sales, marketing and support tools.', 3),
      card('Relaybird', 'Sync tested models to business applications on a schedule or as soon as a job completes, with field mapping kept in code.'),
    ]],
    ['quality', 'Data quality and observability', [
      card('Watchtower', 'Monitor freshness, volume and schema changes and link incidents to the models affected.'),
      card('Plumbline', 'Add anomaly detection to key tables and route alerts to the owners named in your project.'),
      card('Sentinel Grid', 'Profile columns, track distributions over time and catch drift before it reaches reports.'),
      card('Clearwater', 'Combine test results with lineage to see the full impact of any data incident, from the source table to the dashboard.'),
      card('Benchmark', 'Compare model outputs between environments before you merge a change.'),
      card('Steadfast', 'Track data quality scores for every domain and share them with stakeholders.'),
      card('Lookout', 'Watch pipeline health and costs in one dashboard, with alerts when a run takes longer or costs more than usual.'),
      card('Truecourse', 'Validate business rules on modeled data and open tickets automatically when checks fail.'),
    ]],
    ['catalog', 'Catalog and governance', [
      card('Atlas Row', 'Publish models, owners and descriptions to a company-wide catalog automatically after every deployment.'),
      card('Keystone', 'Map lineage from sources through models to dashboards for impact analysis.'),
      card('Gatehouse', 'Apply access policies and masking rules defined once across all your tools.'),
      card('Ledgerline', 'Track sensitive columns and prove compliance with automated classification.'),
      card('Commonplace', 'Give business users a glossary connected to the models that define each term.'),
      card('Wayfinder', 'Search across models, metrics and dashboards from a single place with rich context from your project, including owners, tests and recent changes.'),
      card('Charter', 'Review and approve changes to certified models with a governance workflow that records who signed off, what changed and which downstream reports are affected.'),
    ]],
    ['bi', 'Analytics and BI', [
      card('Lensboard', 'Build dashboards on certified metrics so every chart matches the source of truth, with lineage links from each tile back to the models and tests behind it.'),
      card('Sheetly', 'Query shared metrics from spreadsheets with the same definitions as every report.'),
      card('Notewell', 'Explore models in notebooks and promote useful queries back into the project.'),
    ]],
    ['ai', 'AI and agents', [
      card('Chatline', 'Let assistants answer questions with certified metrics and cite the models they used.'),
    ]],
  ]
  return cats.map(([id, title, cards]) => ({ type: 'feat', variant: 'G', id, center: true, title, cards, cols4: cards.length === 4 }))
}

export default {
  // ------------------------------------------------------------------ representative page
  '/product/what-is-lattice': {
    sections: [
      {
        type: 'heroCenter',
        stroke: 'S10',
        gradient: 'gradient-01',
        eyebrow: 'Why Lattice', // 11
        title: 'The trusted way to model your data.', // 37/2
        // 216/3
        lead: 'Lattice turns scattered SQL into a shared, versioned project by borrowing the habits of software engineering. A fast engine compiles and runs every model, so analysts, engineers and agents can build on the same trusted work.',
        primary: cta('Get Lattice', '/signup'), // 11
        secondary: cta('See the hosted platform', '/product/lattice'), // 20
        poster: illus.whatIs,
      },
      {
        type: 'feat',
        variant: 'A',
        iconSize: 56,
        eyebrow: 'What sets the engine apart', // 24
        title: 'Turn raw tables into products people use.', // 42/1
        body: 'Ship dependable data products for reporting, operations and AI agents.', // 70/1
        cards: [
          {
            icon: icons.shield,
            title: 'Reliable from the first commit', // 17-32
            body: 'Every model is versioned, reviewed and tested before it reaches production. Problems surface in the editor or in review, not in a meeting with your stakeholders the following week.', // 114-186
          },
          {
            icon: icons.layers,
            title: 'Built on open foundations',
            body: 'Plain SQL and YAML in a git repository, running on the data platform you already pay for. Develop locally from a terminal or in the browser, and take your project anywhere.',
          },
          {
            icon: icons.bolt,
            title: 'Quick to compile, cheap to run',
            body: 'Large projects compile in seconds, and each run touches only the models that moved, so builders sit idle less and the warehouse burns fewer credits overall.',
          },
        ],
      },
      {
        type: 'tabsDark',
        stroke: 'S2',
        gradient: 'gradient-01',
        title: 'Everything a team needs to ship data work.', // 38/2
        tabs: [
          {
            title: 'Models written in plain SQL', // 17-30
            // 170/3
            body: 'Write each transformation as a select statement. Lattice works out the order to build them in, creates the tables and views, and keeps every dependency straight for you.',
            media: tabsDark[1],
          },
          {
            title: 'Tests beside every model',
            body: 'Declare the rules your data must follow next to the models that produce it. Checks run on every build, so broken joins and missing keys are caught before anyone sees them.',
            media: tabsDark[2],
          },
          {
            title: 'Documentation that writes itself',
            body: 'Descriptions, owners and column details live in the project and publish to a searchable site, complete with a lineage graph that shows where each number really comes from.',
            media: tabsDark[3],
          },
          {
            title: 'Reusable macros and packages',
            body: 'Package common logic once and share it across projects, or install packages from the community hub to skip writing the same date spine or pivot for the hundredth time.',
            media: tabsDark[4],
          },
          {
            title: 'Builds that know what changed',
            body: 'State-aware runs compare your project with the last successful build and rebuild only the models whose code or inputs moved, which keeps pipelines quick and compute bills calm.',
            media: tabsDark[6],
          },
        ],
      },
      {
        type: 'split',
        variant: 'textLeft',
        eyebrow: 'One engine, everywhere', // 19
        title: 'The engine behind it all', // 27/1
        paragraphs: [
          // 301/4
          'The open engine at the heart of Lattice reads your project, works out the dependency graph and compiles every model into SQL your warehouse understands. It runs the same way on a laptop, in a scheduled job or inside an agent workflow, so the result you preview while developing matches what runs in production every night.',
          ['Teams start for free with ', { b: 'the open-source engine' }, ' and move to the hosted platform when they need more.'],
        ],
        primary: cta('Install the engine', '/learn'), // 16
        tertiary: cta('Read docs', '/learn'), // 10
        media: sq(heroes.semanticLayer),
      },
      {
        type: 'split',
        variant: 'textLeft',
        eyebrow: 'Hosted platform', // 16
        title: 'Run the engine with a full team around it', // 32/2
        paragraphs: [
          // 292/4
          'The hosted platform adds everything a growing team needs around the engine: a browser editor and visual canvas, scheduled jobs, alerts, a searchable catalog, governed metrics and an assistant that knows your project. Administrators get single sign-on, permissions and audit logs without running any servers.',
        ],
        primary: cta('Try it free', '/signup'), // 10
        media: crop(heroes.mesh, 612, 613),
      },
      {
        type: 'custTabs',
        title: 'Proof from teams like yours', // 16
        stories: [
          story({
            name: 'Kestrel', // 9-18
            logo: customers.kestrel,
            to: '/case-studies/kestrel',
            headline: 'Kestrel halves nightly build time with Lattice', // 42/2
            // 175/4
            summary: 'Kestrel moved four hundred production models onto state-aware builds and rebuilt its review process around small pull requests, cutting run times and catching issues sooner.',
            // 360/10
            quote: 'We used to watch the nightly load creep past breakfast while everyone argued about which dashboard to believe. Moving the project onto Lattice changed both problems at once. Only the models that actually changed are rebuilt, every number arrives before the first meeting, and when something does look wrong we can trace it to a specific commit in a minute or two.',
            person: 'Priya Raman',
            role: 'Head of Analytics Engineering',
            stats: [
              { number: '52%', label: 'shorter nightly runs after the move to state-aware builds' },
              { number: '3x', label: 'more models shipped each sprint with tests and docs' },
            ],
          }),
          story({
            name: 'Meridian Partners',
            logo: customers.meridian,
            to: '/case-studies/meridian-partners',
            headline: 'One set of figures for eleven regional desks',
            summary: 'Meridian Partners replaced eleven separate spreadsheets of portfolio logic with one governed project, so every desk reports the same assets under management on the same day.',
            quote: 'Closing each quarter once meant a week spent matching up eleven competing copies of one number. Today there is one tested definition that every desk reads from, and the conversation at the end of the quarter is about what the numbers mean rather than which spreadsheet is right. The audit team noticed the difference before we had even announced it.',
            person: 'Tomas Ekberg',
            role: 'Director of Data Platforms',
            stats: [
              { number: '11', label: 'regional desks reporting from one governed project' },
              { number: '4d', label: 'saved on every quarterly close with no manual reconciling' },
            ],
          }),
          story({
            name: 'Tidepool',
            logo: customers.tidepool,
            headline: 'Self-serve answers for every product squad',
            summary: 'Tidepool gave product managers documented, tested models to build on, which cut the queue of ad hoc requests and freed a small data team to work on new questions.',
            quote: 'Product managers wanted answers in hours, and our tiny data team was drowning in tickets. Once the core models were documented and tested in Lattice, people could find what they needed and trust it without asking us first. We still get questions, but they are better questions, and we finally have time to work on the ideas that move the business forward.',
            person: 'Ana Kowalski',
            role: 'Staff Data Engineer',
            stats: [
              { number: '70%', label: 'fewer ad hoc requests reaching the central data team' },
              { number: '140', label: 'dashboards rebuilt on certified, documented models' },
            ],
          }),
          story({
            name: 'Orbitly',
            logo: customers.orbitly,
            headline: 'Lower warehouse spend while shipping more models',
            summary: 'Orbitly reused results for unchanged models and moved heavy transformations to incremental builds, bringing compute spend down in the first month after migrating.',
            quote: 'Our compute bill was growing faster than the team, and nobody could say which models were responsible. Lattice showed us exactly what ran, how long it took and what it cost, and state-aware builds stopped us paying to rebuild tables that had not changed. The same project now serves twice as many teams, and finance stopped sending us worried messages.',
            person: 'Jonah Reyes',
            role: 'VP, Data and Insights',
            stats: [
              { number: '62%', label: 'lower warehouse spend after moving to state-aware builds' },
              { number: '2x', label: 'as many teams served from one project with no new hires' },
            ],
          }),
        ],
      },
      logoBar('Relied on by data teams at every scale'), // 31
      {
        type: 'resources',
        eyebrow: 'Keep going', // 10
        title: 'Guides and talks to help you go further', // 38
        body: 'Practical reading and recorded sessions for anyone new to modeling with Lattice or sharpening their skills.', // 105/1
        cards: res(['lifecycle', 'quickstart', 'onDemand'], [
          'The modeling lifecycle in one page', // 32-63
          'Set up your first project and run a test in under twenty minutes',
          'Patterns from teams running thousands of models a day',
        ]),
      },
      intStrip('Works with your stack', 'Plug into your tools'),
      {
        type: 'ctaBand',
        eyebrow: 'Ready when you are. Start for free', // 32
        title: 'Build your first trusted model today', // 36/2
        // 177/2
        body: 'Install the open engine on your laptop or open a free hosted workspace in your browser. Either way your project stays yours, in plain files you can move whenever you want.',
        primary: cta('Create an account', '/signup'), // 18
        secondary: cta('Install the open engine now', '/learn'), // 27
        checklist: ['Free to start, no card', 'Runs on your data platform', 'Open, portable project files'], // 23-30
      },
    ],
  },

  // ------------------------------------------------------------------ members
  '/product/lattice': {
    sections: [
      {
        type: 'heroCenter',
        eyebrow: 'The Lattice data platform', // 23
        title: 'One workspace for every model, job and metric', // 39/2
        lead: 'Develop, test, schedule and govern analytics work in a single hosted place.', // 74/1
        primary: dialog('Choose your path'), // 16
        secondary: cta('Book a walkthrough', '/contact'), // 17
        illustration: illus.platform,
      },
      {
        type: 'split',
        variant: 'textLeft',
        eyebrow: 'Ten-minute overview', // 17
        title: 'See the platform at work', // 23
        // 211/3
        paragraphs: ['Follow one change from a question in the editor to a tested model, a scheduled job and a metric served to a dashboard. The tour covers the features most teams turn on during their first week with Lattice.'],
        poster: misc.poster1,
      },
      {
        type: 'feat',
        variant: 'A',
        wash: false,
        pt0: true,
        iconSize: 56,
        cards: [
          { icon: icons.rocket, title: 'Ship changes faster', body: 'A browser editor, a visual canvas and a desktop extension share one project, so each builder works where they are quickest and reviews stay together.' }, // 11-21 / 136-143
          { icon: icons.shield, title: 'Trust every number', body: 'Tests, contracts and freshness checks run on each build, and failures point straight to the rows and the commit responsible, before anyone opens a broken report.' },
          { icon: icons.coin, title: 'Spend less to run it', body: 'State-aware jobs rebuild only what changed and reuse the rest, so you pay for useful work instead of refreshing tables nobody touched since the last run.' },
        ],
      },
      {
        type: 'split',
        variant: 'textLeft',
        eyebrow: 'From laptop to platform', // 19
        title: 'Keep the open engine and add what teams need', // 47/2
        paragraphs: ['Projects built with the open engine move to the hosted platform without a rewrite. You keep the same files and commands, and gain hosted jobs, alerts, a catalog and access controls.'], // 191/3
        primary: cta('Compare self-hosted and hosted', '/product/self-hosted-vs-platform'), // 25
        media: splits.deploy,
      },
      {
        type: 'feat',
        variant: 'E',
        dark: true,
        stroke: 'S7',
        eyebrow: 'Inside the box', // 12
        title: 'Everything you need to build, run and govern your data', // 54/2
        // 167/2
        body: 'Each capability works on its own and gets better alongside the others, because they all read from the same project, the same lineage and the same permissions.',
        cards: [
          { icon: icons.grid, title: 'Editor', body: 'Write and preview models in the browser with project-aware autocomplete.', cta: cta('Learn more', '/product/develop') }, // 4-14 / 61-102 / 10
          { icon: icons.branch, title: 'Canvas', body: 'Drag sources and joins into place while Lattice writes clean SQL underneath.', cta: cta('Learn more', '/product/develop') },
          { icon: icons.clock, title: 'Orchestration', body: 'Schedule jobs, run checks on pull requests and promote changes between environments.', cta: cta('Learn more', '/product/deploy') },
          { icon: icons.bell, title: 'Observability', body: 'Track freshness, test results and run times, and route alerts to the right owner.', cta: cta('Learn more', '/product/test-and-observe') },
          { icon: icons.search, title: 'Catalog', body: 'Find any model or metric with its owner, description, lineage and health status in one search.', cta: cta('Learn more', '/product/catalog') },
          { icon: icons.target, title: 'Metrics', body: 'Define a metric once and serve the same answer to dashboards, notebooks and agents.', cta: cta('Learn more', '/product/semantic-layer') },
        ],
      },
      {
        type: 'split',
        variant: 'textLeft',
        cols: '7/4',
        eyebrow: 'Built for agents', // 15
        title: 'Give assistants the context they need to answer well', // 41/2
        paragraphs: ['Agents read the same tested models, descriptions and certified metrics your analysts use, so their answers can be traced and checked like any other.'], // 147/2
        primary: cta('Explore the analyst', '/product/analyst'), // 14
        media: crop(tabsDark[5], 400, 400),
      },
      {
        type: 'feat',
        variant: 'A',
        wash: false,
        iconSize: 56,
        eyebrow: 'Ready for the enterprise', // 19
        title: 'Controls that scale with your company', // 37
        // 210/2
        body: 'Large organizations need more than a fast editor. Lattice adds the access, audit and isolation features that security reviewers ask about, while keeping the day-to-day workflow simple for builders.',
        cards: [
          { icon: icons.lock, title: 'Single sign-on and roles', body: 'Connect your identity provider, provision users automatically and decide exactly who can develop, deploy or administer each project and environment.' }, // 13-29 / 131-165
          { icon: icons.clipboard, title: 'Audit logs', body: 'Every sign-in, permission change and deployment is recorded and exportable, so reviews and investigations start with facts instead of guesses.' },
          { icon: icons.cloud, title: 'Regional hosting options', body: 'Choose where your metadata lives and connect to supported warehouses over private links that never cross the public internet.' },
        ],
      },
      {
        type: 'testiSlider',
        eyebrow: 'What customers say about the platform', // 34
        title: 'Teams that moved to Lattice and never looked back', // 48/4
        body: 'Hear from data leaders who consolidated their tooling on one platform and gave every builder a faster way to ship.', // 119/3
        cta: cta('Read customer stories', '/case-studies'), // 21
        cards: [
          { type: 'quote', logo: customers.ferrocene, quote: 'We replaced three scheduling tools and a homegrown catalog with one platform. Planners now open a forecast they can trace back to the plant data it came from, and our engineers spend their time on models instead of glue code. The real surprise was how quickly analysts in other departments began contributing their own models straight from the browser.', person: 'Lukas Brenner', role: 'Manager, Operations Analytics', cta: cta('Read the story', '/case-studies') },
          { type: 'metric', logo: customers.basalt, metric: '45%', line: 'faster monthly reporting for clinical and finance teams after moving to one governed project', cta: cta('Read the story', '/case-studies/basalt-health') },
          { type: 'quote', logo: customers.halcyon, quote: 'Auditors asked where each regulated figure came from, and for the first time we could simply show them the lineage, the tests and the review history in one place.', person: 'Grace Okafor', role: 'Chief Data Officer', cta: cta('Read the story', '/case-studies/halcyon') },
        ],
      },
      intStrip('Connects to your stack', 'Plug into your tools'),
      {
        type: 'ctaBand',
        wide: true,
        title: 'See how Lattice fits your team', // 26
        body: 'Book a short walkthrough with a product specialist, or start a free trial and explore on your own.', // 99/1
        primary: cta('Start a free trial', '/signup'),
        secondary: cta('Book a demo', '/contact'),
      },
      { type: 'stats', ...statsT2 },
      {
        type: 'resources',
        eyebrow: 'Learn more', // 10
        title: 'Resources for platform teams', // 28
        body: 'Guides, reports and recorded sessions on running analytics work at scale on a single shared platform.', // 108
        cards: res(
          ['controlPlane', 'report', 'showcase'],
          ['Coordinating many teams on one data layer', 'What two hundred data teams told us this year', 'Launch showcase: everything new on the platform this season'],
          ['Why shared context matters as more teams build on the same data.', 'Headcount, tooling and spend trends from data teams.', 'Product leads demo the season’s biggest releases.'],
        ),
      },
      {
        type: 'ctaBand',
        eyebrow: 'Get started', // 11
        wide: true,
        title: 'Bring your data team onto one platform', // 40
        body: 'Start free, invite your team and connect your warehouse in a single afternoon.', // 79
        primary: cta('Start free', '/signup'), // 11
        secondary: cta('Pick your starting point', '/signup'), // 24 (a <button> on the original; hero buttons only open the dialog)
      },
    ],
  },

  '/product/state': {
    sections: [
      {
        type: 'heroSplit',
        stroke: 'S9',
        lockup: lockups.state,
        title: 'Rebuild only what changed, every single time', // 39/3
        // 170/3
        lead: 'Lattice State tracks the code and inputs behind every model, skips work that has already been done, and keeps scheduled jobs fast as your project and your team grow.',
        primary: cta('Turn it on', '/signup'), // 11
        video: misc.poster2,
      },
      {
        type: 'feat',
        variant: 'E',
        wash: false,
        iconSize: 56,
        stroke: 'S10',
        gradient: 'gradient-22',
        eyebrow: 'How it helps', // 13
        title: 'Faster runs with less wasted work', // 30
        // 199/2
        body: 'Most scheduled jobs rebuild the same unchanged tables again and again. State keeps a record of what each model was built from and only does new work when something upstream has actually moved.',
        cards: [
          { icon: icons.gauge, title: 'Shorter run times', body: 'Jobs skip models whose code and inputs match the last successful build, so a nightly run that took an hour often finishes in a fraction of that time.' }, // 20-30 / 141-154
          { icon: icons.coin, title: 'Lower compute spend', body: 'Reusing results instead of recomputing them means fewer warehouse credits per run, with savings visible in the run history and the monthly bill.' },
          { icon: icons.clock, title: 'Fresher data for everyone', body: 'Because each run does less, you can schedule jobs more often and give stakeholders numbers that are hours fresher without raising the budget at all.' },
        ],
      },
      {
        type: 'quoteBand',
        quotes: [
          {
            logo: lockups.stateSquare,
            // 298/3
            quote: '“Turning on State was the easiest performance win we have ever had. Our hourly jobs went from rebuilding everything to touching only the handful of models that changed, and the warehouse bill dropped in the very first week without a single line of project code changing.”',
            person: 'Nadia Harlow', // 13
            role: 'Analytics Engineering Lead, Orbitly',
          },
        ],
      },
      {
        type: 'split',
        pt0: true,
        eyebrow: 'Under the hood', // 12
        title: 'How State decides what to skip', // 34/2
        paragraphs: [['Before each model runs, State compares a ', { b: 'fingerprint of its code' }, ' and the ', { b: 'freshness of its inputs' }, ' with the last successful build.']],
        bullets: [
          { lead: 'Unchanged:', text: 'the existing table is reused and the model is marked as current.' },
          { lead: 'Changed code:', text: 'the model is rebuilt along with anything downstream of it.' },
          { lead: 'New input data:', text: 'only the affected models refresh, incrementally where possible.' },
        ],
        after: ['Every decision is recorded in the run log, so you can always see why.'], // 76
        media: sq(heroes.deploy),
      },
      {
        type: 'split',
        variant: 'textLeft',
        cols: '5/7',
        pt0: true,
        eyebrow: 'No rewrites needed', // 13
        title: 'Works with the project you already have, with no changes to your models', // 57/3
        paragraphs: [
          // 267/4
          'State reads the same project files as the rest of Lattice. There are no new configuration formats to learn and no special model types to adopt; you turn it on for a job and it starts recording what each model was built from on the very next run.',
          // 276/5
          'If you ever need a full rebuild, a single flag forces one. Teams often keep a weekly full refresh as a safety net while every other run in the week uses State, which still captures most of the savings.',
        ],
        media: shot(0, 718, 404, 'Run timeline with reused and rebuilt models'),
      },
      {
        type: 'split',
        eyebrow: 'Clear reporting', // 14
        title: 'See the savings from every run in one place', // 44/2
        paragraphs: [
          'The run history shows how many models were reused, rebuilt or skipped on each job, along with the time and compute each decision saved. Filter by project, environment or owner to see exactly where the biggest gains came from over the last quarter, then export the figures as a report.',
          'Share the numbers with finance, compare weeks side by side, or use them to find the slowest and most expensive models that are worth optimizing next. Every figure links back to the individual runs behind it.',
        ],
        media: shot(1, 612, 327, 'Run history chart of reused versus rebuilt models'),
      },
      {
        type: 'testiSlider',
        eyebrow: 'Customer voices', // 14
        title: 'Teams running faster with State', // 21/2
        cards: [
          { type: 'quote', quote: 'Our hourly job finishes in a few minutes now, which means analysts see fresh data before their next meeting rather than after it.', person: 'Ellis Moreau', role: 'Data Platform Engineer' }, // 82-330
          { type: 'quote', quote: 'We kept a weekly full refresh as a safety net, and every other run uses State. That one change cut our nightly window by more than half and gave the on-call engineer back their mornings. The run log makes it easy to explain to anyone why a model was or was not rebuilt, which matters a lot when auditors ask. We also schedule jobs twice as often as before, so the sales team sees numbers that are hours fresher, and the monthly bill still went down.', person: 'Sofia Lindgren', role: 'Lead Analytics Engineer', cta: cta('Read the full customer story', '/case-studies') },
          { type: 'quote', quote: 'Finance noticed the lower warehouse bill before we told them anything had changed.', person: 'Kwame Asante', role: 'Head of Data' },
          { type: 'quote', quote: 'Turning it on took one setting. The savings showed up the same day, and we did not have to touch a single model to get them.', person: 'Rita Okoye', role: 'Senior Data Engineer' },
        ],
      },
      {
        type: 'statement',
        band: true,
        eyebrow: 'Pricing', // 7
        title: 'Included with every plan', // 22
        // 339/3
        body: 'State is part of every hosted Lattice plan at no extra charge. Usage is measured like any other job, so the models State skips do not count toward your run minutes. Many teams find the warehouse savings alone exceed their subscription, and the developer time saved is a bonus.',
        note: { text: 'Want to estimate your own savings?', cta: cta('Talk to us', '/contact') }, // 37
      },
      {
        type: 'faq',
        title: 'Questions about Lattice State', // 26
        items: [
          { q: 'Does State work with incremental models?', a: 'Yes. Incremental models keep their usual behaviour, and State decides whether a run is needed at all before the incremental logic starts.' },
          { q: 'Can I force a full rebuild?', a: ['Yes. A single flag rebuilds everything. See the ', { a: 'deployment guide', to: '/learn' }, ' for the details.'] },
        ],
      },
      {
        type: 'ctaBand',
        wide: true,
        title: 'Spend less time waiting and less money rebuilding tables', // 53/1
        body: 'Turn on State for your next job and see the difference in the first run.', // 76
        primary: cta('Get started', '/signup'), // 11
      },
    ],
  },

  '/product/assistant': {
    sections: [
      {
        type: 'heroSplit',
        lockup: lockups.assistant,
        title: 'An assistant that knows your data project inside out', // 53/3
        video: misc.poster2,
      },
      {
        type: 'install',
        eyebrow: 'Set it up in under a minute', // 26
        body: ['Install the assistant with your package manager, then connect it to a project in your editor. ', { a: 'Read the guide', to: '/learn' }], // 98 + 13
        copyLabel: 'Copy command',
        tabs: [
          { label: 'Package app', command: 'lattice-pkg install lattice-assistant --channel stable && lattice-assistant init --here' }, // 11 / 82
          { label: 'Script', command: 'curl -fsSL https://install.lattice.example/assistant.sh | sh -s -- --channel stable' }, // 7 / 77
        ],
      },
      {
        type: 'feat',
        variant: 'E',
        wash: false,
        stroke: 'S4',
        gradient: 'gradient-05',
        title: 'Built to work the way analytics engineers already work every day', // 55/2
        // 187/2
        body: 'The assistant reads your models, tests, documentation and lineage, then helps you write, fix and explain code without leaving your editor. Every suggestion is a normal change you can review.',
        primary: cta('Install the assistant', '/signup'), // 18
        tertiary: cta('Read the docs', '/learn'), // 11
        cards: [
          { icon: icons.sparkle, title: 'Draft new models', body: 'Explain the table you want in everyday words and receive a draft that respects your naming and layering habits. It picks the right upstream sources, adds the joins you would expect and leaves clear comments where it made an assumption you should check.' },
          { icon: icons.badge, title: 'Write tests for you', body: 'Suggests uniqueness, relationship and accepted-value checks based on the columns and joins in each model. It explains why each check matters, so reviewers can keep the useful ones and drop anything that would only add noise to the run.' },
          { icon: icons.book, title: 'Document as you go', body: 'Generates descriptions for models and columns, ready for you to edit and commit alongside the code. Descriptions reuse the vocabulary already in your project, so the documentation reads as though one careful person wrote all of it.' },
          { icon: icons.search, title: 'Explain any model', body: 'Ask why a number looks the way it does and get an answer that walks the lineage back to the sources. It names each model along the way and points to the transformation that changed the figure the most.' },
          { icon: icons.bolt, title: 'Fix failing builds', body: 'Reads the error, finds the likely cause in your project and proposes a fix you can review and apply. When the cause sits upstream in someone else’s model, it tells you who owns it and drafts a note you can send them.' },
          { icon: icons.lock, title: 'Respect your permissions', body: 'Works only with the projects and environments you can already access, and logs every action it takes. Administrators can limit it to development environments, require review for every change and switch it off for any project.' },
        ],
      },
      {
        type: 'ctaCard',
        title: 'Try the assistant on your own project', // 37/1
        // 187/3
        body: 'Install it in a minute, point it at an existing project and ask it to document a model or write a test. Most people see a useful suggestion within the first five minutes, and every change it makes waits for your review.',
        primary: cta('Install now', '/signup'),
      },
      {
        type: 'tabsDark',
        stroke: null,
        wide: true,
        eyebrow: 'Inside your editor', // 16
        title: 'Help that appears exactly where you are already working', // 48/3
        body: 'Suggestions appear inline, in a side panel or in the terminal, depending on how you like to work each day.', // 119/2
        tabs: [
          { title: 'Inline suggestions', body: 'As you type, the assistant proposes the next lines of a model based on its upstream sources, your conventions and similar models elsewhere in the project. Accept it with one key, or keep typing to ignore it.', media: shot(0, 562, 318, 'Editor with an inline model suggestion') }, // 235/4
          { title: 'Chat beside your code', body: 'Open the side panel to ask questions about the project, request a refactor across several files or get an explanation of an unfamiliar macro. Every change it proposes shows up as a diff you can review line by line before anything is written to disk.', media: shot(1, 562, 318, 'Side panel chat proposing a refactor') },
          { title: 'Terminal helper', body: 'From the command line, ask the assistant to explain a failing run, suggest a fix or generate tests for a model. It reads the run log and the project together, so its answers point to the exact file and line that caused the problem in the first place.', media: shot(2, 562, 318, 'Terminal output with a suggested fix') },
        ],
      },
      {
        type: 'statement',
        wide: true,
        title: 'Suggestions you can review, test and trust like any code', // 53/1
        body: 'Every change the assistant proposes goes through the same review and checks as the rest of your work.', // 99/1
      },
      {
        type: 'demoPanel',
        gradient: 'gradient-12',
        eyebrow: 'Draft', // 5-11
        title: 'Go from a plain-language request to a reviewed, tested model', // 47-56
        // 173-375
        body: 'Describe the table you need and the assistant drafts the SQL, the YAML and a starter set of tests. It follows your folder structure and naming rules, so the result looks like something a teammate wrote.',
        cta: cta('Try drafting', '/signup'),
        media: shot(0, 824, 466, 'Draft model generated from a request'),
      },
      {
        type: 'demoPanel',
        gradient: 'gradient-02',
        mediaLeft: true,
        eyebrow: 'Refactor',
        title: 'Rename a column across the project without breaking anything',
        body: 'Ask for a rename and the assistant finds every model, test and document that refers to the column, proposes the edits as one change, and runs the affected tests before you merge. You review one diff instead of hunting through files.',
        cta: cta('See refactoring', '/signup'),
        media: shot(2, 824, 466, 'Project-wide rename preview'),
      },
      {
        type: 'demoPanel',
        gradient: 'gradient-12',
        eyebrow: 'Debug',
        title: 'Find out why a build failed in seconds, not an afternoon',
        body: 'Point the assistant at a failed run. It reads the error and the lineage together, explains the likely cause in plain language and offers a fix you can apply with one click.',
        cta: cta('See debugging', '/signup'),
        media: shot(1, 824, 466, 'Failed run explained with a suggested fix'),
      },
      {
        type: 'demoPanel',
        gradient: 'gradient-02',
        mediaLeft: true,
        eyebrow: 'Explain',
        title: 'Understand an unfamiliar project on your very first day with the team',
        body: 'New to a codebase? Ask the assistant to walk you through it. It summarizes each layer of the project, explains how the key models fit together, points out the tests that protect them, and links to the documentation for anything you want to read in more depth. Teams use it to shorten onboarding from weeks to days, and experienced engineers use it to get oriented quickly in a project they have not touched for a while.',
        cta: cta('Try explaining a project', '/signup'),
        media: shot(0, 824, 550, 'Project overview generated for a new teammate'),
      },
      {
        type: 'feat',
        variant: 'H',
        pt0: true,
        eyebrow: 'Safe by design', // 13
        title: 'Guardrails built into every suggestion', // 44
        body: 'The assistant follows the same rules as the people using it, with no special access of its own.', // 90
        cards: [
          { icon: icons.shield, title: 'Works inside your existing permissions model', body: 'The assistant can only read projects and environments you already have access to, and it never connects to production on its own.' }, // 37-44 / 122-136
          { icon: icons.clipboard, title: 'Every action recorded in the audit log', body: 'Prompts, suggestions and accepted changes are logged, so administrators can review how the assistant is being used across teams.' },
          { icon: icons.lock, title: 'Your code is not used to train shared models', body: 'Project code and data stay private to your organization and are never used to improve models offered to other customers.' },
        ],
      },
      {
        type: 'quoteBand',
        wash: true,
        quotes: [
          { logo: customers.fernway, quote: 'The assistant wrote the first draft of our test suite in an afternoon. We still reviewed every line, but it saved us a week of tedious work.', person: 'Jordan Ellis', role: 'Data Team Lead, Fernway' }, // 140-395
          { quote: 'New analysts ask it to explain the project instead of interrupting senior engineers, and they ship their first reviewed model in days rather than weeks. Onboarding used to be the slowest part of growing the team, and now it is one of the smoothest.', person: 'Mei Tanaka', role: 'Analytics Manager' },
          { quote: 'Debugging a failed run used to mean reading logs for an hour. Now the explanation and a proposed fix are waiting for me by the time I open my laptop, and most of the time the fix is right on the first try. When it is not, the explanation still points me to the right model, which is half the battle. It feels like pairing with a colleague who has read every file.', person: 'Daniel Brook', role: 'Senior Analytics Engineer' },
          { quote: 'We were cautious about AI in our codebase. The permissions model and audit log made it an easy approval for our security team.', person: 'Amara Nwosu', role: 'Director of Data Engineering' },
        ],
      },
      {
        type: 'resources',
        title: 'Learn more', // 10
        cards: res(['editor', 'canvas', 'blog'], [
          'Getting started with the assistant in your desktop editor', // 48-55
          'Writing prompts that produce models your reviewers approve',
          'How our own data team uses the assistant every day',
        ]),
      },
    ],
  },

  '/product/charts': {
    sections: [
      {
        type: 'heroSplit',
        stroke: 'S1',
        gradient: 'gradient-01',
        pb0: true,
        badge: 'New release', // 10
        title: 'Dashboards as code', // 21/1
        // 176/3
        lead: 'Lattice Charts keeps dashboards in the same project as the models behind them, so every chart is versioned, reviewed and tested alongside the SQL that feeds it.',
        primary: cta('Try Lattice Charts', '/signup'), // 16
        secondary: cta('Watch the launch session', '/resources/webinars/charts-as-code'), // 24
      },
      {
        type: 'split',
        variant: 'textLeft',
        eyebrow: 'Dashboards that stay right', // 24
        title: 'Stop rebuilding broken dashboards after every change', // 37/2
        paragraphs: ['Rename a field or adjust a metric and Charts marks each chart it touches inside that very pull request, so dashboards never fail silently after a merge and nobody learns about it from an annoyed colleague.'], // 193/3
        primary: cta('See how it works', '/resources/webinars/charts-as-code'), // 22
        media: crop(tabsDark[7], 612, 543),
      },
      {
        type: 'install',
        title: 'Add charts to an existing project with a single command', // 48/2
        body: 'Install the package, run the setup command and your first chart is ready to preview.', // 89/1
        copyLabel: 'Copy command',
        tabs: [
          { label: 'Package', command: 'lattice add lattice-charts' }, // 8 / 26
          { label: 'From source', command: 'lattice add ./vendor/charts' },
        ],
      },
      {
        type: 'feat',
        variant: 'A',
        wash: false,
        iconSize: 56,
        center: true,
        title: 'Everything you need to ship reliable dashboards', // 39
        cards: [
          { icon: icons.chart, title: 'Charts in YAML', body: 'Describe each chart next to the model it reads from, with the same review process as any other change. Layouts, filters and colors live in one readable file per dashboard.', cta: cta('Read the docs', '/learn') },
          { icon: icons.badge, title: 'Tested visuals', body: 'Check that every chart still renders and that its totals match the model before a change can merge.', cta: cta('See the tests', '/learn') },
          { icon: icons.globe, title: 'Share anywhere', body: 'Publish dashboards to a hosted site, embed them in internal tools or export them for a slide deck, with access rules that follow your project.', cta: cta('Explore sharing', '/learn') },
        ],
      },
      {
        type: 'feat',
        variant: 'E',
        dark: true,
        stroke: 'S7',
        title: 'Two ways to start', // 17
        body: 'Begin from a template gallery or convert the dashboards you already have into code.', // 95
        cards: [
          { icon: icons.layers, title: 'Start from a template', body: 'Pick a ready-made dashboard for revenue, product usage or operations and point it at your models.', cta: cta('Browse templates', '/learn') },
          { icon: icons.branch, title: 'Convert what you have', body: 'Import existing dashboards and turn them into reviewable chart files with a guided conversion tool.', cta: cta('Start converting', '/learn') },
        ],
      },
      {
        type: 'ctaCard',
        title: 'Put your dashboards under version control', // 41/2
        body: 'Charts is available on every hosted plan. Install it today and ship your first reviewed dashboard this week.',
        primary: cta('Get started', '/signup'), // 11
        tertiary: cta('Watch the launch replay', '/resources/webinars/charts-as-code'), // 21
      },
    ],
  },

  '/product/governance': {
    sections: [
      {
        type: 'heroSplit',
        stroke: 'S3',
        gradient: 'gradient-01',
        title: 'Governance that keeps pace with your data team', // 25/2
        lead: 'Set clear ownership, access rules and quality standards without slowing anyone down.', // 86/2
        primary: dialog('Choose where to start today'), // 25
        secondary: cta('Talk to an expert', '/contact'), // 17
        framed: crop(heroes.catalog, 594, 594),
      },
      {
        type: 'feat',
        variant: 'A',
        wash: false,
        title: 'Control that does not get in the way', // 34
        body: 'Policies sit in the project beside the models they guard, which makes doing the right thing the simplest option for each builder.', // 124/1
        cards: [
          { icon: icons.user, title: 'Clear ownership', body: 'Every model and metric has a named owner, so questions and incidents reach the right person on the first try.' }, // 15-24 / 104-122
          { icon: icons.lock, title: 'Access that follows roles', body: 'Grant permissions by group and environment, and let them follow people automatically as they change teams.' },
          { icon: icons.badge, title: 'Standards enforced in review', body: 'Contracts, required tests and naming rules are checked on every pull request before a change can merge.' },
        ],
      },
      {
        type: 'split',
        variant: 'textLeft',
        cols: '7/5',
        title: 'Know who owns every number', // 27
        // 272/3
        paragraphs: ['Owners, descriptions and certification status are part of each model’s definition. The catalog shows them next to lineage and health, so anyone deciding whether to rely on a table can see who maintains it, how fresh it is and whether its tests passed on the latest run.'],
        primary: cta('Explore catalog', '/product/catalog'), // 14
        tertiary: cta('Read guide', '/learn'), // 11
        media: crop(splits.catalog, 506, 329),
      },
      {
        type: 'split',
        cols: '5/7',
        title: 'Contracts for shared data', // 22
        // 278/3
        paragraphs: ['A contract declares the columns, types and guarantees a model promises to the teams that depend on it. Breaking changes are caught in review, and versioned models give downstream teams time to migrate on their own schedule instead of discovering a problem in production.'],
        primary: cta('Learn more', '/product/mesh'), // 11
        tertiary: cta('Read the documentation on contracts', '/learn'), // 31
        media: sq(heroes.mesh, 506),
      },
      {
        type: 'split',
        variant: 'textLeft',
        cols: '7/5',
        title: 'Audit everything, easily', // 22
        // 258/3
        paragraphs: ['Every deployment, permission change and sign-in is recorded with who did it and when. Export the log for your security tools, or search it directly when an auditor asks how a figure in last quarter’s report was produced and who approved the change.'],
        primary: cta('Talk to us about compliance today', '/contact'), // 33
        media: crop(splits.deploy, 506, 343),
      },
      {
        type: 'split',
        cols: '5/7',
        title: 'Policies for people and agents', // 25
        // 266/3
        paragraphs: ['Assistants and automated agents follow the same access rules as the people who use them. They can only read the projects and environments their user can reach, and every request they make is logged, so adopting AI does not mean opening a new back door to your data.'],
        primary: cta('See how agents are governed', '/product/analyst'), // 32
        media: sq(tabsDark[8], 506),
      },
      {
        type: 'custTabs',
        title: 'Governed at scale by leading teams', // 28
        body: 'See how organizations with strict requirements keep their data both accessible and controlled.', // 94/2
        stories: [
          story({
            name: 'Halcyon', // 5-11
            logo: customers.halcyon,
            to: '/case-studies/halcyon',
            headline: 'Lineage on every regulated figure, ready for the next audit', // 59/3
            quote: 'Auditors asked where each figure came from and we could simply show them the lineage, the tests and the approvals.', // 161/4
            person: 'Grace Okafor',
            role: 'Chief Data Officer',
            stats: [
              { number: '0', label: 'audit findings on lineage or change control in the most recent external review of the project' }, // 91-96
              { number: '100%', label: 'of regulated reports built on reviewed, tested and owned models with a clear audit trail' },
            ],
          }),
          story({
            name: 'Basalt',
            logo: customers.basalt,
            to: '/case-studies/basalt-health',
            headline: 'One governed model feeding both clinical and finance teams',
            quote: 'Clinical and finance teams now read the same bed counts from one model, with access rules that keep patient detail where it belongs.',
            person: 'Dr. Mei Lin',
            role: 'Director, Clinical Informatics',
            stats: [
              { number: '24', label: 'hospitals reporting capacity from one tested model with role-based access for every team' },
              { number: '45%', label: 'faster monthly reporting once clinical and finance teams shared one governed definition' },
            ],
          }),
          story({
            name: 'Meridian',
            logo: customers.meridian,
            to: '/case-studies/meridian-partners',
            headline: 'Eleven desks, one set of definitions and one access policy',
            quote: 'Every desk reads the same tested definitions, and permissions follow people automatically when they move between regions.',
            person: 'Tomas Ekberg',
            role: 'Director of Data Platforms',
            stats: [
              { number: '11', label: 'regional desks reporting from one governed project with consistent access rules in place' },
              { number: '4d', label: 'saved on every quarterly close because no one reconciles competing spreadsheets anymore' },
            ],
          }),
          story({
            name: 'Ferrocene',
            logo: customers.ferrocene,
            headline: 'Clear owners for every model across nine manufacturing plants',
            quote: 'When a forecast looks odd, planners see the owner, the tests and the source right next to the number and know who to ask.',
            person: 'Lukas Brenner',
            role: 'Manager, Operations Analytics',
            stats: [
              { number: '9', label: 'plants feeding a single versioned forecast, with a named owner for every model in the chain' },
              { number: '35%', label: 'less time preparing data before each planning cycle after ownership and tests were added' },
            ],
          }),
        ],
      },
      {
        type: 'ctaBand',
        title: 'Make governance the easy path', // 23
        // 178/2
        body: 'See how Lattice builds ownership, access control, contracts and auditing into the everyday workflow, so following the rules takes less effort than working around them.',
        primary: cta('Book a governance workshop', '/contact'), // 27
        secondary: cta('Choose where to begin now', '/signup'), // 25 (a <button> on the original)
      },
    ],
  },

  '/product/integrations': {
    sections: [
      {
        type: 'heroCenter',
        stroke: 'S9',
        title: 'Integrations for Lattice', // 24/1
        // 188/2
        lead: 'Lattice works with the platforms, ingestion tools, orchestrators, catalogs and BI tools your team already relies on. Browse the integrations below, grouped by where they fit in your workflow.',
        primary: dialog('Choose how to start'), // 20 (opens the developer-path dialog, C-20)
        secondary: cta('Request a new integration', '/contact'), // 29
      },
      ...directory(),
      { type: 'stats', ...statsT2 },
      {
        type: 'resources',
        title: 'Get more from your integrations', // 28
        cards: res(['controlPlane', 'showcase', 'charts'], [
          'Coordinating many tools around one shared data layer',
          'Launch showcase: new connectors this season',
          'Charts as code, live',
        ], [
          'How a shared context layer keeps ingestion, orchestration and BI tools in sync.',
          'Product leads walk through the newest connectors and what they unlock.',
          'Keep dashboards beside the models that power them, reviewed with their SQL.',
        ]),
      },
      {
        type: 'ctaBand',
        wide: true,
        eyebrow: 'Get started',
        title: 'Connect your tools and start building today', // 39
        body: 'Start a free trial with the integrations you already use, or ask our team about a connector you need.',
        primary: cta('Start free', '/signup'),
        secondary: cta('Contact sales', '/contact'),
      },
    ],
  },

  '/product/analyst': {
    sections: [
      {
        type: 'heroCenter',
        stroke: 'S4',
        gradient: 'gradient-01',
        eyebrow: 'Lattice Analyst', // 18
        title: 'Replies leaders can rely on, rooted in the models you certify', // 61/3
        // 156/2
        lead: 'Type an everyday question and receive a reply assembled from certified models and metrics, shipped together with its lineage and query so anyone can verify it.',
        primary: cta('Request access', '/contact'), // 17
        secondary: cta('Watch the overview', '#overview'), // 20
        illustration: illus.analyst,
      },
      logoBar('Teams that already use Lattice to give everyone reliable answers to their own questions'), // 66
      {
        type: 'split',
        id: 'overview',
        eyebrow: 'See the analyst answer questions', // 30
        title: 'From a question to a verified answer', // 34/2
        poster: misc.poster2,
        paragraphs: ['Watch the analyst take a question from a sales lead, find the right certified metric, write the query and explain the answer with a link to every model it used.'], // 171/2
        primary: cta('Book a demo of the analyst for your team', '/contact'), // 39
      },
      {
        type: 'checklist',
        variant: 'split',
        pt0: false,
        eyebrow: 'Grounded in context', // 19
        title: 'Answers built on the models and metrics you trust', // 58/2
        // 265/3
        body: 'General-purpose chatbots guess at table meanings and invent joins. The analyst reads your project’s descriptions, tests, owners and certified metrics first, then writes queries against the same definitions your dashboards use, so its numbers match the ones leaders already see.',
        items: [
          { icon: icons.target, title: 'Uses certified metrics before raw tables' }, // 45-71
          { icon: icons.branch, title: 'Shows the lineage behind every answer it gives' },
          { icon: icons.search, title: 'Explains its reasoning and the SQL it ran' },
        ],
        image: crop(splits.semanticLayer, 506, 284),
      },
      {
        type: 'tabsDark',
        stroke: 'S9',
        title: 'Built for the questions people actually ask', // 39/2
        // 226/4
        body: 'Ask follow-ups, compare periods, break results down by any dimension and save useful answers for later. The analyst keeps track of the conversation, so each new question builds on the last one without starting over from scratch.',
        tabs: [
          { title: 'Ask in plain language', body: 'Type a question the way you would ask a colleague and get a chart, a table and a short written summary in return.', media: tabsDark[5] },
          { title: 'Follow up naturally', body: 'Ask why a number moved, filter to a region or compare with last year without restating the original question.', media: tabsDark[7] },
          { title: 'Check the working', body: 'Open the SQL, the metrics and the models behind any answer, and see the tests that passed on the latest run.', media: tabsDark[4] },
          { title: 'Share with confidence', body: 'Save an answer to a shared space or send it to a channel, complete with the context someone needs to verify it.', media: tabsDark[8] },
        ],
      },
      {
        type: 'feat',
        variant: 'D',
        eyebrow: 'Why teams choose the analyst', // 31
        title: 'Self-serve answers without losing control of the numbers', // 48/2
        // 186/2
        body: 'Data teams stay in charge of definitions and access, while everyone else gets fast, consistent answers. Fewer one-off requests reach the queue, and the ones that do are better questions.',
        primary: cta('Request access', '/contact'), // 13
        cards: [
          { icon: icons.target, title: 'Consistent with the dashboards leaders use' }, // 37-53
          { icon: icons.lock, title: 'Respects every access rule you have already set' },
          { icon: icons.clock, title: 'Answers in seconds instead of days in a queue' },
          { icon: icons.search, title: 'Every answer comes with the evidence to check it' },
        ],
      },
      {
        type: 'checklist',
        variant: 'split',
        eyebrow: 'For data teams',
        title: 'Stay in control of definitions and access',
        body: 'Decide which models and metrics the analyst may use, review the questions people ask, and improve descriptions where answers fall short. Every query respects the permissions of the person asking.',
        items: [
          { icon: icons.badge, title: 'Choose which certified models are in scope' },
          { icon: icons.clipboard, title: 'Review question logs to find gaps in your docs' },
          { icon: icons.lock, title: 'Apply existing access rules to every query' },
        ],
        image: sq(tabsDark[3], 506),
      },
      {
        type: 'quoteBand',
        stroke: true,
        quotes: [
          { logo: customers.tidepool, quote: 'Our product managers ask the analyst before they file a ticket, and most of the time the answer they get matches the dashboard exactly. When it does not, the lineage shows us which description to improve, so the next answer is better for everyone who asks a similar question.', person: 'Ana Kowalski', role: 'Staff Data Engineer, Tidepool' }, // 259-321
          { logo: customers.halcyon, quote: 'We could not allow a tool that guessed at regulated figures. Because the analyst only uses certified metrics and shows its SQL, our risk team approved it after one review, and finance now uses it daily for variance questions that used to take an afternoon.', person: 'Grace Okafor', role: 'Chief Data Officer, Halcyon' },
        ],
      },
      {
        type: 'checklist',
        variant: 'split',
        imageLeft: true,
        eyebrow: 'For business teams',
        title: 'Get answers without waiting in a queue',
        body: 'Ask about pipeline, revenue, usage or operations and get a clear answer with a chart in seconds. When you need more detail, ask a follow-up or open the SQL to share with an analyst.',
        items: [
          { icon: icons.chart, title: 'Charts and summaries generated for every answer' },
          { icon: icons.team, title: 'Share answers with teammates in a single click' },
          { icon: icons.bell, title: 'Save questions and get notified when numbers move' },
        ],
        image: sq(tabsDark[6], 506),
      },
      {
        type: 'checklist',
        variant: 'split',
        eyebrow: 'For leaders',
        title: 'One version of the truth across every team',
        body: 'Because the analyst reads the same certified definitions as your dashboards, leaders get consistent numbers whether they open a report, ask a question or read a weekly summary.',
        items: [
          { icon: icons.target, title: 'The same metric definitions everywhere you look' },
          { icon: icons.clock, title: 'Weekly summaries delivered automatically by email' },
          { icon: icons.shield, title: 'Every answer traceable back to its source rows' },
        ],
        image: sq(tabsDark[1], 506),
      },
      {
        type: 'split',
        title: 'Getting started takes an afternoon, not a quarter', // 35/2
        poster: misc.poster1,
        paragraphs: [
          'Connect the analyst to an existing Lattice project, choose the certified models it may use and invite a pilot group.',
          'Most teams follow three simple steps:',
        ],
        bullets: [
          { lead: 'Certify', text: 'the models and metrics in scope.' },
          { lead: 'Describe', text: 'key columns in plain language.' },
          { lead: 'Invite', text: 'a pilot team and review their questions.' },
        ],
      },
      {
        type: 'testiSlider',
        eyebrow: 'Results from early customers', // 27
        title: 'Teams getting faster answers from the data they already trust', // 50/4
        body: 'Early customers are cutting request queues and giving more people direct access to reliable numbers every day.', // 116/3
        cta: cta('Request access for your team', '/contact'), // 25
        cards: [
          { type: 'quote', logo: customers.orbitly, quote: 'The analyst answers the routine questions, which leaves our team free for the hard ones. Sales leaders used to wait two days for a pipeline breakdown; now they ask, check the lineage and move on. Our request queue shrank by half in the first month, and the questions that still reach us are the interesting ones that need a person.', person: 'Jonah Reyes', role: 'VP, Data and Insights', cta: cta('Read the story', '/case-studies') },
          { type: 'metric', logo: customers.tidepool, metric: '5x', line: 'more people asking questions of trusted data each week, with no growth in the request queue', cta: cta('Read the story', '/case-studies') },
          { type: 'quote', logo: customers.kestrel, quote: 'Answers match our dashboards because they use the same metrics. That consistency is what won our leadership team over.', person: 'Priya Raman', role: 'Head of Analytics Engineering', cta: cta('Read the story', '/case-studies/kestrel') },
          { type: 'quote', logo: customers.basalt, quote: 'Clinical managers get capacity answers in seconds, and every one of them is traceable to the source.', person: 'Dr. Mei Lin', role: 'Director, Clinical Informatics', cta: cta('Read the story', '/case-studies/basalt-health') },
        ],
      },
      {
        type: 'intTiles',
        eyebrow: 'Works where you work', // 21
        title: 'Ask questions from the tools your teams open every single morning', // 60/3
        // 176/3
        body: 'Use the analyst in chat, in your browser, in spreadsheets or inside your BI tool. Answers carry the same certified definitions wherever the question is asked.',
        cta: cta('See every integration', '/product/integrations'), // 20
        tiles: [
          { icon: intMarks[0], label: 'Chatline' }, // 6-10
          { icon: intMarks[4], label: 'Sheetly' },
          { icon: intMarks[8], label: 'Boardroom' },
          { icon: intMarks[12], label: 'Notewell' },
          { icon: intMarks[16], label: 'Lensboard' },
          { icon: intMarks[20], label: 'Browser' },
        ],
      },
      {
        type: 'ctaCard',
        title: 'Give everyone answers they can trust and verify', // 46/2
        // 213/3
        body: 'Request access to Lattice Analyst and see how it performs on your own certified models. We will help you choose a pilot group, set the scope and review the first week of questions together.',
        primary: cta('Request access', '/contact'),
        tertiary: cta('Talk to sales', '/contact'),
      },
      {
        type: 'resources',
        eyebrow: 'Go further', // 11
        title: 'Resources for building trustworthy AI', // 40
        cards: res(['controlPlane', 'report', 'lifecycle'], [
          'Why shared context matters for analytics agents', // 37-63
          'What data teams told us about AI adoption this year',
          'Certifying the models your assistant is allowed to use',
        ]),
      },
      {
        type: 'ctaBand',
        eyebrow: 'Get started', // 11
        wide: true,
        title: 'Bring trusted answers to every team', // 40
        body: 'Request access to Lattice Analyst and run a pilot on your own certified models with a small group of your colleagues.', // 121
        primary: cta('Request access', '/contact'),
        secondary: cta('Talk to sales', '/contact'),
      },
    ],
  },

  '/product/self-hosted-vs-platform': {
    sections: [
      {
        type: 'heroCenter',
        stroke: 'S3',
        gradient: 'gradient-01',
        eyebrow: 'Open engine or the hosted platform', // 31
        title: ['Run the open engine yourself', 'or use the hosted platform?'], // 30 + 21
        lead: [
          'Both options run the same engine on the same files. The difference is what a team needs around it,', // 111
          'from scheduling and alerts to access control, a catalog and support.', // 83
        ],
        primary: cta('Start free', '/signup'), // 11
        secondary: cta('Talk to sales', '/contact'), // 16
      },
      {
        type: 'feat',
        variant: 'E',
        wash: false,
        iconSize: 56,
        eyebrow: 'Why teams switch', // 16
        title: 'What changes after you switch', // 41
        body: 'Teams that move from a self-managed setup to the hosted platform report gains in speed, reliability and the time engineers spend on infrastructure.', // 138/2
        cards: [
          { icon: icons.gauge, stat: '3x', label: 'faster onboarding for new analysts joining a project' }, // 3-6 / 28-53
          { icon: icons.clock, stat: '40%', label: 'less engineering time spent maintaining infrastructure' },
          { icon: icons.shield, stat: '99.9%', label: 'job success rate reported across hosted plans' },
        ],
      },
      {
        type: 'journey',
        eyebrow: 'The typical path teams follow as they grow', // 34
        title: 'Where does your team sit today?', // 33/1
        body: 'Most teams start with the open engine on a laptop and add infrastructure as more people depend on their work.', // 111/1
        axis: ['Effort to run', 'Confidence in your data'],
        columns: [
          {
            title: 'Getting started',
            lines: [
              { label: 'Team:', value: 'one or two builders' },
              { label: 'Runs:', value: 'from a laptop when needed' },
              { label: 'Checks:', value: 'a few tests run by hand' },
            ],
            badge: { tone: 'green', label: 'Works well at this size' },
          },
          {
            title: 'Growing',
            lines: [
              { label: 'Team:', value: 'several builders, more readers' },
              { label: 'Runs:', value: 'a cron job on a shared server' },
              { label: 'Checks:', value: 'tests in a basic CI pipeline' },
            ],
            badge: { tone: 'yellow', label: 'Starting to strain' },
          },
          {
            title: 'Scaling up',
            lines: [
              { label: 'Team:', value: 'many teams and stakeholders' },
              { label: 'Runs:', value: 'a homegrown orchestration stack' },
              { label: 'Checks:', value: 'scattered across tools' },
            ],
            missing: ['No shared catalog', 'Manual access control', 'Alerts that go unseen', 'Upgrades take weeks'],
          },
        ],
        highlight: {
          mark: lockups.mark,
          title: 'Hosted Lattice',
          lines: [
            { label: 'Team:', value: 'everyone, from builders to agents' },
            { label: 'Runs:', value: 'scheduled and state-aware' },
            { label: 'Checks:', value: 'on every change, automatically' },
          ],
          items: ['Catalog and lineage', 'Role-based access', 'Alerts to owners', 'Managed upgrades'],
        },
      },
      {
        type: 'personaTabs',
        tabs: [
          {
            label: 'Engineers', // 7-13
            icon: icons.grid,
            cards: [
              { kind: 'before', chip: 'before', label: 'Self-managed', title: 'Maintaining the plumbing yourself', items: ['Patch and upgrade the engine on every server by hand, then hope nothing breaks', 'Write and babysit custom scripts that schedule and retry jobs overnight', 'Build your own alerting and dig through logs when something fails', 'Field access requests one by one and track them in a spreadsheet'] },
              { kind: 'after', chip: 'after', label: 'Hosted platform', title: 'Spending time on the models', items: ['Upgrades roll out automatically with release notes and a safe rollback', 'Jobs, retries and state-aware builds are configured in a few clicks', 'Failures alert the right owner with the error and the lineage attached', 'Access follows roles and groups from your identity provider by default'] },
            ],
          },
          {
            label: 'Analysts',
            icon: icons.chart,
            cards: [
              { kind: 'before', chip: 'before', label: 'Self-managed', title: 'Waiting on the setup', items: ['Install tools locally and ask an engineer when the environment breaks', 'Wait for someone else to run a job before you can see your changes', 'Hunt for the right table without descriptions, owners or lineage', 'Copy queries between tools and hope the definitions still match'] },
              { kind: 'after', chip: 'after', label: 'Hosted platform', title: 'Building from the browser', items: ['Open the browser editor or canvas and start building with no setup at all', 'Preview results instantly and open a pull request when you are ready', 'Search the catalog for certified models with owners and descriptions', 'Use shared metrics that match every dashboard across the company'] },
            ],
          },
          {
            label: 'Data leaders',
            icon: icons.target,
            cards: [
              { kind: 'before', chip: 'before', label: 'Self-managed', title: 'Hidden costs adding up', items: ['Engineers spend their weeks on infrastructure instead of data products', 'No clear view of what runs, how long it takes or what it costs', 'Security reviews stall on questions nobody can answer quickly', 'Knowledge lives in the heads of one or two senior people'] },
              { kind: 'after', chip: 'after', label: 'Hosted platform', title: 'Visibility and control', items: ['Engineering time goes back into the models the business depends on', 'Run history, costs and health are visible to everyone who needs them', 'Single sign-on, audit logs and certifications answer security questions', 'Documentation and lineage make the project easy for anyone to pick up'] },
            ],
          },
        ],
      },
      {
        type: 'testiSlider',
        title: 'Teams that made the move to the hosted platform', // 34/3
        cards: [
          { type: 'metric', logo: customers.orbitly, metric: '62%', line: 'lower warehouse spend after switching to hosted state-aware jobs', cta: cta('Read the story', '/case-studies') },
          { type: 'quote', logo: customers.kestrel, quote: 'We retired a homegrown scheduler and a pile of scripts. Our engineers got their evenings back, upgrades stopped being a quarterly project, and new analysts shipped reviewed models from the browser in their very first week.', person: 'Priya Raman', role: 'Head of Analytics Engineering', cta: cta('Read the story', '/case-studies/kestrel') },
          { type: 'metric', logo: customers.fernway, metric: '1 week', line: 'for a new analyst to ship a first reviewed model from the browser', cta: cta('Read the story', '/case-studies') },
          { type: 'quote', logo: customers.meridian, quote: 'Moving to the platform gave our auditors the access logs they had been asking for, with no extra work.', person: 'Tomas Ekberg', role: 'Director of Data Platforms', cta: cta('Read the story', '/case-studies/meridian-partners') },
          { type: 'metric', logo: customers.halcyon, metric: '0', line: 'audit findings on change control in the first review after migrating', cta: cta('Read the story', '/case-studies/halcyon') },
          { type: 'quote', logo: customers.tidepool, quote: 'Product managers browse the catalog themselves now. Our queue of simple requests all but disappeared.', person: 'Ana Kowalski', role: 'Staff Data Engineer', cta: cta('Read the story', '/case-studies') },
        ],
      },
      logoBar('Platform customers across every industry'), // 42
      {
        type: 'statement',
        eyebrow: 'Side by side', // 11
        asSpan: true,
        title: 'Compare every feature in detail', // 32/1
        body: 'The tables below show what each option includes out of the box today.', // 72/1
      },
      table('Building and developing models', [
        ['Write models in SQL and Python', true, true],
        ['Browser-based editor', null, true],
        ['Visual modeling canvas', null, true],
        ['Desktop editor extension', true, true],
        ['Built-in assistant', 'Bring your own model provider keys', true],
        ['Preview results while you type', 'Requires a local warehouse connection', true],
        ['Project-aware autocomplete', true, true],
        ['Linting and formatting', 'Configure and run yourself', true],
        ['Shared development environments', null, true],
        ['Packages from the community hub', true, true],
      ]),
      table('Testing and quality', [
        ['Data tests on every model', true, true],
        ['Unit tests for model logic', true, true],
        ['Checks on every pull request', 'Your own CI setup', true],
        ['Source freshness monitoring', 'Self-scheduled', true],
        ['Alerts routed to model owners', null, true],
        ['Test history and trends', null, true],
      ]),
      table('Running and deploying', [
        ['Run models from the command line', true, true],
        ['Scheduled jobs', 'Your own scheduler', true],
        ['State-aware builds', 'Manual artifacts', true],
        ['Automatic retries', null, true],
        ['Separate environments', 'Hand-set profiles', true],
        ['Run history and logs', null, true],
        ['Managed upgrades', null, true],
        ['Cost and runtime insights', null, true],
        ['Job webhooks and APIs', null, true],
      ]),
      table('Discovery and metrics', [
        ['Generated documentation site', 'You build, host and refresh the static site on your own servers', true],
        ['Searchable catalog with lineage', 'Lineage graph only, generated with the docs and not searchable', true],
        ['Shared metric definitions', 'Definitions only, with no serving layer', true],
        ['Metrics served to BI tools and agents', null, true],
      ]),
      table('Security, administration and support', [
        ['Single sign-on', null, true],
        ['Role-based access control', null, true],
        ['Audit logs', null, true],
        ['Private networking', null, true],
        ['Regional hosting choices', null, true],
        ['Independent security audits', null, true],
        ['Data processing agreement', null, true],
        ['Encryption at rest and in transit', 'Your own setup', true],
        ['Usage analytics for administrators', null, true],
        ['Community forum support', true, true],
        ['Support with response targets', null, true],
        ['Dedicated account team', null, 'Enterprise plans'],
        ['Uptime commitment', null, 'Enterprise plans'],
      ]),
      {
        type: 'ctaBand',
        eyebrow: 'Get started', // 11
        wide: true,
        title: 'Try the hosted platform with your project', // 37
        body: 'Bring an existing project from the open engine and run it on the hosted platform in minutes.',
        primary: cta('Start free', '/signup'),
        secondary: cta('Talk to sales', '/contact'),
      },
    ],
  },
}
