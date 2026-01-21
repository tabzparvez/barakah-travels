"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewInvoicePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [paid, setPaid] = useState("");

  const handleSubmit = () => {
    // ⚠️ Abhi sirf dummy ID generate
    const invoiceId = Date.now().toString();

    // Later yahan DB save hoga
    router.push(`/admin/invoices/${invoiceId}`);
  };

  return (
    <div className="card max-w-xl">
      <h1 className="text-xl font-bold mb-4">Create New Invoice</h1>

      <input
        placeholder="Customer Name"
        className="input"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Total Amount"
        className="input"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        placeholder="Paid Amount"
        className="input"
        value={paid}
        onChange={(e) => setPaid(e.target.value)}
      />

      <button onClick={handleSubmit} className="btn mt-4">
        Save & View Invoice
      </button>
    </div>
  );
}
