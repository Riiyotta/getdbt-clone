// T7 filterable card grids (specs/T5-T8.md B-T7), keyed by route path. Original placeholder copy for
// the fictional company "Lattice".
import { articleImgs as art, customers } from '../../pageAssets'
import { asideCommunity, cta } from './shared'
import { caseStudies, events, industries, mediaItems, releases, sessionOptions, sessions } from './t7-data'

const shortBand = (title, body, primary, secondary) => ({ type: 'ctaBand', title, body, primary, secondary })

export default {
  '/case-studies': {
    sections: [
      {
        type: 'listingHeader',
        wide: true,
        eyebrow: 'Stories from teams', // 18ch
        title: 'Data teams that ship with Lattice', // 32ch
        lead: 'See how teams of every size build, test and share data their companies can trust.', // ~78ch
      },
      {
        type: 'caseStudies',
        items: caseStudies,
        search: 'Search case studies',
        filters: {
          label: 'Filters',
          group: 'Industry',
          options: industries,
          clearLabel: 'Clear filters',
          cancelLabel: 'Cancel',
          applyLabel: 'Apply selections',
        },
        featured: {
          logo: customers.halcyon,
          quote:
            'We used to spend the first week of every audit rebuilding the story of how a figure was produced. Now the story is the project itself: every model versioned, every change reviewed, every test recorded. Our auditors read the lineage directly, our desks answer their own questions, and the central team finally has time to build the things the business keeps asking for.',
          name: 'Grace Okafor',
          role: 'Chief Data Officer, Halcyon',
          cta: cta('Read the story', '/case-studies/halcyon'),
        },
        empty: { image: art.empty, title: 'No stories match that search yet', button: 'Clear search' },
        more: 'Load more case studies',
      },
      {
        type: 'ctaBand',
        eyebrow: 'Try Lattice', // 11ch
        title: 'Write your own success story', // 24ch-ish
        body: [
          'Start with a free workspace and a real question. Most teams ship their first tested model on day one and their first production job in a week.',
          'Prefer a guided start? Our solutions engineers will help you plan a migration, set up reviews and choose the right defaults for your team.',
        ],
        primary: cta('Book a demo', '/contact'),
        secondary: cta('Create a free account', '/signup'),
        aside: asideCommunity,
      },
    ],
  },
  '/events': {
    sections: [
      {
        type: 'listingHeader',
        title: 'Events',
        lead: 'Meet the Lattice team and fellow practitioners at meetups, workshops, roadshows and our annual Summit. Find something near you or join online from anywhere.',
      },
      {
        type: 'events',
        items: events,
        placeholder: 'Filter by region',
        options: [
          { value: 'amer', label: 'AMER' },
          { value: 'emea', label: 'EMEA' },
          { value: 'apac', label: 'Asia Pacific' },
        ],
        search: 'Search',
        empty: { line: 'Try another region or a shorter search term to see more upcoming events.', title: 'No events match your filters yet' },
      },
      shortBand(
        'Cannot make it in person this time?',
        'Watch recordings from past events on demand, or join the community to hear about the next meetup in your city.',
        cta('Watch sessions on demand', '/resources/on-demand'),
        cta('Join the community', '/community/join'),
      ),
    ],
  },
  '/resources/on-demand': {
    sections: [
      { type: 'listingHeader', title: 'On-demand sessions', lead: 'Watch talks, demos and panels from past Summits whenever it suits you.' },
      {
        type: 'onDemand',
        items: sessions,
        placeholder: 'Filter by event',
        options: sessionOptions,
        search: 'Search',
        empty: { line: 'Try another event or a shorter search term to see more recorded sessions.', title: 'No sessions match your search yet' },
        more: 'View more',
      },
      {
        type: 'ctaBand',
        wide: true,
        title: 'Join us live at the next Summit',
        body: 'Three days of talks, workshops and conversations with the people building modern analytics.',
        primary: cta('Get notified when registration opens', '/summit'),
      },
    ],
  },
  '/press': {
    sections: [
      { type: 'listingHeader', title: 'Press', lead: 'News and coverage about Lattice.' },
      { type: 'pressGrid', title: 'In the media', items: mediaItems, variant: 'media', more: 'View more' },
      { type: 'pressGrid', title: 'Press releases', items: releases, variant: 'release', more: 'View more' },
      { type: 'ctaBand', title: 'Press contact', body: 'Reporters and analysts can reach our communications team at press@lattice.example.' },
    ],
  },
}
