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
      {/* Sidebar */}
      <aside className="w-64 bg-[#9C7421] text-white p-6 flex flex-col">
        <h2 className="text-2xl font-extrabold mb-10">
          Barakah CRM
        </h2>

        <nav className="flex flex-col gap-4 text-sm">
          <Link className="flex items-center gap-2 hover:text-yellow-300" href="/admin">
            <FaTachometerAlt /> Dashboard
          </Link>
          <Link className="flex items-center gap-2 hover:text-yellow-300" href="/admin/packages">
            <FaBoxOpen /> Packages
          </Link>
          <Link className="flex items-center gap-2 hover:text-yellow-300" href="/admin/inquiries">
            <FaEnvelope /> Inquiries
          </Link>
          <Link className="flex items-center gap-2 hover:text-yellow-300" href="/admin/reviews">
            <FaStar /> Reviews
          </Link>
          <Link className="flex items-center gap-2 hover:text-yellow-300" href="/admin/gallery">
            <FaImages /> Gallery
          </Link>
          <Link className="flex items-center gap-2 hover:text-yellow-300" href="/admin/blog">
            <FaBlog /> Blog
          </Link>
          <Link className="flex items-center gap-2 hover:text-yellow-300" href="/admin/faq">
            <FaQuestionCircle /> FAQ
          </Link>
        </nav>

        <form action="/api/auth/signout" method="post" className="mt-auto">
          <button className="flex items-center gap-2 text-red-200 hover:text-white">
            <FaSignOutAlt /> Logout
          </button>
        </form>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
