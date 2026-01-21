import { notFound } from "next/navigation";

interface InvoicePageProps {
  params: {
    id: string;
  };
}

export default function InvoiceViewPage({ params }: InvoicePageProps) {
  const { id } = params;

  // Temporary mock invoice
  if (!id) return notFound();

  return (
    <div className="max-w-4xl mx-auto bg-white p-10 shadow rounded">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold">Barakah Travels</h2>
          <p className="text-sm text-gray-600">
            Gulshan-e-Iqbal, Karachi<br />
            +92 340 0799777<br />
            info@barakahtravels.online
          </p>
        </div>

        <div className="text-right">
          <h3 className="text-xl font-bold">INVOICE</h3>
          <p className="text-sm">Invoice #: {id}</p>
          <p className="text-sm">Date: 28-10-2025</p>
        </div>
      </div>

      {/* Customer */}
      <div className="mb-6">
        <h4 className="font-semibold mb-1">Bill To</h4>
        <p>
          Muhammad Rais<br />
          0300 2533801<br />
          m.rais@gmail.com
        </p>
      </div>

      {/* Table */}
      <table className="w-full border text-sm mb-6">
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

      {/* Summary */}
      <div className="text-right space-y-1 mb-8">
        <p>Subtotal: <strong>PKR 765,000</strong></p>
        <p>Paid: <strong>PKR 500,000</strong></p>
        <p className="text-lg">
          Balance: <strong>PKR 265,000</strong>
        </p>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm">Prepared By</p>
          <p className="font-semibold">Tabish Parvez</p>
        </div>

        <div className="text-right">
          <p className="text-sm mb-6">Authorized Signature</p>
          <div className="border-t w-40" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-10">
        <button
          onClick={() => window.print()}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Print
        </button>

        <button className="bg-primary text-white px-4 py-2 rounded">
          Download PDF
        </button>
      </div>
    </div>
  );
}

