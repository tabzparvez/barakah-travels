"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Invoice = {
  id: string;
  invoiceNumber: string;
  client?: { name?: string; phone?: string };
  packageDetails?: { price?: string };
  status?: string;
  createdAt?: string;
};

export default function InvoiceDetailPage() {
  const params = useParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    fetch("/api/invoices")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item: Invoice) => item.id === params.id);
        setInvoice(found);
      });
  }, [params.id]);

  if (!invoice) {
    return <p className="text-slate-500">Loading invoice...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Invoice</h2>
          <p className="text-slate-500">Printable invoice summary.</p>
        </div>
        <button className="btn-outline" onClick={() => window.print()}>
          Print Invoice
        </button>
      </div>

      <div id="invoice-print" className="admin-card">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-yellow-500">
              Barakah Travels
            </p>
            <h3 className="text-2xl font-semibold">Invoice</h3>
            <p className="text-sm text-slate-500">Karachi, Pakistan</p>
          </div>
          <div className="text-sm text-slate-500 text-right">
            <p>{invoice.invoiceNumber}</p>
            <p>{invoice.createdAt ? new Date(invoice.createdAt).toLocaleDateString() : ""}</p>
            <span className="badge bg-slate-100 text-slate-700 mt-2">
              {invoice.status || "Unpaid"}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Client</h4>
            <p>Name: {invoice.client?.name}</p>
            <p>Phone: {invoice.client?.phone}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Package Details</h4>
            <p>Amount: {invoice.packageDetails?.price || "TBD"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
