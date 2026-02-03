import { NextRequest, NextResponse } from "next/server";
import { createId, readAdminData, writeAdminData } from "@/lib/local-data";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const data = await readAdminData();

  const inquiry = {
    id: createId("inq"),
    type: "Umrah" as const,
    name: payload.name,
    phone: payload.phone,
    email: payload.email,
    city: payload.city,
    persons: payload.persons,
    destination: "Makkah & Madinah",
    travelMonth: payload.travelMonth,
    message: payload.message,
    createdAt: new Date().toISOString(),
  };

  data.inquiries.unshift(inquiry);
  await writeAdminData(data);

  return NextResponse.json({ success: true, inquiry });
}
