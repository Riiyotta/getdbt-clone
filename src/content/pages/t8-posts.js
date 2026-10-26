// T8 blog posts (specs/T5-T8.md B-T8): original placeholder copy for the fictional company "Lattice".
// Block sequences follow the spec's element-type sequence; quotes and people are invented.
import { articleImgs as art, misc } from '../../pageAssets'
import { authors } from './editorial'

const V1 = { ...misc.poster1, alt: 'Video: a tour of the new core engine' }
const V2 = { ...misc.poster2, alt: 'Video: state-aware builds in a live project' }
const V3 = { ...art.poster3, alt: 'Video: building a dashboard from a reviewed model' }

// representative: 7 h2, 1 h3, 35 p, 3 ul, 3 pull-quotes, 3 videos, 1 image, 1 table
export const summitPost = {
  header: {
    breadcrumb: { items: [{ label: 'Blog', to: '/blog' }, { label: 'Product', to: '/blog' }], current: 'Everything we shipped at Summit this year and how the pieces fit' },
    title: 'Everything we shipped at Summit this year and how the pieces fit', // 56ch/3
    author: authors.rhea,
    date: 'Last edited on October 23, 2026', // "last edited" text
  },
  blocks: [
    ['p', 'Ten years ago a handful of analysts started writing transformations the way software teams write code: in version control, with tests, reviewed by a colleague before anything reached production. That habit spread into a discipline, and the discipline grew into a community that now spans many thousands of practitioners.'],
    ['p', 'The job has changed again since then. Teams now answer questions for people, for applications and, more and more often, for automated agents that read the same tables at machine speed. Each of those consumers needs the same thing: numbers that are defined once, tested on every change and explained well enough that nobody has to guess what a column means.'],
    ['p', 'This year at Summit more than two thousand people joined us in person and many more followed online. We used the keynote to show how Lattice is growing to meet that moment, from a much faster engine to context that agents can read safely. Below is the full list of what we announced, with links to the [release notes](/blog) and to the sessions where you can see each feature running against a real project.'],

    ['h2', 'A faster core engine'],
    ['h3', 'Lattice Core 2.0 compiles very large projects in seconds'],
    ['p', 'Most of the time a data team spends waiting is not spent in the warehouse. It is spent parsing, compiling and resolving a project before a single query runs. Lattice Core 2.0 is a ground-up rewrite of that path. On a project with eight thousand models, a full parse that used to take close to two minutes now finishes in under four seconds, and editing a single file updates the graph almost instantly.'],
    ['p', 'The new engine is **available today for every account** on the platform and as an open download for local work. It reads existing projects without changes, and the [upgrade guide](/resources/analytics-lifecycle) covers the handful of deprecated settings.'],
    ['video', V1],
    ['p', 'Read the [full engine release notes](/blog).'],
    ['ul', [
      'The open core is published under the same permissive licence as before, so community packages, adapters and the command line keep working exactly the way they do today, now with the faster parser underneath them.',
      'The hosted platform adds caching, remote execution and a shared index across environments.',
    ]],
    ['p', 'Both editions share one language and one project format, so moving work between a laptop and the platform needs no rewrite at all.'],
    ['p', 'Supported warehouses:'],
    ['ul', [
      'Cobalt DB, Northwind, Quarry and Helixa are generally available.',
      'Stratus and the Driftway lake format are in beta and open to every account.',
      'Two further engines are planned for spring.',
    ]],
    ['quote', 'Our nightly project has grown to nearly six thousand models, and compile time had quietly become the slowest part of every change. On the new engine our editor feels instant again, and the full parse finishes before I have switched windows. Nobody on the team asked for a faster tool, but everybody noticed the day we turned it on. — Priya Raman, Head of Analytics Engineering, Kestrel'],
    ['p', 'Try it on [your own project](/signup).'],

    ['h2', 'State-aware builds everywhere: rebuild only what has actually changed'],
    ['p', 'Last year we introduced state-aware orchestration for a small group of design partners. It is now **on by default for new projects** and one setting away for existing ones. Before each run Lattice compares sources and code to the last successful build and skips every model whose inputs are unchanged, which is usually most of them. Teams in the beta cut [warehouse spend](/product/cost-optimization) by a **third on average**.'],
    ['quote', 'We expected faster runs. What surprised us was the bill. Half our models now skip on a typical night because nothing upstream changed, and the warehouse spend for the team dropped by more than a third in the first month. We spent that budget on two projects that had been waiting in the backlog all year. — Tomas Ekberg, Director of Data Platforms, Meridian Partners'],
    ['p', 'State awareness also changes how freshness works. Instead of scheduling everything on a timer and hoping sources have landed, you can declare how fresh each model needs to be. A model with a `freshness: 1 hour` rule rebuilds when its inputs are newer than that and stays put otherwise. Combined with event-based triggers, nightly jobs become a set of small, cheap runs that happen when data arrives. The run log records every skip with a reason, so it is always clear why a model did or did not build, and the same reasons are available through the API for teams that track cost per model in their own dashboards.'],
    ['quote', 'State-aware builds changed the conversation with our finance partners. We no longer defend a number on the monthly invoice; we show them which models ran, why they ran and what each run cost. It is the first time our platform spend has felt like something we control rather than something that just happens to us. — Grace Okafor, Chief Data Officer, Halcyon'],
    ['video', V2],
    ['p', 'State-aware builds work with every supported warehouse and every scheduler integration. Existing jobs keep their schedules; the skipping happens inside each run with no change to how jobs are configured.'],
    ['p', 'See the [state-aware build documentation](/product/deploy) to switch an existing project over.'],

    ['h2', 'Bring your own compute: run each model on the engine that suits the job best'],
    ['p', 'Not every model needs a large warehouse. Many teams run small staging transforms and tests on infrastructure that costs far more than the work requires. Starting this quarter, Lattice can route individual models to a lightweight local engine while heavier joins stay where they are.'],
    ['p', 'You choose per model or per folder with a single setting, `compute: light`, and Lattice moves data between engines through open table formats so nothing is copied by hand. **Lineage, tests and documentation stay in one project**, whichever engine runs a given step. In early trials, teams moved between twenty and forty percent of their models onto lighter compute with no change to results. Routing decisions appear in the run log next to each model, and a dry-run mode shows which models would move before anything changes in production.'],
    ['p', 'Mixed compute is in preview for Cobalt DB and Quarry, with others to follow. Read the [preview announcement](/blog), browse the [supported formats](/data-platforms/cobalt) and sign up for the [office hours](/community) where the engineering team answers questions about early results.'],

    ['h2', 'Context that agents can depend on'],
    ['p', 'An assistant can only be as reliable as the context it receives. A project already contains most of what they need: model descriptions, column types, tests, owners and the [metric definitions](/product/semantic-layer) in the semantic layer. *What has been missing is a safe, consistent way to hand that context over.*'],
    ['p', 'The new **context service** exposes a project’s certified models, metrics and lineage through one read-only interface. Agents can ask which table holds weekly revenue, what a column means or whether yesterday’s build passed, and every reply is built on the very definitions your people rely on.'],
    ['p', 'Access follows the permissions you already have. An agent acting for a user sees what that user sees and nothing more, and every request is logged with the question, the objects returned and the identity behind it. We built the service on an open specification so any assistant can connect, including the ones your company builds itself. Lattice Assistant, our own helper inside the editor, now uses the same service, which means its suggestions are drawn from your tests and definitions rather than from guesses about naming conventions. It can draft a model, propose tests for a new column, explain an unfamiliar part of the graph, or summarise why last night’s run failed and which change most likely caused it.'],
    ['img', { ...art.summitUi }],
    ['p', 'The context service is in [public preview](/product/assistant) for every platform account. Assistant features in the editor are generally available, and the [command-line helper](/product/ai) is in beta. To connect a custom agent, start with the `context.read` scope and the [quickstart](/learn). *Pricing for agent requests will be announced before general availability.*'],

    ['h2', 'Charts, as code'],
    ['p', 'Dashboards are often the last place where definitions drift. A metric is defined carefully in the project and then rebuilt slightly differently in a reporting tool. Lattice Charts closes that gap by keeping simple visualisations in the same repository as the models that feed them.'],
    ['p', 'A chart is a short YAML file that points at a metric or a model, picks a chart type and sets a few display options. It is versioned, approved alongside the SQL it depends on and built during that same run, so a change to a definition and a change to the chart that shows it ship together. If a test fails, the chart does not update, and readers see a clear note that the last good version is on display.'],
    ['p', 'Charts are not trying to replace every reporting tool. They are meant for the handful of views that matter most and that should never disagree with the project: weekly revenue, active customers, pipeline health. For deeper analysis, the same metrics remain available to any connected tool.'],
    ['p', 'Lattice Charts is in public beta. Any project on the platform can turn it on from the settings page, and a set of starter templates covers line, bar, table and single-number views. We expect general availability early next year, with sharing controls and scheduled exports.'],
    ['p', 'Try [Lattice Charts](/product/charts).'],
    ['video', V3],

    ['h2', 'From model to dashboard in a single review'],
    ['p', 'The common thread in every announcement is the review. A change to a model, its tests, its metric and the chart that shows it should be a single unit of work that a teammate can read, run and approve. When that is true, quality stops depending on heroics.'],
    ['p', 'This year we also made reviews easier to do well. Pull requests now show a rendered diff of affected rows for sampled data, a list of downstream models and charts, and the cost estimate of the change. Reviewers can run a slim build in a private schema with one click and leave comments on specific columns.'],
    ['p', 'We will keep investing here. Next on the list are review checklists that teams can define once, automatic suggestions for missing tests on new columns and a clearer way to roll back a change that slipped through. If you have opinions on any of these, the product team reads every post in the community forum and runs open roadmap sessions each quarter.'],
    ['p', 'Join the [roadmap discussion](/community).'],

    ['h2', 'What ships, and when'],
    ['p', 'Everything above is either available now or open for preview. The table lists the current status of each item. Generally available features are covered by standard support; previews and betas are free to try and may change based on feedback before release.'],
    ['p', 'Here is the quickest way to try the new features in your own project:'],
    ['ul', [
      '[Upgrade to the new engine](/product/develop) from the project settings.',
      'Turn on [state-aware builds](/product/deploy) for one production job and compare the run log against the previous week.',
      'Connect an assistant to the [context service](/product/assistant).',
      'Add a first [chart file](/product/charts) next to a metric your team checks every Monday.',
      'Move a folder of staging models to light compute with `compute: light` and watch the cost column in the run history.',
      'Book a [walkthrough](/contact) with a solutions architect.',
      'Watch the [Summit sessions on demand](/resources/on-demand) for deeper dives into each feature, with live demos and the questions the audience asked during the talks.',
    ]],
    ['table', {
      head: ['Feature', 'Status'],
      rows: [
        ['[Lattice Core 2.0](/product/develop)', 'Available'],
        ['[State-aware builds](/product/deploy)', 'Available'],
        ['[Mixed compute](/data-platforms/cobalt)', 'Preview'],
        ['[Context service](/product/assistant)', 'Public preview'],
        ['[Editor assistant](/product/ai)', 'Available'],
        ['[Command-line helper](/product/ai)', 'Beta'],
        ['[Lattice Charts](/product/charts)', 'Public beta'],
        ['[Review previews](/product/test-and-observe)', 'Available'],
      ],
    }],
  ],
  promos: [
    { title: 'Start with Lattice', body: 'Open a free developer workspace and ship a first tested model this afternoon.', cta: { label: 'Create a free account', to: '/signup' } },
    {
      title: 'Try the CLI assistant',
      body: 'Draft models, propose tests and explain failed runs from your terminal. The helper reads your project’s own definitions, so its suggestions match the conventions your team already follows.',
      cta: { label: 'Install the assistant', to: '/product/assistant' },
    },
  ],
}

