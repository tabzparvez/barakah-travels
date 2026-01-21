"use client";

export default function ViewInvoicePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="bg-white max-w-4xl mx-auto p-8 shadow rounded">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">INVOICE</h1>
        <div className="text-sm text-right">
          <p>Invoice #: {params.id}</p>
          <p>Date: 28-10-2025</p>
        </div>
      </div>

      <hr className="mb-6" />

      <p className="mb-4">
        <strong>Customer:</strong> Muhammad Rais
      </p>

      <table className="w-full border mb-6 text-sm">
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
            <td className="border p-2">Umrah Package</td>
            <td className="border p-2">3</td>
            <td className="border p-2">PKR 255,000</td>
            <td className="border p-2">PKR 765,000</td>
          </tr>
        </tbody>
      </table>

      <div className="text-right space-y-1">
        <p>Total: PKR 765,000</p>
        <p>Paid: PKR 500,000</p>
        <p className="font-bold">Balance: PKR 265,000</p>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          Print
        </button>

        <button
          onClick={() => alert("PDF download next step")}
          className="px-4 py-2 bg-[#9C7421] text-white rounded"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
