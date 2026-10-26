import pages from '../../content/pages/t5'
import SectionsPage from './Sections'

// T5 page template; content from content/pages/t5.js, keyed by route path.
export default function T5() {
  return <SectionsPage pages={pages} />
}
