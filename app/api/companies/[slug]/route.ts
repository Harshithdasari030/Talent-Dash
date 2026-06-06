import { NextResponse } from 'next/server';
import { getCompanyBySlug } from '../../../../lib/salary';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const company = await getCompanyBySlug(params.slug);

  if (!company) {
    return NextResponse.json({ error: 'Company not found' }, { status: 404 });
  }

  return NextResponse.json(company, {
    headers: {
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
