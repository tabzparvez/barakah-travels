"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Inquiry = {
  _id: string;
  email: string;
  service: string;
  from?: string;
  to?: string;
  createdAt?: string;
};

type Quote = {
  id: string;
  email: string;
  price: number;
  createdAt: string;
};

type Invoice = {
  invoiceId: string;
  email: string;
  total: number;
  balance: number;
  date: string;
};

type DashboardClientProps = {
  userEmail: string;
  userName?: string | null;
};

export default function DashboardClient({
  userEmail,
  userName,
}: DashboardClientProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    fetch("/api/inquiries")
      .then((res) => res.json())
      .then((data: Inquiry[]) => {
        const filtered = data.filter((item) => item.email === userEmail);
        setInquiries(filtered);
      });
  }, [userEmail]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const quoteKeys = Object.keys(localStorage).filter((k) =>
      k.startsWith("quotation-")
    );
    const invoiceKeys = Object.keys(localStorage).filter((k) =>
      k.startsWith("invoice-")
    );
    const quoteItems = quoteKeys
      .map((key) => {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as Quote) : null;
      })
      .filter((item): item is Quote => Boolean(item))
      .filter((item) => item.email === userEmail);
    const invoiceItems = invoiceKeys
      .map((key) => {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as Invoice) : null;
      })
      .filter((item): item is Invoice => Boolean(item))
      .filter((item) => item.email === userEmail);

    setQuotes(quoteItems);
    setInvoices(invoiceItems);
  }, [userEmail]);

  const summary = useMemo(
    () => [
      { label: "My Inquiries", value: inquiries.length },
      { label: "My Quotations", value: quotes.length },
      { label: "My Invoices", value: invoices.length },
    ],
    [inquiries.length, quotes.length, invoices.length]
  );

  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            User Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back{userName ? `, ${userName}` : ""}.
          </p>
        </div>
        <Link href="/submit-review" className="btn">
          Add Review
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-10">
        {summary.map((item) => (
          <div key={item.label} className="card text-center">
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-3xl font-bold text-primary mt-3">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card">
          <h2 className="font-semibold text-lg mb-4">My Inquiries</h2>
          {inquiries.length === 0 ? (
            <p className="text-sm text-gray-500">No inquiries yet.</p>
          ) : (
            <ul className="space-y-3 text-sm text-gray-600">
              {inquiries.map((item) => (
                <li key={item._id} className="border-b border-gray-100 pb-3">
                  <p className="font-semibold text-secondary">
                    {item.service}
                  </p>
                  <p>
                    {item.from || "—"} → {item.to || "—"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : ""}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2 className="font-semibold text-lg mb-4">My Quotations</h2>
          {quotes.length === 0 ? (
            <p className="text-sm text-gray-500">No quotations yet.</p>
          ) : (
            <ul className="space-y-3 text-sm text-gray-600">
              {quotes.map((quote) => (
                <li key={quote.id} className="border-b border-gray-100 pb-3">
                  <p className="font-semibold text-secondary">
                    Quotation #{quote.id}
                  </p>
                  <p>PKR {Number(quote.price).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2 className="font-semibold text-lg mb-4">My Invoices</h2>
          {invoices.length === 0 ? (
            <p className="text-sm text-gray-500">No invoices yet.</p>
          ) : (
            <ul className="space-y-3 text-sm text-gray-600">
              {invoices.map((invoice) => (
                <li key={invoice.invoiceId} className="border-b border-gray-100 pb-3">
                  <p className="font-semibold text-secondary">
                    Invoice #{invoice.invoiceId}
                  </p>
                  <p>PKR {Number(invoice.total).toLocaleString()}</p>
                  <p className="text-xs text-gray-400">
                    {invoice.balance > 0 ? "Unpaid" : "Paid"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-10 text-sm text-gray-500">
        Logged in as <strong>{userEmail}</strong>
      </div>
    </main>
  );
}
