import { NextRequest, NextResponse } from "next/server";
import { createId, readAdminData, writeAdminData } from "@/lib/local-data";

export async function GET() {
  const data = await readAdminData();
  return NextResponse.json(data.quotations);
}

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const data = await readAdminData();

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
