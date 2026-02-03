'use client';

import { useEffect, useMemo, useState } from 'react';

type Review = {
  _id: string;
  name?: string;
  email?: string;
  review: string;
  approved: boolean;
  createdAt?: string;
};

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'pending' | 'approved'>('pending');

  useEffect(() => {
    fetchReviews();
  }, []);

  const filteredReviews = useMemo(() => {
    return reviews.filter(review =>
      filter === 'pending' ? !review.approved : review.approved
    );
  }, [reviews, filter]);

  async function fetchReviews() {
    setLoading(true);
    const res = await fetch('/api/reviews?all=true');
    const data = await res.json();
    setReviews(data);
    setLoading(false);
  }

  async function updateReview(id: string, approved: boolean) {
    await fetch('/api/reviews', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, approved }),
    });
    await fetchReviews();
  }

  async function deleteReview(id: string) {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    await fetch('/api/reviews', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    await fetchReviews();
  }

  return (
    <main className="section max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Reviews</h1>
        <p className="text-sm text-gray-500">
          Approve or reject reviews from Google signed-in users.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          className={
            filter === 'pending' ? 'btn' : 'btn-outline'
          }
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className={
            filter === 'approved' ? 'btn' : 'btn-outline'
          }
          onClick={() => setFilter('approved')}
        >
          Approved
        </button>
      </div>

      {loading ? (
        <div className="card text-sm text-gray-500">Loading reviews...</div>
      ) : filteredReviews.length === 0 ? (
        <div className="card text-sm text-gray-500">
          No {filter} reviews right now.
        </div>
      ) : (
        <ul className="space-y-4">
          {filteredReviews.map(review => (
            <li key={review._id} className="card space-y-3">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-semibold text-secondary">
                    {review.name || 'Anonymous'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {review.email || 'No email'}
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  {review.createdAt
                    ? new Date(review.createdAt).toLocaleString()
                    : ''}
                </div>
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {review.review}
              </p>
              <div className="flex flex-wrap gap-2">
                {review.approved ? (
                  <button
                    className="btn-outline"
                    onClick={() => updateReview(review._id, false)}
                  >
                    Reject
                  </button>
                ) : (
                  <button
                    className="btn"
                    onClick={() => updateReview(review._id, true)}
                  >
                    Approve
                  </button>
                )}
                <button
                  className="btn-outline"
                  onClick={() => deleteReview(review._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
