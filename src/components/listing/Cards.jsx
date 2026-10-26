import SiteLink from '../SiteLink'
import AuthorRow from '../article/AuthorRow'
import { Btn, Img, TextLink } from '../sections/parts'

// listing.card-grid cards (specs/T5-T8.md A-6). Shared anatomy (all but the case-study card):
// borderless card; 16:9 image box r16 (the image is a link); meta row 32 below the image (tag chip +
// optional 14/20 text); heading-4 title link (underline on hover); then per variant:
//   blog: excerpt p.mb-3 + author row        compact: author row only (T8 "Latest posts")
//   resource: nothing more                   event / media / release: 14/20 #6a7282 date
// `media` cards have no tag and open in a new tab. No image zoom, shadow or opacity change on hover.
function CardLink({ item, className, children, ...rest }) {
  const ext = item.external ? { target: '_blank', rel: 'noreferrer' } : {}
  return (
    <SiteLink to={item.to} className={className} {...ext} {...rest}>
      {children}
    </SiteLink>
  )
}

export function PostCard({ item, variant = 'blog' }) {
  const tag = variant !== 'media' && item.tag
  return (
    <div className="w-full rounded-2xl">
      <CardLink item={item} tabIndex={-1} aria-hidden="true" className={`relative block aspect-video overflow-hidden rounded-2xl ${variant === 'resource' ? 'cursor-pointer' : ''}`}>
        <Img a={item.image} alt="" className="h-full w-full rounded-2xl object-cover" />
      </CardLink>
      {(tag || item.readTime) && (
        <div className="mt-8 flex items-baseline gap-2 text-sm">
          {tag && <span className="tag">{tag}</span>}
          {item.readTime && <span className="text-sm text-ink-950">{item.readTime}</span>}
        </div>
      )}
      <h3 className={`heading-4 my-3 text-left text-ink-950 ${tag || item.readTime ? '' : 'mt-8'}`.trim()}>
        <CardLink item={item} className="no-underline hover:underline">
          {item.title}
        </CardLink>
      </h3>
      {variant === 'blog' && item.excerpt && <p className="mb-3 text-base text-ink-950">{item.excerpt}</p>}
      {(variant === 'blog' || variant === 'compact') && <AuthorRow author={item.author} date={item.date} />}
      {['event', 'media', 'release', 'session'].includes(variant) && item.date && <p className="text-sm text-ink-500">{item.date}</p>}
    </div>
  )
}

// 6f case-study card: bordered, p-32, min-h 400; logo (100 wide) link, title link, summary, text link
export function CaseCard({ item }) {
  return (
    <div className="flex min-h-[400px] flex-col items-start justify-center rounded-2xl border border-ink-200 bg-white p-8">
      <div className="mb-6 max-w-[100px]">
        <SiteLink to={item.to} aria-label={item.name}>
          <Img a={item.logo} alt="" className="block h-auto w-[100px]" />
        </SiteLink>
      </div>
      <div className="my-auto flex flex-col">
        <SiteLink to={item.to} className="mb-2">
          <h3 className="heading-4 text-ink-950 hover:underline">{item.title}</h3>
        </SiteLink>
        <p className="mb-6 text-base text-ink-800">{item.body}</p>
      </div>
      <TextLink cta={{ label: item.link || 'Read the story', to: item.to }} shift className="!pt-2 !pb-2" />
    </div>
  )
}

// 6g skeleton card: pulse blocks in #f3f4f6 (image 16:9 r8, 80x16, 28 bar, 3 x 128x16, 2 text bars)
export function SkeletonCard() {
  const blk = 'animate-pulse bg-ink-100'
  return (
    <div className="flex flex-col space-y-3" aria-hidden="true">
      <div className={`${blk} aspect-video w-full rounded-lg`} />
      <div className={`${blk} h-4 w-20 rounded-badge`} />
      <div className={`${blk} h-7 w-full rounded-badge`} />
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`${blk} h-4 w-32 rounded-badge`} />
        ))}
      </div>
      <div className={`${blk} h-4 w-full rounded-badge`} />
      <div className={`${blk} h-4 w-4/5 rounded-badge`} />
    </div>
  )
}

// A-9 /case-studies no-results state: 80px illustration, heading-4, secondary button clearing search
export function CaseEmpty({ image, title, button, onClear }) {
  return (
    <div className="container flex flex-col items-center gap-4 py-12 text-center">
      <Img a={image} className="mb-4 size-20" />
      <h4 className="heading-4 text-ink-950">{title}</h4>
      <button type="button" onClick={onClear} className="button secondary medium mt-6 !w-auto">
        {button}
      </button>
    </div>
  )
}

// A-9 /events (and on-demand) no-results block: two grey-backed text lines, centred
export function TextEmpty({ line, title }) {
  return (
    <div className="w-full text-center">
      <span className="block bg-ink-100 md:text-lg">{line}</span>
      <span className="mt-4 block bg-ink-100 text-2xl font-bold md:text-3xl md:leading-[38.4px]">{title}</span>
    </div>
  )
}

// A-8 view more (case-studies: secondary medium; coalesce/press: primary medium), centred, mt-8
export function ViewMore({ label, onClick, variant = 'secondary' }) {
  return (
    <div className="mt-8 flex justify-center">
      <button type="button" onClick={onClick} className={`button ${variant} medium !w-auto`}>
        {label}
      </button>
    </div>
  )
}

export { Btn }
