import { prisma } from './db';
import { z } from 'zod';

export const salaryInputSchema = z.object({
  company: z.string().min(1).transform((value) => value.trim()),
  role: z.string().min(1).trim(),
  level_standardized: z.enum([
    'L3', 'L4', 'L5', 'L6', 'SDE_I', 'SDE_II', 'SDE_III', 'Staff', 'Principal', 'IC4', 'IC5'
  ]),
  location: z.string().min(1).trim(),
  currency: z.enum(['INR', 'USD', 'GBP', 'EUR']),
  experience_years: z.number().int().min(0).max(50),
  base_salary: z.number().int().positive(),
  bonus: z.number().int().min(0).optional().default(0),
  stock: z.number().int().min(0).optional().default(0),
  source: z.enum(['CONTRIBUTOR', 'SCRAPED', 'AI_INFERRED']),
  confidence_score: z.number().min(0).max(1)
});

export async function getCompanyBySlug(slug: string) {
  return prisma.company.findUnique({
    where: { slug },
    include: {
      salaries: {
        orderBy: { submitted_at: 'desc' }
      }
    }
  });
}

export async function getCompanySlugs() {
  const companies = await prisma.company.findMany({ select: { slug: true } });
  return companies.map((company) => company.slug);
}

export async function getSalaryRecords({ limit = 10, page = 1 } = {}) {
  const offset = (page - 1) * limit;
  const [records, total] = await prisma.$transaction([
    prisma.salaryRecord.findMany({
      orderBy: { submitted_at: 'desc' },
      include: { company: true },
      take: limit,
      skip: offset
    }),
    prisma.salaryRecord.count()
  ]);

  return { records, total };
}

export async function ingestSalary(rawPayload: unknown) {
  const parsed = salaryInputSchema.parse(rawPayload);
  const total_compensation = parsed.base_salary + (parsed.bonus ?? 0) + (parsed.stock ?? 0);

  const companyName = parsed.company.toLowerCase().trim();
  const slug = companyName.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  const existingCompany = await prisma.company.findUnique({ where: { slug } });
  const company = existingCompany
    ? existingCompany
    : await prisma.company.create({ data: { name: parsed.company, slug } });

  const duplicate = await prisma.salaryRecord.findFirst({
    where: {
      companyId: company.id,
      role: parsed.role,
      level_standardized: parsed.level_standardized,
      location: parsed.location,
      base_salary: {
        gte: Math.floor(parsed.base_salary * 0.9),
        lte: Math.ceil(parsed.base_salary * 1.1)
      }
    },
    orderBy: { submitted_at: 'desc' }
  });

  if (duplicate) {
    return { skipped: true, reason: 'Duplicate salary record found within 10% of base salary.' };
  }

  const record = await prisma.salaryRecord.create({
    data: {
      companyId: company.id,
      role: parsed.role,
      level_standardized: parsed.level_standardized,
      location: parsed.location,
      currency: parsed.currency,
      experience_years: parsed.experience_years,
      base_salary: parsed.base_salary,
      bonus: parsed.bonus ?? 0,
      stock: parsed.stock ?? 0,
      total_compensation,
      source: parsed.source,
      confidence_score: parsed.confidence_score
    }
  });

  return { skipped: false, record };
}

export async function getSalarySummary(companySlug: string) {
  const company = await prisma.company.findUnique({
    where: { slug: companySlug },
    include: { salaries: true }
  });

  if (!company) return null;

  const totalPayroll = company.salaries.reduce((sum, row) => sum + row.total_compensation, 0);
  const median = company.salaries.length
    ? company.salaries[Math.floor(company.salaries.length / 2)]?.total_compensation ?? 0
    : 0;

  return {
    name: company.name,
    slug: company.slug,
    count: company.salaries.length,
    average: company.salaries.length ? Math.round(totalPayroll / company.salaries.length) : 0,
    median
  };
}
