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
  status?: string;
};

const statusStyles: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-600",
  Sent: "bg-blue-100 text-blue-700",
  Accepted: "bg-green-100 text-green-700",
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
          status: item.status || "Draft",
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
            <div
              key={quote.id}
              className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-lg font-semibold text-secondary">
                    {quote.clientName}
                  </h2>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      statusStyles[quote.status || "Draft"] ||
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {quote.status || "Draft"}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {quote.phone} • {quote.persons} persons
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(quote.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="text-right space-y-2">
                <div className="text-primary font-semibold">
                  PKR {Number(quote.price).toLocaleString()}
                </div>
                <div className="flex flex-wrap gap-2 justify-end">
                  <Link href={`/admin/quotations/${quote.id}`} className="btn">
                    View
                  </Link>
                  <Link
                    href={`/admin/quotations/${quote.id}/edit`}
                    className="btn-outline"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
