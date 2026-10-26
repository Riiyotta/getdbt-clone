Source: https://www.getdbt.com/

# Page inventory: getdbt.com site chrome

Measured 2026-10-26 with Playwright at 1440x900. Links were collected from the header nav, all 5 mega-menu popovers (each opened by clicking its Headless UI trigger and read while mounted), the account popover, the announcement-bar carousel (all 4 slides), and the footer. Each internal URL was fetched for status and redirect, then classified from its SSR `<main>` section sequence. Listing pages, form pages, gated pages and unusual pages were also loaded live, since their filters, forms and widgets are mounted on the client.

- **77 internal URLs collected.** 70 return 200 directly. 6 redirect: 5 go to another getdbt.com page and 1 goes off-site. 1 extra row covers the internal redirect target `/about-us/dei`.
- **71 unique rendered pages**, including the homepage (already cloned). That leaves **70 pages to build**, grouped into **17 templates** (T1–T17).
- Nothing returned 404 and nothing is behind an auth wall. Problems found: `/cloud/privacy-policy` redirects off-site; `/partner-directory` is a third-party widget with no global nav or footer; `/dbt-summit` uses its own sub-nav and font.
- Global chrome, checked live on every page loaded: announcement bar, sticky nav with mega-menus (homepage spec 2.1–2.2), and footer (2.16). The exceptions are T16 `/dbt-summit` (event sub-nav instead of the global nav; footer kept) and T17 `/partner-directory` (no global nav and no footer).
- The section shell is the same on all pages: `py-12 md:py-16`, white, `z-5`, as in the homepage spec.

## 1. URL table

Status: ok = 200. redirect = 308 (target shown). blocked = cannot be cloned as a getdbt.com page.

