import { ReactNode } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

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
} from "react-icons/fa";

const ADMIN_EMAIL = "info@barakahtravels.online";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // 🔐 Not logged in
  if (!session || !session.user?.email) {
    redirect("/login");
  }

  // 🔐 Not admin
  if (session.user.email !== ADMIN_EMAIL) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-[#9C7421] text-white p-6 flex flex-col shadow-xl">
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
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-yellow-700/40 transition"
          >
            <FaTachometerAlt /> Dashboard
          </Link>

          <Link
            href="/admin/invoices"
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-yellow-700/40 transition"
          >
            <FaFileInvoice /> Invoices
          </Link>

          <Link
            href="/admin/vouchers"
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-yellow-700/40 transition"
          >
            <FaReceipt /> Vouchers
          </Link>

          <Link
            href="/admin/packages"
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-yellow-700/40 transition"
          >
            <FaBoxOpen /> Packages
          </Link>

          <Link
            href="/admin/inquiries"
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-yellow-700/40 transition"
          >
            <FaEnvelope /> Inquiries
          </Link>

          <Link
            href="/admin/reviews"
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-yellow-700/40 transition"
          >
            <FaStar /> Reviews
          </Link>

          <Link
            href="/admin/gallery"
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-yellow-700/40 transition"
          >
            <FaImages /> Gallery
          </Link>

          <Link
            href="/admin/blog"
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-yellow-700/40 transition"
          >
            <FaBlog /> Blog
          </Link>

          <Link
            href="/admin/faq"
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-yellow-700/40 transition"
          >
            <FaQuestionCircle /> FAQ
          </Link>
        </nav>

        {/* Logout */}
        <form
          action="/api/auth/signout"
          method="post"
          className="mt-auto pt-6 border-t border-yellow-200/30"
        >
          <button className="flex items-center gap-2 text-red-200 hover:text-white transition">
            <FaSignOutAlt /> Logout
          </button>
        </form>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
