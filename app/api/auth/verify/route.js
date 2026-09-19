import { NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/app/lib/auth-server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const auth = verifyAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json({ valid: false, error: auth.error }, { status: 401 });
  }

  return NextResponse.json({ valid: true, user: auth.user });
}
