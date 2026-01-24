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
        return item ? JSON.parse(item) : null;
      })
      .filter(Boolean);

    setInvoices(data.reverse());
  }, []);

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Link href="/admin/invoices/new" className="btn">
          + Create Invoice
        </Link>
      </div>

      {invoices.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No invoices created yet
        </p>
      ) : (
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Invoice #</th>
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.invoiceId} className="border-t">
                <td className="p-2">#{inv.invoiceId}</td>
                <td className="p-2">{inv.customerName}</td>
                <td className="p-2">PKR {inv.total}</td>
                <td className="p-2">
                  {inv.balance > 0 ? (
                    <span className="text-red-600 font-semibold">
                      Unpaid
                    </span>
                  ) : (
                    <span className="text-green-600 font-semibold">
                      Paid
                    </span>
                  )}
                </td>
                <td className="p-2">
                  <Link
                    href={`/admin/invoices/${inv.invoiceId}`}
                    className="text-primary font-semibold"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
