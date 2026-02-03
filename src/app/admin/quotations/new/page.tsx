"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const initialForm = {
  client: { name: "", phone: "", persons: "" },
  flightGoing: {
    date: "",
    departure: "",
    arrival: "",
    airline: "",
    flightNumber: "",
    routeType: "Direct",
  },
  flightReturn: {
    date: "",
    departure: "",
    arrival: "",
    airline: "",
    flightNumber: "",
    routeType: "Direct",
  },
  makkahHotel: { name: "", distance: "", roomType: "", nights: "" },
  madinahHotel: { name: "", distance: "", roomType: "", nights: "" },
  transport: {
    type: "Private",
    airportToMakkah: "",
    makkahToMadinah: "",
    madinahToAirport: "",
  },
  packageDetails: {
    price: "",
    inclusions: "",
    exclusions: "",
    notes: "",
  },
};

type FormState = typeof initialForm;
type SectionKey = keyof FormState;

export default function NewQuotationPage() {
  const [form, setForm] = useState(initialForm);
  const router = useRouter();

  const handleChange = <K extends SectionKey>(
    section: K,
    field: keyof FormState[K],
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      ...form,
      packageDetails: {
        ...form.packageDetails,
        inclusions: form.packageDetails.inclusions
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        exclusions: form.packageDetails.exclusions
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      },
    };
    const res = await fetch("/api/quotations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    router.push(`/admin/quotations/${data.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="admin-card">
        <h2 className="text-2xl font-semibold mb-2">Create Umrah Quotation</h2>
        <p className="text-slate-500">
          Fill in flight, hotel, transport, and package details for a professional quotation.
        </p>
      </div>

      <div className="admin-card grid gap-4">
        <h3 className="text-lg font-semibold">Client</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <input
            className="admin-input"
            placeholder="Client Name"
            value={form.client.name}
            onChange={(e) => handleChange("client", "name", e.target.value)}
            required
          />
          <input
            className="admin-input"
            placeholder="Phone"
            value={form.client.phone}
            onChange={(e) => handleChange("client", "phone", e.target.value)}
            required
          />
          <input
            className="admin-input"
            placeholder="Persons"
            value={form.client.persons}
            onChange={(e) => handleChange("client", "persons", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="admin-card grid gap-4">
        <h3 className="text-lg font-semibold">Flight (Going)</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <input
            className="admin-input"
            placeholder="Date"
            value={form.flightGoing.date}
            onChange={(e) => handleChange("flightGoing", "date", e.target.value)}
          />
          <input
            className="admin-input"
            placeholder="Departure Airport (Pakistan)"
            value={form.flightGoing.departure}
            onChange={(e) => handleChange("flightGoing", "departure", e.target.value)}
          />
          <input
            className="admin-input"
            placeholder="Arrival Airport (Saudi)"
            value={form.flightGoing.arrival}
            onChange={(e) => handleChange("flightGoing", "arrival", e.target.value)}
          />
          <input
            className="admin-input"
            placeholder="Airline"
            value={form.flightGoing.airline}
            onChange={(e) => handleChange("flightGoing", "airline", e.target.value)}
          />
          <input
            className="admin-input"
            placeholder="Flight Number"
            value={form.flightGoing.flightNumber}
            onChange={(e) => handleChange("flightGoing", "flightNumber", e.target.value)}
          />
          <select
            className="admin-input"
            value={form.flightGoing.routeType}
            onChange={(e) => handleChange("flightGoing", "routeType", e.target.value)}
          >
            <option value="Direct">Direct</option>
            <option value="Connecting">Connecting</option>
          </select>
        </div>
      </div>

      <div className="admin-card grid gap-4">
        <h3 className="text-lg font-semibold">Flight (Return)</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <input
            className="admin-input"
            placeholder="Date"
            value={form.flightReturn.date}
            onChange={(e) => handleChange("flightReturn", "date", e.target.value)}
          />
          <input
            className="admin-input"
            placeholder="Departure Airport (Saudi)"
            value={form.flightReturn.departure}
            onChange={(e) => handleChange("flightReturn", "departure", e.target.value)}
          />
          <input
            className="admin-input"
            placeholder="Arrival Airport (Pakistan)"
            value={form.flightReturn.arrival}
            onChange={(e) => handleChange("flightReturn", "arrival", e.target.value)}
          />
          <input
            className="admin-input"
            placeholder="Airline"
            value={form.flightReturn.airline}
            onChange={(e) => handleChange("flightReturn", "airline", e.target.value)}
          />
          <input
            className="admin-input"
            placeholder="Flight Number"
            value={form.flightReturn.flightNumber}
            onChange={(e) => handleChange("flightReturn", "flightNumber", e.target.value)}
          />
          <select
            className="admin-input"
            value={form.flightReturn.routeType}
            onChange={(e) => handleChange("flightReturn", "routeType", e.target.value)}
          >
            <option value="Direct">Direct</option>
            <option value="Connecting">Connecting</option>
          </select>
        </div>
      </div>

      <div className="admin-card grid gap-4">
        <h3 className="text-lg font-semibold">Makkah Hotel</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <input
            className="admin-input"
            placeholder="Hotel Name"
            value={form.makkahHotel.name}
            onChange={(e) => handleChange("makkahHotel", "name", e.target.value)}
          />
          <input
            className="admin-input"
            placeholder="Distance from Haram"
            value={form.makkahHotel.distance}
            onChange={(e) => handleChange("makkahHotel", "distance", e.target.value)}
          />
          <input
            className="admin-input"
            placeholder="Room Type"
            value={form.makkahHotel.roomType}
            onChange={(e) => handleChange("makkahHotel", "roomType", e.target.value)}
          />
          <input
            className="admin-input"
            placeholder="Nights"
            value={form.makkahHotel.nights}
            onChange={(e) => handleChange("makkahHotel", "nights", e.target.value)}
          />
        </div>
      </div>

      <div className="admin-card grid gap-4">
        <h3 className="text-lg font-semibold">Madinah Hotel</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <input
            className="admin-input"
            placeholder="Hotel Name"
            value={form.madinahHotel.name}
            onChange={(e) => handleChange("madinahHotel", "name", e.target.value)}
          />
          <input
            className="admin-input"
            placeholder="Distance from Masjid Nabawi"
            value={form.madinahHotel.distance}
            onChange={(e) => handleChange("madinahHotel", "distance", e.target.value)}
          />
          <input
            className="admin-input"
            placeholder="Room Type"
            value={form.madinahHotel.roomType}
            onChange={(e) => handleChange("madinahHotel", "roomType", e.target.value)}
          />
          <input
            className="admin-input"
            placeholder="Nights"
            value={form.madinahHotel.nights}
            onChange={(e) => handleChange("madinahHotel", "nights", e.target.value)}
          />
        </div>
      </div>

      <div className="admin-card grid gap-4">
        <h3 className="text-lg font-semibold">Transport</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <select
            className="admin-input"
            value={form.transport.type}
            onChange={(e) => handleChange("transport", "type", e.target.value)}
          >
            <option value="Private">Private</option>
            <option value="Sharing">Sharing</option>
          </select>
          <input
            className="admin-input"
            placeholder="Airport to Makkah"
            value={form.transport.airportToMakkah}
            onChange={(e) => handleChange("transport", "airportToMakkah", e.target.value)}
          />
          <input
            className="admin-input"
            placeholder="Makkah to Madinah"
            value={form.transport.makkahToMadinah}
            onChange={(e) => handleChange("transport", "makkahToMadinah", e.target.value)}
          />
          <input
            className="admin-input"
            placeholder="Madinah to Airport"
            value={form.transport.madinahToAirport}
            onChange={(e) => handleChange("transport", "madinahToAirport", e.target.value)}
          />
        </div>
      </div>

      <div className="admin-card grid gap-4">
        <h3 className="text-lg font-semibold">Package & Pricing</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="admin-input"
            placeholder="Price"
            value={form.packageDetails.price}
            onChange={(e) => handleChange("packageDetails", "price", e.target.value)}
          />
          <input
            className="admin-input"
            placeholder="Notes"
            value={form.packageDetails.notes}
            onChange={(e) => handleChange("packageDetails", "notes", e.target.value)}
          />
        </div>
        <textarea
          className="admin-input"
          rows={3}
          placeholder="Inclusions (comma separated)"
          value={form.packageDetails.inclusions}
          onChange={(e) => handleChange("packageDetails", "inclusions", e.target.value)}
        />
        <textarea
          className="admin-input"
          rows={3}
          placeholder="Exclusions (comma separated)"
          value={form.packageDetails.exclusions}
          onChange={(e) => handleChange("packageDetails", "exclusions", e.target.value)}
        />
      </div>

      <button type="submit" className="btn w-full md:w-auto">
        Generate Quotation
      </button>
    </form>
  );
}
