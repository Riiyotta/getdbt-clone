// T5 case-study detail (specs/T5-T8.md B-T5), keyed by route path. Original placeholder copy for
// the fictional company "Lattice" and its fictional customers; people, quotes and metrics are invented.
import { articleImgs as art, customers } from '../../pageAssets'
import { asideCommunity, cta } from './shared'

const related = {
  type: 'related',
  eyebrow: 'More stories from data teams', // 26ch
  title: 'Teams that ship trusted data with Lattice', // 41ch
  cards: [
    {
      logo: customers.tidepool,
      title: 'Tidepool rebuilt its product analytics on tested models and cut ad hoc requests to the data team by more than two thirds',
      body: 'Product managers at Tidepool used to queue for answers. After moving their core events into documented, tested models, most questions now get answered by the people asking them, and the data team works on new problems instead of old ones.',
      link: 'Read the story',
      to: '#',
    },
    {
      logo: customers.ferrocene,
      title: 'Ferrocene brings nine plants into one versioned forecast',
      body: 'Sensor exports and supplier files used to be stitched together by hand before every planning cycle. A single tested project now feeds the forecast, and planners can trace any figure back to its source rows.',
      link: 'Read the story',
      to: '#',
    },
    {
      logo: customers.orbitly,
      title: 'Orbitly lowered its warehouse bill by sixty percent while doubling the number of teams it serves from one shared project',
      body: 'Compute costs were growing faster than the team. State-aware builds that skip unchanged models brought spend down in the first month, and the same project now supports twice as many internal teams without adding a single hire.',
      link: 'Read the story',
      to: '#',
    },
  ],
}

const closing = {
  type: 'ctaBand',
  title: 'See Lattice on your data', // 24ch
  body: 'Bring a real project and a real question. A solutions engineer will walk through modeling, testing and deployment with you, using your own warehouse.',
  primary: cta('Book a demo', '/contact'),
  secondary: cta('Start for free', '/signup'),
  aside: asideCommunity,
}

const facts = (industry, hq, last) => [
  { label: 'Industry', value: industry },
  { label: 'Headquarters', value: hq },
  last,
]

