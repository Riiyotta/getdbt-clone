// T12 company / program pages (specs/T12-T13.md D), keyed by route path.
// Original placeholder copy for the fictional company "Lattice". People, partners, badges and
// roles are invented; avatars are illustrated. Trailing `// n` comments give the spec's character
// target for the block (n ch, or n/lines).
import { avatars, badges, cards as cardImgs, icons, illus, photos, resources as resImgs } from '../../pageAssets'
import { crop } from '../../components/sections/parts'
import { asideCommunity, cta } from './shared'

const ph = (i, w, h) => crop({ ...photos[i - 1], alt: PHOTO_ALT[i - 1] }, w, h)
const PHOTO_ALT = [
  'Illustration: the Lattice team gathered outdoors',
  'Illustration: an engineer reviewing a model at a desk',
  'Illustration: a community meetup audience',
  'Illustration: an analyst working late on a dashboard',
  'Illustration: a workshop group at a company offsite',
  'Illustration: a practitioner presenting a project',
  'Illustration: colleagues at a team planning day',
  'Illustration: a developer pairing over a laptop',
  'Illustration: a conference crowd between sessions',
  'Illustration: a consultant preparing a migration plan',
  'Illustration: volunteers at a community event',
  'Illustration: a mentor answering a question',
  'Illustration: attendees at a regional meetup',
  'Illustration: a speaker rehearsing a talk',
  'Illustration: a hackathon team at work',
  'Illustration: a learner finishing a course module',
]

// ---------------------------------------------------------------- shared blocks
// about-us section 4 / values section 3: icon 56, title link, p mb-10, text link (wash)
const learnMore = {
  type: 'feat',
  variant: 'B',
  iconSize: 56,
  title: 'Get to know Lattice better', // 25
  body: 'Read how we work, follow the newest company updates, and see what customers build on Lattice.', // 85
  cards: [
    {
      icon: icons.heart,
      title: 'Our values', // 9-17
      body: 'The habits and commitments that shape how we hire, decide, ship and support each other every week.', // 74-113
      cta: cta('Read our values', '/about-us/values'),
    },
    {
      icon: icons.book,
      title: 'Newsroom',
      body: 'Announcements, coverage and product launches, gathered for reporters and curious readers alike.',
      cta: cta('Visit the newsroom', '/press'),
    },
    {
      icon: icons.chart,
      title: 'Customer stories',
      body: 'See how analytics teams of every size put Lattice to work and ship dependable, well-tested data products faster than before.',
      cta: cta('Read customer stories', '/case-studies'),
    },
  ],
}

// ---------------------------------------------------------------- careers: open roles
// 16 departments, as on the original; the clone lists a representative 48 roles (the original
// lists 171) -- every department keeps at least one row.
const loc = {
  remoteUs: 'Remote, United States',
  remoteEu: 'Remote, Europe',
  remoteUk: 'Remote, United Kingdom',
  remoteCa: 'Remote, Canada',
  remoteIn: 'Remote, India',
  remoteAu: 'Remote, Australia',
  hybridNy: 'Hybrid, New York City office',
  hybridSf: 'Hybrid, San Francisco office',
  hybridLon: 'Hybrid, London office',
  hybridBer: 'Hybrid, Berlin office',
  emea: 'Remote, any EMEA time zone',
  amer: 'Remote, North and South America',
}
const dept = (name, jobs) => ({ name, jobs: jobs.map(([title, location]) => ({ title, location })) })
const jobGroups = [
  dept('Accounting and finance', [
    ['Senior revenue accountant', loc.remoteUs],
    ['Financial planning analyst', loc.hybridNy],
  ]),
  dept('Business operations', [
    ['Business systems analyst', loc.remoteUs],
    ['Operations program manager', loc.remoteCa],
  ]),
  dept('Community', [
    ['Community events producer', loc.amer],
    ['Developer community manager, Europe', loc.remoteEu],
  ]),
  dept('Customer success', [
    ['Customer success manager, enterprise accounts', loc.hybridLon],
    ['Technical account manager', loc.remoteUs],
  ]),
  dept('Design', [['Senior product designer, developer experience', loc.remoteUs]]),
  dept('Engineering', [
    ['Senior software engineer, query engine', loc.remoteUs],
    ['Staff software engineer, scheduler and orchestration', loc.remoteCa],
    ['Software engineer, editor platform', loc.hybridBer],
    ['Senior backend engineer, metadata services', loc.remoteEu],
    ['Engineering manager, cloud infrastructure', loc.hybridSf],
    ['Site reliability engineer', loc.remoteIn],
    ['Senior security engineer, detection and response', loc.remoteUs],
    ['Software engineer, language server and extensions', loc.emea],
  ]),
  dept('Field engineering', [
    ['Solutions architect, strategic accounts', loc.hybridNy],
    ['Senior sales engineer', loc.remoteAu],
    ['Resident architect, public sector', loc.remoteUs],
    ['Partner solutions engineer', loc.hybridLon],
  ]),
  dept('Legal', [
    ['Commercial counsel', loc.remoteUs],
    ['Privacy program manager', loc.remoteEu],
    ['Contracts specialist', loc.remoteCa],
  ]),
  dept('Marketing', [
    ['Product marketing manager, platform', loc.hybridSf],
    ['Lifecycle marketing manager', loc.remoteUs],
    ['Field marketing manager, Europe', loc.hybridLon],
  ]),
  dept('People', [
    ['Technical recruiter, engineering', loc.remoteUs],
    ['People partner', loc.emea],
    ['Learning and development lead', loc.remoteCa],
  ]),
  dept('Product', [
    ['Senior product manager, data quality', loc.remoteUs],
    ['Product manager, integrations', loc.remoteEu],
    ['Group product manager, assistant experiences', loc.hybridSf],
    ['Product operations lead', loc.remoteUs],
  ]),
  dept('Professional services', [
    ['Senior analytics engineering consultant', loc.amer],
    ['Engagement manager', loc.hybridNy],
  ]),
  dept('Sales', [
    ['Enterprise account executive, financial services', loc.hybridNy],
    ['Mid-market account executive', loc.remoteUs],
    ['Sales development representative', loc.hybridLon],
    ['Regional sales director, Asia Pacific', loc.remoteAu],
    ['Account executive, Nordics', loc.remoteEu],
  ]),
  dept('Security and IT', [
    ['IT support engineer', loc.hybridSf],
    ['Governance, risk and compliance analyst', loc.remoteUs],
  ]),
  dept('Support', [
    ['Technical support engineer, Americas shift', loc.amer],
    ['Support engineer, platform', loc.remoteIn],
    ['Support operations analyst', loc.remoteUk],
  ]),
  dept('Developer relations', [
    ['Developer advocate', loc.remoteUs],
    ['Technical writer, documentation', loc.remoteEu],
  ]),
]

