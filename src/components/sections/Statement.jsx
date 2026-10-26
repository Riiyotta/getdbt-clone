import SiteLink from '../SiteLink'
import { Img, VideoPoster } from './parts'

// N-statement (specs/T1-T4.md A): centred heading-2 + paragraph in an 832 column. T3 adds the
// integration diagram (832x468) or a 16:9 video poster below. No reveal.
// T12-T13 (specs/T12-T13.md B): `wide` = full container width (assistant short statement);
// `eyebrow` above the heading, `asSpan` renders the heading as an h2-styled span (self-hosting);
// `band` = #f9fafb section; `note` = a closing bold line with an inline #632ff5 700 link.
export default function Statement({ eyebrow, title, body, diagram, video, wide = false, asSpan = false, band = false, note }) {
  const H = asSpan ? 'span' : 'h2'
  return (
    <section className={`section text-center ${band ? '!bg-ink-50' : ''}`.trim()}>
      <div className="container">
        <div className={wide ? '' : 'mx-auto max-w-[832px]'}>
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <H className="heading-2 mb-6 block text-ink-950">{title}</H>
          <p className={`text-base text-ink-950 ${diagram || video || note ? 'mb-6' : ''}`}>{body}</p>
          {note && (
            <p className="text-base font-bold text-ink-950">
              {note.text}{' '}
              <SiteLink to={note.cta.to} className="font-bold text-purple-600 hover:underline">
                {note.cta.label}
              </SiteLink>
            </p>
          )}
          {diagram && (
            <div className="mb-6">
              <Img a={diagram} className="mx-auto block h-auto w-full" />
            </div>
          )}
          {/* the video player is not followed by the caption slot, so no bottom margin */}
          {video && <VideoPoster a={video} />}
        </div>
      </div>
    </section>
  )
}
