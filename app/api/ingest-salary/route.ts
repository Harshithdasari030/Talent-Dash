import { NextResponse } from 'next/server';
import { ingestSalary } from '../../../lib/salary';

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const result = await ingestSalary(body);
    return NextResponse.json(result, { status: result.skipped ? 200 : 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Invalid input' },
      { status: 400 }
    );
  }
}
