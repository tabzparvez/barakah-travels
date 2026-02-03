import mongoose from "mongoose";
import ReviewsClient from "./ReviewsClient";

const MONGODB_URI = process.env.MONGODB_URI || "";

const reviewSchema = new mongoose.Schema({
  name: String,
  email: String,
  review: String,
  createdAt: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false },
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

export default async function AdminReviewsPage() {
  if (!MONGODB_URI) {
    return (
      <main className="section max-w-4xl mx-auto">
        <div className="card text-sm text-gray-600">
          Reviews are unavailable because the database connection is not configured.
        </div>
      </main>
    );
  }

  await connectDB();
  type ReviewRecord = {
    _id: mongoose.Types.ObjectId;
    name?: string;
    email?: string;
    review: string;
    approved: boolean;
    createdAt?: Date;
  };

  const reviews = await Review.find().sort({ createdAt: -1 }).lean<ReviewRecord[]>();
  const serialized = reviews.map((review) => ({
    _id: review._id.toString(),
    name: review.name,
    email: review.email,
    review: review.review,
    approved: review.approved,
    createdAt: review.createdAt?.toISOString(),
  }));

  return <ReviewsClient initialReviews={serialized} />;
}
