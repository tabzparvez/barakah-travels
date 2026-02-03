"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaBoxOpen,
  FaEnvelopeOpenText,
  FaFileInvoiceDollar,
  FaFileSignature,
} from "react-icons/fa";

const statCards = [
  { key: "packages", label: "Total Packages", icon: FaBoxOpen },
  { key: "inquiries", label: "Total Inquiries", icon: FaEnvelopeOpenText },
  { key: "quotations", label: "Total Quotations", icon: FaFileSignature },
  { key: "invoices", label: "Total Invoices", icon: FaFileInvoiceDollar },
];

type DashboardStats = {
  packages: number;
  inquiries: number;
  quotations: number;
  invoices: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    packages: 0,
    inquiries: 0,
    quotations: 0,
    invoices: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const [packagesRes, inquiriesRes, quotationsRes, invoicesRes] =
        await Promise.all([
          fetch("/api/admin/packages"),
          fetch("/api/admin/inquiries"),
          fetch("/api/admin/quotations"),
          fetch("/api/admin/invoices"),
        ]);

      const packagesData = await packagesRes.json();
      const inquiriesData = await inquiriesRes.json();
      const quotationsData = await quotationsRes.json();
      const invoicesData = await invoicesRes.json();

      const totalPackages =
        packagesData.umrah.length + packagesData.tours.length;

      setStats({
        packages: totalPackages,
        inquiries: inquiriesData.length,
        quotations: quotationsData.length,
        invoices: invoicesData.length,
      });
    }

    loadStats();
  }, []);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
        <p className="text-white/70 mt-2">
          Real-time overview of packages, inquiries, quotations, and invoices.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.key}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-white/60">{card.label}</p>
                <p className="text-3xl font-semibold text-white mt-2">
                  {stats[card.key as keyof DashboardStats]}
                </p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-yellow-400/10 text-yellow-300 flex items-center justify-center">
                <Icon />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Today&apos;s Focus</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>Follow up on new Umrah inquiries within 30 minutes.</li>
            <li>Send Turkey tour quotation drafts for approvals.</li>
            <li>Review unpaid invoices and send reminders.</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Team Activity</h2>
          <p className="text-sm text-white/70 mt-3">
            6 inquiries were received in the last 24 hours. 3 quotations were
            generated. 1 invoice marked as paid.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link
              href="/admin/quotations"
              className="rounded-xl border border-yellow-400/40 px-4 py-2 text-yellow-300 hover:bg-yellow-400/10"
            >
              Create new quotation
            </Link>
            <Link
              href="/admin/inquiries"
              className="rounded-xl border border-white/10 px-4 py-2 hover:bg-white/5"
            >
              Review new inquiries
            </Link>
            <Link
              href="/admin/invoices"
              className="rounded-xl border border-white/10 px-4 py-2 hover:bg-white/5"
            >
              Send invoice reminders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
