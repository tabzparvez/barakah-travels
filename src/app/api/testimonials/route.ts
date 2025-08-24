import db from '@/lib/db';
import Testimonial from '@/models/Testimonial';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await db;
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  return NextResponse.json(testimonials);
}

export async function POST(req: NextRequest) {
  await db;
  const data = await req.json();
  const testimonial = await Testimonial.create(data);
  return NextResponse.json(testimonial);
}
