import { ReactNode } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect, unauthorized } from "next/navigation";
import { authOptions } from "@/lib/auth";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaEnvelope,
  FaSignOutAlt,
  FaFileInvoice,
  FaFileSignature,
  FaCogs,
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
    unauthorized();
  }

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      {/* ================= SIDEBAR ================= */}
      <aside className="hidden md:flex md:w-72 bg-white text-secondary p-6 flex-col shadow-lg border-r border-primary/10">
        {/* Brand */}
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold tracking-wide text-primary">
            Barakah Umrah CRM
          </h2>
          <p className="text-xs text-secondary mt-1">
            Operations & Sales
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 text-sm">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-primary/10 transition">
            <FaTachometerAlt className="text-primary" /> Dashboard
          </Link>

          <Link href="/admin/inquiries" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-primary/10 transition">
            <FaEnvelope className="text-primary" /> Inquiries
          </Link>

          <Link href="/admin/quotations" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-primary/10 transition">
            <FaFileSignature className="text-primary" /> Quotations
          </Link>

          <Link href="/admin/invoices" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-primary/10 transition">
            <FaFileInvoice className="text-primary" /> Invoices
          </Link>

          <Link href="/admin/packages" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-primary/10 transition">
            <FaBoxOpen className="text-primary" /> Umrah Packages
          </Link>

          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-primary/10 transition">
            <FaCogs className="text-primary" /> Settings
          </Link>
        </nav>

        {/* Logout */}
        <form
          action="/api/auth/signout"
          method="post"
          className="mt-auto pt-6 border-t border-primary/10"
        >
          <button className="flex items-center gap-2 text-red-500 hover:text-red-600 transition">
            <FaSignOutAlt /> Logout
          </button>
        </form>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="w-full p-4 md:p-10">
        {children}
      </main>
    </div>
  );
}
