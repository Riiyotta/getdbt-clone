# Lattice clone: information architecture

Source: Clone project (fictional brand Lattice): src/routes.js, src/App.jsx, src/content/pages/*.js, PAGES.md, specs/*.md, CLONE_SPEC.md, design-repo/
Status: **all 18 templates (T0-T17) implemented in the clone and contracted in design-repo; derived from design-repo/templates/templates.json and routes/routes.json** · production approved: **false**
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
| `shell.announcement-bar` | SHELL | 16 | 69 | `src/components/AnnouncementBar.jsx > AnnouncementBar` | Every page except the partner directory: all full-chrome pages plus the event microsite (69 routes). |
| `shell.navbar` | SHELL | 16 | 69 | `src/components/Navbar.jsx > Navbar` | All full-chrome pages (69 routes); replaced by the event sub-nav on the event microsite and by the minimal nav on the partner directory. |
| `shell.mega-menu` | SHELL | 16 | 69 | `src/components/MegaMenu.jsx > MegaMenu` | Mounted with the global navbar on all full-chrome pages (69 routes). |
| `shell.mobile-drawer` | SHELL | 16 | 69 | `src/components/Navbar.jsx (drawer block)` | Mounted with the global navbar on all full-chrome pages (69 routes). |
| `shell.footer` | SHELL | 16 | 69 | `src/components/Footer.jsx > Footer` | Every page except the partner directory (69 routes). |
| `cta.closing-band` | CTA | 9 | 51 | `src/components/sections/CtaBand.jsx > CtaBand` | The default page closer on every marketing, listing, case-study and company template that lists it (51 routes across the templates that list it). |
| `features.card-grid` | FEATURES | 8 | 46 | `src/components/sections/Feat.jsx > Feat; homepage: src/components/WhyCards.jsx > WhyCards` | The most reused content block: homepage plus every marketing, form and company template that lists it (46 routes across the templates that list it). |
| `editorial.resource-cards` | EDITORIAL | 6 | 41 | `src/components/sections/Resources.jsx > Resources` | Related-reading row on product feature, solution, data-platform, industry, case-study, article, company and product-landing pages (41 routes across the templates that list it). |
| `content.media-split` | CONTENT | 7 | 40 | `src/components/sections/Split.jsx > Split; homepage: src/components/DiagramSection.jsx > DiagramSection` | Homepage and most marketing templates, plus asset landings and company pages (40 routes across the templates that list it). |
| `hero.split` | HERO | 4 | 31 | `src/components/sections/HeroSplit.jsx > HeroSplit` | Product feature and data-platform pages, plus most company pages and several product landings (31 routes across the templates that list it). |
| `hero.center` | HERO | 5 | 30 | `src/components/sections/HeroCenter.jsx > HeroCenter; homepage: src/components/Hero.jsx > Hero` | Homepage (text-only), solution and industry pages, and some company and product-landing pages (30 routes across the templates that list it). |
| `social-proof.stats-bento` | SOCIAL_PROOF | 5 | 29 | `src/components/sections/Stats.jsx > Stats` | Solution, industry, form and product-landing pages, plus one data-platform member (29 routes across the templates that list it). |
| `cta.gradient-card` | CTA | 4 | 26 | `src/components/sections/CtaCard.jsx > CtaCard` | Product feature, data-platform, one solution member and several product landings (26 routes across the templates that list it). |
| `social-proof.customer-tabs` | SOCIAL_PROOF | 4 | 26 | `src/components/sections/CustTabs.jsx > CustTabs` | Product feature, solution, data-platform and product-landing pages (26 routes across the templates that list it; absent on some members). |
| `social-proof.quote-band` | SOCIAL_PROOF | 4 | 25 | `src/components/sections/QuoteBand.jsx > QuoteBand` | Product feature (one member), solution (one member), industry and product-landing pages (25 routes across the templates that list it). |
| `features.checklist` | FEATURES | 3 | 24 | `src/components/sections/Checklist.jsx > Checklist` | Solution pages, plus company and product-landing pages that use the split variant (24 routes across the templates that list it). |
| `content.statement` | CONTENT | 4 | 21 | `src/components/sections/Statement.jsx > Statement; homepage: src/components/Statement.jsx > Statement` | Homepage, solution, data-platform and product-landing pages (21 routes across the templates that list it). |
| `features.tabs-dark` | FEATURES | 3 | 20 | `src/components/sections/TabsDark.jsx > TabsDark` | Product feature, industry and product-landing pages (20 routes across the templates that list it). |
| `interactive.faq-accordion` | INTERACTIVE | 3 | 20 | `src/components/sections/Faq.jsx > Faq` | Company pages, product landings and pricing (20 routes across the templates that list it). |
| `cta.dev-path-dialog` | CTA | 2 | 19 | `src/components/sections/DevModal.jsx > DevModalButton (opened via parts.jsx > Btn when cta.dialog is set)` | Opened from hero buttons on company and product-landing pages (19 routes across the templates that list it). |
| `cta.community-band` | CTA | 5 | 18 | `src/components/CommunityCta.jsx > CommunityCta` | Homepage, solution, industry pages, and as the alternate closer on hub listings and blog posts (18 routes across the templates that list it). |
| `social-proof.testimonial-slider` | SOCIAL_PROOF | 3 | 15 | `src/components/sections/TestiSlider.jsx > TestiSlider; homepage: src/components/Testimonials.jsx > Testimonials` | Homepage, industry pages and several product landings (15 routes across the templates that list it). |
| `social-proof.logo-bar` | SOCIAL_PROOF | 2 | 12 | `src/components/sections/LogoBar.jsx > LogoBar` | Asset/webinar landings and product landings (12 routes across the templates that list it). |
| `features.gradient-panel` | FEATURES | 2 | 10 | `src/components/FeaturePanel.jsx > FeaturePanel` | Shared section (10 routes across the templates that list it). |
| `features.integration-tiles` | FEATURES | 2 | 10 | `src/components/Integrations.jsx > Integrations` | Shared section (10 routes across the templates that list it). |
| `company.compliance-rows` | COMPANY | 1 | 10 | `src/components/sections/Compliance.jsx > Compliance` | Company/program pages (security member) (10 routes across the template that lists it). |
| `company.leadership-list` | COMPANY | 1 | 10 | `src/components/sections/Leaders.jsx > Leaders` | Company/program pages (about member) (10 routes across the template that lists it). |
| `company.people-grid` | COMPANY | 1 | 10 | `src/components/sections/Board.jsx > Board` | Company/program pages (about member) (10 routes across the template that lists it). |
| `company.program-list` | COMPANY | 1 | 10 | `src/components/sections/CertList.jsx > CertList` | Company/program pages (certification member) (10 routes across the template that lists it). |
| `company.role-list` | COMPANY | 1 | 10 | `src/components/sections/Jobs.jsx > Jobs (grouped list part)` | Company/program pages (careers member) (10 routes across the template that lists it). |
| `editorial.community-bento` | EDITORIAL | 1 | 10 | `src/components/sections/BentoCommunity.jsx > BentoCommunity` | Company/program pages (community member) (10 routes across the template that lists it). |
| `editorial.dark-news-strip` | EDITORIAL | 1 | 10 | `src/components/sections/NewsStrip.jsx > NewsStrip` | Company/program pages (careers member) (10 routes across the template that lists it). |
| `interactive.course-tabs` | INTERACTIVE | 1 | 10 | `src/components/sections/CourseTabs.jsx > CourseTabs` | Company/program pages (learning member) (10 routes across the template that lists it). |
| `interactive.photo-tabs` | INTERACTIVE | 1 | 10 | `src/components/sections/PhotoTabs.jsx > PhotoTabs` | Company/program pages (community member) (10 routes across the template that lists it). |
| `comparison.compare-table` | COMPARISON | 1 | 9 | `src/components/sections/CompareTable.jsx > CompareTable` | Product landings (self-hosted comparison member) (9 routes across the template that lists it). |
| `comparison.journey-columns` | COMPARISON | 1 | 9 | `src/components/sections/Journey.jsx > Journey` | Product landings (self-hosted comparison member) (9 routes across the template that lists it). |
| `features.integration-strip` | FEATURES | 1 | 9 | `src/components/sections/IntStrip.jsx > IntStrip` | Product landings only (9 routes). |
| `interactive.install-tabs` | INTERACTIVE | 1 | 9 | `src/components/sections/Install.jsx > Install` | Product landings only (9 routes). |
| `interactive.persona-tabs` | INTERACTIVE | 1 | 9 | `src/components/sections/PersonaTabs.jsx > PersonaTabs` | Product landings only (9 routes). |
| `listing.header` | LISTING | 2 | 7 | `src/components/listing/ListingHeader.jsx > ListingHeader` | Hub listings and filterable card-grid listings (7 routes across the templates that list it). |
| `form.form-header` | FORM | 2 | 7 | `src/components/form/FormHeader.jsx > FormHeader` | Asset/webinar landings and form pages (7 routes across the templates that list it). |
| `features.tabs-light` | FEATURES | 1 | 5 | `src/components/sections/TabsLight.jsx > TabsLight` | Solution pages only (5 routes). |
| `article.story-header` | ARTICLE | 1 | 4 | `src/components/article/StoryHeader.jsx > StoryHeader` | Case-study details only (4 routes). |
| `article.story-body` | ARTICLE | 1 | 4 | `src/components/article/StorySections.jsx > StoryBody` | Single-template section (4 routes across the templates that list it). |
| `article.related-stories` | ARTICLE | 1 | 4 | `src/components/article/StorySections.jsx > RelatedStories` | Single-template section (4 routes across the templates that list it). |
| `listing.case-grid` | LISTING | 1 | 4 | `src/components/listing/Listings.jsx > CaseStudiesListing` | Single-template section (4 routes across the templates that list it). |
| `listing.event-grid` | LISTING | 1 | 4 | `src/components/listing/Listings.jsx > EventsListing` | Single-template section (4 routes across the templates that list it). |
| `listing.session-grid` | LISTING | 1 | 4 | `src/components/listing/Listings.jsx > OnDemandListing` | Single-template section (4 routes across the templates that list it). |
| `listing.press-grid` | LISTING | 1 | 4 | `src/components/listing/Listings.jsx > PressGrid` | Single-template section (4 routes across the templates that list it). |
| `article.progress-bar` | ARTICLE | 1 | 4 | `src/components/article/StickyRail.jsx > ProgressBar` | Single-template section (4 routes across the templates that list it). |
| `article.post-body` | ARTICLE | 1 | 4 | `src/components/article/ArticleBody.jsx > PostBody` | Single-template section (4 routes across the templates that list it). |
| `listing.latest-posts` | LISTING | 1 | 4 | `src/components/listing/Listings.jsx > LatestPosts` | Single-template section (4 routes across the templates that list it). |
| `article.guide-header` | ARTICLE | 1 | 4 | `src/components/article/GuideHeader.jsx > GuideHeader` | Articles (guide and report members) (4 routes across the template that lists it). |
| `article.guide-body` | ARTICLE | 1 | 4 | `src/components/article/ArticleBody.jsx > GuideBody` | Single-template section (4 routes across the templates that list it). |
| `listing.category-nav` | LISTING | 1 | 3 | `src/components/listing/CategoryNav.jsx > CategoryNav` | Hub listings only (3 routes). |
| `listing.hub-grid` | LISTING | 1 | 3 | `src/components/listing/Listings.jsx > HubListing` | Single-template section (3 routes across the templates that list it). |
| `legal.policy-header` | LEGAL | 1 | 3 | `src/components/legal/Policy.jsx > PolicyHeader` | Legal/policy pages (3 routes across the template that lists it). |
| `legal.policy-body` | LEGAL | 1 | 3 | `src/components/legal/Policy.jsx > PolicyBody` | Single-template section (3 routes across the templates that list it). |
| `social-proof.logo-marquee` | SOCIAL_PROOF | 1 | 1 | `src/components/LogoMarquee.jsx > LogoMarquee` | Single-template section (1 routes across the templates that list it). |
| `editorial.news-band` | EDITORIAL | 1 | 1 | `src/components/NewsBand.jsx > NewsBand` | Single-template section (1 routes across the templates that list it). |
| `cta.ide-card` | CTA | 1 | 1 | `src/components/IdeCard.jsx > IdeCard` | Single-template section (1 routes across the templates that list it). |
| `pricing.plan-cards` | PRICING | 1 | 1 | `src/components/oneoffs/pricing/Pricing.jsx > PlanCards` | Single-template section (1 routes across the templates that list it). |
| `pricing.add-ons` | PRICING | 1 | 1 | `src/components/oneoffs/pricing/Pricing.jsx > AddOns` | Single-template section (1 routes across the templates that list it). |
| `comparison.plan-matrix` | COMPARISON | 1 | 1 | `src/components/oneoffs/pricing/Pricing.jsx > PlanMatrix` | Single-template section (1 routes across the templates that list it). |
| `hero.champions-dark` | HERO | 1 | 1 | `src/components/oneoffs/champions/Champions.jsx > ChampHero` | Single-template section (1 routes across the templates that list it). |
| `community.about-band` | COMMUNITY | 1 | 1 | `src/components/oneoffs/champions/Champions.jsx > ChampAbout` | Single-template section (1 routes across the templates that list it). |
| `community.member-grid` | COMMUNITY | 1 | 1 | `src/components/oneoffs/champions/Champions.jsx > ChampMembers` | Single-template section (1 routes across the templates that list it). |
| `community.icon-cards` | COMMUNITY | 1 | 1 | `src/components/oneoffs/champions/Champions.jsx > ChampItems` | Single-template section (1 routes across the templates that list it). |
| `community.dark-quote` | COMMUNITY | 1 | 1 | `src/components/oneoffs/champions/Champions.jsx > ChampQuote` | Single-template section (1 routes across the templates that list it). |
| `community.story-slider` | COMMUNITY | 1 | 1 | `src/components/oneoffs/champions/Champions.jsx > ChampStories` | Single-template section (1 routes across the templates that list it). |
| `cta.champions-closing` | CTA | 1 | 1 | `src/components/oneoffs/champions/Champions.jsx > ChampClosing` | Single-template section (1 routes across the templates that list it). |
| `shell.event-subnav` | SHELL | 1 | 1 | `src/components/chrome/EventChrome.jsx > EventNav` | Single-template section (1 routes across the templates that list it). |
| `hero.event` | HERO | 1 | 1 | `src/components/oneoffs/summit/Summit.jsx > EventHero` | Single-template section (1 routes across the templates that list it). |
| `event.photo-gallery` | EVENT | 1 | 1 | `src/components/oneoffs/summit/Summit.jsx > EventMarquee` | Single-template section (1 routes across the templates that list it). |
| `event.recap` | EVENT | 1 | 1 | `src/components/oneoffs/summit/Summit.jsx > EventRecap` | Single-template section (1 routes across the templates that list it). |
| `event.highlight-rows` | EVENT | 1 | 1 | `src/components/oneoffs/summit/Summit.jsx > EventRows` | Single-template section (1 routes across the templates that list it). |
| `event.sponsor-logos` | EVENT | 1 | 1 | `src/components/oneoffs/summit/Summit.jsx > EventSponsors` | Single-template section (1 routes across the templates that list it). |
| `event.photo-band` | EVENT | 1 | 1 | `src/components/oneoffs/summit/Summit.jsx > EventMedia` | Single-template section (1 routes across the templates that list it). |
| `event.quote-band` | EVENT | 1 | 1 | `src/components/oneoffs/summit/Summit.jsx > EventQuote` | Single-template section (1 routes across the templates that list it). |
| `event.closing-band` | EVENT | 1 | 1 | `src/components/oneoffs/summit/Summit.jsx > EventClosing` | Single-template section (1 routes across the templates that list it). |
| `shell.event-footer` | SHELL | 1 | 1 | `src/components/chrome/EventChrome.jsx > EventFooter` | Single-template section (1 routes across the templates that list it). |
| `shell.minimal-nav` | SHELL | 1 | 1 | `src/components/chrome/MinimalNav.jsx > MinimalNav` | Single-template section (1 routes across the templates that list it). |
| `directory.header` | DIRECTORY | 1 | 1 | `src/components/oneoffs/directory/Directory.jsx > DirHeader` | Single-template section (1 routes across the templates that list it). |
| `directory.partner-locator` | DIRECTORY | 1 | 1 | `src/components/oneoffs/directory/Directory.jsx > Directory` | Single-template section (1 routes across the templates that list it). |

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
| 10 | CTA | `cta.closing-band` | shared ×9 |
| 11 | SOCIAL_PROOF | `social-proof.customer-tabs` | shared ×4 |
| 12 | SOCIAL_PROOF | `social-proof.quote-band` | shared ×4 |
| 13 | EDITORIAL | `editorial.resource-cards` | shared ×6 |
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
| 10 | CONTENT | `content.media-split` | shared ×7 |
| 11 | SOCIAL_PROOF | `social-proof.quote-band` | shared ×4 |
| 12 | SOCIAL_PROOF | `social-proof.customer-tabs` | shared ×4 |
| 13 | CTA | `cta.community-band` | shared ×5 |
| 14 | CTA | `cta.gradient-card` | shared ×4 |
| 15 | SOCIAL_PROOF | `social-proof.stats-bento` | shared ×5 |
| 16 | EDITORIAL | `editorial.resource-cards` | shared ×6 |
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
| 7 | CONTENT | `content.statement` | shared ×4 |
| 8 | CONTENT | `content.media-split` | shared ×7 |
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
| 8 | CTA | `cta.community-band` | shared ×5 |
| 9 | CTA | `cta.closing-band` | shared ×9 |
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
| 6 | LISTING | `listing.case-grid` | page-local |
| 7 | LISTING | `listing.event-grid` | page-local |
| 8 | LISTING | `listing.session-grid` | page-local |
| 9 | LISTING | `listing.press-grid` | page-local |
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
| 6 | HERO | `hero.split` | shared ×4 |
| 7 | COMPANY | `company.compliance-rows` | page-local |
| 8 | COMPANY | `company.leadership-list` | page-local |
| 9 | COMPANY | `company.people-grid` | page-local |
| 10 | COMPANY | `company.program-list` | page-local |
| 11 | COMPANY | `company.role-list` | page-local |
| 12 | CONTENT | `content.media-split` | shared ×7 |
| 13 | CTA | `cta.closing-band` | shared ×9 |
| 14 | EDITORIAL | `editorial.community-bento` | page-local |
| 15 | EDITORIAL | `editorial.dark-news-strip` | page-local |
| 16 | EDITORIAL | `editorial.resource-cards` | shared ×6 |
| 17 | FEATURES | `features.card-grid` | shared ×8 |
| 18 | FEATURES | `features.checklist` | shared ×3 |
| 19 | INTERACTIVE | `interactive.course-tabs` | page-local |
| 20 | INTERACTIVE | `interactive.faq-accordion` | shared ×3 |
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
| 5 | HERO | `hero.center` | shared ×5 |
| 6 | HERO | `hero.split` | shared ×4 |
| 7 | COMPARISON | `comparison.compare-table` | page-local |
| 8 | COMPARISON | `comparison.journey-columns` | page-local |
| 9 | CONTENT | `content.media-split` | shared ×7 |
| 10 | CONTENT | `content.statement` | shared ×4 |
| 11 | CTA | `cta.closing-band` | shared ×9 |
| 12 | CTA | `cta.gradient-card` | shared ×4 |
| 13 | EDITORIAL | `editorial.resource-cards` | shared ×6 |
| 14 | FEATURES | `features.card-grid` | shared ×8 |
| 15 | FEATURES | `features.checklist` | shared ×3 |
| 16 | FEATURES | `features.gradient-panel` | shared ×2 |
| 17 | FEATURES | `features.integration-strip` | page-local |
| 18 | FEATURES | `features.integration-tiles` | shared ×2 |
| 19 | FEATURES | `features.tabs-dark` | shared ×3 |
| 20 | INTERACTIVE | `interactive.faq-accordion` | shared ×3 |
| 21 | INTERACTIVE | `interactive.install-tabs` | page-local |
| 22 | INTERACTIVE | `interactive.persona-tabs` | page-local |
| 23 | SOCIAL_PROOF | `social-proof.customer-tabs` | shared ×4 |
| 24 | SOCIAL_PROOF | `social-proof.logo-bar` | shared ×2 |
| 25 | SOCIAL_PROOF | `social-proof.quote-band` | shared ×4 |
| 26 | SOCIAL_PROOF | `social-proof.stats-bento` | shared ×5 |
| 27 | SOCIAL_PROOF | `social-proof.testimonial-slider` | shared ×3 |
| 28 | CTA | `cta.dev-path-dialog` | shared ×2 |
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

**`shell.announcement-bar`** — Rotating one-line announcement strip above the navigation: linked slides with previous/next arrows, autoplaying; hidden below 1024px.

· Every page except the partner directory: all full-chrome pages plus the event microsite (69 routes). · appears on 69 routes · implemented by `src/components/AnnouncementBar.jsx > AnnouncementBar`

**`shell.navbar`** — Sticky global navigation: brand mark, mega-menu triggers plus one plain link, search, secondary and primary CTAs and an account button on desktop; logo, search and hamburger below 1024px.

· All full-chrome pages (69 routes); replaced by the event sub-nav on the event microsite and by the minimal nav on the partner directory. · appears on 69 routes · implemented by `src/components/Navbar.jsx > Navbar`

**`shell.mega-menu`** — Popover card opened from each navbar trigger: two groups of icon + title + description items, an optional featured item with thumbnail, a grey side column of links and a coloured footer strip.

· Mounted with the global navbar on all full-chrome pages (69 routes). · appears on 69 routes · implemented by `src/components/MegaMenu.jsx > MegaMenu`

**`shell.mobile-drawer`** — Below 1024px: full-height drawer listing the menu categories with a drill-down sub-level and Back control, the plain link and account links, and a fixed bottom bar holding the two nav CTAs.

· Mounted with the global navbar on all full-chrome pages (69 routes). · appears on 69 routes · implemented by `src/components/Navbar.jsx (drawer block)`

**`shell.footer`** — Dark footer: light brand mark, link columns (one link with a badge), newsletter block, region select, social icons, copyright with legal links and a cookie-preferences button.

· Every page except the partner directory (69 routes). · appears on 69 routes · implemented by `src/components/Footer.jsx > Footer`

**`shell.event-subnav`** — Transparent event-specific navigation bar (event name plus agenda, speakers, experience, tour and waitlist links) that replaces the global navbar and mega-menus; uses the event's own display face.

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/chrome/EventChrome.jsx > EventNav`

**`shell.event-footer`** — Chrome 'event': replaces the global footer. Giant event wordmark with a link block overlaid at >=768, a pixel-tile strip (dither, heat band, checker) and a citron tagline/copyright bar.

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/chrome/EventChrome.jsx > EventFooter`

**`shell.minimal-nav`** — Minimal white navigation row: brand mark and a single Home link; no menus, search or CTAs.

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/chrome/MinimalNav.jsx > MinimalNav`

### HERO

_The page-opening header block that holds the page's H1._

**`hero.center`** — Centred page header: optional eyebrow, H1, lead, one or two large buttons, and either no media (text-only) or a large rounded image / illustration / 16:9 poster below; brush stroke behind on media variants.

· Homepage (text-only), solution and industry pages, and some company and product-landing pages (30 routes across the templates that list it). · appears on 30 routes · implemented by `src/components/sections/HeroCenter.jsx > HeroCenter; homepage: src/components/Hero.jsx > Hero`

**`hero.split`** — Two-column page header: H1, lead and one or two large buttons on the left, rounded image / video poster / illustration on the right (6/6 or 7/5), optional tag chip or product lockup above the H1; padded or flush-bottom; brush stroke behind.

· Product feature and data-platform pages, plus most company pages and several product landings (31 routes across the templates that list it). · appears on 31 routes · implemented by `src/components/sections/HeroSplit.jsx > HeroSplit`

**`hero.champions-dark`** — Near-black full-width community-program header with the page's own display face; opens the dark-theme sequence.

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/oneoffs/champions/Champions.jsx > ChampHero`

**`hero.event`** — Event microsite header in the event's display face, sitting under the event sub-nav.

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/oneoffs/summit/Summit.jsx > EventHero`

### SOCIAL_PROOF

_Customer evidence: logos, quotes, customer stories, stat bands._

**`social-proof.logo-marquee`** — Infinite horizontal marquee of customer wordmarks that overlaps the bottom edge of the hero.

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/LogoMarquee.jsx > LogoMarquee`

**`social-proof.testimonial-slider`** — Header column (eyebrow, heading, body, optional button) beside a horizontal slider of quote or metric cards (logo, quote or big metric, text link) with arrows and pagination bars.

· Homepage, industry pages and several product landings (15 routes across the templates that list it). · appears on 15 routes · implemented by `src/components/sections/TestiSlider.jsx > TestiSlider; homepage: src/components/Testimonials.jsx > Testimonials`

**`social-proof.customer-tabs`** — Heading and paragraph, a left-aligned tab row of customer names, and per tab a logo, headline, optional summary, button, a quote card and two stat cards.

· Product feature, solution, data-platform and product-landing pages (26 routes across the templates that list it; absent on some members). · appears on 26 routes · implemented by `src/components/sections/CustTabs.jsx > CustTabs`

**`social-proof.quote-band`** — One bordered blur card holding a customer quote (icon or logo, large quote, attribution), or a one-per-view slider of such quotes with pagination bars; optional brush stroke or soft wash behind.

· Product feature (one member), solution (one member), industry and product-landing pages (25 routes across the templates that list it). · appears on 25 routes · implemented by `src/components/sections/QuoteBand.jsx > QuoteBand`

**`social-proof.stats-bento`** — Dark 'trusted at scale' band: optional eyebrow, heading, and four blur-dark cards in an alternating 7+5 / 5+7 bento, each with eyebrow, stat heading, body and an optional image or logo-tile row.

· Solution, industry, form and product-landing pages, plus one data-platform member (29 routes across the templates that list it). · appears on 29 routes · implemented by `src/components/sections/Stats.jsx > Stats`

**`social-proof.logo-bar`** — Static 'trusted by' row: centred small heading above a single wrapping row of about six customer wordmarks; no motion (distinct from the homepage marquee).

· Asset/webinar landings and product landings (12 routes across the templates that list it). · appears on 12 routes · implemented by `src/components/sections/LogoBar.jsx > LogoBar`

### FEATURES

_Product and capability explanation: card grids, checklists, tabbed showcases, gradient panels, integration blocks._

**`features.gradient-panel`** — Rounded gradient panel with grain: small eyebrow, heading, body and a dark primary button in one column, product media flush to the panel's edge in the other; consecutive panels alternate sides.

· Shared section (10 routes across the templates that list it). · appears on 10 routes · implemented by `src/components/FeaturePanel.jsx > FeaturePanel`

**`features.integration-tiles`** — Text column (eyebrow, heading, body, button) beside a two-column grid of six bordered tiles, each an integration icon plus label; tile border darkens on hover.

· Shared section (10 routes across the templates that list it). · appears on 10 routes · implemented by `src/components/Integrations.jsx > Integrations`

**`features.card-grid`** — Section header (eyebrow, heading, paragraph, optional buttons or lockup) above a three- or four-column grid of cards: icon cards on a wash, bordered link cards, image cards, plain or dark bordered cards, or stat cards (big number + label).

· The most reused content block: homepage plus every marketing, form and company template that lists it (46 routes across the templates that list it). · appears on 46 routes · implemented by `src/components/sections/Feat.jsx > Feat; homepage: src/components/WhyCards.jsx > WhyCards`

**`features.tabs-dark`** — Dark band: heading (+ optional paragraph) and a vertical tablist where the active tab expands its description, beside that tab's media in a blur-dark frame; brush stroke behind.

· Product feature, industry and product-landing pages (20 routes across the templates that list it). · appears on 20 routes · implemented by `src/components/sections/TabsDark.jsx > TabsDark`

**`features.checklist`** — Icon checklist of capabilities: two columns of titled items, a split with heading + items beside an image, a before/after pair, or a three-column grid of titled items.

· Solution pages, plus company and product-landing pages that use the split variant (24 routes across the templates that list it). · appears on 24 routes · implemented by `src/components/sections/Checklist.jsx > Checklist`

**`features.tabs-light`** — Light centred tab row with an underline on the active tab; each tab shows a short description and one square image.

· Solution pages only (5 routes). · appears on 5 routes · implemented by `src/components/sections/TabsLight.jsx > TabsLight`

**`features.integration-strip`** — Centred grey kicker and heading above a single wrapping row of square icon-only integration tiles and one button; tiles darken their border on hover.

· Product landings only (9 routes). · appears on 9 routes · implemented by `src/components/sections/IntStrip.jsx > IntStrip`

### CONTENT

_General text-and-media rows that are neither a feature grid nor proof: statements and media splits._

**`content.statement`** — Centred heading (+ paragraph) in a narrow reading column; variants add a diagram or a video poster below, a single-sentence line, an eyebrow, or a light grey band.

· Homepage, solution, data-platform and product-landing pages (21 routes across the templates that list it). · appears on 21 routes · implemented by `src/components/sections/Statement.jsx > Statement; homepage: src/components/Statement.jsx > Statement`

**`content.media-split`** — Two-column row: eyebrow, heading, one or two paragraphs (optional bullets) and buttons beside an image, diagram or video poster; column ratios 6/6, 7/5, 5/7; media left or right.

· Homepage and most marketing templates, plus asset landings and company pages (40 routes across the templates that list it). · appears on 40 routes · implemented by `src/components/sections/Split.jsx > Split; homepage: src/components/DiagramSection.jsx > DiagramSection`

### CTA

_Conversion blocks: gradient cards, closing bands, install prompts, and the dialog some hero buttons open._

**`cta.ide-card`** — One clickable gradient card: heading and paragraph beside a two-by-two grid of white tiles naming editor/install options.

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/IdeCard.jsx > IdeCard`

**`cta.community-band`** — Long blue gradient band: eyebrow, heading, body, two dark buttons, and a right column of two or three stat blocks behind a hairline divider.

· Homepage, solution, industry pages, and as the alternate closer on hub listings and blog posts (18 routes across the templates that list it). · appears on 18 routes · implemented by `src/components/CommunityCta.jsx > CommunityCta`

**`cta.gradient-card`** — Mid-page conversion card on a warm gradient with grain: heading, paragraph, a dark primary button and an optional dark tertiary button.

· Product feature, data-platform, one solution member and several product landings (26 routes across the templates that list it). · appears on 26 routes · implemented by `src/components/sections/CtaCard.jsx > CtaCard`

**`cta.closing-band`** — Short blue gradient band with concentric circles: heading, paragraph, zero to two dark buttons, and an optional right column (heading + paragraph + arrow link, a three-row checklist, or two stats).

· The default page closer on every marketing, listing, case-study and company template that lists it (51 routes across the templates that list it). · appears on 51 routes · implemented by `src/components/sections/CtaBand.jsx > CtaBand`

**`cta.dev-path-dialog`** — Modal dialog opened by some hero buttons: dimmed blurred overlay, white panel with close button, heading, then rows of path title + description + secondary button divided by hairlines. Overlay, not an in-flow section.

· Opened from hero buttons on company and product-landing pages (19 routes across the templates that list it). · appears on 19 routes · implemented by `src/components/sections/DevModal.jsx > DevModalButton (opened via parts.jsx > Btn when cta.dialog is set)`

**`cta.champions-closing`** — Dark closing band inviting the visitor to join the champions program, in the page's dark theme.

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/oneoffs/champions/Champions.jsx > ChampClosing`

### EDITORIAL

_News, announcements and links out to resources or community content._

**`editorial.news-band`** — Dark band with a co-brand lockup, one news headline and a read-more link.

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/NewsBand.jsx > NewsBand`

**`editorial.resource-cards`** — Header (eyebrow, heading, optional paragraph) above two to four resource / story / post cards: 16:9 image link, optional tag chip, title link, optional paragraph or byline.

· Related-reading row on product feature, solution, data-platform, industry, case-study, article, company and product-landing pages (41 routes across the templates that list it). · appears on 41 routes · implemented by `src/components/sections/Resources.jsx > Resources`

**`editorial.community-bento`** — Dark bento of community updates: a wide feature card with square image, a member quote card, a meetup date card, a topics list card and an image-of-the-week card.

· Company/program pages (community member) (10 routes across the template that lists it). · appears on 10 routes · implemented by `src/components/sections/BentoCommunity.jsx > BentoCommunity`

**`editorial.dark-news-strip`** — Compact dark strip: eyebrow, heading and paragraph on the left, one outlined light button on the right; no lockup (differs from the homepage news band).

· Company/program pages (careers member) (10 routes across the template that lists it). · appears on 10 routes · implemented by `src/components/sections/NewsStrip.jsx > NewsStrip`

### INTERACTIVE

_Disclosure and tab widgets whose main job is switching or expanding content (accordions and content-specific tab sets)._

**`interactive.course-tabs`** — Text column (eyebrow, heading, paragraph, button) beside a light flex-grow tab row whose panels list course cards (16:9 image, tag + duration, title, paragraph, chevron link).

· Company/program pages (learning member) (10 routes across the template that lists it). · appears on 10 routes · implemented by `src/components/sections/CourseTabs.jsx > CourseTabs`

**`interactive.faq-accordion`** — Centred heading (+ optional paragraph) above grey rounded accordion items: question row with plus/minus glyph, instant independent expand/collapse revealing prose.

· Company pages, product landings and pricing (20 routes across the templates that list it). · appears on 20 routes · implemented by `src/components/sections/Faq.jsx > Faq`

**`interactive.photo-tabs`** — Left-aligned header and button above a flex-grow light tab row; each panel is a mirrored mosaic of one large and two small square photos per column.

· Company/program pages (community member) (10 routes across the template that lists it). · appears on 10 routes · implemented by `src/components/sections/PhotoTabs.jsx > PhotoTabs`

**`interactive.install-tabs`** — Centred header above a two-tab light tablist; each panel is a bordered card holding one shell-command row (prompt glyph, monospace command, copy button).

· Product landings only (9 routes). · appears on 9 routes · implemented by `src/components/sections/Install.jsx > Install`

**`interactive.persona-tabs`** — Centred icon tabs (one per persona); each panel shows a before card and an after card side by side, each with a code chip, heading and bullet list.

· Product landings only (9 routes). · appears on 9 routes · implemented by `src/components/sections/PersonaTabs.jsx > PersonaTabs`

### LISTING

_Collection and directory pages: listing headers, category navigation, filters, card grids._

**`listing.header`** — Plain listing header: H1 only, no buttons or media.

· Hub listings and filterable card-grid listings (7 routes across the templates that list it). · appears on 7 routes · implemented by `src/components/listing/ListingHeader.jsx > ListingHeader`

**`listing.category-nav`** — Blurred pill navigation linking to category sub-listings, with a search input beside it.

· Hub listings only (3 routes). · appears on 3 routes · implemented by `src/components/listing/CategoryNav.jsx > CategoryNav`

**`listing.hub-grid`** — Stack of category blocks (gap 120): optional heading-3 + 'browse all' link, an optional featured row (16:9 image half + title half) and a 3-up card grid; may contain one inline gradient promo card.

· Single-template section (3 routes across the templates that list it). · appears on 3 routes · implemented by `src/components/listing/Listings.jsx > HubListing`

**`listing.case-grid`** — Filters menu button + search field, a 3-column grid of 6 bordered case cards, a featured-story band (quote card over a brush stroke), 6 more cards and a View more button; a no-results state replaces the grid.

· Single-template section (4 routes across the templates that list it). · appears on 4 routes · implemented by `src/components/listing/Listings.jsx > CaseStudiesListing`

**`listing.event-grid`** — Single-select region dropdown (writes ?filter=) and a search field above a 3-column grid of event cards (16:9 image, region chip, title, date); a text no-results block replaces the grid.

· Single-template section (4 routes across the templates that list it). · appears on 4 routes · implemented by `src/components/listing/Listings.jsx > EventsListing`

**`listing.session-grid`** — Event dropdown and search above a 3-column grid of session cards (21 per page, View more adds 21); a filter or search change shows 3 pulsing skeleton cards for ~1.2s before the result.

· Single-template section (4 routes across the templates that list it). · appears on 4 routes · implemented by `src/components/listing/Listings.jsx > OnDemandListing`

**`listing.press-grid`** — Centred heading-2, a 3-column grid of up to 21 press cards and a primary View more button (+21).

· Single-template section (4 routes across the templates that list it). · appears on 4 routes · implemented by `src/components/listing/Listings.jsx > PressGrid`

**`listing.latest-posts`** — Heading-3 above three compact blog cards (16:9 image, tag + read time, title, author row).

· Single-template section (4 routes across the templates that list it). · appears on 4 routes · implemented by `src/components/listing/Listings.jsx > LatestPosts`

### ARTICLE

_Long-form reading blocks: article and story headers, prose chapters, side rails, breadcrumbs._

**`article.story-header`** — Case-study header: H1, customer logo and a row of headline stats.

· Case-study details only (4 routes). · appears on 4 routes · implemented by `src/components/article/StoryHeader.jsx > StoryHeader`

**`article.story-body`** — Prose column (8 cols) of chapters, each opened by an h3, beside a bordered facts card (logo, labelled facts). Prose blocks: paragraphs, headings, lists, quotes, images, tables. One DOM unit; decompose logically by chapter (h3).

· Single-template section (4 routes across the templates that list it). · appears on 4 routes · implemented by `src/components/article/StorySections.jsx > StoryBody`

**`article.related-stories`** — Mono eyebrow, heading-2 and three bordered story cards (logo, heading-4 title link, summary, chevron link).

· Single-template section (4 routes across the templates that list it). · appears on 4 routes · implemented by `src/components/article/StorySections.jsx > RelatedStories`

**`article.progress-bar`** — Fixed top-of-viewport 6px track whose purple fill width follows the page scroll fraction. Rendered as the first child of the post page; no transition.

· Single-template section (4 routes across the templates that list it). · appears on 4 routes · implemented by `src/components/article/StickyRail.jsx > ProgressBar`

**`article.post-body`** — One white section (py 64): breadcrumb, H1, author row and 'last edited' line, then prose chapters (each opened by an h2) in 8/12 columns beside a rail (3/12, 80 gap) of sticky promos and a sticky share bar. One DOM unit; decompose logically by chapter (h2).

· Single-template section (4 routes across the templates that list it). · appears on 4 routes · implemented by `src/components/article/ArticleBody.jsx > PostBody`

**`article.guide-header`** — Hero-style header for long-form guides and reports: H1, author link, a download button and a second CTA.

· Articles (guide and report members) (4 routes across the template that lists it). · appears on 4 routes · implemented by `src/components/article/GuideHeader.jsx > GuideHeader`

**`article.guide-body`** — Prose chapters (2/3, each opened by an h2) beside a sticky rail (1/4: table of contents with scroll-spy, then one promo). The report variant ends the prose with an embedded download form card. One DOM unit; decompose logically by chapter (h2).

· Single-template section (4 routes across the templates that list it). · appears on 4 routes · implemented by `src/components/article/ArticleBody.jsx > GuideBody`

### FORM

_Static (non-submitting) form blocks._

**`form.form-header`** — Two-column page header: copy (eyebrow, H1, intro, optional sub-sections or logo row) beside a static form panel with privacy fine print; some members have only a button in place of the form. No submission.

· Asset/webinar landings and form pages (7 routes across the templates that list it). · appears on 7 routes · implemented by `src/components/form/FormHeader.jsx > FormHeader`

### LEGAL

_Policy and legal document blocks._

**`legal.policy-header`** — Policy page header: H1 only. Absent on one member, which starts directly with a section heading.

· Legal/policy pages (3 routes across the template that lists it). · appears on 3 routes · implemented by `src/components/legal/Policy.jsx > PolicyHeader`

**`legal.policy-body`** — 832-wide centred prose column of heading-bounded parts (each h2 or h3 opens a chapter wrapper): headings, paragraphs with inline markup, lists, tables. One DOM unit; decompose logically by heading-bounded part.

· Single-template section (3 routes across the templates that list it). · appears on 3 routes · implemented by `src/components/legal/Policy.jsx > PolicyBody`

### COMPANY

_Company and program blocks: people, open roles, compliance, certification programs._

**`company.compliance-rows`** — Centred heading above stacked rows of a certification badge (left quarter) and a heading + prose description (right three quarters).

· Company/program pages (security member) (10 routes across the template that lists it). · appears on 10 routes · implemented by `src/components/sections/Compliance.jsx > Compliance`

**`company.leadership-list`** — Centred heading above a vertical list of large bordered person cards: round avatar, name, role line, profile link and a short bio.

· Company/program pages (about member) (10 routes across the template that lists it). · appears on 10 routes · implemented by `src/components/sections/Leaders.jsx > Leaders`

**`company.people-grid`** — Centred heading above a wrapping row of avatar + name + role tiles (no bio).

· Company/program pages (about member) (10 routes across the template that lists it). · appears on 10 routes · implemented by `src/components/sections/Board.jsx > Board`

**`company.program-list`** — Two-column block: heading, paragraphs and button on the left; a list of icon + title + paragraph + tertiary button program items on the right.

· Company/program pages (certification member) (10 routes across the template that lists it). · appears on 10 routes · implemented by `src/components/sections/CertList.jsx > CertList`

**`company.role-list`** — Open roles grouped by department: tag chip per group, then rows of role title link, location with pin icon and an apply button.

· Company/program pages (careers member) (10 routes across the template that lists it). · appears on 10 routes · implemented by `src/components/sections/Jobs.jsx > Jobs (grouped list part)`

### COMPARISON

_Side-by-side comparison blocks: feature tables and maturity columns._

**`comparison.compare-table`** — Left-aligned heading above a two-option feature table: zebra rows, check marks or info notes per cell, outlined rounded body; repeats once per feature group.

· Product landings (self-hosted comparison member) (9 routes across the template that lists it). · appears on 9 routes · implemented by `src/components/sections/CompareTable.jsx > CompareTable`

**`comparison.journey-columns`** — Dark band of four maturity columns (three outlined, the last highlighted with a glow) listing labelled facts, status badges and x/check lists, with a decorative curve overlay.

· Product landings (self-hosted comparison member) (9 routes across the template that lists it). · appears on 9 routes · implemented by `src/components/sections/Journey.jsx > Journey`

**`comparison.plan-matrix`** — Multi-plan feature comparison table with collapsible feature groups and icon cells, one column per plan.

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/oneoffs/pricing/Pricing.jsx > PlanMatrix`

### PRICING

_Plan and add-on offer blocks._

**`pricing.plan-cards`** — Pricing header that holds the H1 above a row of plan cards (plan name, price block, feature list, button).

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/oneoffs/pricing/Pricing.jsx > PlanCards`

**`pricing.add-ons`** — Light band of two add-on offer cards below the plans.

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/oneoffs/pricing/Pricing.jsx > AddOns`

### COMMUNITY

_Blocks unique to the dark-theme community champions page._

**`community.about-band`** — Dark about-the-program band following the dark hero.

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/oneoffs/champions/Champions.jsx > ChampAbout`

**`community.member-grid`** — Grid of featured member portraits.

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/oneoffs/champions/Champions.jsx > ChampMembers`

**`community.icon-cards`** — Heading-2 with optional eyebrow and paragraph above a row of borderless icon items (icon, heading-4, paragraph); light 5-column or dark 4-column.

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/oneoffs/champions/Champions.jsx > ChampItems`

**`community.dark-quote`** — One static 48/57.6 quote on #030711 with a 40px round avatar and attribution; nine stepped orange bars at the right (>=1024). A single quote, not a slider.

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/oneoffs/champions/Champions.jsx > ChampQuote`

**`community.story-slider`** — Eyebrow, heading-2 and paragraph above a draggable slider of 12 square-cornered story cards (16:9 image, type label, 24/33 title, byline, text button); arrows below. A slider, not a grid.

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/oneoffs/champions/Champions.jsx > ChampStories`

### EVENT

_Blocks unique to the event microsite._

**`event.photo-gallery`** — Large photo gallery from past editions of the event.

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/oneoffs/summit/Summit.jsx > EventMarquee`

**`event.recap`** — Recap block summarising the previous edition.

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/oneoffs/summit/Summit.jsx > EventRecap`

**`event.highlight-rows`** — Display heading-2 above a list of rows separated by black hairlines: a pixel icon, a display title and an outlined button per row. Rows, not cards.

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/oneoffs/summit/Summit.jsx > EventRows`

**`event.sponsor-logos`** — Grid of sponsor marks (placeholder marks only in the clone).

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/oneoffs/summit/Summit.jsx > EventSponsors`

**`event.photo-band`** — One full-container photo (object-cover, positioned 50% 74%), 560 tall (320 below 768). A single image, not a media block with text.

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/oneoffs/summit/Summit.jsx > EventMedia`

**`event.quote-band`** — Black band with a purple pixel-dither strip on top, a display-size quote and mono name + role lines.

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/oneoffs/summit/Summit.jsx > EventQuote`

**`event.closing-band`** — Black closing band: display heading (two lines) left, paragraph and an outlined button right (bottom-aligned).

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/oneoffs/summit/Summit.jsx > EventClosing`

### DIRECTORY

_Blocks of the statically mocked partner locator._

**`directory.header`** — Page-opening header of the partner locator: centred 48/57.6 H1 and a paragraph in a 684 column. Classified DIRECTORY, not HERO.

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/oneoffs/directory/Directory.jsx > DirHeader`

**`directory.partner-locator`** — Static mock of a partner locator: filter sidebar (collapsible facet groups with counts, selected-facet chips), search field, top and bottom pagination and a 3-column grid of partner cards (wordmark, name, url line, clamped text, tier badge). Filters AND across groups, OR inside a group; 9 cards per page.

· Single-template section (1 routes across the templates that list it). · appears on 1 routes · implemented by `src/components/oneoffs/directory/Directory.jsx > Directory`