// merger post: no h2; 25 paragraphs, 1 list of 4 long items, inline CTA embed at the end
export const mergerPost = {
  header: {
    breadcrumb: { items: [{ label: 'Blog', to: '/blog' }, { label: 'News', to: '/blog' }], current: 'Lattice and Northwind complete their merger to build one platform for trusted data and the agents that use it' },
    title: 'Lattice and Northwind complete their merger to build one platform for trusted data and the agents that use it', // 91ch-ish/4
    author: authors.tobias,
    date: 'Last edited on October 14, 2026',
  },
  blocks: [
    ['p', 'Today Lattice and Northwind are officially one company.'],
    ['p', 'When we first announced the plan in the spring, we said the combination was about a simple idea: the teams who move data and the teams who shape it should not need two vendors, two contracts and two support queues to do one job. Every week since then, customers have told us the same thing in their own words. They want data to arrive reliably, be modelled in one place, and be ready for whatever reads it next, whether that is a person, a dashboard or an automated agent.'],
    ['p', 'With the merger complete we can start delivering on that promise in earnest.'],
    ['p', 'Northwind has spent the last decade making ingestion dependable. Hundreds of managed connectors, careful schema handling and quiet, boring reliability are the reasons thousands of companies trust it with their source data. Lattice has spent the same decade making transformation a software discipline, with version control, testing, documentation and review at the centre of the work. The two halves have always worked well together; many of our largest customers already run both.'],
    ['p', 'What changes now is that they are designed together. Over the next year we will connect ingestion and modelling so that a schema change in a source shows up as a suggested change in the models that depend on it, before anything breaks. Freshness information from connectors will feed state-aware builds directly, so a model rebuilds when its data actually lands. And lineage will run unbroken from the original source system to the metric on a dashboard or the answer an agent gives.'],
    ['p', 'We want to be clear about what does not change.'],
    ['p', 'The open-source core of Lattice stays open, under the same licence, with the same public roadmap and the same community governance. The company behind it is larger now, and that means more engineers working on the core, not fewer. We have committed in writing to keep the project vendor-neutral, and the adapters for every warehouse, including those that compete with partners of the combined company, will continue to be maintained.'],
    ['p', 'Existing contracts, prices and support arrangements stay as they are. If you are a customer of either company, nothing about your account changes today. Your account team is the same, your support channels are the same and your invoices will look the same. When we introduce combined plans, they will be optional, and we will give plenty of notice before any change to the products you already use.'],
    ['p', 'Integrations with other ingestion and orchestration tools stay supported. Many Lattice customers use a different connector vendor, and many Northwind customers transform data with something other than Lattice. Both of those choices remain first-class. Openness is a large part of why people chose each product, and we intend to keep earning that trust.'],
    ['p', 'So what is new?'],
    ['ul', [
      '**Schema-aware modelling.** When a connector detects a new, renamed or removed column, Lattice will open a draft change against every affected model, with tests updated and a preview of the rows that would change. Reviewers can accept, adjust or reject the change before the next scheduled run, which turns an overnight breakage into a short review the following morning.',
      '**One lineage graph.** Source systems, connectors, models, metrics, charts and the agents that query them will appear in a single graph with consistent ownership and status. Anyone trying to answer “where did this number come from?” will be able to follow it from the original application table to the final figure without switching tools, without exporting metadata and without asking three different teams for screenshots of their configuration pages.',
      '**Arrival-driven runs.** Instead of scheduling transformation on a clock and hoping data has arrived, runs will start when connectors report that new data has landed and passed its checks. Combined with state-aware builds, only the models touched by new data will rebuild, which shortens the time from source change to fresh dashboard and cuts warehouse cost at the same time. Teams that need fixed schedules for compliance or reporting windows will keep them; arrival-driven runs are an option, not a requirement, and both can live in the same project.',
      '**Context for agents from end to end.** The context service introduced at Summit will include ingestion metadata, so an agent can tell not only what a metric means but also how fresh its sources are, which connector supplied them and whether the last sync succeeded. That kind of grounding is what separates a helpful assistant from a confident but wrong one, and it is only possible when ingestion and modelling share the same record of what happened, when it happened and who owns each step along the way.',
    ]],
    ['p', 'We will ship these in stages, starting with the shared lineage graph early next year. Previews will open to existing customers of both companies first.'],
    ['p', 'A merger is also about people. The combined company has a little over two thousand employees across eleven countries. Teams are already working side by side, and we have kept the parts of each culture that customers value most: the open, public way Lattice builds in the community, and the operational care Northwind brings to running infrastructure at scale.'],
    ['p', 'The community deserves a special word. The Lattice community grew because practitioners shared what they learned, answered each other’s questions and built packages for everyone to use. That will not be absorbed into a marketing function or locked behind a login. Forums, meetups, the annual conference and the open project will continue, and we are increasing the budget for community programmes next year, including grants for local organisers and more support for first-time speakers.'],
    ['p', 'For partners, the message is similar. Consulting firms, warehouse vendors and tool makers have helped both companies reach customers we could never have reached alone. Partner programmes stay in place, and we will publish a joint programme with clearer benefits in the coming months.'],
    ['p', 'Some people have asked whether the combined company plans to build its own warehouse. We do not. Our job is to make data dependable on whatever platform a customer chooses, and our product decisions will keep reflecting that.'],
    ['p', 'Others have asked about pricing. There is no change to current pricing. When combined plans arrive, they will be designed so that customers using both products pay less than they would separately, and customers using one product see no increase as a result of the merger.'],
    ['p', 'We have also heard concerns from people who worry that large companies lose focus. That is a fair worry. Our answer is to keep teams small and close to the people who use their work, to publish our roadmap in the open, and to keep measuring ourselves on whether customers trust their data more this year than last.'],
    ['p', 'If you want to go deeper, there are a few places to start. The product teams are running a series of open sessions over the next month to walk through the roadmap and answer questions live. The joint documentation hub now covers both products in one place. And the community forum has a dedicated space for questions about the merger, staffed by people from both teams.'],
    ['p', 'We would like to thank our customers, many of whom spent time with us over the last six months explaining what they need and pushing back on what they did not. Your feedback shaped the plan described here more than anything we could have dreamed up on our own.'],
    ['p', 'Thank you also to the people at both companies who worked through a long and complicated process while continuing to ship, support customers and keep systems running. Mergers are rarely glamorous from the inside, and it took real care to make this one go smoothly.'],
    ['p', 'And thank you to the community. You built the habits that made modern analytics engineering possible, and you are the reason we believe the next decade of this work can be even better than the last.'],
    ['p', 'We are just getting started.'],
    ['p', '— Tobias Wrenfield, Chief Executive Officer'],
    ['p', 'Read the [Summit announcements](/blog/summit-announcements) for more on the context service, state-aware builds and the new core engine that this roadmap builds on.'],
    ['embed', {
      eyebrow: 'Open roadmap sessions, live',
      title: 'Hear the plan from the people building it',
      body: 'Product leads from both teams will walk through the combined roadmap in a series of short live sessions, then stay on to answer questions from the audience. Bring your hardest questions about lineage, connectors, pricing and the open project, and we will answer as many of them as we can, on the record.',
      cta: { label: 'Save your seat', to: '/resources/webinars/launch-showcase' },
    }],
  ],
  promos: summitPromosFor(),
}

function summitPromosFor() {
  return [
    { title: 'Start with Lattice', body: 'Open a free developer workspace and ship a first tested model this afternoon.', cta: { label: 'Create a free account', to: '/signup' } },
    {
      title: 'Try the CLI assistant',
      body: 'Draft models, propose tests and explain failed runs from your terminal. The helper reads your project’s own definitions, so its suggestions match the conventions your team already follows.',
      cta: { label: 'Install the assistant', to: '/product/assistant' },
    },
  ]
}
