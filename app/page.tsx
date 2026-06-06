import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl rounded-3xl bg-white px-6 py-10 shadow-sm ring-1 ring-border sm:px-10 md:px-14">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <p className="inline-flex rounded-full border border-coral bg-coral/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-coral">
            Career intelligence</p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-deep sm:text-5xl">
            Actionable compensation data for every career decision.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-body">
            TalentDash turns structured salary, interview and company data into decision-ready pages. Built for high-traffic SEO, low infra cost, and precise comparisons.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/salaries" className="inline-flex items-center justify-center rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#e84b50]">
              Explore Salaries
            </Link>
            <Link href="/compare" className="inline-flex items-center justify-center rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-deep transition hover:bg-hover">
              Compare companies
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-app p-6">
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-border">
              <p className="text-sm uppercase tracking-[0.2em] text-muted">Structured</p>
              <p className="mt-3 text-2xl font-semibold text-deep">Company + role + level + city</p>
              <p className="mt-2 text-sm leading-6 text-body">Every salary page is built as a discrete data point that Google can index directly.</p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-border">
              <p className="text-sm uppercase tracking-[0.2em] text-muted">Comparable</p>
              <p className="mt-3 text-2xl font-semibold text-deep">Same schema across markets.</p>
              <p className="mt-2 text-sm leading-6 text-body">Normalized levels, currency, and location mean offers can be compared side-by-side without guesswork.</p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-border">
              <p className="text-sm uppercase tracking-[0.2em] text-muted">Decision-ready</p>
              <p className="mt-3 text-2xl font-semibold text-deep">No opinion columns, no ratings without context.</p>
              <p className="mt-2 text-sm leading-6 text-body">Facts first: salary bands, interview rounds, confidence score, and data source matter most.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-6 md:grid-cols-3">
        {[
          { title: 'Automated salary ingestion', detail: 'API and schema enforce normalized compensation data.' },
          { title: 'Static-first SEO pages', detail: 'Company and salary routes are generated with real database slugs.' },
          { title: 'Minimal edge cache cost', detail: 'Cache-control headers support CDN-friendly stale-while-revalidate behavior.' }
        ].map((item) => (
          <article key={item.title} className="rounded-3xl border border-border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-deep">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-body">{item.detail}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
