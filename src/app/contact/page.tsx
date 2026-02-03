"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    service: "Umrah",
    notes: "",
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus({ loading: true, success: false, error: "" });

    const response = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    });

    if (!response.ok) {
      setFormStatus({
        loading: false,
        success: false,
        error: "Unable to send your request. Please try again.",
      });
      return;
    }

    setFormStatus({ loading: false, success: true, error: "" });
    setFormState({ name: "", phone: "", service: "Umrah", notes: "" });
  };

  return (
    <main className="section">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            Contact Barakah Travels
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Share your travel goals and our Umrah specialists will tailor the
            perfect package for you. We respond fast on WhatsApp, phone, and
            email.
          </p>
          <a
            href="https://wa.me/923183548299"
            className="btn inline-flex"
          >
            Chat on WhatsApp Now
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="card text-center space-y-2">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              WhatsApp
            </p>
            <p className="text-lg font-semibold text-primary">
              +92 318 3548299
            </p>
            <p className="text-sm text-gray-500">
              Fastest response for quotes & availability.
            </p>
          </div>
          <div className="card text-center space-y-2">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Call Us
            </p>
            <p className="text-lg font-semibold text-primary">
              +92 340 0799777
            </p>
            <p className="text-sm text-gray-500">
              Speak directly with our Umrah advisors.
            </p>
          </div>
          <div className="card text-center space-y-2">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Email
            </p>
            <p className="text-lg font-semibold text-primary">
              info@barakahtravels.online
            </p>
            <p className="text-sm text-gray-500">
              Get detailed itineraries and documentation.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="card">
            <h2 className="text-2xl font-bold text-primary mb-2">
              Quick Inquiry
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Submit your request and we will contact you with the best options.
            </p>
            <form className="form" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  className="input"
                  name="name"
                  placeholder="Full Name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                />
                <input
                  className="input"
                  name="phone"
                  placeholder="Phone / WhatsApp"
                  value={formState.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <select
                className="input"
                name="service"
                value={formState.service}
                onChange={handleChange}
              >
                <option>Umrah</option>
                <option>Dubai</option>
                <option>Turkey</option>
                <option>Baku</option>
              </select>
              <textarea
                className="input min-h-[120px]"
                name="notes"
                placeholder="Tell us about your travel plans"
                value={formState.notes}
                onChange={handleChange}
              />
              <div className="flex flex-wrap items-center gap-3">
                <button className="btn" type="submit" disabled={formStatus.loading}>
                  {formStatus.loading ? "Sending..." : "Send Inquiry"}
                </button>
                {formStatus.success && (
                  <span className="text-sm text-green-600">
                    Thank you! We will be in touch shortly.
                  </span>
                )}
                {formStatus.error && (
                  <span className="text-sm text-red-600">{formStatus.error}</span>
                )}
              </div>
            </form>
          </div>

          <div className="card space-y-4">
            <h3 className="text-xl font-semibold text-primary">
              What happens next?
            </h3>
            <ul className="text-sm text-gray-600 space-y-3">
              <li>• We confirm your travel dates and departure city.</li>
              <li>• Our team shares hotel and flight options within hours.</li>
              <li>• You receive a transparent Umrah quotation on WhatsApp.</li>
            </ul>
            <p className="text-sm text-gray-500">
              Prefer a detailed package? Use the full inquiry form on the Home
              page for customized itineraries.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
