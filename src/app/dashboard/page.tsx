"use client";

import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import UserAvatar from "@/components/UserAvatar";

type Inquiry = {
  _id?: string;
  userId?: string;
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
  userId?: string;
  clientName?: string;
  email?: string;
  phone?: string;
  persons?: number;
  price?: number;
  createdAt?: string;
  status?: string;
};

type Invoice = {
  invoiceId: string;
  userId?: string;
  customerName?: string;
  total?: number;
  balance?: number;
  paid?: number;
  date?: string;
};

export default function UserDashboard() {
  const { data: session, status } = useSession();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  const userId = useMemo(
    () => (session?.user as { id?: string })?.id,
    [session]
  );

  useEffect(() => {
    if (!userId) return;
    setLoadingInquiries(true);
    fetch("/api/inquiries")
      .then((res) => res.json())
      .then((data: Inquiry[]) => {
        setInquiries(data);
      })
      .finally(() => setLoadingInquiries(false));
  }, [userId]);

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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const keys = Object.keys(localStorage).filter((k) =>
      k.startsWith("invoice-")
    );
    const data = keys
      .map((key) => {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        const item = JSON.parse(raw) as Invoice;
        return {
          ...item,
          invoiceId: item.invoiceId || key.replace("invoice-", ""),
        };
      })
      .filter(Boolean) as Invoice[];
    setInvoices(data);
  }, []);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inquiry) => inquiry.userId === userId);
  }, [inquiries, userId]);

  const filteredQuotations = useMemo(() => {
    return quotations.filter((quote) => quote.userId === userId);
  }, [quotations, userId]);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => invoice.userId === userId);
  }, [invoices, userId]);

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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            User Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, <strong>{session.user.name}</strong>
          </p>
        </div>
        <UserAvatar
          src={session.user.image}
          name={session.user.name}
          size={40}
        />
      </div>

      {!userId && (
        <div className="card text-sm text-gray-600">
          Your account is missing a user ID. Please sign out and back in to
          sync your records.
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card space-y-4">
          <h2 className="font-semibold text-lg text-primary">My Inquiries</h2>
          {loadingInquiries ? (
            <p className="text-sm text-gray-500">Loading inquiries...</p>
          ) : filteredInquiries.length === 0 ? (
            <p className="text-sm text-gray-500">
              No inquiries found for your account yet.
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
        {filteredInvoices.length === 0 ? (
          <p className="text-sm text-gray-500">
            Invoices will appear here after a quotation is approved.
          </p>
        ) : (
          <ul className="space-y-3 text-sm">
            {filteredInvoices.map((invoice) => (
              <li key={invoice.invoiceId} className="border-b pb-3">
                <div className="font-semibold">
                  Invoice #{invoice.invoiceId}
                </div>
                <div className="text-gray-600">
                  PKR {Number(invoice.total || 0).toLocaleString()} • Paid{" "}
                  {Number(invoice.paid || 0).toLocaleString()}
                </div>
                <div className="text-xs text-gray-400">
                  {invoice.date
                    ? new Date(invoice.date).toLocaleString()
                    : "Issued recently"}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="text-sm text-gray-500">
        Logged in as <strong>{session.user.email}</strong>
      </div>
    </main>
  );
}
