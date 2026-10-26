import { DownloadFormBlock } from './blocks'
import PostHeader from './PostHeader'
import Prose from './Prose'
import { BlogRail, GuideRail, ProgressBar } from './StickyRail'

// Article body layouts (specs/T5-T8.md A-16).
// Blog post: section.blog-content py-16; 8/12 column (post header + prose) and a 3/12 rail with an
// 80px gap at >=1024; the rail drops below the prose under 1024. Includes the reading progress bar.
export function PostBody({ header, blocks, promos }) {
  return (
    <>
      <ProgressBar />
      <section className="blog-content relative z-5 bg-white py-16">
        <div className="container">
          <div className="content flex min-h-screen flex-col justify-between lg:flex-row lg:gap-20">
            <div className="lg:w-8/12">
              <PostHeader {...header} />
              <Prose blocks={blocks} chapterAt="h2" />
            </div>
            <BlogRail promos={promos} />
          </div>
        </div>
      </section>
    </>
  )
}

// Guide / report: 2/3 prose + 1/4 rail (TOC + promo); at <768 the rail sits above the prose.
export function GuideBody({ blocks, toc, promo, form }) {
  const headings = blocks.filter((b) => b[0] === 'h2').map((b) => b[1])
  const all = form ? [...blocks, ['node', <DownloadFormBlock key="form" {...form} />]] : blocks
  return (
    <div className="contentContainer container flex flex-col-reverse justify-between py-8 md:flex-row md:py-12 lg:py-16">
      <div className="md:w-2/3">
        <Prose blocks={all} chapterAt="h2" />
      </div>
      <div className="mb-8 md:mb-0 md:w-1/4">
        <GuideRail title={toc} headings={headings} promo={promo} />
      </div>
    </div>
  )
}
