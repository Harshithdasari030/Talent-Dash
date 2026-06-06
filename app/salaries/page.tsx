import Link from 'next/link';
import { getSalaryRecords } from '../../lib/salary';

export const revalidate = 300;

export default async function SalariesPage() {
  const { records, total } = await getSalaryRecords({ limit: 12, page: 1 });
  const totalPages = Math.max(1, Math.ceil(total / 12));

  return (
    <main className="mx-auto max-w-6xl space-y-8 rounded-3xl bg-white px-6 py-10 shadow-sm ring-1 ring-border sm:px-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-muted">Salary data</p>
          <h1 className="mt-3 text-4xl font-semibold text-deep">Real compensation records for structured decision-making.</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-body">Browse normalized salary records by company, level, and city. Every page is designed for high traffic and low serving cost.</p>
        </div>
        <Link href="/" className="rounded-full border border-border bg-app px-5 py-3 text-sm font-semibold text-deep transition hover:bg-hover">
          Back to overview
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border">
        <div className="grid bg-app px-6 py-4 text-sm font-medium text-muted sm:grid-cols-[1.4fr_1.2fr_1.2fr_1fr_1fr]">
          <span>Company / role</span>
          <span>Level</span>
          <span>Location</span>
          <span className="text-right">Base</span>
          <span className="text-right">Total</span>
        </div>
        <div className="divide-y divide-border bg-white">
          {records.map((record) => (
            <div key={record.id} className="grid px-6 py-5 text-sm sm:grid-cols-[1.4fr_1.2fr_1.2fr_1fr_1fr] sm:items-center">
              <div>
                <Link href={`/companies/${record.company.slug}`} className="font-semibold text-deep hover:text-coral">
                  {record.company.name}
                </Link>
                <p className="mt-1 text-xs text-muted">{record.role}</p>
              </div>
              <div className="py-2 text-sm text-deep">{record.level_standardized.replace('_', '-')}</div>
              <div className="py-2 text-sm text-deep">{record.location}</div>
              <div className="py-2 text-right text-sm font-semibold text-deep">{formatCurrency(record.base_salary, record.currency)}</div>
              <div className="py-2 text-right text-sm font-semibold text-coral">{formatCurrency(record.total_compensation, record.currency)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between rounded-3xl border border-border bg-app px-5 py-4 text-sm text-body">
        <span>{total} salary records</span>
        <span>Page 1 of {totalPages}</span>
      </div>
    </main>
  );
}

function formatCurrency(value: number, currency: string) {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  });
  return formatter.format(value / 100);
}
