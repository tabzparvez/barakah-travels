"use client";

import { amountToWords } from "@/lib/amountToWords";

export default function InvoiceViewPage({ params }: { params: { id: string } }) {
  const data =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(`invoice-${params.id}`) || "{}")
      : {};

  if (!data.customer) return <p>Invoice not found.</p>;

  return (
    <div id="invoice-print" className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow-lg">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Barakah Travels</h1>
          <p className="text-sm">Your Trusted Umrah & Travel Partner</p>
          <p className="text-xs mt-1">Karachi, Pakistan</p>
          <p className="text-xs">📞 +92 340 0799777 / +92 318 3548299</p>
          <p className="text-xs">✉ info@barakahtravels.online</p>
          <p className="text-xs">NTN: 7933776</p>
        </div>

        <div className="text-right text-sm">
          <p className="font-bold">OFFICIAL INVOICE</p>
          <p>Invoice #: {params.id}</p>
          <p>Date: {new Date().toLocaleDateString()}</p>
          <span className={`inline-block mt-2 px-2 py-1 rounded text-white ${data.balance > 0 ? "bg-red-500" : "bg-green-600"}`}>
            {data.balance > 0 ? "Unpaid" : "Paid"}
          </span>
        </div>
      </div>

      <hr className="my-6" />

      {/* CUSTOMER */}
      <p><strong>Customer:</strong> {data.customer}</p>
      <p><strong>Phone:</strong> {data.phone}</p>
      <p><strong>Email:</strong> {data.email}</p>

      {/* TABLE */}
      <table className="w-full border mt-6 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Description</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Unit Price</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">{data.description}</td>
            <td className="border p-2 text-center">{data.qty}</td>
            <td className="border p-2">PKR {data.unitPrice}</td>
            <td className="border p-2">PKR {data.total}</td>
          </tr>
        </tbody>
      </table>

      {/* TOTALS */}
      <div className="text-right mt-6 text-sm">
        <p>Subtotal: PKR {data.total}</p>
        <p>Paid: PKR {data.paid}</p>
        <p className="font-bold">Balance: PKR {data.balance}</p>
        <p className="mt-2 text-xs">
          <strong>Amount in Words:</strong> {amountToWords(data.total)}
        </p>
        <p className="mt-2 text-xs">Payment Method: {data.paymentMethod}</p>
      </div>

      {/* FOOTER */}
      <div className="mt-10 flex justify-between text-sm">
        <div>
          <p>Prepared By</p>
          <p className="font-bold">Tabish Parvez</p>
        </div>
        <div className="text-right">
          <p>Authorized Signature</p>
          <div className="mt-6 border-t w-40 ml-auto"></div>
        </div>
      </div>

      <div className="mt-8 no-print">
        <button onClick={() => window.print()} className="btn">
          Print / Save PDF
        </button>
      </div>
    </div>
  );
}
