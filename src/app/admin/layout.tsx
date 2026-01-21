import { ReactNode } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth"; // we will create this

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Barakah CRM</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/packages">Packages</Link>
          <Link href="/admin/inquiries">Inquiries</Link>
          <Link href="/admin/reviews">Reviews</Link>
          <Link href="/admin/gallery">Gallery</Link>
          <Link href="/admin/blog">Blog</Link>
          <Link href="/admin/faq">FAQ</Link>
          <Link href="/admin/staff">Staff</Link>
          <Link href="/api/auth/signout">Logout</Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
