"use client";

import { useEffect, useState } from "react";
import { getAdminAuthHeaders } from "@/lib/admin-session";

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  city: "",
  persons: "",
  destination: "",
  travelMonth: "",
  message: "",
  type: "Umrah",
};

type Inquiry = {
  id: string;
  type: "Umrah" | "Tour";
  name: string;
  phone: string;
  email: string;
  city: string;
  persons: string;
  destination: string;
  travelMonth: string;
  message: string;
  createdAt: string;
};

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetch("/api/admin/inquiries", { headers: getAdminAuthHeaders() })
      .then((res) => res.json())
      .then(setInquiries);
  }, []);

  async function handleConvert(inquiry: Inquiry) {
    const payload = {
      inquiryId: inquiry.id,
      client: {
        name: inquiry.name,
        phone: inquiry.phone,
        persons: inquiry.persons,
      },
      flightGoing: {
        date: "",
        departure: "",
        arrival: "",
        airline: "",
        flightNumber: "",
        type: "",
      },
      flightReturn: {
        date: "",
        departure: "",
        arrival: "",
        airline: "",
        flightNumber: "",
        type: "",
      },
      makkahHotel: {
        name: "",
        distance: "",
        roomType: "",
        nights: "",
      },
      madinahHotel: {
        name: "",
        distance: "",
        roomType: "",
        nights: "",
      },
      transport: {
        mode: "",
        airportToMakkah: "",
        makkahToMadinah: "",
        madinahToAirport: "",
      },
      package: {
        price: "",
        inclusions: "",
        exclusions: "",
        notes: "",
      },
    };

    await fetch("/api/admin/quotations", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAdminAuthHeaders() },
      body: JSON.stringify(payload),
    });
  }

  async function handleInternalAdd(event: React.FormEvent) {
    event.preventDefault();
    const route = form.type === "Umrah" ? "/api/forms/umrah" : "/api/forms/tour";
    const response = await fetch(route, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setInquiries((prev) => [data.inquiry, ...prev]);
    setForm(emptyForm);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Inquiries & Leads</h1>
        <p className="text-white/70 mt-2">
          All website form submissions are stored here for quick conversion into
          quotations.
        </p>
      </div>

      <form
        onSubmit={handleInternalAdd}
        className="rounded-3xl border border-white/10 bg-white/5 p-6 grid gap-4 md:grid-cols-2"
      >
        <div>
          <label className="text-sm text-white/70">Inquiry Type</label>
          <select
            value={form.type}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, type: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
          >
            <option>Umrah</option>
            <option>Tour</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-white/70">Name</label>
          <input
            value={form.name}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, name: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
            required
          />
        </div>
        <div>
          <label className="text-sm text-white/70">Phone</label>
          <input
            value={form.phone}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, phone: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
            required
          />
        </div>
        <div>
          <label className="text-sm text-white/70">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, email: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
          />
        </div>
        <div>
          <label className="text-sm text-white/70">City</label>
          <input
            value={form.city}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, city: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
          />
        </div>
        <div>
          <label className="text-sm text-white/70">Persons</label>
          <input
            value={form.persons}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, persons: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
          />
        </div>
        <div>
          <label className="text-sm text-white/70">Destination</label>
          <input
            value={form.destination}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, destination: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
          />
        </div>
        <div>
          <label className="text-sm text-white/70">Travel Month</label>
          <input
            value={form.travelMonth}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, travelMonth: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm text-white/70">Message</label>
          <textarea
            value={form.message}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, message: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
            rows={3}
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="rounded-xl bg-yellow-400 text-black px-6 py-2 font-semibold"
          >
            Add inquiry
          </button>
        </div>
      </form>

      <div className="grid gap-4">
        {inquiries.map((inquiry) => (
          <div
            key={inquiry.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-yellow-400/40 px-3 py-1 text-xs text-yellow-300">
                  {inquiry.type}
                </span>
                <span className="text-sm text-white/60">
                  {new Date(inquiry.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="font-semibold mt-2">{inquiry.name}</p>
              <p className="text-sm text-white/70">
                {inquiry.phone} • {inquiry.email}
              </p>
              <p className="text-sm text-white/70">
                {inquiry.destination} • {inquiry.travelMonth}
              </p>
              <p className="text-sm text-white/60 mt-2">{inquiry.message}</p>
            </div>
            <button
              onClick={() => handleConvert(inquiry)}
              className="rounded-xl border border-yellow-400/50 px-4 py-2 text-sm text-yellow-300 hover:bg-yellow-400/10"
            >
              Convert to quotation
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
