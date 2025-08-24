import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sendWelcomeEmail } from '@/lib/mailer';

const NEWSLETTER_FILE = path.join(process.cwd(), 'newsletter_subscribers.json');

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
  }
  let subscribers: string[] = [];
  try {
    if (fs.existsSync(NEWSLETTER_FILE)) {
      subscribers = JSON.parse(fs.readFileSync(NEWSLETTER_FILE, 'utf8'));
    }
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      fs.writeFileSync(NEWSLETTER_FILE, JSON.stringify(subscribers, null, 2));
      await sendWelcomeEmail(email);
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save email.' }, { status: 500 });
  }
}
