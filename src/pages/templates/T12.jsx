import pages from '../../content/pages/t12'
import SectionsPage from './Sections'

// T12 page template (specs/T12-T13.md D): company / program pages; content from content/pages/t12.js.
export default function T12() {
  return <SectionsPage pages={pages} />
}
