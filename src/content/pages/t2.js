// T2 solution pages (specs/T1-T4.md "T2"), keyed by route path.
// Original placeholder copy for "Lattice"; body copy runs ~15% longer than the spec's character
// counts because the Outfit substitute sets narrower than the original face (line counts match).
import { customers, heroes, icons, misc, splits, tabsAi, tabsLight } from '../../pageAssets'
import { communityLinks, communityT2, cta, pickResources, pickStories, statsT2, statsT4, withSummary } from './shared'

const demo = (label = 'Request your demo') => cta(label, '/contact') // 17
// only embedded-analytics shows a paragraph under the heading on the original
const custTabs = (title, ...keys) => ({ type: 'custTabs', title, stories: pickStories(...keys) })
const custTabsWithBody = (title, ...keys) => ({
  ...custTabs(title, ...keys),
  body: 'Hear from teams who rebuilt how they ship data with us.',
})
// data-modernization's customer tabs have no paragraph under the heading on the original; the first
// story is set to the original's lengths there (quote 6 lines, 2-line attribution and stat labels)
const custTabsNoBody = (...args) => {
  const c = custTabs(...args)
  const [first, ...rest] = c.stories
  return {
    ...c,
    stories: [
      {
        ...first,
        quote: 'We had years of scheduled scripts that only their authors understood. Rebuilding them as Lattice models gave us docs, tests and reviews for free, and new analysts now ship in week one.',
        role: 'Data Team Lead, Reporting and Analytics Platform',
        stats: [
          { number: first.stats[0].number, label: 'for a new analyst to ship a first reviewed, tested model' },
          { number: first.stats[1].number, label: 'legacy scripts retired and rebuilt as tested, owned models' },
        ],
      },
      ...rest,
    ],
  }
}
const closing = (title, body, secondary) => ({
  type: 'ctaBand',
  eyebrow: 'Get started', // 11
  title, // 24
  body, // 178, 2 lines
  primary: demo(),
  secondary,
})
const ctaLong = (overrides = {}) => ({ type: 'ctaLong', content: { ...communityT2, ...overrides }, ...communityLinks })
const stats = { type: 'stats', ...statsT2 }

