import { QuoteIcon } from '../icons'
import Baton from '../sections/Baton'
import { Img } from '../sections/parts'

// article.story-header (specs/T5-T8.md A-20): py 48 / 64 / 120; N-baton (S5 on the representative,
// S10 on the others) behind; left 8 columns: logo (115 wide), H1 styled heading-2, stats row (24/32
// 700 values, horizontally scrollable below 640); right 4 columns: bg-blur quote card.
export default function StoryHeader({ stroke = 'S10', logo, title, stats, quote, name, role }) {
  return (
    <header className="relative bg-white py-12 md:py-16 lg:py-30">
      <Baton shape={stroke} gradient="gradient-01" />
      <div className="container">
        <div className="grid-container relative z-10 gap-8 lg:gap-6">
          <div className="col-span-full flex flex-col gap-y-8 lg:col-span-8 lg:gap-y-12">
            <Img a={logo} eager className="block h-auto w-[115px] max-w-[115px]" />
            <h1 className="heading-2 text-ink-950">{title}</h1>
            <div className="-mx-4 flex flex-row flex-nowrap gap-6 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
              {stats.map((s) => (
                <div key={s.label} className="w-full min-w-[220px] md:w-1/3 md:min-w-min">
                  <span className="block font-sans text-2xl font-bold text-ink-950">{s.value}</span>
                  <span className="mt-2 block text-base text-ink-950">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-full flex flex-col justify-between gap-y-10 rounded-2xl border border-ink-200 bg-blur p-6 backdrop-blur-md lg:col-span-4 lg:p-10">
            <QuoteIcon className="size-8 text-ink-950" />
            <p className="text-lg text-ink-950">{quote}</p>
            <p className="text-sm text-ink-950">
              {name} <span className="text-ink-500">{role}</span>
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
