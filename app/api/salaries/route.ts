import { NextResponse } from 'next/server';
import { getSalaryRecords } from '../../../lib/salary';

export async function GET() {
  const { records, total } = await getSalaryRecords({ limit: 50, page: 1 });
  return NextResponse.json({ total, records }, {
    headers: {
      'Cache-Control': 's-maxage=300, stale-while-revalidate=3600'
    }
  });
}
