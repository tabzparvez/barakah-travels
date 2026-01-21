"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateInvoicePage() {
  const router = useRouter();

  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [paid, setPaid] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const balance = amount - paid;

  const handleSubmit = () => {
    // TEMP: later DB me save hoga
    const fakeInvoiceId = Date.now();
    router.push(`/admin/invoices/${fakeInvoiceId}`);
  };

  return (
    <div className="max-w-3xl bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Create New Invoice</h1>

      <div className="grid grid-cols-2 gap-4">
        <input
          placeholder="Customer Name"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded col-span-2"
        />

        <input
          type="number"
          placeholder="Total Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Paid Amount"
          value={paid}
          onChange={(e) => setPaid(Number(e.target.value))}
          className="border p-2 rounded"
        />

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border p-2 rounded col-span-2"
        >
          <option value="cash">Cash</option>
          <option value="bank">Bank Transfer</option>
          <option value="partial">Cash + Bank</option>
        </select>
      </div>

      <div className="mt-4 text-right">
        <p>Total: <strong>PKR {amount}</strong></p>
        <p>Paid: <strong>PKR {paid}</strong></p>
        <p className="text-lg">
          Balance: <strong>PKR {balance}</strong>
        </p>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-primary text-white px-6 py-2 rounded"
      >
        Save & View Invoice
      </button>
    </div>
  );
}
