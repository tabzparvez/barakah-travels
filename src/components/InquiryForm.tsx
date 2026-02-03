"use client";

import { useState } from "react";

type InquiryFormProps = {
  title?: string;
  description?: string;
};

export default function InquiryForm({ title, description }: InquiryFormProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Umrah Packages",
    from: "",
    to: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        setError("Unable to submit your inquiry. Please try again.");
        return;
      }
      setSubmitted(true);
      setForm({
        name: "",
        phone: "",
        email: "",
        service: "Umrah Packages",
        from: "",
        to: "",
        notes: "",
      });
    } catch {
      setError("Unable to submit your inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      {title && (
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-primary">{title}</h2>
          {description && (
            <p className="text-sm text-gray-600 mt-2">{description}</p>
          )}
        </div>
      )}
      {submitted ? (
        <div className="text-green-600 font-semibold">
          Thank you! Your inquiry has been received.
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              className="input"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange("name")}
              required
            />
            <input
              className="input"
              placeholder="Phone number"
              value={form.phone}
              onChange={handleChange("phone")}
              required
            />
            <input
              className="input"
              placeholder="Email address"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              required
            />
            <select className="input" value={form.service} onChange={handleChange("service")}>
              <option>Umrah Packages</option>
              <option>Turkey</option>
              <option>Baku</option>
            </select>
            <input
              className="input"
              placeholder="Departure city"
              value={form.from}
              onChange={handleChange("from")}
            />
            <input
              className="input"
              placeholder="Arrival city"
              value={form.to}
              onChange={handleChange("to")}
            />
          </div>
          <textarea
            className="input"
            rows={4}
            placeholder="Notes or requirements"
            value={form.notes}
            onChange={handleChange("notes")}
          />
          {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Inquiry"}
          </button>
        </form>
      )}
    </div>
  );
}
