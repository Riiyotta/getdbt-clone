import SiteLink from '../SiteLink'
import AuthorRow from '../article/AuthorRow'
import { Img } from '../sections/parts'

// listing.featured-item (specs/T5-T8.md A-5): image half (16:9, r16, link) + text half (meta row,
// heading-2 title link, optional author row). Stacked below 768. 48 below the row.
export default function FeaturedItem({ item }) {
  return (
    <div className="mb-12 flex flex-col gap-6 md:flex-row">
      <div className="md:w-1/2">
        <SiteLink to={item.to} tabIndex={-1} aria-hidden="true" className="block">
          <Img a={item.image} alt="" className="aspect-video w-full rounded-2xl object-cover" />
        </SiteLink>
      </div>
      <div className="flex flex-col justify-center md:w-1/2">
        <div className="mb-3 flex items-center gap-2">
          <span className="tag">{item.tag}</span>
          {item.readTime && <span className="text-sm text-ink-950">{item.readTime}</span>}
        </div>
        <h2 className="heading-2 mb-3 text-ink-950">
          <SiteLink to={item.to} className="hover:underline">
            {item.title}
          </SiteLink>
        </h2>
        {item.author && <AuthorRow author={item.author} date={item.date} />}
      </div>
    </div>
  )
}