export default {
  // ------------------------------------------------------------------ representative (S5 stroke)
  '/case-studies/halcyon': {
    sections: [
      {
        type: 'storyHeader',
        stroke: 'S5',
        logo: customers.halcyon,
        title: 'Halcyon gives every trading desk self-serve data on a governed Lattice platform', // 79ch/2
        stats: [
          { value: '4-6 billion', label: 'market events processed per trading day' },
          { value: '70', label: 'analysts and engineers shipping reviewed models each week' },
        ],
        quote:
          'Before Lattice, a question from a desk head could take a week to answer because three teams had to agree on where the data came from. Now there is one tested definition, one place to look it up, and most desks answer their own questions before lunch.',
        name: 'Grace Okafor',
        role: 'Chief Data Officer',
      },
      {
        type: 'storyBody',
        meta: {
          logo: customers.halcyon,
          facts: facts('Financial markets', 'Rotterdam, Netherlands', { label: 'Founded', value: '1998' }),
        },
        blocks: [
          ['h3', 'A market operator whose reporting had outgrown its spreadsheets and nightly scripts'],
          ['p', '[Halcyon](/case-studies) runs trading venues and clearing services for equities and commodities across nine European markets. Every trading day its systems record several billion market events, and every one of them can end up in a regulatory filing, a client report or an internal risk dashboard.'],
          ['p', 'For years that reporting ran on a patchwork of scheduled scripts, spreadsheets and a legacy warehouse that only two engineers fully understood. It worked, mostly. But each new regulatory requirement meant another script, and every desk had quietly built its own version of the same core figures, which made reconciling them a recurring and expensive chore.'],
          ['p', 'When the company set out to modernise its data stack, the goal was simple to state and hard to achieve: one trusted version of every number.'],
          ['h4', 'The starting point: knowledge that lived in a handful of heads'],
          ['h4', 'Opportunity 1: let desks help themselves'],
          ['p', 'The first opportunity was speed. Desk heads and product managers asked questions faster than the central team could answer them. A typical request involved finding the right tables, checking with the team that owned them, writing a one-off query and then explaining the caveats. By the time an answer arrived, the decision it was meant to inform had often been made already.'],
          ['p', 'Grace Okafor, Halcyon’s Chief Data Officer, wanted the people closest to each market to be able to answer routine questions on their own.'],
          ['h4', 'Opportunity 2: prove where every regulated figure comes from'],
          ['p', 'The second opportunity was trust. Regulators increasingly asked Halcyon to show how reported figures were derived. With logic spread across scripts and spreadsheets, producing that evidence took weeks of manual work for every audit.'],
          ['p', 'Okafor’s team needed lineage they could show to an auditor: a clear, versioned record of how raw events became a published figure.'],
          ['p', 'Both goals pointed at the same foundation.'],

          ['h3', 'One governed project instead of many scripts'],
          ['h4', 'Choosing a platform that analysts could actually use'],
          ['p', 'Halcyon evaluated several approaches, from building in-house tooling to adopting a full data platform.'],
          ['p', 'The team chose Lattice because analysts could write models in plain SQL while engineers kept the review, testing and deployment controls they needed.'],
          ['p', 'Migration started with the most-used figures: daily traded volumes, settlement exposure and fee revenue. Each was rebuilt as a set of staged and modelled tables, tested, documented and reviewed by the desk that relied on it most.'],
          ['h4', 'Tests that encode the rules of the market'],
          ['p', 'Alongside standard checks on keys and nulls, the team wrote tests for the rules every trader knows by heart: trades never settle before they execute, fees never exceed agreed caps and every instrument maps to exactly one venue.'],
          ['p', 'Those tests now run on every change and every nightly build. When a source system delivers something unexpected, the build stops and the owner is alerted before any report goes out.'],
          ['h4', 'Reviews as standard'],
          ['p', 'Every change to a production model goes through a pull request with at least one approval from someone outside the author’s team.'],
          ['p', 'Reviewers see which downstream reports are affected and a sample of changed rows before they approve, which has turned reviews from a formality into a genuine safety net.'],
          ['h4', 'Lineage for auditors'],
          ['p', 'Because every model, test and change lives in version control, lineage is no longer reconstructed by hand. It is generated from the project itself.'],
          ['p', 'For the last two audits, Halcyon answered lineage requests in hours rather than weeks, with no findings on change control.'],

          ['h3', 'From a legacy warehouse to a modern stack, without stopping the business'],
          ['img', art.halcyonFlow],
          ['h4', 'Running old and new side by side for a quarter'],
          ['p', 'Halcyon could not afford a big-bang migration. For three months the legacy scripts and the new Lattice models ran in parallel, and a reconciliation model compared their outputs every night.'],
          ['p', 'Differences were triaged daily. Most turned out to be long-standing quirks in the old scripts, such as time-zone handling around market close, which the team documented and fixed rather than reproducing.'],
          ['p', 'When a figure matched for thirty consecutive trading days, its old script was switched off and the new model became the source of truth.'],
          ['p', 'By the end of the quarter, more than four hundred scripts had been retired.'],
          ['h4', 'Making lineage, documentation and ownership part of daily work'],
          ['p', 'Every model now has a named owner and a one-line description, and both are checked automatically during review.'],
          ['p', 'Analysts browse the catalog to find certified tables before writing anything new, which has sharply reduced duplicate work across desks.'],
          ['p', 'The documentation site is now the first place new joiners go. Onboarding that used to take a quarter now takes a few weeks.'],
          ['p', '“The catalog changed how people ask questions,” says Okafor. “They start by looking for an answer that already exists, and most of the time it does.”'],
          ['p', 'Desk-level dashboards were rebuilt on top of [certified metrics](/product/semantic-layer), so every desk sees the same definition of volume, exposure and revenue.'],

          ['h3', 'Self-serve answers for every desk and product team'],
          ['h4', 'Metrics people can find'],
          ['p', 'Halcyon’s semantic layer now holds around two hundred certified metrics, each with an owner, a description and tests.'],
          ['p', 'Desk analysts query those metrics directly from their spreadsheet and reporting tools, without writing SQL or waiting for the central team.'],
          ['h4', 'Fewer tickets, faster answers for the people who make decisions'],
          ['p', 'Requests to the central data team fell by more than half within six months.'],
          ['p', 'These days most of the team’s hours go into fresh data products, such as intraday risk views, rather than repeating the same extracts every week.'],
          ['h4', 'An assistant that reads the same definitions as the people using it'],
          ['p', 'Halcyon has started piloting an internal assistant connected to its Lattice project through the context service.'],
          ['p', 'Because the assistant reads the same certified metrics and descriptions as analysts do, its answers match the numbers on the dashboards.'],
          ['p', 'Every question the assistant answers is logged with the models and metrics it used, which the governance team reviews weekly.'],
          ['p', 'Early users report that the assistant is most helpful for finding the right table and explaining unfamiliar columns.'],
          ['p', 'The pilot will expand to all desks next year, with the same review and permission rules as the rest of the platform.'],

          ['h3', 'What comes next for Halcyon’s data platform'],
          ['p', 'With the core migration complete, Halcyon is turning to the next set of problems: bringing intraday data into the same governed project, and using state-aware builds to keep compute costs flat as volumes grow.'],
          ['h4', 'Intraday data in the same project'],
          ['p', 'The team is extending the project to cover intraday risk, using event-based triggers so models rebuild as soon as new data lands.'],
          ['p', 'The same tests and reviews will apply, so intraday figures carry the same guarantees as end-of-day ones.'],
          ['p', 'First intraday views are already live for two desks.'],
          ['h4', 'Keeping costs flat while data grows'],
          ['p', 'State-aware builds already skip most unchanged models on a typical night. As volumes grow, the team expects that to keep compute spend roughly flat.'],
          ['p', 'Cost per model is now reviewed monthly alongside quality metrics, with owners accountable for both.'],
          ['p', '“We used to argue about where numbers came from,” says Okafor. “Now we argue about what to build next. That is a much better argument to have.”'],
        ],
      },
      related,
      closing,
    ],
  },

  // ------------------------------------------------------------------ Kestrel (S10)
  '/case-studies/kestrel': {
    sections: [
      {
        type: 'storyHeader',
        logo: customers.kestrel,
        title: 'Kestrel halves its nightly build time and gives store managers fresh numbers before the morning shift begins', // 92ch/3
        stats: [
          { value: '52%', label: 'shorter nightly runs' },
          { value: '400+', label: 'production models on state-aware builds' },
          { value: '3.2x', label: 'more models shipped per sprint' },
        ],
        quote: 'Our nightly load used to finish after stand-up, so nobody trusted the first dashboards of the day. Now every number is ready before anyone logs on.',
        name: 'Priya Raman',
        role: 'Head of Analytics Engineering',
      },
      {
        type: 'storyBody',
        meta: {
          logo: customers.kestrel,
          facts: [
            ...facts('Food and grocery retail', 'Copenhagen, Denmark', { label: 'Stores', value: '310 across four countries' }),
            { label: 'Data platform and tools used', value: 'Cobalt DB, Lattice, Driftway connectors' },
          ],
        },
        blocks: [
          ['h3', 'A grocery chain that runs on early-morning numbers'],
          ['p', 'Kestrel operates more than three hundred grocery stores across four Nordic countries. Store managers plan staffing, deliveries and markdowns every morning based on the previous day’s sales, stock and waste figures.'],
          ['p', 'Those figures came from a nightly batch that rebuilt the entire warehouse from scratch. As the business grew, the batch grew with it, until it regularly finished after stores had already opened.'],
          ['p', 'Managers started making decisions on numbers that were a day older than they thought, and the data team spent its mornings explaining delays instead of building anything new.'],
          ['p', 'Fresh produce makes the timing even more important. A markdown decided an hour late can mean a crate of berries thrown away instead of sold, and across three hundred stores those hours add up to real money and real waste.'],
          ['h4', 'The cost of rebuilding everything every night'],
          ['p', 'Most of the work in the nightly batch was wasted. Only a small share of source tables changed on a typical day, yet every model was rebuilt regardless, which made the job slow and expensive.'],
          ['ul', ['Nightly runs took more than six hours and often failed late in the process.', 'Warehouse costs grew faster than sales for two years in a row.']],
          ['p', 'The team had tried to speed things up with bigger warehouse settings and by splitting the batch into stages. Each fix helped for a few months, until data volumes caught up again and the runs slipped back past opening time.'],

          ['h3', 'Rebuilding only what changed'],
          ['p', 'Kestrel moved its project to Lattice and switched on state-aware builds for production. Before each run, Lattice now checks which sources and models have changed since the last successful build and skips everything else.'],
          ['p', 'On a normal night, fewer than half of the models need rebuilding. The rest are reused as they are.'],
          ['img', art.kestrelFlow],
          ['p', 'The switch itself took a few weeks. Most of that time went into tidying up models that depended on the current date or on tables outside the project, which made it hard to tell whether their inputs had really changed.'],
          ['h4', 'Freshness rules instead of a fixed schedule'],
          ['p', 'The team also replaced the single nightly schedule with freshness rules. Sales models rebuild as soon as till data lands; slower-moving reference data rebuilds once a week.'],
          ['p', 'Event-based triggers mean the morning numbers are ready the moment their inputs land, not at a fixed hour picked years ago.'],
          ['p', 'Each freshness rule was agreed with the people who use the figures. Store operations wanted sales by six in the morning; the buying team was happy with supplier data refreshed twice a day.'],

          ['h3', 'Faster runs, fewer failures'],
          ['p', 'Nightly runs now finish in about half the time, and most mornings the store dashboards are ready well before the first shift starts.'],
          ['p', 'Because each run does less work, failures are rarer and much easier to diagnose. When something does break, only the affected models need to be rerun.'],
          ['p', 'The on-call rotation got quieter as well. In the quarter before the move the team was paged for a failed run almost every week; in the quarter after, it happened twice.'],
          ['h4', 'A smaller bill for the same results'],
          ['p', 'Warehouse spend dropped by roughly a third in the first quarter after the switch, with no reports removed and no changes to the questions the business asks.'],
          ['p', 'Finance now receives a monthly breakdown of spend by model and by business area, which has made budget conversations shorter and far less tense than they used to be.'],
          ['h4', 'Tests where they matter most'],
          ['p', 'With time freed up, the team added tests on the figures store managers rely on most: stock levels never negative, markdowns never above list price and every store reporting every day.'],
          ['ul', ['Freshness checks on every till feed.', 'Reconciliation tests between sales and stock movements.', 'Alerts routed to the owner of each regional mart.']],

          ['h3', 'More models, shipped with confidence'],
          ['p', 'Faster builds made development faster too. Continuous integration runs only the changed models and their dependants, so a pull request gets feedback in minutes rather than hours.'],
          ['p', 'The team now ships more than three times as many models per sprint as it did before the move, without any increase in incidents.'],
          ['h4', 'New analysts productive in a week'],
          ['p', 'Documentation and examples live next to the code, and every change is reviewed. New analysts ship their first production model within a week of joining.'],
          ['p', '“The project explains itself now,” says Priya Raman, Head of Analytics Engineering. “That used to be my job.”'],
          ['p', 'Each newcomer starts with a small, well-scoped change chosen in advance, paired with a reviewer who knows that part of the project well. By the end of the week they have shipped something real and know where to look for help.'],

          ['h3', 'What comes next'],
          ['p', 'Kestrel is extending the same approach to its supply chain data, where faster and cheaper builds could support intraday replenishment decisions.'],
          ['h4', 'Metrics for every store'],
          ['p', 'The team is also moving its key store metrics into the semantic layer, so that store dashboards, finance reports and a planned assistant for store managers all read the same definitions.'],
          ['p', 'The goal for next year is simple: every number a store manager sees in the morning is tested, documented and ready on time.'],
          ['p', 'Store managers were involved from the start. A small group of them reviewed draft metric definitions and pointed out several cases, such as stores that close for a season, that the data team had not considered.'],
        ],
      },
      related,
      closing,
    ],
  },

  // ------------------------------------------------------------------ Meridian Partners (S10)
  '/case-studies/meridian-partners': {
    sections: [
      {
        type: 'storyHeader',
        logo: customers.meridian,
        title: 'Meridian Partners standardises reporting across eleven regional desks', // 69ch/2
        stats: [
          { value: '11', label: 'regional desks on one governed project' },
          { value: '4 days', label: 'saved on every quarterly close' },
          { value: '0', label: 'manual reconciliations last quarter' },
        ],
        quote:
          'Every desk had its own version of assets under management, and reconciling them took a week each quarter. Now one tested definition feeds all eleven desks. The quarterly close has become a short review meeting instead of a week of firefighting, and our analysts finally spend their time on questions clients actually ask. When a number changes, we know exactly why, who approved it and which reports it touches.',
        name: 'Tomas Ekberg',
        role: 'Director of Data Platforms',
      },
      {
        type: 'storyBody',
        meta: {
          logo: customers.meridian,
          facts: facts('Asset management', 'Edinburgh, United Kingdom', { label: 'Data platform and tools used', value: 'Quarry, Lattice, Lattice semantic layer' }),
        },
        blocks: [
          ['h3', 'Eleven desks, eleven versions of the truth'],
          ['p', 'Meridian Partners manages investment portfolios for pension funds and foundations through eleven regional desks. Each desk had grown its own reporting over the years, built on shared source data but with its own spreadsheets, scripts and definitions.'],
          ['p', 'The result was eleven slightly different answers to the same questions. Assets under management, net flows and fee income were calculated in subtly different ways depending on who you asked.'],
          ['h4', 'A week lost every quarter'],
          ['p', 'Every quarter-end, analysts from every desk spent most of a week reconciling their figures before anything could go to clients or the board.'],
          ['quote', 'We had very good people spending a week every quarter proving that two spreadsheets agreed with each other. That is not analysis. That is archaeology.'],
          ['p', 'The work was tedious and risky. Small differences were often explained away rather than fixed, and the same discrepancies came back quarter after quarter, each time requiring someone to remember how they had been resolved before.'],

          ['h3', 'One project, shared definitions'],
          ['p', 'Meridian consolidated desk reporting into a single Lattice project. Core figures were rebuilt once, as tested models and certified metrics, and each desk was given ownership of the parts specific to its region.'],
          ['p', 'The migration took six months and ran desk by desk, starting with the two largest. Each desk kept producing its old reports until the new figures had matched them for a full month.'],
          ['h4', 'Agreeing on the definitions first'],
          ['p', 'Before writing any SQL, desk heads agreed on written definitions for the twelve most important figures. Where desks genuinely needed different views, the differences were made explicit and named.'],
          ['ul', ['Twelve core metrics defined once in the semantic layer.', 'Desk-specific views built on top, never alongside.', 'Every metric owned by a named person with a backup.']],

          ['h3', 'Reviews and tests that replace reconciliation'],
          ['p', 'Every change to a shared model is reviewed by at least one person from another desk. Tests check that regional totals always sum to the firm-wide figure, so a mismatch is caught on the day it happens rather than at quarter-end.'],
          ['quote', 'The first quarter-end on the new project was strangely quiet. We kept waiting for the reconciliation to start, and then realised it had been happening every day in the tests.'],
          ['h4', 'Lineage for client questions'],
          ['p', 'When a client asks how a figure was calculated, analysts can now show the exact models, tests and approvals behind it, generated straight from the project.'],
          ['p', 'Client-facing teams say this has changed the tone of difficult conversations. Instead of promising to look into a figure, they can explain it on the spot, with the evidence in front of them.'],

          ['h3', 'Results'],
          ['p', 'Meridian’s quarterly close is now four days shorter, and there were no manual reconciliations at all last quarter.'],
          ['h4', 'More time for clients'],
          ['p', 'Analysts who used to spend quarter-end reconciling now spend it preparing client commentary, which client relationship managers say has noticeably improved.'],
          ['quote', 'Our analysts are writing about markets again instead of about spreadsheets. Clients noticed before we told them anything had changed.'],
          ['p', 'The firm has also started publishing a short internal note each quarter describing any changes to metric definitions, so that nobody is surprised by a figure that moved for a methodological reason.'],

          ['h3', 'Next steps'],
          ['p', 'Meridian plans to bring its risk reporting into the same project next year and is piloting an assistant for client-facing teams that reads the same certified metrics as every desk.'],
          ['h4', 'Expanding to risk'],
          ['p', 'Risk models will follow the same pattern: shared definitions, desk ownership and tests that catch disagreements as soon as they appear.'],
          ['p', 'The team expects risk to be harder than performance reporting, because some of the models involve judgement as well as arithmetic. Writing those judgements down and agreeing who owns them is the first milestone.'],
        ],
      },
      related,
      closing,
    ],
  },

  // ------------------------------------------------------------------ Basalt Health (S10)
  '/case-studies/basalt-health': {
    sections: [
      {
        type: 'storyHeader',
        logo: customers.basalt,
        title: 'Basalt Health unifies clinical and operational reporting', // 64ch/2-ish
        stats: [
          { value: '24', label: 'hospitals on one tested capacity model' },
          { value: '45%', label: 'faster monthly reporting' },
          { value: '1', label: 'shared definition of an available bed' },
        ],
        quote: 'Clinical and finance teams were reading different bed counts in the same meeting. One governed model now feeds both, with tests on every load, so we talk about patient flow instead of whose numbers are right.',
        name: 'Dr. Mei Lin',
        role: 'Director, Clinical Informatics',
      },
      {
        type: 'storyBody',
        meta: {
          logo: customers.basalt,
          facts: facts('Healthcare', 'Melbourne, Australia', { label: 'Data platform and tools used', value: 'Helixa, Lattice, Lattice catalog' }),
        },
        blocks: [
          ['h3', 'Two teams, two bed counts'],
          ['p', 'Basalt Health runs twenty-four hospitals and a network of community clinics. Its clinical and finance teams both report on capacity, but for years they built those reports separately, from different extracts and with different rules.'],
          ['p', 'In planning meetings that meant two numbers for available beds, and a long discussion about which one was right before any real decision could be made.'],
          ['p', 'Both teams were doing careful, honest work. The problem was that nobody had ever written down what a bed meant, so each team had quietly settled on the definition that suited its own reporting needs.'],
          ['h3', 'Why the numbers disagreed'],
          ['p', 'The differences were not mistakes so much as unwritten assumptions. Clinical reports counted beds that were staffed; finance counted beds that were funded. Neither definition was written down anywhere.'],
          ['ul', ['Different extracts taken at different times of day.', 'Different rules for beds closed for cleaning.', 'No shared record of who owned which figure.']],
          ['h3', 'One model, owned together'],
          ['p', 'Basalt rebuilt capacity reporting as a single Lattice project owned jointly by clinical informatics and finance. Both definitions of a bed were kept, but named, documented and calculated from the same source data.'],
          ['p', 'Every load is now tested: bed counts never negative, every ward mapped to one hospital, every hospital reporting every hour.'],
          ['p', 'Joint ownership was a deliberate choice. Every change to the capacity model needs one approval from clinical informatics and one from finance, which keeps both teams involved in every decision.'],
          ['h3', 'Privacy built into the project'],
          ['p', 'Patient-level data stays in tightly controlled staging models. Everything downstream works with aggregated counts, and access rules are part of the project configuration, reviewed like any other change.'],
          ['ul', ['Patient identifiers removed at the staging layer.', 'Access to staging limited to a small, audited group.', 'Every change to access rules goes through review.', 'Quarterly audit of who can see what.']],
          ['h3', 'Results'],
          ['p', 'Monthly capacity reporting is now forty-five percent faster to produce, and planning meetings start from a single set of figures.'],
          ['p', 'The catalog has become the place clinicians and finance staff look up what a figure means before asking the data team.'],
          ['h3', 'Reporting that keeps up with the wards'],
          ['p', 'Hourly freshness rules mean bed availability is updated through the day, not just overnight. Ward managers use the same figures as the executive team.'],
          ['ul', ['Hourly capacity updates for every hospital.', 'Alerts to ward owners when data is late.', 'One dashboard for clinical and finance leaders.']],
          ['h3', 'What is next'],
          ['p', 'Basalt is extending the same approach to theatre scheduling and outpatient waiting lists, starting with written definitions agreed by clinical and operational leads.'],
          ['p', '“Writing the definitions down was the hardest part,” says Dr. Mei Lin. “Everything after that was engineering.”'],
          ['p', 'The team has also started training clinical staff to read the catalog and the model descriptions, so that questions about definitions can be answered without a meeting.'],
        ],
      },
      related,
      closing,
    ],
  },
}
