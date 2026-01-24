"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaEnvelope,
  FaStar,
  FaImages,
  FaBlog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaFileInvoice,
  FaReceipt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function AdminShell({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed md:static
          top-0 left-0 z-50
          h-full md:h-auto
          w-64
          bg-[#9C7421]
          text-white
          p-6
          flex flex-col
          shadow-xl
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Brand */}
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold tracking-wide">
            Barakah CRM
          </h2>
          <p className="text-xs text-yellow-200 mt-1">
            Admin Panel
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 text-sm">
          <NavItem href="/admin" icon={<FaTachometerAlt />} label="Dashboard" />
          <NavItem href="/admin/invoices" icon={<FaFileInvoice />} label="Invoices" />
          <NavItem href="/admin/vouchers" icon={<FaReceipt />} label="Vouchers" />
          <NavItem href="/admin/packages" icon={<FaBoxOpen />} label="Packages" />
          <NavItem href="/admin/inquiries" icon={<FaEnvelope />} label="Inquiries" />
          <NavItem href="/admin/reviews" icon={<FaStar />} label="Reviews" />
          <NavItem href="/admin/gallery" icon={<FaImages />} label="Gallery" />
          <NavItem href="/admin/blog" icon={<FaBlog />} label="Blog" />
          <NavItem href="/admin/faq" icon={<FaQuestionCircle />} label="FAQ" />
        </nav>

        {/* Logout */}
        <button
          onClick={() => signOut()}
          className="mt-auto pt-6 border-t border-yellow-200/30 flex items-center gap-2 text-red-200 hover:text-white transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 w-full">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between bg-white p-4 shadow">
          <button onClick={() => setOpen(!open)}>
            {open ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          <span className="font-semibold">Admin Dashboard</span>
        </div>

        <main className="p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}

function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded hover:bg-yellow-700/40 transition"
    >
      {icon} {label}
    </Link>
  );
}