export default {
  // ------------------------------------------------------------------ representative page
  '/product/data-modernization': {
    sections: [
      {
        type: 'heroCenter',
        stroke: 'S8',
        gradient: 'gradient-01',
        eyebrow: 'Lattice for legacy migrations', // 26
        title: 'Trade brittle jobs for models that can grow.', // 32, 2 lines
        lead: 'New software is half the story. The rest is how your team works with its data.', // 78, 1 line
        primary: demo(),
        secondary: cta('See how a typical Lattice migration runs', '/product/lattice'), // 34
        media: heroes.dataModernization,
      },
      {
        type: 'statement',
        title: 'Untangle the logic buried inside years of one-off pipeline code', // 58, 2 lines
        // 174, 2 lines
        body: 'When rules live in stored procedures and cron scripts nobody remembers writing, analysts stop trusting the numbers, AI agents miss the intent, and small changes become forensic work.',
      },
      {
        type: 'checklist',
        items: [
          {
            title: 'Write models that outlive today’s tooling', // 29-42
            // 117-192, 3 lines
            body: 'Instead of nursing hand-rolled ETL jobs that snap whenever a source shifts, your team writes plain SQL models that run in the warehouse, with editing, testing and scheduling in one place.',
          },
          {
            title: 'Ship data changes in days, not quarters',
            body: 'Small reviewed pull requests replace big-bang releases, so models follow pricing, product and org changes within the same sprint.',
          },
          {
            title: 'Analysts and engineers in one project',
            body: 'Analysts propose edits on a branch and preview results before merging, while engineers set permissions and required checks, so a risky change gets stopped well before it ever lands in your production.',
          },
          {
            title: 'Define each metric once, then reference it',
            body: 'Write revenue, churn or active customer once and point to it everywhere. One fix flows to every dashboard, and no two groups compute it two ways.',
          },
        ],
      },
      {
        type: 'feat',
        variant: 'D',
        eyebrow: 'Results', // 7
        title: 'What changes once the old stack is retired.', // 42, 1 line
        // 195, 2 lines
        body: 'A migration is a chance to fix habits, not just hardware. On Lattice, logic sits in version control, gets tested on each change and documents itself, so the new platform stays tidy well after launch day.',
        primary: cta('Plan your migration', '/contact'), // 18
        tertiary: cta('See how a typical Lattice migration runs', '/product/lattice'), // 34
        cards: [
          {
            icon: icons.cloud,
            title: 'Go cloud-native', // 20-23
            body: 'Shift jobs off on-premise schedulers onto hosted runs that scale with demand and leave no servers to patch.', // 80-125
          },
          {
            icon: icons.branch,
            title: 'See every dependency',
            body: 'Column-level lineage shows which reports would break before a source table is ever touched.',
          },
          {
            icon: icons.coin,
            title: 'Pay for less compute',
            body: 'Incremental and state-aware runs rebuild only what changed, so warehouse credits go further each month.',
          },
          {
            icon: icons.badge,
            title: 'Catch bad rows early',
            body: 'Checks on keys, freshness and accepted values run with every build, so broken or missing rows never reach a chart, a report or an LLM.',
          },
        ],
      },
      {
        type: 'tabsLight',
        tabs: [
          {
            label: 'Drag and drop', // 10-11
            body: 'People who don’t write SQL can still build governed models by wiring sources, joins and filters together on a canvas.', // 127, 1 line
            media: tabsLight[1],
          },
          {
            label: 'AI copilot',
            body: 'Type what you need in one sentence and get working SQL with tests and docs already filled in to match your style guide.',
            media: tabsLight[2],
          },
          {
            label: 'Explorer',
            body: 'Search any model to see who owns it, when it last refreshed and which dashboards rely on it, all kept current for you.',
            media: tabsLight[3],
          },
        ],
      },
      custTabsNoBody('Migration stories', 'fernway', 'meridian'), // 17
      ctaLong(),
      stats,
      {
        type: 'resources',
        eyebrow: 'Learn more',
        title: 'More reading for teams leaving old ETL behind', // 43, 2 lines (no paragraph on the original)
        // title lengths per card follow the original's 2 / 2 / 1 lines
        cards: pickResources('caseStudies', 'report', 'controlPlane').map((c, i) =>
          ({
            ...c,
            title: [c.title, 'State of data teams this year, by the numbers', 'One shared layer for many teams'][i],
            body: ['A look at the switch to state-aware builds, the first tests the team added and what the change did to the monthly bill.', c.body, 'Why shared context, clear ownership and automated testing matter more as more teams and agents build on the same data.'][i], // 3 / 2 / 3 lines
          })),
      },
      closing(
        'Start your migration.', // 24
        'Bring your scripts, stored procedures and gnarliest SQL. We will help map them to tested, documented models and get your first workloads running on Lattice within weeks.',
        cta('Try Lattice for free', '/signup'),
      ),
    ],
  },

  // ------------------------------------------------------------------ members
  '/product/ai': {
    sections: [
      {
        type: 'heroCenter',
        stroke: 'S8',
        gradient: 'gradient-01',
        title: 'Give every agent the right context.',
        lead: 'Ground assistants and agents in governed, tested and documented data, so every answer they give can be traced back to definitions your team owns.',
        primary: demo(),
        secondary: cta('Explore Lattice for AI workflows', '/product/lattice'),
        media: heroes.ai,
      },
      {
        type: 'checklist',
        variant: 'split',
        title: 'AI is only as good as the data and context you give it to work with', // 51, 2 lines
        body: 'Models prompted on undocumented tables produce confident answers nobody can verify. Lattice gives every assistant and agent the same tested models, descriptions and certified metrics your analysts use.', // 220, 3 lines
        items: [
          { title: 'Certified models instead of raw tables' },
          { title: 'Descriptions and owners on every column' },
          { title: 'Metrics defined once and served everywhere' },
        ],
        image: splits.ai,
      },
      {
        type: 'feat',
        variant: 'D',
        eyebrow: 'Why us',
        title: 'Build AI on a foundation you can trust.',
        body: 'Lattice brings the discipline of software engineering to the data behind your AI, from version control and tests to documentation and access controls, so every answer can be traced and explained.',
        primary: cta('Talk to an expert', '/contact'),
        tertiary: cta('Explore Lattice for AI workflows', '/product/lattice'),
        cards: [
          { icon: icons.sparkle, title: 'Context that travels with every model', body: 'Descriptions, owners and tests ship with every model, so AI tools always read the latest context, not a stale copy from last quarter.' },
          { icon: icons.target, title: 'Consistent answers across every tool and team', body: 'Certified metrics give assistants one definition of each number, matching the dashboards leaders already use to run the business.' },
          { icon: icons.lock, title: 'Governed access for people and agents alike', body: 'Access rules apply to agents exactly as they do to people, so sensitive data stays where it belongs and every request is logged for review.' },
          { icon: icons.branch, title: 'Traceable outputs, every time', body: 'Lineage links every generated answer back to the models and source rows it was built from, so reviewers can check it.' },
        ],
      },
      {
        type: 'tabsLight',
        tabs: [
          {
            label: 'AI copilot',
            lead: 'Draft models from a plain-language request.',
            body: 'The assistant writes SQL, tests and documentation grounded in your project, ready for review like any other change, and explains each choice it made.',
            media: tabsAi[0],
          },
          {
            label: 'Canvas',
            lead: 'Let more people build with guardrails.',
            body: 'Business users assemble models visually while Lattice keeps the generated code tested and reviewable.',
            media: tabsAi[1],
          },
          {
            label: 'Catalog',
            lead: 'Expose context to every agent you run.',
            body: 'Descriptions, owners and certification flow from the catalog to the AI tools that query your data.',
            media: tabsAi[2],
          },
          {
            label: 'Metrics',
            lead: 'Answer with definitions, not guesses.',
            body: 'Agents request certified metrics by name, so their numbers match the reports your leadership already trusts.',
            media: tabsAi[3],
          },
        ],
      },
      {
        type: 'split',
        variant: 'video',
        eyebrow: 'Watch: AI-ready data in practice', // 30
        title: 'See how teams get projects ready for agents', // 44, 2 lines
        paragraphs: [
          // 296, 4 lines
          'In this short walkthrough, a data team takes an existing project and makes it ready for AI. They add descriptions where they matter, certify the models agents should use, define key metrics once and connect an assistant, then compare its answers before and after the change.',
        ],
        media: misc.poster2,
      },
      custTabs('See it in action', 'orbitly', 'tidepool', 'halcyon'),
      {
        type: 'ctaCard',
        title: 'Make your data ready for AI, starting with the models you already have.',
        body: 'Talk with a specialist about grounding assistants and agents in governed, tested data. We will review your current project, point out the models and metrics worth certifying first and show how other teams rolled the change out.',
        primary: cta('Talk to an expert', '/contact'),
      },
      {
        type: 'resources',
        eyebrow: 'Learn more',
        title: 'Dig deeper into AI-ready data with Lattice',
        body: 'Research, recaps and recordings on grounding assistants and agents in governed data.',
        cards: pickResources('controlPlane', 'summit', 'showcase').map(({ body, ...c }) => c), // tag + title only
      },
      // the original uses the no-eyebrow bento here (as on T4) with no media on the last card
      { type: 'stats', ...statsT4, cards: statsT4.cards.map((c, i) => (i === 3 ? { ...c, image: undefined } : c)) },
      closing(
        'Start building on Lattice.',
        'Give assistants and agents the same governed, tested data your analysts rely on, starting today.',
        cta('Explore AI workflows', '/product/lattice'),
      ),
    ],
  },

  '/product/embedded-analytics': {
    sections: [
      {
        type: 'heroCenter',
        stroke: 'S8',
        gradient: 'gradient-01',
        eyebrow: 'Lattice for embedded analytics',
        title: 'Ship analytics your customers can trust.',
        lead: 'Serve fast, governed and consistent metrics inside the products your customers already use.',
        primary: demo(),
        secondary: cta('Explore Lattice for embedded analytics', '/product/lattice'),
        media: heroes.embeddedAnalytics,
      },
      {
        type: 'checklist',
        variant: 'split',
        pt0: false, // full section padding on the original
        title: 'Embedded analytics, built right', // 29
        body: 'When customers see numbers inside your product, they have to be right. Lattice gives product and data teams one tested, tenant-aware source for every metric.',
        items: [
          { title: 'One definition', body: 'Every customer-facing metric is defined once, reviewed like code and served the same way in every chart and export.' },
          { title: 'Access per tenant', body: 'Row-level rules travel with each metric, so a customer only sees the rows that belong to them.' },
          { title: 'Tested first', body: 'Tests run on every build, so customers never see a broken chart or a figure that disagrees with your reports.' },
        ],
        image: splits.embeddedAnalytics,
      },
      {
        type: 'feat',
        variant: 'D',
        eyebrow: 'Why us',
        title: 'Turn your data into a product feature customers will pay for.', // 46, 2 lines
        body: 'Lattice lets product teams ship customer-facing analytics on the same governed foundation as internal reporting, so every chart is consistent, secure and fast enough to use every day. Metrics are defined once, reviewed like code and served through one API to whichever front end your team prefers.',
        primary: cta('Talk to an expert', '/contact'),
        tertiary: cta('Explore Lattice for embedded analytics', '/product/lattice'),
        cards: [
          { icon: icons.gauge, title: 'Fast at any scale, for every tenant', body: 'Cached, pre-aggregated metrics keep embedded charts responsive for every one of your tenants, even at the busiest times of day.' },
          { icon: icons.lock, title: 'Secure by tenant', body: 'Access rules travel with each metric, so customers only ever see the data that belongs to them, and every request is checked.' },
          { icon: icons.target, title: 'Consistent numbers inside and outside the product', body: 'The same definition powers internal reports and customer charts, ending awkward mismatches between what sales sees and what customers see in the product.' },
          { icon: icons.plug, title: 'Any front end you choose', body: 'Serve metrics to your application through one API, whichever charting library or framework your front-end team prefers.' },
        ],
      },
      {
        type: 'tabsLight',
        tabs: [
          { label: 'Metrics', body: 'Define customer-facing metrics once, review them like code and serve them to every tenant from one governed layer, with tests on each definition and access rules that travel with every request your application makes.', media: tabsLight[5] },
          { label: 'Testing', body: 'Run tests on every build, so customers never see a broken chart or a number that disagrees with your own reports.', media: tabsLight[4] },
          { label: 'Catalog', body: 'Document every embedded metric with owners and lineage, so support and product teams can answer questions quickly.', media: tabsLight[3] },
        ],
      },
      custTabsWithBody('See it in action', 'tidepool', 'orbitly'),
      ctaLong({ title: 'Join the biggest community of people building data products that customers rely on every day' }),
      stats,
      {
        type: 'resources',
        eyebrow: 'Learn more',
        title: 'More reading on shipping charts inside your app',
        cards: pickResources('charts', 'caseStudies', 'onDemand'),
      },
      closing(
        'Start building on Lattice.',
        'Give your customers analytics they can trust, served from the same governed foundation as your internal reporting. Sign up today and ship your first embedded metric in an afternoon.',
        cta('Explore embedded analytics', '/product/lattice'),
      ),
    ],
  },

  '/product/data-trust': {
    sections: [
      {
        type: 'heroCenter',
        stroke: 'S4',
        gradient: 'gradient-01',
        eyebrow: 'Lattice for trusted data',
        title: 'Earn confidence in every number you publish.',
        lead: 'Give every stakeholder numbers they can rely on, with tests, owners and lineage behind each one.',
        primary: demo(),
        secondary: cta('Explore Lattice for trusted data', '/product/lattice'),
        media: heroes.dataTrust,
      },
      {
        type: 'checklist',
        variant: 'grid',
        title: 'What it takes to earn trust in your data',
        body: 'Trust comes from habits that make quality visible: tests on every model, lineage on every column, a named owner for every table and review on every change.',
        items: [
          { title: 'Catch issues before your stakeholders do', body: 'Tests and freshness checks run on every build, so broken data is stopped and fixed before it reaches a single dashboard, report or customer-facing metric.' },
          { title: 'Show where every number comes from', body: 'Column-level lineage traces each figure back to its source rows, so you can answer “where did this come from?” in seconds.' },
          { title: 'Make ownership visible to everyone', body: 'Every model has a named owner and a description, so people know who to ask and teams stop guessing about responsibility.' },
          { title: 'Inspect every change before release', body: 'Changes go through pull requests with real data previews, so reviewers see the impact on downstream reports before approving.' },
          { title: 'Agree on one definition of each metric', body: 'Metrics are defined once and served everywhere, ending the meetings spent arguing about whose version of revenue is right.' },
        ],
      },
      {
        type: 'feat',
        variant: 'D',
        eyebrow: 'Why us',
        title: 'Trust is built one tested model at a time, by every team that ships data.',
        body: 'Lattice gives data teams the habits of software engineering, from review to testing to documentation, so the business can rely on their work and the team can spend less time defending it. Every model carries an owner, tests and lineage, and every change is reviewed before it ships.',
        primary: cta('Talk to an expert', '/contact'),
        cards: [
          { icon: icons.badge, title: 'Proven quality', body: 'Tests on every model and every run catch problems early and record the exact rows that broke each rule for review later by the owner.' },
          { icon: icons.search, title: 'Clear lineage', body: 'Trace any column from source to dashboard and see exactly what a change will affect before it ships to the production project.' },
          { icon: icons.user, title: 'Named owners for every model', body: 'Owners and descriptions live next to the code and show up wherever people look for data, from the catalog to the BI tool they use.' },
          { icon: icons.bell, title: 'Timely alerts', body: 'Failures reach the right owner with the context needed to fix them, often well before anyone downstream notices a problem.' },
        ],
      },
      {
        type: 'tabsLight',
        tabs: [
          { label: 'Testing', body: 'Put tests on every model and see results for each run, so quality is something you can show rather than promise.', media: tabsLight[4] },
          { label: 'Catalog', body: 'Give everyone one place to find models, owners, freshness and lineage, generated straight from your project.', media: tabsLight[3] },
          { label: 'Metrics', body: 'Define key metrics once and serve them to every tool, so the business stops comparing conflicting numbers.', media: tabsLight[5] },
        ],
      },
      withSummary(custTabs('See it in action', 'halcyon', 'basalt', 'meridian'), 'halcyon', 'Halcyon put every regulated report on reviewed, versioned and tested models, with lineage from each figure back to its source rows. When the regulator asked for evidence, the team shared a link.'), // 199ch
      ctaLong(),
      stats,
      {
        type: 'resources',
        eyebrow: 'Learn more',
        title: 'Dig deeper into building trust in data with Lattice',
        body: 'Guides and research on making data quality visible.',
        cards: pickResources('blog', 'lifecycle', 'report'),
      },
      closing(
        'Start building on Lattice.',
        'Hand stakeholders figures that hold up to scrutiny, each one backed by tests, an owner and full lineage. Create an account and start testing the models already running in production today.',
        cta('Explore trusted data', '/product/lattice'),
      ),
    ],
  },

  '/product/cost-optimization': {
    sections: [
      {
        type: 'heroCenter',
        stroke: 'S8',
        gradient: 'gradient-01',
        eyebrow: 'Lattice for cost optimization',
        title: 'Spend less on compute and more on insight.',
        lead: 'Rebuild only what changed, retire what nobody uses and see exactly where your money goes. Lattice gives data teams the visibility and automation to keep warehouse spend in line with the value it creates, without slowing anyone down or adding manual tuning.',
        highlights: [{ title: 'Up to 64% savings', body: 'Typical reduction in compute time once nightly jobs rebuild only the models whose inputs changed.' }],
        primary: demo(),
        secondary: cta('Explore Lattice for cost optimization', '/product/lattice'),
        media: heroes.costOptimization,
      },
      {
        type: 'checklist',
        variant: 'split',
        pt0: false, // full section padding on the original
        title: 'Warehouse bills grow quietly until someone asks', // 55, 2 lines
        body: 'Most platforms rebuild everything on every run and keep tables nobody queries. Lattice shows where compute goes and cuts the waste automatically.',
        items: [
          { title: 'Rebuild only what changed', body: 'State-aware builds compare each run with the last good state, reuse results for models whose inputs did not change and rebuild the rest in dependency order, so nightly jobs finish sooner and cost less without hand-tuned selectors.' },
          { title: 'Find and retire models nobody uses', body: 'Usage data shows which models no dashboard, notebook or agent has queried in months, so you can switch them off with confidence.' },
        ],
        image: splits.costOptimization,
      },
      {
        type: 'tabsLight',
        tabs: [
          { label: 'Rebuild only what changed with state-aware builds', body: 'Lattice compares each run with the last good state and reuses results for unchanged models, cutting compute on every job. Teams that switch typically see shorter runs in the first week, and the savings grow as projects add more models and more frequent schedules.', media: tabsLight[6] },
          { label: 'Find the most expensive models', body: 'See which models cost the most time and money on every run, how that changes week to week and which teams own them, so you can focus optimization where it actually pays off and show finance exactly where the warehouse budget is going each month.', media: tabsLight[4] },
        ],
      },
      {
        type: 'quoteBand',
        stroke: true,
        quotes: [
          {
            logo: customers.orbitly,
            quote: 'Our compute bill fell in the first month and kept falling. We did not change a single model, we just stopped rebuilding the ones that had not changed, and the time we saved went straight into new work the business had been asking for all year.', // 124, 2 lines
            person: 'Jonah Reyes',
            role: 'VP, Data and Insights',
          },
        ],
      },
      {
        type: 'checklist',
        variant: 'beforeAfter',
        before: {
          title: 'Before', // 8-10
          items: [
            { title: 'Every job rebuilds every model, every time' },
            { title: 'Nobody knows which tables are still used' },
            { title: 'The same logic is copied across teams' },
          ],
        },
        after: {
          title: 'After',
          items: [
            { title: 'Only models with changed inputs are rebuilt' },
            { title: 'Unused models are flagged and retired' },
            { title: 'Shared models are reused across projects' },
          ],
        },
      },
      custTabs('See it in action', 'orbitly', 'kestrel', 'ferrocene'),
      ctaLong(),
      stats,
      {
        type: 'resources',
        eyebrow: 'Learn more',
        title: 'Dig deeper into cost optimization with Lattice',
        // longer card paragraphs on this page (5-6 lines at 294 wide on the original)
        cards: pickResources('caseStudies', 'blog', 'onDemand', 'report').map((c, i) => ({ ...c, body: [
          'A look at the switch to state-aware builds, the first tests the team added and what the change did to the monthly bill, with the numbers from before and after and the order the team rolled things out in.',
          'The checks, alerts and review habits our internal data team relies on to keep company metrics honest every day, including the handful of tests we add to every new model and the alerts we decided to switch off.',
          'Recorded sessions on layering, naming and testing conventions from teams that run thousands of models daily, with practical advice on keeping a large project fast, cheap to run and easy for newcomers to read.',
          'What two hundred data teams told us about headcount, tooling and spend, and the work that still slows them down, with benchmarks you can use to plan your next year.',
        ][i] })),
      },
      closing(
        'Start building on Lattice.',
        'Cut warehouse spend without slowing your team down. Sign up today and see how much compute state-aware builds save on the jobs you already run in production every single night.',
        cta('Explore cost savings', '/product/lattice'),
      ),
    ],
  },
}
