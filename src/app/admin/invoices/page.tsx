import Link from "next/link";

export default function InvoicesPage() {
  const invoices = [
    {
      id: "12579",
      customer: "Muhammad Rais",
      amount: "PKR 765,000",
      status: "Paid",
      date: "28 Oct 2025",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Invoices</h1>

        <Link
          href="/admin/invoices/new"
          className="bg-primary text-white px-4 py-2 rounded shadow hover:bg-primary-dark"
        >
          + Create Invoice
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
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
                <td className="p-3">{inv.amount}</td>
                <td className="p-3">
                  <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                    {inv.status}
                  </span>
                </td>
                <td className="p-3">{inv.date}</td>
                <td className="p-3">
                  <Link
                    href={`/admin/invoices/${inv.id}`}
                    className="text-primary font-semibold hover:underline"
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
