# Lattice clone: information architecture

Source: Clone project /Users/riyaghosh/V3/getdbt (fictional brand Lattice): src/routes.js, src/App.jsx, src/content/pages/*.js, PAGES.md, specs/T1-T4.md, specs/T12-T13.md, CLONE_SPEC.md, design-repo/
Status: **draft: implemented templates measured from src, planned templates from specs and PAGES.md** · production approved: **false**
71 routes · 18 templates · 86 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 3 templates (T12 Company / program [registered, content pending], T13 Product landing [registered, content pending], T1 Product feature [implemented]) account for 25 of 71 routes (35%). The remaining 46 routes span 15 templates.

| template | routes | share |
|---|---:|---:|
| T12 Company / program [registered, content pending] | 10 | 14% |
| T13 Product landing [registered, content pending] | 9 | 13% |
| T1 Product feature [implemented] | 6 | 8% |
| T3 Data platform [implemented] | 6 | 8% |
| T2 Solution [implemented] | 5 | 7% |
| T4 Industry [implemented] | 5 | 7% |
| T5 Case-study detail [planned] | 4 | 6% |
| T7 Filterable card grid [planned] | 4 | 6% |
| T8 Article with sticky rail [planned] | 4 | 6% |
| T10 Form page [planned] | 4 | 6% |
| T6 Content hub listing [planned] | 3 | 4% |
| T9 Asset / webinar landing [planned] | 3 | 4% |
| T11 Legal / policy prose [planned] | 3 | 4% |
| T0 Homepage [implemented] | 1 | 1% |
| T14 Pricing [planned] | 1 | 1% |
| T15 Community champions (dark theme) [planned] | 1 | 1% |
| T16 Event microsite [planned] | 1 | 1% |
| T17 Partner directory [planned] | 1 | 1% |

## Page chrome

**69 routes carry chrome = `full`** — T0 Homepage [implemented], T1 Product feature [implemented], T2 Solution [implemented], T3 Data platform [implemented], T4 Industry [implemented], T5 Case-study detail [planned], T6 Content hub listing [planned], T7 Filterable card grid [planned], T8 Article with sticky rail [planned], T9 Asset / webinar landing [planned], T10 Form page [planned], T11 Legal / policy prose [planned], T12 Company / program [registered, content pending], T13 Product landing [registered, content pending], T14 Pricing [planned], T15 Community champions (dark theme) [planned].

**1 routes carry chrome = `event-subnav`** — T16 Event microsite [planned].

**1 routes carry chrome = `none`** — T17 Partner directory [planned].

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `shell.announcement-bar` | SHELL | 17 | 70 | `src/components/AnnouncementBar.jsx > AnnouncementBar` | Every page except the partner directory: all full-chrome pages plus the event microsite (70 routes). |
| `shell.footer` | SHELL | 17 | 70 | `src/components/Footer.jsx > Footer` | Every page except the partner directory (70 routes). |
| `shell.navbar` | SHELL | 16 | 69 | `src/components/Navbar.jsx > Navbar` | All full-chrome pages (69 routes); replaced by the event sub-nav on the event microsite and by the minimal nav on the partner directory. |
| `shell.mega-menu` | SHELL | 16 | 69 | `src/components/MegaMenu.jsx > MegaMenu` | Mounted with the global navbar on all full-chrome pages (69 routes). |
| `shell.mobile-drawer` | SHELL | 16 | 69 | `src/components/Navbar.jsx (drawer block)` | Mounted with the global navbar on all full-chrome pages (69 routes). |
| `cta.closing-band` | CTA | 9 | 51 | `src/components/sections/CtaBand.jsx > CtaBand` | The default page closer on every marketing, listing, case-study and company template that lists it (51 routes across the templates that list it). |
| `editorial.resource-cards` | EDITORIAL | 8 | 49 | `src/components/sections/Resources.jsx > Resources` | Related-reading row on product feature, solution, data-platform, industry, case-study, article, company and product-landing pages (49 routes across the templates that list it). |
| `features.card-grid` | FEATURES | 8 | 46 | `src/components/sections/Feat.jsx > Feat; homepage: src/components/WhyCards.jsx > WhyCards` | The most reused content block: homepage plus every marketing, form and company template that lists it (46 routes across the templates that list it). |
| `content.media-split` | CONTENT | 7 | 40 | `src/components/sections/Split.jsx > Split; homepage: src/components/DiagramSection.jsx > DiagramSection` | Homepage and most marketing templates, plus asset landings and company pages (40 routes across the templates that list it). |
| `hero.split` | HERO | 4 | 31 | `src/components/sections/HeroSplit.jsx > HeroSplit` | Product feature and data-platform pages, plus most company pages and several product landings (31 routes across the templates that list it). |
| `hero.center` | HERO | 5 | 30 | `src/components/sections/HeroCenter.jsx > HeroCenter; homepage: src/components/Hero.jsx > Hero` | Homepage (text-only), solution and industry pages, and some company and product-landing pages (30 routes across the templates that list it). |
| `social-proof.stats-bento` | SOCIAL_PROOF | 5 | 29 | `src/components/sections/Stats.jsx > Stats` | Solution, industry, form and product-landing pages, plus one data-platform member (29 routes across the templates that list it). |
| `social-proof.customer-tabs` | SOCIAL_PROOF | 4 | 26 | `src/components/sections/CustTabs.jsx > CustTabs` | Product feature, solution, data-platform and product-landing pages (26 routes across the templates that list it; absent on some members). |
| `cta.gradient-card` | CTA | 4 | 26 | `src/components/sections/CtaCard.jsx > CtaCard` | Product feature, data-platform, one solution member and several product landings (26 routes across the templates that list it). |
| `social-proof.quote-band` | SOCIAL_PROOF | 4 | 25 | `src/components/sections/QuoteBand.jsx > QuoteBand` | Product feature (one member), solution (one member), industry and product-landing pages (25 routes across the templates that list it). |
| `features.checklist` | FEATURES | 3 | 24 | `src/components/sections/Checklist.jsx > Checklist` | Solution pages, plus company and product-landing pages that use the split variant (24 routes across the templates that list it). |
| `content.statement` | CONTENT | 4 | 21 | `src/components/sections/Statement.jsx > Statement; homepage: src/components/Statement.jsx > Statement` | Homepage, solution, data-platform and product-landing pages (21 routes across the templates that list it). |
| `features.tabs-dark` | FEATURES | 3 | 20 | `src/components/sections/TabsDark.jsx > TabsDark` | Product feature, industry and product-landing pages (20 routes across the templates that list it). |
| `interactive.faq-accordion` | INTERACTIVE | 3 | 20 | `src/components/sections/Faq.jsx > Faq` | Company pages, product landings and pricing (20 routes across the templates that list it). |
| `cta.dev-path-dialog` | CTA | 2 | 19 | `src/components/sections/DevModal.jsx > DevModalButton (opened via parts.jsx > Btn when cta.dialog is set)` | Opened from hero buttons on company and product-landing pages (19 routes across the templates that list it). |
| `cta.community-band` | CTA | 5 | 18 | `src/components/CommunityCta.jsx > CommunityCta` | Homepage, solution, industry pages, and as the alternate closer on hub listings and blog posts (18 routes across the templates that list it). |
| `social-proof.testimonial-slider` | SOCIAL_PROOF | 3 | 15 | `src/components/sections/TestiSlider.jsx > TestiSlider; homepage: src/components/Testimonials.jsx > Testimonials` | Homepage, industry pages and several product landings (15 routes across the templates that list it). |
| `social-proof.logo-bar` | SOCIAL_PROOF | 2 | 12 | `src/components/sections/LogoBar.jsx > LogoBar` | Asset/webinar landings and product landings (12 routes across the templates that list it). |
| `editorial.dark-news-strip` | EDITORIAL | 1 | 10 | `src/components/sections/NewsStrip.jsx > NewsStrip` | Company/program pages (careers member) (10 routes across the template that lists it). |
| `editorial.community-bento` | EDITORIAL | 1 | 10 | `src/components/sections/BentoCommunity.jsx > BentoCommunity` | Company/program pages (community member) (10 routes across the template that lists it). |
| `interactive.course-tabs` | INTERACTIVE | 1 | 10 | `src/components/sections/CourseTabs.jsx > CourseTabs` | Company/program pages (learning member) (10 routes across the template that lists it). |
| `interactive.photo-tabs` | INTERACTIVE | 1 | 10 | `src/components/sections/PhotoTabs.jsx > PhotoTabs` | Company/program pages (community member) (10 routes across the template that lists it). |
| `company.leadership-list` | COMPANY | 1 | 10 | `src/components/sections/Leaders.jsx > Leaders` | Company/program pages (about member) (10 routes across the template that lists it). |
| `company.people-grid` | COMPANY | 1 | 10 | `src/components/sections/Board.jsx > Board` | Company/program pages (about member) (10 routes across the template that lists it). |
| `company.role-filter` | COMPANY | 1 | 10 | `src/components/sections/Jobs.jsx > Jobs (department filter part)` | Company/program pages (careers member) (10 routes across the template that lists it). |
| `company.role-list` | COMPANY | 1 | 10 | `src/components/sections/Jobs.jsx > Jobs (grouped list part)` | Company/program pages (careers member) (10 routes across the template that lists it). |
| `company.compliance-rows` | COMPANY | 1 | 10 | `src/components/sections/Compliance.jsx > Compliance` | Company/program pages (security member) (10 routes across the template that lists it). |
| `company.program-list` | COMPANY | 1 | 10 | `src/components/sections/CertList.jsx > CertList` | Company/program pages (certification member) (10 routes across the template that lists it). |
| `features.demo-panel` | FEATURES | 1 | 9 | `src/components/sections/DemoPanel.jsx > DemoPanel` | Product landings only (9 routes across the template that lists it; rendered by the assistant member). |
| `features.integration-tile-grid` | FEATURES | 1 | 9 | `src/components/sections/IntTiles.jsx > IntTiles` | Product landings only (9 routes across the template that lists it; rendered by the analyst member). |
| `features.integration-strip` | FEATURES | 1 | 9 | `src/components/sections/IntStrip.jsx > IntStrip` | Product landings only (9 routes). |
| `interactive.install-tabs` | INTERACTIVE | 1 | 9 | `src/components/sections/Install.jsx > Install` | Product landings only (9 routes). |
| `interactive.persona-tabs` | INTERACTIVE | 1 | 9 | `src/components/sections/PersonaTabs.jsx > PersonaTabs` | Product landings only (9 routes). |
| `comparison.journey-columns` | COMPARISON | 1 | 9 | `src/components/sections/Journey.jsx > Journey` | Product landings (self-hosted comparison member) (9 routes across the template that lists it). |
| `comparison.compare-table` | COMPARISON | 1 | 9 | `src/components/sections/CompareTable.jsx > CompareTable` | Product landings (self-hosted comparison member) (9 routes across the template that lists it). |
| `article.prose-chapter` | ARTICLE | 2 | 8 | _not yet built_ | Case-study details and articles (8 routes across the templates that list it). |
| `listing.header` | LISTING | 2 | 7 | _not yet built_ | Hub listings and filterable card-grid listings (7 routes across the templates that list it). |
| `listing.card-grid` | LISTING | 2 | 7 | _not yet built_ | Hub listings and filterable card-grid listings (7 routes across the templates that list it). |
| `article.breadcrumb` | ARTICLE | 2 | 7 | _not yet built_ | Articles and asset/webinar landings (7 routes across the templates that list it). |
| `form.form-header` | FORM | 2 | 7 | _not yet built_ | Asset/webinar landings and form pages (7 routes across the templates that list it). |
| `features.tabs-light` | FEATURES | 1 | 5 | `src/components/sections/TabsLight.jsx > TabsLight` | Solution pages only (5 routes). |
| `listing.filter-toolbar` | LISTING | 1 | 4 | _not yet built_ | Filterable card-grid listings only (4 routes). |
| `listing.media-contact` | LISTING | 1 | 4 | _not yet built_ | Filterable card-grid listings (press member) (4 routes across the template that lists it). |
| `article.post-header` | ARTICLE | 1 | 4 | _not yet built_ | Articles (blog-post members) (4 routes across the template that lists it). |
| `article.guide-header` | ARTICLE | 1 | 4 | _not yet built_ | Articles (guide and report members) (4 routes across the template that lists it). |
| `article.story-header` | ARTICLE | 1 | 4 | _not yet built_ | Case-study details only (4 routes). |
| `article.story-meta` | ARTICLE | 1 | 4 | _not yet built_ | Case-study details only (4 routes). |
| `article.pull-quote` | ARTICLE | 1 | 4 | _not yet built_ | Case-study details only (4 routes). |
| `article.sticky-rail` | ARTICLE | 1 | 4 | _not yet built_ | Articles only (4 routes). |
| `form.download-form` | FORM | 1 | 4 | _not yet built_ | Articles (report member) (4 routes across the template that lists it). |
| `listing.category-nav` | LISTING | 1 | 3 | _not yet built_ | Hub listings only (3 routes). |
| `listing.featured-item` | LISTING | 1 | 3 | _not yet built_ | Hub listings only (3 routes). |
| `legal.policy-header` | LEGAL | 1 | 3 | _not yet built_ | Legal/policy pages (3 routes across the template that lists it). |
| `legal.policy-part` | LEGAL | 1 | 3 | _not yet built_ | Legal/policy pages only (3 routes). |
| `shell.event-subnav` | SHELL | 1 | 1 | _not yet built_ | Event microsite only (1 route). |
| `shell.minimal-nav` | SHELL | 1 | 1 | _not yet built_ | Partner directory only (1 route). |
| `hero.champions-dark` | HERO | 1 | 1 | _not yet built_ | Community champions page only (1 route). |
| `hero.event` | HERO | 1 | 1 | _not yet built_ | Event microsite only (1 route). |
| `social-proof.logo-marquee` | SOCIAL_PROOF | 1 | 1 | `src/components/LogoMarquee.jsx > LogoMarquee` | Homepage only (1 route). |
| `features.gradient-panel` | FEATURES | 1 | 1 | `src/components/FeaturePanel.jsx > FeaturePanel` | Homepage only (1 route). |
| `features.integration-tiles` | FEATURES | 1 | 1 | `src/components/Integrations.jsx > Integrations` | Homepage only (1 route). |
| `cta.ide-card` | CTA | 1 | 1 | `src/components/IdeCard.jsx > IdeCard` | Homepage only (1 route). |
| `cta.champions-closing` | CTA | 1 | 1 | _not yet built_ | Community champions page only (1 route). |
| `editorial.news-band` | EDITORIAL | 1 | 1 | `src/components/NewsBand.jsx > NewsBand` | Homepage only (1 route). |
| `comparison.plan-matrix` | COMPARISON | 1 | 1 | _not yet built_ | Pricing only (1 route). |
| `pricing.plan-cards` | PRICING | 1 | 1 | _not yet built_ | Pricing only (1 route). |
| `pricing.add-ons` | PRICING | 1 | 1 | _not yet built_ | Pricing only (1 route). |
| `community.about-band` | COMMUNITY | 1 | 1 | _not yet built_ | Community champions page only (1 route). |
| `community.member-grid` | COMMUNITY | 1 | 1 | _not yet built_ | Community champions page only (1 route). |
| `community.activity-cards` | COMMUNITY | 1 | 1 | _not yet built_ | Community champions page only (1 route). |
| `community.dark-quote-slider` | COMMUNITY | 1 | 1 | _not yet built_ | Community champions page only (1 route). |
| `community.story-grid` | COMMUNITY | 1 | 1 | _not yet built_ | Community champions page only (1 route). |
| `community.support-cards` | COMMUNITY | 1 | 1 | _not yet built_ | Community champions page only (1 route). |
| `event.photo-gallery` | EVENT | 1 | 1 | _not yet built_ | Event microsite only (1 route). |
| `event.recap` | EVENT | 1 | 1 | _not yet built_ | Event microsite only (1 route). |
| `event.highlight-cards` | EVENT | 1 | 1 | _not yet built_ | Event microsite only (1 route). |
| `event.sponsor-logos` | EVENT | 1 | 1 | _not yet built_ | Event microsite only (1 route). |
| `event.media-block` | EVENT | 1 | 1 | _not yet built_ | Event microsite only (1 route). |
| `event.closing-bands` | EVENT | 1 | 1 | _not yet built_ | Event microsite only (1 route). |
| `directory.filter-sidebar` | DIRECTORY | 1 | 1 | _not yet built_ | Partner directory only (1 route). |
| `directory.partner-results` | DIRECTORY | 1 | 1 | _not yet built_ | Partner directory only (1 route). |

**28 shared sections** appear in more than one template and belong in a component library.

**58 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

**40 sections have no `implementedBy` yet** — not necessarily missing, just not linked to a component in this pass: `article.prose-chapter`, `listing.header`, `listing.card-grid`, `article.breadcrumb`, `form.form-header`, `listing.filter-toolbar`, `listing.media-contact`, `article.post-header`, `article.guide-header`, `article.story-header`, `article.story-meta`, `article.pull-quote`, `article.sticky-rail`, `form.download-form`, `listing.category-nav`, `listing.featured-item`, `legal.policy-header`, `legal.policy-part`, `shell.event-subnav`, `shell.minimal-nav`, `hero.champions-dark`, `hero.event`, `cta.champions-closing`, `comparison.plan-matrix`, `pricing.plan-cards`, `pricing.add-ons`, `community.about-band`, `community.member-grid`, `community.activity-cards`, `community.dark-quote-slider`, `community.story-grid`, `community.support-cards`, `event.photo-gallery`, `event.recap`, `event.highlight-cards`, `event.sponsor-logos`, `event.media-block`, `event.closing-bands`, `directory.filter-sidebar`, `directory.partner-results`.

## Templates

### T0 Homepage [implemented] — `T0`

1 route · `/` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×17 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | HERO | `hero.center` | shared ×5 |
| 6 | SOCIAL_PROOF | `social-proof.logo-marquee` | page-local |
| 7 | EDITORIAL | `editorial.news-band` | page-local |
| 8 | CONTENT | `content.statement` | shared ×4 |
| 9 | FEATURES | `features.gradient-panel` | page-local |
| 10 | FEATURES | `features.integration-tiles` | page-local |
| 11 | FEATURES | `features.card-grid` | shared ×8 |
| 12 | CONTENT | `content.media-split` | shared ×7 |
| 13 | CTA | `cta.ide-card` | page-local |
| 14 | SOCIAL_PROOF | `social-proof.testimonial-slider` | shared ×3 |
| 15 | CTA | `cta.community-band` | shared ×5 |
| 16 | SHELL | `shell.footer` | shared ×17 |

### T1 Product feature [implemented] — `T1`

6 routes · `/product/develop`, `/product/test-and-observe`, `/product/mesh`, `/product/catalog`, `/product/deploy`, `/product/semantic-layer` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×17 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | HERO | `hero.split` | shared ×4 |
| 6 | CONTENT | `content.media-split` | shared ×7 |
| 7 | FEATURES | `features.card-grid` | shared ×8 |
| 8 | FEATURES | `features.tabs-dark` | shared ×3 |
| 9 | CTA | `cta.gradient-card` | shared ×4 |
| 10 | SOCIAL_PROOF | `social-proof.customer-tabs` | shared ×4 |
| 11 | SOCIAL_PROOF | `social-proof.quote-band` | shared ×4 |
| 12 | EDITORIAL | `editorial.resource-cards` | shared ×8 |
| 13 | CTA | `cta.closing-band` | shared ×9 |
| 14 | SHELL | `shell.footer` | shared ×17 |

### T2 Solution [implemented] — `T2`

5 routes · `/product/ai`, `/product/embedded-analytics`, `/product/data-modernization`, `/product/data-trust`, `/product/cost-optimization` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×17 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | HERO | `hero.center` | shared ×5 |
| 6 | CONTENT | `content.statement` | shared ×4 |
| 7 | FEATURES | `features.checklist` | shared ×3 |
| 8 | FEATURES | `features.card-grid` | shared ×8 |
| 9 | FEATURES | `features.tabs-light` | page-local |
| 10 | CONTENT | `content.media-split` | shared ×7 |
| 11 | SOCIAL_PROOF | `social-proof.quote-band` | shared ×4 |
| 12 | SOCIAL_PROOF | `social-proof.customer-tabs` | shared ×4 |
| 13 | CTA | `cta.community-band` | shared ×5 |
| 14 | CTA | `cta.gradient-card` | shared ×4 |
| 15 | SOCIAL_PROOF | `social-proof.stats-bento` | shared ×5 |
| 16 | EDITORIAL | `editorial.resource-cards` | shared ×8 |
| 17 | CTA | `cta.closing-band` | shared ×9 |
| 18 | SHELL | `shell.footer` | shared ×17 |

### T3 Data platform [implemented] — `T3`

6 routes · `/data-platforms/northwind`, `/data-platforms/quarry`, `/data-platforms/helixa`, `/data-platforms/stratus`, `/data-platforms/driftway`, `/data-platforms/cobalt` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×17 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | HERO | `hero.split` | shared ×4 |
| 6 | FEATURES | `features.card-grid` | shared ×8 |
| 7 | CONTENT | `content.statement` | shared ×4 |
| 8 | CONTENT | `content.media-split` | shared ×7 |
| 9 | CTA | `cta.gradient-card` | shared ×4 |
| 10 | SOCIAL_PROOF | `social-proof.customer-tabs` | shared ×4 |
| 11 | EDITORIAL | `editorial.resource-cards` | shared ×8 |
| 12 | SOCIAL_PROOF | `social-proof.stats-bento` | shared ×5 |
| 13 | CTA | `cta.closing-band` | shared ×9 |
| 14 | SHELL | `shell.footer` | shared ×17 |

### T4 Industry [implemented] — `T4`

5 routes · `/industry/financial-services`, `/industry/healthcare`, `/industry/manufacturing`, `/industry/energy-utilities`, `/industry/telecommunications` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×17 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | HERO | `hero.center` | shared ×5 |
| 6 | FEATURES | `features.card-grid` | shared ×8 |
| 7 | SOCIAL_PROOF | `social-proof.quote-band` | shared ×4 |
| 8 | FEATURES | `features.tabs-dark` | shared ×3 |
| 9 | SOCIAL_PROOF | `social-proof.testimonial-slider` | shared ×3 |
| 10 | EDITORIAL | `editorial.resource-cards` | shared ×8 |
| 11 | SOCIAL_PROOF | `social-proof.stats-bento` | shared ×5 |
| 12 | CTA | `cta.community-band` | shared ×5 |
| 13 | SHELL | `shell.footer` | shared ×17 |

### T5 Case-study detail [planned] — `T5`

4 routes · `/case-studies/kestrel`, `/case-studies/meridian-partners`, `/case-studies/halcyon`, `/case-studies/basalt-health` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×17 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | ARTICLE | `article.story-header` | page-local |
| 6 | ARTICLE | `article.story-meta` | page-local |
| 7 | ARTICLE | `article.prose-chapter` | shared ×2 |
| 8 | ARTICLE | `article.pull-quote` | page-local |
| 9 | EDITORIAL | `editorial.resource-cards` | shared ×8 |
| 10 | CTA | `cta.closing-band` | shared ×9 |
| 11 | SHELL | `shell.footer` | shared ×17 |

### T6 Content hub listing [planned] — `T6`

3 routes · `/blog`, `/resources/webinars`, `/resources` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×17 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | LISTING | `listing.header` | shared ×2 |
| 6 | LISTING | `listing.category-nav` | page-local |
| 7 | LISTING | `listing.featured-item` | page-local |
| 8 | LISTING | `listing.card-grid` | shared ×2 |
| 9 | CTA | `cta.closing-band` | shared ×9 |
| 10 | CTA | `cta.community-band` | shared ×5 |
| 11 | SHELL | `shell.footer` | shared ×17 |

### T7 Filterable card grid [planned] — `T7`

4 routes · `/case-studies`, `/resources/on-demand`, `/events`, `/press` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×17 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | LISTING | `listing.header` | shared ×2 |
| 6 | LISTING | `listing.filter-toolbar` | page-local |
| 7 | LISTING | `listing.card-grid` | shared ×2 |
| 8 | LISTING | `listing.media-contact` | page-local |
| 9 | CTA | `cta.closing-band` | shared ×9 |
| 10 | SHELL | `shell.footer` | shared ×17 |

### T8 Article with sticky rail [planned] — `T8`

4 routes · `/resources/analytics-lifecycle`, `/resources/state-of-data-teams`, `/blog/summit-announcements`, `/blog/lattice-joins-northwind` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×17 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | ARTICLE | `article.breadcrumb` | shared ×2 |
| 6 | ARTICLE | `article.post-header` | page-local |
| 7 | ARTICLE | `article.guide-header` | page-local |
| 8 | ARTICLE | `article.prose-chapter` | shared ×2 |
| 9 | ARTICLE | `article.sticky-rail` | page-local |
| 10 | FORM | `form.download-form` | page-local |
| 11 | EDITORIAL | `editorial.resource-cards` | shared ×8 |
| 12 | CTA | `cta.community-band` | shared ×5 |
| 13 | CTA | `cta.closing-band` | shared ×9 |
| 14 | SHELL | `shell.footer` | shared ×17 |

### T9 Asset / webinar landing [planned] — `T9`

3 routes · `/resources/webinars/launch-showcase`, `/resources/whitepaper-control-plane`, `/resources/webinars/charts-as-code` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×17 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | ARTICLE | `article.breadcrumb` | shared ×2 |
| 6 | FORM | `form.form-header` | shared ×2 |
| 7 | SOCIAL_PROOF | `social-proof.logo-bar` | shared ×2 |
| 8 | CONTENT | `content.media-split` | shared ×7 |
| 9 | SHELL | `shell.footer` | shared ×17 |

### T10 Form page [planned] — `T10`

4 routes · `/contact`, `/signup`, `/community/join`, `/report-a-problem` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×17 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | FORM | `form.form-header` | shared ×2 |
| 6 | FEATURES | `features.card-grid` | shared ×8 |
| 7 | SOCIAL_PROOF | `social-proof.stats-bento` | shared ×5 |
| 8 | SHELL | `shell.footer` | shared ×17 |

### T11 Legal / policy prose [planned] — `T11`

3 routes · `/modern-slavery-statement`, `/terms-of-use`, `/legal/ai-principles` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×17 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | LEGAL | `legal.policy-header` | page-local |
| 6 | LEGAL | `legal.policy-part` | page-local |
| 7 | SHELL | `shell.footer` | shared ×17 |

### T12 Company / program [registered, content pending] — `T12`

10 routes · `/security`, `/certification`, `/learn`, `/community`, `/about-us`, `/about-us/values`, `/about-us/careers`, `/about-us/belonging`, `/partners`, `/services` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×17 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | HERO | `hero.split` | shared ×4 |
| 6 | HERO | `hero.center` | shared ×5 |
| 7 | EDITORIAL | `editorial.dark-news-strip` | page-local |
| 8 | FEATURES | `features.checklist` | shared ×3 |
| 9 | FEATURES | `features.card-grid` | shared ×8 |
| 10 | COMPANY | `company.leadership-list` | page-local |
| 11 | COMPANY | `company.people-grid` | page-local |
| 12 | COMPANY | `company.role-filter` | page-local |
| 13 | COMPANY | `company.role-list` | page-local |
| 14 | CONTENT | `content.media-split` | shared ×7 |
| 15 | COMPANY | `company.compliance-rows` | page-local |
| 16 | COMPANY | `company.program-list` | page-local |
| 17 | INTERACTIVE | `interactive.course-tabs` | page-local |
| 18 | EDITORIAL | `editorial.community-bento` | page-local |
| 19 | INTERACTIVE | `interactive.photo-tabs` | page-local |
| 20 | INTERACTIVE | `interactive.faq-accordion` | shared ×3 |
| 21 | EDITORIAL | `editorial.resource-cards` | shared ×8 |
| 22 | CTA | `cta.closing-band` | shared ×9 |
| 23 | CTA | `cta.dev-path-dialog` | shared ×2 |
| 24 | SHELL | `shell.footer` | shared ×17 |

### T13 Product landing [registered, content pending] — `T13`

9 routes · `/product/what-is-lattice`, `/product/lattice`, `/product/state`, `/product/assistant`, `/product/charts`, `/product/governance`, `/product/integrations`, `/product/analyst`, `/product/self-hosted-vs-platform` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×17 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | HERO | `hero.center` | shared ×5 |
| 6 | HERO | `hero.split` | shared ×4 |
| 7 | SOCIAL_PROOF | `social-proof.logo-bar` | shared ×2 |
| 8 | INTERACTIVE | `interactive.install-tabs` | page-local |
| 9 | CONTENT | `content.media-split` | shared ×7 |
| 10 | FEATURES | `features.checklist` | shared ×3 |
| 11 | FEATURES | `features.card-grid` | shared ×8 |
| 12 | FEATURES | `features.tabs-dark` | shared ×3 |
| 13 | FEATURES | `features.demo-panel` | page-local |
| 14 | CONTENT | `content.statement` | shared ×4 |
| 15 | COMPARISON | `comparison.journey-columns` | page-local |
| 16 | INTERACTIVE | `interactive.persona-tabs` | page-local |
| 17 | SOCIAL_PROOF | `social-proof.customer-tabs` | shared ×4 |
| 18 | SOCIAL_PROOF | `social-proof.quote-band` | shared ×4 |
| 19 | SOCIAL_PROOF | `social-proof.testimonial-slider` | shared ×3 |
| 20 | COMPARISON | `comparison.compare-table` | page-local |
| 21 | FEATURES | `features.integration-tile-grid` | page-local |
| 22 | FEATURES | `features.integration-strip` | page-local |
| 23 | CTA | `cta.gradient-card` | shared ×4 |
| 24 | INTERACTIVE | `interactive.faq-accordion` | shared ×3 |
| 25 | SOCIAL_PROOF | `social-proof.stats-bento` | shared ×5 |
| 26 | EDITORIAL | `editorial.resource-cards` | shared ×8 |
| 27 | CTA | `cta.closing-band` | shared ×9 |
| 28 | CTA | `cta.dev-path-dialog` | shared ×2 |
| 29 | SHELL | `shell.footer` | shared ×17 |

### T14 Pricing [planned] — `T14`

1 route · `/pricing` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×17 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | PRICING | `pricing.plan-cards` | page-local |
| 6 | PRICING | `pricing.add-ons` | page-local |
| 7 | COMPARISON | `comparison.plan-matrix` | page-local |
| 8 | INTERACTIVE | `interactive.faq-accordion` | shared ×3 |
| 9 | SHELL | `shell.footer` | shared ×17 |

### T15 Community champions (dark theme) [planned] — `T15`

1 route · `/champions` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×17 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | HERO | `hero.champions-dark` | page-local |
| 6 | COMMUNITY | `community.about-band` | page-local |
| 7 | COMMUNITY | `community.member-grid` | page-local |
| 8 | COMMUNITY | `community.activity-cards` | page-local |
| 9 | COMMUNITY | `community.dark-quote-slider` | page-local |
| 10 | COMMUNITY | `community.story-grid` | page-local |
| 11 | COMMUNITY | `community.support-cards` | page-local |
| 12 | CTA | `cta.champions-closing` | page-local |
| 13 | SHELL | `shell.footer` | shared ×17 |

### T16 Event microsite [planned] — `T16`

1 route · `/summit` · chrome: **event-subnav**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×17 |
| 2 | SHELL | `shell.event-subnav` | page-local |
| 3 | HERO | `hero.event` | page-local |
| 4 | EVENT | `event.photo-gallery` | page-local |
| 5 | EVENT | `event.recap` | page-local |
| 6 | EVENT | `event.highlight-cards` | page-local |
| 7 | EVENT | `event.sponsor-logos` | page-local |
| 8 | EVENT | `event.media-block` | page-local |
| 9 | EVENT | `event.closing-bands` | page-local |
| 10 | SHELL | `shell.footer` | shared ×17 |

### T17 Partner directory [planned] — `T17`

1 route · `/partner-directory` · chrome: **none**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.minimal-nav` | page-local |
| 2 | DIRECTORY | `directory.filter-sidebar` | page-local |
| 3 | DIRECTORY | `directory.partner-results` | page-local |

## Section reference

### SHELL

_Site chrome rendered outside <main>: announcement strip, navigation, menus, footer, and the reduced navs that replace them on two one-off pages._

**`shell.announcement-bar`** — Rotating one-line announcement strip above the navigation: linked slides with previous/next arrows, autoplaying; hidden below 1024px.

· Every page except the partner directory: all full-chrome pages plus the event microsite (70 routes). · appears on 70 routes · implemented by `src/components/AnnouncementBar.jsx > AnnouncementBar`

**`shell.navbar`** — Sticky global navigation: brand mark, mega-menu triggers plus one plain link, search, secondary and primary CTAs and an account button on desktop; logo, search and hamburger below 1024px.

· All full-chrome pages (69 routes); replaced by the event sub-nav on the event microsite and by the minimal nav on the partner directory. · appears on 69 routes · implemented by `src/components/Navbar.jsx > Navbar`

**`shell.mega-menu`** — Popover card opened from each navbar trigger: two groups of icon + title + description items, an optional featured item with thumbnail, a grey side column of links and a coloured footer strip.

· Mounted with the global navbar on all full-chrome pages (69 routes). · appears on 69 routes · implemented by `src/components/MegaMenu.jsx > MegaMenu`

**`shell.mobile-drawer`** — Below 1024px: full-height drawer listing the menu categories with a drill-down sub-level and Back control, the plain link and account links, and a fixed bottom bar holding the two nav CTAs.

· Mounted with the global navbar on all full-chrome pages (69 routes). · appears on 69 routes · implemented by `src/components/Navbar.jsx (drawer block)`

**`shell.event-subnav`** — Transparent event-specific navigation bar (event name plus agenda, speakers, experience, tour and waitlist links) that replaces the global navbar and mega-menus; uses the event's own display face.

· Event microsite only (1 route). · appears on 1 routes

**`shell.minimal-nav`** — Minimal white navigation row: brand mark and a single Home link; no menus, search or CTAs.

· Partner directory only (1 route). · appears on 1 routes

**`shell.footer`** — Dark footer: light brand mark, link columns (one link with a badge), newsletter block, region select, social icons, copyright with legal links and a cookie-preferences button.

· Every page except the partner directory (70 routes). · appears on 70 routes · implemented by `src/components/Footer.jsx > Footer`

### HERO

_The page-opening header block that holds the page's H1._

**`hero.center`** — Centred page header: optional eyebrow, H1, lead, one or two large buttons, and either no media (text-only) or a large rounded image / illustration / 16:9 poster below; brush stroke behind on media variants.

· Homepage (text-only), solution and industry pages, and some company and product-landing pages (30 routes across the templates that list it). · appears on 30 routes · implemented by `src/components/sections/HeroCenter.jsx > HeroCenter; homepage: src/components/Hero.jsx > Hero`

**`hero.split`** — Two-column page header: H1, lead and one or two large buttons on the left, rounded image / video poster / illustration on the right (6/6 or 7/5), optional tag chip or product lockup above the H1; padded or flush-bottom; brush stroke behind.

· Product feature and data-platform pages, plus most company pages and several product landings (31 routes across the templates that list it). · appears on 31 routes · implemented by `src/components/sections/HeroSplit.jsx > HeroSplit`

**`hero.champions-dark`** — Near-black full-width community-program header with the page's own display face; opens the dark-theme sequence.

· Community champions page only (1 route). · appears on 1 routes

**`hero.event`** — Event microsite header in the event's display face, sitting under the event sub-nav.

· Event microsite only (1 route). · appears on 1 routes

### SOCIAL_PROOF

_Customer evidence: logos, quotes, customer stories, stat bands._

**`social-proof.logo-marquee`** — Infinite horizontal marquee of customer wordmarks that overlaps the bottom edge of the hero.

· Homepage only (1 route). · appears on 1 routes · implemented by `src/components/LogoMarquee.jsx > LogoMarquee`

**`social-proof.logo-bar`** — Static 'trusted by' row: centred small heading above a single wrapping row of about six customer wordmarks; no motion (distinct from the homepage marquee).

· Asset/webinar landings and product landings (12 routes across the templates that list it). · appears on 12 routes · implemented by `src/components/sections/LogoBar.jsx > LogoBar`

**`social-proof.customer-tabs`** — Heading and paragraph, a left-aligned tab row of customer names, and per tab a logo, headline, optional summary, button, a quote card and two stat cards.

· Product feature, solution, data-platform and product-landing pages (26 routes across the templates that list it; absent on some members). · appears on 26 routes · implemented by `src/components/sections/CustTabs.jsx > CustTabs`

**`social-proof.quote-band`** — One bordered blur card holding a customer quote (icon or logo, large quote, attribution), or a one-per-view slider of such quotes with pagination bars; optional brush stroke or soft wash behind.

· Product feature (one member), solution (one member), industry and product-landing pages (25 routes across the templates that list it). · appears on 25 routes · implemented by `src/components/sections/QuoteBand.jsx > QuoteBand`

**`social-proof.testimonial-slider`** — Header column (eyebrow, heading, body, optional button) beside a horizontal slider of quote or metric cards (logo, quote or big metric, text link) with arrows and pagination bars.

· Homepage, industry pages and several product landings (15 routes across the templates that list it). · appears on 15 routes · implemented by `src/components/sections/TestiSlider.jsx > TestiSlider; homepage: src/components/Testimonials.jsx > Testimonials`

**`social-proof.stats-bento`** — Dark 'trusted at scale' band: optional eyebrow, heading, and four blur-dark cards in an alternating 7+5 / 5+7 bento, each with eyebrow, stat heading, body and an optional image or logo-tile row.

· Solution, industry, form and product-landing pages, plus one data-platform member (29 routes across the templates that list it). · appears on 29 routes · implemented by `src/components/sections/Stats.jsx > Stats`

### FEATURES

_Product and capability explanation: card grids, checklists, tabbed showcases, gradient panels, integration blocks._

**`features.gradient-panel`** — Rounded gradient panel with grain: small eyebrow, heading, body and a dark primary button in one column, product media flush to the panel's edge in the other; consecutive panels alternate sides.

· Homepage only (1 route). · appears on 1 routes · implemented by `src/components/FeaturePanel.jsx > FeaturePanel`

**`features.demo-panel`** — Product-landing demo row: full-container gradient panel with grain, a narrow text column (small eyebrow, heading, paragraph, dark primary button) and a wide screenshot sitting on the panel bottom edge; rows alternate sides and alternate two gradients, separated by a dark rule below 768px. Structurally close to features.gradient-panel but built and measured separately.

· Product landings only (9 routes across the template that lists it; rendered by the assistant member). · appears on 9 routes · implemented by `src/components/sections/DemoPanel.jsx > DemoPanel`

**`features.integration-tiles`** — Text column (eyebrow, heading, body, button) beside a two-column grid of six bordered tiles, each an integration icon plus label; tile border darkens on hover.

· Homepage only (1 route). · appears on 1 routes · implemented by `src/components/Integrations.jsx > Integrations`

**`features.integration-tile-grid`** — Text column (eyebrow, heading, paragraph, button) at five of twelve columns beside an offset two-column grid of bordered icon + large-label tiles that are not links; tile border darkens on hover. Structurally close to the homepage features.integration-tiles but built and measured separately.

· Product landings only (9 routes across the template that lists it; rendered by the analyst member). · appears on 9 routes · implemented by `src/components/sections/IntTiles.jsx > IntTiles`

**`features.integration-strip`** — Centred grey kicker and heading above a single wrapping row of square icon-only integration tiles and one button; tiles darken their border on hover.

· Product landings only (9 routes). · appears on 9 routes · implemented by `src/components/sections/IntStrip.jsx > IntStrip`

**`features.card-grid`** — Section header (eyebrow, heading, paragraph, optional buttons or lockup) above a three- or four-column grid of cards: icon cards on a wash, bordered link cards, image cards, plain or dark bordered cards, or stat cards (big number + label).

· The most reused content block: homepage plus every marketing, form and company template that lists it (46 routes across the templates that list it). · appears on 46 routes · implemented by `src/components/sections/Feat.jsx > Feat; homepage: src/components/WhyCards.jsx > WhyCards`

**`features.checklist`** — Icon checklist of capabilities: two columns of titled items, a split with heading + items beside an image, a before/after pair, or a three-column grid of titled items.

· Solution pages, plus company and product-landing pages that use the split variant (24 routes across the templates that list it). · appears on 24 routes · implemented by `src/components/sections/Checklist.jsx > Checklist`

**`features.tabs-dark`** — Dark band: heading (+ optional paragraph) and a vertical tablist where the active tab expands its description, beside that tab's media in a blur-dark frame; brush stroke behind.

· Product feature, industry and product-landing pages (20 routes across the templates that list it). · appears on 20 routes · implemented by `src/components/sections/TabsDark.jsx > TabsDark`

**`features.tabs-light`** — Light centred tab row with an underline on the active tab; each tab shows a short description and one square image.

· Solution pages only (5 routes). · appears on 5 routes · implemented by `src/components/sections/TabsLight.jsx > TabsLight`

### CONTENT

_General text-and-media rows that are neither a feature grid nor proof: statements and media splits._

**`content.statement`** — Centred heading (+ paragraph) in a narrow reading column; variants add a diagram or a video poster below, a single-sentence line, an eyebrow, or a light grey band.

· Homepage, solution, data-platform and product-landing pages (21 routes across the templates that list it). · appears on 21 routes · implemented by `src/components/sections/Statement.jsx > Statement; homepage: src/components/Statement.jsx > Statement`

**`content.media-split`** — Two-column row: eyebrow, heading, one or two paragraphs (optional bullets) and buttons beside an image, diagram or video poster; column ratios 6/6, 7/5, 5/7; media left or right.

· Homepage and most marketing templates, plus asset landings and company pages (40 routes across the templates that list it). · appears on 40 routes · implemented by `src/components/sections/Split.jsx > Split; homepage: src/components/DiagramSection.jsx > DiagramSection`

### CTA

_Conversion blocks: gradient cards, closing bands, install prompts, and the dialog some hero buttons open._

**`cta.ide-card`** — One clickable gradient card: heading and paragraph beside a two-by-two grid of white tiles naming editor/install options.

· Homepage only (1 route). · appears on 1 routes · implemented by `src/components/IdeCard.jsx > IdeCard`

**`cta.gradient-card`** — Mid-page conversion card on a warm gradient with grain: heading, paragraph, a dark primary button and an optional dark tertiary button.

· Product feature, data-platform, one solution member and several product landings (26 routes across the templates that list it). · appears on 26 routes · implemented by `src/components/sections/CtaCard.jsx > CtaCard`

**`cta.closing-band`** — Short blue gradient band with concentric circles: heading, paragraph, zero to two dark buttons, and an optional right column (heading + paragraph + arrow link, a three-row checklist, or two stats).

· The default page closer on every marketing, listing, case-study and company template that lists it (51 routes across the templates that list it). · appears on 51 routes · implemented by `src/components/sections/CtaBand.jsx > CtaBand`

**`cta.community-band`** — Long blue gradient band: eyebrow, heading, body, two dark buttons, and a right column of two or three stat blocks behind a hairline divider.

· Homepage, solution, industry pages, and as the alternate closer on hub listings and blog posts (18 routes across the templates that list it). · appears on 18 routes · implemented by `src/components/CommunityCta.jsx > CommunityCta`

**`cta.dev-path-dialog`** — Modal dialog opened by some hero buttons: dimmed blurred overlay, white panel with close button, heading, then rows of path title + description + secondary button divided by hairlines. Overlay, not an in-flow section.

· Opened from hero buttons on company and product-landing pages (19 routes across the templates that list it). · appears on 19 routes · implemented by `src/components/sections/DevModal.jsx > DevModalButton (opened via parts.jsx > Btn when cta.dialog is set)`

**`cta.champions-closing`** — Dark closing band inviting the visitor to join the champions program, in the page's dark theme.

· Community champions page only (1 route). · appears on 1 routes

### EDITORIAL

_News, announcements and links out to resources or community content._

**`editorial.news-band`** — Dark band with a co-brand lockup, one news headline and a read-more link.

· Homepage only (1 route). · appears on 1 routes · implemented by `src/components/NewsBand.jsx > NewsBand`

**`editorial.dark-news-strip`** — Compact dark strip: eyebrow, heading and paragraph on the left, one outlined light button on the right; no lockup (differs from the homepage news band).

· Company/program pages (careers member) (10 routes across the template that lists it). · appears on 10 routes · implemented by `src/components/sections/NewsStrip.jsx > NewsStrip`

**`editorial.resource-cards`** — Header (eyebrow, heading, optional paragraph) above two to four resource / story / post cards: 16:9 image link, optional tag chip, title link, optional paragraph or byline.

· Related-reading row on product feature, solution, data-platform, industry, case-study, article, company and product-landing pages (49 routes across the templates that list it). · appears on 49 routes · implemented by `src/components/sections/Resources.jsx > Resources`

**`editorial.community-bento`** — Dark bento of community updates: a wide feature card with square image, a member quote card, a meetup date card, a topics list card and an image-of-the-week card.

· Company/program pages (community member) (10 routes across the template that lists it). · appears on 10 routes · implemented by `src/components/sections/BentoCommunity.jsx > BentoCommunity`

### INTERACTIVE

_Disclosure and tab widgets whose main job is switching or expanding content (accordions and content-specific tab sets)._

**`interactive.faq-accordion`** — Centred heading (+ optional paragraph) above grey rounded accordion items: question row with plus/minus glyph, instant independent expand/collapse revealing prose.

· Company pages, product landings and pricing (20 routes across the templates that list it). · appears on 20 routes · implemented by `src/components/sections/Faq.jsx > Faq`

**`interactive.course-tabs`** — Text column (eyebrow, heading, paragraph, button) beside a light flex-grow tab row whose panels list course cards (16:9 image, tag + duration, title, paragraph, chevron link).

· Company/program pages (learning member) (10 routes across the template that lists it). · appears on 10 routes · implemented by `src/components/sections/CourseTabs.jsx > CourseTabs`

**`interactive.photo-tabs`** — Left-aligned header and button above a flex-grow light tab row; each panel is a mirrored mosaic of one large and two small square photos per column.

· Company/program pages (community member) (10 routes across the template that lists it). · appears on 10 routes · implemented by `src/components/sections/PhotoTabs.jsx > PhotoTabs`

**`interactive.install-tabs`** — Centred header above a two-tab light tablist; each panel is a bordered card holding one shell-command row (prompt glyph, monospace command, copy button).

· Product landings only (9 routes). · appears on 9 routes · implemented by `src/components/sections/Install.jsx > Install`

**`interactive.persona-tabs`** — Centred icon tabs (one per persona); each panel shows a before card and an after card side by side, each with a code chip, heading and bullet list.

· Product landings only (9 routes). · appears on 9 routes · implemented by `src/components/sections/PersonaTabs.jsx > PersonaTabs`

### LISTING

_Collection and directory pages: listing headers, category navigation, filters, card grids._

**`listing.header`** — Plain listing header: H1 only, no buttons or media.

· Hub listings and filterable card-grid listings (7 routes across the templates that list it). · appears on 7 routes

**`listing.category-nav`** — Blurred pill navigation linking to category sub-listings, with a search input beside it.

· Hub listings only (3 routes). · appears on 3 routes

**`listing.filter-toolbar`** — Search input plus a client-side filter control (filters panel or multi-select dropdown); runtime UI, absent on the press member.

· Filterable card-grid listings only (4 routes). · appears on 4 routes

**`listing.featured-item`** — One large featured card (wide image, category eyebrow, title, byline) above the listing grid.

· Hub listings only (3 routes). · appears on 3 routes

**`listing.card-grid`** — Three-column grid of listing cards (image, category and read-time eyebrow, title, author and date) ending in a client-side load-more / view-more button; the press member has two such grids.

· Hub listings and filterable card-grid listings (7 routes across the templates that list it). · appears on 7 routes

**`listing.media-contact`** — Plain text block with press-contact details that closes the press listing instead of a CTA band.

· Filterable card-grid listings (press member) (4 routes across the template that lists it). · appears on 4 routes

### ARTICLE

_Long-form reading blocks: article and story headers, prose chapters, side rails, breadcrumbs._

**`article.breadcrumb`** — Breadcrumb row (section / category / title) at the top of the header.

· Articles and asset/webinar landings (7 routes across the templates that list it). · appears on 7 routes

**`article.post-header`** — Blog-post header: H1, author and last-edited date; no buttons or media.

· Articles (blog-post members) (4 routes across the template that lists it). · appears on 4 routes

**`article.guide-header`** — Hero-style header for long-form guides and reports: H1, author link, a download button and a second CTA.

· Articles (guide and report members) (4 routes across the template that lists it). · appears on 4 routes

**`article.story-header`** — Case-study header: H1, customer logo and a row of headline stats.

· Case-study details only (4 routes). · appears on 4 routes

**`article.story-meta`** — Left meta column beside the story body: small labelled facts (industry and similar) as heading-labelled rows.

· Case-study details only (4 routes). · appears on 4 routes

**`article.prose-chapter`** — One heading-bounded chapter of long-form prose (a heading plus paragraphs, sub-headings, inline images, tables or an embedded video poster). Repeats once per chapter; never one whole-article section.

· Case-study details and articles (8 routes across the templates that list it). · appears on 8 routes

**`article.pull-quote`** — Inline customer quote set off within the story body.

· Case-study details only (4 routes). · appears on 4 routes

**`article.sticky-rail`** — Sticky right rail beside the article body column holding share links (posts) or a table-of-contents anchor list (guides); runtime UI.

· Articles only (4 routes). · appears on 4 routes

### FORM

_Static (non-submitting) form blocks._

**`form.form-header`** — Two-column page header: copy (eyebrow, H1, intro, optional sub-sections or logo row) beside a static form panel with privacy fine print; some members have only a button in place of the form. No submission.

· Asset/webinar landings and form pages (7 routes across the templates that list it). · appears on 7 routes

**`form.download-form`** — Standalone static download form section that ends a long-form report.

· Articles (report member) (4 routes across the template that lists it). · appears on 4 routes

### LEGAL

_Policy and legal document blocks._

**`legal.policy-header`** — Policy page header: H1 only. Absent on one member, which starts directly with a section heading.

· Legal/policy pages (3 routes across the template that lists it). · appears on 3 routes

**`legal.policy-part`** — One heading-bounded part of a policy document in a centred narrow column with numbered headings; repeats per part, never one whole-document section.

· Legal/policy pages only (3 routes). · appears on 3 routes

### COMPANY

_Company and program blocks: people, open roles, compliance, certification programs._

**`company.leadership-list`** — Centred heading above a vertical list of large bordered person cards: round avatar, name, role line, profile link and a short bio.

· Company/program pages (about member) (10 routes across the template that lists it). · appears on 10 routes · implemented by `src/components/sections/Leaders.jsx > Leaders`

**`company.people-grid`** — Centred heading above a wrapping row of avatar + name + role tiles (no bio).

· Company/program pages (about member) (10 routes across the template that lists it). · appears on 10 routes · implemented by `src/components/sections/Board.jsx > Board`

**`company.role-filter`** — Department filter for the open-roles list: a non-sticky vertical button list on desktop, a single-select dropdown below 1024px; filters instantly. Runtime UI.

· Company/program pages (careers member) (10 routes across the template that lists it). · appears on 10 routes · implemented by `src/components/sections/Jobs.jsx > Jobs (department filter part)`

**`company.role-list`** — Open roles grouped by department: tag chip per group, then rows of role title link, location with pin icon and an apply button.

· Company/program pages (careers member) (10 routes across the template that lists it). · appears on 10 routes · implemented by `src/components/sections/Jobs.jsx > Jobs (grouped list part)`

**`company.compliance-rows`** — Centred heading above stacked rows of a certification badge (left quarter) and a heading + prose description (right three quarters).

· Company/program pages (security member) (10 routes across the template that lists it). · appears on 10 routes · implemented by `src/components/sections/Compliance.jsx > Compliance`

**`company.program-list`** — Two-column block: heading, paragraphs and button on the left; a list of icon + title + paragraph + tertiary button program items on the right.

· Company/program pages (certification member) (10 routes across the template that lists it). · appears on 10 routes · implemented by `src/components/sections/CertList.jsx > CertList`

### COMPARISON

_Side-by-side comparison blocks: feature tables and maturity columns._

**`comparison.journey-columns`** — Dark band of four maturity columns (three outlined, the last highlighted with a glow) listing labelled facts, status badges and x/check lists, with a decorative curve overlay.

· Product landings (self-hosted comparison member) (9 routes across the template that lists it). · appears on 9 routes · implemented by `src/components/sections/Journey.jsx > Journey`

**`comparison.compare-table`** — Left-aligned heading above a two-option feature table: zebra rows, check marks or info notes per cell, outlined rounded body; repeats once per feature group.

· Product landings (self-hosted comparison member) (9 routes across the template that lists it). · appears on 9 routes · implemented by `src/components/sections/CompareTable.jsx > CompareTable`

**`comparison.plan-matrix`** — Multi-plan feature comparison table with collapsible feature groups and icon cells, one column per plan.

· Pricing only (1 route). · appears on 1 routes

### PRICING

_Plan and add-on offer blocks._

**`pricing.plan-cards`** — Pricing header that holds the H1 above a row of plan cards (plan name, price block, feature list, button).

· Pricing only (1 route). · appears on 1 routes

**`pricing.add-ons`** — Light band of two add-on offer cards below the plans.

· Pricing only (1 route). · appears on 1 routes

### COMMUNITY

_Blocks unique to the dark-theme community champions page._

**`community.about-band`** — Dark about-the-program band following the dark hero.

· Community champions page only (1 route). · appears on 1 routes

**`community.member-grid`** — Grid of featured member portraits.

· Community champions page only (1 route). · appears on 1 routes

**`community.activity-cards`** — Row of cards describing what program members do, on a light band.

· Community champions page only (1 route). · appears on 1 routes

**`community.dark-quote-slider`** — Dark one-per-view slider of member quotes (blockquote cards) with slider controls.

· Community champions page only (1 route). · appears on 1 routes

**`community.story-grid`** — Large image grid of member stories.

· Community champions page only (1 route). · appears on 1 routes

**`community.support-cards`** — Dark band of four cards describing how the program supports members.

· Community champions page only (1 route). · appears on 1 routes

### EVENT

_Blocks unique to the event microsite._

**`event.photo-gallery`** — Large photo gallery from past editions of the event.

· Event microsite only (1 route). · appears on 1 routes

**`event.recap`** — Recap block summarising the previous edition.

· Event microsite only (1 route). · appears on 1 routes

**`event.highlight-cards`** — Row of four highlight cards for what is new at the event.

· Event microsite only (1 route). · appears on 1 routes

**`event.sponsor-logos`** — Grid of sponsor marks (placeholder marks only in the clone).

· Event microsite only (1 route). · appears on 1 routes

**`event.media-block`** — Media (video poster) section of the event microsite.

· Event microsite only (1 route). · appears on 1 routes

**`event.closing-bands`** — Black closing section with heading and call to action; appears twice in a row at the end of the microsite.

· Event microsite only (1 route). · appears on 1 routes

### DIRECTORY

_Blocks of the statically mocked partner locator._

**`directory.filter-sidebar`** — Static mock of the partner-locator filter sidebar: checkbox groups (type, tier, region) and an apply button.

· Partner directory only (1 route). · appears on 1 routes

**`directory.partner-results`** — Static mock of the partner results: keyword search, partner cards and previous / numbered / next pagination.

· Partner directory only (1 route). · appears on 1 routes
