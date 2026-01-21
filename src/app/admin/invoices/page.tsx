import Link from "next/link";

export default function InvoicesPage() {
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Link href="/admin/invoices/new" className="btn">
          + Create Invoice
        </Link>
      </div>

      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Invoice #</th>
            <th className="p-2 text-left">Customer</th>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Dummy row (later DB se ayega) */}
          <tr className="border-t">
            <td className="p-2">#1769033708683</td>
            <td className="p-2">Muhammad Rais</td>
            <td className="p-2">PKR 765,000</td>
            <td className="p-2">
              <Link
                href="/admin/invoices/1769033708683"
                className="text-primary font-semibold"
              >
                View
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
