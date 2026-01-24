"use client";

export default function InvoiceViewPage({
  params,
}: {
  params: { id: string };
}) {
  const invoiceId = params?.id || "N/A";

  return (
    <div
      id="invoice-print"
      className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-xl"
    >
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Barakah Travels</h1>
          <p className="text-sm text-gray-500">Official Invoice</p>
        </div>

        <div className="text-right text-sm">
          <p>
            <strong>Invoice #</strong> {invoiceId}
          </p>
          <p>Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <hr className="my-4" />

      <p className="mb-4">
        <strong>Customer:</strong> Preview Customer
      </p>

      <table className="w-full border text-sm mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Qty</th>
            <th className="p-2 border">Unit Price</th>
            <th className="p-2 border">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border">Service</td>
            <td className="p-2 border">1</td>
            <td className="p-2 border">PKR 0</td>
            <td className="p-2 border">PKR 0</td>
          </tr>
        </tbody>
      </table>

      <div className="text-right mb-8">
        <p>
          <strong>Total:</strong> PKR 0
        </p>
        <p>
          <strong>Paid:</strong> PKR 0
        </p>
        <p>
          <strong>Balance:</strong> PKR 0
        </p>
      </div>

      {/* Buttons (print screen par, print me hide) */}
      <div className="flex gap-4 print:hidden">
        <button onClick={() => window.print()} className="btn">
          Print
        </button>
      </div>
    </div>
  );
}
