import { NextRequest, NextResponse } from "next/server";
import {
  createId,
  readAdminData,
  sanitizeUser,
  writeAdminData,
} from "@/lib/local-data";

export async function GET() {
  const data = await readAdminData();
  return NextResponse.json(data.users.map(sanitizeUser));
}

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const data = await readAdminData();

  const newUser = {
    id: createId("user"),
    name: payload.name,
    email: payload.email,
    role: payload.role,
    password: payload.password || "barakah@2025",
    permissions: payload.permissions,
  };

  data.users.push(newUser);
  await writeAdminData(data);

  return NextResponse.json({ user: sanitizeUser(newUser) }, { status: 201 });
}

export async function PUT(req: NextRequest) {
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
    password: payload.password || data.users[index].password,
  };

  await writeAdminData(data);
  return NextResponse.json({ user: sanitizeUser(data.users[index]) });
}

export async function DELETE(req: NextRequest) {
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
