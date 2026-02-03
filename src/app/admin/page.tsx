"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FaEnvelopeOpenText,
  FaFileInvoice,
  FaFileSignature,
  FaWallet,
  FaChartLine,
  FaEye,
  FaEyeSlash,
  FaCalendarDay,
} from "react-icons/fa";

type InvoiceRecord = {
  total?: number;
  paid?: number;
  balance?: number;
  date?: string;
};

type QuotationRecord = {
  createdAt?: string;
};

const formatMasked = (value: string | number, revealed: boolean) => {
  if (!revealed) return "******";
  return value.toString();
};

const formatCurrency = (value: number, revealed: boolean) => {
  if (!revealed) return "******";
  return `PKR ${Number(value || 0).toLocaleString()}`;
};

export default function AdminDashboard() {
  const [totals, setTotals] = useState({
    inquiries: 0,
    quotations: 0,
    invoices: 0,
    pendingPayments: 0,
    pendingAmount: 0,
    todayPayments: 0,
    monthlySales: 0,
  });
  const [monthlyPerformance, setMonthlyPerformance] = useState<
    { month: string; total: number }[]
  >([]);
  const [revealValues, setRevealValues] = useState(false);

  useEffect(() => {
    let pendingPayments = 0;
    let pendingAmount = 0;
    let quotations = 0;
    let invoices = 0;
    let todayPayments = 0;
    let monthlySales = 0;
    const monthlyTotals: Record<string, number> = {};

    if (typeof window !== "undefined") {
      const quotationKeys = Object.keys(localStorage).filter((k) =>
        k.startsWith("quotation-")
      );
      quotations = quotationKeys.length;

      const invoiceKeys = Object.keys(localStorage).filter((k) =>
        k.startsWith("invoice-")
      );
      invoices = invoiceKeys.length;
      const now = new Date();
      const todayKey = now.toDateString();

      invoiceKeys.forEach((key) => {
        const raw = localStorage.getItem(key);
        if (!raw) return;
        const data = JSON.parse(raw) as InvoiceRecord;
        const balance = Number(data.balance || 0);
        const paid = Number(data.paid || 0);
        const total = Number(data.total || 0);
        const dateValue = data.date ? new Date(data.date) : null;

        if (balance > 0) {
          pendingPayments += 1;
          pendingAmount += balance;
        }

        if (dateValue) {
          const monthKey = `${dateValue.getFullYear()}-${String(
            dateValue.getMonth() + 1
          ).padStart(2, "0")}`;
          monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + total;

          if (dateValue.toDateString() === todayKey) {
            todayPayments += paid;
          }

          if (
            dateValue.getFullYear() === now.getFullYear() &&
            dateValue.getMonth() === now.getMonth()
          ) {
            monthlySales += total;
          }
        }
      });
    }

    fetch("/api/inquiries")
      .then((res) => res.json())
      .then((data) => {
        setTotals({
          inquiries: data.length || 0,
          quotations,
          invoices,
          pendingPayments,
          pendingAmount,
          todayPayments,
          monthlySales,
        });
      })
      .catch(() => {
        setTotals({
          inquiries: 0,
          quotations,
          invoices,
          pendingPayments,
          pendingAmount,
          todayPayments,
          monthlySales,
        });
      });

    const recentMonths = Array.from({ length: 6 }, (_, index) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - index));
      const label = date.toLocaleString("default", {
        month: "short",
      });
      const key = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      return { label, key };
    });

    setMonthlyPerformance(
      recentMonths.map((month) => ({
        month: month.label,
        total: monthlyTotals[month.key] || 0,
      }))
    );
  }, []);

  const maxMonthly = useMemo(() => {
    return Math.max(1, ...monthlyPerformance.map((item) => item.total));
  }, [monthlyPerformance]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Umrah CRM snapshot of pipeline and revenue performance.
          </p>
        </div>
        <button
          className="btn-outline flex items-center gap-2"
          onClick={() => setRevealValues((prev) => !prev)}
        >
          {revealValues ? (
            <>
              <FaEyeSlash /> Hide figures
            </>
          ) : (
            <>
              <FaEye /> Reveal figures
            </>
          )}
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {[
          {
            label: "Total Inquiries",
            value: formatMasked(totals.inquiries, revealValues),
            icon: <FaEnvelopeOpenText className="text-2xl" />,
            helper: "All Umrah inquiry form submissions",
          },
          {
            label: "Total Quotations",
            value: formatMasked(totals.quotations, revealValues),
            icon: <FaFileSignature className="text-2xl" />,
            helper: "Drafts, sent, and accepted quotes",
          },
          {
            label: "Total Invoices",
            value: formatMasked(totals.invoices, revealValues),
            icon: <FaFileInvoice className="text-2xl" />,
            helper: "Issued invoices in CRM",
          },
          {
            label: "Monthly Sales Performance",
            value: formatCurrency(totals.monthlySales, revealValues),
            icon: <FaChartLine className="text-2xl" />,
            helper: "Total invoiced for current month",
          },
          {
            label: "Today's Received Payments",
            value: formatCurrency(totals.todayPayments, revealValues),
            icon: <FaCalendarDay className="text-2xl" />,
            helper: "Paid amounts captured today",
          },
          {
            label: "Pending Payments",
            value: `${formatMasked(
              totals.pendingPayments,
              revealValues
            )} (${formatCurrency(totals.pendingAmount, revealValues)})`,
            icon: <FaWallet className="text-2xl" />,
            helper: "Outstanding invoice balances",
          },
        ].map((card) => (
          <div
            key={card.label}
            className="card flex items-center justify-between gap-6"
          >
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-2xl font-bold text-primary mt-2">
                {card.value}
              </p>
              <p className="text-xs text-gray-400 mt-1">{card.helper}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-primary">
              Monthly Sales Trend
            </h2>
            <p className="text-sm text-gray-500">
              Last 6 months invoice totals.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          {monthlyPerformance.map((item) => (
            <div key={item.month} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-secondary">
                  {item.month}
                </span>
                <span className="text-gray-500">
                  {formatCurrency(item.total, revealValues)}
                </span>
              </div>
              <div className="h-2 rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${(item.total / maxMonthly) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Logged in as <strong>Admin</strong> • Barakah Umrah CRM
      </div>
    </div>
  );
}
