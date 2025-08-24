import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
  }
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db();
    await db.collection('newsletter_subscribers').updateOne(
      { email },
      { $set: { email, subscribedAt: new Date() } },
      { upsert: true }
    );
    client.close();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save email.' }, { status: 500 });
  }
}
