// T10 form pages (specs/T9-T11.md D), keyed by route path. Original placeholder copy for the
// fictional company "Lattice". Forms validate locally and never send data anywhere.
import { customers, icons } from '../../pageAssets'
import { consent, jobRoles, success } from './forms'
import { cta, statsT2 } from './shared'

const logos = {
  type: 'logos',
  logos: [customers.kestrel, customers.meridian, customers.tidepool, customers.ferrocene, customers.orbitly, customers.fernway],
}
const stats = { type: 'stats', ...statsT2 }

export default {
  '/contact': {
    sections: [
      {
        type: 'formHeader',
        title: 'Talk to our data team', // ~20ch
        blocks: [
          ['p', 'Tell us a little about your team and what you are trying to solve. We will set up a session with a specialist who knows your stack and can show Lattice on a project like yours.'],
          ['checklist', [
            { icon: icons.rocket, title: 'Move faster', body: 'Ship tested, documented models in hours instead of weeks of back and forth.' },
            { icon: icons.shield, title: 'Trust every number in every report', body: 'Catch problems before stakeholders do, with tests, reviews and freshness rules on every model.' },
            { icon: icons.team, title: 'Work as one team', body: 'Share definitions across teams and tools so people and agents read the same answers.' },
          ]],
          ['logos', { label: 'Relied on by teams including', logos: logos.logos }],
        ],
        form: {
          fields: [
            { name: 'firstname', label: 'First name', type: 'text', required: true, half: true, autoComplete: 'given-name' },
            { name: 'lastname', label: 'Last name', type: 'text', required: true, half: true, autoComplete: 'family-name' },
            { name: 'email', label: 'Business email', type: 'email', required: true, half: true, autoComplete: 'email' },
            { name: 'company', label: 'Company name', type: 'text', required: true, half: true, autoComplete: 'organization' },
            { name: 'role', label: 'Which best describes your job?', type: 'select', required: true, placeholder: 'Choose one', options: jobRoles },
            { name: 'phone', label: 'Phone number (optional)', type: 'tel', autoComplete: 'tel' },
            { name: 'message', label: 'Message (optional)', type: 'textarea' },
          ],
          submit: 'Book a demo',
          consent,
          success: success.contact,
        },
      },
      {
        type: 'feat',
        variant: 'E',
        wash: true,
        pt0: true,
        cards: [
          { icon: icons.user, title: 'Create a free account', body: 'Open a developer workspace and ship a first tested model today.', cta: cta('Start building', '/signup') },
          { icon: icons.coin, title: 'Compare our plans', body: 'See which plan fits your team, from a single developer to a large enterprise.', cta: cta('Explore pricing', '/pricing') },
          { icon: icons.bell, title: 'Get support', body: 'Already a customer? Our support team can help with anything on your account.', cta: cta('Contact support', '/report-a-problem') },
        ],
      },
      stats,
    ],
  },
  '/signup': {
    sections: [
      {
        type: 'formHeader',
        tag: 'Free developer workspace',
        title: 'Start for free',
        blocks: [
          ['p', 'Create a workspace in minutes and build your first tested model today. Need help planning a larger rollout? [Talk to our data team](/contact).'],
          ['checklist', [
            { icon: icons.rocket, title: 'Build in minutes', body: 'Connect a warehouse and write a first model today.' },
            { icon: icons.flask, title: 'Test early', body: 'Add tests as you go and catch problems before they reach anyone else.' },
            { icon: icons.branch, title: 'Grow with your team', body: 'Invite colleagues, review each other’s changes and move to a team plan whenever you are ready for it.' },
          ]],
          ['logos', { label: 'Used by data teams at', logos: logos.logos }],
        ],
        form: {
          mode: 'submit',
          buttonStyle: 'h',
          fields: [
            { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
            { name: 'firstname', label: 'First name', type: 'text', required: true, half: true, autoComplete: 'given-name' },
            { name: 'lastname', label: 'Last name', type: 'text', required: true, half: true, autoComplete: 'family-name' },
            { name: 'company', label: 'Company', type: 'text', required: true, autoComplete: 'organization' },
            {
              name: 'password',
              label: 'Password',
              type: 'password',
              required: true,
              autoComplete: 'new-password',
              help: 'Use at least twelve characters, mixing upper and lower case letters with at least one number and one symbol.',
              helpLeading: true,
            },
            { name: 'confirm', label: 'Confirm password', type: 'password', required: true, matches: 'password', autoComplete: 'new-password' },
            {
              name: 'referral',
              label: 'Where did you first find Lattice?',
              type: 'combobox',
              placeholder: 'Select one',
              options: ['A colleague', 'Search engine', 'Community forum', 'Meetup or conference', 'Podcast', 'Newsletter', 'Social media', 'Consulting partner', 'Online course or bootcamp', 'Other'],
            },
            { name: 'region', label: 'Region', type: 'combobox', hidden: true, placeholder: 'Select one', options: ['Americas', 'Europe', 'Africa', 'Asia', 'Oceania'] },
            { name: 'terms', label: 'I accept the Lattice [usage terms](/terms-of-use)', type: 'check', required: true },
          ],
          submit: 'Create my account',
          success: success.signup,
        },
      },
      stats,
    ],
  },
  '/community/join': {
    sections: [
      {
        type: 'formHeader',
        title: 'Join the community',
        blocks: [
          ['p', 'The Lattice community is where practitioners trade patterns, review each other’s work and help shape the product. Members get access to the forum, local meetups in more than a hundred cities, monthly office hours with the product team and a growing library of talks and guides. Read the [community guidelines](/community) before you post.'],
          ['h3', 'What you get as a member'],
          ['ul', [
            '**Forum access:** ask questions, share what worked and get answers from experienced practitioners.',
            '**Local meetups:** find events near you, or start one with support from our organiser programme.',
            '**Office hours:** monthly open sessions with the people who build Lattice, with time for questions.',
            '**Early previews:** try new features before release and tell the product team what you think.',
            '**Learning library:** recorded talks, workshops and guides from the community and the Lattice team.',
          ]],
          ['p', 'Membership is free. We will never share your details with third parties, and you can leave whenever you like.'],
        ],
        form: {
          fields: [
            { name: 'email', label: 'Email', type: 'email', required: true, help: 'Use the address you would like community emails sent to.', helpAbove: true, autoComplete: 'email' },
            { name: 'firstname', label: 'First name', type: 'text', required: true, half: true, autoComplete: 'given-name' },
            { name: 'lastname', label: 'Last name', type: 'text', required: true, half: true, autoComplete: 'family-name' },
            { name: 'company', label: 'Employer', type: 'text', required: true, half: true, autoComplete: 'organization' },
            { name: 'jobtitle', label: 'Job title', type: 'text', half: true, autoComplete: 'organization-title' },
            {
              name: 'password',
              label: 'Choose a password',
              type: 'password',
              required: true,
              autoComplete: 'new-password',
              help: 'At least twelve characters. You will use this password to sign in to the forum and to register for community events and office hours.',
            },
            { name: 'warehouse', label: 'Main warehouse', type: 'text', half: true },
            { name: 'location', label: 'Location', type: 'text', half: true },
            { name: 'terms', label: 'I accept the [guidelines](/community)', type: 'checkbox', required: true, half: true },
            { name: 'optin', label: 'Send me the monthly digest', type: 'checkbox', half: true },
          ],
          submit: 'Join the community',
          consent,
          success: success.join,
        },
      },
    ],
  },
  '/report-a-problem': {
    sections: [
      {
        type: 'formHeader',
        title: 'Report a problem with this website',
        blocks: [
          ['p', 'Spotted something broken? Let us know.'],
          ['p', 'Use this form for problems with our public website, documentation or community pages. For help with your account, contact support.'],
          ['p', 'We read every report and fix what we can quickly.'],
        ],
        form: {
          fields: [
            { name: 'firstname', label: 'First name', type: 'text', required: true, autoComplete: 'given-name' },
            { name: 'lastname', label: 'Last name', type: 'text', required: true, autoComplete: 'family-name' },
            { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
            { name: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel' },
            { name: 'issue', label: 'Issue', type: 'textarea', placeholder: 'What happened, on which page, and what did you expect?' },
            { name: 'site', label: 'Website', type: 'select', placeholder: 'Choose one', options: ['Main website', 'Documentation', 'Community forum', 'Status page', 'Other'] },
          ],
          submit: 'Submit',
          consent,
          success: success.report,
        },
      },
    ],
  },
}
