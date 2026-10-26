import pages from '../../content/pages/t11'
import SectionsPage from './Sections'

// T11 page template; content from content/pages/t11.js, keyed by route path.
export default function T11() {
  return <SectionsPage pages={pages} />
}
