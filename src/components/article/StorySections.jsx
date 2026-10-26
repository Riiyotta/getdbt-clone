import SiteLink from '../SiteLink'
import { Img, TextLink } from '../sections/parts'
import Prose from './Prose'
import StoryMeta from './StoryMeta'

// T5 body: prose (8 columns, chapters open with h3) + story-meta aside (4 columns)
export function StoryBody({ blocks, meta }) {
  return (
    <section className="section !pt-0 pb-16">
      <div className="container">
        <div className="grid-container">
          <article className="col-span-full lg:col-span-8">
            <Prose blocks={blocks} chapterAt="h3" />
          </article>
          <StoryMeta {...meta} />
        </div>
      </div>
    </section>
  )
}

// B-T5a related stories: mono eyebrow, heading-2, 3 bordered story cards (logo, heading-4 title link,
// summary, text link with the 6px chevron shift). No reveal.
export function RelatedStories({ eyebrow, title, cards }) {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h2 className="heading-2 my-4 text-ink-950">{title}</h2>
        <div className="mt-8 flex flex-col gap-6 md:flex-row">
          {cards.map((c) => (
            <div key={c.title} className="mx-auto flex max-w-100 flex-col items-start rounded-2xl border border-ink-200 bg-blur p-10 backdrop-blur-md md:mx-0 md:flex-1">
              <div className="mb-10 h-8">
                <Img a={c.logo} className="h-8 w-auto max-w-[150px] object-contain" />
              </div>
              <h3 className="heading-4 mb-3 text-ink-950">
                <SiteLink to={c.to}>{c.title}</SiteLink>
              </h3>
              <p className="mb-10 text-base text-ink-800">{c.body}</p>
              <TextLink cta={{ label: c.link, to: c.to }} shift className="mt-auto pb-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
