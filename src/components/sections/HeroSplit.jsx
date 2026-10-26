import Baton from './Baton'
import { Btn, Img, VideoPoster } from './parts'

// N-hero-split (specs/T1-T4.md A): T1/T3 hero, text left + media right, brush stroke behind.
// `flush` = T3 members' `lg:py-0` (612 tall, image flush with the header top and bottom). No reveal.
// T12-T13 variants (specs/T12-T13.md B): `badge` tag chip; `bigLead` text-2xl lead (24/32);
// `wide` 7/5 split (text 718 + media 506); `pb0` (lg:pb-0, media flush with the header bottom);
// `lockup` product wordmark above the H1 (max-h 46); media kinds: `media` image (r16), `video`
// 16:9 poster with no radius (video / iframe slots), `framed` image in a bg-blur 1px #e5e7eb r12 p-2
// frame; `stillStroke` = stroke drawn and visible from the start (about-us S3).
export default function HeroSplit({
  badge,
  lockup,
  title,
  lead,
  bigLead = false,
  primary,
  secondary,
  media,
  video,
  framed,
  stroke,
  gradient,
  stillStroke = false,
  flush = false,
  pb0 = false,
  wide = false,
}) {
  return (
    <header className={`relative z-5 overflow-hidden bg-white py-12 md:py-16 ${flush ? 'lg:py-0' : ''} ${pb0 ? 'lg:pb-0' : ''}`.trim()}>
      <Baton shape={stroke} gradient={gradient} still={stillStroke} />
      <div className="container relative z-10">
        <div className="grid-container items-center">
          <div className={`col-span-full md:col-span-4 ${wide ? 'lg:col-span-7' : 'lg:col-span-6'}`}>
            {lockup && <Img a={lockup} eager className="mb-4 block max-h-[46px] w-auto object-contain" />}
            {badge && (
              <span className="mb-4 inline-block rounded-badge bg-purple-100 p-1 font-mono text-xs font-medium text-purple-600">
                {badge}
              </span>
            )}
            <h1 className="heading-1 mb-4 text-ink-950 lg:mb-6">{title}</h1>
            {lead && <p className={bigLead ? 'font-sans text-2xl font-normal text-ink-950' : 'lead text-ink-950'}>{lead}</p>}
            {(primary || secondary) && (
              <div className="mt-8 flex flex-col gap-3 md:mt-10 md:flex-row">
                <Btn cta={primary} variant="primary" size="large" />
                <Btn cta={secondary} variant="secondary" size="large" />
              </div>
            )}
          </div>
          {(media || video || framed) && (
            <div className={`col-span-full mt-8 md:col-span-4 md:mt-0 lg:flex lg:justify-end ${wide ? 'lg:col-span-5' : 'lg:col-span-6'}`}>
              {media && <Img a={media} eager className={`h-auto max-w-full rounded-2xl ${media.ratio ? 'w-full' : ''}`} />}
              {video && <VideoPoster a={video} />}
              {framed && (
                <div className="w-full rounded-xl border border-ink-200 bg-blur p-2 backdrop-blur-md">
                  <Img a={framed} eager className="block h-auto w-full rounded-2xl" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
