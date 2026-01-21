export default function InvoiceViewPage({
  params,
}: {
  params: { id: string };
}) {
  // TEMP SAFE DATA (jab tak DB nahi lagti)
  const invoice = {
    id: params.id,
    customer: "Preview Invoice",
    total: 0,
    paid: 0,
  };

  return (
    <div id="invoice-print" className="max-w-3xl mx-auto bg-white p-8 shadow rounded-xl">
      <div className="flex justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Barakah Travels</h2>
          <p className="text-sm text-gray-500">Official Invoice</p>
        </div>
        <div className="text-right text-sm">
          <p><strong>Invoice #</strong> {invoice.id}</p>
          <p>Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <hr className="my-4" />

      <p className="mb-4">
        <strong>Customer:</strong> {invoice.customer}
      </p>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Description</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Price</th>
            <th className="p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-2">Service</td>
            <td className="p-2">1</td>
            <td className="p-2">PKR {invoice.total}</td>
            <td className="p-2">PKR {invoice.total}</td>
          </tr>
        </tbody>
      </table>

      <div className="text-right mt-4">
        <p><strong>Total:</strong> PKR {invoice.total}</p>
        <p><strong>Paid:</strong> PKR {invoice.paid}</p>
        <p><strong>Balance:</strong> PKR {invoice.total - invoice.paid}</p>
      </div>

      <div className="mt-6 flex gap-4 no-print">
        <button onClick={() => window.print()} className="btn">
          Print
        </button>
      </div>
    </div>
  );
}
