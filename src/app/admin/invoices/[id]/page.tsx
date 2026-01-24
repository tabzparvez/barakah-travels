"use client";

import { useEffect, useState } from "react";

type Invoice = {
  invoiceId: string;
  customerName: string;
  phone?: string;
  email?: string;
  packageName?: string;
  total: number;
  paid: number;
  balance: number;
  method: string;
  date: string;
};

export default function InvoiceViewPage({
  params,
}: {
  params: { id: string };
}) {
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    const data = localStorage.getItem(`invoice-${params.id}`);
    if (data) {
      setInvoice(JSON.parse(data));
    }
  }, [params.id]);

  if (!invoice) {
    return (
      <div className="card max-w-xl mx-auto text-center">
        <p className="text-red-600 font-semibold">
          Invoice not found
        </p>
      </div>
    );
  }

  return (
    <div id="invoice-print" className="max-w-4xl mx-auto bg-white p-8 shadow-xl rounded-xl">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">Barakah Travels</h1>
          <p className="text-sm text-gray-500">
            Official Invoice
          </p>
          <p className="text-sm">
            Karachi, Pakistan
          </p>
        </div>

        <div className="text-right text-sm">
          <p><strong>Invoice #</strong> {invoice.invoiceId}</p>
          <p>Date: {new Date(invoice.date).toLocaleDateString()}</p>
          <span className={`inline-block mt-1 px-3 py-1 rounded text-xs font-bold
            ${invoice.balance > 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {invoice.balance > 0 ? "Unpaid" : "Paid"}
          </span>
        </div>
      </div>

      <hr className="my-4" />

      {/* CUSTOMER */}
      <div className="mb-4">
        <p><strong>Customer:</strong> {invoice.customerName}</p>
        {invoice.phone && <p>Phone: {invoice.phone}</p>}
        {invoice.email && <p>Email: {invoice.email}</p>}
      </div>

      {/* TABLE */}
      <table className="w-full border text-sm mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Qty</th>
            <th className="p-2 border">Unit Price</th>
            <th className="p-2 border">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border">
              {invoice.packageName || "Service"}
            </td>
            <td className="p-2 border text-center">1</td>
            <td className="p-2 border text-right">
              PKR {invoice.total}
            </td>
            <td className="p-2 border text-right">
              PKR {invoice.total}
            </td>
          </tr>
        </tbody>
      </table>

      {/* TOTALS */}
      <div className="text-right mb-6 text-sm">
        <p><strong>Total:</strong> PKR {invoice.total}</p>
        <p><strong>Paid:</strong> PKR {invoice.paid}</p>
        <p className="font-bold">
          Balance: PKR {invoice.balance}
        </p>
        <p className="text-xs mt-1">
          Payment Method: {invoice.method}
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4 no-print">
        <button
          onClick={() => window.print()}
          className="btn"
        >
          Print
        </button>
      </div>
    </div>
  );
}
