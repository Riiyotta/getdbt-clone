import pages from '../../content/pages/t1'
import SectionsPage from './Sections'

// T1 page template (specs/T1-T4.md): section order and content come from content/pages/t1.js.
export default function T1() {
  return <SectionsPage pages={pages} />
}
