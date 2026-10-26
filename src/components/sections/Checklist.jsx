import { reveal, revealRootProps } from '../../hooks/useScrollReveal'
import { CheckCircle, ShieldCheck, XCircle } from '../icons'
import { Img } from './parts'

// N-checklist (specs/T1-T4.md A), T2.
//  columns (data-modernization, `pt-0`): two lg:col-span-6 columns of icon + heading-5 + paragraph
//  split (ai, embedded, cost-optimization): h2 + p + single-line items left (7 cols), image right
//  beforeAfter (cost-optimization): two columns, heading-2 + 3 items each (circled x / circled check)
//  grid (data-trust): 3-column grid of 5 items with heading-3 titles
// Reveal: item rows staggered by 100ms; icon + title +100, paragraph +200.
// columns (data-modernization) follows the original one-for-one (28 targets at 0-500ms): column c
// at c*200 > *:mb-6 wrapper (same) > list div (same) > row j at col+j*100 { icon (row), text div
// +100 { h5 +100, p +200 } }, then the trailing empty <p> at col+100.

function Item({ item, i, Icon = CheckCircle, last, at, exact = false, plain = false }) {
  const d = at ?? i * 100
  return (
    <div {...reveal(d, `flex gap-3 ${last ? '' : 'mb-6'}`)}>
      <span {...reveal(exact ? d : d + 100, 'min-w-6 text-ink-950')}>
        {item.icon ? <Img a={item.icon} className="size-6 object-contain" /> : <Icon />}
      </span>
      <div {...(exact ? reveal(d + 100) : {})}>
        {/* measured: the title keeps mb-3 even without a paragraph (34px rows) */}
        {plain ? (
          <p {...reveal(d + 200, 'text-base text-ink-950')}>{item.title}</p>
        ) : (
          <h3 {...reveal(d + 100, 'heading-5 mb-3 text-ink-950')}>{item.title}</h3>
        )}
        {item.body ? (
          <p {...reveal(d + 200, 'text-base text-ink-950')}>{item.body}</p>
        ) : (
          exact && <p {...reveal(d + 200)} />
        )}
      </div>
    </div>
  )
}

function List({ items, Icon, offset = 0 }) {
  return items.map((item, i) => (
    <Item key={item.title} item={item} i={i + offset} Icon={Icon} last={i === items.length - 1} />
  ))
}

// *:mb-6 wrapper > list div > rows (exact per-element targets, as the columns layout) + trailing <p>
function ExactList({ items, at, plain = false }) {
  return (
    <div {...reveal(at, '[&>*:last-child]:mb-0 [&>*]:mb-6')}>
      <div {...reveal(at)}>
        {items.map((item, j) => (
          <Item key={item.title} item={item} at={at + j * 100} exact plain={plain} last={j === items.length - 1} />
        ))}
      </div>
      <p {...reveal(at + 100)} />
    </div>
  )
}

