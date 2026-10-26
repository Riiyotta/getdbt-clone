import AuthorRow from './AuthorRow'
import Breadcrumb from './Breadcrumb'

// article.post-header (specs/T5-T8.md A-13): breadcrumb, heading-1 (centred below 1024), author row
// with "last edited" text in a my-6 row whose inner row carries mb-6 (48 tall). No image, tag or CTA.
export default function PostHeader({ breadcrumb, title, author, date }) {
  return (
    <div>
      <Breadcrumb {...breadcrumb} />
      <h1 className="heading-1 text-center text-ink-950 lg:text-left">{title}</h1>
      <div className="my-6 flex flex-col items-center gap-3 lg:flex-row">
        <AuthorRow author={author} date={date} className="mb-6" />
      </div>
    </div>
  )
}
