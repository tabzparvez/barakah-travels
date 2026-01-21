import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function UserDashboard() {
  const session = await getServerSession(authOptions);

  // 🔐 Not logged in
  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-primary mb-2">
        User Dashboard
      </h1>

      <p className="text-gray-600 mb-8">
        Welcome back, <strong>{session.user.name}</strong>
      </p>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="font-semibold text-lg mb-2">My Inquiries</h2>
          <p className="text-gray-600 text-sm">
            View your Umrah & travel inquiries.
          </p>
          <span className="inline-block mt-3 text-xs text-gray-400">
            (Coming soon)
          </span>
        </div>

        <div className="card p-6">
          <h2 className="font-semibold text-lg mb-2">My Bookings</h2>
          <p className="text-gray-600 text-sm">
            Track booking & payment status.
          </p>
          <span className="inline-block mt-3 text-xs text-gray-400">
            (Coming soon)
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="mt-10 text-sm text-gray-500">
        Logged in as <strong>{session.user.email}</strong>
      </div>
    </main>
  );
}
