import Link from "next/link";

export default function AdminInvoicesPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-primary">
          Invoices
        </h1>

        <Link
          href="/admin/invoices/new"
          className="btn bg-primary text-white"
        >
          + Create Invoice
        </Link>
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-3">Invoice #</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {/* Dummy row */}
            <tr className="border-t">
              <td className="px-4 py-3 font-semibold">#12579</td>
              <td className="px-4 py-3">Muhammad Rais</td>
              <td className="px-4 py-3">PKR 765,000</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                  Paid
                </span>
              </td>
              <td className="px-4 py-3">28 Oct 2025</td>
              <td className="px-4 py-3">
                <Link
                  href="/admin/invoices/12579"
                  className="text-primary font-semibold hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>

            {/* Empty state ready */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