export default function Checklist({
  variant = 'columns',
  eyebrow,
  title,
  body,
  paragraphs,
  items,
  image,
  imageLeft = false,
  before,
  after,
  pt0 = true,
  plainItems = false,
}) {
  const shell = `section ${pt0 ? '!pt-0' : ''}`
  if (variant === 'split') {
    // T2 split (ai, embedded, cost-optimization) and T13 analyst rows (eyebrow, image either side).
    // One target per element, mapped like the columns layout: text column > eyebrow? > h2 > p >
    // *:mb-6 wrapper > list div > row j { icon, text div { h5, p } } + trailing <p>; then the image
    // column > div > img. Text-first: text 0 / image 200; image-first: image 0 / text 200.
    // ai (3 items, no eyebrow): 24 targets at 0-400ms.
    // `plainItems` (T13 analyst): each item is a single 16/24 paragraph next to the icon, rows 48
    // apart (the T2 rows use a heading-5 title with mb-3).
    const textBase = imageLeft ? 200 : 0
    const imageBase = imageLeft ? 0 : 200
    let step = textBase
    const next = () => {
      const d = step
      step += 100
      return d
    }
    const eyebrowAt = eyebrow ? next() : null
    const titleAt = next()
    const bodyAt = next()
    const listAt = next()
    const textCol = (
      <div {...reveal(textBase, 'col-span-full lg:col-span-7')}>
        {eyebrow && <p {...reveal(eyebrowAt, 'eyebrow mb-4')}>{eyebrow}</p>}
        <h2 {...reveal(titleAt, 'heading-2 mb-4 text-ink-950')}>{title}</h2>
        <p {...reveal(bodyAt, 'mb-6 text-base text-ink-950')}>{body}</p>
        <ExactList items={items} at={listAt} plain={plainItems} />
      </div>
    )
    const imageCol = (
      <div {...reveal(imageBase, 'col-span-full lg:col-span-5')}>
        <div {...reveal(imageBase)}>
          <Img a={image} {...reveal(imageBase, 'block h-auto w-full rounded-2xl')} />
        </div>
      </div>
    )
    return (
      <section className={shell}>
        <div className="container">
          <div {...revealRootProps} className="grid-container items-center">
            {imageLeft ? (
              <>
                {imageCol}
                {textCol}
              </>
            ) : (
              <>
                {textCol}
                {imageCol}
              </>
            )}
          </div>
        </div>
      </section>
    )
  }
  if (variant === 'splitList') {
    // partners section 1 (specs/T12-T13.md B): col-5 h2 + paragraphs | col-7 three icon items with
    // heading-5 + paragraph. Per-element reveal as N-split, items staggered 100ms. The original's list
    // wrapper keeps a 24px bottom margin (*:mb-6), so the list column is 24 taller than its rows.
    const listAt = 200
    return (
      <section className={shell}>
        <div className="container">
          <div {...revealRootProps} className="grid-container items-center">
            <div {...reveal(0, 'col-span-full lg:col-span-5')}>
              <h2 {...reveal(0, 'heading-2 mb-4 text-ink-950')}>{title}</h2>
              <div {...reveal(100, '[&>*:last-child]:mb-0 [&>*]:mb-6')}>
                {paragraphs.map((t, i) => (
                  <p key={i} {...reveal(100 + i * 100, 'text-base text-ink-950')}>
                    {t}
                  </p>
                ))}
              </div>
            </div>
            <div {...reveal(listAt, 'col-span-full pb-6 lg:col-span-7')}>
              {items.map((item, j) => (
                <Item key={item.title} item={item} at={listAt + j * 100} exact last={j === items.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
  if (variant === 'beforeAfter') {
    return (
      <section className="section">
        <div className="container">
          <div {...revealRootProps} className="grid-container items-center">
            {[
              [before, XCircle, 0],
              [after, CheckCircle, 3],
            ].map(([col, Icon, off]) => (
              <div key={col.title} className="col-span-full md:col-span-4 lg:col-span-6">
                <h2 className="heading-2 mb-6 text-ink-950">{col.title}</h2>
                <div className="mb-6">
                  <List items={col.items} Icon={Icon} offset={off} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  if (variant === 'grid') {
    // data-trust: heading-2 + paragraph header, then 3 columns of icon-left items (22x24 icon, mt-1.5)
    return (
      <section className="section">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-12">
            {title && (
              <div className="w-full">
                <h2 className="heading-2 mb-4 text-ink-950">{title}</h2>
                {body && <p className="text-base text-ink-950">{body}</p>}
              </div>
            )}
            <div {...revealRootProps} className="grid w-full justify-between gap-6 lg:grid-cols-3">
              {items.map((item, i) => (
                <div key={item.title} {...reveal(i * 100, 'flex items-start gap-4')}>
                  <span {...reveal(i * 100 + 100, 'mt-1.5 shrink-0 text-ink-950')}>
                    <ShieldCheck />
                  </span>
                  <div className="w-3/4 lg:w-full">
                    <h3 {...reveal(i * 100 + 100, 'heading-3 mb-4 text-ink-950')}>{item.title}</h3>
                    <p {...reveal(i * 100 + 200, 'text-base text-ink-950')}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
  const half = Math.ceil(items.length / 2)
  return (
    <section className={shell}>
      <div className="container">
        <div {...revealRootProps} className="grid-container items-center">
          {[items.slice(0, half), items.slice(half)].map((col, c) => (
            <div key={c} {...reveal(c * 200, 'col-span-full md:col-span-4 lg:col-span-6')}>
              {/* original: *:mb-6 wrapper > item list (keeps mb-6) + a trailing empty <p> */}
              <div {...reveal(c * 200, '[&>*:last-child]:mb-0 [&>*]:mb-6')}>
                <div {...reveal(c * 200)}>
                  {col.map((item, j) => (
                    <Item key={item.title} item={item} at={c * 200 + j * 100} exact last={j === col.length - 1} />
                  ))}
                </div>
                <p {...reveal(c * 200 + 100)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
