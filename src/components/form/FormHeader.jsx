import Breadcrumb from '../article/Breadcrumb'
import Prose from '../article/Prose'
import Baton from '../sections/Baton'
import { Img } from '../sections/parts'
import LeadForm, { FormCard } from './Form'

// form.form-header (specs/T9-T11.md B): two-column header. Left (6 of 12 columns): optional
// breadcrumb (T9), tag chip, H1 (heading-1 on T10, heading-2 size on T9), body blocks in the prose
// rhythm. Right (5 columns, ending at column 12; stacked 32 below at <768): the form card, sticky
// 32px from the top at >=1024, or (whitepaper) the cover image. `stroke` adds an N-baton behind.
// No scroll reveal.
export default function FormHeader({ breadcrumb, tag, title, h1 = 'heading-1', blocks = [], form, cover, stroke }) {
  return (
    <header className={`z-5 overflow-hidden bg-white py-12 md:py-16 ${stroke ? 'relative' : ''}`.trim()}>
      {stroke && <Baton shape={stroke} gradient="gradient-01" />}
      <div className="container">
        <div className="relative z-10">
          {breadcrumb && <Breadcrumb {...breadcrumb} />}
          <div className="grid-container relative items-start">
            <div className="col-span-full md:col-span-4 lg:col-span-6">
              {tag && <span className="tag mb-4 inline-block">{tag}</span>}
              <h1 className={`${h1} mb-4 text-ink-950 lg:mb-6`}>
                <span>{title}</span>
              </h1>
              <Prose blocks={blocks} />
            </div>
            <div className="relative col-span-full mt-8 md:col-span-4 md:mt-0 lg:col-span-5 lg:col-end-13">
              <div className="top-8 lg:sticky">
                {form && (
                  <FormCard id={form.id}>
                    <LeadForm {...form} />
                  </FormCard>
                )}
                {cover && (
                  <div className="lg:flex lg:justify-end">
                    <Img a={cover} eager className="block h-auto w-full rounded-2xl" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
