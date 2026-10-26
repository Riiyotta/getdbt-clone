import { Fragment } from 'react'
import { reveal, revealRootProps } from '../../hooks/useScrollReveal'
import SiteLink from '../SiteLink'
import { Btn, Img, VideoPoster } from './parts'

// N-split (specs/T1-T4.md A): homepage H-split with the media column first.
//  - default (T1 section 2): image left at >=768 and first on mobile; eyebrow, h2, 2 paragraphs,
//    primary medium button.
//  - textLeft (quarry / stratus section 3): text left with a bullet list and optional primary +
//    tertiary buttons, image right.
//  - video (ai section 5): a 16:9 poster (no radius) left, eyebrow + h2 + paragraph right.
// Reveal (measured on develop, bigquery, microsoft-fabric, ai): the first column starts at 0ms, the
// second at 200ms. Inside the text column each direct item steps 100ms (eyebrow, h2, the *:mb-6
// wrapper, the button row); inside the wrapper the paragraphs / list step 100ms from the wrapper,
// each <li> 100ms from its list, each button 100ms from its row. The image column wraps the <img> in
// an animated div at the column's delay; the video poster column has no inner target.
//   default:  img col 0 > div 0 > img 0 | text 200: eyebrow 200, h2 300, wrap 400 (p 400/500), buttons 500
//   textLeft: text 0: h2 0, wrap 100 (p 100, ul 200, li 200/300/400), buttons 200 (a 200/300) | img 200
// T12-T13 additions (specs/T12-T13.md B "N-split additions"):
//  - `cols` = left/right widths at >=1024: '6/6' (default), '7/5', '5/7', '7/4' (media at col 9)
//  - `poster` puts a 16:9 video poster in the media column of any variant
//  - paragraphs may be rich: an array of strings and { b } (bold) / { a, to } (link) runs; each run
//    fades in its own step (+100 from its paragraph), as on the original
//  - bullets may carry a bold lead-in: { lead, text }
//  - `pt0` for the second and later rows of a run of splits
const SPANS = {
  '6/6': ['lg:col-span-6', 'lg:col-span-6'],
  '7/5': ['lg:col-span-7', 'lg:col-span-5'],
  '5/7': ['lg:col-span-5', 'lg:col-span-7'],
  '7/4': ['lg:col-span-7', 'lg:col-span-4 lg:col-start-9'],
}

function Rich({ runs, at }) {
  if (typeof runs === 'string') return runs
  let k = 0
  return runs.map((r, i) => {
    if (typeof r === 'string') return <Fragment key={i}>{r}</Fragment>
    k += 1
    const d = at + k * 100
    if (r.a)
      return (
        <SiteLink key={i} to={r.to} {...reveal(d, 'link-styles font-medium text-purple-600 hover:underline')}>
          {r.a}
        </SiteLink>
      )
    return (
      <strong key={i} {...reveal(d, 'font-bold')}>
        {r.b}
      </strong>
    )
  })
}

export default function Split({
  id,
  variant = 'default',
  cols = '6/6',
  eyebrow,
  title,
  paragraphs = [],
  bullets,
  after = [],
  primary,
  tertiary,
  media,
  poster,
  pt0 = false,
}) {
  const textLeft = variant === 'textLeft'
  const mediaBase = textLeft ? 200 : 0
  const textBase = textLeft ? 0 : 200
  const [leftSpan, rightSpan] = SPANS[cols]
  const [textSpan, mediaSpan] = textLeft ? [leftSpan, rightSpan] : [rightSpan, leftSpan]
  const mediaCol = (
    <div {...reveal(mediaBase, `col-span-full md:col-span-4 ${mediaSpan}`)}>
      {variant === 'video' || poster ? (
        <VideoPoster a={poster || media} />
      ) : (
        <div {...reveal(mediaBase)}>
          <Img a={media} {...reveal(mediaBase, 'mx-auto block h-auto w-full rounded-2xl')} />
        </div>
      )}
    </div>
  )
  // sequential 100ms steps for the text column's direct items
  let step = textBase
  const next = () => {
    const d = step
    step += 100
    return d
  }
  const eyebrowAt = eyebrow ? next() : null
  const titleAt = next()
  const wrapAt = next()
  const buttonsAt = primary || tertiary ? next() : null
  const listAt = wrapAt + paragraphs.length * 100
  const afterAt = listAt + (bullets ? 100 : 0)
  const textCol = (
    <div {...reveal(textBase, `col-span-full md:col-span-4 ${textSpan}`)}>
      {eyebrow && <p {...reveal(eyebrowAt, 'eyebrow mb-4')}>{eyebrow}</p>}
      <h2 {...reveal(titleAt, 'heading-2 mb-4 text-ink-950')}>{title}</h2>
      <div {...reveal(wrapAt, '[&>*:last-child]:mb-0 [&>*]:mb-6')}>
        {paragraphs.map((p, i) => (
          <p key={i} {...reveal(wrapAt + i * 100, 'text-base text-ink-950')}>
            <Rich runs={p} at={wrapAt + i * 100} />
          </p>
        ))}
        {bullets && (
          <ul {...reveal(listAt, 'ml-4 mt-2 list-disc pl-4 text-base text-ink-950 marker:text-xl marker:text-ink-500')}>
            {bullets.map((b, i) => (
              <li key={typeof b === 'string' ? b : b.lead} {...reveal(listAt + i * 100)}>
                {typeof b === 'string' ? (
                  b
                ) : (
                  <>
                    <strong className="font-bold">{b.lead}</strong> {b.text}
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
        {after.map((p, i) => (
          <p key={`a${i}`} {...reveal(afterAt + i * 100, 'text-base text-ink-950')}>
            <Rich runs={p} at={afterAt + i * 100} />
          </p>
        ))}
      </div>
      {buttonsAt !== null && (
        <div {...reveal(buttonsAt, 'mt-8 flex flex-col gap-3 md:flex-row')}>
          {[
            [primary, 'primary'],
            [tertiary, 'tertiary'],
          ]
            .filter(([c]) => c)
            .map(([c, v], i) => (
              <Btn key={v} cta={c} variant={v} size="medium" {...reveal(buttonsAt + i * 100)} />
            ))}
        </div>
      )}
    </div>
  )
  return (
    <section id={id} className={`section ${pt0 ? '!pt-0' : ''}`.trim()}>
      <div className="container">
        <div {...revealRootProps} className="grid-container items-center">
          {textLeft ? (
            <>
              {textCol}
              {mediaCol}
            </>
          ) : (
            <>
              {mediaCol}
              {textCol}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
