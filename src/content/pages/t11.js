// T11 legal / policy pages (specs/T9-T11.md E), keyed by route path. PLACEHOLDER TEXT for the fictional
// company "Lattice": written fresh at the spec's outline (heading levels, element counts, per-part
// lengths). It is not legal advice and is not based on any real company's terms or statements.
import { articleImgs as art } from '../../pageAssets'
import { termsBlocks } from './t11-terms'

const NOTE = '*Placeholder text for a fictional company. This page is not a real policy and has no legal effect.*'

export default {
  '/modern-slavery-statement': {
    sections: [
      { type: 'policyHeader', title: 'Supply chain statement', updated: 'Last updated: 1 October 2026, version 3' },
      {
        type: 'policyBody',
        blocks: [
          // part 1
          ['h2', 'About this page'],
          ['p', `${NOTE} It shows how a short statement about fair labour in a supply chain might be laid out for a software company like Lattice, with the headings and lists a reader would expect to find.`],
          ['p', '**Scope of the statement.** In this example, the statement covers the fictional Lattice group and every subsidiary listed in its annual report for the twelve months ending in September. It describes the steps the company says it takes to make sure that people working for it, and for the businesses it buys from, are treated fairly, paid properly and free to leave their jobs. A real statement would be approved by the board, signed by a director and published within six months of the year end.'],
          // part 2
          ['h2', 'Who we are'],
          ['h3', 'Our business'],
          ['p', 'Lattice, in this placeholder, builds software that helps data teams model, test and share information. Its employees are mostly engineers, designers, support staff and sales people who work from offices in a handful of cities or from home. The company does not manufacture physical goods, run warehouses or operate retail stores, so most of its exposure to labour risk sits with suppliers rather than within its own workforce.'],
          ['h3', 'Our supply chain'],
          ['p', 'The fictional company buys cloud hosting, office space and services, laptops and other hardware, marketing services, travel, catering for events and branded merchandise. A small number of these categories, especially hardware and merchandise, rely on manufacturing in regions where workers can be more vulnerable, and those categories receive the closest attention in the steps described below.'],
          // part 3
          ['h2', 'Policies that set our expectations for suppliers'],
          ['p', 'In this placeholder, Lattice puts its expectations into the purchase contract itself rather than into a separate document. Every order above a modest value carries four fair-work clauses: wages are paid in full, on time and into an account the worker controls; overtime is voluntary and recorded; nobody pays a broker or agency to be hired; and the buyer may visit any site that makes goods for it with two weeks of notice. A fifth clause asks the seller to place the same four promises in its own purchase contracts. Alongside the contracts, the fictional company funds a multilingual phone and text line, run by an independent charity, that anyone in its supply chain can use to report a problem without giving their name; the charity passes on reports in summary and never shares the identity of a caller. Internally, a single page in the employee handbook explains who owns each clause, how a breach is escalated and how the finance team holds payment while a serious report is checked. The legal team reviews the clauses with an outside adviser each spring and records what changed and why.'],
          // part 4
          ['h2', 'How we assess risk and check that our suppliers meet the standards we set'],
          ['h3', 'Mapping the supply chain'],
          ['p', 'Each year the procurement team, in this example, exports a list of every supplier paid more than a set amount and groups them by category and country. Categories are scored for inherent risk using publicly available indices and the team’s own judgement, which produces a short list of suppliers that deserve a closer look.'],
          ['h3', 'Questions we ask'],
          ['p', 'Suppliers on the short list receive a questionnaire about how they recruit, pay and house workers, whether they use agencies, and how they check their own suppliers. Answers are reviewed by someone outside the team that manages the relationship.'],
          ['h3', 'Signals that prompt a closer look'],
          ['p', 'The team watches for a small set of warning signs that would trigger a deeper review or an independent audit:'],
          ['ul', ['Unusually low prices', 'Reluctance to share factory details', 'Heavy use of labour agencies', 'Recent news reports about the region or sector', 'Missing or late answers to questions']],
          ['h3', 'When something is wrong'],
          ['p', 'If a review finds a problem, the placeholder policy is to work with the supplier on a written plan with clear dates rather than to walk away immediately, because ending a contract can leave workers worse off. Where a supplier refuses to engage, or where workers are in immediate danger, the relationship ends and the matter is reported to the relevant authorities.'],
          ['p', 'Progress on each plan is reviewed every quarter by the procurement lead and summarised for the board once a year, alongside the number of suppliers reviewed and the number of plans opened and closed.'],
          // part 5
          ['h2', 'Training our employees'],
          ['p', 'Everyone in the fictional company completes a short course on recognising signs of forced labour and on how to raise a concern, and people who buy goods or services on the company’s behalf take a longer course every year. Completion rates are tracked by the people team and reported alongside the statement, together with a short summary of any questions or concerns that the training prompted.'],
          ['empty'],
          // part 6
          ['h2', 'What we measured this year and what we plan to do next'],
          ['h3', 'Measures of progress'],
          ['p', 'A real statement would report numbers here. In this placeholder version, the company tracks the share of new contracts carrying the fair-work clauses, the number of short-listed suppliers who returned the questionnaire, the number of independent audits carried out and the number of concerns raised through the whistleblowing line.'],
          ['ul', [
            'Fair-work clauses appeared in every purchase contract signed during the year, and the eleven sellers who asked to amend them were given a short call with the legal team, after which nine signed the standard wording and two agreed adjusted notice periods for site visits.',
            'Most short-listed suppliers returned the questionnaire within the agreed time, and the remainder were contacted directly by the procurement lead to understand the delay and agree a new date.',
            'Two independent audits were carried out at merchandise suppliers, and both led to short improvement plans covering working hours and the way overtime was recorded and paid to temporary staff.',
            'No concerns about forced labour were raised through the whistleblowing line, although several general questions about supplier standards were answered and added to the internal frequently asked questions page.',
            'Completion of the annual training course reached nearly every eligible employee, and the longer course for people who buy goods or services reached all of them before the end of the reporting period.',
          ]],
          ['h3', 'Plans for the coming year'],
          ['p', 'For the next reporting period, the fictional company plans to extend the questionnaire to a wider group of suppliers, add clearer guidance for event organisers and publish a short summary of audit findings for employees.'],
          ['p', 'It also intends to review how risk scores are calculated, so that new suppliers in high-risk categories are checked before their first order rather than at the next annual review.'],
          ['ul', [
            'Bring every seller of branded merchandise and event services into the questionnaire process, and ask each one to confirm the countries in which their own suppliers make the products they sell to us.',
            'Publish internal guidance for teams that organise events, covering what to ask venues, caterers and staffing agencies before signing a contract and what to do if their answers raise concerns.',
            'Share a short, plain summary of audit findings with all employees each year, so that people across the company understand what was found and what changed as a result.',
          ]],
          // part 7
          ['h2', 'Approval and sign-off for this statement'],
          ['p', 'In a real statement, this section would confirm that the board of directors reviewed and approved the statement at a named meeting and that it applies to every company in the group required to publish one. Because this page is a placeholder for a fictional business, none of the commitments, measures or plans described above have been made by any real organisation. The names and dates below are invented and are shown only so that the layout matches a finished statement.'],
          ['p', 'Approved by the board'],
          ['p', 'Jordan Ellison, Director'],
          ['p', 'On behalf of Lattice and its subsidiaries'],
          ['p', '**October 2026**'],
        ],
      },
    ],
  },

  '/legal/ai-principles': {
    sections: [
      { type: 'policyHeader', title: 'How Lattice approaches AI responsibly' },
      {
        type: 'policyBody',
        chapterAt: 'h3',
        blocks: [
          ['h3', 'Why we write principles down at all'],
          ['p', `${NOTE} It sketches how a software company might explain the rules it follows when it builds assistants and other AI features into its products. In this example, Lattice adds AI features to tools that people use to model and share data. Those features can draft code, suggest tests, explain unfamiliar parts of a project and answer questions about data. Because the answers can influence real decisions, the company wants anyone using them to know what to expect and what it will not do. These principles apply to every AI feature in the fictional product, whether it is generally available, in preview or still an experiment shared with a small group of design partners. They are reviewed every six months by a group that includes engineering, product, legal and security, and changes are announced in the release notes so that customers are never surprised.`],
          ['h3', 'Grounded in your data'],
          ['p', 'An assistant is only useful when it understands the project it is working in. Lattice features are designed to read the models, descriptions, tests and metric definitions that a team has already written, rather than guessing from table names or general knowledge.'],
          ['p', 'When an answer depends on a definition, the assistant shows which model or metric it used, so a person can check the source. If the project does not contain enough information to answer, the assistant says so instead of inventing an answer. You can read more about how context is shared in the [context service overview](/product/assistant).'],
          ['p', 'Customers decide what an assistant can see. Access follows the permissions of the person using it, and administrators can turn features off for a whole account or for individual projects. Every request made by an automated agent is logged with the question, the objects it read and the identity it acted for, and those logs are available to account administrators through the [audit settings](/security).'],
          ['h3', 'People stay in charge'],
          ['p', 'AI features in this fictional product suggest; people decide. Generated code, tests and documentation arrive as drafts that go through the same review as any other change. Nothing an assistant writes reaches a production project without a person approving it, and automated agents are given read-only access by default. Teams can tighten these rules further, but the product will not loosen them.'],
          ['h3', 'Privacy'],
          ['p', 'Customer data used to answer a question stays within the customer’s account and is not used to train shared models. Prompts and responses are kept only as long as needed to provide the feature and to keep an audit trail, and customers can choose shorter retention periods.'],
          ['p', 'Where a feature relies on a third-party model provider, the provider is bound by contract to the same rules: no training on customer data, no retention beyond what the feature requires and processing only in the regions the customer has chosen. A current list of providers would be published here in a real policy, together with the regions in which each one processes data and the date each agreement was last reviewed.'],
          ['h3', 'Measured quality'],
          ['p', 'Before an AI feature is released more widely, the fictional team measures how often it gives correct, useful answers on a set of realistic test projects, and how often it declines to answer when it should. Results are compared with the previous version, and a feature that gets worse on either measure does not ship until the cause is understood.'],
          ['ul', [
            { text: '**Evaluation before release.** Every AI feature is tested against a library of example projects that reflect the kinds of work customers do, from small teams with a few dozen models to large companies with thousands. The library includes deliberately incomplete projects, so the team can check that the assistant admits when it does not know something instead of producing a confident guess.', items: ['Accuracy is measured against answers written and reviewed by experienced practitioners.', 'Refusals are measured on questions the project cannot answer.'] },
            { text: '**Monitoring after release.** Once a feature is live, the team watches aggregate signals such as how often suggestions are accepted, edited or rejected, and how often people report a wrong answer. Individual prompts are not read by staff unless a customer shares them in a support request or explicitly opts in to a research programme. When a pattern of problems appears, the feature can be rolled back for everyone within minutes while the team investigates, and affected customers are told what happened and what changed.', items: ['Customers can report a wrong answer from inside the product with one click.'] },
          ]],
          ['img', art.principles],
          ['h3', 'Open about limits'],
          ['p', 'Every AI feature in this placeholder product carries a short note that explains what it is good at, what it is not designed for and where its answers come from. When those limits change, the note changes too, and the release notes say why.'],
        ],
      },
    ],
  },

  '/terms-of-use': {
    sections: [{ type: 'policyBody', pt0: false, blocks: termsBlocks(NOTE) }],
  },
}
