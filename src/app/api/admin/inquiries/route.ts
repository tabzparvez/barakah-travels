import { NextRequest, NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const auth = await authorizeAdminRequest(req, {
    requirePermission: "inquiries",
  });
  if (auth.response) return auth.response;
  return NextResponse.json(auth.data.inquiries);
}
