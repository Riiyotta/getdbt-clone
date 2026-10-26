import pages from '../../content/pages/t7'
import SectionsPage from './Sections'

// T7 page template; content from content/pages/t7.js, keyed by route path.
export default function T7() {
  return <SectionsPage pages={pages} />
}
