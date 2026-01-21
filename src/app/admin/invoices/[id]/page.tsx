export default function InvoiceViewPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div id="invoice-print" className="max-w-3xl mx-auto bg-white p-8 shadow">
      <div className="flex justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Barakah Travels</h2>
          <p className="text-sm">Official Invoice</p>
        </div>
        <div className="text-right">
          <p><strong>Invoice #</strong> {params.id}</p>
          <p>Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <hr className="my-4" />

      <p><strong>Customer:</strong> (Dynamic later)</p>

      <table className="w-full mt-4 border text-sm">
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
            <td className="p-2">Umrah Package</td>
            <td className="p-2">1</td>
            <td className="p-2">PKR 205,000</td>
            <td className="p-2">PKR 205,000</td>
          </tr>
        </tbody>
      </table>

      <div className="text-right mt-4">
        <p><strong>Total:</strong> PKR 205,000</p>
      </div>

      <div className="flex gap-4 mt-6 no-print">
        <button onClick={() => window.print()} className="btn">
          Print
        </button>
      </div>
    </div>
  );
}
