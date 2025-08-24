"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function SubmitReview() {
  const { data: session, status } = useSession();
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!review.trim()) {
      setError("Review cannot be empty.");
      return;
    }
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ review, name: session?.user?.name, email: session?.user?.email }),
    });
    if (res.ok) {
      setSubmitted(true);
    } else {
      setError("Failed to submit review.");
    }
  }

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div className="max-w-xl mx-auto mt-10 text-center">Please sign in to submit a review.</div>;

  return (
    <main className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Submit Your Review</h1>
      {submitted ? (
        <div className="text-green-600">Thank you for your review!</div>
      ) : (
        <form onSubmit={handleSubmit} className="form">
          <textarea
            value={review}
            onChange={e => setReview(e.target.value)}
            placeholder="Write your review here..."
            className="input mb-2 h-24"
            required
          />
          <button type="submit" className="btn">Submit Review</button>
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </form>
      )}
    </main>
  );
}
