import useTabs from '../../hooks/useTabs'
import { CopyIcon } from '../icons'
import { RichText } from './parts'
import { LightTabList } from './TabsLight'

// C-15 N-install (specs/T12-T13.md): 1036 column. Header: centred eyebrow + paragraph (assistant) or
// centred heading-2 + paragraph (charts), mb-8. Two centred light tabs; panel 40 below: card (1px
// #d1d5dc, r16, white, p-6 / md:p-8) holding a #f3f4f6 r12 p-4 command row: orange `$` prompt
// (mono 14/20 700, not selectable), the command (mono 14/20, no wrap, scrolls with the scrollbar
// hidden) and a 34px copy button (1px #d1d5dc, r8, #4a5565 15px glyph). Clicking copies the command;
// the original's "copied" feedback was not observed, so none is shown. Instant switch, no reveal.
export default function Install({ eyebrow, title, body, tabs, copyLabel }) {
  const t = useTabs(tabs.length, 'horizontal')
  const active = tabs[t.selected]
  const copy = () => navigator.clipboard?.writeText(active.command).catch(() => {})
  return (
    <section className="section">
      <div className="container">
        <div className="lg:grid-container">
          <div className="lg:col-span-10 lg:col-start-2">
            <div className="mb-8 text-center">
              {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
              {title && <h2 className="heading-2 mb-6 text-ink-950">{title}</h2>}
              <p className="text-base text-ink-950">
                <RichText runs={body} />
              </p>
            </div>
            <LightTabList labels={tabs.map((x) => x.label)} tabs={t} center />
            <div {...t.panelProps} className="mt-10 rounded-2xl border border-ink-300 bg-white p-6 md:p-8">
              <div className="flex items-center gap-3 rounded-xl bg-ink-100 p-4">
                <span className="select-none font-mono text-sm font-bold text-orange-600" aria-hidden="true">
                  $
                </span>
                <code className="scrollbar-none min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm text-ink-950">
                  {active.command}
                </code>
                <button
                  type="button"
                  onClick={copy}
                  aria-label={copyLabel}
                  className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg border border-ink-300 bg-white text-ink-600 transition-colors duration-150"
                >
                  <CopyIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
