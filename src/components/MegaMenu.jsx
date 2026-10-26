import { assets } from '../assets'
import { ChevronRight16 } from './icons'
import SiteLink from './SiteLink'

// CLONE_SPEC 2.2 mega-menu card (846px) + purple footer strip.
function Item({ item }) {
  return (
    <SiteLink
      label={item.title}
      className="flex items-center gap-2 rounded-lg p-2 transition-colors duration-150 ease-standard hover:bg-ink-50"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-ink-50">
        <img src={assets.menuIcons[item.icon]} alt="" width={20} height={20} className="size-5" />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-ink-950">{item.title}</span>
        <span className="text-xs text-ink-600">{item.desc}</span>
      </span>
    </SiteLink>
  )
}

function Group({ group, featured }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="px-2 text-xs text-ink-800">{group.label}</p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
        {group.items.map((item) => (
          <Item key={item.title} item={item} />
        ))}
        {featured && (
          <SiteLink
            label={featured.title}
            className="col-span-2 flex items-center gap-4 rounded-lg border border-ink-200 p-4 transition-colors duration-150 ease-standard hover:bg-ink-50"
          >
            <img src={assets.menuFeatured} alt="" width={124} height={61} className="h-[61px] w-[124px] shrink-0" />
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-ink-950">{featured.title}</span>
              <span className="text-xs text-ink-600">{featured.desc}</span>
            </span>
          </SiteLink>
        )}
      </div>
    </div>
  )
}

export default function MegaMenu({ menu, onMouseEnter, onMouseLeave }) {
  return (
    <div className="pointer-events-auto w-megamenu" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="flex rounded-t-2xl border border-ink-200 bg-white shadow-primary">
        <div className="flex w-full max-w-[644px] flex-col gap-6 px-4 py-6">
          <Group group={menu.groupA} featured={menu.featured} />
          <Group group={menu.groupB} />
        </div>
        <div className="flex min-w-[200px] flex-1 flex-col gap-4 rounded-tr-2xl bg-ink-50 p-6">
          <p className="text-xs text-ink-800">{menu.side.label}</p>
          {menu.side.links.map((l) => (
            <SiteLink key={l} label={l} className="text-sm font-medium text-ink-950 hover:underline">
              {l}
            </SiteLink>
          ))}
          <SiteLink label={menu.side.cta} className="group mt-auto flex items-center gap-1 text-sm font-medium text-ink-950">
            {menu.side.cta}
            <ChevronRight16 className="transition-transform duration-150 ease-standard group-hover:translate-x-0.5" />
          </SiteLink>
        </div>
      </div>
      <SiteLink
        label={menu.strip}
        className="group flex items-center justify-between rounded-b-2xl bg-purple-600 px-6 py-3 text-sm font-medium text-white"
      >
        <span className="group-hover:underline">{menu.strip}</span>
        <ChevronRight16 className="transition-transform duration-150 ease-standard group-hover:translate-x-1.5" />
      </SiteLink>
    </div>
  )
}
