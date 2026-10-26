import SiteLink from '../SiteLink'
import { Avatar } from './parts'

// C-1 N-leaders (specs/T12-T13.md): leadership list. Centred heading-2 (!mb-8 = 32), cards in a
// gap-9 column: white, 1px #e5e7eb, r16, p-6 / lg:p-10, shadow-lg; 242 avatar circle (centred on
// mobile) + heading-3 name, role #4a5565, a text link (hover: underline only), bio paragraphs
// (*:mb-6). No card hover, no reveal.
export default function Leaders({ title, people, linkLabel }) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="heading-2 !mb-8 text-center text-ink-950 lg:mb-12">{title}</h2>
        <div className="flex flex-col gap-9">
          {people.map((p) => (
            <div
              key={p.name}
              className="flex flex-col gap-x-12 gap-y-8 rounded-2xl border border-ink-200 bg-white p-6 shadow-lg md:flex-row lg:p-10"
            >
              <div className="w-full max-w-[242px] self-center md:self-auto">
                <Avatar a={p.avatar} className="w-full" />
              </div>
              <div className="w-full">
                <h3 className="heading-3 !mb-0 text-ink-950">{p.name}</h3>
                <p className="mb-2 text-base text-ink-600">{p.role}</p>
                <SiteLink to={p.to || '#'} className="button text medium mb-2 w-fit pb-2 pl-0 pr-4 pt-0 hover:text-ink-950 hover:underline">
                  {linkLabel}
                </SiteLink>
                <div className="text-base text-ink-950 [&>*]:mb-6 [&>*:last-child]:mb-0">
                  {p.bio.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
