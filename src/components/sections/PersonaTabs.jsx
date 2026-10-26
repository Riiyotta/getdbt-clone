import useTabs from '../../hooks/useTabs'
import { LightTabList } from './TabsLight'

// C-18 N-persona-tabs (specs/T12-T13.md): 1036 column; 3 centred light tabs with 24px icons; panel
// 40 below: 2 cards (1px #d1d5dc, r16, white, p-6 / md:p-8): chip row (mono "before" #364153 on
// #101828 at 10% / "after" #fe6703 on #fe6703 at 10%, + 14/20 label), heading-4 (mb-6), 4-item disc
// list inset 32. Instant switch, no reveal.
const CHIP = { before: 'bg-ink-900/10 text-ink-700', after: 'bg-orange-600/10 text-orange-600' }

export default function PersonaTabs({ tabs }) {
  const t = useTabs(tabs.length, 'horizontal')
  const active = tabs[t.selected]
  return (
    <section className="section">
      <div className="container">
        <div className="grid-container">
          <div className="col-span-full lg:col-span-10 lg:col-start-2">
            <LightTabList labels={tabs.map((x) => x.label)} icons={tabs.map((x) => x.icon)} tabs={t} center />
            <div {...t.panelProps} className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              {active.cards.map((c) => (
                <div key={c.kind} className="rounded-2xl border border-ink-300 bg-white p-6 md:p-8">
                  <div className="mb-6 flex items-center gap-2">
                    <span className={`rounded-badge p-1 font-mono text-xs font-medium ${CHIP[c.kind]}`}>{c.chip}</span>
                    <span className="text-sm text-ink-950">{c.label}</span>
                  </div>
                  <h3 className="heading-4 mb-6 text-ink-950">{c.title}</h3>
                  <ul className="list-disc pl-8 text-base text-ink-950">
                    {c.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
