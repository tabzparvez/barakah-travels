import db from '@/lib/db';
import GalleryItem from '@/models/GalleryItem';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await db;
  const items = await GalleryItem.find().sort({ createdAt: -1 });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await db;
  const data = await req.json();
  const item = await GalleryItem.create(data);
  return NextResponse.json(item);
}
