import pages from '../../content/pages/t10'
import SectionsPage from './Sections'

// T10 page template; content from content/pages/t10.js, keyed by route path.
export default function T10() {
  return <SectionsPage pages={pages} />
}
