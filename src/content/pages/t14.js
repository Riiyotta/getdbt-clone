// T14 pricing page content (specs/T14-T17.md T14). Invented plans, prices, allowances and features
// for the fictional company "Lattice"; lengths follow the spec's character counts.

const signup = '/signup'
const contact = '/contact'

export const plans = [
  {
    name: 'Sketchpad',
    body: 'For a single builder trying Lattice on a side project before the team joins in.',
    price: 'Zero',
    allowances: ['One builder seat', '2,500 model builds each month', 'A single workspace'],
    cta: { label: 'Start building', to: signup },
    featuresTitle: 'Included',
    features: [
      'Browser editor with live lineage',
      'Two-step sign-in for every account',
      'Scheduled runs with email digests',
      'Pull request checks on your git host',
      'One-click upgrade when your team grows past a single seat',
    ],
  },
  {
    name: 'Workshop',
    body: 'For small teams shipping their first shared project together.',
    price: '$45 per maker/month',
    allowances: ['Up to six builder seats', '12,000 model builds each month', '4,000 metric queries each month', 'Two workspaces'],
    cta: { label: 'Try it for free', to: signup },
    featuresTitle: 'Included',
    features: [
      'All of Sketchpad, and:',
      'Column search across every project',
      'Metric definitions reviewed like code and served to any tool',
      'Read-only API tokens',
    ],
  },
  {
    name: 'Atelier',
    body: 'For data groups running many projects at the same time.',
    price: 'Volume pricing',
    allowances: ['Pooled builder seats', '80,000 model builds each month', '25,000 metric queries each month', 'Up to 25 workspaces'],
    cta: { label: 'Talk to our team', to: contact },
    featuresTitle: 'Included',
    features: [
      'All of Workshop, and:',
      'Column-level lineage previews',
      'Cached metrics for dashboards',
      'Cross-project references with contracts',
      'Single sign-on, roles and automatic user provisioning',
      'Priority help with response targets',
    ],
  },
  {
    name: 'Atelier Max',
    body: 'For regulated teams that need private networking and dedicated hosting choices.',
    price: 'Tailored quote',
    allowances: ['Pooled builder seats', '150,000 model builds each month', '50,000 metric queries each month', 'No workspace cap'],
    cta: { label: 'Talk to our team', to: contact },
    featuresTitle: 'Included',
    features: ['All of Atelier, and:', 'Private network links', 'Address allow-lists', 'Run Lattice inside your own cloud account (managed hosting)'],
  },
]

export const addOns = {
  title: 'Add-ons that scale with your usage',
  body: [
    'Nothing to commit up front. Turn an add-on on for a self-hosted project or a hosted plan, and pay only for what runs. ',
    { a: 'Read how metering is calculated', to: '#' },
    '.',
  ],
  cards: [
    {
      title: 'Warm Cache',
      p1: 'Warm Cache remembers what each model produced last time and skips work when nothing upstream moved. Fewer rebuilds mean shorter runs and lower warehouse bills for the whole team.',
      p2: 'Billing counts each distinct model, check or snapshot that Warm Cache reuses on a given day, once.',
      items: [
        ['A 30-day trial with a free monthly allowance, ', { a: 'see the allowance', to: '#' }],
        ['Metered at $0.082 per reused node'],
        ['Committed-use discounts for larger accounts: ', { a: 'ask our team', to: contact }],
      ],
      primary: { label: 'Turn it on', to: signup },
      secondary: { label: 'Learn more', to: '/product/state' },
    },
    {
      title: 'Model Muse',
      p1: 'Model Muse is a drafting assistant that reads your project before it writes anything. It proposes models, tests and docs, then checks every suggestion against the rules you already set.',
      p2: 'Choose a different engine for drafting, reviewing or explaining, and settle the bill per thousand tokens.',
      items: [
        ['Every provider model has its own ', { a: 'per-token rate', to: '#' }],
        ['A free trial plus a monthly allowance on every plan, listed below'],
        ['Already have a provider contract? Plug in your own key and settle usage with that provider instead'],
      ],
      primary: { label: 'Turn it on', to: signup },
      secondary: { label: 'Learn more', to: '/product/assistant' },
    },
  ],
}

// Comparison matrix: v = [A, B, C, D]; true = check, string = text, null = empty.
const C4 = [true, true, true, true]
const C3 = [null, true, true, true]
const C2 = [null, null, true, true]
const C1 = [null, null, null, true]

