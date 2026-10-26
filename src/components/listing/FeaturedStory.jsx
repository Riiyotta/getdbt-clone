import Baton from '../sections/Baton'
import { Img, TextLink } from '../sections/parts'

// Featured customer-story band (specs/T5-T8.md A-11): full-bleed, py 48 / 120, N-baton S10
// (gradient-01, draw-on via the shared Baton) behind a bg-blur bordered card: logo, heading-2 quote,
// attribution, text link.
export default function FeaturedStory({ logo, quote, name, role, cta }) {
  return (
    <section className="relative bg-cover bg-center py-12 md:py-[120px]">
      <Baton shape="S10" gradient="gradient-01" tall />
      <div className="container">
        <div className="relative z-10 flex flex-col gap-8 rounded-2xl border border-ink-200 bg-blur p-12 backdrop-blur-md">
          <Img a={logo} className="h-[34px] w-[112px] object-contain object-left" />
          <h3 className="heading-2 text-ink-950">{quote}</h3>
          <div className="mt-8 text-sm text-ink-950">
            {name}
            <span className="ml-1 text-ink-500">{role}</span>
          </div>
          <TextLink cta={cta} shift className="mt-8 !w-auto justify-start gap-2 self-start" />
        </div>
      </div>
    </section>
  )
}
