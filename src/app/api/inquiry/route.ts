import { NextRequest, NextResponse } from "next/server";
import { generateId, readData, writeData } from "@/lib/data-store";

const FILE = "inquiries.json";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const inquiries = await readData(FILE, []);
  const next = {
    id: generateId("inq"),
    ...data,
    createdAt: new Date().toISOString(),
    status: "New",
  };
  const updated = [next, ...inquiries];
  await writeData(FILE, updated);
  return NextResponse.json({ success: true, inquiry: next });
}
