import { useId, useState } from 'react'
import { MinusIcon, PlusIcon } from '../icons'
import { RichText } from './parts'

// C-6 N-faq (specs/T12-T13.md): accordion. Centred heading-2 + optional paragraph (820 max), list
// 48 below at >=1024. Items #f3f4f6 r16, 16 apart; header button p 24 / 24 48 (>=640); question sans
// 24/28.8 500 #4a5565, #030711 on hover and while open; 18px plus (closed) / minus (open) in a 24 box,
// #6a7282; focus-visible 2px #632ff5 ring, 4px offset. Instant open/close; items independent.
// The original has no aria-expanded; the clone adds aria-expanded / aria-controls. No reveal.
function Item({ q, a }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <div className="mb-4 rounded-2xl bg-ink-100 last:mb-0">
      {/* the original puts the h3 inside the button; here the button sits inside the h3 (valid HTML,
          same rendering) */}
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          onClick={() => setOpen((o) => !o)}
          className="accordion-item-header group flex w-full cursor-pointer items-center justify-between rounded px-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-4 sm:px-12"
        >
          <span className={`font-sans text-h3 font-medium group-hover:text-ink-950 ${open ? 'text-ink-950' : 'text-ink-600'}`}>{q}</span>
          <span className="ml-8 flex h-6 w-6 shrink-0 items-center justify-center rounded p-0.5 text-ink-500 sm:ml-16">
            {open ? <MinusIcon /> : <PlusIcon />}
          </span>
        </button>
      </h3>
      {open && (
        <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-btn`} className="accordion-item-copy px-6 pb-6 sm:px-12">
          <p className="text-base text-ink-950">
            <RichText runs={a} />
          </p>
        </div>
      )}
    </div>
  )
}

export default function Faq({ title, body, items }) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="heading-2 text-center text-ink-950">{title}</h2>
        {body && <p className="mx-auto max-w-[820px] text-center text-base text-ink-950">{body}</p>}
        <div className="lg:mt-12">
          {items.map((it) => (
            <Item key={it.q} q={it.q} a={it.a} />
          ))}
        </div>
      </div>
    </section>
  )
}
