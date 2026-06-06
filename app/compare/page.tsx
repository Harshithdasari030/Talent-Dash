import Link from 'next/link';

export default function ComparePage() {
  return (
    <main className="mx-auto max-w-5xl rounded-3xl bg-white px-6 py-10 shadow-sm ring-1 ring-border sm:px-10">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-muted">Compare</p>
          <h1 className="mt-3 text-4xl font-semibold text-deep">Side-by-side company compensation context.</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-body">Select any two companies and compare base salaries, total compensation, and level alignment for the same role.</p>
        </div>
        <Link href="/salaries" className="rounded-full border border-border bg-app px-5 py-3 text-sm font-semibold text-deep transition hover:bg-hover">
          View salaries
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {[
          { name: 'Amazon', avg: '₹48,00,000', median: '₹46,50,000' },
          { name: 'Google', avg: '₹52,00,000', median: '₹50,00,000' }
        ].map((company) => (
          <div key={company.name} className="rounded-3xl border border-border bg-app p-6">
            <h2 className="text-xl font-semibold text-deep">{company.name}</h2>
            <p className="mt-3 text-sm text-body">Average reported total compensation for comparable levels.</p>
            <div className="mt-6 grid gap-3 rounded-3xl bg-white p-5 text-sm shadow-sm ring-1 ring-border">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-muted">Average total</span>
                <span className="font-semibold text-deep">{company.avg}</span>
              </div>
              <div className="flex items-center justify-between pt-3">
                <span className="text-muted">Median total</span>
                <span className="font-semibold text-deep">{company.median}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
