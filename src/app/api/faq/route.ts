import db from '@/lib/db';
import Faq from '@/models/Faq';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await db;
  const faqs = await Faq.find().sort({ createdAt: -1 });
  return NextResponse.json(faqs);
}

export async function POST(req: NextRequest) {
  await db;
  const data = await req.json();
  const faq = await Faq.create(data);
  return NextResponse.json(faq);
}
