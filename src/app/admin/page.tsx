import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
    </main>
  );
}
