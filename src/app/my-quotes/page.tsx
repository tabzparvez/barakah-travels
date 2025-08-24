"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Quote {
  _id: string;
  packageName: string;
  date: string;
  status?: string;
}

export default function MyQuotes() {
  const { data: session, status } = useSession();
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    if (session && session.user?.email) {
      fetch("/api/quotes?email=" + encodeURIComponent(session.user.email))
        .then(res => res.json())
        .then(data => setQuotes(data));
    }
  }, [session]);

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div className="max-w-xl mx-auto mt-10 text-center">Please sign in to view your quotes.</div>;

  return (
    <main className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">My Quotes</h1>
      {quotes.length === 0 ? (
        <div>No quotes found.</div>
      ) : (
        <ul className="space-y-4">
          {quotes.map((q) => (
            <li key={q._id} className="border rounded p-4 bg-white shadow">
              <div><strong>Package:</strong> {q.packageName}</div>
              <div><strong>Date:</strong> {q.date}</div>
              <div><strong>Status:</strong> {q.status || "Pending"}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
