import LeadForm, { FormCard } from './Form'

// form.download-form (specs/T5-T8.md A-19): the last block of the SoAE prose. Wrapper 3/4 of the
// column at >=1280 (624 at 1440), id="download-report" (the header's primary button scrolls here);
// FormCard with a heading-3 title (mb 0) and the 6-field lead form.
export default function DownloadForm({ title, ...form }) {
  return (
    <div id="download-report" className="scroll-mt-8 xl:w-3/4">
      <FormCard>
        <LeadForm {...form} title={<h3 className="heading-3 mb-0 text-ink-950">{title}</h3>} />
      </FormCard>
    </div>
  )
}
