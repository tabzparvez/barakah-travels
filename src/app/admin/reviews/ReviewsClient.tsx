"use client";

import { useState } from "react";

type Review = {
  _id: string;
  name: string;
  email?: string;
  review: string;
  approved: boolean;
  createdAt?: string;
};

type ReviewsClientProps = {
  initialReviews: Review[];
};

export default function ReviewsClient({ initialReviews }: ReviewsClientProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleApprove = async (id: string, approved: boolean) => {
    setLoadingId(id);
    await fetch("/api/reviews", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, approved }),
    });
    setReviews((prev) =>
      prev.map((review) =>
        review._id === id ? { ...review, approved } : review
      )
    );
    setLoadingId(null);
  };

  const handleReject = async (id: string) => {
    setLoadingId(id);
    await fetch("/api/reviews", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setReviews((prev) => prev.filter((review) => review._id !== id));
    setLoadingId(null);
  };

  return (
    <main className="section max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Reviews</h1>
        <p className="text-sm text-gray-500">
          Approve or reject submitted reviews before they appear on the website.
        </p>
      </div>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="card text-sm text-gray-500">
            No reviews submitted yet.
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="card">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-secondary">
                    {review.name || "Anonymous"}{" "}
                    {review.email ? `(${review.email})` : ""}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {review.review}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleString()
                      : ""}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      review.approved
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {review.approved ? "Approved" : "Pending"}
                  </span>
                  <button
                    className="btn-outline"
                    onClick={() => handleApprove(review._id, true)}
                    disabled={loadingId === review._id}
                  >
                    Approve
                  </button>
                  <button
                    className="btn-outline"
                    onClick={() => handleApprove(review._id, false)}
                    disabled={loadingId === review._id}
                  >
                    Unapprove
                  </button>
                  <button
                    className="btn"
                    onClick={() => handleReject(review._id)}
                    disabled={loadingId === review._id}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
