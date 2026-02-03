import { NextRequest, NextResponse } from "next/server";
import { readData } from "@/lib/data-store";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const users = await readData("users.json", []);
  const user = users.find(
    (entry: any) => entry.username === username && entry.password === password
  );
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    permissions: user.permissions,
  };
  return NextResponse.json({ user: safeUser });
}
