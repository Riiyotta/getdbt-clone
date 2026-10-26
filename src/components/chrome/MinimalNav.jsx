import { ui } from '../../content'
import Logo from '../Logo'
import SiteLink from '../SiteLink'

// T17-0 shell.minimal-nav: 64 tall (py-4), container 1248 with px-6 (content 1200), logo 139x32
// left, "Home" 16/24 #632ff5 underlined (no underline on hover) right. Not sticky, no border/shadow.
export default function MinimalNav() {
  return (
    <nav className="bg-white py-4">
      <div className="mx-auto flex w-full max-w-[1248px] items-center justify-between px-6">
        <SiteLink to="/" aria-label={ui.home}>
          <Logo />
        </SiteLink>
        <SiteLink to="/" className="text-base text-purple-600 underline hover:no-underline">
          Home
        </SiteLink>
      </div>
    </nav>
  )
}
