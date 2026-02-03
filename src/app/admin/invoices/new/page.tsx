"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewInvoicePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    price: "",
    status: "Unpaid",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client: { name: form.name, phone: form.phone },
        packageDetails: { price: form.price },
        status: form.status,
      }),
    });
    const data = await res.json();
    router.push(`/admin/invoices/${data.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="admin-card">
        <h2 className="text-2xl font-semibold mb-2">Create Invoice</h2>
        <p className="text-slate-500">Generate an invoice manually if needed.</p>
      </div>

      <div className="admin-card space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Client Name"
          className="admin-input"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Client Phone"
          className="admin-input"
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Invoice Amount"
          className="admin-input"
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="admin-input"
        >
          <option value="Unpaid">Unpaid</option>
          <option value="Paid">Paid</option>
        </select>
      </div>

      <button type="submit" className="btn w-full md:w-auto">
        Save Invoice
      </button>
    </form>
  );
}
