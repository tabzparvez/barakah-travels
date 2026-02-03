"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [companyName, setCompanyName] = useState("Barakah Travels");
  const [phone, setPhone] = useState("+92 318 3548299");
  const [email, setEmail] = useState("info@barakahtravels.online");
  const [address, setAddress] = useState("Karachi, Pakistan");

  return (
    <main className="section max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Settings</h1>
        <p className="text-sm text-gray-500">
          Update CRM display details for quotations and invoices.
        </p>
      </div>

      <div className="card">
        <div className="grid gap-4">
          <input
            className="input"
            placeholder="Company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <input
            className="input"
            placeholder="Primary phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="input"
            placeholder="Primary email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            className="input"
            rows={3}
            placeholder="Office address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mt-6 flex gap-3">
          <button className="btn" type="button">
            Save Settings
          </button>
          <button className="btn-outline" type="button">
            Cancel
          </button>
        </div>
      </div>
    </main>
  );
}
