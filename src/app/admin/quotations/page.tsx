"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type QuotationSummary = {
  id: string;
  clientName: string;
  phone: string;
  persons: number;
  price: number;
  createdAt: string;
};

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<QuotationSummary[]>([]);

  useEffect(() => {
    const keys = Object.keys(localStorage).filter((k) =>
      k.startsWith("quotation-")
    );
    const data = keys
      .map((key) => {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        const item = JSON.parse(raw);
        return {
          id: item.id,
          clientName: item.clientName,
          phone: item.phone,
          persons: item.persons,
          price: item.price,
          createdAt: item.createdAt,
        } as QuotationSummary;
      })
      .filter(Boolean) as QuotationSummary[];

    setQuotations(data.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
  }, []);

  return (
    <main className="section max-w-6xl mx-auto">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Quotations</h1>
          <p className="text-sm text-gray-500">
            Create and manage detailed Umrah quotations.
          </p>
        </div>
        <Link href="/admin/quotations/new" className="btn">
          + New Quotation
        </Link>
      </div>

      {quotations.length === 0 ? (
        <div className="card text-sm text-gray-500">
          No quotations created yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {quotations.map((quote) => (
            <Link
              key={quote.id}
              href={`/admin/quotations/${quote.id}`}
              className="card flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-lg transition"
            >
              <div>
                <h2 className="text-lg font-semibold text-secondary">
                  {quote.clientName}
                </h2>
                <p className="text-sm text-gray-500">
                  {quote.phone} • {quote.persons} persons
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(quote.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="text-primary font-semibold">
                PKR {Number(quote.price).toLocaleString()}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
