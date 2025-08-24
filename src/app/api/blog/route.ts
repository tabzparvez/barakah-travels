import db from '@/lib/db';
import Blog from '@/models/Blog';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await db;
  const posts = await Blog.find().sort({ createdAt: -1 });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  await db;
  const data = await req.json();
  const post = await Blog.create(data);
  return NextResponse.json(post);
}
