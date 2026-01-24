"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewInvoicePage() {
  const router = useRouter();

  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("Umrah Package");
  const [qty, setQty] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [paid, setPaid] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const total = qty * unitPrice;
  const balance = total - paid;

  function handleSubmit() {
    const id = Date.now().toString();

    const data = {
      customer,
      phone,
      email,
      description,
      qty,
      unitPrice,
      total,
      paid,
      balance,
      paymentMethod,
      date: new Date().toISOString(),
    };

    localStorage.setItem(`invoice-${id}`, JSON.stringify(data));
    router.push(`/admin/invoices/${id}`);
  }

  return (
    <div className="card max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Create New Invoice</h1>

      <input className="input" placeholder="Customer Name" onChange={e => setCustomer(e.target.value)} />
      <input className="input" placeholder="Phone" onChange={e => setPhone(e.target.value)} />
      <input className="input" placeholder="Email" onChange={e => setEmail(e.target.value)} />

      <input className="input" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input className="input" type="number" placeholder="Quantity" value={qty} onChange={e => setQty(+e.target.value)} />
      <input className="input" type="number" placeholder="Unit Price" onChange={e => setUnitPrice(+e.target.value)} />

      <select className="input" onChange={e => setPaymentMethod(e.target.value)}>
        <option>Cash</option>
        <option>Bank Transfer</option>
        <option>EasyPaisa</option>
        <option>JazzCash</option>
      </select>

      <input className="input" type="number" placeholder="Paid Amount" onChange={e => setPaid(+e.target.value)} />

      <div className="mt-4 text-sm">
        <p>Total: <strong>PKR {total}</strong></p>
        <p>Paid: <strong>PKR {paid}</strong></p>
        <p>Balance: <strong>PKR {balance}</strong></p>
      </div>

      <button onClick={handleSubmit} className="btn mt-6">
        Save & View Invoice
      </button>
    </div>
  );
}
