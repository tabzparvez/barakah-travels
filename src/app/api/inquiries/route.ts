import db from '@/lib/db';
import Inquiry from '@/models/Inquiry';
import { NextResponse } from 'next/server';

export async function GET() {
  await db;
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  return NextResponse.json(inquiries);
}
