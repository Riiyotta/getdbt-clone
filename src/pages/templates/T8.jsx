import pages from '../../content/pages/t8'
import SectionsPage from './Sections'

// T8 page template; content from content/pages/t8.js, keyed by route path.
export default function T8() {
  return <SectionsPage pages={pages} />
}
