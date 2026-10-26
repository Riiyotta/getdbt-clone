// T8 article with sticky rail (specs/T5-T8.md B-T8), keyed by route path. Original placeholder copy.
import { articleImgs as art } from '../../pageAssets'
import { blogBlocks, authors } from './editorial'
import { communityLinks, communityT2 } from './shared'
import { guideBlocks } from './t8-guide'
import { mergerPost, summitPost } from './t8-posts'
import { reportBlocks, reportForm } from './t8-report'

const posts = blogBlocks.flatMap((b) => b.posts).map(({ excerpt, ...p }) => p)
const latest = (skip) => ({ type: 'latestPosts', title: 'Latest posts', cards: posts.filter((p) => p.title !== skip).slice(0, 3) })
const community = (title) => ({ type: 'ctaLong', content: title ? { ...communityT2, title } : communityT2, ...communityLinks })

export default {
  '/blog/summit-announcements': {
    sections: [
      { type: 'postBody', ...summitPost },
      latest(posts[0].title),
      community(),
    ],
  },
  '/blog/lattice-joins-northwind': {
    sections: [
      { type: 'postBody', ...mergerPost },
      latest(posts[1].title),
      community(),
    ],
  },
  '/resources/analytics-lifecycle': {
    sections: [
      {
        type: 'guideHeader',
        breadcrumb: { items: [{ label: 'Resources', to: '/resources' }, { label: 'Guides', to: '/resources' }], current: 'The analytics lifecycle, from ask to answer' },
        tag: 'Field guide',
        title: 'The analytics lifecycle, from ask to answer', // 42ch/3
        author: authors.amara,
        buttons: [{ label: 'Download the guide (PDF)', to: '#' }],
        image: art.lifecycleHero,
      },
      {
        type: 'guideBody',
        blocks: guideBlocks,
        toc: 'Guide sections',
        promo: {
          title: 'Put it into practice',
          body: 'Run your next request through all six stages in a free Lattice workspace.',
          cta: { label: 'Start building for free', to: '/signup' },
        },
      },
      {
        type: 'ctaBand',
        wide: true,
        title: 'Bring the loop to your team', // 23ch
        body: 'Briefs, reviews, tests and freshness promises, all in one project your whole team can read.',
        primary: { label: 'Start for free', to: '/signup' },
      },
    ],
  },
  '/resources/state-of-data-teams': {
    sections: [
      {
        type: 'guideHeader',
        breadcrumb: { items: [{ label: 'Resources', to: '/resources' }, { label: 'Reports', to: '/resources' }], current: 'State of data teams 2026: trust, cost and AI' },
        title: 'State of data teams 2026: trust, cost and AI', // 42ch/2
        readTime: '24 min',
        buttons: [
          { label: 'Download the full report', to: '#download-report' },
          { label: 'Watch the results webinar', to: '/resources/webinars/launch-showcase' },
        ],
        image: art.reportHero,
      },
      {
        type: 'guideBody',
        blocks: reportBlocks,
        toc: 'Report contents',
        form: reportForm,
        promo: {
          title: 'See it in your data',
          body: 'Measure test coverage, freshness and cost for your own project in minutes.',
          cta: { label: 'Try Lattice for free', to: '/signup' },
        },
      },
      community('Talk through these findings with practitioners from around the world'),
    ],
  },
}
