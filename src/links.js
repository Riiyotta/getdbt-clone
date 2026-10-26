// Chrome link targets: content.js label -> clone path (see routes.js). Labels are unique across the
// nav, mega-menus and footer, except "Blog" and "Events", which point to the same page everywhere.
// Labels missing here (docs, forum, status, log in, social…) are off-site on the original and stay "#".

const links = {
  // nav
  Pricing: '/pricing',
  'Get started': '/signup',
  'Book a demo': '/contact',
  'Create an account': '/signup',

  // Product menu
  'Why Lattice': '/product/what-is-lattice',
  'Platform tour': '/product/lattice',
  'The modeling lifecycle': '/resources/analytics-lifecycle',
  Build: '/product/develop',
  Validate: '/product/test-and-observe',
  Design: '/product/mesh',
  Explore: '/product/catalog',
  Ship: '/product/deploy',
  Measure: '/product/semantic-layer',
  'Smart state': '/product/state',
  'Guided setup': '/product/assistant',
  Charts: '/product/charts',
  Governance: '/product/governance',
  Security: '/security',
  Integrations: '/product/integrations',
  'See the latest demo': '/resources/webinars/launch-showcase',

  // Solutions menu
  Analytics: '/product/analyst',
  'AI readiness': '/product/ai',
  'Data engineers': '/product/data-modernization',
  Analysts: '/product/embedded-analytics',
  'Platform leads': '/product/data-trust',
  Executives: '/product/cost-optimization',
  Finance: '/industry/financial-services',
  Retail: '/industry/manufacturing',
  Healthcare: '/industry/healthcare',
  Media: '/industry/telecommunications',
  'Public sector': '/industry/energy-utilities',
  Software: '/data-platforms/cobalt',
  'See every use case': '/product/data-modernization',

  // Customers menu
  'Case studies': '/case-studies',
  Reviews: '/resources/on-demand',
  'Data quality': '/case-studies/kestrel',
  Speed: '/case-studies/meridian-partners',
  Cost: '/case-studies/halcyon',
  Scale: '/case-studies/basalt-health',
  Fernway: '/case-studies',
  Orbitly: '/case-studies',
  Kestrel: '/case-studies/kestrel',
  Tidepool: '/case-studies',
  Meridian: '/case-studies/meridian-partners',
  Halcyon: '/case-studies/halcyon',
  'View all customers': '/case-studies',

  // Resources menu
  Courses: '/learn',
  Blog: '/blog',
  Webinars: '/resources/webinars',
  Reports: '/resources/state-of-data-teams',
  Templates: '/resources/whitepaper-control-plane',
  'Getting started': '/learn',
  'Best practices': '/resources/analytics-lifecycle',
  'Release notes': '/blog/summit-announcements',
  Glossary: '/resources',
  Events: '/events',
  'Browse all resources': '/resources',

  // Community menu
  Meetups: '/events',
  'Open source': '/community',
  'Write a guide': '/community',
  Speak: '/summit',
  Champions: '/champions',
  'Code of conduct': '/community',
  'Chat space': '/community/join',
  Newsletter: '/community/join',
  Awards: '/champions',
  'Jobs board': '/about-us/careers',
  'Join the community': '/community/join',

  // mega-menu footer strip
  'Get a working project on your own warehouse in a 30-minute call.': '/contact',

  // footer columns
  Overview: '/product/lattice',
  'What is Lattice?': '/product/what-is-lattice',
  'Lattice for AI workflows': '/product/ai',
  'Customer stories': '/case-studies',
  Connectors: '/product/integrations',
  'Plans and pricing': '/pricing',
  'Supported data platforms': '/data-platforms/cobalt',
  'Engineering blog': '/blog',
  'About us': '/about-us',
  'Belonging at Lattice': '/about-us/belonging',
  Careers: '/about-us/careers',
  Press: '/press',
  'Resource hub': '/resources',
  'Lattice Academy': '/learn',
  Certification: '/certification',
  'Become a contributor': '/community',
  'Contact us': '/contact',
  'Professional services': '/services',
  'Find a partner': '/partner-directory',
  'Join today': '/community/join',

  // footer legal row
  'Accessibility statement': '/legal/ai-principles',
  'Terms of service': '/terms-of-use',
  'Acceptable use': '/modern-slavery-statement',
  'Responsible AI principles': '/legal/ai-principles',
}

export const hrefFor = (label) => links[label] || '#'

// Announcement bar slides, by position in content.announcements.
export const announcementLinks = [
  '/blog/summit-announcements',
  '/resources/webinars/charts-as-code',
  '/resources/state-of-data-teams',
  '/blog/lattice-joins-northwind',
]
