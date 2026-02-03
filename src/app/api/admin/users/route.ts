import { NextRequest, NextResponse } from "next/server";
import { generateId, readData, writeData } from "@/lib/data-store";

const FILE = "users.json";

type UserRecord = {
  id: string;
  name: string;
  email: string;
  username: string;
  password?: string;
  role: string;
  permissions: string[];
};

export async function GET() {
  const users = await readData<UserRecord[]>(FILE, []);
  const sanitized = users.map((user) => {
    const { password: _password, ...rest } = user;
    return rest;
  });
  return NextResponse.json(sanitized);
}

export async function POST(req: NextRequest) {
  const data = (await req.json()) as UserRecord;
  const users = await readData<UserRecord[]>(FILE, []);
  const next = {
    id: generateId("user"),
    ...data,
  };
  const updated = [next, ...users];
  await writeData(FILE, updated);
  return NextResponse.json(next);
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const data = (await req.json()) as Partial<UserRecord>;
  const users = await readData<UserRecord[]>(FILE, []);
  const updated = users.map((user) => (user.id === id ? { ...user, ...data } : user));
  await writeData(FILE, updated);
  const found = updated.find((user) => user.id === id);
  return NextResponse.json(found ?? { error: "User not found" }, { status: found ? 200 : 404 });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const users = await readData<UserRecord[]>(FILE, []);
  const filtered = users.filter((user) => user.id !== id);
  await writeData(FILE, filtered);
  return NextResponse.json({ success: true });
}
