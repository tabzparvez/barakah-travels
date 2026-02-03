"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaEnvelopeOpenText,
  FaFileInvoiceDollar,
  FaFileSignature,
  FaSignOutAlt,
} from "react-icons/fa";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: FaTachometerAlt },
  { href: "/admin/users", label: "Users", icon: FaUsers },
  { href: "/admin/packages", label: "Packages", icon: FaBoxOpen },
  { href: "/admin/inquiries", label: "Inquiries", icon: FaEnvelopeOpenText },
  { href: "/admin/quotations", label: "Quotations", icon: FaFileSignature },
  { href: "/admin/invoices", label: "Invoices", icon: FaFileInvoiceDollar },
];

type AdminSession = {
  name: string;
  email: string;
  role: string;
  permissions: {
    packages: boolean;
    inquiries: boolean;
    quotations: boolean;
    invoices: boolean;
  };
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/admin/login" || pathname === "/admin/logout") {
      return;
    }
    const stored = localStorage.getItem("barakahAdminSession");
    if (!stored) {
      router.replace("/admin/login");
      return;
    }
    setSession(JSON.parse(stored) as AdminSession);
  }, [pathname, router]);

  const filteredNav = useMemo(() => {
    if (!session) return [];
    return navItems.filter((item) => {
      if (item.href.includes("/users")) return session.role === "Super Admin";
      if (item.href.includes("/packages")) return session.permissions.packages;
      if (item.href.includes("/inquiries")) return session.permissions.inquiries;
      if (item.href.includes("/quotations")) return session.permissions.quotations;
      if (item.href.includes("/invoices")) return session.permissions.invoices;
      return true;
    });
  }, [session]);

  if (pathname === "/admin/login" || pathname === "/admin/logout") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white flex">
      <aside className="hidden lg:flex lg:w-72 flex-col border-r border-white/10 bg-[#111111]">
        <div className="px-6 py-8">
          <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">
            Barakah Travels
          </p>
          <h1 className="text-2xl font-bold mt-2">Admin Suite</h1>
          <p className="text-sm text-white/60 mt-1">
            Premium travel operations
          </p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {filteredNav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-yellow-400/15 text-yellow-300"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-6 py-6 border-t border-white/10">
          <Link
            href="/admin/logout"
            className="flex items-center gap-2 text-sm text-red-200 hover:text-white"
          >
            <FaSignOutAlt /> Log out
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="border-b border-white/10 bg-[#111111]/70 backdrop-blur-md px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-white/60">Welcome back,</p>
            <h2 className="text-xl font-semibold">
              {session ? session.name : "Loading"}
            </h2>
          </div>
          <div className="text-sm text-white/70">
            {session ? `${session.role} • ${session.email}` : ""}
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 bg-gradient-to-b from-[#111111] to-[#0b0b0c]">
          {children}
        </main>
      </div>
    </div>
  );
}
