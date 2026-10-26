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
import IntTiles from '../../components/sections/IntTiles'
import Install from '../../components/sections/Install'
import DemoPanel from '../../components/sections/DemoPanel'
import Journey from '../../components/sections/Journey'
import PersonaTabs from '../../components/sections/PersonaTabs'
import CompareTable from '../../components/sections/CompareTable'
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
  intTiles: IntTiles,
  install: Install,
  demoPanel: DemoPanel,
  journey: Journey,
  personaTabs: PersonaTabs,
  compareTable: CompareTable,
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
