"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewInvoicePage() {
  const router = useRouter();

  const [total, setTotal] = useState(0);
  const [paid, setPaid] = useState(0);

  const balance = total - paid;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // TEMP: fake invoice id
    const invoiceId = Date.now().toString();

    // Later yahan DB save hoga
    router.push(`/admin/invoices/${invoiceId}`);
  }

  return (
    <div className="max-w-3xl bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-6">Create New Invoice</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border p-2" placeholder="Customer Name" required />
        <input className="w-full border p-2" placeholder="Phone" />
        <input className="w-full border p-2" placeholder="Email" />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            className="border p-2"
            placeholder="Total Amount"
            value={total}
            onChange={(e) => setTotal(+e.target.value)}
          />
          <input
            type="number"
            className="border p-2"
            placeholder="Paid Amount"
            value={paid}
            onChange={(e) => setPaid(+e.target.value)}
          />
        </div>

        <select className="w-full border p-2">
          <option>Cash</option>
          <option>Bank Transfer</option>
          <option>Cash + Bank</option>
        </select>

        <div className="text-right text-sm">
          <p>Total: PKR {total}</p>
          <p>Paid: PKR {paid}</p>
          <p className="font-bold">Balance: PKR {balance}</p>
        </div>

        <button className="bg-[#9C7421] text-white px-4 py-2 rounded">
          Save & View Invoice
        </button>
      </form>
    </div>
  );
}