export const matrix = {
  title: 'Every plan, side by side',
  heads: [
    { name: 'Sketchpad', price: 'One builder seat', cta: plans[0].cta },
    { name: 'Workshop', price: '$45/maker/month', cta: plans[1].cta },
    { name: 'Atelier', price: 'Volume pricing', cta: plans[2].cta },
    { name: 'Atelier Max', price: 'Tailored quote', cta: plans[3].cta },
  ],
  groups: [
    {
      title: 'Seats, builds and limits',
      rows: [
        { f: 'Builder seats', tip: 'People who can edit models, run jobs and open pull requests. Viewers who only read docs and lineage are always free.', v: ['1', '6', 'Pooled', 'No cap'] },
        { f: 'Workspaces', tip: 'A workspace holds one git repository, its environments and its job schedule.', v: ['1', '2', '25', 'No cap'] },
        { f: 'Model builds per month', tip: 'Each successful materialization of a model counts once. Failed or skipped builds are never billed.', v: ['2,500', '12,000', '80,000', '150,000'] },
        { f: 'Metric queries per month', tip: 'Requests answered by the metrics service, from any connected dashboard, notebook or spreadsheet.', v: [null, '4,000', '25,000', '50,000'] },
        {
          f: 'Model Muse',
          tip: 'The drafting assistant that proposes models, tests and docs grounded in your project. Usage beyond the allowance is metered per token.',
          v: [
            '$80 in Muse credit across a 21-day trial, followed by metered usage at list rates',
            '$80 in Muse credit across a 21-day trial, followed by metered usage at list rates',
            '$120 a month in Muse credit per account, with extra usage billed as metered add-on',
            '$240 a month in Muse credit per account, with extra usage billed as metered add-on',
          ],
        },
        {
          f: 'Warm Cache',
          tip: 'Skips rebuilding models whose inputs did not change since the last run. Billed per distinct reused node per day.',
          v: [
            'A 30-day trial, then metered usage billed per reused node',
            'A 30-day trial, then metered usage billed per reused node',
            'A 30-day trial, with later usage billed as a metered add-on',
            'A 30-day trial, with later usage billed as a metered add-on',
          ],
        },
      ],
    },
    {
      title: 'Write and shape your models',
      rows: [
        { f: 'Command line client', tip: 'Run builds, tests and previews from your own terminal against the same project the browser editor uses.', v: C4 },
        { f: 'Desktop editor plugin', tip: 'Autocomplete, inline lineage and compile previews inside the code editor your team already uses.', v: C4 },
        { f: 'Browser editor', tip: 'A hosted editor with a file tree, a results pane and a live graph. Nothing to install.', v: C4 },
        { f: 'Query parsing and checks', tip: 'Lattice reads every query before it runs, catching broken references and type mismatches early.', v: C4 },
      ],
    },
    {
      title: 'Schedule, release and keep watch',
      rows: [
        { f: 'Git integration', tip: 'Connect any hosted git provider. Branches map to development environments automatically.', v: C4 },
        { f: 'Data tests', tip: 'Declare expectations on columns and tables, and block a release when an expectation fails.', v: C4 },
        { f: 'Job schedules', tip: 'Cron or event-based schedules for builds, tests and snapshots, with retry rules per job.', v: C4 },
        { f: 'Source freshness alerts', tip: 'Warn or fail when an upstream table has not loaded new rows within the window you set.', v: C4 },
        { f: 'Run alerts and dashboards', tip: 'Run history, timing charts and alerts sent to chat or email when a job slows down or fails.', v: C4 },
        { f: 'Pre-merge impact builds', tip: 'Build and test only the models a pull request touches, plus everything downstream, before merging.', v: C2 },
      ],
    },
    {
      title: 'Find and trust the right data',
      rows: [
        { f: 'Project lineage graph', tip: 'An interactive graph from sources to dashboards, filterable by owner, tag or freshness.', v: C3 },
        { f: 'Column-level lineage', tip: 'Follow a single column through every transformation to see where its values come from.', v: C2 },
        { f: 'Searchable data catalog', tip: 'Search models, columns, metrics and owners across every project in your account.', v: C2 },
        { f: 'Usage insights', tip: 'See which models are queried most and which have gone unused, so cleanup is safe.', v: C2 },
      ],
    },
    {
      title: 'Define metrics once, reuse them',
      rows: [
        { f: 'Metrics service', tip: 'Define a metric in code once and serve the same number to every connected tool.', v: C3 },
        { f: 'Metric result caching', tip: 'Cache popular metric queries so dashboards load quickly without repeat warehouse spend.', v: C2 },
      ],
    },
    {
      title: 'Work across teams and domains',
      rows: [
        { f: 'Cross-project references', tip: 'Let one project build on public models from another without copying code or data.', v: C2 },
        { f: 'Model contracts and versions', tip: 'Publish a stable interface for a model, and ship breaking changes as a new version.', v: C2 },
        { f: 'Account-wide domain map', tip: 'A single view of every project, its owners and the dependencies between them.', v: C1 },
      ],
    },
    {
      title: 'Security, access and compliance',
      rows: [
        { f: 'Encryption in transit and at rest', tip: 'All traffic uses modern TLS, and stored artifacts are encrypted with managed keys.', v: C4 },
        { f: 'Two-step sign-in', tip: 'Require a second factor for every user in the account, enforced by an admin setting.', v: C4 },
        { f: 'Audit trail export', tip: 'Every sign-in, permission change and job edit is logged and exportable as structured events.', v: C3 },
        { f: 'Single sign-on', tip: 'Sign in through your identity provider, with automatic account creation on first login.', v: C2 },
        { f: 'Role-based permissions', tip: 'Grant read, develop or admin rights per project and per environment.', v: C2 },
        { f: 'Private network links', tip: 'Reach your warehouse over a private connection instead of the public internet.', v: C1 },
        {
          f: 'Hosting region',
          tip: 'Where your project metadata and run logs are stored. Dedicated tenancy is available on the top plan.',
          v: ['Shared, single region', 'Shared, single region', 'Shared, choice of three regions', 'Dedicated tenancy in any supported cloud region'],
        },
      ],
    },
    {
      title: 'Help & care',
      rows: [
        { f: 'Community forum', tip: 'Ask questions and share patterns with other Lattice builders, answered by peers and staff.', v: C4 },
        { f: 'Help desk', v: ['Docs', 'Chat', 'Chat, email, calls', 'Chat, email, calls'] },
        { f: 'Named success manager', v: C2 },
        { f: 'Response targets', v: [null, null, 'Priority queue with a one-business-day first reply for every request', 'Round-the-clock queue with a one-hour first reply for urgent tickets'] },
        { f: 'Onboarding workshops', v: C2 },
        { f: 'Architecture reviews', v: C2 },
      ],
    },
  ],
}

