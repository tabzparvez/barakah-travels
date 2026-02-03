"use client";

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useState } from "react";

type Inquiry = {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  from?: string;
  to?: string;
  notes?: string;
  createdAt?: string;
};

type Quotation = {
  id: string;
  clientName?: string;
  email?: string;
  phone?: string;
  persons?: number;
  price?: number;
  createdAt?: string;
  status?: string;
};

export default function UserDashboard() {
  const { data: session, status } = useSession();
  const [phoneMatch, setPhoneMatch] = useState("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  const identifiers = useMemo(() => {
    return [session?.user?.email, phoneMatch].filter(
      (value): value is string => Boolean(value)
    );
  }, [session?.user?.email, phoneMatch]);

  const matchesIdentifier = useCallback(
    (value?: string) =>
      identifiers.some((identifier) =>
        value?.toLowerCase().includes(identifier.toLowerCase())
      ),
    [identifiers]
  );

  useEffect(() => {
    if (!session?.user?.email) return;
    setLoadingInquiries(true);
    fetch("/api/inquiries")
      .then((res) => res.json())
      .then((data: Inquiry[]) => {
        setInquiries(data);
      })
      .finally(() => setLoadingInquiries(false));
  }, [session?.user?.email]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const keys = Object.keys(localStorage).filter((k) =>
      k.startsWith("quotation-")
    );
    const data = keys
      .map((key) => {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        const item = JSON.parse(raw) as Quotation;
        return {
          ...item,
          id: item.id || key.replace("quotation-", ""),
        };
      })
      .filter(Boolean) as Quotation[];
    setQuotations(data);
  }, []);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter(
      (inquiry) =>
        matchesIdentifier(inquiry.email) || matchesIdentifier(inquiry.phone)
    );
  }, [inquiries, matchesIdentifier]);

  const filteredQuotations = useMemo(() => {
    return quotations.filter(
      (quote) => matchesIdentifier(quote.email) || matchesIdentifier(quote.phone)
    );
  }, [quotations, matchesIdentifier]);

  if (status === "loading") {
    return <div className="max-w-5xl mx-auto py-12 px-4">Loading...</div>;
  }

  if (!session?.user) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4">
        Please sign in to view your dashboard.
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">
          User Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back, <strong>{session.user.name}</strong>
        </p>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-primary mb-3">
          Match Your Records
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          We match your inquiries and quotations using your Google email or a
          phone number.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="input"
            value={session.user.email || ""}
            readOnly
          />
          <input
            className="input"
            placeholder="Add phone number (optional)"
            value={phoneMatch}
            onChange={(event) => setPhoneMatch(event.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card space-y-4">
          <h2 className="font-semibold text-lg text-primary">My Inquiries</h2>
          {loadingInquiries ? (
            <p className="text-sm text-gray-500">Loading inquiries...</p>
          ) : filteredInquiries.length === 0 ? (
            <p className="text-sm text-gray-500">
              No inquiries matched your email or phone yet.
            </p>
          ) : (
            <ul className="space-y-3 text-sm">
              {filteredInquiries.map((inquiry) => (
                <li key={inquiry._id || inquiry.email} className="border-b pb-3">
                  <div className="font-semibold">
                    {inquiry.service || "Umrah"} Inquiry
                  </div>
                  <div className="text-gray-600">
                    {inquiry.from || "Pakistan"} → {inquiry.to || "Saudi Arabia"}
                  </div>
                  <div className="text-xs text-gray-400">
                    {inquiry.createdAt
                      ? new Date(inquiry.createdAt).toLocaleString()
                      : "Submitted recently"}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card space-y-4">
          <h2 className="font-semibold text-lg text-primary">My Quotations</h2>
          {filteredQuotations.length === 0 ? (
            <p className="text-sm text-gray-500">
              Quotations will appear here once they are shared with you.
            </p>
          ) : (
            <ul className="space-y-3 text-sm">
              {filteredQuotations.map((quote) => (
                <li key={quote.id} className="border-b pb-3">
                  <div className="font-semibold">
                    {quote.clientName || "Quotation"} •{" "}
                    {quote.status || "Draft"}
                  </div>
                  <div className="text-gray-600">
                    PKR {Number(quote.price || 0).toLocaleString()} •{" "}
                    {quote.persons || 0} persons
                  </div>
                  <div className="text-xs text-gray-400">
                    {quote.createdAt
                      ? new Date(quote.createdAt).toLocaleString()
                      : "Shared recently"}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="card">
        <h2 className="font-semibold text-lg text-primary">My Invoices</h2>
        <p className="text-sm text-gray-500">
          Invoices will be available here soon for online viewing and payment.
        </p>
      </div>

      <div className="text-sm text-gray-500">
        Logged in as <strong>{session.user.email}</strong>
      </div>
    </main>
  );
}
