import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const ok = await authenticate(username, password);
  if (ok) {
    // Set a simple cookie (for demo; use JWT/session in production)
    return NextResponse.json({ success: true }, {
      headers: {
        'Set-Cookie': `admin=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`
      }
    });
  }
  return NextResponse.json({ success: false }, { status: 401 });
}
