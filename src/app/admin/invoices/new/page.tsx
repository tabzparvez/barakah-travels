"use client";

import Image from "next/image";

export default function InvoiceViewPage() {
  return (
    <div className="max-w-4xl mx-auto bg-white p-10 print:p-6">

      {/* HEADER */}
      <div className="flex justify-between items-start border-b pb-4 mb-6">
        <div className="flex gap-3">
          <Image
            src="/newlogo.png"
            alt="Barakah Travels"
            width={60}
            height={60}
          />
          <div>
            <h2 className="text-xl font-bold">Barakah Travels</h2>
            <p className="text-sm text-gray-600">
              Block 13D/1, Gulshan-e-Iqbal, Karachi<br />
              +92 340 0799777 | +92 318 3548299<br />
              info@barakahtravels.online
            </p>
          </div>
        </div>

        <div className="text-right">
          <h3 className="text-lg font-bold">INVOICE</h3>
          <p className="text-sm">Invoice #: 12579</p>
          <p className="text-sm">Date: 28-10-2025</p>
        </div>
      </div>

      {/* CUSTOMER */}
      <div className="mb-6">
        <h4 className="font-semibold mb-1">Bill To</h4>
        <p>
          Muhammad Rais<br />
          03002533801<br />
          m.rais@gmail.com
        </p>
      </div>

      {/* TABLE */}
      <table className="w-full border mb-6 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Description</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Unit Price</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">Umrah Package</td>
            <td className="border p-2 text-center">3</td>
            <td className="border p-2 text-right">PKR 255,000</td>
            <td className="border p-2 text-right">PKR 765,000</td>
          </tr>
        </tbody>
      </table>

      {/* TOTALS */}
      <div className="flex justify-end mb-10">
        <table className="text-sm">
          <tbody>
            <tr>
              <td className="p-2">Subtotal</td>
              <td className="p-2 text-right">PKR 765,000</td>
            </tr>
            <tr>
              <td className="p-2">Paid</td>
              <td className="p-2 text-right">PKR 500,000</td>
            </tr>
            <tr className="font-bold">
              <td className="p-2">Balance</td>
              <td className="p-2 text-right">PKR 265,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-end mt-16">
        <div>
          <p className="text-sm">Prepared By</p>
          <p className="font-semibold">Tabish Parvez</p>
        </div>

        <div className="text-center">
          <p className="text-sm mb-8">Authorized Signature</p>
          <div className="border-t w-40 mx-auto" />
        </div>
      </div>

      {/* ACTIONS (NOT IN PRINT) */}
      <div className="flex gap-4 mt-10 print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Print
        </button>

        <button
          onClick={() => alert("PDF next step")}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
