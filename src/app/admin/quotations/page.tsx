"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Quotation = {
  id: string;
  client?: { name?: string; phone?: string; persons?: string };
  destination?: string;
  type?: string;
  status?: string;
  createdAt?: string;
};

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);

  useEffect(() => {
    fetch("/api/quotations")
      .then((res) => res.json())
      .then(setQuotations);
  }, []);

  return (
    <div className="space-y-8">
      <div className="admin-card flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Quotations</h2>
          <p className="text-slate-500">
            Create premium Umrah quotations and convert them into invoices.
          </p>
        </div>
        <Link href="/admin/quotations/new" className="btn w-fit">
          Create Quotation
        </Link>
      </div>

      <div className="admin-card">
        <div className="grid gap-4">
          {quotations.map((quote) => (
            <div
              key={quote.id}
              className="border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <h3 className="font-semibold">
                  {quote.client?.name || "Client"} · {quote.client?.phone || "—"}
                </h3>
                <p className="text-sm text-slate-500">
                  {quote.type || "Umrah"} · {quote.destination || "Custom itinerary"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="badge bg-slate-100 text-slate-700">
                  {quote.status || "Draft"}
                </span>
                <Link href={`/admin/quotations/${quote.id}`} className="btn-outline">
                  View
                </Link>
              </div>
            </div>
          ))}
          {quotations.length === 0 && (
            <p className="text-sm text-slate-500">
              No quotations created yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
