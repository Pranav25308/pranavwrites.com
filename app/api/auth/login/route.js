import { NextResponse } from 'next/server';
import { login } from '@/app/services/authService';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const result = await login(username, password);
    if (!result.success) {
      return NextResponse.json({ error: result.message || 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({ success: true, token: result.token, user: result.user });
  } catch (error) {
    console.error('POST /api/auth/login error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
