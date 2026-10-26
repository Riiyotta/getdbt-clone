// T1 product feature pages (specs/T1-T4.md "T1"), keyed by route path.
// Original placeholder copy for "Lattice"; per-block lengths follow the spec (noted where useful).
import { customers, heroes, icons, splits, tabsDark } from '../../pageAssets'
import { asideCommunity, cta, editStory, pickResources, pickStories, withSummary } from './shared'

const demo = cta('Book a demo', '/contact')
const expert = cta('Speak to an expert', '/contact') // 18
const lifecycleCta = cta('Read the lifecycle guide', '/resources/analytics-lifecycle') // 24
const closing = (title, body) => ({
  type: 'ctaBand',
  title,
  body,
  primary: cta('Book your demo', '/contact'),
  secondary: cta('Explore Lattice', '/product/lattice'),
  aside: asideCommunity,
})
// per-page title / paragraph lengths for resource cards (null keeps the pool text)
const tuneCards = (cards, titles = [], bodies = []) =>
  cards.map((c, i) => ({ ...c, title: titles[i] ?? c.title, body: bodies[i] === undefined ? c.body : bodies[i] || undefined }))
const ctaCard = (title, body) => ({
  type: 'ctaCard',
  title,
  body,
  primary: demo, // 11
  tertiary: cta('See Lattice', '/product/lattice'), // 11
})
const custTabs = (...keys) => ({
  type: 'custTabs',
  title: 'Used by teams who ship daily', // 27
  body: 'See how leading teams turn raw data into decisions daily.', // 55
  stories: pickStories(...keys),
})

