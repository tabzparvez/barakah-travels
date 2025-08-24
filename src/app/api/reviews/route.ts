import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

const reviewSchema = new mongoose.Schema({
  name: String,
  email: String,
  review: String,
  createdAt: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false },
});

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

// Abuse word filter (simple)
const BAD_WORDS = ["fuck", "shit", "bitch", "abuse", "idiot", "stupid", "hate", "kill"];
function containsAbuse(text: string) {
  return BAD_WORDS.some(word => text.toLowerCase().includes(word));
}

export async function GET() {
  await connectDB();
  const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 }).limit(20);
  return NextResponse.json(reviews);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const { name, email, review } = await req.json();
  if (containsAbuse(review)) {
    return NextResponse.json({ error: "Review contains inappropriate language." }, { status: 400 });
  }
  const newReview = new Review({ name, email, review });
  await newReview.save();
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { id } = await req.json();
  await Review.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  await connectDB();
  const { id, approved } = await req.json();
  await Review.findByIdAndUpdate(id, { approved });
  return NextResponse.json({ success: true });
}
