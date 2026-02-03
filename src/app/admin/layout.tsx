import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminShell from "@/app/admin/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (
    !session?.user ||
    session.user.role !== "admin" ||
    session.user.email !== "info@barakahtravels.online"
  ) {
    redirect("/login");
  }

  return <AdminShell user={session.user}>{children}</AdminShell>;
}
