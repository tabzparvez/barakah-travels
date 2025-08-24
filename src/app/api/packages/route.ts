
export async function PUT(req: NextRequest) {
  try {
    await db;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const data = await req.json();
    const updated = await Package.findByIdAndUpdate(id, data, { new: true });
    if (!updated) return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    await db;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const deleted = await Package.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
import db from '@/lib/db';
import Package from '@/models/Package';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    await db;
    const packages = await Package.find().sort({ createdAt: -1 });
    return NextResponse.json(packages);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await db;
    const data = await req.json();
    const pkg = await Package.create(data);
    return NextResponse.json(pkg);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
