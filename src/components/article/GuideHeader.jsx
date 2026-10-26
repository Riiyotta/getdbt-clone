import { Btn, Img } from '../sections/parts'
import AuthorRow from './AuthorRow'
import Breadcrumb from './Breadcrumb'

function Clock() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 4.75V8l2.25 1.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// article.guide-header (specs/T5-T8.md A-14): breadcrumb, then 7 / 5 columns: optional tag, H1
// heading-1, meta row (author row with a plain 24px avatar, or a clock + read time), button row;
// image (r16) on the right.
export default function GuideHeader({ breadcrumb, tag, title, author, readTime, buttons = [], image }) {
  return (
    <header className="overflow-hidden bg-white py-12 md:py-16">
      <div className="container">
        <Breadcrumb {...breadcrumb} />
        <div className="grid-container items-center">
          <div className="col-span-full md:col-span-4 lg:col-span-7">
            {tag && <span className="tag mb-4 inline-block">{tag}</span>}
            <h1 className="heading-1 text-ink-950">{title}</h1>
            <div className="mt-6">
              {author && <AuthorRow author={author} plain />}
              {readTime && (
                <p className="flex items-center gap-1 text-sm text-ink-950">
                  <Clock />
                  {readTime}
                </p>
              )}
            </div>
            <div className="mt-8 flex flex-col gap-3 md:mt-10 md:flex-row">
              {buttons.map((b, i) => (
                <Btn key={b.label} cta={b} variant={i === 0 ? 'primary' : 'secondary'} size="large" />
              ))}
            </div>
          </div>
          <div className="col-span-full mt-8 md:col-span-4 md:mt-0 lg:col-span-5 lg:flex lg:justify-end">
            <Img a={image} eager className="block h-auto w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </header>
  )
}
