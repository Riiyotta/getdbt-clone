// C-20 developer-path dialog (specs/T12-T13.md): original placeholder copy for "Lattice".
// heading 26ch; rows: heading-4 ~21ch + paragraph ~72ch + secondary button. The original's row count
// was not captured; three rows are used.
export default {
  title: 'Where would you like to start?', // 30
  rows: [
    {
      title: 'Try the hosted platform', // 23
      body: 'Open a free workspace in your browser and connect a warehouse in minutes.', // 74
      cta: { label: 'Start free', to: '/signup' },
    },
    {
      title: 'Install the open engine', // 23
      body: 'Run the command-line engine on your own laptop and keep full local control.', // 75
      cta: { label: 'Read the setup guide', to: '/learn' },
    },
    {
      title: 'Talk with our team first', // 24
      body: 'Walk through your stack with a solutions engineer before you pick a path.', // 72
      cta: { label: 'Contact sales', to: '/contact' },
    },
  ],
  close: 'Close dialog',
}
