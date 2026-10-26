import SiteLink from '../SiteLink'
import { ChevronRight16 } from '../icons'
import Baton from './Baton'
import { Avatar, Img, TextLink } from './parts'

// C-9 N-bento-community (specs/T12-T13.md): dark "what's new" bento on #030711 (py 80 / 120 at
// >=1024) with S1 behind. Cards bg-blur-dark, 1px #1e2939, r16, p-6 / lg:p-10:
//  A (8 cols): text half (small eyebrow #9786ff, heading-3, paragraph) + square linked image
//  B (4): member row (40 avatar, name, role at 50%), quote, dark text link at the bottom
//  C (4): meetups, one event row (date | orange left rule with a heading-5 link + 12/16 line)
//  D (4): topics, 3 bordered rows (12/16 text | right-aligned link + 16 chevron, 4px shift)
//  E (4): image of the week (318x173, r16)
// Below 1024 every card spans the full row. No reveal.
const card = 'rounded-2xl border border-ink-800 bg-blur-dark p-6 backdrop-blur-md lg:p-10'

export default function BentoCommunity({ title, feature, member, meetup, topics, picture }) {
  return (
    <section className="relative z-5 overflow-hidden bg-ink-950 py-20 text-white md:py-16 lg:py-30">
      <Baton shape="S1" dark />
      <div className="container relative z-10">
        <h2 className="heading-2 mb-10 text-white">{title}</h2>
        <div className="grid-container gap-6">
          <div className={`col-span-full grid grid-cols-1 gap-6 lg:col-span-8 lg:grid-cols-2 lg:gap-4 ${card}`}>
            <div>
              <p className="eyebrow-sm mb-4 text-purple-400">{feature.eyebrow}</p>
              <h3 className="heading-3 mb-4 text-white">{feature.title}</h3>
              <p className="text-base text-white">{feature.body}</p>
            </div>
            <SiteLink to={feature.to} className="block">
              <Img a={feature.image} className="aspect-square h-auto w-full rounded-2xl object-cover" />
            </SiteLink>
          </div>
          <div className={`col-span-full flex flex-col gap-6 lg:col-span-4 ${card}`}>
            <div className="flex items-center gap-3">
              <Avatar a={member.avatar} className="size-10 shrink-0" />
              <div>
                <p className="text-base font-medium text-white">{member.name}</p>
                <p className="text-base text-white/50">{member.role}</p>
              </div>
            </div>
            <p className="text-base text-white">{member.quote}</p>
            <TextLink cta={member.cta} shift dark className="mt-auto w-full justify-between" />
          </div>
          <div className={`col-span-full flex flex-col lg:col-span-4 ${card}`}>
            <p className="eyebrow-sm pb-10 text-purple-400">{meetup.eyebrow}</p>
            <div className="flex gap-x-4">
              <div className="w-1/5 text-sm">
                <p className="uppercase text-white">{meetup.month}</p>
                <p className="text-sm/[14px] font-semibold text-orange-600">{meetup.day}</p>
              </div>
              <div className="w-4/5 border-l-2 border-orange-600 pl-3">
                <h5 className="heading-5 text-white">
                  <SiteLink to={meetup.to} className="hover:underline">
                    {meetup.title}
                  </SiteLink>
                </h5>
                <p className="text-xs text-white/50">{meetup.place}</p>
              </div>
            </div>
            <TextLink cta={meetup.cta} shift dark className="mt-auto w-full justify-between" />
          </div>
          <div className={`col-span-full lg:col-span-4 ${card}`}>
            <p className="eyebrow-sm pb-10 text-purple-400">{topics.eyebrow}</p>
            <div className="flex flex-col gap-4">
              {topics.rows.map((r) => (
                <div key={r.text} className="flex items-center rounded-lg border border-ink-800 bg-blur-dark p-3">
                  <p className="w-2/3 text-xs text-white">{r.text}</p>
                  <SiteLink to={r.to} className="group flex w-1/3 items-center justify-end gap-1 text-right text-xs text-white/50">
                    {r.link}
                    <ChevronRight16 className="shrink-0 transition-all group-hover:translate-x-1" />
                  </SiteLink>
                </div>
              ))}
            </div>
          </div>
          <div className={`col-span-full lg:col-span-4 ${card}`}>
            <p className="eyebrow-sm pb-10 text-purple-400">{picture.eyebrow}</p>
            <Img a={picture.image} className="h-auto w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
