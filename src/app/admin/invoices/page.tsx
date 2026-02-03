"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Invoice = {
  invoiceId: string;
  customerName: string;
  total: number;
  paid: number;
  balance: number;
  date: string;
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const keys = Object.keys(localStorage).filter((k) =>
      k.startsWith("invoice-")
    );

    const data: Invoice[] = keys
      .map((key) => {
        const item = localStorage.getItem(key);
        if (!item) return null;
        const data = JSON.parse(item);
        return {
          ...data,
          invoiceId: data.invoiceId || key.replace("invoice-", ""),
        };
      })
      .filter(Boolean);

    setInvoices(data.reverse());
  }, []);

  return (
    <div className="card">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Invoices</h1>
          <p className="text-sm text-gray-500">
            Track payments and update invoice status.
          </p>
        </div>
        <Link href="/admin/invoices/new" className="btn">
          + Create Invoice
        </Link>
      </div>

      {invoices.length === 0 ? (
        <p className="text-gray-500 text-sm">No invoices created yet</p>
      ) : (
        <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Invoice #</th>
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.invoiceId} className="border-t border-gray-200">
                <td className="p-2">#{inv.invoiceId}</td>
                <td className="p-2">{inv.customerName}</td>
                <td className="p-2">PKR {Number(inv.total).toLocaleString()}</td>
                <td className="p-2">
                  {inv.balance > 0 ? (
                    <span className="text-red-600 font-semibold">Pending</span>
                  ) : (
                    <span className="text-green-600 font-semibold">Paid</span>
                  )}
                </td>
                <td className="p-2">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/admin/invoices/${inv.invoiceId}`}
                      className="text-primary font-semibold"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/invoices/${inv.invoiceId}/edit`}
                      className="text-primary font-semibold"
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
