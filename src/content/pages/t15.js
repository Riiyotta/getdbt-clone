// T15 champions page content (specs/T14-T17.md T15): the fictional "Lattice Pathfinders" community
// ambassador program. All people are invented and drawn as abstract illustrated figures.
import { champions as A } from '../../pageAssets'

const stories = [
  ['How giving a lightning talk turned into my favourite part of the job', 'Ines Valdecasa'],
  ['From lurker to meetup host in one year: what changed for me', 'Rowan Achterberg'],
  ['Small pull requests, big wins: notes from a year of reviewing community packages', 'Talia Moreau-Singh'],
  ['Teaching analysts to test their own models without a single lecture slide', 'Kofi Asante-Mills'],
  ['What I learned running a study group across five time zones and two languages at once', 'Mei-Lin Okafor'],
  ['Why I write the docs first', 'Bastian Krogh'],
  ['Turning a messy incident into a public write-up the whole community could learn from', 'Ana Paula Ferreira'],
  ['The quiet power of answering one forum question a day', 'Dmitri Halloran'],
  ['Building a metrics layer for a nonprofit on a shoestring budget and a long weekend', 'Yasmin El-Amrani'],
  ['Mentoring my first new hire through their very first production release', 'Owen Thackeray'],
  ['Sketching lineage on whiteboards: a visual habit that changed how my team reviews code', 'Priyanka Rao'],
  ['Hosting a hands-on workshop for forty people with nothing but a projector and some patience', 'Lucas Brennan-Ito'],
]

export default {
  '/champions': {
    sections: [
      {
        type: 'champHero',
        wordmark: A.wordmark,
        title: 'Shaping how data teams build together',
        primary: { label: 'Apply to join the 2027 cohort', to: '/community/join' },
        tertiary: { label: 'Know someone great? Put their name in.', to: '#' },
        photo: A.hero,
      },
      {
        type: 'champAbout',
        title: 'Inside the Lattice Pathfinders',
        body: [
          'Pathfinders are practitioners who make the Lattice community a better place to learn. They write guides, answer questions, host meetups and bring field notes back to our product teams. We invest in their growth and give their work a bigger stage. See the ',
          { a: 'program handbook', to: '#' },
          ' or browse the ',
          { a: 'community calendar', to: '/events' },
          '.',
        ],
        primary: { label: 'Meet the Pathfinders', to: '#members' },
        tertiary: { label: 'Explore the wider Lattice community', to: '/community' },
      },
      {
        type: 'champMembers',
        id: 'members',
        title: 'Say hello to the Pathfinders',
        body: 'A few of the practitioners who share what works, help newcomers find their feet, and shape what comes next.',
        primary: { label: 'See the 2026 cohort', to: '#' },
        secondary: { label: 'Join our community', to: '/community/join' },
        members: [
          { name: 'Marisol Vance', role: 'Analytics Engineer, Fernhollow Labs', link: 'Homepage', photo: A.members[0] },
          { name: 'Priya Dumont', role: 'Head of Analytics Platform, Tidewell Health', link: 'Homepage', photo: A.members[1] },
          { name: 'Caspar Ilunga', role: 'Data Engineering Lead, Northgable', link: 'Homepage', photo: A.members[2] },
        ],
        cta: 'Open profile',
      },
      {
        type: 'champItems',
        title: 'How Pathfinders help',
        body: 'Working practitioners passing on what they know through writing, talks, mentoring and feedback.',
        cols: 5,
        items: [
          { icon: A.icons.sparkle, title: 'Writing guides', body: 'Publishing walkthroughs, recipes and sample projects that help others get unstuck sooner.' },
          { icon: A.icons.book, title: 'Speaking at events', body: 'Presenting at our yearly conference, local meetups and online sessions around the world.' },
          { icon: A.icons.team, title: 'Mentoring newcomers', body: 'Answering questions in chat, pairing on tricky models and reviewing first pull requests.' },
          { icon: A.icons.globe, title: 'Hosting meetups', body: 'Organising in-person and online gatherings that connect practitioners in their region.' },
          { icon: A.icons.flask, title: 'Testing new features', body: 'Trying early builds and sending honest notes that make the product better for everyone.' },
        ],
      },
      {
        type: 'champQuote',
        quote:
          '“Being a Pathfinder taught me that the fastest way to learn something is to explain it to a room of curious people. Every talk I give comes back as ten new ideas for my own team.”',
        name: 'Hollis Mbeki',
        role: 'Staff Analytics Engineer, Larchmont',
        avatar: A.avatar,
      },
      {
        type: 'champStories',
        eyebrow: 'Hear from the Pathfinders',
        title: 'Stories and lessons from the Pathfinders',
        body: 'Talks, write-ups and field notes the cohort has shared over the year.',
        cards: stories.map(([title, by], i) => ({ label: 'Video', title, by, img: A.stories[i], cta: { label: 'Watch the talk', to: '#' } })),
      },
      {
        type: 'champItems',
        dark: true,
        eyebrow: 'Member benefits',
        title: 'How we back every Pathfinder',
        cols: 4,
        items: [
          { icon: A.light.badge, title: 'Growth budget', body: 'Funding for courses, certifications and conference travel that helps each member grow as a leader.' },
          { icon: A.light.key, title: 'Early previews', body: 'First look at upcoming features, private betas and direct time with the people building them.' },
          { icon: A.light.team, title: 'A peer network across regions', body: 'Monthly roundtables, office hours and a private space to swap ideas with other members.' },
          { icon: A.light.heart, title: 'Recognition', body: 'Spotlights on our blog, a seat on conference panels and a few surprises to say thanks.' },
        ],
      },
      {
        type: 'champClosing',
        eyebrow: 'Who we hope to welcome',
        title: 'Become a Pathfinder',
        body: 'We are looking for practitioners who lift others up through teaching, writing, organising or thoughtful product feedback. Nominations for the next cohort open after our annual conference, and the review panel picks new members in the first weeks of the new year.',
        cta: { label: 'Start your Pathfinder journey', to: '/community/join' },
        checks: [
          'A steady record of helping others in the community',
          'Shares what they learn through talks, posts or code',
          'Holds a Lattice certification, or plans to earn one soon',
          'Supports newcomers with patience and care',
          'Builds with Lattice in real projects',
          'Follows the community code of conduct in every space where we gather',
        ],
      },
    ],
  },
}
