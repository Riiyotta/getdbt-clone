// Shared editorial pools for T5-T11 (original placeholder copy for the fictional company "Lattice").
// Authors, dates and posts are invented. Blog cards link to the two cloned posts.
import { avatars, covers } from '../../pageAssets'

const POST_A = '/blog/summit-announcements'
const POST_B = '/blog/lattice-joins-northwind'

// ---------------------------------------------------------------- authors (12-18ch names)
const author = (name, i) => ({ name, avatar: { ...avatars[i], alt: '' }, to: '#' })
export const authors = {
  rhea: author('Rhea Castellano', 0),
  tobias: author('Tobias Wrenfield', 1),
  amara: author('Amara Lindqvist', 2),
  dev: author('Devansh Kulkarni', 3),
  noor: author('Noor Haddad', 4),
  felix: author('Felix Arendt', 5),
  saoirse: author('Saoirse Malley', 6),
  kenji: author('Kenji Hollowell', 7),
  ines: author('Ines Carvalho', 8),
  marcus: author('Marcus Oyelaran', 9),
  lena: author('Lena Brightwater', 10),
  theo: author('Theo Vandersloot', 11),
}

// ---------------------------------------------------------------- blog posts
// [category, readTime, title (34-101ch), excerpt (55-130ch), author, date]
const P = (tag, readTime, title, excerpt, by, date, k) => ({
  tag,
  readTime,
  title,
  excerpt,
  author: authors[by],
  date,
  image: { ...covers[k % covers.length], alt: '' },
  to: k % 2 ? POST_B : POST_A,
})

