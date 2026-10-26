import Prose from '../article/Prose'

// legal.policy-header (specs/T9-T11.md E-1): centred heading-1 in 8 centred columns, optional
// 18/28 last-updated line 24 below.
export function PolicyHeader({ title, updated }) {
  return (
    <header className="z-5 overflow-hidden bg-white py-12 md:py-16">
      <div className="container">
        <div className="grid-container">
          <div className="col-span-full lg:col-span-8 lg:col-start-3">
            <h1 className="heading-1 !mb-0 text-center text-ink-950">{title}</h1>
            {updated && <p className="!mb-0 mt-6 text-center text-lg text-ink-950">{updated}</p>}
          </div>
        </div>
      </div>
    </header>
  )
}

// legal.policy-part (specs/T9-T11.md E-2): 832-wide centred prose column; the column opens with an
// empty paragraph (0 tall + mb 24) as on the original. `pt0` when a header precedes it. Each
// heading-bounded part is a .prose-chapter wrapper.
export function PolicyBody({ blocks, pt0 = true, chapterAt = 'h2' }) {
  return (
    <section className={`z-5 bg-white py-12 md:py-16 ${pt0 ? 'pt-0 md:pt-0' : ''}`.trim()}>
      <div className="container">
        <div className="mx-auto w-full lg:max-w-[832px]">
          <Prose blocks={[['empty'], ...blocks]} chapterAt={chapterAt} />
        </div>
      </div>
    </section>
  )
}
