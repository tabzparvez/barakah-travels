"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewInvoicePage() {
  const router = useRouter();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [packageName, setPackageName] = useState("");
  const [total, setTotal] = useState<number>(0);
  const [paid, setPaid] = useState<number>(0);
  const [method, setMethod] = useState("Cash");

  const balance = total - paid;

  const handleSave = () => {
    if (!customerName || total <= 0) {
      alert("Customer name & total amount required");
      return;
    }

    const invoiceId = Date.now().toString();

    // TEMP STORAGE (next step DB hoga)
    localStorage.setItem(
      `invoice-${invoiceId}`,
      JSON.stringify({
        invoiceId,
        customerName,
        phone,
        email,
        packageName,
        total,
        paid,
        balance,
        method,
        date: new Date().toISOString(),
      })
    );

    router.push(`/admin/invoices/${invoiceId}`);
  };

  return (
    <div className="card max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Create New Invoice</h1>

      {/* CUSTOMER */}
      <div className="grid md:grid-cols-2 gap-4">
        <input
          className="input"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <input
          className="input"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="input md:col-span-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* PACKAGE */}
      <input
        className="input mt-3"
        placeholder="Package / Service (Umrah / Visa etc.)"
        value={packageName}
        onChange={(e) => setPackageName(e.target.value)}
      />

      {/* PAYMENT */}
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <input
          type="number"
          className="input"
          placeholder="Total Amount (PKR)"
          value={total}
          onChange={(e) => setTotal(Number(e.target.value))}
        />

        <input
          type="number"
          className="input"
          placeholder="Paid Amount (PKR)"
          value={paid}
          onChange={(e) => setPaid(Number(e.target.value))}
        />

        <select
          className="input md:col-span-2"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option>Cash</option>
          <option>Bank Transfer</option>
          <option>EasyPaisa / JazzCash</option>
          <option>Partial (Cash + Bank)</option>
        </select>
      </div>

      {/* SUMMARY */}
      <div className="mt-4 text-sm text-right">
        <p><strong>Total:</strong> PKR {total}</p>
        <p><strong>Paid:</strong> PKR {paid}</p>
        <p className={balance > 0 ? "text-red-600" : "text-green-600"}>
          <strong>Balance:</strong> PKR {balance}
        </p>
      </div>

      <button onClick={handleSave} className="btn mt-6">
        Save & View Invoice
      </button>
    </div>
  );
}
