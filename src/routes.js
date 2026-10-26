// Every page in the clone: local path -> layout template (see PAGES.md) and the original page it
// mirrors structurally (`source`, used only by recon/QA to measure layout — never for content).
// Slugs that name real companies or products are swapped for fictional "Lattice" equivalents.
// `title` is the placeholder page name used in nav/footer links and stand-in pages.

export const routes = [
  // T1 product feature page
  { path: '/product/develop', template: 'T1', title: 'Develop', source: '/product/develop' },
  { path: '/product/test-and-observe', template: 'T1', title: 'Test and observe', source: '/product/test-and-observe' },
  { path: '/product/mesh', template: 'T1', title: 'Mesh', source: '/product/dbt-mesh' },
  { path: '/product/catalog', template: 'T1', title: 'Catalog', source: '/product/dbt-catalog' },
  { path: '/product/deploy', template: 'T1', title: 'Deploy', source: '/product/deploy' },
  { path: '/product/semantic-layer', template: 'T1', title: 'Semantic layer', source: '/product/semantic-layer' },

  // T2 solution page
  { path: '/product/ai', template: 'T2', title: 'AI', source: '/product/ai' },
  { path: '/product/embedded-analytics', template: 'T2', title: 'Embedded analytics', source: '/product/embedded-analytics-use-cases' },
  { path: '/product/data-modernization', template: 'T2', title: 'Data modernization', source: '/product/data-modernization' },
  { path: '/product/data-trust', template: 'T2', title: 'Data trust', source: '/product/build-trust-in-data-and-data-teams' },
  { path: '/product/cost-optimization', template: 'T2', title: 'Cost optimization', source: '/product/cost-optimization' },

  // T3 data-platform page (fictional platforms)
  { path: '/data-platforms/northwind', template: 'T3', title: 'Northwind', source: '/data-platforms/redshift' },
  { path: '/data-platforms/quarry', template: 'T3', title: 'Quarry', source: '/data-platforms/bigquery' },
  { path: '/data-platforms/helixa', template: 'T3', title: 'Helixa', source: '/data-platforms/databricks' },
  { path: '/data-platforms/stratus', template: 'T3', title: 'Stratus', source: '/data-platforms/microsoft-fabric' },
  { path: '/data-platforms/driftway', template: 'T3', title: 'Driftway', source: '/data-platforms/fivetran' },
  { path: '/data-platforms/cobalt', template: 'T3', title: 'Cobalt DB', source: '/data-platforms/snowflake' },

  // T4 industry page
  { path: '/industry/financial-services', template: 'T4', title: 'Financial services', source: '/industry/financial-services' },
  { path: '/industry/healthcare', template: 'T4', title: 'Healthcare', source: '/industry/healthcare' },
  { path: '/industry/manufacturing', template: 'T4', title: 'Manufacturing', source: '/industry/manufacturing' },
  { path: '/industry/energy-utilities', template: 'T4', title: 'Energy and utilities', source: '/industry/energy-utilities' },
  { path: '/industry/telecommunications', template: 'T4', title: 'Telecommunications', source: '/industry/telecommunications' },

  // T5 case-study detail (fictional customers from the marquee)
  { path: '/case-studies/kestrel', template: 'T5', title: 'Kestrel', source: '/case-studies/mcdonalds-nordics' },
  { path: '/case-studies/meridian-partners', template: 'T5', title: 'Meridian Partners', source: '/case-studies/bilt-rewards' },
  { path: '/case-studies/halcyon', template: 'T5', title: 'Halcyon', source: '/case-studies/nasdaq' },
  { path: '/case-studies/basalt-health', template: 'T5', title: 'Basalt Health', source: '/case-studies/enpal' },

  // T6 hub listing with category tabs
  { path: '/blog', template: 'T6', title: 'Blog', source: '/blog' },
  { path: '/resources/webinars', template: 'T6', title: 'Webinars', source: '/resources/webinars' },
  { path: '/resources', template: 'T6', title: 'Resources', source: '/resources' },

  // T7 filterable card grid
  { path: '/case-studies', template: 'T7', title: 'Case studies', source: '/case-studies' },
  { path: '/resources/on-demand', template: 'T7', title: 'On-demand sessions', source: '/resources/coalesce-on-demand' },
  { path: '/events', template: 'T7', title: 'Events', source: '/events' },
  { path: '/press', template: 'T7', title: 'Press', source: '/press' },

  // T8 article with sticky right rail
  { path: '/resources/analytics-lifecycle', template: 'T8', title: 'The analytics lifecycle', source: '/resources/the-analytics-development-lifecycle' },
  { path: '/resources/state-of-data-teams', template: 'T8', title: 'State of data teams', source: '/resources/state-of-analytics-engineering-2026' },
  { path: '/blog/summit-announcements', template: 'T8', title: 'Summit announcements', source: '/blog/dbt-summit-2026-product-announcements' },
  { path: '/blog/lattice-joins-northwind', template: 'T8', title: 'Lattice joins Northwind', source: '/blog/fivetran-dbt-labs-complete-merger-to-create-the-data-infrastructure-for-trusted-ai-agents' },

  // T9 webinar / asset landing
  { path: '/resources/webinars/launch-showcase', template: 'T9', title: 'Launch showcase', source: '/resources/webinars/2025-dbt-cloud-launch-showcase' },
  { path: '/resources/whitepaper-control-plane', template: 'T9', title: 'Control plane whitepaper', source: '/resources/whitepaper-the-control-plane-for-data-collaboration-at-scale' },
  { path: '/resources/webinars/charts-as-code', template: 'T9', title: 'Charts as code', source: '/resources/webinars/introducing-dbt-charts-dashboards-as-code' },

  // T10 form page (static forms — no submission)
  { path: '/contact', template: 'T10', title: 'Contact', source: '/contact' },
  { path: '/signup', template: 'T10', title: 'Sign up', source: '/signup' },
  { path: '/community/join', template: 'T10', title: 'Join the community', source: '/community/join-the-community' },
  { path: '/report-a-problem', template: 'T10', title: 'Report a problem', source: '/report-a-problem' },

  // T11 legal / policy text (layout only, placeholder text)
  { path: '/modern-slavery-statement', template: 'T11', title: 'Supply chain statement', source: '/modern-slavery-statement' },
  { path: '/terms-of-use', template: 'T11', title: 'Terms of use', source: '/terms-of-use' },
  { path: '/legal/ai-principles', template: 'T11', title: 'AI principles', source: '/legal/ai-principles' },

  // T12 company / program page
  { path: '/security', template: 'T12', title: 'Security', source: '/security' },
  { path: '/certification', template: 'T12', title: 'Certification', source: '/dbt-certification' },
  { path: '/learn', template: 'T12', title: 'Learn', source: '/dbt-learn' },
  { path: '/community', template: 'T12', title: 'Community', source: '/community' },
  { path: '/about-us', template: 'T12', title: 'About us', source: '/about-us' },
  { path: '/about-us/values', template: 'T12', title: 'Values', source: '/about-us/values' },
  { path: '/about-us/careers', template: 'T12', title: 'Careers', source: '/about-us/careers' },
  { path: '/about-us/belonging', template: 'T12', title: 'Belonging', source: '/about-us/dei' },
  { path: '/partners', template: 'T12', title: 'Partners', source: '/partners' },
  { path: '/services', template: 'T12', title: 'Services', source: '/services' },

  // T13 bespoke product landing
  { path: '/product/what-is-lattice', template: 'T13', title: 'What is Lattice', source: '/product/what-is-dbt' },
  { path: '/product/lattice', template: 'T13', title: 'Lattice platform', source: '/product/dbt' },
  { path: '/product/state', template: 'T13', title: 'State', source: '/product/dbt-state' },
  { path: '/product/assistant', template: 'T13', title: 'Assistant', source: '/product/dbt-wizard' },
  { path: '/product/charts', template: 'T13', title: 'Charts', source: '/product/dbtcharts' },
  { path: '/product/governance', template: 'T13', title: 'Governance', source: '/product/governance' },
  { path: '/product/integrations', template: 'T13', title: 'Integrations', source: '/product/integrations' },
  { path: '/product/analyst', template: 'T13', title: 'Analyst', source: '/product/analyst' },
  { path: '/product/self-hosted-vs-platform', template: 'T13', title: 'Self-hosted vs platform', source: '/product/self-hosting-dbt-vs-dbt-platform' },

  // one-offs
  { path: '/pricing', template: 'T14', title: 'Pricing', source: '/pricing' },
  { path: '/champions', template: 'T15', title: 'Champions', source: '/dbt-champions' },
  { path: '/summit', template: 'T16', title: 'Summit', source: '/dbt-summit' },
  { path: '/partner-directory', template: 'T17', title: 'Partner directory', source: '/partner-directory' },
]

// The original's internal redirects, mirrored with clone paths.
export const redirects = [
  { from: '/product/explorer', to: '/product/catalog' },
  { from: '/lattice-labs/about-us', to: '/about-us' },
  { from: '/lattice-labs/belonging', to: '/about-us/belonging' },
  { from: '/lattice-labs/open-roles', to: '/about-us/careers' },
  { from: '/lattice-labs/services', to: '/services' },
]
