"use client";

import { amountToWords } from "@/lib/amountToWords";

export default function InvoiceViewPage({
  params,
}: {
  params: { id: string };
}) {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(`invoice-${params.id}`);
  if (!raw) return <p className="text-center mt-10">Invoice not found.</p>;

  const data = JSON.parse(raw);
  const invoiceNumber = data.invoiceId || params.id;

  return (
    <div
      id="invoice-print"
      className="max-w-4xl mx-auto bg-white p-10 text-sm"
    >
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-wide">
            BARAKAH TRAVELS
          </h1>
          <p className="text-xs">Umrah • Visa • Travel Services</p>
          <p className="text-xs mt-1">
            Karachi, Pakistan
          </p>
          <p className="text-xs">
            📞 +92 340 0799777 | +92 318 3548299
          </p>
          <p className="text-xs">
            ✉ info@barakahtravels.online
          </p>
          <p className="text-xs">NTN: 7933776</p>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold">INVOICE</p>
          <p>
            <strong>No:</strong> {invoiceNumber}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date().toLocaleDateString()}
          </p>
          <span
            className={`inline-block mt-2 px-3 py-1 rounded text-white text-xs ${
              data.balance > 0
                ? "bg-red-600"
                : "bg-green-600"
            }`}
          >
            {data.balance > 0 ? "UNPAID" : "PAID"}
          </span>
        </div>
      </div>

      <hr className="my-4" />

      {/* ================= CUSTOMER ================= */}
      <div className="mb-4">
        <p>
          <strong>Customer Name:</strong>{" "}
          {data.customerName}
        </p>
        <p>
          <strong>Phone:</strong> {data.phone}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        {data.quotationId && (
          <p>
            <strong>Quotation:</strong> {data.quotationId}
          </p>
        )}
      </div>

      {/* ================= TABLE ================= */}
      <table className="w-full border border-black border-collapse mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black p-2 text-left">
              Description
            </th>
            <th className="border border-black p-2 text-center">
              Qty
            </th>
            <th className="border border-black p-2 text-right">
              Unit Price
            </th>
            <th className="border border-black p-2 text-right">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black p-2">
              {data.description}
            </td>
            <td className="border border-black p-2 text-center">
              {data.qty}
            </td>
            <td className="border border-black p-2 text-right">
              PKR {Number(data.unitPrice).toLocaleString()}
            </td>
            <td className="border border-black p-2 text-right">
              PKR {Number(data.total).toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>

      {/* ================= TOTALS ================= */}
      <div className="flex justify-end mb-4">
        <table className="w-1/2 border border-black">
          <tbody>
            <tr>
              <td className="border p-2">Total</td>
              <td className="border p-2 text-right">
                PKR {Number(data.total).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="border p-2">Paid</td>
              <td className="border p-2 text-right">
                PKR {Number(data.paid).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="border p-2 font-bold">
                Balance
              </td>
              <td className="border p-2 text-right font-bold">
                PKR {Number(data.balance).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs mb-3">
        <strong>Amount in Words:</strong>{" "}
        {amountToWords(Number(data.total))} only
      </p>

      <p className="text-xs mb-4">
        <strong>Payment Method:</strong>{" "}
        {data.paymentMethod}
      </p>

      {/* ================= TERMS ================= */}
      <div className="text-xs mt-4">
        <p className="font-bold mb-1">
          Terms & Conditions:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            All payments once made are non-refundable.
          </li>
          <li>
            Any increase in government taxes or airline
            charges will be payable by customer.
          </li>
          <li>
            Barakah Travels is not responsible for delays
            due to airline, visa or weather conditions.
          </li>
        </ul>
      </div>

      {/* ================= SIGNATURE ================= */}
      <div className="flex justify-between mt-10 text-xs">
        <div>
          <p>Prepared By</p>
          <p className="font-bold mt-4">
            Tabish Parvez
          </p>
        </div>
        <div className="text-right">
          <p>Authorized Signature</p>
          <div className="border-t mt-6 w-40 ml-auto"></div>
        </div>
      </div>

      {/* ================= PRINT ================= */}
      <div className="mt-6 no-print">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => window.print()}
            className="btn"
          >
            Print Invoice
          </button>
          <button
            onClick={() => window.print()}
            className="btn-outline"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
