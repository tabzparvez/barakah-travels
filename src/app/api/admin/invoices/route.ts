import { NextRequest, NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/admin-auth";
import { createId, writeAdminData } from "@/lib/local-data";

function getInvoiceNumber() {
  return `INV-${new Date().getFullYear()}-${Math.floor(
    1000 + Math.random() * 9000
  )}`;
}

export async function GET(req: NextRequest) {
  const auth = await authorizeAdminRequest(req, {
    requirePermission: "invoices",
  });
  if (auth.response) return auth.response;
  return NextResponse.json(auth.data.invoices);
}

export async function POST(req: NextRequest) {
  const auth = await authorizeAdminRequest(req, {
    requirePermission: "invoices",
  });
  if (auth.response) return auth.response;

  const payload = await req.json();
  const data = auth.data;

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