export const blogBlocks = [
  {
    // block 1: newest posts, no header
    posts: [
      P('Product', '9 min', 'Everything we shipped at Summit this year and how the pieces fit together', null, 'rhea', 'October 21, 2026', 0),
      P('Company', '4 min', 'Lattice and Northwind are now one company', 'What the combination means for customers, for the open project and for the roadmap over the coming year.', 'tobias', 'October 14, 2026', 1),
      P('Data quality', '7 min', 'A field guide to tests that catch real problems', 'Which checks earn their keep, which ones only add noise, and how to tell the difference before a pager goes off.', 'amara', 'October 9, 2026', 2),
      P('Modeling', '6 min', 'Naming conventions your future teammates will thank you for', 'Small, boring rules for prefixes, grain and folders that make a large project readable at a glance.', 'dev', 'October 2, 2026', 3),
    ],
  },
  {
    title: 'Product',
    posts: [
      P('Product', '8 min', 'State-aware builds are now on by default for every new project', null, 'kenji', 'September 30, 2026', 4),
      P('Product', '5 min', 'A faster lineage explorer for very large projects', 'Rendering ten thousand nodes without a spinner, and the trade-offs we made to get there.', 'felix', 'September 24, 2026', 5),
      P('Product', '6 min', 'Column-level descriptions now follow a rename', 'Rename a column and its docs and tests travel with it, across every downstream model in the project.', 'ines', 'September 17, 2026', 6),
      P('Product', '4 min', 'Scheduling jobs by data arrival instead of the clock', 'Event-based triggers mean nightly jobs start when sources land rather than at a hopeful fixed hour.', 'kenji', 'September 10, 2026', 7),
    ],
  },
  {
    title: 'Company',
    posts: [
      P('Company', '5 min', 'Why we are doubling our investment in the open-source core', null, 'tobias', 'September 3, 2026', 8),
      P('Company', '3 min', 'Opening our first office in the southern hemisphere', 'A new hub for customers and contributors across the region, with support hours that finally match theirs.', 'saoirse', 'August 27, 2026', 9),
      P('Company', '6 min', 'What our internal data team learned from a year of dogfooding', 'Running our own metrics on our own product surfaced dozens of rough edges. Here are the ones we fixed first.', 'marcus', 'August 20, 2026', 10),
      P('Company', '4 min', 'Our latest security review, in plain language', 'A readable summary of the audit scope, what was found, and the changes we made in response.', 'lena', 'August 13, 2026', 11),
    ],
  },
  {
    title: 'Modeling',
    posts: [
      P('Modeling', '11 min', 'Incremental models without tears: a practical walkthrough from first draft to production', null, 'dev', 'August 6, 2026', 12),
      P('Modeling', '7 min', 'When to split a wide mart into smaller ones', 'Signs that a single table is doing too many jobs, and a gentle way to break it apart without breaking dashboards.', 'amara', 'July 30, 2026', 13),
      P('Modeling', '5 min', 'Snapshots, explained with one tiny example', 'Track slowly changing records with a four-line config and a test that proves history is kept.', 'theo', 'July 23, 2026', 14),
      P('Modeling', '8 min', 'Designing a semantic layer for people who never read SQL', 'Metric names, units and descriptions that make sense to a finance lead on the first try.', 'noor', 'July 16, 2026', 15),
    ],
  },
  {
    title: 'Teams',
    posts: [
      P('Teams', '6 min', 'How a three-person data team supports a company of nine hundred', null, 'saoirse', 'July 9, 2026', 16),
      P('Teams', '5 min', 'Code review habits for analytics engineers', 'What to look for in a model diff, how to leave useful comments and when a review should be a conversation.', 'ines', 'July 2, 2026', 17),
      P('Teams', '4 min', 'Onboarding an analyst in their first week', 'A checklist that gets a new hire from laptop setup to a merged, tested model in five days.', 'felix', 'June 25, 2026', 18),
      P('Teams', '7 min', 'Splitting one big project into domains without losing shared definitions', 'Ownership boundaries, contracts and cross-project references, told through one retailer’s migration.', 'marcus', 'June 18, 2026', 19),
    ],
  },
  {
    title: 'Community',
    posts: [
      P('Community', '3 min', 'Meet this season’s community award winners', null, 'lena', 'June 11, 2026', 20),
      P('Community', '5 min', 'What we heard at forty local meetups this spring', 'Recurring questions, favourite packages and the topics people want covered next, collected city by city.', 'saoirse', 'June 4, 2026', 21),
      P('Community', '4 min', 'How to give your first meetup talk', 'Pick one problem, show the real code, keep it to twenty minutes, and other advice from seasoned speakers.', 'rhea', 'May 28, 2026', 22),
      P('Community', '6 min', 'The most useful open packages of the year', 'A short list of community-maintained packages that save hours, picked by the people who use them daily.', 'theo', 'May 21, 2026', 23),
    ],
  },
  {
    title: 'Data quality',
    posts: [
      P('Data quality', '9 min', 'Treating freshness as a promise: service levels for data products your users can rely on', null, 'amara', 'May 14, 2026', 0),
      P('Data quality', '6 min', 'Writing alerts that people actually read', 'Fewer, clearer notifications that name an owner, a likely cause and the first thing to check.', 'kenji', 'May 7, 2026', 1),
      P('Data quality', '5 min', 'Contracts between producers and consumers, step by step', 'Agree on columns and types up front, enforce them on every build, and stop surprise breakages downstream.', 'noor', 'April 30, 2026', 2),
      P('Data quality', '7 min', 'Post-incident reviews for data teams', 'A blameless template for writing up a bad number, from first report to the guardrail that prevents a repeat.', 'dev', 'April 23, 2026', 3),
    ],
  },
  {
    title: 'Ideas',
    posts: [
      P('Ideas', '8 min', 'Agents need context more than they need cleverness', null, 'tobias', 'April 16, 2026', 4),
      P('Ideas', '6 min', 'The case for boring data infrastructure', 'Predictable tools, small changes and good defaults beat novelty when a whole company depends on the numbers.', 'marcus', 'April 9, 2026', 5),
      P('Ideas', '5 min', 'What a metric really is', 'A definition, an owner, a grain and a test. Anything less is just a number that happens to be on a chart.', 'noor', 'April 2, 2026', 6),
      P('Ideas', '7 min', 'Analytics engineering ten years from now', 'Some guesses about the work, the tools and the people, from a team that spends its days on the tools.', 'rhea', 'March 26, 2026', 7),
    ],
  },
]

// three newest posts for T8 "Latest posts" (compact cards)
export const latestPosts = blogBlocks
  .flatMap((b) => b.posts)
  .slice(1, 4)
  .map(({ excerpt, ...p }) => p)
