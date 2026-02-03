"use client";

import { useEffect, useState } from "react";
import { getAdminAuthHeaders } from "@/lib/admin-session";

type Invoice = {
  id: string;
  quotationId?: string;
  invoiceNumber: string;
  client: { name: string; phone: string };
  packageTitle: string;
  amount: string;
  status: "Paid" | "Unpaid";
  createdAt: string;
};

type Quotation = {
  id: string;
  client: { name: string; phone: string };
  package: { price: string };
};

const initialInvoice = {
  quotationId: "",
  client: { name: "", phone: "" },
  packageTitle: "",
  amount: "",
  status: "Unpaid",
};

export default function AdminInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [form, setForm] = useState(initialInvoice);
  const [quotations, setQuotations] = useState<Quotation[]>([]);

  useEffect(() => {
    fetch("/api/admin/invoices", { headers: getAdminAuthHeaders() })
      .then((res) => res.json())
      .then(setInvoices);

    fetch("/api/admin/quotations", { headers: getAdminAuthHeaders() })
      .then((res) => res.json())
      .then(setQuotations);
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/admin/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAdminAuthHeaders() },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setInvoices((prev) => [data.invoice, ...prev]);
    setForm(initialInvoice);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Invoices</h1>
        <p className="text-white/70 mt-2">
          Convert quotations into invoices with auto-generated invoice numbers.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-white/5 p-6 grid gap-4 md:grid-cols-2"
      >
        <div>
          <label className="text-sm text-white/70">Use Quotation</label>
          <select
            value={form.quotationId}
            onChange={(event) => {
              const quotationId = event.target.value;
              const match = quotations.find((item) => item.id === quotationId);
              if (match) {
                setForm((prev) => ({
                  ...prev,
                  quotationId,
                  client: match.client,
                  amount: match.package.price,
                  packageTitle: "Umrah Quotation Package",
                }));
              } else {
                setForm(initialInvoice);
              }
            }}
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
          >
            <option value="">Select quotation</option>
            {quotations.map((quote) => (
              <option key={quote.id} value={quote.id}>
                {quote.client.name} ({quote.id})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-white/70">Client Name</label>
          <input
            value={form.client.name}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                client: { ...prev.client, name: event.target.value },
              }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
            required
          />
        </div>
        <div>
          <label className="text-sm text-white/70">Client Phone</label>
          <input
            value={form.client.phone}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                client: { ...prev.client, phone: event.target.value },
              }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
            required
          />
        </div>
        <div>
          <label className="text-sm text-white/70">Package Details</label>
          <input
            value={form.packageTitle}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, packageTitle: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
            required
          />
        </div>
        <div>
          <label className="text-sm text-white/70">Amount</label>
          <input
            value={form.amount}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, amount: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
            required
          />
        </div>
        <div>
          <label className="text-sm text-white/70">Status</label>
          <select
            value={form.status}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, status: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
          >
            <option>Unpaid</option>
            <option>Paid</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="rounded-xl bg-yellow-400 text-black px-6 py-2 font-semibold"
          >
            Create invoice
          </button>
        </div>
      </form>

      <div className="grid gap-4">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-white/60">{invoice.invoiceNumber}</p>
                <p className="font-semibold">{invoice.client.name}</p>
                <p className="text-sm text-white/70">{invoice.packageTitle}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">{invoice.amount}</p>
                <span className="text-xs text-white/60">{invoice.status}</span>
              </div>
            </div>
            <button
              onClick={() => window.print()}
              className="mt-4 rounded-xl border border-yellow-400/50 px-4 py-2 text-sm text-yellow-300"
            >
              Print invoice
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