export const faqs = [
  {
    title: 'Plan FAQs',
    body: 'Answers to the questions teams ask most while choosing a plan for the first time.',
    items: [
      { q: 'Can I switch plans later on?', a: 'Yes. Upgrades apply right away and are prorated. Downgrades take effect at the start of your next billing period, and nothing in your project is deleted.' },
      { q: 'What counts as a builder seat?', a: 'Anyone who can edit models, run jobs or open pull requests. People who only browse docs, lineage and the catalog are free and unlimited on every plan.' },
      { q: 'What happens when we pass our monthly build allowance?', a: 'Runs keep going. Extra builds are billed at the rate on your order form, and admins get an email when usage reaches 80% of the allowance.' },
      { q: 'Do you offer discounts for nonprofits?', a: 'Registered nonprofits and teaching programs get Workshop at a reduced rate. Write to our team with proof of status and we will set it up.' },
      { q: 'Is a credit card required to start the Sketchpad or Workshop trial?', a: 'No. Both start without payment details. You add a card only when you decide to keep Workshop after the trial ends.' },
    ],
  },
  {
    title: 'Billing and usage questions',
    body: 'How invoices, meters and add-ons work once your team is up and running.',
    items: [
      { q: 'When are invoices sent?', a: 'Monthly plans are invoiced on the day you subscribed. Annual Atelier contracts are invoiced up front, with usage overages billed each quarter.' },
      { q: 'Which payments work?', a: 'Cards on monthly plans; cards, bank transfer or purchase orders on annual contracts.' },
      { q: 'How is Warm Cache usage metered?', a: 'Each model, check or snapshot that Warm Cache reuses on a given day counts once, no matter how many runs reused it that day.' },
      { q: 'Can I cap spend on Model Muse tokens?', a: 'It can. An owner sets a spending limit in settings; once Muse hits that limit it stops drafting until the following month begins.' },
      { q: 'Where can I see current usage?', a: 'The Usage page in account settings shows builds, metric queries and add-on meters, updated hourly.' },
      { q: 'Do unused allowances carry over to the next month?', a: 'No. Allowances reset on the first day of each billing month.' },
      { q: 'We run Lattice on our own servers. Can we keep that and pay only for add-ons?', a: 'Yes. Both add-ons work with self-hosted projects. Connect the project to a free account and only metered usage is billed.' },
    ],
  },
]

// route -> ordered sections (rendered by pages/templates/Sections.jsx)
export default {
  '/pricing': {
    sections: [
      {
        type: 'planCards',
        title: 'Plans that grow with every model you ship',
        body: 'Every plan includes builder seats and a monthly build allowance. As your project adds models and metric traffic, the plan grows with the value it delivers to you.',
        plans,
      },
      { type: 'addOns', ...addOns },
      { type: 'planMatrix', ...matrix },
      { type: 'faq', ...faqs[0] },
      { type: 'faq', ...faqs[1] },
    ],
  },
}
