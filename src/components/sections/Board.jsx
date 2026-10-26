import { Avatar } from './parts'

// C-2 N-board (specs/T12-T13.md): centred heading-2, wrapped row of people: 250-max items with p-4
// (5 per row at >=1024, 3 at 768, 2 at 640, 1 below), avatar circle (218 at 1440) -> heading-4 name
// -> role #4a5565. No hover, no reveal.
export default function Board({ title, people }) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="heading-2 !mb-8 text-center text-ink-950 lg:mb-12">{title}</h2>
        <div className="flex flex-wrap justify-center">
          {people.map((p) => (
            <div key={p.name} className="flex w-full max-w-[250px] flex-col items-center p-4 sm:w-1/2 md:w-1/3 lg:w-1/5">
              <Avatar a={p.avatar} className="mb-4 w-full max-w-[242px]" />
              <h3 className="heading-4 !mb-0 text-center text-ink-950">{p.name}</h3>
              <p className="text-center text-base text-ink-600">{p.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
