import { NextRequest, NextResponse } from "next/server";
import { AdminUser, PermissionSet, readAdminData } from "@/lib/local-data";

type AdminPermission = keyof PermissionSet;

type AdminAuthOptions = {
  requireRole?: AdminUser["role"];
  requirePermission?: AdminPermission;
};

export async function authorizeAdminRequest(
  req: NextRequest,
  options: AdminAuthOptions = {}
) {
  const data = await readAdminData();
  const id = req.headers.get("x-admin-user-id");
  const email = req.headers.get("x-admin-user-email");

  if (!id || !email) {
    return {
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const user = data.users.find((item) => item.id === id && item.email === email);

  if (!user) {
    return {
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  if (options.requireRole && user.role !== options.requireRole) {
    return {
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  if (options.requirePermission && !user.permissions[options.requirePermission]) {
    return {
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { user, data };
}
