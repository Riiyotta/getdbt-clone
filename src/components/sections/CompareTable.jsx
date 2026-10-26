import { CheckFilled, InfoIcon } from '../icons'

// C-19 N-compare-table (specs/T12-T13.md): left heading-2 (mb-8); table in an overflow-x-auto p-3
// wrapper: empty corner + 2 centred heading-5 column heads (min-w 143); tbody white with a 2px
// #f9fafb ring 8px out; zebra rows (odd #f9fafb), cells px-6 py-3 with r12 row ends; feature 16/24
// 500; values: 21px violet check, or 19px #99a1af info glyph + 14/20 #1e2939 note (160 max at
// >=1024), or empty. No hover, no reveal, no sticky header.
function Value({ v }) {
  if (!v) return null
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center lg:flex-row lg:text-left">
      {v === true ? (
        <CheckFilled className="shrink-0 text-purple-600" />
      ) : (
        <>
          <InfoIcon className="shrink-0 text-ink-400" />
          <span className="text-sm text-ink-800 lg:max-w-40">{v}</span>
        </>
      )}
    </div>
  )
}

export default function CompareTable({ title, heads, rows }) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="heading-2 mb-8 text-ink-950">{title}</h2>
        <div className="overflow-x-auto p-3">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th aria-hidden="true" />
                {heads.map((h) => (
                  <th key={h} scope="col" className="heading-5 size-max min-w-[143px] pb-5 pt-3 text-center text-ink-950">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="rounded-2xl bg-white ring-2 ring-ink-50 ring-offset-8">
              {rows.map((r) => (
                <tr key={r[0]} className="rounded-2xl border-none odd:bg-ink-50">
                  <th scope="row" className="rounded-l-xl px-6 py-3 text-left text-base font-medium text-ink-950">
                    {r[0]}
                  </th>
                  <td className="px-6 py-3">
                    <Value v={r[1]} />
                  </td>
                  <td className="rounded-r-xl px-6 py-3">
                    <Value v={r[2]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
