import { getCompanyBySlug, getCompanySlugs } from '../../../lib/salary';
import Link from 'next/link';

export async function generateStaticParams() {
  const slugs = await getCompanySlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function CompanyPage({ params }: { params: { slug: string } }) {
  const company = await getCompanyBySlug(params.slug);

  if (!company) {
    return (
      <main className="mx-auto max-w-5xl rounded-3xl bg-white px-6 py-10 shadow-sm ring-1 ring-border sm:px-10">
        <p className="text-sm text-muted">Company not found.</p>
      </main>
    );
  }

  const salaries = company.salaries;
  const averageTotal = salaries.length
    ? Math.round(salaries.reduce((sum, row) => sum + row.total_compensation, 0) / salaries.length)
    : 0;

  return (
    <main className="mx-auto max-w-6xl space-y-8 rounded-3xl bg-white px-6 py-10 shadow-sm ring-1 ring-border sm:px-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-muted">Company profile</p>
          <h1 className="mt-3 text-4xl font-semibold text-deep">{company.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-body">Salary records for {company.name} with role, level, and city normalization.</p>
        </div>
        <Link href="/salaries" className="rounded-full border border-border bg-app px-5 py-3 text-sm font-semibold text-deep transition hover:bg-hover">
          Browse salaries
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-border bg-app p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-muted">Records</p>
          <p className="mt-3 text-3xl font-semibold text-deep">{salaries.length}</p>
        </div>
        <div className="rounded-3xl border border-border bg-app p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-muted">Average total</p>
          <p className="mt-3 text-3xl font-semibold text-coral">{formatCurrency(averageTotal, salaries[0]?.currency ?? 'INR')}</p>
        </div>
        <div className="rounded-3xl border border-border bg-app p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-muted">Locations</p>
          <p className="mt-3 text-3xl font-semibold text-deep">{new Set(salaries.map((item) => item.location)).size}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border">
        <div className="grid bg-app px-6 py-4 text-sm font-medium text-muted sm:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <span>Role</span>
          <span>Level</span>
          <span>Location</span>
          <span className="text-right">Total</span>
        </div>
        <div className="divide-y divide-border bg-white">
          {salaries.map((record) => (
            <div key={record.id} className="grid px-6 py-5 text-sm sm:grid-cols-[1.6fr_1fr_1fr_1fr] sm:items-center">
              <div>
                <p className="font-semibold text-deep">{record.role}</p>
                <p className="mt-1 text-xs text-muted">{record.currency} • {record.experience_years} yrs</p>
              </div>
              <div className="py-2 text-sm text-deep">{record.level_standardized.replace('_', '-')}</div>
              <div className="py-2 text-sm text-deep">{record.location}</div>
              <div className="py-2 text-right text-sm font-semibold text-coral">{formatCurrency(record.total_compensation, record.currency)}</div>
            </div>
          ))}
        </div>
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
