import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import DashboardClient from "./DashboardClient";

export default async function UserDashboard() {
  const session = await getServerSession(authOptions);

  // 🔐 Not logged in
  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <DashboardClient
      userEmail={session.user.email || ""}
      userName={session.user.name}
    />
  );
}
