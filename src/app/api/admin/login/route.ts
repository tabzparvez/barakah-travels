import { NextRequest, NextResponse } from "next/server";
import { readAdminData, sanitizeUser } from "@/lib/local-data";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const data = await readAdminData();
  const user = data.users.find(
    (item) => item.email === email && item.password === password
  );

  if (!user) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  return NextResponse.json({ user: sanitizeUser(user) });
}
