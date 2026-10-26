# Lattice clone: information architecture

Source: Clone project (fictional brand Lattice): src/routes.js, src/App.jsx, src/Layout.jsx, src/content/pages/*.js, src/components/**, design-repo/, specs/*.md, CLONE_SPEC.md
Status: **all 18 templates implemented; sections re-derived from src/ and design-repo contracts** · production approved: **false**
71 routes · 18 templates · 84 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 3 templates (T12 Company / program page [implemented], T13 Product landing (bespoke composition) [implemented], T1 Product feature page [implemented]) account for 25 of 71 routes (35%). The remaining 46 routes span 15 templates.

| template | routes | share |
|---|---:|---:|
| T12 Company / program page [implemented] | 10 | 14% |
| T13 Product landing (bespoke composition) [implemented] | 9 | 13% |
| T1 Product feature page [implemented] | 6 | 8% |
| T3 Data-platform partner page [implemented] | 6 | 8% |
| T2 Solution / use-case page [implemented] | 5 | 7% |
| T4 Industry page [implemented] | 5 | 7% |
| T5 Case-study detail [implemented] | 4 | 6% |
| T7 Filterable card grid listing [implemented] | 4 | 6% |
| T8 Article / long-form with sticky rail [implemented] | 4 | 6% |
| T10 Form page [implemented] | 4 | 6% |
| T6 Content hub listing with category nav [implemented] | 3 | 4% |
| T9 Asset / webinar landing [implemented] | 3 | 4% |
| T11 Legal / policy prose [implemented] | 3 | 4% |
| T0 Homepage [implemented] | 1 | 1% |
| T14 Pricing [implemented] | 1 | 1% |
| T15 Community champions (dark bands) [implemented] | 1 | 1% |
| T16 Event microsite [implemented] | 1 | 1% |
| T17 Partner directory [implemented] | 1 | 1% |

## Page chrome

**69 routes carry chrome = `full`** — T0 Homepage [implemented], T1 Product feature page [implemented], T2 Solution / use-case page [implemented], T3 Data-platform partner page [implemented], T4 Industry page [implemented], T5 Case-study detail [implemented], T6 Content hub listing with category nav [implemented], T7 Filterable card grid listing [implemented], T8 Article / long-form with sticky rail [implemented], T9 Asset / webinar landing [implemented], T10 Form page [implemented], T11 Legal / policy prose [implemented], T12 Company / program page [implemented], T13 Product landing (bespoke composition) [implemented], T14 Pricing [implemented], T15 Community champions (dark bands) [implemented].

**1 routes carry chrome = `event-subnav`** — T16 Event microsite [implemented].

**1 routes carry chrome = `none`** — T17 Partner directory [implemented].

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `shell.announcement-bar` | SHELL | 16 | 69 | `src/components/AnnouncementBar.jsx > AnnouncementBar` | 69 routes across the templates that list it (home, product-feature, solution, data-platform, industry, case-study-detail, content-hub-listing, filterable-card-grid, article, asset-landing, form-page, legal-prose, company-program, product-landing, pricing, champions). |
| `shell.navbar` | SHELL | 16 | 69 | `src/components/Navbar.jsx > Navbar` | 69 routes across the templates that list it (home, product-feature, solution, data-platform, industry, case-study-detail, content-hub-listing, filterable-card-grid, article, asset-landing, form-page, legal-prose, company-program, product-landing, pricing, champions). |
| `shell.mega-menu` | SHELL | 16 | 69 | `src/components/MegaMenu.jsx > MegaMenu` | 69 routes across the templates that list it (home, product-feature, solution, data-platform, industry, case-study-detail, content-hub-listing, filterable-card-grid, article, asset-landing, form-page, legal-prose, company-program, product-landing, pricing, champions). |
| `shell.mobile-drawer` | SHELL | 16 | 69 | `src/components/Navbar.jsx (Navbar.drawer)` | 69 routes across the templates that list it (home, product-feature, solution, data-platform, industry, case-study-detail, content-hub-listing, filterable-card-grid, article, asset-landing, form-page, legal-prose, company-program, product-landing, pricing, champions). |
| `shell.footer` | SHELL | 16 | 69 | `src/components/Footer.jsx > Footer` | 69 routes across the templates that list it (home, product-feature, solution, data-platform, industry, case-study-detail, content-hub-listing, filterable-card-grid, article, asset-landing, form-page, legal-prose, company-program, product-landing, pricing, champions). |
| `cta.closing-band` | CTA | 9 | 51 | `src/components/sections/CtaBand.jsx > CtaBand` | 51 routes across the templates that list it (product-feature, solution, data-platform, case-study-detail, content-hub-listing, filterable-card-grid, article, company-program, product-landing). |
| `features.card-grid` | FEATURES | 8 | 46 | `src/components/sections/Feat.jsx > Feat; homepage: src/components/WhyCards.jsx > WhyCards` | 46 routes across the templates that list it (home, product-feature, solution, data-platform, industry, form-page, company-program, product-landing). |
| `editorial.resource-cards` | EDITORIAL | 6 | 41 | `src/components/sections/Resources.jsx > Resources` | 41 routes across the templates that list it (product-feature, solution, data-platform, industry, company-program, product-landing). |
| `content.media-split` | CONTENT | 7 | 40 | `src/components/sections/Split.jsx > Split; homepage: src/components/DiagramSection.jsx > DiagramSection` | 40 routes across the templates that list it (home, product-feature, solution, data-platform, asset-landing, company-program, product-landing). |
| `hero.split` | HERO | 4 | 31 | `src/components/sections/HeroSplit.jsx > HeroSplit` | 31 routes across the templates that list it (product-feature, data-platform, company-program, product-landing). |
| `hero.center` | HERO | 5 | 30 | `src/components/sections/HeroCenter.jsx > HeroCenter; homepage: src/components/Hero.jsx > Hero` | 30 routes across the templates that list it (home, solution, industry, company-program, product-landing). |
| `social-proof.stats-bento` | SOCIAL_PROOF | 5 | 29 | `src/components/sections/Stats.jsx > Stats` | 29 routes across the templates that list it (solution, data-platform, industry, form-page, product-landing). |
| `social-proof.customer-tabs` | SOCIAL_PROOF | 4 | 26 | `src/components/sections/CustTabs.jsx > CustTabs` | 26 routes across the templates that list it (product-feature, solution, data-platform, product-landing). |
| `cta.gradient-card` | CTA | 4 | 26 | `src/components/sections/CtaCard.jsx > CtaCard` | 26 routes across the templates that list it (product-feature, solution, data-platform, product-landing). |
| `social-proof.quote-band` | SOCIAL_PROOF | 4 | 25 | `src/components/sections/QuoteBand.jsx > QuoteBand` | 25 routes across the templates that list it (product-feature, solution, industry, product-landing). |
| `features.checklist` | FEATURES | 3 | 24 | `src/components/sections/Checklist.jsx > Checklist` | 24 routes across the templates that list it (solution, company-program, product-landing). |
| `content.statement` | CONTENT | 4 | 21 | `src/components/sections/Statement.jsx > Statement; homepage: src/components/Statement.jsx > Statement` | 21 routes across the templates that list it (home, solution, data-platform, product-landing). |
| `features.tabs-dark` | FEATURES | 3 | 20 | `src/components/sections/TabsDark.jsx > TabsDark` | 20 routes across the templates that list it (product-feature, industry, product-landing). |
| `interactive.faq-accordion` | INTERACTIVE | 3 | 20 | `src/components/sections/Faq.jsx > Faq` | 20 routes across the templates that list it (company-program, product-landing, pricing). |
| `cta.dev-path-dialog` | CTA | 2 | 19 | `src/components/sections/DevModal.jsx > Dialog` | 19 routes across the templates that list it (company-program, product-landing). |
| `cta.community-band` | CTA | 5 | 18 | `src/components/CommunityCta.jsx > CommunityCta` | 18 routes across the templates that list it (home, solution, industry, content-hub-listing, article). |
| `social-proof.testimonial-slider` | SOCIAL_PROOF | 3 | 15 | `src/components/sections/TestiSlider.jsx > TestiSlider; homepage: src/components/Testimonials.jsx > Testimonials` | 15 routes across the templates that list it (home, industry, product-landing). |
| `social-proof.logo-bar` | SOCIAL_PROOF | 2 | 12 | `src/components/sections/LogoBar.jsx > LogoBar` | 12 routes across the templates that list it (asset-landing, product-landing). |
| `features.gradient-panel` | FEATURES | 2 | 10 | `src/components/FeaturePanel.jsx > FeaturePanel` | 10 routes across the templates that list it (home, product-landing). |
| `features.integration-tiles` | FEATURES | 2 | 10 | `src/components/Integrations.jsx > Integrations` | 10 routes across the templates that list it (home, product-landing). |
| `editorial.dark-news-strip` | EDITORIAL | 1 | 10 | `src/components/sections/NewsStrip.jsx > NewsStrip` | Only the company-program template (10 routes). |
| `editorial.community-bento` | EDITORIAL | 1 | 10 | `src/components/sections/BentoCommunity.jsx > BentoCommunity` | Only the company-program template (10 routes). |
| `interactive.course-tabs` | INTERACTIVE | 1 | 10 | `src/components/sections/CourseTabs.jsx > CourseTabs` | Only the company-program template (10 routes). |
| `interactive.photo-tabs` | INTERACTIVE | 1 | 10 | `src/components/sections/PhotoTabs.jsx > PhotoTabs` | Only the company-program template (10 routes). |
| `company.leadership-list` | COMPANY | 1 | 10 | `src/components/sections/Leaders.jsx > Leaders` | Only the company-program template (10 routes). |
| `company.people-grid` | COMPANY | 1 | 10 | `src/components/sections/Board.jsx > Board` | Only the company-program template (10 routes). |
| `company.role-list` | COMPANY | 1 | 10 | `src/components/sections/Jobs.jsx > Jobs` | Only the company-program template (10 routes). |
| `company.compliance-rows` | COMPANY | 1 | 10 | `src/components/sections/Compliance.jsx > Compliance` | Only the company-program template (10 routes). |
| `company.program-list` | COMPANY | 1 | 10 | `src/components/sections/CertList.jsx > CertList` | Only the company-program template (10 routes). |
| `features.integration-strip` | FEATURES | 1 | 9 | `src/components/sections/IntStrip.jsx > IntStrip` | Only the product-landing template (9 routes). |
| `interactive.install-tabs` | INTERACTIVE | 1 | 9 | `src/components/sections/Install.jsx > Install` | Only the product-landing template (9 routes). |
| `interactive.persona-tabs` | INTERACTIVE | 1 | 9 | `src/components/sections/PersonaTabs.jsx > PersonaTabs` | Only the product-landing template (9 routes). |
| `comparison.journey-columns` | COMPARISON | 1 | 9 | `src/components/sections/Journey.jsx > Journey` | Only the product-landing template (9 routes). |
| `comparison.compare-table` | COMPARISON | 1 | 9 | `src/components/sections/CompareTable.jsx > CompareTable` | Only the product-landing template (9 routes). |
| `listing.header` | LISTING | 2 | 7 | `src/components/listing/ListingHeader.jsx > ListingHeader` | 7 routes across the templates that list it (content-hub-listing, filterable-card-grid). |
| `form.form-header` | FORM | 2 | 7 | `src/components/form/FormHeader.jsx > FormHeader` | 7 routes across the templates that list it (asset-landing, form-page). |
| `features.tabs-light` | FEATURES | 1 | 5 | `src/components/sections/TabsLight.jsx > TabsLight` | Only the solution template (5 routes). |
| `article.guide-header` | ARTICLE | 1 | 4 | `src/components/article/GuideHeader.jsx > GuideHeader` | Only the article template (4 routes). |
| `article.story-header` | ARTICLE | 1 | 4 | `src/components/article/StoryHeader.jsx > StoryHeader` | Only the case-study-detail template (4 routes). |
| `listing.event-grid` | LISTING | 1 | 4 | `src/components/listing/Listings.jsx > EventsListing` | Only the filterable-card-grid template (4 routes). |
| `article.progress-bar` | ARTICLE | 1 | 4 | `src/components/article/StickyRail.jsx > ProgressBar` | Only the article template (4 routes). |
| `listing.session-grid` | LISTING | 1 | 4 | `src/components/listing/Listings.jsx > OnDemandListing` | Only the filterable-card-grid template (4 routes). |
| `listing.case-grid` | LISTING | 1 | 4 | `src/components/listing/Listings.jsx > CaseStudiesListing` | Only the filterable-card-grid template (4 routes). |
| `article.guide-body` | ARTICLE | 1 | 4 | `src/components/article/ArticleBody.jsx > GuideBody` | Only the article template (4 routes). |
| `article.story-body` | ARTICLE | 1 | 4 | `src/components/article/StorySections.jsx > StoryBody` | Only the case-study-detail template (4 routes). |
| `listing.press-grid` | LISTING | 1 | 4 | `src/components/listing/Listings.jsx > PressGrid` | Only the filterable-card-grid template (4 routes). |
| `listing.latest-posts` | LISTING | 1 | 4 | `src/components/listing/Listings.jsx > LatestPosts` | Only the article template (4 routes). |
| `article.post-body` | ARTICLE | 1 | 4 | `src/components/article/ArticleBody.jsx > PostBody` | Only the article template (4 routes). |
| `article.related-stories` | ARTICLE | 1 | 4 | `src/components/article/StorySections.jsx > RelatedStories` | Only the case-study-detail template (4 routes). |
| `listing.category-nav` | LISTING | 1 | 3 | `src/components/listing/CategoryNav.jsx > CategoryNav` | Only the content-hub-listing template (3 routes). |
| `legal.policy-header` | LEGAL | 1 | 3 | `src/components/legal/Policy.jsx > PolicyHeader` | Only the legal-prose template (3 routes). |
| `listing.hub-grid` | LISTING | 1 | 3 | `src/components/listing/Listings.jsx > HubListing` | Only the content-hub-listing template (3 routes). |
| `legal.policy-body` | LEGAL | 1 | 3 | `src/components/legal/Policy.jsx > PolicyBody` | Only the legal-prose template (3 routes). |
| `shell.event-subnav` | SHELL | 1 | 1 | `src/components/chrome/EventChrome.jsx > EventNav` | Only the event-microsite template (1 route). |
| `shell.minimal-nav` | SHELL | 1 | 1 | `src/components/chrome/MinimalNav.jsx > MinimalNav` | Only the partner-directory template (1 route). |
| `hero.champions-dark` | HERO | 1 | 1 | `src/components/oneoffs/champions/Champions.jsx > ChampHero` | Only the champions template (1 route). |
| `hero.event` | HERO | 1 | 1 | `src/components/oneoffs/summit/Summit.jsx > EventHero` | Only the event-microsite template (1 route). |
| `social-proof.logo-marquee` | SOCIAL_PROOF | 1 | 1 | `src/components/LogoMarquee.jsx > LogoMarquee` | Only the home template (1 route). |
| `cta.ide-card` | CTA | 1 | 1 | `src/components/IdeCard.jsx > IdeCard` | Only the home template (1 route). |
| `cta.champions-closing` | CTA | 1 | 1 | `src/components/oneoffs/champions/Champions.jsx > ChampClosing` | Only the champions template (1 route). |
| `editorial.news-band` | EDITORIAL | 1 | 1 | `src/components/NewsBand.jsx > NewsBand` | Only the home template (1 route). |
| `comparison.plan-matrix` | COMPARISON | 1 | 1 | `src/components/oneoffs/pricing/Pricing.jsx > PlanMatrix` | Only the pricing template (1 route). |
| `pricing.plan-cards` | PRICING | 1 | 1 | `src/components/oneoffs/pricing/Pricing.jsx > PlanCards` | Only the pricing template (1 route). |
| `pricing.add-ons` | PRICING | 1 | 1 | `src/components/oneoffs/pricing/Pricing.jsx > AddOns` | Only the pricing template (1 route). |
| `community.about-band` | COMMUNITY | 1 | 1 | `src/components/oneoffs/champions/Champions.jsx > ChampAbout` | Only the champions template (1 route). |
| `community.member-grid` | COMMUNITY | 1 | 1 | `src/components/oneoffs/champions/Champions.jsx > ChampMembers` | Only the champions template (1 route). |
| `event.photo-gallery` | EVENT | 1 | 1 | `src/components/oneoffs/summit/Summit.jsx > EventMarquee` | Only the event-microsite template (1 route). |
| `event.recap` | EVENT | 1 | 1 | `src/components/oneoffs/summit/Summit.jsx > EventRecap` | Only the event-microsite template (1 route). |
| `event.sponsor-logos` | EVENT | 1 | 1 | `src/components/oneoffs/summit/Summit.jsx > EventSponsors` | Only the event-microsite template (1 route). |
| `event.closing-band` | EVENT | 1 | 1 | `src/components/oneoffs/summit/Summit.jsx > EventClosing` | Only the event-microsite template (1 route). |
| `community.story-slider` | COMMUNITY | 1 | 1 | `src/components/oneoffs/champions/Champions.jsx > ChampStories` | Only the champions template (1 route). |
| `community.icon-cards` | COMMUNITY | 1 | 1 | `src/components/oneoffs/champions/Champions.jsx > ChampItems` | Only the champions template (1 route). |
| `directory.header` | DIRECTORY | 1 | 1 | `src/components/oneoffs/directory/Directory.jsx > DirHeader` | Only the partner-directory template (1 route). |
| `directory.partner-locator` | DIRECTORY | 1 | 1 | `src/components/oneoffs/directory/Directory.jsx > Directory` | Only the partner-directory template (1 route). |
| `event.photo-band` | EVENT | 1 | 1 | `src/components/oneoffs/summit/Summit.jsx > EventMedia` | Only the event-microsite template (1 route). |
| `shell.event-footer` | SHELL | 1 | 1 | `src/components/chrome/EventChrome.jsx > EventFooter` | Only the event-microsite template (1 route). |
| `community.dark-quote` | COMMUNITY | 1 | 1 | `src/components/oneoffs/champions/Champions.jsx > ChampQuote` | Only the champions template (1 route). |
| `event.highlight-rows` | EVENT | 1 | 1 | `src/components/oneoffs/summit/Summit.jsx > EventRows` | Only the event-microsite template (1 route). |
| `event.quote-band` | EVENT | 1 | 1 | `src/components/oneoffs/summit/Summit.jsx > EventQuote` | Only the event-microsite template (1 route). |

**27 shared sections** appear in more than one template and belong in a component library.

**57 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### T0 Homepage [implemented] — `T0`

1 route · `/` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×16 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | HERO | `hero.center` | shared ×5 |
| 6 | SOCIAL_PROOF | `social-proof.logo-marquee` | page-local |
| 7 | EDITORIAL | `editorial.news-band` | page-local |
| 8 | CONTENT | `content.statement` | shared ×4 |
| 9 | FEATURES | `features.gradient-panel` | shared ×2 |
| 10 | FEATURES | `features.integration-tiles` | shared ×2 |
| 11 | FEATURES | `features.card-grid` | shared ×8 |
| 12 | CONTENT | `content.media-split` | shared ×7 |
| 13 | CTA | `cta.ide-card` | page-local |
| 14 | SOCIAL_PROOF | `social-proof.testimonial-slider` | shared ×3 |
| 15 | CTA | `cta.community-band` | shared ×5 |
| 16 | SHELL | `shell.footer` | shared ×16 |

### T1 Product feature page [implemented] — `T1`

6 routes · `/product/develop`, `/product/test-and-observe`, `/product/mesh`, `/product/catalog`, `/product/deploy`, `/product/semantic-layer` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×16 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | HERO | `hero.split` | shared ×4 |
| 6 | CONTENT | `content.media-split` | shared ×7 |
| 7 | FEATURES | `features.card-grid` | shared ×8 |
| 8 | FEATURES | `features.tabs-dark` | shared ×3 |
| 9 | CTA | `cta.gradient-card` | shared ×4 |
| 10 | SOCIAL_PROOF | `social-proof.quote-band` | shared ×4 |
| 11 | SOCIAL_PROOF | `social-proof.customer-tabs` | shared ×4 |
| 12 | EDITORIAL | `editorial.resource-cards` | shared ×6 |
| 13 | CTA | `cta.closing-band` | shared ×9 |
| 14 | SHELL | `shell.footer` | shared ×16 |

### T2 Solution / use-case page [implemented] — `T2`

5 routes · `/product/ai`, `/product/embedded-analytics`, `/product/data-modernization`, `/product/data-trust`, `/product/cost-optimization` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×16 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | HERO | `hero.center` | shared ×5 |
| 6 | CONTENT | `content.statement` | shared ×4 |
| 7 | FEATURES | `features.checklist` | shared ×3 |
| 8 | FEATURES | `features.card-grid` | shared ×8 |
| 9 | FEATURES | `features.tabs-light` | page-local |
| 10 | SOCIAL_PROOF | `social-proof.quote-band` | shared ×4 |
| 11 | CONTENT | `content.media-split` | shared ×7 |
| 12 | SOCIAL_PROOF | `social-proof.customer-tabs` | shared ×4 |
| 13 | CTA | `cta.community-band` | shared ×5 |
| 14 | CTA | `cta.gradient-card` | shared ×4 |
| 15 | EDITORIAL | `editorial.resource-cards` | shared ×6 |
| 16 | SOCIAL_PROOF | `social-proof.stats-bento` | shared ×5 |
| 17 | CTA | `cta.closing-band` | shared ×9 |
| 18 | SHELL | `shell.footer` | shared ×16 |

### T3 Data-platform partner page [implemented] — `T3`

6 routes · `/data-platforms/northwind`, `/data-platforms/quarry`, `/data-platforms/helixa`, `/data-platforms/stratus`, `/data-platforms/driftway`, `/data-platforms/cobalt` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×16 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | HERO | `hero.split` | shared ×4 |
| 6 | FEATURES | `features.card-grid` | shared ×8 |
| 7 | CONTENT | `content.media-split` | shared ×7 |
| 8 | CONTENT | `content.statement` | shared ×4 |
| 9 | CTA | `cta.gradient-card` | shared ×4 |
| 10 | SOCIAL_PROOF | `social-proof.customer-tabs` | shared ×4 |
| 11 | EDITORIAL | `editorial.resource-cards` | shared ×6 |
| 12 | SOCIAL_PROOF | `social-proof.stats-bento` | shared ×5 |
| 13 | CTA | `cta.closing-band` | shared ×9 |
| 14 | SHELL | `shell.footer` | shared ×16 |

### T4 Industry page [implemented] — `T4`

5 routes · `/industry/financial-services`, `/industry/healthcare`, `/industry/manufacturing`, `/industry/energy-utilities`, `/industry/telecommunications` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×16 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | HERO | `hero.center` | shared ×5 |
| 6 | FEATURES | `features.card-grid` | shared ×8 |
| 7 | SOCIAL_PROOF | `social-proof.quote-band` | shared ×4 |
| 8 | FEATURES | `features.tabs-dark` | shared ×3 |
| 9 | SOCIAL_PROOF | `social-proof.testimonial-slider` | shared ×3 |
| 10 | EDITORIAL | `editorial.resource-cards` | shared ×6 |
| 11 | SOCIAL_PROOF | `social-proof.stats-bento` | shared ×5 |
| 12 | CTA | `cta.community-band` | shared ×5 |
| 13 | SHELL | `shell.footer` | shared ×16 |

### T5 Case-study detail [implemented] — `T5`

4 routes · `/case-studies/kestrel`, `/case-studies/meridian-partners`, `/case-studies/halcyon`, `/case-studies/basalt-health` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×16 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | ARTICLE | `article.story-header` | page-local |
| 6 | ARTICLE | `article.story-body` | page-local |
| 7 | ARTICLE | `article.related-stories` | page-local |
| 8 | CTA | `cta.closing-band` | shared ×9 |
| 9 | SHELL | `shell.footer` | shared ×16 |

### T6 Content hub listing with category nav [implemented] — `T6`

3 routes · `/blog`, `/resources/webinars`, `/resources` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×16 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | LISTING | `listing.header` | shared ×2 |
| 6 | LISTING | `listing.category-nav` | page-local |
| 7 | LISTING | `listing.hub-grid` | page-local |
| 8 | CTA | `cta.closing-band` | shared ×9 |
| 9 | CTA | `cta.community-band` | shared ×5 |
| 10 | SHELL | `shell.footer` | shared ×16 |

### T7 Filterable card grid listing [implemented] — `T7`

4 routes · `/case-studies`, `/resources/on-demand`, `/events`, `/press` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×16 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | LISTING | `listing.header` | shared ×2 |
| 6 | LISTING | `listing.press-grid` | page-local |
| 7 | LISTING | `listing.event-grid` | page-local |
| 8 | LISTING | `listing.session-grid` | page-local |
| 9 | LISTING | `listing.case-grid` | page-local |
| 10 | CTA | `cta.closing-band` | shared ×9 |
| 11 | SHELL | `shell.footer` | shared ×16 |

### T8 Article / long-form with sticky rail [implemented] — `T8`

4 routes · `/resources/analytics-lifecycle`, `/resources/state-of-data-teams`, `/blog/summit-announcements`, `/blog/lattice-joins-northwind` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×16 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | ARTICLE | `article.progress-bar` | page-local |
| 6 | ARTICLE | `article.post-body` | page-local |
| 7 | LISTING | `listing.latest-posts` | page-local |
| 8 | ARTICLE | `article.guide-header` | page-local |
| 9 | ARTICLE | `article.guide-body` | page-local |
| 10 | CTA | `cta.community-band` | shared ×5 |
| 11 | CTA | `cta.closing-band` | shared ×9 |
| 12 | SHELL | `shell.footer` | shared ×16 |

### T9 Asset / webinar landing [implemented] — `T9`

3 routes · `/resources/webinars/launch-showcase`, `/resources/whitepaper-control-plane`, `/resources/webinars/charts-as-code` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×16 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | FORM | `form.form-header` | shared ×2 |
| 6 | SOCIAL_PROOF | `social-proof.logo-bar` | shared ×2 |
| 7 | CONTENT | `content.media-split` | shared ×7 |
| 8 | SHELL | `shell.footer` | shared ×16 |

### T10 Form page [implemented] — `T10`

4 routes · `/contact`, `/signup`, `/community/join`, `/report-a-problem` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×16 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | FORM | `form.form-header` | shared ×2 |
| 6 | FEATURES | `features.card-grid` | shared ×8 |
| 7 | SOCIAL_PROOF | `social-proof.stats-bento` | shared ×5 |
| 8 | SHELL | `shell.footer` | shared ×16 |

### T11 Legal / policy prose [implemented] — `T11`

3 routes · `/modern-slavery-statement`, `/terms-of-use`, `/legal/ai-principles` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×16 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | LEGAL | `legal.policy-header` | page-local |
| 6 | LEGAL | `legal.policy-body` | page-local |
| 7 | SHELL | `shell.footer` | shared ×16 |

### T12 Company / program page [implemented] — `T12`

10 routes · `/security`, `/certification`, `/learn`, `/community`, `/about-us`, `/about-us/values`, `/about-us/careers`, `/about-us/belonging`, `/partners`, `/services` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×16 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | HERO | `hero.center` | shared ×5 |
| 6 | FEATURES | `features.checklist` | shared ×3 |
| 7 | HERO | `hero.split` | shared ×4 |
| 8 | EDITORIAL | `editorial.dark-news-strip` | page-local |
| 9 | FEATURES | `features.card-grid` | shared ×8 |
| 10 | COMPANY | `company.role-list` | page-local |
| 11 | COMPANY | `company.leadership-list` | page-local |
| 12 | COMPANY | `company.people-grid` | page-local |
| 13 | EDITORIAL | `editorial.community-bento` | page-local |
| 14 | INTERACTIVE | `interactive.course-tabs` | page-local |
| 15 | COMPANY | `company.program-list` | page-local |
| 16 | CONTENT | `content.media-split` | shared ×7 |
| 17 | EDITORIAL | `editorial.resource-cards` | shared ×6 |
| 18 | COMPANY | `company.compliance-rows` | page-local |
| 19 | INTERACTIVE | `interactive.faq-accordion` | shared ×3 |
| 20 | CTA | `cta.closing-band` | shared ×9 |
| 21 | INTERACTIVE | `interactive.photo-tabs` | page-local |
| 22 | CTA | `cta.dev-path-dialog` | shared ×2 |
| 23 | SHELL | `shell.footer` | shared ×16 |

### T13 Product landing (bespoke composition) [implemented] — `T13`

9 routes · `/product/what-is-lattice`, `/product/lattice`, `/product/state`, `/product/assistant`, `/product/charts`, `/product/governance`, `/product/integrations`, `/product/analyst`, `/product/self-hosted-vs-platform` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×16 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | HERO | `hero.split` | shared ×4 |
| 6 | INTERACTIVE | `interactive.install-tabs` | page-local |
| 7 | HERO | `hero.center` | shared ×5 |
| 8 | FEATURES | `features.card-grid` | shared ×8 |
| 9 | COMPARISON | `comparison.journey-columns` | page-local |
| 10 | INTERACTIVE | `interactive.persona-tabs` | page-local |
| 11 | CTA | `cta.gradient-card` | shared ×4 |
| 12 | SOCIAL_PROOF | `social-proof.quote-band` | shared ×4 |
| 13 | SOCIAL_PROOF | `social-proof.testimonial-slider` | shared ×3 |
| 14 | FEATURES | `features.integration-tiles` | shared ×2 |
| 15 | CONTENT | `content.statement` | shared ×4 |
| 16 | COMPARISON | `comparison.compare-table` | page-local |
| 17 | FEATURES | `features.gradient-panel` | shared ×2 |
| 18 | INTERACTIVE | `interactive.faq-accordion` | shared ×3 |
| 19 | FEATURES | `features.tabs-dark` | shared ×3 |
| 20 | CONTENT | `content.media-split` | shared ×7 |
| 21 | FEATURES | `features.checklist` | shared ×3 |
| 22 | SOCIAL_PROOF | `social-proof.customer-tabs` | shared ×4 |
| 23 | SOCIAL_PROOF | `social-proof.logo-bar` | shared ×2 |
| 24 | EDITORIAL | `editorial.resource-cards` | shared ×6 |
| 25 | CTA | `cta.dev-path-dialog` | shared ×2 |
| 26 | FEATURES | `features.integration-strip` | page-local |
| 27 | CTA | `cta.closing-band` | shared ×9 |
| 28 | SOCIAL_PROOF | `social-proof.stats-bento` | shared ×5 |
| 29 | SHELL | `shell.footer` | shared ×16 |

### T14 Pricing [implemented] — `T14`

1 route · `/pricing` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×16 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | PRICING | `pricing.plan-cards` | page-local |
| 6 | PRICING | `pricing.add-ons` | page-local |
| 7 | COMPARISON | `comparison.plan-matrix` | page-local |
| 8 | INTERACTIVE | `interactive.faq-accordion` | shared ×3 |
| 9 | SHELL | `shell.footer` | shared ×16 |

### T15 Community champions (dark bands) [implemented] — `T15`

1 route · `/champions` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.announcement-bar` | shared ×16 |
| 2 | SHELL | `shell.navbar` | shared ×16 |
| 3 | SHELL | `shell.mega-menu` | shared ×16 |
| 4 | SHELL | `shell.mobile-drawer` | shared ×16 |
| 5 | HERO | `hero.champions-dark` | page-local |
| 6 | COMMUNITY | `community.about-band` | page-local |
| 7 | COMMUNITY | `community.member-grid` | page-local |
| 8 | COMMUNITY | `community.icon-cards` | page-local |
| 9 | COMMUNITY | `community.dark-quote` | page-local |
| 10 | COMMUNITY | `community.story-slider` | page-local |
| 11 | CTA | `cta.champions-closing` | page-local |
| 12 | SHELL | `shell.footer` | shared ×16 |

### T16 Event microsite [implemented] — `T16`

1 route · `/summit` · chrome: **event-subnav**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.event-subnav` | page-local |
| 2 | HERO | `hero.event` | page-local |
| 3 | EVENT | `event.photo-gallery` | page-local |
| 4 | EVENT | `event.recap` | page-local |
| 5 | EVENT | `event.highlight-rows` | page-local |
| 6 | EVENT | `event.sponsor-logos` | page-local |
| 7 | EVENT | `event.photo-band` | page-local |
| 8 | EVENT | `event.quote-band` | page-local |
| 9 | EVENT | `event.closing-band` | page-local |
| 10 | SHELL | `shell.event-footer` | page-local |

### T17 Partner directory [implemented] — `T17`

1 route · `/partner-directory` · chrome: **none**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.minimal-nav` | page-local |
| 2 | DIRECTORY | `directory.header` | page-local |
| 3 | DIRECTORY | `directory.partner-locator` | page-local |

## Section reference

### SHELL

_Site chrome rendered outside <main>: announcement strip, navigation, menus, footer, and the reduced navs that replace them on two one-off pages._

**`shell.announcement-bar`** — Rotating one-line announcement strip above the navigation: linked slides with previous/next arrows, autoplaying; hidden below 1024px. (runtime UI: retrieval-ineligible in the design-repo)

· 69 routes across the templates that list it (home, product-feature, solution, data-platform, industry, case-study-detail, content-hub-listing, filterable-card-grid, article, asset-landing, form-page, legal-prose, company-program, product-landing, pricing, champions). · appears on 69 routes · implemented by `src/components/AnnouncementBar.jsx > AnnouncementBar`

**`shell.navbar`** — Sticky global navigation: brand mark, mega-menu triggers plus one plain link, search, secondary and primary CTAs and an account button on desktop; logo, search and hamburger below 1024px.

· 69 routes across the templates that list it (home, product-feature, solution, data-platform, industry, case-study-detail, content-hub-listing, filterable-card-grid, article, asset-landing, form-page, legal-prose, company-program, product-landing, pricing, champions). · appears on 69 routes · implemented by `src/components/Navbar.jsx > Navbar`

**`shell.mega-menu`** — Popover card opened from each navbar trigger: two groups of icon + title + description items, an optional featured item with thumbnail, a grey side column of links and a coloured footer strip. (runtime UI: retrieval-ineligible in the design-repo)

· 69 routes across the templates that list it (home, product-feature, solution, data-platform, industry, case-study-detail, content-hub-listing, filterable-card-grid, article, asset-landing, form-page, legal-prose, company-program, product-landing, pricing, champions). · appears on 69 routes · implemented by `src/components/MegaMenu.jsx > MegaMenu`

**`shell.mobile-drawer`** — Below 1024px: full-height drawer listing the menu categories with a drill-down sub-level and Back control, the plain link and account links, and a fixed bottom bar holding the two nav CTAs. (runtime UI: retrieval-ineligible in the design-repo)

· 69 routes across the templates that list it (home, product-feature, solution, data-platform, industry, case-study-detail, content-hub-listing, filterable-card-grid, article, asset-landing, form-page, legal-prose, company-program, product-landing, pricing, champions). · appears on 69 routes · implemented by `src/components/Navbar.jsx (Navbar.drawer)`

**`shell.event-subnav`** — Chrome 'event' (route /summit): replaces the global announcement bar, navbar and mega-menu. Event logo lockup, two columns of links and a call-to-action; above 1024 an 80px sticky panel, below 1024 a fixed bar with a black burger and an instant dropdown.

· Only the event-microsite template (1 route). · appears on 1 routes · implemented by `src/components/chrome/EventChrome.jsx > EventNav`

**`shell.minimal-nav`** — Chrome 'none' (route /partner-directory): logo left and one 'Home' link right in a 64px static bar; no announcement bar, no mega-menu and no footer.

· Only the partner-directory template (1 route). · appears on 1 routes · implemented by `src/components/chrome/MinimalNav.jsx > MinimalNav`

**`shell.footer`** — Dark footer: light brand mark, link columns (one link with a badge), newsletter block, region select, social icons, copyright with legal links and a cookie-preferences button.

· 69 routes across the templates that list it (home, product-feature, solution, data-platform, industry, case-study-detail, content-hub-listing, filterable-card-grid, article, asset-landing, form-page, legal-prose, company-program, product-landing, pricing, champions). · appears on 69 routes · implemented by `src/components/Footer.jsx > Footer`

**`shell.event-footer`** — Chrome 'event': replaces the global footer. Giant event wordmark with a link block overlaid at >=768, a pixel-tile strip (dither, heat band, checker) and a citron tagline/copyright bar.

· Only the event-microsite template (1 route). · appears on 1 routes · implemented by `src/components/chrome/EventChrome.jsx > EventFooter`

### HERO

_The page-opening header block that holds the page's H1._

**`hero.center`** — Page-opening centred header: optional eyebrow, H1 (stacked lines allowed), lead, 1-2 large buttons, optional highlight row, and an optional image, poster or illustration below; brush stroke behind.

· 30 routes across the templates that list it (home, solution, industry, company-program, product-landing). · appears on 30 routes · implemented by `src/components/sections/HeroCenter.jsx > HeroCenter; homepage: src/components/Hero.jsx > Hero`

**`hero.split`** — Two-column page header: H1, lead and one or two large buttons on the left, rounded image / video poster / illustration on the right (6/6 or 7/5), optional tag chip or product lockup above the H1; padded or flush-bottom; brush stroke behind.

· 31 routes across the templates that list it (product-feature, data-platform, company-program, product-landing). · appears on 31 routes · implemented by `src/components/sections/HeroSplit.jsx > HeroSplit`

**`hero.champions-dark`** — Dark (ink-950) hero of the community-program page: program wordmark, H1, two dark buttons and a chamfered photo; five concentric chamfered outlines behind scale with scroll.

· Only the champions template (1 route). · appears on 1 routes · implemented by `src/components/oneoffs/champions/Champions.jsx > ChampHero`

**`hero.event`** — White event hero tucked under the event nav: giant display H1, lead and one orange button, with two illustrated portraits at the sides (>=1024) or under the content as two tiles (<1024).

· Only the event-microsite template (1 route). · appears on 1 routes · implemented by `src/components/oneoffs/summit/Summit.jsx > EventHero`

### SOCIAL_PROOF

_Customer evidence: logos, quotes, customer stories, stat bands._

**`social-proof.logo-marquee`** — Infinite horizontal marquee of customer wordmarks that overlaps the bottom edge of the hero.

· Only the home template (1 route). · appears on 1 routes · implemented by `src/components/LogoMarquee.jsx > LogoMarquee`

**`social-proof.logo-bar`** — Static 'trusted by' row: centred small heading above a single wrapping row of about six customer wordmarks; no motion (distinct from the homepage marquee).

· 12 routes across the templates that list it (asset-landing, product-landing). · appears on 12 routes · implemented by `src/components/sections/LogoBar.jsx > LogoBar`

**`social-proof.customer-tabs`** — Heading and paragraph, a left-aligned tab row of customer names, and per tab a logo, headline, optional summary, button, a quote card and two stat cards.

· 26 routes across the templates that list it (product-feature, solution, data-platform, product-landing). · appears on 26 routes · implemented by `src/components/sections/CustTabs.jsx > CustTabs`

**`social-proof.quote-band`** — One bordered blur card holding a customer quote (icon, optional logo, 24/32 quote, attribution), or a 1-per-view slider of quotes; optional brush stroke or soft colour wash behind.

· 25 routes across the templates that list it (product-feature, solution, industry, product-landing). · appears on 25 routes · implemented by `src/components/sections/QuoteBand.jsx > QuoteBand`

**`social-proof.testimonial-slider`** — Header column (heading-2, body, optional button) beside a slider of quote or metric cards (logo, quote/metric, text link).

· 15 routes across the templates that list it (home, industry, product-landing). · appears on 15 routes · implemented by `src/components/sections/TestiSlider.jsx > TestiSlider; homepage: src/components/Testimonials.jsx > Testimonials`

**`social-proof.stats-bento`** — Dark 'trusted at scale' band: optional eyebrow, heading, and four blur-dark cards in an alternating 7+5 / 5+7 bento, each with eyebrow, stat heading, body and an optional image or logo-tile row.

· 29 routes across the templates that list it (solution, data-platform, industry, form-page, product-landing). · appears on 29 routes · implemented by `src/components/sections/Stats.jsx > Stats`

### FEATURES

_Product and capability explanation: card grids, checklists, tabbed showcases, gradient panels, integration blocks._

**`features.gradient-panel`** — Rounded gradient panel (grain overlay) with eyebrow, heading-3, body and a primary.dark button beside a product media image flush to the panel edge; alternates sides. The homepage and the assistant page use the same component.

· 10 routes across the templates that list it (home, product-landing). · appears on 10 routes · implemented by `src/components/FeaturePanel.jsx > FeaturePanel`

**`features.integration-tiles`** — Integrations block: eyebrow, heading-2, body and a button (5 cols) beside a 2-column grid of bordered platform tiles (logo + name) that link to platform or integration pages.

· 10 routes across the templates that list it (home, product-landing). · appears on 10 routes · implemented by `src/components/Integrations.jsx > Integrations`

**`features.integration-strip`** — Centred grey kicker and heading above a single wrapping row of square icon-only integration tiles and one button; tiles darken their border on hover.

· Only the product-landing template (9 routes). · appears on 9 routes · implemented by `src/components/sections/IntStrip.jsx > IntStrip`

**`features.card-grid`** — Section header (eyebrow, heading-2, paragraph, optional buttons or lockup) above a 3- or 4-column grid of feature cards (icon, image, stat, logo or bordered cards), light or dark, optionally washed or with a brush stroke behind.

· 46 routes across the templates that list it (home, product-feature, solution, data-platform, industry, form-page, company-program, product-landing). · appears on 46 routes · implemented by `src/components/sections/Feat.jsx > Feat; homepage: src/components/WhyCards.jsx > WhyCards`

**`features.checklist`** — Icon checklist of capabilities/benefits: two columns of titled items, a split with an image, a before/after pair, or a 3-column grid.

· 24 routes across the templates that list it (solution, company-program, product-landing). · appears on 24 routes · implemented by `src/components/sections/Checklist.jsx > Checklist`

**`features.tabs-dark`** — Dark band: heading (+ optional paragraph) and a vertical tablist where the active tab expands its description, beside that tab's media in a blur-dark frame; brush stroke behind.

· 20 routes across the templates that list it (product-feature, industry, product-landing). · appears on 20 routes · implemented by `src/components/sections/TabsDark.jsx > TabsDark`

**`features.tabs-light`** — Light centred tab row with an underline on the active tab; each tab shows a short description and one square image.

· Only the solution template (5 routes). · appears on 5 routes · implemented by `src/components/sections/TabsLight.jsx > TabsLight`

### CONTENT

_General text-and-media rows that are neither a feature grid nor proof: statements and media splits._

**`content.statement`** — Centred heading (+ paragraph) in an 832px column; T3 adds a diagram or a 16:9 video poster below. Homepage 'line' variant is a single heading-3 sentence.

· 21 routes across the templates that list it (home, solution, data-platform, product-landing). · appears on 21 routes · implemented by `src/components/sections/Statement.jsx > Statement; homepage: src/components/Statement.jsx > Statement`

**`content.media-split`** — Two-column row: eyebrow, heading-2, 1-2 paragraphs (optional bullets) and buttons beside an image, diagram or video poster.

· 40 routes across the templates that list it (home, product-feature, solution, data-platform, asset-landing, company-program, product-landing). · appears on 40 routes · implemented by `src/components/sections/Split.jsx > Split; homepage: src/components/DiagramSection.jsx > DiagramSection`

### CTA

_Conversion blocks: gradient cards, closing bands, install prompts, and the dialog some hero buttons open._

**`cta.ide-card`** — One clickable gradient card: heading and paragraph beside a two-by-two grid of white tiles naming editor/install options.

· Only the home template (1 route). · appears on 1 routes · implemented by `src/components/IdeCard.jsx > IdeCard`

**`cta.gradient-card`** — Mid-page conversion card on a warm gradient with grain: heading, paragraph, a dark primary button and an optional dark tertiary button.

· 26 routes across the templates that list it (product-feature, solution, data-platform, product-landing). · appears on 26 routes · implemented by `src/components/sections/CtaCard.jsx > CtaCard`

**`cta.closing-band`** — Blue gradient-12 band with concentric circles: heading-2, paragraph, primary.dark + secondary.dark large buttons; optional right column with heading-4, paragraph and arrow link.

· 51 routes across the templates that list it (product-feature, solution, data-platform, case-study-detail, content-hub-listing, filterable-card-grid, article, company-program, product-landing). · appears on 51 routes · implemented by `src/components/sections/CtaBand.jsx > CtaBand`

**`cta.community-band`** — Long blue gradient band: eyebrow, heading, body, two dark buttons, and a right column of two or three stat blocks behind a hairline divider.

· 18 routes across the templates that list it (home, solution, industry, content-hub-listing, article). · appears on 18 routes · implemented by `src/components/CommunityCta.jsx > CommunityCta`

**`cta.dev-path-dialog`** — Modal that lets a visitor choose how to start: heading-2 and 3 rows (heading-4, paragraph, secondary button). Opened by any action with opensDialog (hero buttons on /product/lattice, /product/governance, /security, /product/integrations); the dialog takes focus, Escape and overlay-click close, focus returns to the trigger. (runtime UI: retrieval-ineligible in the design-repo)

· 19 routes across the templates that list it (company-program, product-landing). · appears on 19 routes · implemented by `src/components/sections/DevModal.jsx > Dialog`

**`cta.champions-closing`** — Half orange (#fe6703) and half white closing split: eyebrow, heading-2, body and a dark button on the orange half, a check-list on the white half with an orange corner triangle. Not a dark band.

· Only the champions template (1 route). · appears on 1 routes · implemented by `src/components/oneoffs/champions/Champions.jsx > ChampClosing`

### EDITORIAL

_News, announcements and links out to resources or community content._

**`editorial.news-band`** — Dark band with a co-brand lockup, one news headline and a read-more link.

· Only the home template (1 route). · appears on 1 routes · implemented by `src/components/NewsBand.jsx > NewsBand`

**`editorial.dark-news-strip`** — Dark announcement strip (py 40): purple eyebrow, heading-3-styled h2 and paragraph beside a secondary.dark large button. No lockup.

· Only the company-program template (10 routes). · appears on 10 routes · implemented by `src/components/sections/NewsStrip.jsx > NewsStrip`

**`editorial.resource-cards`** — Header (eyebrow, heading, optional paragraph) above two to four resource / story / post cards: 16:9 image link, optional tag chip, title link, optional paragraph or byline.

· 41 routes across the templates that list it (product-feature, solution, data-platform, industry, company-program, product-landing). · appears on 41 routes · implemented by `src/components/sections/Resources.jsx > Resources`

**`editorial.community-bento`** — Dark 'what is new' bento on #030711: spotlight card (text + square image), member quote card, next-meetup card, trending-topics card and photo-of-the-week card; idle brush stroke behind.

· Only the company-program template (10 routes). · appears on 10 routes · implemented by `src/components/sections/BentoCommunity.jsx > BentoCommunity`

### INTERACTIVE

_Disclosure and tab widgets whose main job is switching or expanding content (accordions and content-specific tab sets)._

**`interactive.faq-accordion`** — Centred heading-2 and optional paragraph above independent accordion items (question 24/28.8, plus/minus glyph). Items open and close instantly with aria-expanded.

· 20 routes across the templates that list it (company-program, product-landing, pricing). · appears on 20 routes · implemented by `src/components/sections/Faq.jsx > Faq`

**`interactive.course-tabs`** — Left column (eyebrow, heading-2, paragraph, primary button) beside flex-grow light tabs; the active panel lists course cards (16:9 image, tag chip + duration, heading-4, paragraph, chevron link).

· Only the company-program template (10 routes). · appears on 10 routes · implemented by `src/components/sections/CourseTabs.jsx > CourseTabs`

**`interactive.photo-tabs`** — Header (eyebrow, heading-2, paragraph, primary button), six flex-grow light tabs and a 2-column mosaic of six square photos per tab.

· Only the company-program template (10 routes). · appears on 10 routes · implemented by `src/components/sections/PhotoTabs.jsx > PhotoTabs`

**`interactive.install-tabs`** — 1036-column header (eyebrow or heading-2 + paragraph with inline links), two centred light tabs and a card holding a mono command row with a copy button.

· Only the product-landing template (9 routes). · appears on 9 routes · implemented by `src/components/sections/Install.jsx > Install`

**`interactive.persona-tabs`** — Three centred light tabs with 24px icons; each panel is two bordered cards (before / after chip, heading-4, 4-item bullet list).

· Only the product-landing template (9 routes). · appears on 9 routes · implemented by `src/components/sections/PersonaTabs.jsx > PersonaTabs`

### LISTING

_Collection and directory pages: listing headers, category navigation, filters, card grids._

**`listing.header`** — Page-opening header of a listing page: H1 with an optional eyebrow and lead. The opener of listing templates; classified LISTING, not HERO.

· 7 routes across the templates that list it (content-hub-listing, filterable-card-grid). · appears on 7 routes · implemented by `src/components/listing/ListingHeader.jsx > ListingHeader`

**`listing.category-nav`** — Sticky (top 0, z 50) blurred bar: search field (3/12) and category pills (8/12, pushed right at >=1024); a 1px bottom border appears only while stuck (>=768). The search is inert, as on the source. (runtime UI: retrieval-ineligible in the design-repo)

· Only the content-hub-listing template (3 routes). · appears on 3 routes · implemented by `src/components/listing/CategoryNav.jsx > CategoryNav`

**`listing.event-grid`** — Single-select region dropdown (writes ?filter=) and a search field above a 3-column grid of event cards (16:9 image, region chip, title, date); a text no-results block replaces the grid.

· Only the filterable-card-grid template (4 routes). · appears on 4 routes · implemented by `src/components/listing/Listings.jsx > EventsListing`

**`listing.hub-grid`** — Stack of category blocks (gap 120): optional heading-3 + 'browse all' link, an optional featured row (16:9 image half + title half) and a 3-up card grid; may contain one inline gradient promo card.

· Only the content-hub-listing template (3 routes). · appears on 3 routes · implemented by `src/components/listing/Listings.jsx > HubListing`

**`listing.session-grid`** — Event dropdown and search above a 3-column grid of session cards (21 per page, View more adds 21); a filter or search change shows 3 pulsing skeleton cards for ~1.2s before the result.

· Only the filterable-card-grid template (4 routes). · appears on 4 routes · implemented by `src/components/listing/Listings.jsx > OnDemandListing`

**`listing.case-grid`** — Filters menu button + search field, a 3-column grid of 6 bordered case cards, a featured-story band (quote card over a brush stroke), 6 more cards and a View more button; a no-results state replaces the grid.

· Only the filterable-card-grid template (4 routes). · appears on 4 routes · implemented by `src/components/listing/Listings.jsx > CaseStudiesListing`

**`listing.press-grid`** — Centred heading-2, a 3-column grid of up to 21 press cards and a primary View more button (+21).

· Only the filterable-card-grid template (4 routes). · appears on 4 routes · implemented by `src/components/listing/Listings.jsx > PressGrid`

**`listing.latest-posts`** — Heading-3 above three compact blog cards (16:9 image, tag + read time, title, author row).

· Only the article template (4 routes). · appears on 4 routes · implemented by `src/components/listing/Listings.jsx > LatestPosts`

### ARTICLE

_Long-form reading blocks: article and story headers, prose chapters, side rails, breadcrumbs._

**`article.guide-header`** — Page-opening header of a long guide: breadcrumb, optional tag, H1, author row or clock + read time, 1-2 large buttons (the first scrolls to the download form) and an image (r16) on the right.

· Only the article template (4 routes). · appears on 4 routes · implemented by `src/components/article/GuideHeader.jsx > GuideHeader`

**`article.story-header`** — Page-opening header of a customer story: customer logo, H1 styled heading-2, a stats row (24/32 bold values) and a bg-blur quote card (4 cols); brush stroke behind. Classified ARTICLE, not HERO.

· Only the case-study-detail template (4 routes). · appears on 4 routes · implemented by `src/components/article/StoryHeader.jsx > StoryHeader`

**`article.progress-bar`** — Fixed top-of-viewport 6px track whose purple fill width follows the page scroll fraction. Rendered as the first child of the post page; no transition. (runtime UI: retrieval-ineligible in the design-repo)

· Only the article template (4 routes). · appears on 4 routes · implemented by `src/components/article/StickyRail.jsx > ProgressBar`

**`article.guide-body`** — Prose chapters (2/3, each opened by an h2) beside a sticky rail (1/4: table of contents with scroll-spy, then one promo). The report variant ends the prose with an embedded download form card. One DOM unit; decompose logically by chapter (h2).

· Only the article template (4 routes). · appears on 4 routes · implemented by `src/components/article/ArticleBody.jsx > GuideBody`

**`article.story-body`** — Prose column (8 cols) of chapters, each opened by an h3, beside a bordered facts card (logo, labelled facts). Prose blocks: paragraphs, headings, lists, quotes, images, tables. One DOM unit; decompose logically by chapter (h3).

· Only the case-study-detail template (4 routes). · appears on 4 routes · implemented by `src/components/article/StorySections.jsx > StoryBody`

**`article.post-body`** — One white section (py 64): breadcrumb, H1, author row and 'last edited' line, then prose chapters (each opened by an h2) in 8/12 columns beside a rail (3/12, 80 gap) of sticky promos and a sticky share bar. One DOM unit; decompose logically by chapter (h2).

· Only the article template (4 routes). · appears on 4 routes · implemented by `src/components/article/ArticleBody.jsx > PostBody`

**`article.related-stories`** — Mono eyebrow, heading-2 and three bordered story cards (logo, heading-4 title link, summary, chevron link).

· Only the case-study-detail template (4 routes). · appears on 4 routes · implemented by `src/components/article/StorySections.jsx > RelatedStories`

### FORM

_Static (non-submitting) form blocks._

**`form.form-header`** — Page-opening two-column header of a static (non-submitting) form page: left 6 cols with optional breadcrumb, tag, H1 and prose blocks; right 5 cols with the form card (sticky 32 from the top at >=1024) or a cover image. Forms validate locally and show a success paragraph; nothing is sent.

· 7 routes across the templates that list it (asset-landing, form-page). · appears on 7 routes · implemented by `src/components/form/FormHeader.jsx > FormHeader`

### LEGAL

_Policy and legal document blocks._

**`legal.policy-header`** — Page-opening header of a policy page: centred heading-1 in 8 centred columns and an optional 18/28 last-updated line.

· Only the legal-prose template (3 routes). · appears on 3 routes · implemented by `src/components/legal/Policy.jsx > PolicyHeader`

**`legal.policy-body`** — 832-wide centred prose column of heading-bounded parts (each h2 or h3 opens a chapter wrapper): headings, paragraphs with inline markup, lists, tables. One DOM unit; decompose logically by heading-bounded part.

· Only the legal-prose template (3 routes). · appears on 3 routes · implemented by `src/components/legal/Policy.jsx > PolicyBody`

### COMPANY

_Company and program blocks: people, open roles, compliance, certification programs._

**`company.leadership-list`** — Centred heading-2 over a column of bordered cards (radius 16, shadow-lg): 242px avatar circle, heading-3 name, role, profile link and bio paragraphs.

· Only the company-program template (10 routes). · appears on 10 routes · implemented by `src/components/sections/Leaders.jsx > Leaders`

**`company.people-grid`** — Centred heading-2 over a wrapped row of avatar circles with heading-4 name and role (250 max each).

· Only the company-program template (10 routes). · appears on 10 routes · implemented by `src/components/sections/Board.jsx > Board`

**`company.role-list`** — Centred heading-2, a department filter (264-wide button list at >=1024, listbox dropdown below) and the roles grouped by department (tag chip, then title link + location + 'apply' button per role). Filtering swaps groups instantly.

· Only the company-program template (10 routes). · appears on 10 routes · implemented by `src/components/sections/Jobs.jsx > Jobs`

**`company.compliance-rows`** — Centred heading-2 over rows of an audit badge (1/4) beside a heading-3 and prose with inline links (3/4).

· Only the company-program template (10 routes). · appears on 10 routes · implemented by `src/components/sections/Compliance.jsx > Compliance`

**`company.program-list`** — Left half heading-2, paragraphs and a primary button; right half three items (24px icon, heading-4, paragraph, tertiary button).

· Only the company-program template (10 routes). · appears on 10 routes · implemented by `src/components/sections/CertList.jsx > CertList`

### COMPARISON

_Side-by-side comparison blocks: feature tables and maturity columns._

**`comparison.journey-columns`** — Dark maturity columns: orange eyebrow, heading-2, paragraph, then three outlined columns (status badge or list of red x items) and a highlighted orange-outlined column with check items; a curve/dot overlay sits under the row at >=1024.

· Only the product-landing template (9 routes). · appears on 9 routes · implemented by `src/components/sections/Journey.jsx > Journey`

**`comparison.compare-table`** — Left heading-2 over a zebra table: empty corner, two centred heading-5 column heads, rows of a 16/24 500 feature name and value cells (violet check, info glyph + note, or empty).

· Only the product-landing template (9 routes). · appears on 9 routes · implemented by `src/components/sections/CompareTable.jsx > CompareTable`

**`comparison.plan-matrix`** — Heading-2, a sticky plan header (name, price summary, button per plan) and grouped feature tables (check, text or empty cells; info tooltips on feature names). Below 1024 two synced sliders show one plan at a time.

· Only the pricing template (1 route). · appears on 1 routes · implemented by `src/components/oneoffs/pricing/Pricing.jsx > PlanMatrix`

### PRICING

_Plan and add-on offer blocks._

**`pricing.plan-cards`** — H1 (48/57.6 at every width), paragraph and four equal-height bordered plan cards: mono plan name, description, one-string price, allowances, full-width primary button and a check-list of features. No highlighted plan, no billing toggle.

· Only the pricing template (1 route). · appears on 1 routes · implemented by `src/components/oneoffs/pricing/Pricing.jsx > PlanCards`

**`pricing.add-ons`** — Heading-2 and an intro paragraph with an inline link above two translucent (white 70%, blur 24) add-on cards: heading-4, two paragraphs, three check rows and primary + secondary buttons.

· Only the pricing template (1 route). · appears on 1 routes · implemented by `src/components/oneoffs/pricing/Pricing.jsx > AddOns`

### COMMUNITY

_Blocks unique to the dark-theme community champions page._

**`community.about-band`** — Dark band: white heading-2 left, prose with white underlined links and two dark buttons right.

· Only the champions template (1 route). · appears on 1 routes · implemented by `src/components/oneoffs/champions/Champions.jsx > ChampAbout`

**`community.member-grid`** — Heading-2, paragraph and two buttons, then a 3-column grid of square-cornered member cards (chamfered portrait, heading-3 name, role, orange external link, text button with a plus icon). Cards lift 8px on hover.

· Only the champions template (1 route). · appears on 1 routes · implemented by `src/components/oneoffs/champions/Champions.jsx > ChampMembers`

**`community.story-slider`** — Eyebrow, heading-2 and paragraph above a draggable slider of 12 square-cornered story cards (16:9 image, type label, 24/33 title, byline, text button); arrows below. A slider, not a grid.

· Only the champions template (1 route). · appears on 1 routes · implemented by `src/components/oneoffs/champions/Champions.jsx > ChampStories`

**`community.icon-cards`** — Heading-2 with optional eyebrow and paragraph above a row of borderless icon items (icon, heading-4, paragraph); light 5-column or dark 4-column.

· Only the champions template (1 route). · appears on 1 routes · implemented by `src/components/oneoffs/champions/Champions.jsx > ChampItems`

**`community.dark-quote`** — One static 48/57.6 quote on #030711 with a 40px round avatar and attribution; nine stepped orange bars at the right (>=1024). A single quote, not a slider.

· Only the champions template (1 route). · appears on 1 routes · implemented by `src/components/oneoffs/champions/Champions.jsx > ChampQuote`

### EVENT

_Blocks unique to the event microsite._

**`event.photo-gallery`** — Endless horizontal loop of 14 event photos (two identical sets), 240x180 (305x229 from 768) with 12px (20px) gaps; never pauses.

· Only the event-microsite template (1 route). · appears on 1 routes · implemented by `src/components/oneoffs/summit/Summit.jsx > EventMarquee`

**`event.recap`** — Black centred card: display heading-2, paragraph and an orange button; a decorative bar-and-hand glyph at the lower left (>=1024).

· Only the event-microsite template (1 route). · appears on 1 routes · implemented by `src/components/oneoffs/summit/Summit.jsx > EventRecap`

**`event.sponsor-logos`** — Display heading-2 and three bordered sponsor tiers (a labelled header cell, then wrapped fictional wordmarks), followed by a full-width outlined button. Fictional placeholder wordmarks only.

· Only the event-microsite template (1 route). · appears on 1 routes · implemented by `src/components/oneoffs/summit/Summit.jsx > EventSponsors`

**`event.closing-band`** — Black closing band: display heading (two lines) left, paragraph and an outlined button right (bottom-aligned).

· Only the event-microsite template (1 route). · appears on 1 routes · implemented by `src/components/oneoffs/summit/Summit.jsx > EventClosing`

**`event.photo-band`** — One full-container photo (object-cover, positioned 50% 74%), 560 tall (320 below 768). A single image, not a media block with text.

· Only the event-microsite template (1 route). · appears on 1 routes · implemented by `src/components/oneoffs/summit/Summit.jsx > EventMedia`

**`event.highlight-rows`** — Display heading-2 above a list of rows separated by black hairlines: a pixel icon, a display title and an outlined button per row. Rows, not cards.

· Only the event-microsite template (1 route). · appears on 1 routes · implemented by `src/components/oneoffs/summit/Summit.jsx > EventRows`

**`event.quote-band`** — Black band with a purple pixel-dither strip on top, a display-size quote and mono name + role lines.

· Only the event-microsite template (1 route). · appears on 1 routes · implemented by `src/components/oneoffs/summit/Summit.jsx > EventQuote`

### DIRECTORY

_Blocks of the statically mocked partner locator._

**`directory.header`** — Page-opening header of the partner locator: centred 48/57.6 H1 and a paragraph in a 684 column. Classified DIRECTORY, not HERO.

· Only the partner-directory template (1 route). · appears on 1 routes · implemented by `src/components/oneoffs/directory/Directory.jsx > DirHeader`

**`directory.partner-locator`** — Static mock of a partner locator: filter sidebar (collapsible facet groups with counts, selected-facet chips), search field, top and bottom pagination and a 3-column grid of partner cards (wordmark, name, url line, clamped text, tier badge). Filters AND across groups, OR inside a group; 9 cards per page.

· Only the partner-directory template (1 route). · appears on 1 routes · implemented by `src/components/oneoffs/directory/Directory.jsx > Directory`
