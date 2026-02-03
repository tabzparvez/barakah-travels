import { NextResponse } from "next/server";
import { readAdminData } from "@/lib/local-data";
import { requireAdminSession } from "@/lib/admin-access";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await readAdminData();
  return NextResponse.json(data.inquiries);
}
