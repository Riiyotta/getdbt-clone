import useTabs from '../../hooks/useTabs'
import { Btn, Img } from './parts'
import { LightTabList } from './TabsLight'

// C-10 N-photo-tabs (specs/T12-T13.md): left-aligned header (eyebrow, heading-2, paragraph, primary
// medium button) -> 6 flex-grow light tabs -> panel 40 below: two columns, each one large square and
// a pair of small squares (column 2 mirrored), tiles r8 with object-cover photos. Instant switch.
function Tile({ a }) {
  return (
    <div className="aspect-square w-full overflow-hidden rounded-lg">
      <Img a={a} className="h-full w-full object-cover" />
    </div>
  )
}

export default function PhotoTabs({ eyebrow, title, body, cta, tabs }) {
  const t = useTabs(tabs.length, 'horizontal')
  const p = tabs[t.selected].photos
  const pair = (a, b) => (
    <div className="flex gap-4">
      <Tile a={a} />
      <Tile a={b} />
    </div>
  )
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h2 className="heading-2 mb-4 text-ink-950">{title}</h2>
        <p className="text-base text-ink-950">{body}</p>
        <Btn cta={cta} variant="primary" size="medium" className="mt-6" />
        <LightTabList labels={tabs.map((x) => x.label)} tabs={t} center grow className="mt-10" />
        <div {...t.panelProps} className="mt-10 grid h-full grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <Tile a={p[0]} />
            {pair(p[1], p[2])}
          </div>
          <div className="flex flex-col gap-4">
            {pair(p[3], p[4])}
            <Tile a={p[5]} />
          </div>
        </div>
      </div>
    </section>
  )
}
