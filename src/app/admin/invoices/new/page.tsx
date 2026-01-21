import Link from "next/link";

export default function AdminInvoicesPage() {
  // TEMP demo data (baad me DB se aayega)
  const invoices = [
    {
      id: 12579,
      customer: "Muhammad Rais",
      amount: 765000,
      status: "Paid",
      date: "28 Oct 2025",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Invoices</h1>

        <Link
          href="/admin/invoices/new"
          className="bg-primary text-white px-4 py-2 rounded shadow hover:opacity-90"
        >
          + Create Invoice
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3">Invoice #</th>
              <th className="text-left px-4 py-3">Customer</th>
              <th className="text-left px-4 py-3">Amount</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-t">
                <td className="px-4 py-3">#{inv.id}</td>
                <td className="px-4 py-3">{inv.customer}</td>
                <td className="px-4 py-3">
                  PKR {inv.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                    {inv.status}
                  </span>
                </td>
                <td className="px-4 py-3">{inv.date}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/invoices/${inv.id}`}
                    className="text-primary font-semibold hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}

            {invoices.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-500"
                >
                  No invoices found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
