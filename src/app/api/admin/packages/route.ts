import { NextRequest, NextResponse } from "next/server";
import { createId, readAdminData, writeAdminData } from "@/lib/local-data";
import { requireAdminSession } from "@/lib/admin-access";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await readAdminData();
  return NextResponse.json(data.packages);
}

export async function POST(req: NextRequest) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await req.json();
  const data = await readAdminData();
  const category = payload.category === "tours" ? "tours" : "umrah";

  const newPackage = {
    id: createId("pkg"),
    title: payload.title,
    images: payload.images || [],
    price: Number(payload.price) || 0,
    duration: payload.duration,
    inclusions: payload.inclusions || [],
    exclusions: payload.exclusions || [],
    itinerary: payload.itinerary || "",
    status: payload.status || "Active",
  };

  data.packages[category].push(newPackage);
  await writeAdminData(data);

  return NextResponse.json({ package: newPackage }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await req.json();
  const data = await readAdminData();
  const category = payload.category === "tours" ? "tours" : "umrah";
  const index = data.packages[category].findIndex(
    (item) => item.id === payload.id
  );

  if (index === -1) {
    return NextResponse.json({ error: "Package not found" }, { status: 404 });
  }

  data.packages[category][index] = {
    ...data.packages[category][index],
    title: payload.title,
    images: payload.images || [],
    price: Number(payload.price) || 0,
    duration: payload.duration,
    inclusions: payload.inclusions || [],
    exclusions: payload.exclusions || [],
    itinerary: payload.itinerary || "",
    status: payload.status || "Active",
  };

  await writeAdminData(data);
  return NextResponse.json({ package: data.packages[category][index] });
}

export async function DELETE(req: NextRequest) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const category = searchParams.get("category") === "tours" ? "tours" : "umrah";

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const data = await readAdminData();
  data.packages[category] = data.packages[category].filter(
    (item) => item.id !== id
  );
  await writeAdminData(data);

  return NextResponse.json({ success: true });
}
