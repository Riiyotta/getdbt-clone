// T9 asset / webinar landing (specs/T9-T11.md C), keyed by route path. Original placeholder copy for
// the fictional company "Lattice"; hosts are invented, avatars illustrated. Forms never submit.
import { articleImgs as art, avatars, customers } from '../../pageAssets'
import { consent, jobRoles, success } from './forms'

const leadFields = (extra = []) => [
  { name: 'firstname', label: 'First name', type: 'text', required: true, autoComplete: 'given-name' },
  { name: 'lastname', label: 'Last name', type: 'text', required: true, autoComplete: 'family-name' },
  { name: 'email', label: 'Business email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'company', label: 'Company name', type: 'text', required: true, autoComplete: 'organization' },
  { name: 'role', label: 'Which best describes your job?', type: 'select', required: true, placeholder: 'Choose one', options: jobRoles },
  { name: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel' },
  ...extra,
]

export default {
  '/resources/webinars/launch-showcase': {
    sections: [
      {
        type: 'formHeader',
        stroke: 'S1',
        h1: 'heading-2',
        breadcrumb: {
          items: [
            { label: 'Webinars', to: '/resources/webinars' },
            { label: 'On demand', to: '/resources/webinars' },
          ],
          current: 'Lattice launch showcase: the season in review',
        },
        tag: 'On demand',
        title: 'Lattice launch showcase', // 23ch
        blocks: [
          ['h3', 'About the show'],
          ['p', '***Forty minutes, five launches, live demos.***'],
          ['p', '*Every season the product team gathers the biggest changes in one place and shows them working against a real project. This time the tour covers the faster core engine, state-aware builds, the context service for assistants and the first public look at charts as code. **You will see each feature run end to end, from a pull request to a production job, with the people who built it explaining the trade-offs.** Stay for the questions at the end, where nothing is off the table.*'],
          ['p', 'The recording is available on demand. Register with the form to watch straight away, and we will also send you the slides, links to the documentation for each feature and an invitation to the follow-up office hours.'],
          ['accordion', [
            {
              q: 'What will we cover?',
              blocks: [
                ['p', '**The running order:**'],
                ['ul', [
                  '**Welcome:** a short look at the roadmap.',
                  '**Build faster:** the new engine and editor improvements, shown on a project with several thousand models.',
                  '**Trust every change:** review previews and state-aware builds in a live pull request.',
                  '**Assistants in practice:** connecting an agent to the context service and checking what it can see.',
                ]],
              ],
            },
          ]],
          ['img', art.launchInline],
        ],
        form: { id: 'register', fields: leadFields(), submit: 'Watch now', consent, success: success.register },
      },
      {
        type: 'logoBar',
        title: 'Relied on by data teams across many industries', // ~34ch-ish
        logos: [customers.kestrel, customers.meridian, customers.tidepool, customers.halcyon, customers.fernway],
      },
      {
        type: 'split',
        variant: 'textLeft',
        title: 'Five demos, one project and plenty of time for your questions', // ~50ch
        paragraphs: [
          [{ b: 'Live demos.' }, ' Every feature is shown against the same realistic project, so you can see how the pieces work together rather than in isolated slides.'],
          [{ b: 'Real use.' }, ' Engineers explain the design decisions behind each launch and the problems early customers asked them to solve.'],
          [{ b: 'Open questions.' }, ' The last part of the session is reserved for audience questions, answered on the record by the product team.'],
        ],
        after: [''],
        primary: { label: 'Watch now', to: '#register' },
        media: art.launchAgenda,
      },
    ],
  },
  '/resources/webinars/charts-as-code': {
    sections: [
      {
        type: 'formHeader',
        stroke: 'S1',
        h1: 'heading-2',
        breadcrumb: {
          items: [
            { label: 'Webinars', to: '/resources/webinars' },
            { label: 'Upcoming', to: '/resources/webinars' },
          ],
          current: 'Charts as code: dashboards that ship with their models',
        },
        tag: 'Upcoming',
        title: 'Charts as code: dashboards that ship with their models', // ~42ch/2
        blocks: [
          ['p', 'Dashboards are where carefully defined metrics most often drift. A definition is reviewed in the project and then rebuilt a little differently in a reporting tool.'],
          ['p', 'In this live session the team behind Lattice Charts shows how to keep simple dashboards in the same repository as the models that feed them.'],
          ['p', 'You will watch a chart get defined in a short file, approved alongside a change to its metric and built during that very run. When a test fails, the chart keeps showing the last good version with a clear note for readers, so nobody makes a decision from a half-updated view. We will also cover sharing, permissions and how charts fit alongside the reporting tools your company already uses, including when a full business intelligence tool is still the better choice.'],
          ['p', 'The second half of the session is a hands-on walkthrough. Bring a project if you have one; if not, we will share a sample repository you can follow along with in a free workspace.'],
          ['p', 'All registrants receive the recording, the sample repository and a summary of the questions answered during the session.'],
          ['p', 'Seats are limited for the live session.'],
          ['ul', [
            'Define a chart in a few lines of configuration and preview it in the editor before opening a pull request.',
            'Review a metric change and the chart that shows it together, with a rendered preview attached to the request.',
            'See how failed tests protect readers by keeping the last good version of a chart on display with a note.',
            'Learn when to use charts as code and when a dedicated reporting tool is the better fit for your team.',
          ]],
          ['accordion', [
            { q: 'Who should attend?', blocks: [['ul', ['Analytics engineers', 'Analysts who own dashboards', 'Data team leads']]] },
            { q: 'What to prepare', blocks: [['ul', ['A free workspace', 'A metric you check weekly', 'Your questions']]] },
          ]],
          ['hosts', {
            title: 'Meet your hosts',
            people: [
              { name: 'Noor Haddad', role: 'Product', avatar: avatars[4] },
              { name: 'Kenji Hollowell', role: 'Engineer', avatar: avatars[7] },
            ],
          }],
        ],
        form: {
          fields: leadFields([
            { name: 'timezone', label: 'Your time zone', type: 'select', required: true, placeholder: 'Choose one', options: ['Americas', 'Europe and Africa', 'Asia and Pacific'] },
          ]),
          submit: 'Save my seat',
          consent,
          success: success.register,
        },
      },
    ],
  },
  '/resources/whitepaper-control-plane': {
    sections: [
      {
        type: 'formHeader',
        h1: 'heading-2',
        breadcrumb: {
          items: [
            { label: 'Resources', to: '/resources' },
            { label: 'Paper', to: '/resources' },
          ],
          current: 'One shared layer for many teams, people and agents',
        },
        tag: 'Paper',
        title: 'One shared layer for many teams: coordinating data work at scale', // ~60ch/3
        blocks: [
          ['p', 'As more teams build on the same data, the hard problems stop being technical and become problems of coordination: who owns a definition, how a change is reviewed, and how everyone, including automated agents, finds the version they can trust.\n\nThis paper describes a shared layer that sits between data platforms and the people and tools that use them. It covers ownership, contracts between teams, review practices, lineage and the context agents need to answer questions safely.\n\nIt draws on conversations with data leaders at companies of every size and closes with a practical checklist for getting started in a quarter.'],
          ['buttons', [{ label: 'Download the paper', to: '#' }]],
        ],
        cover: art.whitepaperCover,
      },
    ],
  },
}
