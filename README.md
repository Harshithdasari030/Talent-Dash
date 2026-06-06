# TalentDash

TalentDash is a responsive Next.js career intelligence prototype built to mirror the platform’s product strategy: structured compensation insights, company intelligence, and decision-ready SEO pages.

## What’s included

- Next.js 15 App Router
- Tailwind CSS UI built from scratch
- Prisma/PostgreSQL schema with `Company` and `SalaryRecord`
- API routes for salary ingestion and read-only data access
- `generateStaticParams` on `/companies/[slug]`
- ISR support for salary pages and company pages

## Getting started

1. Copy `.env.example` to `.env` and set `DATABASE_URL`
2. Install dependencies: `npm install`
3. Generate Prisma client: `npm run db:generate`
4. Run migrations or use `prisma db push`
5. Seed sample data: `npm run db:seed`
6. Start the app: `npm run dev`

## Architecture Decisions

### Page rendering choices
- `/` homepage: static with fresh data card hints. Easy entrypoint for SEO and brand story.
- `/companies/[slug]`: static using `generateStaticParams()` from the live database. This guarantees real company pages are prebuilt and new slugs flow into deployment.
- `/salaries`: ISR with `revalidate = 300` to keep aggregated salary views fresh after ingestion.
- `/compare`: static shell with client-friendly comparison inputs.

### Pagination choice
- This prototype uses page-based limits on the salary listing to keep the UI simple and predictable for SEO. Cursor pagination is more scalable for large result sets, but page-based navigation is clearer for early product validation.

### Trade-offs
- No advanced search autocomplete or AI-powered normalization UI in this first pass.
- The company page focuses on core salary and summary metrics rather than full review and interview sections.
- Comparison is implemented as a simple company highlight comparison, not a full offer-to-offer calculator.

## Cache headers
- `GET /api/salaries`: `Cache-Control: s-maxage=300, stale-while-revalidate=3600`
- `GET /api/companies/:slug`: `Cache-Control: s-maxage=3600, stale-while-revalidate=86400`

Those TTLs balance data freshness for salary updates with CDN efficiency for SEO traffic.
