"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FaChartPie,
  FaUsers,
  FaSuitcase,
  FaInbox,
  FaFileInvoiceDollar,
  FaFileSignature,
  FaSignOutAlt,
} from "react-icons/fa";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: <FaChartPie /> },
  { href: "/admin/users", label: "Users", icon: <FaUsers /> },
  { href: "/admin/packages", label: "Packages", icon: <FaSuitcase /> },
  { href: "/admin/inquiries", label: "Inquiries", icon: <FaInbox /> },
  { href: "/admin/quotations", label: "Quotations", icon: <FaFileSignature /> },
  { href: "/admin/invoices", label: "Invoices", icon: <FaFileInvoiceDollar /> },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [adminUser, setAdminUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("barakahAdminUser");
    if (!stored) {
      router.push("/admin/login");
      return;
    }
    setAdminUser(JSON.parse(stored));
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("barakahAdminUser");
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <aside className="hidden lg:flex flex-col w-72 bg-slate-900 text-white p-6">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">
            Barakah CRM
          </p>
          <h2 className="text-2xl font-semibold mt-2">Admin Panel</h2>
        </div>
        <nav className="flex flex-col gap-2 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                pathname === item.href
                  ? "bg-yellow-500 text-slate-900"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 text-sm text-white/70 hover:text-white"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Welcome back</h1>
            <p className="text-sm text-slate-500">
              Manage packages, inquiries, and financial documents.
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold">{adminUser?.name}</p>
            <p className="text-xs text-slate-500">{adminUser?.role}</p>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
