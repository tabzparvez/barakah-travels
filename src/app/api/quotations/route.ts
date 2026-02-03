import { NextRequest, NextResponse } from "next/server";
import { generateId, readData, writeData } from "@/lib/data-store";

const FILE = "quotations.json";

type Quotation = {
  id: string;
  createdAt?: string;
  status?: string;
  [key: string]: unknown;
};

export async function GET() {
  const quotations = await readData<Quotation[]>(FILE, []);
  return NextResponse.json(quotations);
}

export async function POST(req: NextRequest) {
  const data = (await req.json()) as Quotation;
  const quotations = await readData<Quotation[]>(FILE, []);
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
  const data = (await req.json()) as Partial<Quotation>;
  const quotations = await readData<Quotation[]>(FILE, []);
  const updated = quotations.map((quote) =>
    quote.id === id ? { ...quote, ...data } : quote
  );
  await writeData(FILE, updated);
  const found = updated.find((quote) => quote.id === id);
  return NextResponse.json(found ?? { error: "Quotation not found" }, { status: found ? 200 : 404 });
}
