import { NextRequest, NextResponse } from "next/server";
import { generateId, readData, writeData } from "@/lib/data-store";

const FILE = "packages.json";

type TravelPackage = {
  id: string;
  type: string;
  title: string;
  price?: string;
  duration?: string;
  status?: string;
  images?: string[];
  inclusions?: string[];
  exclusions?: string[];
  itinerary?: string[];
  createdAt?: string;
};

export async function GET() {
  const packages = await readData<TravelPackage[]>(FILE, []);
  return NextResponse.json(packages);
}

export async function POST(req: NextRequest) {
  const data = (await req.json()) as TravelPackage;
  const packages = await readData<TravelPackage[]>(FILE, []);
  const next = {
    id: generateId("pkg"),
    ...data,
    createdAt: new Date().toISOString(),
  };
  const updated = [next, ...packages];
  await writeData(FILE, updated);
  return NextResponse.json(next);
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const data = (await req.json()) as Partial<TravelPackage>;
  const packages = await readData<TravelPackage[]>(FILE, []);
  const updated = packages.map((pkg) => (pkg.id === id ? { ...pkg, ...data } : pkg));
  await writeData(FILE, updated);
  const found = updated.find((pkg) => pkg.id === id);
  return NextResponse.json(found ?? { error: "Package not found" }, { status: found ? 200 : 404 });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const packages = await readData<TravelPackage[]>(FILE, []);
  const filtered = packages.filter((pkg) => pkg.id !== id);
  await writeData(FILE, filtered);
  return NextResponse.json({ success: true });
}
