import { useLocation } from 'react-router-dom'
import CommunityCta from '../../components/CommunityCta'
import HeroSplit from '../../components/sections/HeroSplit'
import HeroCenter from '../../components/sections/HeroCenter'
import Split from '../../components/sections/Split'
import Feat from '../../components/sections/Feat'
import TabsDark from '../../components/sections/TabsDark'
import TabsLight from '../../components/sections/TabsLight'
import CustTabs from '../../components/sections/CustTabs'
import CtaCard from '../../components/sections/CtaCard'
import CtaBand from '../../components/sections/CtaBand'
import Stats from '../../components/sections/Stats'
import QuoteBand from '../../components/sections/QuoteBand'
import Checklist from '../../components/sections/Checklist'
import Statement from '../../components/sections/Statement'
import Resources from '../../components/sections/Resources'
import TestiSlider from '../../components/sections/TestiSlider'
import Leaders from '../../components/sections/Leaders'
import Board from '../../components/sections/Board'
import NewsStrip from '../../components/sections/NewsStrip'
import Jobs from '../../components/sections/Jobs'
import Compliance from '../../components/sections/Compliance'
import Faq from '../../components/sections/Faq'
import CertList from '../../components/sections/CertList'
import CourseTabs from '../../components/sections/CourseTabs'
import BentoCommunity from '../../components/sections/BentoCommunity'
import PhotoTabs from '../../components/sections/PhotoTabs'
import LogoBar from '../../components/sections/LogoBar'
import IntStrip from '../../components/sections/IntStrip'
import Integrations from '../../components/Integrations'
import Install from '../../components/sections/Install'
import FeaturePanel from '../../components/FeaturePanel'
import Journey from '../../components/sections/Journey'
import PersonaTabs from '../../components/sections/PersonaTabs'
import CompareTable from '../../components/sections/CompareTable'
import ListingHeader from '../../components/listing/ListingHeader'
import CategoryNav from '../../components/listing/CategoryNav'
import {
  CaseStudiesListing,
  EventsListing,
  HubListing,
  LatestPosts,
  OnDemandListing,
  PressGrid,
} from '../../components/listing/Listings'
import StoryHeader from '../../components/article/StoryHeader'
import { RelatedStories, StoryBody } from '../../components/article/StorySections'
import GuideHeader from '../../components/article/GuideHeader'
import { GuideBody, PostBody } from '../../components/article/ArticleBody'
import FormHeader from '../../components/form/FormHeader'
import { PolicyBody, PolicyHeader } from '../../components/legal/Policy'
import { AddOns, PlanCards, PlanMatrix } from '../../components/oneoffs/pricing/Pricing'
import {
  ChampAbout,
  ChampClosing,
  ChampHero,
  ChampItems,
  ChampMembers,
  ChampQuote,
  ChampStories,
} from '../../components/oneoffs/champions/Champions'
import {
  EventClosing,
  EventHero,
  EventMarquee,
  EventMedia,
  EventQuote,
  EventRecap,
  EventRows,
  EventSponsors,
} from '../../components/oneoffs/summit/Summit'
import { DirHeader, Directory } from '../../components/oneoffs/directory/Directory'
import ComingSoon from '../ComingSoon'

// Section type (as used in src/content/pages/*.js) -> component
const registry = {
  heroSplit: HeroSplit,
  heroCenter: HeroCenter,
  split: Split,
  feat: Feat,
  tabsDark: TabsDark,
  tabsLight: TabsLight,
  custTabs: CustTabs,
  ctaCard: CtaCard,
  ctaBand: CtaBand,
  ctaLong: CommunityCta,
  stats: Stats,
  quoteBand: QuoteBand,
  checklist: Checklist,
  statement: Statement,
  resources: Resources,
  testiSlider: TestiSlider,
  // T12-T13 (specs/T12-T13.md C)
  leaders: Leaders,
  board: Board,
  newsStrip: NewsStrip,
  jobs: Jobs,
  compliance: Compliance,
  faq: Faq,
  certList: CertList,
  courseTabs: CourseTabs,
  bento: BentoCommunity,
  photoTabs: PhotoTabs,
  logoBar: LogoBar,
  intStrip: IntStrip,
  // the homepage's labelled tiles and gradient panels are the same components on the original
  intTiles: Integrations,
  install: Install,
  demoPanel: ({ mediaLeft, ...p }) => <FeaturePanel {...p} mediaFirst={mediaLeft} textFirstMobile={false} />,
  journey: Journey,
  personaTabs: PersonaTabs,
  compareTable: CompareTable,
  // T5-T8 (specs/T5-T8.md A, B)
  storyHeader: StoryHeader,
  storyBody: StoryBody,
  related: RelatedStories,
  listingHeader: ListingHeader,
  categoryNav: CategoryNav,
  hubListing: HubListing,
  caseStudies: CaseStudiesListing,
  events: EventsListing,
  onDemand: OnDemandListing,
  pressGrid: PressGrid,
  postBody: PostBody,
  latestPosts: LatestPosts,
  guideHeader: GuideHeader,
  guideBody: GuideBody,
  // T9-T11 (specs/T9-T11.md B, E)
  formHeader: FormHeader,
  policyHeader: PolicyHeader,
  policyBody: PolicyBody,
  // T14-T17 (specs/T14-T17.md B)
  planCards: PlanCards,
  addOns: AddOns,
  planMatrix: PlanMatrix,
  champHero: ChampHero,
  champAbout: ChampAbout,
  champMembers: ChampMembers,
  champItems: ChampItems,
  champQuote: ChampQuote,
  champStories: ChampStories,
  champClosing: ChampClosing,
  eventHero: EventHero,
  eventMarquee: EventMarquee,
  eventRecap: EventRecap,
  eventRows: EventRows,
  eventSponsors: EventSponsors,
  eventMedia: EventMedia,
  eventQuote: EventQuote,
  eventClosing: EventClosing,
  dirHeader: DirHeader,
  directory: Directory,
}

// Renders the content entry for the current route as an ordered list of sections.
export default function SectionsPage({ pages }) {
  const { pathname } = useLocation()
  const page = pages[pathname]
  if (!page) return <ComingSoon />
  return page.sections.map(({ type, ...props }, i) => {
    const C = registry[type]
    return <C key={`${pathname}-${i}`} {...props} />
  })
}
