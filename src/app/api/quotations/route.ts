import { NextRequest, NextResponse } from "next/server";
import { generateId, readData, writeData } from "@/lib/data-store";

const FILE = "quotations.json";

export async function GET() {
  const quotations = await readData(FILE, []);
  return NextResponse.json(quotations);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const quotations = await readData(FILE, []);
  const next = {
    id: generateId("quote"),
    ...data,
    createdAt: new Date().toISOString(),
    status: "Draft",
  };
  const updated = [next, ...quotations];
  await writeData(FILE, updated);
  return NextResponse.json(next);
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const data = await req.json();
  const quotations = await readData(FILE, []);
  const updated = quotations.map((quote: any) =>
    quote.id === id ? { ...quote, ...data } : quote
  );
  await writeData(FILE, updated);
  const found = updated.find((quote: any) => quote.id === id);
  return NextResponse.json(found ?? { error: "Quotation not found" }, { status: found ? 200 : 404 });
}
