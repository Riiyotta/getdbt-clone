import pages from '../../content/pages/t9'
import SectionsPage from './Sections'

// T9 page template; content from content/pages/t9.js, keyed by route path.
export default function T9() {
  return <SectionsPage pages={pages} />
}
