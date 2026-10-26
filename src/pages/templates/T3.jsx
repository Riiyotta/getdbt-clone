import pages from '../../content/pages/t3'
import SectionsPage from './Sections'

// T3 page template (specs/T1-T4.md): section order and content come from content/pages/t3.js.
export default function T3() {
  return <SectionsPage pages={pages} />
}
