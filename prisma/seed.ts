import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const amazon = await prisma.company.upsert({
    where: { slug: 'amazon' },
    update: {},
    create: { name: 'Amazon', slug: 'amazon' }
  });

  const google = await prisma.company.upsert({
    where: { slug: 'google' },
    update: {},
    create: { name: 'Google', slug: 'google' }
  });

  const flipkart = await prisma.company.upsert({
    where: { slug: 'flipkart' },
    update: {},
    create: { name: 'Flipkart', slug: 'flipkart' }
  });

  await prisma.salaryRecord.createMany({
    data: [
      {
        companyId: amazon.id,
        role: 'Software Development Engineer',
        level_standardized: 'L4',
        location: 'Bengaluru',
        currency: 'INR',
        experience_years: 4,
        base_salary: 18000000,
        bonus: 2000000,
        stock: 1200000,
        total_compensation: 21200000,
        source: 'SCRAPED',
        confidence_score: 0.75
      },
      {
        companyId: google.id,
        role: 'Software Engineer',
        level_standardized: 'L4',
        location: 'Bengaluru',
        currency: 'INR',
        experience_years: 4,
        base_salary: 19500000,
        bonus: 1800000,
        stock: 1000000,
        total_compensation: 22300000,
        source: 'SCRAPED',
        confidence_score: 0.78
      },
      {
        companyId: flipkart.id,
        role: 'Software Engineer II',
        level_standardized: 'SDE_II',
        location: 'Bengaluru',
        currency: 'INR',
        experience_years: 5,
        base_salary: 13000000,
        bonus: 1000000,
        stock: 500000,
        total_compensation: 14500000,
        source: 'SCRAPED',
        confidence_score: 0.72
      }
    ],
    skipDuplicates: true
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
