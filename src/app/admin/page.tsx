import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  /* 🔐 Not logged in */
  if (!session) {
    redirect("/login");
  }

  /* 🔐 Admin role check */
  if (session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-primary">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <a href="/admin/packages" className="card btn text-center">
          Manage Packages
        </a>
        <a href="/admin/inquiries" className="card btn text-center">
          View Inquiries
        </a>
        <a href="/admin/reviews" className="card btn text-center">
          Manage Reviews
        </a>
        <a href="/admin/blog" className="card btn text-center">
          Manage Blog
        </a>
        <a href="/admin/faq" className="card btn text-center">
          Manage FAQ
        </a>
        <a href="/admin/gallery" className="card btn text-center">
          Manage Gallery
        </a>
      </div>

      <form action="/api/auth/signout" method="post" className="mt-10">
        <button className="btn bg-red-600 text-white">
          Logout
        </button>
      </form>
    </main>
  );
}
