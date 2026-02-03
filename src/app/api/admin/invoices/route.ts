import { NextRequest, NextResponse } from "next/server";
import { createId, readAdminData, writeAdminData } from "@/lib/local-data";
import { requireAdminSession } from "@/lib/admin-access";

function getInvoiceNumber() {
  return `INV-${new Date().getFullYear()}-${Math.floor(
    1000 + Math.random() * 9000
  )}`;
}

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await readAdminData();
  return NextResponse.json(data.invoices);
}

export async function POST(req: NextRequest) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await req.json();
  const data = await readAdminData();

  const invoice = {
    id: createId("inv"),
    quotationId: payload.quotationId,
    invoiceNumber: getInvoiceNumber(),
    client: payload.client,
    packageTitle: payload.packageTitle,
    amount: payload.amount,
    status: payload.status || "Unpaid",
    createdAt: new Date().toISOString(),
  };

  data.invoices.unshift(invoice);
  await writeAdminData(data);

  return NextResponse.json({ invoice }, { status: 201 });
}
