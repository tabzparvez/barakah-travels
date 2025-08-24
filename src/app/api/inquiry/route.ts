import db from '@/lib/db';
import Inquiry from '@/models/Inquiry';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  await db;
  const data = await req.json();
  const inquiry = await Inquiry.create(data);
  return NextResponse.json({ success: true, inquiry });
}
