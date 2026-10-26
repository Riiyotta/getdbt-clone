// T16 event microsite content (specs/T14-T17.md T16): "Forge 2026", a fictional Lattice user
// conference. Sponsors are invented wordmarks; people are abstract illustrated figures.
import { summit as A } from '../../pageAssets'

// Sub-routes are out of scope: they point at '#'.
const waitlist = { label: 'Get first access', to: '#' }

// Event chrome (shell.event-subnav / shell.event-footer), used by the layout's `event` chrome.
export const eventChrome = {
  logo: A.logo,
  wordmark: A.wordmark,
  home: '/summit',
  links: [
    [
      { label: 'Agenda', to: '#' },
      { label: 'Speakers', to: '#' },
    ],
    [
      { label: 'Experience', to: '#' },
      { label: 'Forge on tour', to: '#' },
    ],
  ],
  cta: waitlist,
  footerLinks: [
    [
      { label: 'Home', to: '/summit' },
      { label: 'Waitlist', to: '#' },
      { label: 'Event terms', to: '#' },
    ],
    [
      { label: 'Privacy notice', to: '#' },
      { label: 'Event app privacy', to: '#' },
      { text: 'Questions? Write to us at: ', label: 'forge@lattice.example', to: 'mailto:forge@lattice.example' },
    ],
  ],
  tagline: 'Build together. Ship with care. Repeat it.',
  copyright: 'Copyright 2026 Lattice, Inc. All rights reserved.',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
}

export default {
  '/summit': {
    sections: [
      {
        type: 'eventHero',
        title: 'Forge 2026 is a wrap. Thanks!',
        lead: 'Missed a session? Every keynote and breakout is now streaming on demand.',
        cta: { label: 'Stream the talks', to: '#' },
        portraits: A.portraits,
      },
      { type: 'eventMarquee', photos: A.photos },
      {
        type: 'eventRecap',
        title: 'All the launches from Forge 2026',
        body: 'Catch up on new features, product updates and roadmap notes shared from the stage.',
        cta: { label: 'Read the recap post', to: '/blog/summit-announcements' },
      },
      {
        type: 'eventRows',
        title: 'Fresh drops',
        rows: [
          { title: 'Self-hosted or managed? A plain guide to picking your Lattice setup.', cta: { label: 'Dig deeper', to: '/product/self-hosted-vs-platform' } },
          { title: 'Warm Cache skips rebuilding models whose inputs stayed put.', cta: { label: 'Dig deeper', to: '/product/state' } },
          { title: 'Your assistant is guessing. Hand it real context about your data.', cta: { label: 'Dig deeper', to: '/product/assistant' } },
          { title: 'Charts in code: reviewable dashboards that people and agents share.', cta: { label: 'Dig deeper', to: '/product/charts' } },
        ],
      },
      {
        type: 'eventSponsors',
        title: 'Made possible by our partners',
        tiers: [
          { label: 'Keystone', logos: A.sponsors.t1 },
          { label: 'Arch', logos: A.sponsors.t2 },
          { label: 'Bridge', logos: A.sponsors.t3 },
        ],
        cta: { label: 'See every sponsor', to: '#' },
      },
      { type: 'eventMedia', img: A.audience },
      {
        type: 'eventQuote',
        quote: '“Forge reminds me every year why I got into data: smart people, honest talks and bold ideas.”',
        name: '— Ada Kowski',
        role: 'Analytics Platform Manager, Saltmarsh Co',
      },
      {
        type: 'eventClosing',
        title: 'See you at\nthe next Forge',
        body: 'Join practitioners and data leaders for three days of hands-on sessions, hallway chats and fresh ideas.',
        cta: waitlist,
      },
    ],
  },
}
