"use client";

import { useEffect, useState } from "react";
import { FaEnvelopeOpenText, FaFileInvoice, FaFileSignature, FaWallet } from "react-icons/fa";

export default function AdminDashboard() {
  const [totals, setTotals] = useState({
    inquiries: 0,
    quotations: 0,
    invoices: 0,
    pendingPayments: 0,
  });

  useEffect(() => {
    let pendingPayments = 0;
    let quotations = 0;
    let invoices = 0;

    if (typeof window !== "undefined") {
      const quotationKeys = Object.keys(localStorage).filter((k) =>
        k.startsWith("quotation-")
      );
      quotations = quotationKeys.length;

      const invoiceKeys = Object.keys(localStorage).filter((k) =>
        k.startsWith("invoice-")
      );
      invoices = invoiceKeys.length;
      pendingPayments = invoiceKeys.reduce((total, key) => {
        const raw = localStorage.getItem(key);
        if (!raw) return total;
        const data = JSON.parse(raw);
        return data.balance > 0 ? total + 1 : total;
      }, 0);
    }

    fetch("/api/inquiries")
      .then((res) => res.json())
      .then((data) => {
        setTotals({
          inquiries: data.length || 0,
          quotations,
          invoices,
          pendingPayments,
        });
      })
      .catch(() => {
        setTotals({
          inquiries: 0,
          quotations,
          invoices,
          pendingPayments,
        });
      });
  }, []);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Umrah sales activity at a glance
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total Inquiries",
            value: totals.inquiries,
            icon: <FaEnvelopeOpenText className="text-2xl" />,
          },
          {
            label: "Total Quotations",
            value: totals.quotations,
            icon: <FaFileSignature className="text-2xl" />,
          },
          {
            label: "Total Invoices",
            value: totals.invoices,
            icon: <FaFileInvoice className="text-2xl" />,
          },
          {
            label: "Pending Payments",
            value: totals.pendingPayments,
            icon: <FaWallet className="text-2xl" />,
          },
        ].map((card) => (
          <div
            key={card.label}
            className="card flex items-center justify-between gap-6"
          >
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-3xl font-bold text-primary mt-2">
                {card.value}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-12 text-sm text-gray-500">
        Logged in as <strong>Admin</strong> • Barakah Umrah CRM
      </div>
    </div>
  );
}