export default {
  // ------------------------------------------------------------------ representative page
  '/product/develop': {
    sections: [
      {
        type: 'heroSplit',
        stroke: 'S5',
        gradient: 'gradient-05',
        title: 'Build quickly. Ship confidently.', // 32, 2 lines
        lead: 'Give every data practitioner the tools to build trusted pipelines.', // 68
        primary: cta('Start developing', '/contact'), // 16 (a modal <button> on the original; spec: link to contact)
        secondary: expert,
        media: heroes.develop,
      },
      {
        type: 'split',
        eyebrow: 'The modeling lifecycle, start to end', // 35
        title: 'Develop faster on Lattice', // 24
        paragraphs: [
          // 199
          'Development is the stage of the modeling lifecycle where a question becomes a dependable model. Whether your team prefers a terminal or a visual canvas, Lattice meets each builder where they work.',
          // 166
          'Explore the browser editor, the visual canvas, the desktop extension and the built-in assistant, and see how each one helps your team write, test, document and ship models faster.',
        ],
        primary: lifecycleCta,
        media: splits.develop,
      },
      {
        type: 'feat',
        variant: 'A',
        eyebrow: 'Build on Lattice', // 16
        title: 'One platform, many ways to build', // 1 line at 1440 and 1280
        // 440, 4 lines
        body: 'Beginners and veterans alike get an editor that suits the way they already like to write their SQL. The desktop extension gives seasoned engineers the editor they already know, the browser editor equips SQL-fluent analysts to work without any local setup, and the visual canvas lets anyone assemble a model by dragging sources and joins into place. Every path produces the same reviewable code, tests and docs.',
        cards: [
          {
            icon: icons.team,
            title: 'Smooth collaboration between teams', // 35
            // 261
            body: 'Lattice lets people with very different skill sets build in one shared project. Engineers, analysts and domain experts each pick the interface that suits them, while reviews, tests and conventions keep the work consistent and the ownership of each model clear.',
          },
          {
            icon: icons.rocket,
            title: 'Faster onboarding and skill growth for all', // 43
            // 310
            body: 'Guided interfaces, built-in conventions and a library of learning paths help new builders get productive quickly. Whether someone is writing a first model or taking on a larger slice of the project, Lattice lowers the barrier to entry and helps every contributor grow into the habits of analytics engineering.',
          },
          {
            icon: icons.shield,
            title: 'Security and governance', // 23
            // 247
            body: 'Admins can enforce governance with contracts, model versions and access controls built in. You also get the enterprise features you expect from serious software, including single sign-on, role-based permissions and audit logs, ready from day one.',
          },
        ],
      },
      {
        type: 'tabsDark',
        title: 'Features for building reliable data pipelines.', // 47, 2 lines
        // 139
        body: 'Lattice brings together a set of tools that speed up development, make collaboration easier and protect data quality across every team in your organization.',
        tabs: [
          {
            title: 'The visual canvas opens modeling to every analyst', // 45, 2 lines
            // 252
            body: 'Let anyone comfortable with SQL concepts assemble models by dragging sources, joins and aggregations onto a canvas. Every step compiles to clean SQL and inherits exactly the same tests, documentation, peer review and version control as any model written by hand in an editor.',
            media: tabsDark[1],
          },
          {
            title: 'The browser editor', // 14-18
            body: 'Write, preview and run models from any browser with no local setup. Autocomplete knows your project and warehouse schema, inline previews show results as you type, and every change lands on its own branch that is ready for review, testing and merge into production.',
            media: tabsDark[2],
          },
          {
            title: 'The desktop extension keeps power users in the editor they already know', // 78
            body: 'Bring Lattice into your favorite desktop editor. Get project-aware autocomplete, compile-time checks, lineage on hover and one-click previews, so experienced engineers move quickly without ever leaving the shortcuts and settings they already rely on every day.',
            media: tabsDark[4],
          },
          {
            title: 'An assistant that speeds up development with AI',
            body: 'Describe what you need in plain language and the assistant drafts models, tests and documentation grounded in your project’s context. Review the suggestion, adjust it and commit, with every generated line held to exactly the same review and testing standards as the rest of the project.',
            media: tabsDark[5],
          },
          {
            title: 'Keep code quality and consistency high wherever you build',
            body: 'Linting, formatting and project conventions run automatically in every interface, so models written on the canvas, in the browser or on a laptop all look alike. Reviewers spend their time on logic rather than style, and the codebase stays easy for anyone to read and extend.',
            media: tabsDark[3],
          },
        ],
      },
      ctaCard(
        'Build better with Lattice.', // 22-50
        'Teams lean on Lattice to turn tables into reviewed, documented models, from one project to many.', // 81-97
      ),
      // the original's second story has shorter stat labels (2 lines / 1 line), so the section
      // drops from 935 to 851 at 1440 when that tab is selected
      editStory(custTabs('kestrel', 'fernway'), 'fernway', {
        stats: [
          { number: '1 wk', label: 'for a new analyst to ship a first tested model' },
          { number: '600', label: 'legacy scripts retired' },
        ],
      }),
      {
        type: 'resources',
        eyebrow: 'More resources', // 10-20
        title: 'Go deeper on everyday building in Lattice.', // 39, 1 line
        // third card is title-only on the original (2-line title, no paragraph)
        cards: pickResources('quickstart', 'canvas', 'editor').map((c, i) => (i === 2 ? { ...c, body: undefined } : c)),
      },
      closing(
        'Start developing with Lattice.', // 26-64, 1 line
        'Pick whichever editor suits you and push tested models to production in far fewer steps.', // 76-129
      ),
    ],
  },

  // ------------------------------------------------------------------ members
  '/product/test-and-observe': {
    sections: [
      {
        type: 'heroSplit',
        stroke: 'S5',
        gradient: 'gradient-05',
        title: 'Catch problems before users do.',
        lead: 'Test, monitor and alert on every model so bad data never ships.',
        primary: cta('Start testing', '/signup'),
        secondary: expert,
        media: heroes.testAndObserve,
      },
      {
        type: 'split',
        eyebrow: 'The modeling lifecycle: test, then watch',
        title: 'Test and observe on Lattice',
        paragraphs: [
          'Testing is the stage of the lifecycle where assumptions become guarantees. Lattice runs checks on every model as it builds, so broken joins, missing rows and stale sources surface before a dashboard does.',
          'Explore built-in tests, freshness monitors, alerting and lineage-aware triage, and see how they help teams find the cause of a data issue in minutes.',
        ],
        primary: lifecycleCta,
        media: splits.testAndObserve,
      },
      {
        type: 'feat',
        variant: 'B',
        eyebrow: 'Quality on Lattice',
        title: 'Quality checks built into every step you take', // 45
        body: 'Quality checks in Lattice sit in the same project as your SQL. Each check is versioned with its model, runs automatically on every pull request and scheduled job, and points straight to the failing rows plus the upstream edit that broke them.',
        cards: [
          {
            icon: icons.badge,
            title: 'Tests that travel with the code',
            body: 'Declare uniqueness, accepted values, relationships and custom rules beside each model. They run in development, in review and in production, so the same guarantee holds everywhere the model is built.',
          },
          {
            icon: icons.bell,
            title: 'Alerts that reach the right owner',
            body: 'Route failures and freshness warnings to the team that owns the model, in the channel they already watch. Every alert links to the failing rows, the run log and the change that most likely caused it.',
          },
          {
            icon: icons.search,
            title: 'Triage with full lineage',
            body: 'Follow an issue upstream to its source and downstream to every affected dashboard, then decide whether to pause, fix or notify before anyone opens a broken report.',
          },
        ],
      },
      {
        type: 'tabsDark',
        title: 'Observability built in',
        body: 'From a single failing test to a late source feed, Lattice shows what broke, why it broke and who needs to know, all in one place.',
        tabs: [
          {
            title: 'Run checks on every build, every day',
            body: 'Tests execute alongside each model in development, in pull requests and in production jobs. A failing check stops bad data from flowing downstream and records the exact rows that broke the rule.',
            media: tabsDark[3],
          },
          {
            title: 'Track health trends over time',
            body: 'See pass rates, run durations and freshness for every model on one timeline. Spot the model that slows down a little each week or the source that arrives later each day, long before either becomes an incident.',
            media: tabsDark[7],
          },
          {
            title: 'Know exactly when every job ran and what it touched',
            body: 'Each run records which models were built, reused or skipped, how long each took and which tests passed. Answer "is today’s data ready?" without a single message to the data team.',
            media: tabsDark[6],
          },
        ],
      },
      ctaCard('Ship data your team can trust.', 'Put tests, monitors and alerts on every model and stop finding out about issues from stakeholders.'),
      custTabs('halcyon', 'tidepool', 'kestrel'),
      {
        type: 'resources',
        eyebrow: 'More resources',
        title: 'Learn how teams keep data quality high.',
        cards: pickResources('blog', 'lifecycle', 'onDemand'),
      },
      closing(
        'Start catching data issues before your stakeholders do.', // 54, 2 lines
        'Add tests and monitors to the models you already have in production and see the first failures they catch within a single day.',
      ),
    ],
  },

  '/product/mesh': {
    sections: [
      {
        type: 'heroSplit',
        stroke: 'S5',
        gradient: 'gradient-01',
        title: 'Scale data work across teams.',
        lead: 'Split one large project into domains that publish and share safely.',
        primary: cta('Explore the mesh', '/signup'),
        secondary: expert,
        media: heroes.mesh,
      },
      {
        type: 'split',
        eyebrow: 'The modeling lifecycle, across domains',
        title: 'Grow from one project to many without giving up control of quality', // 62, 3 lines
        paragraphs: [
          // one paragraph on the original
          'As more teams build on the same data, one shared project turns into a bottleneck. Lattice lets each domain own its models, publish the ones others rely on and keep the rest private.',
        ],
        primary: lifecycleCta,
        media: splits.mesh,
      },
      {
        type: 'feat',
        variant: 'B',
        iconSize: 56,
        eyebrow: 'Mesh on Lattice',
        title: 'Decentralize ownership, keep one standard',
        body: 'Give each team its own project and its own pace, while shared conventions, contracts and discovery keep the whole organization working from the same agreed definitions.',
        cards: [
          {
            icon: icons.grid,
            title: 'Projects per domain',
            body: 'Split a monolith into projects owned by finance, marketing, product and more. Each team reviews and deploys its own work without waiting on a central queue.',
          },
          {
            icon: icons.key,
            title: 'Contracts and access',
            body: 'Mark models as public, protected or private, and enforce column contracts so downstream teams know exactly what they can depend on and what may change.',
          },
          {
            icon: icons.branch,
            title: 'Versions without breakage',
            body: 'Release a new model version alongside the old one, give consumers time to migrate and retire the previous version on a schedule everyone can see.',
          },
        ],
      },
      {
        type: 'tabsDark',
        title: 'Run a data mesh in practice',
        body: 'Lattice provides the guardrails that let independent teams publish, share and version models safely.',
        tabs: [
          {
            title: 'Reference models across projects',
            body: 'Build on another team’s published models as if they were your own, with lineage and docs that follow every reference across projects.',
            media: tabsDark[4],
          },
          {
            title: 'Find every public model in one catalog',
            body: 'Search across all projects for the model you need, see who owns it, how fresh it is and which contract it promises, then reference it directly from your own project in one step.',
            media: tabsDark[8],
          },
          {
            title: 'Design domains on a shared canvas',
            body: 'Map which teams own which models and where the boundaries sit before you split anything, then move models between projects with references updated for you.',
            media: tabsDark[1],
          },
          {
            title: 'Coordinate releases across teams',
            body: 'Schedule jobs that respect cross-project dependencies, so a downstream project only builds after the upstream models it relies on have finished and passed their tests.',
            media: tabsDark[6],
          },
          {
            title: 'Govern access by domain',
            body: 'Decide which models each group may reference and which stay private, then review those rules in the same pull requests as the code they protect.',
            media: tabsDark[2],
          },
        ],
      },
      closing(
        'See what a mesh could look like for your teams.',
        'Walk through your current project with a specialist and map out your first domains.',
      ),
      custTabs('meridian', 'ferrocene', 'orbitly'),
      {
        type: 'resources',
        eyebrow: 'More resources',
        title: 'Learn how teams adopt a data mesh without a big-bang migration.', // 2 lines
        cards: tuneCards(pickResources('controlPlane', 'onDemand', 'summit'), ['One shared data layer', null, 'Summit recap'], [null, 'Recorded sessions on layering, naming and testing from teams running large projects.']),
      },
      closing(
        'Start your mesh with Lattice.',
        'Give every domain its own project while keeping one standard for quality, ownership and discovery.',
      ),
    ],
  },

  '/product/catalog': {
    sections: [
      {
        type: 'heroSplit',
        stroke: 'S5',
        gradient: 'gradient-01',
        title: 'Find data you can trust, fast.',
        lead: 'Search every model, metric and owner, with lineage one click away.',
        primary: cta('Try the catalog', '/signup'),
        secondary: expert,
        media: heroes.catalog,
      },
      {
        type: 'split',
        eyebrow: 'The modeling lifecycle: discover',
        title: 'Discover and reuse what your team already built',
        paragraphs: [
          // one paragraph on the original
          'Discovery is the stage of the lifecycle where people decide whether to build something new or reuse what already exists. Lattice puts every model, column, test and owner in one searchable place, with descriptions, freshness and lineage side by side, so analysts and agents pick the right model without asking around.',
        ],
        primary: lifecycleCta,
        media: splits.catalog,
      },
      {
        type: 'feat',
        variant: 'B',
        eyebrow: 'Catalog on Lattice',
        title: 'Context that stays current because it comes straight from the code', // 63, 2 lines
        body: 'The catalog is generated from your project and refreshed on every run, so documentation, ownership and quality signals never drift from what is actually in production.',
        cards: [
          {
            icon: icons.search,
            title: 'Search across everything',
            body: 'Find models, columns, metrics and dashboards by name, description or owner in one search.',
          },
          {
            icon: icons.branch,
            title: 'Column-level lineage',
            body: 'Trace any column from its raw source through every model to the reports it feeds.',
          },
          {
            icon: icons.badge,
            title: 'Signals of trust',
            body: 'Certification, freshness and test results show which models are safe to use.',
          },
        ],
      },
      {
        type: 'tabsDark',
        title: 'Give analysts and agents a map of your data, with owners built in', // 68, 4 lines
        body: 'Lattice builds the catalog from the code, so it never drifts.',
        tabs: [
          {
            title: 'Search with context',
            body: 'Type a business term and get models, metrics and columns ranked by trust signals, with owners, freshness and test status shown inline, so the right answer is usually the first result.',
            media: tabsDark[8],
          },
          {
            title: 'Trace lineage down to the column',
            body: 'Open any model to see where each column comes from and where it goes next. Impact analysis shows every downstream asset a change would affect before the change is merged.',
            media: tabsDark[4],
          },
          {
            title: 'Monitor health across the project',
            body: 'See which models are stale, which tests are failing and which sources are late, in one view that the whole team shares instead of a dozen private dashboards.',
            media: tabsDark[3],
          },
          {
            title: 'Share context with AI tools',
            body: 'Expose descriptions, owners and certified metrics to assistants and agents, so their answers draw on the same definitions your analysts use every day.',
            media: tabsDark[5],
          },
          {
            title: 'Certify what to use',
            body: 'Mark the models people should build on, so search results lead with trusted, tested sources and older copies fade from view.',
            media: tabsDark[7],
          },
        ],
      },
      ctaCard('Know your data before you use it.', 'Give everyone a single, always-current view of models, owners, quality and lineage.'),
      {
        type: 'quoteBand',
        stroke: true,
        quotes: [
          {
            logo: customers.tidepool,
            // 382
            quote:
              'Before the catalog, the fastest way to find a model was to ask whoever had been here longest. Now analysts search, check the owner and the test status, and reference the right model in minutes. New hires stopped building duplicate tables in their first month, and our documentation finally reflects what is actually running.',
            person: 'Ana Kowalski',
            role: 'Staff Data Engineer',
          },
          {
            logo: customers.meridian,
            quote:
              'Column-level lineage changed how we review pull requests. Reviewers can see every report a change would touch before approving it, so surprises after a deploy have become rare. Auditors get the same view, which turned a week of evidence gathering into an afternoon of walking through the catalog together.',
            person: 'Tomas Ekberg',
            role: 'Director of Data Platforms',
          },
          {
            logo: customers.orbitly,
            quote:
              'We point our internal assistant at the catalog, and its answers improved overnight. It uses certified models and their descriptions instead of guessing from table names. When a definition changes, the assistant picks it up on the next run, so we no longer maintain a separate glossary that drifts away from the code.',
            person: 'Jonah Reyes',
            role: 'VP, Data and Insights',
          },
          {
            logo: customers.basalt,
            quote:
              'Clinical and finance analysts used to keep private notes on which tables to trust. The catalog replaced all of that with one shared view of owners, freshness and certification. People now start from a certified model by default, and the number of conflicting reports in leadership meetings has dropped to almost nothing.',
            person: 'Dr. Mei Lin',
            role: 'Director, Clinical Informatics',
          },
          {
            logo: customers.fernway,
            quote:
              'Retiring hundreds of legacy scripts was only possible because we could see who depended on each one. The catalog showed us every downstream report and owner, so we migrated in waves, told the right people ahead of time and switched off the old jobs without a single angry message from the business.',
            person: 'Jordan Ellis',
            role: 'Data Team Lead',
          },
        ],
      },
      {
        type: 'resources',
        eyebrow: 'More resources',
        title: 'Learn how teams make data discoverable.',
        body: 'Guides and stories from teams that turned scattered tables into a catalog people use.', // 1 line
        cards: tuneCards(pickResources('controlPlane', 'blog', 'lifecycle'), ['A shared data layer for many teams', 'How our own data team tests the platform it runs on', 'The modeling lifecycle, from first query to production'], [null, 'The checks, alerts and review habits our internal data team relies on every day.']),
      },
      closing('Start exploring your data with Lattice today.', 'Turn your project into a searchable, always-current map of models, owners and quality signals.'),
    ],
  },

  '/product/deploy': {
    sections: [
      {
        type: 'heroSplit',
        stroke: 'S4',
        gradient: 'gradient-01',
        title: 'Ship to production on autopilot.',
        lead: 'Schedule, orchestrate and promote models with checks at every step.',
        primary: cta('Start deploying', '/signup'),
        secondary: expert,
        media: heroes.deploy,
      },
      {
        type: 'split',
        eyebrow: 'The modeling lifecycle: deploy and run',
        title: 'Deploy with confidence on Lattice',
        paragraphs: [
          'Deployment is the stage of the lifecycle where reviewed code becomes the data people use every day. Lattice schedules every job, builds only what changed, promotes code between environments and alerts the right owner the moment something fails, so production keeps running while the team keeps shipping new work.',
          'Explore jobs, environments, state-aware orchestration and run history, and see how teams keep production fresh without babysitting a scheduler.',
        ],
        primary: lifecycleCta,
        media: splits.deploy,
      },
      {
        type: 'feat',
        variant: 'B',
        eyebrow: 'Deploy on Lattice',
        title: 'Production runs that take care of themselves',
        body: 'Move from hand-tuned cron jobs to orchestration that understands your project, rebuilds only what changed and tells the right people when something needs attention.',
        cards: [
          {
            icon: icons.clock,
            title: 'Jobs on any trigger',
            body: 'Run on a schedule, on merge, after an upstream source lands or from an API call, all from one place.',
          },
          {
            icon: icons.gauge,
            title: 'State-aware builds',
            body: 'Lattice compares each run with the last good state and skips models whose inputs are unchanged, so jobs finish sooner and compute goes to the work that matters.',
          },
          {
            icon: icons.layers,
            title: 'Environments that match',
            body: 'Promote from development to staging to production with the same code and tests at every step, and roll back to a previous state with a single click if needed.',
          },
        ],
      },
      {
        type: 'tabsDark',
        title: 'Orchestration designed for analytics code, not general scripts',
        body: 'Lattice knows the dependency graph of every project, so jobs run in the right order every time.',
        tabs: [
          {
            title: 'Continuous integration checks on every single pull request',
            body: 'Each pull request builds the changed models and everything downstream in an isolated schema, runs the tests and posts the results on the review, so nothing merges until it passes and reviewers see the rows that changed.',
            media: tabsDark[3],
          },
          {
            title: 'Run timelines you can read at a glance, for every job you run',
            body: 'See every model in a run laid out by layer and duration, spot the bottleneck that holds up the whole job and jump straight to its logs and compiled SQL.',
            media: tabsDark[6],
          },
          {
            title: 'Rebuild only what changed',
            body: 'State-aware orchestration reuses results for untouched models and rebuilds the rest in dependency order, cutting run times and warehouse spend without any manual selectors.',
            media: tabsDark[1],
          },
          {
            title: 'Alerts that arrive with full context',
            body: 'When a job fails, the owner gets the failing model, the error, the last change and the downstream impact in one message, and can retry from the failure point.',
            media: tabsDark[2],
          },
          {
            title: 'Promote changes between environments',
            body: 'Move reviewed code from development to staging to production with the same job definitions, so nothing behaves differently once it ships.',
            media: tabsDark[4],
          },
          {
            title: 'Schedule on any trigger',
            body: 'Run jobs on a timetable, after an upstream load lands or from an API call, and see every run in one shared history.',
            media: tabsDark[7],
          },
        ],
      },
      ctaCard('Put production on autopilot.', 'Let Lattice schedule, test and promote every change so your team can focus on building.'),
      // the original's first story here has 2-line stat labels
      editStory(custTabs('kestrel', 'orbitly', 'fernway'), 'kestrel', {
        stats: [
          { number: '52%', label: 'shorter nightly runs after moving to state-aware builds' },
          { number: '3x', label: 'more models shipped every sprint, with review built in' },
        ],
      }),
      {
        type: 'resources',
        eyebrow: 'More resources',
        title: 'Learn how teams run reliable jobs.',
        cards: tuneCards(pickResources('showcase', 'caseStudies', 'onDemand'), ['Launch showcase', null, null], ['Product leads walk through the latest release, from faster incremental builds to a refreshed lineage explorer and new alerts.', null, 'Recorded sessions on scaling projects.']),
      },
      closing('Start deploying with Lattice.', 'Ship every reviewed change to production with tests, environments and orchestration built in.'),
    ],
  },

  '/product/semantic-layer': {
    sections: [
      {
        type: 'heroSplit',
        stroke: 'S5',
        gradient: 'gradient-02',
        badge: 'Now available on every plan', // tag chip above the H1 on the original (29ch)
        title: 'One definition for every metric.',
        lead: 'Define metrics once and serve the same numbers to every tool and agent.',
        primary: cta('Define a metric', '/signup'),
        secondary: expert,
        media: heroes.semanticLayer,
      },
      {
        type: 'split',
        eyebrow: 'The modeling lifecycle: define and serve',
        title: 'Consistent metrics on Lattice',
        paragraphs: [
          'Serving is the stage of the lifecycle where models become answers. Lattice lets you define each metric once in code, review it like any other change and serve the same number to dashboards, spreadsheets, notebooks and assistants, so every tool and every team reads exactly the same figure.',
          'See how metric definitions, governed queries and caching keep every dashboard, notebook and assistant answering with the same number.',
        ],
        primary: lifecycleCta,
        media: splits.semanticLayer,
      },
      {
        type: 'feat',
        variant: 'B',
        eyebrow: 'Metrics on Lattice',
        title: 'Stop arguing about which number on the dashboard is right',
        body: 'Metric definitions live in version control, are reviewed like any other change and are served through one interface, so every consumer gets the same answer to the same question.',
        cards: [
          {
            icon: icons.target,
            title: 'Define once, in code',
            body: 'Describe measures, dimensions and filters in YAML beside your models. Every change goes through review and testing, and every consumer picks it up on the next query.',
          },
          {
            icon: icons.plug,
            title: 'Serve every tool',
            body: 'Query metrics from BI tools, spreadsheets, notebooks and applications through one governed interface, without copying logic into each of them by hand.',
          },
          {
            icon: icons.sparkle,
            title: 'Ground AI in definitions',
            body: 'Give assistants and agents certified metrics rather than raw tables, so their answers match the dashboards your leadership already relies on.',
          },
        ],
      },
      {
        type: 'tabsDark',
        title: 'A semantic layer that every team can build on',
        body: 'Lattice compiles metric requests into efficient SQL for your warehouse, applies access rules and caches results, all from definitions your team controls in code.',
        tabs: [
          {
            title: 'Query any metric by name from any connected tool',
            body: 'Ask for a metric, a time grain and a few dimensions, and Lattice writes the joins and filters for you. The result is identical whether the request comes from a dashboard, a spreadsheet, a notebook or an application calling the API, so every consumer sees one number.',
            media: tabsDark.wide,
          },
          {
            title: 'Track the health of every metric over time',
            body: 'See how each metric trends, which definitions changed recently and which consumers rely on them, so you can plan changes without breaking reports.',
            media: tabsDark[7],
          },
          {
            title: 'Answer questions with assistants',
            body: 'Connect assistants to the semantic layer so they request certified metrics by name instead of writing ad hoc SQL against raw tables.',
            media: tabsDark[5],
          },
          {
            title: 'Review metric definitions just like code changes',
            body: 'Metric changes arrive as pull requests with a preview of the numbers before and after, so owners can approve a new definition with full context.',
            media: tabsDark[2],
          },
        ],
      },
      ctaCard(
        'Give every team and every tool the same trusted numbers.', // 50, 2 lines
        'Define metrics once in Lattice and serve them everywhere decisions are made.',
      ),
      withSummary(custTabs('meridian', 'basalt', 'tidepool'), 'meridian', 'One governed metrics project replaced eleven desk-level spreadsheets, and every quarterly figure now traces back to a reviewed definition.'), // 141ch
      {
        type: 'resources',
        eyebrow: 'More resources',
        title: 'Learn how teams standardize their metrics.',
        body: 'Guides, recordings and data on serving one set of metric definitions to every tool and agent.', // 1 line
        cards: tuneCards(pickResources('charts', 'controlPlane', 'report'), ['Charts as code, defined next to the models behind them', null, 'State of data teams this year, by the numbers and trends'], ['Keep dashboards right beside the models that power them, so every chart change is reviewed right alongside its SQL.']),
      },
      closing('Define metrics with Lattice.', 'Publish one definition of every key number and serve it to dashboards, notebooks and assistants alike.'),
    ],
  },
}
