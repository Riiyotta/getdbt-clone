// T6 hub listing with category tabs (specs/T5-T8.md B-T6), keyed by route path. Original placeholder
// copy for the fictional company "Lattice". Category pages are not routes in the clone, so pills and
// block "view" links point at the hub index itself.
import { covers } from '../../pageAssets'
import { blogBlocks } from './editorial'
import { communityLinks, communityT2, cta } from './shared'

const img = (k) => ({ ...covers[k % covers.length], alt: '' })
const pills = (hub, labels) => labels.map((label) => ({ label, to: hub }))

// ---------------------------------------------------------------- blog
const blog = {
  sections: [
    { type: 'listingHeader', variant: 'hub', title: 'Blog' },
    { type: 'categoryNav', search: 'Search every post', pills: pills('/blog', ['All', 'Product', 'Company', 'Modeling', 'Teams', 'Community', 'Data quality', 'Ideas']) },
    {
      type: 'hubListing',
      variant: 'blog',
      blocks: blogBlocks.map((b) => {
        const [first, ...rest] = b.posts
        const { excerpt, ...featured } = first
        return { title: b.title, more: b.title && cta('Browse all posts', '/blog'), featured, cards: rest }
      }),
    },
    { type: 'ctaLong', content: communityT2, ...communityLinks },
  ],
}

// ---------------------------------------------------------------- webinars
const LAUNCH = '/resources/webinars/launch-showcase'
const CHARTS = '/resources/webinars/charts-as-code'
const w = (tag, title, k) => ({ tag, title, image: img(k), to: k % 2 ? CHARTS : LAUNCH })
const webinars = {
  sections: [
    { type: 'listingHeader', variant: 'hub', title: 'Webinars' },
    { type: 'categoryNav', search: 'Search', pills: pills('/resources/webinars', ['All', 'Upcoming', 'On demand', 'Workshops']) },
    {
      type: 'hubListing',
      variant: 'resource',
      blocks: [
        {
          title: 'Upcoming',
          more: cta('View category', '/resources/webinars'),
          featured: w('Live', 'Launch showcase: a guided tour of everything new in this season’s release', 0),
          cards: [
            w('Live', 'Charts as code, live', 1),
            w('Live', 'Office hours: state-aware builds in production', 2),
            w('Live', 'Designing metrics your finance team will sign off on', 3),
            w('Live', 'Ask the engineers: the new core engine', 4),
            w('Live', 'From scripts to tested models in one quarter: a migration clinic with practitioners who have done it', 5),
            w('Live', 'Data contracts for small teams', 6),
          ],
        },
        {
          title: 'On demand',
          more: cta('View category', '/resources/webinars'),
          featured: w('On demand', 'How three data teams cut warehouse spend without dropping a single report', 7),
          cards: [
            w('On demand', 'Reviewing model changes like a software team', 8),
            w('On demand', 'Lineage you can show an auditor', 9),
            w('On demand', 'Getting a new analyst to a merged pull request in five days', 10),
          ],
        },
        {
          title: 'Workshops',
          more: cta('View category', '/resources/webinars'),
          featured: w('Workshop', 'Hands-on: build, test and ship your first production model', 11),
          cards: [
            w('Workshop', 'Incremental models from scratch', 12),
            w('Workshop', 'Writing tests that catch real problems', 13),
            w('Workshop', 'Semantic layer basics', 14),
            w('Workshop', 'Connecting an assistant to your project safely, with read-only access and logged requests', 15),
            w('Workshop', 'Snapshots in practice', 16),
            w('Workshop', 'Freshness rules and alert routing', 17),
          ],
        },
      ],
    },
    {
      type: 'ctaBand',
      title: 'Learn alongside other practitioners', // 33ch-ish
      body: 'Live sessions, recordings and hands-on workshops from the people who build Lattice and the teams who run it in production every day.',
      primary: cta('Join the community', '/community/join'),
      secondary: cta('Browse all resources', '/resources'),
    },
  ],
}

// ---------------------------------------------------------------- resources
const r = (tag, title, to, k) => ({ tag, title, to, image: img(k) })
const resources = {
  sections: [
    { type: 'listingHeader', variant: 'hub', title: 'Resources' },
    { type: 'categoryNav', search: 'Search', pills: pills('/resources', ['All', 'Guides', 'Reports', 'Webinars']) },
    {
      type: 'hubListing',
      variant: 'resource',
      blocks: [
        {
          featured: r('Report', 'State of data teams 2026: trust, cost and AI', '/resources/state-of-data-teams', 18),
          cards: [
            r('Guide', 'The analytics lifecycle, from ask to answer', '/resources/analytics-lifecycle', 19),
            r('Whitepaper', 'One shared layer for many teams', '/resources/whitepaper-control-plane', 20),
            r('Webinar', 'Launch showcase: what is new this season', LAUNCH, 21),
          ],
        },
        {
          title: 'Guides',
          more: cta('View category', '/resources'),
          cards: [
            r('Guide', 'The analytics lifecycle, from ask to answer', '/resources/analytics-lifecycle', 22),
            r('Guide', 'A practical guide to incremental models', '/resources/analytics-lifecycle', 23),
            r('Guide', 'Testing strategies for growing projects', '/resources/analytics-lifecycle', 0),
          ],
        },
        {
          promo: {
            title: 'New to Lattice? Start here', // 25ch-ish
            body: 'Step-by-step tutorials take you from an empty project to a tested, documented model in an hour.',
            cta: cta('Read the documentation', '#'),
          },
        },
        {
          title: 'Reports',
          more: cta('View category', '/resources'),
          featured: r('Report', 'Data team benchmarks: cost, quality and speed', '/resources/state-of-data-teams', 1),
          cards: [
            r('Report', 'State of data teams 2026', '/resources/state-of-data-teams', 2),
            r('Report', 'Where analytics budgets are going next year', '/resources/state-of-data-teams', 3),
            r('Whitepaper', 'Governance for teams that ship daily', '/resources/whitepaper-control-plane', 4),
          ],
        },
        {
          title: 'Webinars',
          more: cta('View category', '/resources/webinars'),
          featured: r('Webinar', 'Charts as code, live with the team that built it', CHARTS, 5),
          cards: [
            r('Webinar', 'Launch showcase: what is new this season', LAUNCH, 6),
            r('On demand', 'Modeling patterns that scale', '/resources/on-demand', 7),
            r('Webinar', 'Charts as code, live', CHARTS, 8),
          ],
        },
      ],
    },
    {
      type: 'ctaBand',
      title: 'Put these resources to work today',
      body: 'Open a free workspace and try every pattern from these guides on your own data, or talk to us about a guided evaluation for your team.',
      primary: cta('Start for free', '/signup'),
      secondary: cta('Talk to our team', '/contact'),
    },
  ],
}

export default { '/blog': blog, '/resources/webinars': webinars, '/resources': resources }