export default {
  // ------------------------------------------------------------------ representative page
  '/about-us': {
    sections: [
      {
        type: 'heroSplit',
        stroke: 'S3',
        gradient: 'gradient-01',
        stillStroke: true,
        badge: 'Company', // 8
        title: 'Our story', // 8/1
        bigLead: true,
        lead: 'Lattice helps data teams of every size turn scattered inputs into knowledge their company trusts.', // 106/2
        primary: cta('Read the latest company news', '/press'), // 26
        secondary: cta('View open roles', '/about-us/careers'), // 14
        media: ph(1, 612, 408),
      },
      {
        type: 'feat',
        variant: 'F',
        pt0: true,
        cards: [
          { stat: '120K+', label: 'Teams building with Lattice' }, // 5-6 + 15-29
          { stat: '6,400+', label: 'Platform customers' },
          { stat: '2,800+', label: 'Certified practitioners' },
          { stat: '110K+', label: 'Community members' },
        ],
      },
      {
        type: 'leaders',
        title: 'The team leading Lattice', // 24
        linkLabel: 'Profile',
        people: [
          {
            name: 'Maya Okonkwo', // 10-15
            role: 'Co-founder and Chief Executive Officer',
            avatar: { ...avatars[0], alt: 'Illustrated portrait of Maya Okonkwo' },
            bio: [
              'Maya started Lattice after a decade of running analytics teams that spent more time reconciling numbers than answering questions. She leads company strategy and still reviews the product roadmap every week with the teams who build it. Before Lattice she ran data platforms at two fast-growing marketplaces and taught evening classes on practical statistics.',
            ],
          },
          {
            name: 'Daniel Fairbourne',
            role: 'Chief Revenue Officer',
            avatar: { ...avatars[3], alt: 'Illustrated portrait of Daniel Fairbourne' },
            bio: [
              'Daniel leads sales, partnerships and customer success worldwide. He has spent twenty years helping software companies grow from their first enterprise customers to global teams, most recently as a regional sales leader at an infrastructure company. He cares most about customers who stay because the product earns it, and he coaches a youth football team on weekends.',
            ],
          },
          {
            name: 'Ingrid Solvang',
            role: 'Chief Product Officer',
            avatar: { ...avatars[1], alt: 'Illustrated portrait of Ingrid Solvang' },
            bio: [
              'Ingrid leads product management, design and research. She joined Lattice from a developer tools company where she built the team behind its collaborative editor, and before that she worked as a data engineer at a public transit agency.',
              'At Lattice she focuses on making the platform feel simple for a first-time analyst while staying powerful enough for teams that run thousands of models every day. She spends part of every week on calls with customers, and many roadmap items begin as notes from those conversations.',
              'She holds a degree in human factors engineering, still writes SQL for her own team reporting, and mentors product managers who are moving into developer tools.',
            ],
          },
          {
            name: 'Rafael Mendonça',
            role: 'Chief Technology Officer',
            avatar: { ...avatars[7], alt: 'Illustrated portrait of Rafael Mendonça' },
            bio: [
              'Rafael leads engineering, infrastructure and security. He spent the early part of his career building query planners and storage engines, and later led the platform group at a large payments company, where his teams ran systems that processed billions of events a day.',
              'At Lattice he oversees the engine, the hosted platform and the reliability practices behind them. He is a strong believer in boring, well-tested infrastructure and in giving engineers the time to fix what slows them down, and he publishes a short engineering update for the whole company every month.',
              'Outside of work he restores old bicycles, volunteers as a mentor for early-career engineers, and helps organize a regional conference on database internals that welcomes first-time speakers.',
            ],
          },
          {
            name: 'Hana Whitlock',
            role: 'Chief People Officer',
            avatar: { ...avatars[4], alt: 'Illustrated portrait of Hana Whitlock' },
            bio: [
              'Hana leads recruiting, people operations and workplace programs for a fully distributed company. She previously built people teams at two remote-first software firms and is happiest when a new hire says onboarding felt clear and human.',
            ],
          },
          {
            name: 'Theo Achterberg',
            role: 'Chief Financial Officer',
            avatar: { ...avatars[5], alt: 'Illustrated portrait of Theo Achterberg' },
            bio: [
              'Theo leads finance, legal and business operations. He joined from a cloud software company where he guided the finance team through rapid international growth, and he started his career as an auditor. He believes a good forecast is a shared story about the business, written in numbers everyone can check for themselves. Outside the office he is an enthusiastic, if slow, long-distance runner and a volunteer treasurer for a local food bank, where he has kept the books balanced for six years running.',
            ],
          },
        ],
      },
      {
        type: 'board',
        title: 'Our board members', // 18
        people: [
          { name: 'Maya Okonkwo', role: 'Co-founder and CEO, Lattice', avatar: { ...avatars[0], alt: 'Illustrated portrait of Maya Okonkwo' } },
          { name: 'Corinne Vasquez', role: 'Partner, Alderbrook Capital', avatar: { ...avatars[6], alt: 'Illustrated portrait of Corinne Vasquez' } },
          { name: 'Julian Ashworth', role: 'Partner, Northlight Ventures', avatar: { ...avatars[9], alt: 'Illustrated portrait of Julian Ashworth' } },
          { name: 'Priyanka Desai', role: 'Independent director', avatar: { ...avatars[10], alt: 'Illustrated portrait of Priyanka Desai' } },
          { name: 'Marcus Lindqvist', role: 'Partner, Fieldstone Growth', avatar: { ...avatars[2], alt: 'Illustrated portrait of Marcus Lindqvist' } },
        ],
      },
      learnMore,
      {
        type: 'ctaBand',
        title: 'Start building with Lattice.', // 25/1
        body: 'Plan, test and ship dependable data pipelines from the first model to a thousand of them.', // 92/1
        primary: cta('Create a free account', '/signup'), // 20
        secondary: cta('Book your demo', '/contact'), // 14
        aside: asideCommunity,
      },
    ],
  },

  // ------------------------------------------------------------------ members
  '/about-us/values': {
    sections: [
      {
        type: 'heroSplit',
        stroke: 'S4',
        gradient: 'gradient-01',
        pb0: true,
        badge: 'Culture', // 8
        title: 'Our values', // 10/1
        bigLead: true,
        // 137/3
        lead: 'These are the commitments we hold each other to, written by the team and revised as we learn what helps us do our best work together.',
        primary: cta('Meet the leadership', '/about-us'), // 18
        secondary: cta('Explore open roles at Lattice', '/about-us/careers'), // 29
        media: ph(5, 612, 408),
      },
      {
        type: 'feat',
        variant: 'E',
        wash: false,
        cards: [
          {
            title: 'We start with the customer’s problem', // 13-61
            body: 'Every plan begins with a real person and the work they are trying to finish. We talk to customers often and let what we hear change our minds about what to build.',
          },
          {
            title: 'Write it down',
            body: 'A distributed company runs on clear writing. We share context in documents rather than meetings, so anyone in any time zone can catch up, disagree and add to the thinking.',
          },
          {
            title: 'Small steps, shipped often',
            body: 'We prefer a modest change that reaches customers this week to a perfect one that arrives next quarter. Shipping in small pieces keeps feedback fast and mistakes easy to undo.',
          },
          {
            title: 'Assume good intent and say what you think',
            body: 'We give colleagues the benefit of the doubt and we raise concerns directly, kindly and early. A hard conversation held today is cheaper than a quiet resentment held for a year. When we disagree, we argue about the work rather than the person, and we listen long enough to understand the other view before we answer it.',
          },
          {
            title: 'Own the outcome, not just the task',
            body: 'Finishing a ticket is not the same as solving the problem. We follow our work into production, watch how it behaves, and keep going until the customer actually feels the difference we intended. If the result falls short, we say so and plan the next step instead of quietly moving on.',
          },
          {
            title: 'Leave things better than you found them',
            body: 'When we touch a piece of code, a process or a document, we leave it a little clearer for the next person. Small repairs compound, and over the years they are what keep a growing company pleasant to work in and a growing codebase safe to change. Nobody needs permission to fix a broken link, a confusing comment or a slow test, and nobody should feel they have to.',
          },
          {
            title: 'Open by default',
            body: 'Our engine started in the open and we still work that way whenever we can. Roadmaps, design notes and decisions are shared widely inside the company, and much of our thinking is shared with the community too, because better ideas come from more people seeing the work early.',
          },
          {
            title: 'Teach what you know and keep learning in public',
            body: 'Everyone here is both a student and a teacher. We write guides, run office hours, review each other’s work generously and admit what we do not yet understand. Curiosity is part of the job description, and so is passing on what we learn to the people who come after us. New hires are paired with a mentor from another team, and engineers spend time each quarter answering community questions.',
          },
          {
            title: 'Make the call, then revisit it',
            body: 'Most decisions can be reversed, so we make them quickly with the information we have and set a date to check whether they worked. The few that cannot be undone get slower, wider review.',
          },
          {
            title: 'Rest is part of the work',
            body: 'Sustainable pace beats heroics. We take our time off, we respect each other’s working hours across time zones, and we plan so that nobody needs to be online at midnight for a release to land safely. Tired people make avoidable mistakes, and we would rather catch them early than clean up after them. On-call rotations are sized so that nobody carries the pager for more than one week in six.',
          },
          {
            title: 'Everyone belongs at the table',
            body: 'We build for a global community of practitioners, so we hire, promote and include people with many backgrounds, experiences and ways of thinking. Different perspectives make the product better.',
          },
          {
            title: 'Earn trust with every release',
            body: 'Customers run their business on the numbers our platform produces. We treat reliability, security and honest communication as features, and when something goes wrong we explain what happened plainly.',
          },
          {
            title: 'Celebrate the team, credit the people',
            body: 'Wins belong to the many hands that made them happen. We say thank you in public, name the people who did the work, and make room for quiet contributors to be seen as clearly as loud ones. Every launch note lists the people behind it, and every all-hands opens with thanks nominated by colleagues.',
          },
        ],
      },
      {
        type: 'feat',
        variant: 'E',
        dark: true,
        stroke: 'S6',
        gradient: 'gradient-02',
        stillStroke: true,
        title: 'How we work together day to day', // 25/1
        // 624/5
        body: 'Values describe what we care about; principles describe how that shows up on an ordinary Tuesday. The ten principles below came out of a year of retrospectives, interviews and long written threads in which people across every team described the moments when working here felt best and the moments when it felt hardest. We keep them short on purpose. They are not rules to be enforced but shared defaults that help a fast-growing, fully remote company make consistent choices without waiting for someone to approve them. When a principle stops helping, anyone can propose a change, and the proposal is reviewed in the open like any other.',
        cards: [
          {
            title: 'Context before requests', // 12-34
            body: 'Before asking a colleague for help, share what you have already tried and why it matters. Good context turns a vague request into a five-minute answer and saves both people from a long thread of follow-up questions. Link the relevant document, the error message and the deadline you are working toward.',
          },
          {
            title: 'Default to asynchronous',
            body: 'Meetings are for decisions and relationships. Status updates, reviews and most planning happen in writing, so people can contribute thoughtfully from any time zone without sacrificing their evenings.',
          },
          {
            title: 'Disagree, then commit fully',
            body: 'Raise objections while a decision is still open. Once it is made, support it wholeheartedly and help it succeed, while keeping notes on what you would watch for in case the call needs to be revisited later.',
          },
          {
            title: 'Make work visible early and often',
            body: 'Share drafts, prototypes and half-finished thoughts sooner than feels comfortable. Early visibility invites help, avoids duplicated effort, and keeps surprises out of launch week for everyone involved in the project.',
          },
          {
            title: 'Measure what matters',
            body: 'Pick a small number of signals that tell you whether customers are better off, and check them honestly. Vanity numbers are easy to grow and rarely tell the truth about the work.',
          },
          {
            title: 'Fix the system, not the person',
            body: 'When something breaks, we look for the gap in our tools, documentation or process that let it happen. Blameless reviews make it safe to report problems quickly, which is how small issues stay small and how the same incident never needs to happen twice. Every review ends with owners for the follow-up work.',
          },
          {
            title: 'Protect focus time',
            body: 'Deep work needs long, uninterrupted blocks. Teams agree on quiet hours, batch their notifications and respect calendars that say no, because the hardest problems rarely get solved in fifteen-minute gaps.',
          },
          {
            title: 'Write the decision down where others can find it later',
            body: 'Every meaningful decision gets a short record: the options considered, the choice made, and who made it. Future teammates will thank you, and so will you in six months when the question comes back. Decision records live next to the code or document they affect and use one short shared template.',
          },
          {
            title: 'Be generous with credit',
            body: 'Highlight the people behind good outcomes, especially those whose work is less visible. A culture of recognition makes it easier to ask for help and easier to offer it.',
          },
          {
            title: 'Keep the customer in the room',
            body: 'Bring real examples, quotes and data from customers into planning and review. It keeps debates grounded and reminds us who the work is for.',
          },
        ],
      },
      learnMore,
      {
        type: 'ctaBand',
        eyebrow: 'Careers at Lattice', // 17
        title: 'Help us build the future of data work.', // 39/2
        // 218/3
        body: 'We are a distributed team of engineers, designers, writers and data practitioners who care deeply about the craft. If these values sound like the way you want to work every day, we would love to hear from you and learn about you.',
        primary: cta('See open roles', '/about-us/careers'),
        secondary: cta('Read about belonging', '/about-us/belonging'),
        stats: [
          { number: '40+', label: 'countries on the team' }, // 3-8 + 14-24
          { number: '100%', label: 'remote-friendly roles' },
        ],
      },
    ],
  },

  '/about-us/careers': {
    sections: [
      {
        type: 'heroSplit',
        stroke: 'S4',
        gradient: 'gradient-22',
        wide: true,
        title: 'Do the best work of your career with us', // 30/2
        lead: 'Join a remote-first team building the tools data practitioners rely on.', // 76/1
        primary: cta('See open roles', '#open-roles'), // 14
        secondary: cta('Read our values', '/about-us/values'), // 16
        media: ph(7, 506, 451),
      },
      {
        type: 'newsStrip',
        eyebrow: 'Life here', // 9
        title: 'Lattice was named a top remote employer for the third year', // 57/1
        // 326/3
        body: 'An independent survey of more than eight thousand remote workers ranked Lattice among the best places to work for distributed teams. Employees pointed to written-first communication, generous learning budgets and managers who protect focus time. We are proud of the result and even prouder that it came directly from our own people.',
        cta: cta('Read the full announcement', '/press'), // 22
      },
      {
        type: 'feat',
        variant: 'E',
        wash: false,
        title: 'Why Lattice', // 12
        // 264/2
        body: 'We are building the foundation that analytics and AI teams depend on, and we want people who enjoy hard problems, clear writing and helping each other grow. Here is what working at Lattice looks like in practice, beyond the job description.',
        cards: [
          { title: 'Remote from day one', body: 'Work from wherever you do your best thinking, with stipends for a home office and a coworking space.' }, // 11-24 / 99-117
          { title: 'Learning budget', body: 'Every employee gets an annual budget for courses, books and conferences, plus time set aside to use it.' },
          { title: 'Time to recharge', body: 'Flexible paid time off with a minimum we actually encourage, plus a company-wide week off each winter.' },
          { title: 'Real ownership', body: 'Small teams own problems end to end, from the first customer interview to the production dashboard.' },
          { title: 'Care for families', body: 'Paid parental leave for every parent, plus support for caregivers when life needs more of your time.' },
          { title: 'Meet in person', body: 'Teams gather a few times a year for planning, hacking and a lot of shared meals in a new city each time.' },
        ],
      },
      {
        type: 'jobs',
        id: 'open-roles',
        title: 'Find your role at Lattice', // 22
        allLabel: 'All departments',
        applyLabel: 'Apply',
        groups: jobGroups,
      },
    ],
  },

  '/about-us/belonging': {
    sections: [
      {
        type: 'heroCenter',
        stroke: 'S4',
        gradient: 'gradient-01',
        eyebrow: 'Belonging', // 10
        title: 'Building a company where every voice is heard', // 44/2
      },
      {
        type: 'split',
        variant: 'textLeft',
        cols: '7/5',
        title: 'Why belonging matters to us', // 27
        paragraphs: [
          // 299/3
          'Lattice serves a worldwide community of data practitioners, and the product is better when the people building it reflect that community. Teams with a mix of backgrounds notice problems sooner, question assumptions more often, and design tools that work for a wider range of people and use cases.',
          // 159/2
          'Belonging is not a side project for us. It shapes how we write job posts, run interviews, plan events and decide who gets the next stretch opportunity.',
        ],
        media: ph(11, 506, 451),
      },
      {
        type: 'split',
        cols: '5/7',
        pt0: true,
        title: 'How belonging shows up here', // 29
        paragraphs: [
          'We treat inclusion like any other engineering problem: we set clear goals, measure honestly, ask people how the work feels, and change the process whenever the numbers or the feedback tell us that something is not working as intended.',
          'A few of the programs that came out of that work:',
        ],
        bullets: [
          { lead: 'Structured interviews.', text: 'Every candidate for a role answers the same questions and is scored against the same written rubric.' },
          { lead: 'Employee resource groups.', text: 'Groups led by employees get a budget, an executive sponsor and time during work hours.' },
          { lead: 'Open pay bands.', text: 'Salary ranges are published on every job post and reviewed twice a year for fairness.' },
        ],
        after: [['We report our progress to the whole company ', { b: 'every six months' }, ', including the areas where we ', { b: 'fell short' }, '.']],
        media: ph(13, 506, 451),
      },
      {
        type: 'split',
        variant: 'textLeft',
        cols: '7/5',
        pt0: true,
        title: 'Growing a more inclusive data community', // 40/2
        paragraphs: [
          // 302/4
          'Our responsibility does not stop at our own payroll. The data field still has too few paths in for people without a computer science degree or a network of contacts in the industry, so we invest in programs that open doors for newcomers and reward the mentors who hold those doors open for others. Those programs are planned with community members, not just for them.',
          // 368/4
          'Every year we fund scholarships for our certification exam, host free beginner workshops in partnership with community organizers, and set aside speaking slots at our conference for first-time presenters. Community members help choose where that support goes, and we publish the results so that other companies can borrow what works and avoid what does not. Last year those programs reached learners in more than forty countries.',
        ],
        after: [
          ['Interested in a scholarship? ', { a: 'Learn about certification', to: '/certification' }, ' and apply in ', { b: 'any month of the year' }, '. Applications are reviewed by a panel of volunteers from the community.'],
          ['Want to run a workshop near you? ', { b: 'Community organizers' }, ' can ', { a: 'join the community', to: '/community/join' }, ' to get started, and we will send a starter kit with slides, exercises and sample data.'],
        ],
        media: ph(15, 506, 451),
      },
      {
        type: 'resources',
        title: 'In the press', // 12
        cards: [
          { image: resImgs[4], tag: 'Interview', title: 'How a fully remote data company rethought its hiring process from the very first interview', to: '/press' }, // 48-83
          { image: resImgs[8], tag: 'Podcast', title: 'Community programs that open doors to data careers', to: '/press' },
          { image: resImgs[2], tag: 'Article', title: 'Why open pay bands became a recruiting advantage', to: '/press' },
          { image: resImgs[6], tag: 'Award', title: 'Lattice recognized for inclusive workplace practices', to: '/press' },
        ],
      },
      {
        type: 'ctaBand',
        title: 'Come build with us.', // 20
        body: 'We are hiring across engineering, product, sales and support. Read about our open roles, our values and how we work together as a team.', // 131/2
        primary: cta('See open roles', '/about-us/careers'), // 14
        secondary: cta('Read our values', '/about-us/values'), // 14
      },
    ],
  },

  '/security': {
    sections: [
      {
        type: 'heroSplit',
        stroke: 'S4',
        gradient: 'gradient-01',
        pb0: true,
        title: 'Security built into every layer of Lattice', // 32/2
        // 217/3
        lead: 'Lattice protects your code, credentials and metadata with encryption, strict access controls and continuous monitoring, so your team can move fast on the platform without trading away the safeguards that you need.',
        primary: { label: 'Choose how to get started', dialog: true }, // 28 (dialog)
        secondary: cta('Talk to security', '/contact'), // 17
        media: ph(2, 612, 533),
      },
      {
        type: 'split',
        cols: '5/7',
        title: 'Your data stays in your warehouse at all times', // 39/2
        // 345/4
        paragraphs: [
          'Lattice compiles and orchestrates the SQL that runs inside your own data platform, so the rows you transform never need to leave it. The platform stores code, run logs and metadata about your models rather than copies of your data, and every connection uses short-lived, scoped credentials that you control and can revoke at any moment.',
        ],
        media: ph(8, 506, 506),
      },
      {
        type: 'split',
        variant: 'textLeft',
        cols: '7/5',
        pt0: true,
        title: 'Controls designed for the needs of regulated industries', // 47/2
        // 395/4
        paragraphs: [
          'Single sign-on, role-based permissions, audit logs and private networking options are available on every enterprise plan. Administrators decide who can view, edit or deploy each project, and every change is recorded with who made it and when. Teams in finance, healthcare and the public sector use these controls to meet internal policy as well as external review, without slowing their analysts down.',
        ],
        media: ph(10, 506, 507),
      },
      {
        type: 'compliance',
        title: 'Our audits', // 10
        // rows: heading 3-14ch, prose 109-780ch / 1-7 lines with an inline link
        rows: [
          {
            badge: badges[0],
            title: 'Trustframe',
            body: ['An independent audit firm reviews our security, availability and confidentiality controls every year and issues a full report covering the twelve months before the review. The report describes each control, how the auditors tested it and any exceptions they found, along with our response to them. Customers and prospects under a confidentiality agreement can ', { a: 'request the latest report', to: '/contact' }, ' through their account team at any time. A bridge letter covering the months since the last audit period is also available on request.'],
          },
          {
            badge: badges[1],
            title: 'Cloudward',
            body: ['Our information security management system is certified against a placeholder cloud standard that covers risk assessment, asset management, supplier review, incident handling and continual improvement. The certificate is renewed every three years with surveillance audits in between, and the scope includes every production environment that runs the hosted platform, the teams who operate it and the offices they work from. Findings from each audit are tracked to closure by our governance team and reported to leadership every quarter, together with the status of any open remediation work and the owner responsible for it. ', { a: 'Contact us', to: '/contact' }, ' for the current certificate and statement of applicability.'],
          },
          {
            badge: badges[2],
            title: 'Privacy seal',
            body: ['We maintain a privacy program aligned with a placeholder privacy framework, covering data mapping, retention, subject requests and vendor review. Our data processing terms are available to every customer, and we publish a list of subprocessors that we update before any change takes effect. Every employee completes privacy training when they join and once a year after that, and new features go through a privacy review before launch, with a written assessment for anything that touches personal information. Customers can reach our privacy team directly with questions about how a specific feature handles their information. ', { a: 'Read our privacy terms', to: '/terms-of-use' }, '.'],
          },
          {
            badge: badges[3],
            title: 'Assured seal',
            body: ['A placeholder assurance mark confirming that our hosted platform meets baseline requirements for cloud services used by public bodies.'],
          },
          {
            badge: badges[4],
            title: 'Datasafe',
            body: ['Our data-handling practices are registered with a placeholder registry that reviews how service providers store, transfer and delete customer information. The registration covers our hosting regions in North America, Europe and the Asia Pacific region, and it is reviewed annually. The review looks at retention schedules, deletion procedures, backup encryption and the controls we use to keep each region separate, so that metadata created in one region is never replicated to another without your instruction. Deletion requests are confirmed in writing once they complete. ', { a: 'Ask for details', to: '/contact' }, '.'],
          },
          {
            badge: badges[5],
            title: 'Healthguard',
            body: ['Customers that work with protected health information can sign a placeholder business associate agreement with us. Eligible plans include additional logging, encryption key options and support processes designed for healthcare workloads. Our team reviews each deployment with you before any regulated data flows through models built on the platform, and we document the shared responsibilities in plain language. Because Lattice runs transformations inside your own warehouse, the regulated rows themselves remain under your controls, while we protect the code, logs and metadata that describe them. Access by our own support staff is limited, logged and granted only for a specific ticket. ', { a: 'Talk to our healthcare team', to: '/contact' }, ' to learn which plans qualify.'],
          },
          {
            badge: badges[6],
            title: 'Openaudit',
            body: ['A placeholder controls report for teams that need a lighter summary of our security program to share with their own stakeholders and procurement reviewers. It covers the same control areas as the full audit report, including access management, change management, encryption, monitoring and vendor oversight, but it is written for a general audience and can be shared without a confidentiality agreement. Many customers attach it to internal risk reviews and vendor questionnaires, which shortens procurement for both sides. ', { a: 'Download a copy', to: '/contact' }, '.'],
          },
          {
            badge: badges[7],
            title: 'Global seal',
            body: ['Our cross-border transfer practices follow a placeholder framework for moving personal data between regions, with standard contractual terms available on request. We assess each transfer for the protections available in the destination country, document the supplementary measures we apply, and review those assessments whenever the legal landscape changes. Customers can choose to keep all project metadata in a single region. ', { a: 'Contact legal', to: '/contact' }, '.'],
          },
          {
            badge: badges[8],
            title: 'Payshield',
            body: ['Payments for self-serve plans are processed by a placeholder provider that holds the highest level of card-industry validation. Lattice never stores full card numbers on its own systems: the payment form is served directly by the provider, and our platform only ever receives a token that identifies the card for future charges. Invoices, receipts and billing contacts are managed from the account settings page, where administrators can update payment details, download past invoices and switch to invoiced billing on annual plans. Every change to billing details is recorded in the audit log. ', { a: 'Billing questions', to: '/contact' }, '.'],
          },
        ],
      },
      {
        type: 'faq',
        title: 'Security at a glance', // 19
        // 207/2
        body: 'Here are answers to the questions security reviewers ask us most often. If you need something more detailed, our team can share documentation and walk through your questionnaire with you.',
        items: [
          { q: 'Where is customer metadata hosted?', a: 'The hosted platform runs in multiple regions across North America, Europe and the Asia Pacific region. You choose a region when your account is created, and your project metadata stays there.' },
          { q: 'How is data encrypted?', a: 'All traffic uses modern transport encryption, and stored metadata, logs and credentials are encrypted at rest with keys managed in a dedicated key service.' },
          { q: 'Do you support single sign-on?', a: 'Yes. Enterprise plans support single sign-on through standard identity protocols, along with automated user provisioning and removal.' },
          { q: 'Can we restrict access by role?', a: 'Role-based permissions let administrators decide who can view, develop, deploy or administer each project and environment.' },
          { q: 'Do you offer private connectivity?', a: 'Enterprise plans can connect to supported warehouses over private networking so that traffic never crosses the public internet.' },
          { q: 'How are credentials stored?', a: 'Warehouse credentials are encrypted, scoped to the minimum permissions needed, and never shown again after they are saved.' },
          { q: 'How do you test your own security?', a: 'Independent testers assess the platform at least once a year, and we run a responsible disclosure program for outside researchers.' },
          { q: 'What happens during an incident?', a: ['We follow a documented response plan, notify affected customers promptly, and publish updates on our ', { a: 'status page', to: '/report-a-problem' }, '.'] },
          { q: 'Are audit logs available?', a: 'Yes. Administrators can review and export audit logs that record sign-ins, permission changes, deployments and configuration updates.' },
          { q: 'How long do you retain run logs?', a: 'Run logs and artifacts are retained according to your plan, and administrators can request earlier deletion at any time.' },
          { q: 'How do we report a vulnerability?', a: ['Please use our ', { a: 'reporting form', to: '/report-a-problem' }, ' and our security team will respond within two business days.'] },
        ],
      },
      {
        type: 'ctaBand',
        eyebrow: 'Get started', // 11
        title: 'Run Lattice with confidence', // 24
        // 177/2
        body: 'Explore the hosted platform with your own data, or talk to our security team about your review process, your questionnaire and the controls your organization requires.',
        primary: cta('Start a free trial', '/signup'), // 17
        secondary: cta('Contact our security team', '/contact'), // 20
      },
    ],
  },

  '/certification': {
    sections: [
      {
        type: 'heroSplit',
        stroke: 'S4',
        gradient: 'gradient-01',
        wide: true,
        title: 'Prove your analytics engineering skills', // 36/2
        // 140/2
        lead: 'Earn a Lattice certification to show employers and teammates that you can design, test and ship dependable data models in production.',
        primary: cta('Register now', '/signup'), // 12
        media: ph(16, 506, 452),
      },
      {
        type: 'certList',
        title: 'Choose your certification', // 25
        paragraphs: [
          // 199/3
          'Each exam is written by practitioners and reviewed by our education team. Questions focus on real project decisions rather than trivia, so passing reflects the judgment you use at work every day.',
          // 95/2
          'Exams are taken online, proctored remotely, and available in several languages all year round.',
        ],
        cta: cta('Register now', '/signup'),
        items: [
          {
            icon: icons.badge,
            title: 'Certified Lattice developer', // 32-50
            body: 'For practitioners who build and test models every day. Covers modeling patterns, testing, documentation, sources and incremental builds.', // 95-163
            cta: cta('Learn more', '/learn'),
          },
          {
            icon: icons.layers,
            title: 'Certified Lattice platform architect',
            body: 'For people who set up and run the platform for a team. Covers environments, jobs, permissions, connections and deployment practices.',
            cta: cta('Learn more', '/learn'),
          },
          {
            icon: icons.target,
            title: 'Certified Lattice semantic modeler',
            body: 'For analysts who define shared metrics. Covers semantic models, measures, dimensions, saved queries and serving consistent metrics to every downstream tool.',
            cta: cta('Learn more', '/learn'),
          },
        ],
      },
      {
        type: 'split',
        cols: '5/7',
        eyebrow: 'Watch now', // 9
        title: 'See what the exam covers', // 23
        poster: { ...photos[11], alt: 'Video: an instructor walks through the exam format' },
        paragraphs: ['Our education lead walks through the format, the topics and the study plan that most successful candidates follow in the weeks before their exam.'], // 144/2
        primary: cta('Register now', '/signup'),
      },
      {
        type: 'split',
        variant: 'textLeft',
        cols: '7/5',
        title: 'Prepare with free courses and practice projects', // 47/2
        paragraphs: [
          ['Start with the ', { a: 'free Lattice courses', to: '/learn' }, ', which cover every topic on the exam with short videos, quizzes and hands-on projects you can run in a free sandbox account. Most learners spend four to six weeks preparing.'],
          'Candidates who pass usually have:',
        ],
        bullets: [
          { lead: 'Six months of practice', text: 'building, testing and documenting models in a real project, ideally one that runs on a schedule in production.' },
          { lead: 'Hands-on experience', text: 'with sources, snapshots and incremental models.' },
          { lead: 'Comfort with version control', text: 'including branches, pull request reviews, merges and resolving the occasional conflict.' },
        ],
        primary: cta('Register now', '/signup'),
        media: ph(12, 506, 447),
      },
      {
        type: 'faq',
        title: 'Frequently asked questions', // 26
        items: [
          { q: 'How long is each exam?', a: 'Each exam lasts two hours and contains a mix of multiple-choice, multi-select and short scenario questions.' },
          { q: 'How much does an exam cost?', a: 'Pricing depends on your region. You will see the final price, including any taxes, before you confirm a booking.' },
          { q: 'Are there discounts for teams?', a: ['Yes. Teams that book five or more exams receive a discount. ', { a: 'Contact us', to: '/contact' }, ' for a quote.'] },
          { q: 'Can I retake an exam if I do not pass?', a: 'You can retake an exam after a waiting period of fourteen days. A retake is booked and paid for like a new attempt.' },
          { q: 'How long is a certification valid?', a: 'Certifications are valid for two years. You can renew by passing the current version of the exam.' },
          { q: 'What languages are available?', a: 'Exams are offered in English, Spanish, Portuguese, French, German and Japanese.' },
          { q: 'Do I need a paid Lattice account?', a: 'No. The free developer account is enough to complete every practice project in the preparation courses.' },
          { q: 'How is the exam proctored?', a: 'Exams are proctored remotely. You will need a webcam, a microphone and a quiet room for the full session.' },
          { q: 'What happens if my connection drops?', a: 'Your progress is saved. Reconnect within ten minutes and the proctor will let you resume where you left off.' },
          { q: 'Can I reschedule my exam?', a: 'You can reschedule at no cost up to forty-eight hours before your appointment.' },
          { q: 'Will I receive a digital badge?', a: 'Yes. Everyone who passes receives a shareable digital badge and a certificate with a verification link.' },
          { q: 'Are accommodations available?', a: ['Yes. Request accommodations when you register and our team will follow up. ', { a: 'Reach out', to: '/contact' }, ' with any questions.'] },
          { q: 'Is there a scholarship program?', a: ['We fund a number of exam scholarships each year. ', { a: 'Read about belonging at Lattice', to: '/about-us/belonging' }, ' to learn more.'] },
          { q: 'Do questions change between versions?', a: 'Exams are refreshed when the product changes significantly, and every version is announced at least a month ahead.' },
          { q: 'Can my employer pay for the exam?', a: 'Yes. You can pay with a voucher code purchased by your company, or request an invoice at checkout.' },
          { q: 'When do scores arrive?', a: 'Multiple-choice scores show up the moment you submit. Scenario answers get graded inside five working days.' },
          { q: 'Is there a practice exam?', a: ['A free practice exam is available in the ', { a: 'preparation courses', to: '/learn' }, '.'] },
          { q: 'Who writes the questions?', a: 'Questions are written by experienced practitioners and reviewed by our education team for accuracy and fairness.' },
        ],
      },
      {
        type: 'ctaBand',
        wide: true,
        title: 'Ready to get certified?', // 24
        body: 'Book your exam today, study with free courses and practice projects, and join thousands of certified practitioners already working with Lattice.', // 146/1
        primary: cta('Register now', '/signup'), // 12
      },
    ],
  },

  '/learn': {
    sections: [
      {
        type: 'heroSplit',
        stroke: 'S1',
        gradient: 'gradient-01',
        title: 'Learn analytics engineering, step by step', // 38/2
        // 145/2
        lead: 'Free, self-paced courses take you from your very first model to production-ready projects, with hands-on exercises and a sandbox to practice in.',
        primary: cta('Browse free courses', '#courses'), // 18
        secondary: cta('Get certified with Lattice', '/certification'), // 26
        media: crop(illus.learn, 612, 612),
      },
      {
        type: 'feat',
        variant: 'D',
        title: 'Everything you need to grow your data skills', // 42
        // 196/2
        body: 'Whether you write your first SQL query this week or already maintain hundreds of models, Lattice learning resources help you build confident habits and stay current with the platform.',
        cards: [
          { icon: icons.book, title: 'Self-paced courses', body: 'Short videos and hands-on exercises that fit around a busy week, available free for everyone.' }, // 16-23 / 80-123
          { icon: icons.team, title: 'Live instructor sessions', body: 'Join small-group sessions where instructors answer questions and review your work in real time.' },
          { icon: icons.badge, title: 'Certification exams', body: 'Show what you know with a proctored exam and a shareable credential that employers recognize.' },
          { icon: icons.globe, title: 'A global community', body: 'Learn alongside thousands of fellow practitioners in study groups, online forums and friendly local meetups in cities worldwide.' },
        ],
      },
      {
        type: 'feat',
        variant: 'C',
        dark: true,
        stroke: 'S2',
        eyebrow: 'Learning formats', // 16
        title: 'Pick the format that suits how you learn', // 36
        body: 'Mix and match on-demand courses, guided workshops and team training as you grow.', // 81
        cards: [
          {
            image: cardImgs[3],
            title: 'On-demand courses', // 9-26
            body: 'Move through guided lessons on your own schedule, with a quiz and a small project closing each unit.', // 82-98
            cta: cta('Start learning', '#courses'),
          },
          {
            image: cardImgs[5],
            title: 'Guided workshops',
            body: 'Spend a focused half-day with an instructor building a project from start to finish.',
            cta: cta('See the schedule', '/events'),
          },
          {
            image: cardImgs[7],
            title: 'Training for your team',
            body: 'Bring a tailored program to your organization, with exercises built around your own stack.',
            cta: cta('Talk to us', '/contact'),
          },
        ],
      },
      {
        type: 'courseTabs',
        id: 'courses',
        eyebrow: 'Course catalog', // 19
        title: 'Courses for every stage of your journey', // 39/3
        // 154/3
        body: 'Start with the fundamentals, then move on to advanced modeling, testing and deployment. Every course is free and includes a certificate of completion.',
        cta: cta('See all courses', '/learn'), // 15
        tabs: [
          {
            label: 'Getting started', // 13-18
            courses: [
              {
                image: resImgs[0],
                tag: 'Beginner', // 10
                duration: '3 hours', // 7
                title: 'Lattice fundamentals', // 16-19
                body: 'Set up a project, connect a warehouse, build your first models and add tests and documentation as you go. Ideal for analysts who already know SQL and want to work like software engineers, with version control, reviews and automated checks on every change.', // 130-224
                cta: cta('Start course', '/signup'),
              },
              {
                image: resImgs[3],
                tag: 'Beginner',
                duration: '2 hours',
                title: 'Working with sources',
                body: 'Declare raw tables as sources, check their freshness on a schedule and build reliable staging models on top of them, using sample data you can load in minutes.',
                cta: cta('Start course', '/signup'),
              },
            ],
          },
          {
            label: 'Advanced modeling',
            courses: [
              {
                image: resImgs[10],
                tag: 'Advanced',
                duration: '4 hours',
                title: 'Incremental models',
                body: 'Find out when to rebuild just the rows that arrived or changed since the last run, pick a merge approach that suits your warehouse, and check that logic so late-arriving records never slip past. Includes exercises on merge keys, lookback windows and full-refresh safeguards.',
                cta: cta('Start course', '/signup'),
              },
              {
                image: resImgs[7],
                tag: 'Advanced',
                duration: '2 hours',
                title: 'Semantic modeling',
                body: 'Define metrics once and serve them consistently to every dashboard, notebook and assistant in your company.',
                cta: cta('Start course', '/signup'),
              },
            ],
          },
          {
            label: 'Platform skills',
            courses: [
              {
                image: resImgs[5],
                tag: 'Intermediate',
                duration: '3 hours',
                title: 'Jobs and environments',
                body: 'Set up development, staging and production environments, schedule jobs, and promote changes safely with continuous integration checks on every pull request.',
                cta: cta('Start course', '/signup'),
              },
              {
                image: resImgs[1],
                tag: 'Intermediate',
                duration: '2 hours',
                title: 'Visual modeling',
                body: 'Build models on the visual canvas, review the SQL it generates, and hand work back and forth with teammates who prefer the code editor.',
                cta: cta('Start course', '/signup'),
              },
            ],
          },
        ],
      },
      {
        type: 'feat',
        variant: 'E',
        wash: true,
        iconSize: 56,
        eyebrow: 'Keep learning', // 14
        title: 'More ways to sharpen your skills', // 31
        body: 'Go beyond courses with live events, a deep library of written guides and a community of practitioners who are always happy to help you get unstuck.', // 152/2
        cards: [
          { icon: icons.clock, title: 'Join a live office hour', body: 'Bring your questions to weekly sessions hosted by instructors and community experts.', cta: cta('See upcoming sessions', '/events') }, // 24-28 / 74-101 / 16-25
          { icon: icons.book, title: 'Read the practical guides', body: 'Step-by-step guides on modeling, testing, deployment and governance, written by practitioners.', cta: cta('Browse the guides', '/resources') },
          { icon: icons.team, title: 'Find a study group nearby', body: 'Meet other learners preparing for certification and keep each other on track each week.', cta: cta('Join the community', '/community/join') },
        ],
      },
      {
        type: 'ctaBand',
        eyebrow: 'Start learning today, for free', // 32
        title: 'Build skills that move your career forward', // 36/2
        // 177/2
        body: 'Every course is free, self-paced and built around real projects. Create an account to save your progress, earn certificates and get ready for your first exam.',
        primary: cta('Create an account', '/signup'), // 18
        secondary: cta('Explore certification paths', '/certification'), // 27
        checklist: ['Free, self-paced courses', 'Hands-on practice projects', 'Certificates of completion'], // 23-30
      },
    ],
  },

  '/community': {
    sections: [
      {
        type: 'heroSplit',
        stroke: 'S3',
        gradient: 'gradient-01',
        title: 'A home for people who love data work', // 43/2
        bigLead: true,
        // 134/3
        lead: 'Thousands of practitioners share patterns, answer questions and meet in person to make analytics engineering better for everyone.',
        primary: cta('Join the community', '/community/join'), // 18
        secondary: cta('Find a local meetup', '/events'), // 19
        media: ph(3, 612, 408),
      },
      {
        type: 'feat',
        variant: 'F',
        iconSize: 56,
        eyebrow: 'The community in numbers', // 24
        title: 'Practitioners helping practitioners grow', // 40
        // 192/2
        body: 'From forum threads to regional meetups, the Lattice community is where people trade ideas, review each other’s projects and help steer the direction of the open engine and the platform.',
        cards: [
          { icon: icons.team, stat: '110K', label: 'members worldwide' }, // 3-5 / 17-25
          { icon: icons.globe, stat: '160+', label: 'cities with meetups' },
          { icon: icons.branch, stat: '4K+', label: 'open source packages' },
          { icon: icons.sparkle, stat: '900', label: 'talks shared each year' },
        ],
      },
      {
        type: 'bento',
        title: 'What is happening in the community', // 32
        feature: {
          eyebrow: 'Spotlight', // 6
          title: 'This season’s award winners', // 27/2
          // 386/8
          body: 'Every season the community nominates members who went out of their way to help others. This round recognizes organizers who started meetups in six new cities, maintainers who reviewed hundreds of package contributions, and writers whose guides helped newcomers ship their first models. Read their stories and nominate someone for the next round.',
          to: '/community/join',
          image: ph(9, 363, 363),
        },
        member: {
          avatar: { ...avatars[8], alt: 'Illustrated portrait of Lucía Ferraro' },
          name: 'Lucía Ferraro', // 14
          role: 'Meetup organizer', // 15
          // 181/5
          quote: 'I joined to ask one question about incremental models and stayed because people kept helping. Now I run a meetup with two hundred members and still learn something every month.',
          cta: cta('Read member stories', '/community/join'),
        },
        meetup: {
          eyebrow: 'Next meetup', // 12
          month: 'Nov',
          day: '14',
          title: 'Lisbon data evening', // 20
          place: 'In person, Lisbon', // 20
          to: '/events',
          cta: cta('See all meetups', '/events'), // 15
        },
        topics: {
          eyebrow: 'Trending conversations', // 20
          rows: [
            { text: 'Naming conventions for staging models', link: 'Join in', to: '/community/join' },
            { text: 'How do you test slowly changing dimensions without full refreshes?', link: 'Read thread', to: '/community/join' },
            { text: 'Sharing metrics between teams', link: 'Discuss', to: '/community/join' },
          ],
        },
        picture: {
          eyebrow: 'Photo of the week', // 14
          image: ph(5, 318, 173),
        },
      },
      {
        type: 'ctaBand',
        title: 'Invite your whole team along', // 29
        body: 'Invite colleagues, share what you are building and learn from people like you.', // 75
        primary: cta('Join today', '/community/join'), // 11
        secondary: cta('Browse our events', '/events'), // 17
        aside: asideCommunity,
      },
      {
        type: 'photoTabs',
        eyebrow: 'Moments from around the world', // 26
        title: 'See the community in action', // 22
        body: 'Snapshots from meetups, workshops and our annual conference, shared by members and event organizers.', // 100/1
        cta: cta('Find an event near you', '/events'), // 19
        tabs: [
          { label: 'Annual summit', photos: [ph(9, 616, 616), ph(1, 300, 300), ph(3, 300, 300), ph(5, 300, 300), ph(7, 300, 300), ph(11, 616, 616)] },
          { label: 'Local meetups', photos: [ph(13, 616, 616), ph(15, 300, 300), ph(2, 300, 300), ph(4, 300, 300), ph(6, 300, 300), ph(3, 616, 616)] },
          { label: 'Workshops', photos: [ph(5, 616, 616), ph(8, 300, 300), ph(10, 300, 300), ph(12, 300, 300), ph(14, 300, 300), ph(7, 616, 616)] },
          { label: 'Hackathons', photos: [ph(15, 616, 616), ph(16, 300, 300), ph(1, 300, 300), ph(9, 300, 300), ph(2, 300, 300), ph(13, 616, 616)] },
          { label: 'Office hours', photos: [ph(12, 616, 616), ph(4, 300, 300), ph(6, 300, 300), ph(11, 300, 300), ph(8, 300, 300), ph(1, 616, 616)] },
          { label: 'Online events', photos: [ph(14, 616, 616), ph(10, 300, 300), ph(16, 300, 300), ph(3, 300, 300), ph(5, 300, 300), ph(9, 616, 616)] },
        ],
      },
      {
        type: 'feat',
        variant: 'E',
        dark: true,
        stroke: 'S9',
        eyebrow: 'Ways to contribute', // 19
        title: 'Shape the tools you use every single day', // 39
        // 170/2
        body: 'The open engine, the package hub and the documentation all improve because community members report issues, review changes and share what they have learned along the way.',
        primary: cta('Start contributing', '/community/join'), // 13
        cards: [
          { icon: icons.branch, title: 'Contribute to the engine', body: 'Pick up a good first issue or review an open pull request.', cta: cta('View issues', '/community/join') }, // 18-27 / 45-79 / 12
          { icon: icons.layers, title: 'Publish a package', body: 'Share reusable macros and models with thousands of other teams.', cta: cta('Read the guide', '/learn') },
          { icon: icons.book, title: 'Improve the documentation', body: 'Fix a typo, clarify a concept or write a new how-to guide.', cta: cta('Edit the docs', '/learn') },
        ],
      },
      {
        type: 'feat',
        variant: 'E',
        wash: true,
        eyebrow: 'Find your corner of it', // 22
        title: 'There is a place here for you', // 29
        // 145/2
        body: 'Whether you want to learn, teach, organize or simply listen, there is a way to take part that fits your schedule and the way you like to work.',
        cards: [
          { icon: icons.search, title: 'Forum', body: 'Ask a question and get answers from experienced practitioners worldwide.', cta: cta('Visit the forum', '/community/join') }, // 10-27 / 64-72 / 12-24
          { icon: icons.globe, title: 'Local meetups', body: 'Meet people in your city for talks, demos and plenty of conversation.', cta: cta('Find a meetup', '/events') },
          { icon: icons.clock, title: 'Office hours', body: 'Drop in to weekly sessions with the team behind the product and docs.', cta: cta('See the schedule', '/events') },
          { icon: icons.sparkle, title: 'Community awards', body: 'Nominate someone whose help made a real difference to your own work.', cta: cta('Nominate a member', '/community/join') },
          { icon: icons.plug, title: 'Partner network', body: 'Work with consultancies and technology partners who know the platform.', cta: cta('Meet our partners', '/partners') },
          { icon: icons.flask, title: 'Speak at an event', body: 'Share a project, a lesson learned or a pattern with a friendly crowd.', cta: cta('Submit a talk', '/summit') },
        ],
      },
      {
        type: 'ctaBand',
        eyebrow: 'Get involved', // 12
        title: 'Your first step into the community', // 29
        // 125/2
        body: 'Create a free account, introduce yourself in the forum and find a meetup near you. Everyone is welcome, whatever your level.',
        primary: cta('Join today', '/community/join'), // 11
      },
    ],
  },

  '/partners': {
    sections: [
      {
        type: 'heroCenter',
        title: 'Grow your business with the Lattice partner network', // 31/2
        lead: 'Join consultancies and technology companies that help data teams succeed on Lattice.', // 94/1
        primary: cta('Become a partner', '/contact'), // 16
        secondary: cta('Find a partner', '/partner-directory'), // 14
      },
      {
        type: 'checklist',
        variant: 'splitList',
        pt0: false,
        title: 'A partner program for services and software', // 44/2
        paragraphs: [
          'Partners help customers plan migrations, build reliable projects and get more value from the platform.', // 106/2
          // 256/4
          'Whether you deliver services or build a product that integrates with Lattice, the program gives you training, technical support and a direct line to our teams. We work with partners of every size, from boutique consultancies to global system integrators, in every region.',
        ],
        items: [
          { icon: icons.book, title: 'Training and enablement', body: 'Free access to courses, certification vouchers and partner-only workshops that keep your team current with each new release of the platform.' }, // 12-21 / 120-149
          { icon: icons.target, title: 'Go-to-market support', body: 'Joint marketing, listing in the partner directory and co-selling with our account teams on opportunities where your expertise fits best.' },
          { icon: icons.plug, title: 'Technical integration', body: 'Sandbox accounts, early access to new APIs and a dedicated partner engineer to help you design and test a solid integration.' },
        ],
      },
      {
        type: 'split',
        cols: '5/7',
        pt0: true,
        title: 'Services partners', // 19
        // 212/3
        paragraphs: [
          'Consultancies and system integrators help customers design projects, migrate legacy pipelines and train their teams. Services partners receive certification support, deal registration and early access to product updates.',
        ],
        primary: cta('Find a services partner', '/partner-directory'), // 16
        media: ph(10, 506, 411),
      },
      {
        type: 'split',
        variant: 'textLeft',
        cols: '7/5',
        pt0: true,
        title: 'Technology partners', // 19
        // 175/2
        paragraphs: ['Software companies build integrations that connect Lattice to ingestion, orchestration, quality, catalog and analytics tools that data teams already rely on.'],
        primary: cta('Browse integrations', '/product/integrations'), // 16
        media: ph(6, 506, 411),
      },
    ],
  },

  '/services': {
    sections: [
      {
        type: 'heroSplit',
        stroke: 'S4',
        gradient: 'gradient-01',
        wide: true,
        title: 'Expert guidance for every stage of your Lattice journey', // 46/3
        // 120/2
        lead: 'Our services team helps you plan, migrate and scale with confidence, alongside your own engineers and analysts.',
        primary: cta('Contact us', '/contact'), // 11
        media: ph(14, 506, 378),
      },
      {
        type: 'feat',
        variant: 'A',
        wash: false,
        title: 'Services shaped around your team’s goals', // 41
        // 201/2
        body: 'Every engagement is led by experienced practitioners who have run large projects on the platform. We start by understanding your goals, then tailor the work to the size and skills of your team.',
        cards: [
          { icon: icons.target, title: 'Project strategy', body: 'Assess your current stack, agree on priorities and leave with a clear roadmap your whole team can follow.' }, // 12-18 / 103-110
          { icon: icons.cloud, title: 'Migrations', body: 'Move legacy jobs and stored procedures into tested, documented models without disrupting the daily reports people rely on.' },
          { icon: icons.team, title: 'Team enablement', body: 'Hands-on training and pairing that help your engineers and analysts adopt good habits from the start.' },
        ],
      },
      {
        type: 'split',
        variant: 'textLeft',
        cols: '7/5',
        title: 'Work alongside specialists who know the platform', // 44/2
        paragraphs: [
          // 206/3
          'Our consultants have helped hundreds of organizations launch and grow on Lattice. They bring proven project templates, review checklists and a deep understanding of how the platform behaves at scale.',
          // 173/2
          'Engagements can be short and focused, such as a project health check, or longer partnerships that cover a full migration and the training that follows it.',
        ],
        primary: cta('Contact us', '/contact'),
        media: ph(4, 506, 476),
      },
      {
        type: 'split',
        cols: '5/7',
        pt0: true,
        title: 'Prefer a partner? Our network can help you too', // 51/2
        // 319/4
        paragraphs: [
          'Certified consultancies around the world deliver projects on Lattice in many languages and industries. Many customers combine our services team for platform expertise with a partner who knows their sector, their region and their existing tools. We are happy to introduce you to a partner that fits your needs.',
        ],
        primary: cta('Our partners', '/partners'), // 11
        media: ph(8, 506, 463),
      },
      {
        type: 'ctaBand',
        title: 'Let us plan the next step', // 21
        body: 'Tell us about your project and a specialist will reach out.', // 57
      },
    ],
  },
}

