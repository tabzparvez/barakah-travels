"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
    async function load() {
      const [packagesRes, inquiriesRes, quotationsRes, invoicesRes] =
        await Promise.all([
          fetch("/api/packages"),
          fetch("/api/inquiries"),
          fetch("/api/quotations"),
          fetch("/api/invoices"),
        ]);
      const [packages, inquiries, quotations, invoices] = await Promise.all([
        packagesRes.json(),
        inquiriesRes.json(),
        quotationsRes.json(),
        invoicesRes.json(),
      ]);
      setStats({
        packages: packages.length,
        inquiries: inquiries.length,
        quotations: quotations.length,
        invoices: invoices.length,
      });
    }
    load();
  }, []);

  const cards = [
    {
      label: "Total Packages",
      value: stats.packages,
      href: "/admin/packages",
    },
    {
      label: "Total Inquiries",
      value: stats.inquiries,
      href: "/admin/inquiries",
    },
    {
      label: "Total Quotations",
      value: stats.quotations,
      href: "/admin/quotations",
    },
    {
      label: "Total Invoices",
      value: stats.invoices,
      href: "/admin/invoices",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="admin-card bg-gradient-to-r from-slate-900 to-slate-800 text-white border-none">
        <p className="uppercase tracking-[0.3em] text-yellow-400 text-xs">
          Overview
        </p>
        <h2 className="text-3xl font-semibold mt-2">
          Barakah Travels Admin Dashboard
        </h2>
        <p className="text-white/70 mt-3">
          Monitor all core business metrics and manage your premium travel
          services from one place.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="admin-card">
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="text-3xl font-semibold text-slate-900 mt-2">
              {card.value}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
