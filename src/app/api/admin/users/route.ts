import { NextRequest, NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/admin-auth";
import {
  createId,
  createTemporaryPassword,
  sanitizeUser,
  writeAdminData,
} from "@/lib/local-data";

export async function GET(req: NextRequest) {
  const auth = await authorizeAdminRequest(req, {
    requireRole: "Super Admin",
  });
  if (auth.response) return auth.response;
  return NextResponse.json(auth.data.users.map(sanitizeUser));
}

export async function POST(req: NextRequest) {
  const auth = await authorizeAdminRequest(req, {
    requireRole: "Super Admin",
  });
  if (auth.response) return auth.response;

  const payload = await req.json();
  const data = auth.data;
  const password = payload.password?.trim()
    ? payload.password
    : createTemporaryPassword();

  const newUser = {
    id: createId("user"),
    name: payload.name,
    email: payload.email,
    role: payload.role,
    password,
    permissions: payload.permissions,
  };

  data.users.push(newUser);
  await writeAdminData(data);

  return NextResponse.json(
    {
      user: sanitizeUser(newUser),
      temporaryPassword: payload.password ? null : password,
    },
    { status: 201 }
  );
}

export async function PUT(req: NextRequest) {
  const auth = await authorizeAdminRequest(req, {
    requireRole: "Super Admin",
  });
  if (auth.response) return auth.response;

  const payload = await req.json();
  const data = auth.data;
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
  const auth = await authorizeAdminRequest(req, {
    requireRole: "Super Admin",
  });
  if (auth.response) return auth.response;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const data = auth.data;
  data.users = data.users.filter((item) => item.id !== id);
  await writeAdminData(data);

  return NextResponse.json({ success: true });
}
