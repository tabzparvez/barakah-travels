import { NextRequest, NextResponse } from "next/server";
import { createId, readAdminData, writeAdminData } from "@/lib/local-data";
import { requireAdminSession } from "@/lib/admin-access";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await readAdminData();
  return NextResponse.json(data.users);
}

export async function POST(req: NextRequest) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await req.json();
  const data = await readAdminData();

  const newUser = {
    id: createId("user"),
    name: payload.name,
    email: payload.email,
    role: payload.role,
    permissions: payload.permissions,
  };

  data.users.push(newUser);
  await writeAdminData(data);

  return NextResponse.json({ user: newUser }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await req.json();
  const data = await readAdminData();
  const index = data.users.findIndex((item) => item.id === payload.id);

  if (index === -1) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  data.users[index] = {
    ...data.users[index],
    name: payload.name,
    email: payload.email,
    role: payload.role,
    permissions: payload.permissions,
  };

  await writeAdminData(data);
  return NextResponse.json({ user: data.users[index] });
}

export async function DELETE(req: NextRequest) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const data = await readAdminData();
  data.users = data.users.filter((item) => item.id !== id);
  await writeAdminData(data);

  return NextResponse.json({ success: true });
}