| # | URL | template | status | notes / source |
|---|---|---|---|---|
| 1 | / | T0 (done) | ok | homepage, cloned |
| 2 | /pricing | T14 | ok | nav link |
| 3 | /contact | T10 | ok | nav "Book a demo", mega-menu footers |
| 4 | /signup | T10 | ok | nav "Get started", account popover |
| 5 | /product/what-is-dbt | T13 | ok | Product menu, footer |
| 6 | /product/dbt | T13 | ok | Product menu, footer |
| 7 | /resources/the-analytics-development-lifecycle | T8 | ok | Product menu; long-form guide with TOC rail |
| 8 | /product/develop | T1 | ok | Product menu |
| 9 | /product/test-and-observe | T1 | ok | Product menu |
| 10 | /product/dbt-mesh | T1 | ok | Product menu |
| 11 | /product/dbt-explorer | — | redirect | 308 to /product/dbt-catalog |
| 12 | /product/dbt-catalog | T1 | ok | redirect target |
| 13 | /product/deploy | T1 | ok | Product menu |
| 14 | /product/semantic-layer | T1 | ok | Product menu |
| 15 | /product/dbt-state | T13 | ok | Product menu |
| 16 | /product/dbt-wizard | T13 | ok | Product menu |
| 17 | /product/dbtcharts | T13 | ok | Product menu |
| 18 | /product/governance | T13 | ok | Product menu |
| 19 | /security | T12 | ok | Product menu |
| 20 | /product/integrations | T13 | ok | Product menu, footer; logo directory by category |
| 21 | /resources/webinars/2025-dbt-cloud-launch-showcase | T9 | ok | Product menu featured link; HubSpot form |
| 22 | /product/ai | T2 | ok | Solutions menu |
| 23 | /product/embedded-analytics-use-cases | T2 | ok | Solutions menu |
| 24 | /product/data-modernization | T2 | ok | Solutions menu |
| 25 | /product/build-trust-in-data-and-data-teams | T2 | ok | Solutions menu |
| 26 | /product/cost-optimization | T2 | ok | Solutions menu |
| 27 | /product/analyst | T13 | ok | Solutions menu; 16 sections, bespoke |
| 28 | /data-platforms/redshift | T3 | ok | Solutions menu |
| 29 | /data-platforms/bigquery | T3 | ok | Solutions menu; adds stats band |
| 30 | /data-platforms/databricks | T3 | ok | Solutions menu |
| 31 | /data-platforms/microsoft-fabric | T3 | ok | Solutions menu |
| 32 | /data-platforms/fivetran | T3 | ok | Solutions menu; no customer-tabs section |
| 33 | /data-platforms/snowflake | T3 | ok | Solutions menu |
| 34 | /industry/financial-services | T4 | ok | Solutions menu |
| 35 | /industry/healthcare | T4 | ok | Solutions menu |
| 36 | /industry/manufacturing | T4 | ok | Solutions menu |
| 37 | /industry/energy-utilities | T4 | ok | Solutions menu |
| 38 | /industry/telecommunications | T4 | ok | Solutions menu |
| 39 | /case-studies | T7 | ok | Solutions and Customers menus, footer |
| 40 | /case-studies/mcdonalds-nordics | T5 | ok | Customers menu |
| 41 | /case-studies/bilt-rewards | T5 | ok | Customers menu |
| 42 | /case-studies/nasdaq | T5 | ok | Customers menu |
| 43 | /case-studies/enpal | T5 | ok | Customers menu |
| 44 | /resources/coalesce-on-demand | T7 | ok | Customers menu |
| 45 | /blog | T6 | ok | Resources menu, footer |
| 46 | /resources/webinars | T6 | ok | Resources menu |
| 47 | /resources | T6 | ok | Resources menu, footer |
| 48 | /events | T7 | ok | Resources and Community menus |
| 49 | /dbt-certification | T12 | ok | Resources menu, footer |
| 50 | /dbt-learn | T12 | ok | Resources menu, footer |
| 51 | /resources/whitepaper-the-control-plane-for-data-collaboration-at-scale | T9 | ok | Resources menu; ungated, links to a HubSpot-hosted PDF |
| 52 | /resources/state-of-analytics-engineering-2026 | T8 | ok | Resources menu footer strip; long-form report, TOC rail, HubSpot form |
| 53 | /community | T12 | ok | Community menu; `#get-involved` and `#contribute` are anchors on this page |
| 54 | /dbt-summit | T16 | ok | Community menu; event microsite, own sub-nav, font `bugrino` |
| 55 | /dbt-champions | T15 | ok | Community menu; dark theme, font `polymath` |
| 56 | /community/join-the-community | T10 | ok | Community menu, footer; HubSpot form |
| 57 | /about-us | T12 | ok | Community menu |
| 58 | /about-us/values | T12 | ok | Community menu |
| 59 | /about-us/careers | T12 | ok | Community menu; job list links to fivetran.com |
| 60 | /partners | T12 | ok | Community menu |
| 61 | /partner-directory | T17 | blocked (3rd-party) | Community menu, footer; Impartner widget, no global nav or footer |
| 62 | /services | T12 | ok | Community menu |
| 63 | /product/self-hosting-dbt-vs-dbt-platform | T13 | ok | footer; comparison tables |
| 64 | /dbt-labs/about-us | — | redirect | footer; 308 to /about-us |
| 65 | /dbt-labs/dei | — | redirect | footer; 308 to /about-us/dei |
| 66 | /about-us/dei | T12 | ok | redirect target |
| 67 | /dbt-labs/open-roles | — | redirect | footer; 308 to /about-us/careers |
| 68 | /press | T7 | ok | footer |
| 69 | /dbt-labs/services | — | redirect | footer; 308 to /services |
| 70 | /cloud/privacy-policy | — | redirect (off-site) | footer and HubSpot form fine print; 308 to https://www.fivetran.com/legal/privacy. Keep as an external link. |
| 71 | /modern-slavery-statement | T11 | ok | footer |
| 72 | /report-a-problem | T10 | ok | footer; HubSpot form |
| 73 | /security | T12 | ok | footer (duplicate of #19) |
| 74 | /terms-of-use | T11 | ok | footer; no H1 header, starts with an H2 |
| 75 | /legal/ai-principles | T11 | ok | footer |
| 76 | /blog/dbt-summit-2026-product-announcements | T8 | ok | announcement bar slide |
| 77 | /blog/fivetran-dbt-labs-complete-merger-to-create-the-data-infrastructure-for-trusted-ai-agents | T8 | ok | announcement bar slide |
| 78 | /resources/webinars/introducing-dbt-charts-dashboards-as-code | T9 | ok | announcement bar slide; HubSpot form |

The table has 78 rows. Row 73 repeats /security (row 19), which leaves 77 unique URLs. Clone routes for the 5 internal redirects should redirect to their targets. Ignored: `/blog/feed.xml`.

## 2. Homepage components (IDs used below; see CLONE_SPEC.md)

| id | component | spec § |
|---|---|---|
| H-ann | announcement carousel | 2.1 |
| H-nav | sticky nav and mega-menus | 2.2 |
| H-hero | `<header>` hero shell with gradient side fades (`before:/after:bg-linear-to-*`), centered H1, sub, CTA | 2.3 |
| H-marq | logo marquee (`min-w-max` track) | 2.4 |
| H-dark | dark band `bg-inverse-primary-default` (#030711) | 2.5 |
| H-stmt | centered statement line | 2.6 |
| H-panel | `gradient-container` rounded panel (gradient-NN) | 2.7–2.9, 2.13 |
| H-cards3 | three-card grid (`relative overflow-hidden bg-white`, 3×h3, 6 links) | 2.11 |
| H-split | text + media split row (`grid-container`) | 2.12 |
| H-testi | Splide testimonial slider | 2.14 |
| H-cta | `circle-background-a` CTA band. Long form has stats (homepage); short form is heading + 1–2 buttons | 2.15 |
| H-foot | footer | 2.16 |
| H-btn | `.button` primary, secondary, tertiary, text | 0.7 |

**New shared components that are not on the homepage.** Build these once, because several templates use them:
- **N-tabs-dark**: dark (`bg-inverse-primary-default`) tabbed feature showcase with `role=tablist` and one media slot. Edges reuse the H-hero gradient side-fade pseudo-elements with `terminal-black-950`. Used in T1, T2, T4, T13, T12 (dbt-learn).
- **N-cust-tabs**: customer-story tabs. Heading plus a tablist of customer logos, then 1 card (h3, 2 images, 2 links). Section titles look like "Proven by / Trusted by …". Used in T1, T2, T3, T13.
- **N-stats**: dark "Trusted globally. Proven at scale." band with 4 stat h3s and a bottom background image (`bg-bottom`). Used in T2, T4, T10, T13, and on bigquery (T3).
- **N-cta-card**: `gradient-container gradient-container-rounded gradient-05` card with heading and 1–2 buttons. This is the H-panel styling at CTA scale. Used in T1 and T3.
- **N-img-band**: full-bleed `bg-cover bg-center md:py-[120px]` image with a `bg-blur` text card. Used in T4, dbt-state, analyst and cost-optimization.
- **N-crumb**: breadcrumb row ("Section / Category / Title") at the top of the header. Used in T8 and T9.
- **N-listing**: listing header (plain H1), pill category nav (`nav.bg-blur`, links to `/…/category/*`), search input, card grid, and a "Load more"/"View more" button (client-side). Used in T6 and T7.
- **N-rail**: article body column 832px plus a sticky right rail (`sticky top-8`, x=1032, w=312 at 1440). Used in T8.
- **N-hsform**: HubSpot form embed (`form.hs-form-private`, id `hsForm_<guid>`). It loads on the client and some versions include reCAPTCHA. Used in T9, T10 and T8 (SoAE).
- **N-faq**: FAQ accordion (h3 questions). Used in pricing, dbt-certification and dbt-state.

## 3. Templates

### T1: Product feature page (6)
- Members: /product/develop, /product/test-and-observe, /product/dbt-mesh, /product/dbt-catalog, /product/deploy, /product/semantic-layer
- **Spec first:** /product/develop
- Sections: H-hero (H1, 1 CTA, 1 image) → intro split (H-split: heading, text, link, image) → 3 feature cards (bg-white or bg-no-repeat bottom image, 3×h3) → N-tabs-dark ("Features …") → N-cta-card gradient-05 (2 buttons). dbt-mesh uses H-cta short instead of N-cta-card here. → N-cust-tabs → H-cards3 ("Learn more/Dig into …" resource cards) → H-cta short (1 image, 3 links).
- Reuses: H-ann, H-nav, H-hero, H-split, H-cards3, H-panel (as N-cta-card), H-cta, H-foot, H-btn.

### T2: Solution / use-case page (5)
- Members: /product/ai, /product/embedded-analytics-use-cases, /product/data-modernization, /product/build-trust-in-data-and-data-teams, /product/cost-optimization
- **Spec first:** /product/data-modernization
- Sections: H-hero → problem statement (centered text, sometimes with a 3–4 image row) → 4-card grid (4×h3) → light tabbed media section (tablist, 1 image) → N-cust-tabs → H-cta long ("Join the largest community…", the homepage community band) → N-stats → H-cards3 ("Dig deeper …") → H-cta short ("Start building with dbt."). ai and cost-optimization add 1–2 extra split sections or N-img-band.
- Reuses: H-hero, H-cards3, H-cta (both forms), H-split, plus chrome.

### T3: Data-platform partner page (6)
- Members: /data-platforms/snowflake, /data-platforms/bigquery, /data-platforms/databricks, /data-platforms/redshift, /data-platforms/microsoft-fabric, /data-platforms/fivetran
- **Spec first:** /data-platforms/snowflake
- Sections: H-hero (1 image, 2 CTAs) → H-cards3 (6 images, 3×h3) → centered statement or integration block (H-stmt-like; fivetran has a video-style block) → N-cta-card gradient-05 → N-cust-tabs (missing on fivetran) → H-cards3 "Go further with dbt + X" → H-cta short (1 image, 3 links). bigquery adds N-stats before the CTA.
- Reuses: H-hero, H-cards3, H-stmt, H-panel, H-cta, chrome.

### T4: Industry page (5)
- Members: /industry/financial-services, /industry/healthcare, /industry/manufacturing, /industry/energy-utilities, /industry/telecommunications
- **Spec first:** /industry/financial-services
- Sections: H-hero (`lg:pb-0`, 1 image, 1 CTA) → "Common use cases" 4-card grid → N-img-band → "Unlocking new data use cases" 3-col (3×h3, `bottom-frequency` decoration) → N-tabs-dark → logo/tech grid (`grid grid-cols-12`, 7–12 images; contains a Splide) → customer-story cards (2–3) → N-stats → H-cta long.
- Reuses: H-hero, H-testi (Splide), H-cta, chrome.

### T5: Case-study detail (4 linked from chrome; about 13 or more total on the site)
- Members: /case-studies/nasdaq, /case-studies/bilt-rewards, /case-studies/mcdonalds-nordics, /case-studies/enpal (others such as /case-studies/insider follow the same pattern)
- **Spec first:** /case-studies/nasdaq
- Sections (heights at 1440): hero header `lg:py-30` with H1, logo and a stats row (594px) → body section (4796px): left column with Industry and other meta (h3 labels), plus prose with h2/h3 and inline images and quotes → "Read more customer stories" H-cards3 (3 cards) → H-cta short "See dbt in action today." No sticky elements were measured.
- Reuses: H-hero shell, H-cards3, H-cta, chrome.

### T6: Content hub listing with category nav (3)
- Members: /blog, /resources, /resources/webinars
- **Spec first:** /blog
- Sections: header (plain H1, no CTA) → N-listing pill nav (`nav.bg-blur`). Pills: blog 8 (All, Company, Product, Insights, Learn, Community, Partnerships, Press); resources 4 (All, eBook, Guide, Data Sheet); webinars 4 (All, Upcoming, Live Demo, On-Demand). Search input ("Search articles..." or "Search"). → one large section with a featured item and then the card grid (blog about 30 posts, resources 15, webinars 18 cards). resources also has an inline "Install VS Code extension" promo card. → H-cta short ("Deliver quality analytics, faster" or the community band on blog).
- Pagination: none on the index pages. Category pages (`/blog/category/<slug>`, `/resources/category/<slug>`, `/resources/webinars/category/<slug>`) use the same layout: "Latest posts" plus a "More from X" grid, 12 cards, and a client-side **"Load more"** button. There are no `?page=` URLs.
- Detail pages: blog posts are T8. Resource details are T8 for long-form (e.g. /resources/enterprise-ai-data-maturity-model) or T9 for asset landings. Webinar details are T9. Author pages `/authors/<slug>` use a header plus card grid (not in chrome).
- Reuses: H-nav, H-cta, H-foot. The cards are new (image, category and read-time eyebrow, title, author and date).

### T7: Filterable card grid listing (4)
- Members: /case-studies, /events, /resources/coalesce-on-demand, /press
- **Spec first:** /case-studies
- Sections: header (H1) → toolbar → card grid → "View more" button → H-cta short.
  - case-studies: search input ("Search case studies"), a **Filters** button that opens a client-side filter panel, 12 cards, and "View more case studies". Detail pages are T5.
  - events: **multi-select dropdown** ("Multi Select Dropdown" plus a hidden input) and search, 14 cards. Details are `/events/<slug>` (gated landing with HubSpot form, like T9; e.g. /events/dbt-hol-anz-tour) or `/events/roadshow/<slug>` (marketing page). Some cards link to meetup.com.
  - coalesce-on-demand: multi-select and search, 21 cards, "View more". Details are `/resources/coalesce-on-demand/<slug>` (header plus a video section; e.g. /resources/coalesce-on-demand/coalesce-2025-keynote-rewrite).
  - press: no filters. Two grids, "In the media" (`bg-navy-0`, 21 cards, external article links) and "Press releases" (21 cards linking to /blog posts, i.e. T8), each with its own "View more". Ends with a "Media Contact" text block and no CTA band.
- Reuses: H-cta, H-btn, chrome; card component shared with T6.

### T8: Article / long-form with sticky right rail (4)
- Members: /blog/dbt-summit-2026-product-announcements, /blog/fivetran-dbt-labs-complete-merger-…, /resources/the-analytics-development-lifecycle, /resources/state-of-analytics-engineering-2026
- **Spec first:** /blog/dbt-summit-2026-product-announcements
- Blog post sections: N-crumb (Blog / Category / Title) → H1, author and "Last edited on" date → prose (may include tables and images; the merger post embeds a video) with N-rail sticky sidebar (2 share links) → "Latest posts" 3–4 card row → H-cta long (community band). Height 10031 at 1440.
- Guide/report variant (ADLC, SoAE): H-hero shell with N-crumb, author link (/authors/…), a "Download …" button (HubSpot PDF or `#download-report` anchor), and a second CTA. Then the body with 13 h2 and 45 h3, and N-rail holding a **TOC nav** (12 or 8 anchor links, `sticky top-8`). SoAE ends with an N-hsform download form. Then H-cta short. Heights: 19621 (ADLC) and 30277 (SoAE).
- Reuses: H-cta, H-cards3-style cards, H-marq signature appears in blog post markup (not verified as visible), chrome.

### T9: Asset / webinar landing (gated or ungated) (3)
- Members: /resources/webinars/introducing-dbt-charts-dashboards-as-code, /resources/webinars/2025-dbt-cloud-launch-showcase, /resources/whitepaper-the-control-plane-for-data-collaboration-at-scale
- **Spec first:** /resources/webinars/introducing-dbt-charts-dashboards-as-code
- Sections: one header containing N-crumb, eyebrow (category), H1, a 2-column body (copy with h3 subsections on the left; N-hsform with 8–9 fields on the right) and "Privacy Policy" fine print. Height 2295. The launch-showcase variant adds a logo strip section ("trusted by", 5 images) and a split section, with an anchor CTA `#register`. The whitepaper variant has no form; a primary button links to a HubSpot-hosted PDF.
- Reuses: H-btn, chrome. No CTA band.

### T10: Form page (4)
- Members: /contact, /signup, /report-a-problem, /community/join-the-community
- **Spec first:** /contact
- Sections:
  - contact: 2-column header `grid-container` (copy, 9 logo images, N-hsform with fields firstname, lastname, email, company, job select, phone, message, reCAPTCHA Enterprise) → H-cards3-like "Create a dbt account" 3 cards → N-stats.
  - signup: header with a custom React form (`form#signup`: email, first_name, last_name, company_name, password, confirm_password, 2 Headless "Please select" listboxes, tos checkbox, reCAPTCHA v2) → N-stats.
  - report-a-problem and join-the-community: a single header with H1, intro and N-hsform (7 and 12 fields). Heights 1874 and 1853.
- Reuses: H-hero shell, H-cards3, chrome. **Form submission cannot be cloned** (HubSpot, dbt signup API and reCAPTCHA keys); build static forms.

### T11: Legal / policy prose (3)
- Members: /modern-slavery-statement, /legal/ai-principles, /terms-of-use
- **Spec first:** /modern-slavery-statement
- Sections: header (H1 only) → one `section.bg-white` with prose in a centered 832px column (x=304 at 1440) and numbered h2/h3 headings. terms-of-use has **no header**: the prose section starts with an H2, and the page is 16206px tall. No CTA band.
- Reuses: chrome only.

### T12: Company / program page (stacked generic sections) (10)
- Members: /about-us, /about-us/values, /about-us/dei, /about-us/careers, /services, /partners, /security, /dbt-certification, /dbt-learn, /community
- **Spec first:** /about-us
- Common sequence: H-hero (H1, 1–2 CTAs, image) → content sections built from the shared library → closing H-cta (short or long). Per page:
  - about-us: text block → leadership grid (6 h3, linked) → board grid (5 h3) → "Learn more about dbt Labs" H-cards3 (bg-no-repeat) → H-cta.
  - values: 13-item values grid → dark 10-item leadership-principles grid (H-dark) → H-cards3 → H-cta.
  - dei: 3 alternating H-split rows → "In the media" 4 cards → H-cta.
  - careers: H-dark news band → "Why dbt Labs" 6 cards → open-roles list (department pill buttons plus a multi-select, links to fivetran.com Greenhouse jobs). Page is 22566px tall and has no CTA band.
  - services: 3-card grid → 2 H-split rows → H-cta "Ready to get started?" with no buttons.
  - partners: intro with 3 images → 2 H-split rows (Technology / Consulting partners). No CTA band.
  - security: 2 H-split rows → `bg-navy-0` compliance grid (9 badges) → 11-item highlights grid → H-cta.
  - dbt-certification: `bg-neutral-primary-default` 3 certification cards → 2 H-split → N-faq (18) → H-cta.
  - dbt-learn: 4-card grid → H-dark 3 courses → light tabs → H-cards3 → H-cta with 3 images.
  - community: 4-image intro → H-dark "what's new" (8 images) → H-cta → photo tabs (IRL) → H-dark contribute (3 cards) → 6-card "place for you" grid → H-cta.
- Reuses: H-hero, H-split, H-cards3, H-dark, H-cta, chrome.

### T13: Product landing, bespoke composition (9)
- Members: /product/what-is-dbt, /product/dbt, /product/self-hosting-dbt-vs-dbt-platform, /product/dbt-state, /product/dbt-wizard, /product/dbtcharts, /product/analyst, /product/governance, /product/integrations
- **Spec first:** /product/what-is-dbt
- These pages share T1/T2 components in different orders, so no single fixed sequence applies. Representative sequence (what-is-dbt): H-hero (2 CTAs, no image) → 3-card grid → N-tabs-dark → 2 H-split rows → N-cust-tabs → logo row "Trusted by top-tier data teams" (6 images) → H-cards3 → "across the data stack" integrations strip (6 images, homepage §2.10-like) → H-cta long.
- Notable extras:
  - self-hosting: 6 comparison `<table>` sections.
  - dbt-state: N-img-band, N-faq, and a `bg-terminal-black-50` band.
  - dbt-wizard: 4 alternating split demos.
  - analyst: 16 sections including N-img-band and a Splide.
  - integrations: 8 logo-card category grids (2–20 logos each) → N-stats → H-cards3 → H-cta.
  - governance: 4 alternating H-split rows.
  - dbt: 13 sections including N-tabs-dark with 12 cards.
- Reuses: everything in the T1 and T2 component set, plus H-testi (Splide) on dbt, dbt-state, dbt-wizard, analyst and self-hosting.

### T14: Pricing (1, unique)
- /pricing. Sections: pricing header with 4 plan cards (4×h3, 19 images/icons; the page has no separate `<header>`; the first section holds the H1) → `bg-neutral-primary-default` add-ons (2 cards) → "Compare plan features" **feature-comparison `<table>`** (333 icon images, collapsible groups) → N-faq "dbt FAQs" (5) → N-faq "Billing and security FAQs" (7). It has a Splide and no CTA band.
- Reuses: H-btn, H-testi (Splide), chrome.

### T15: dbt Champions (1, unique dark theme)
- /dbt-champions. Global nav and footer are present. The heading font is `polymath`. Section backgrounds alternate between #030711 (`bg-terminal-black-950`) and white: dark hero (949px) → dark about → champions grid (9 images) → "What champions do" 5 cards → dark quote slider (Splide, `blockquote`) → stories grid (26 images) → dark support 4 cards → dark "Become a Champion".
- Reuses: H-nav, H-foot, H-testi (Splide).

### T16: dbt Summit event microsite (1, unique)
- /dbt-summit. **No global mega-menu nav.** It has its own transparent sub-nav (dbt Summit, Agenda, Speakers, Experience, dbt World Tour, Join the waitlist). The announcement bar and footer are present. The heading font is `bugrino`. Sections: hero → 28-image gallery → recap → "New and now" 4 cards → sponsors (13 logos) → media → 2 black (`#000`) closing sections.
- Sub-pages not linked from chrome: /dbt-summit/agenda, /dbt-summit/speakers, /dbt-summit/experience, /dbt-summit/2027-waitlist.
- Reuses: H-foot only.

### T17: Partner directory (1, third-party widget)
- /partner-directory. **No global nav or footer.** It has a minimal white `nav.py-4` (logo plus "Home"). The body is an **Impartner PRM locator** (`prod.impartner.live/prm/js/locator.js?pid=748`) with a hash router (`#/`, details at `#/<partnerId>`): a checkbox filter sidebar (Partner Type, Tier, Regions; 7 checkboxes, "Apply filters"), a keyword search, Previous/1/2/3/Next pagination, and partner cards. Page height 1639.
- The widget can be measured but not reproduced from getdbt.com code. Clone it as a static mock or link out. Partner detail views are widget-internal hash routes, not real URLs.

## 4. Representative detail URLs (one per listing)

| listing | detail template | representative detail URL |
|---|---|---|
| /blog (and categories) | T8 | /blog/dbt-summit-2026-product-announcements |
| /case-studies | T5 | /case-studies/nasdaq |
| /resources | T8 (long-form) or T9 (asset) | /resources/enterprise-ai-data-maturity-model (T8, HubSpot gated) |
| /resources/webinars | T9 | /resources/webinars/introducing-dbt-charts-dashboards-as-code |
| /resources/coalesce-on-demand | header + video (new, small) | /resources/coalesce-on-demand/coalesce-2025-keynote-rewrite |
| /events | gated landing (about T9) / roadshow marketing (about T12) | /events/dbt-hol-anz-tour ; /events/roadshow/dbt-world-tour |
| /press | releases go to T8; media items are external | — |
| /partner-directory | widget hash route | #/<id> (not a real URL) |
| /about-us/careers | external (fivetran.com Greenhouse) | — |

## 5. External links (keep as external `<a>` in the clone)

Header / mega-menus / account popover:
- https://login.dbt.com/
- https://learn.getdbt.com/
- https://discourse.getdbt.com/
- https://docs.getdbt.com/
- https://docs.getdbt.com/blog
- https://docs.getdbt.com/docs/get-started-dbt
- https://docs.getdbt.com/docs/introduction
- https://docs.getdbt.com/docs/about-dbt-extension
- https://docs.getdbt.com/docs/install-dbt-extension

Announcement bar:
- https://docs.google.com/forms/d/e/1FAIpQLScqDOsEJFKOvlpC8-XYHkKxq6nXV_gXhrGy1F_HAVQJCd_KBA/viewform (survey slide)

Footer:
- https://docs.getdbt.com/tutorial/setting-up
- https://docs.getdbt.com/docs/supported-data-platforms
- https://docs.getdbt.com/community/contribute
- https://hub.getdbt.com/
- https://docs.getdbt.com/community/forum
- https://docs.getdbt.com/docs/dbt-cloud/cloud-dbt-cloud-support
- https://status.getdbt.com/
- https://roundup.getdbt.com/
- https://github.com/dbt-labs/dbt-core
- https://www.linkedin.com/company/dbtlabs/mycompany/
- https://www.youtube.com/channel/UCVpBwKK-ecMEV75y1dYLE5w
- https://www.instagram.com/dbt_labs/
- https://x.com/dbt_labs
- https://bsky.app/profile/getdbt.com
- https://www.fivetran.com/legal/privacy (target of /cloud/privacy-policy)
- https://www.onetrust.com/solutions/consent-and-preferences/ (cookie banner)
- Ignored: https://www.getdbt.com/blog/feed.xml

## 6. Blocked / caveats
- /cloud/privacy-policy: 308 off-site to fivetran.com. Link out; do not clone.
- /partner-directory: third-party Impartner widget with no site chrome; see T17.
- All forms (HubSpot `hsForm_*`, `/signup` custom form, reCAPTCHA) mount on the client and submit to third parties. Clone the visuals only.
- Careers job links, some event cards (meetup.com) and all press "In the media" cards point off-site.
- Cards on listing pages are partly client-rendered (filters, "Load more"/"View more"). Card counts above were taken after a full scroll at 1440.

## Status update (design-repo refresh)

This file is the original recon inventory and is kept as written (appended note only, so line citations stay valid). The clone has since built every template: all 18 templates (T0-T17) and all 71 routes are implemented and contracted in `design-repo/`, and `ia/` reflects that. Where a status above says "T0 (done)" or counts "pages to build", read it as the state at recon time.
