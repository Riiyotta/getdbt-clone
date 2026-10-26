import { panels } from '../content'
import Hero from '../components/Hero'
import LogoMarquee from '../components/LogoMarquee'
import NewsBand from '../components/NewsBand'
import Statement from '../components/Statement'
import FeaturePanel from '../components/FeaturePanel'
import Integrations from '../components/Integrations'
import WhyCards from '../components/WhyCards'
import DiagramSection from '../components/DiagramSection'
import IdeCard from '../components/IdeCard'
import Testimonials from '../components/Testimonials'
import CommunityCta from '../components/CommunityCta'

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <NewsBand />
      <Statement />
      {panels.map((p, i) => (
        <FeaturePanel key={p.gradient} index={i} {...p} />
      ))}
      <Integrations />
      <WhyCards />
      <DiagramSection />
      <IdeCard />
      <Testimonials />
      <CommunityCta />
    </>
  )
}
