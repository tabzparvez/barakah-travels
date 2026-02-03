import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const ADMIN_EMAIL = "info@barakahtravels.online";

export async function requireAdminSession() {
  const session = await getServerSession(authOptions);

  if (
    !session?.user ||
    session.user.role !== "admin" ||
    session.user.email !== ADMIN_EMAIL
  ) {
    return null;
  }

  return session;
}
