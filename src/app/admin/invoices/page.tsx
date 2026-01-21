import Link from "next/link";

const invoices = [
  {
    id: "12579",
    customer: "Muhammad Rais",
    amount: 765000,
    status: "Paid",
    date: "28 Oct 2025",
  },
];

export default function InvoiceListPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Invoices</h1>

        <Link
          href="/admin/invoices/new"
          className="bg-[#9C7421] text-white px-4 py-2 rounded"
        >
          + Create Invoice
        </Link>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Invoice #</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-t">
                <td className="p-3">#{inv.id}</td>
                <td className="p-3">{inv.customer}</td>
                <td className="p-3">PKR {inv.amount.toLocaleString()}</td>
                <td className="p-3">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                    {inv.status}
                  </span>
                </td>
                <td className="p-3">{inv.date}</td>
                <td className="p-3">
                  <Link
                    href={`/admin/invoices/${inv.id}`}
                    className="text-[#9C7421] font-semibold"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
