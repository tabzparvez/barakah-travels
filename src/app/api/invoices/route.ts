import { NextRequest, NextResponse } from "next/server";
import { generateId, readData, writeData } from "@/lib/data-store";

const FILE = "invoices.json";

export async function GET() {
  const invoices = await readData(FILE, []);
  return NextResponse.json(invoices);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const invoices = await readData(FILE, []);
  const next = {
    id: generateId("inv"),
    invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`,
    ...data,
    createdAt: new Date().toISOString(),
    status: data.status ?? "Unpaid",
  };
  const updated = [next, ...invoices];
  await writeData(FILE, updated);
  return NextResponse.json(next);
}
