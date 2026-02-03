import { NextRequest, NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/admin-auth";
import { createId, writeAdminData } from "@/lib/local-data";

export async function GET(req: NextRequest) {
  const auth = await authorizeAdminRequest(req, {
    requirePermission: "quotations",
  });
  if (auth.response) return auth.response;
  return NextResponse.json(auth.data.quotations);
}

export async function POST(req: NextRequest) {
  const auth = await authorizeAdminRequest(req, {
    requirePermission: "quotations",
  });
  if (auth.response) return auth.response;

  const payload = await req.json();
  const data = auth.data;

  const quotation = {
    id: createId("qt"),
    inquiryId: payload.inquiryId,
    client: payload.client,
    flightGoing: payload.flightGoing,
    flightReturn: payload.flightReturn,
    makkahHotel: payload.makkahHotel,
    madinahHotel: payload.madinahHotel,
    transport: payload.transport,
    package: payload.package,
    createdAt: new Date().toISOString(),
  };

  data.quotations.unshift(quotation);
  await writeAdminData(data);

  return NextResponse.json({ quotation }, { status: 201 });
}
