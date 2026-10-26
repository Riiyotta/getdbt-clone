import { Img } from '../sections/parts'

// article.story-meta (specs/T5-T8.md A-21): bordered card (r16, p 24): logo (92 wide, mb 40) then
// fact rows (heading-5 label, 16/24 value). Not sticky; drops under the article below 1024.
export default function StoryMeta({ logo, facts }) {
  return (
    <aside className="col-span-full lg:col-span-4">
      <div className="rounded-2xl border border-ink-200 p-6">
        <Img a={logo} className="mb-10 block h-auto w-[92px] max-w-[92px]" />
        {facts.map((f) => (
          <div key={f.label} className="mt-6">
            <h2 className="heading-5 !mb-2 text-ink-950">{f.label}</h2>
            <p className="text-base text-ink-950">{f.value}</p>
          </div>
        ))}
      </div>
    </aside>
  )
}
