import { NextResponse } from "next/server";
import { readAdminData } from "@/lib/local-data";

export async function GET() {
  const data = await readAdminData();
  return NextResponse.json(data.inquiries);
}
