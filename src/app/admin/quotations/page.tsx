"use client";

import { useEffect, useState } from "react";

const initialQuotation = {
  client: { name: "", phone: "", persons: "" },
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
  makkahHotel: { name: "", distance: "", roomType: "", nights: "" },
  madinahHotel: { name: "", distance: "", roomType: "", nights: "" },
  transport: {
    mode: "",
    airportToMakkah: "",
    makkahToMadinah: "",
    madinahToAirport: "",
  },
  package: { price: "", inclusions: "", exclusions: "", notes: "" },
};

type Quotation = typeof initialQuotation & {
  id: string;
  createdAt: string;
};

export default function AdminQuotations() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [form, setForm] = useState(initialQuotation);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/admin/quotations")
      .then((res) => res.json())
      .then(setQuotations);
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/admin/quotations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setQuotations((prev) => [data.quotation, ...prev]);
    setForm(initialQuotation);
  }

  async function convertToInvoice(quote: Quotation) {
    setStatus("Generating invoice...");
    await fetch("/api/admin/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quotationId: quote.id,
        client: {
          name: quote.client.name,
          phone: quote.client.phone,
        },
        packageTitle: "Umrah Quotation Package",
        amount: quote.package.price,
        status: "Unpaid",
      }),
    });
    setStatus("Invoice created from quotation.");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Umrah Quotations</h1>
        <p className="text-white/70 mt-2">
          Build professional quotations with detailed flights, hotels, transport,
          and package notes. Generate printable layouts for clients.
        </p>
        {status && <p className="text-sm text-yellow-300 mt-2">{status}</p>}
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-white/5 p-6 grid gap-6"
      >
        <section className="grid gap-4 md:grid-cols-3">
          <h2 className="md:col-span-3 text-lg font-semibold">Client</h2>
          {(["name", "phone", "persons"] as const).map((field) => (
            <input
              key={field}
              placeholder={field}
              value={form.client[field]}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  client: { ...prev.client, [field]: event.target.value },
                }))
              }
              className="rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
            />
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <h2 className="md:col-span-2 text-lg font-semibold">
            Flight (Going)
          </h2>
          {(["date", "departure", "arrival", "airline", "flightNumber", "type"] as const).map(
            (field) => (
              <input
                key={field}
                placeholder={field}
                value={form.flightGoing[field]}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    flightGoing: {
                      ...prev.flightGoing,
                      [field]: event.target.value,
                    },
                  }))
                }
                className="rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
              />
            )
          )}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <h2 className="md:col-span-2 text-lg font-semibold">
            Flight (Return)
          </h2>
          {(["date", "departure", "arrival", "airline", "flightNumber", "type"] as const).map(
            (field) => (
              <input
                key={field}
                placeholder={field}
                value={form.flightReturn[field]}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    flightReturn: {
                      ...prev.flightReturn,
                      [field]: event.target.value,
                    },
                  }))
                }
                className="rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
              />
            )
          )}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <h2 className="md:col-span-2 text-lg font-semibold">Makkah Hotel</h2>
          {(["name", "distance", "roomType", "nights"] as const).map((field) => (
            <input
              key={field}
              placeholder={field}
              value={form.makkahHotel[field]}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  makkahHotel: {
                    ...prev.makkahHotel,
                    [field]: event.target.value,
                  },
                }))
              }
              className="rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
            />
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <h2 className="md:col-span-2 text-lg font-semibold">Madinah Hotel</h2>
          {(["name", "distance", "roomType", "nights"] as const).map((field) => (
            <input
              key={field}
              placeholder={field}
              value={form.madinahHotel[field]}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  madinahHotel: {
                    ...prev.madinahHotel,
                    [field]: event.target.value,
                  },
                }))
              }
              className="rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
            />
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <h2 className="md:col-span-2 text-lg font-semibold">Transport</h2>
          {(["mode", "airportToMakkah", "makkahToMadinah", "madinahToAirport"] as const).map(
            (field) => (
              <input
                key={field}
                placeholder={field}
                value={form.transport[field]}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    transport: {
                      ...prev.transport,
                      [field]: event.target.value,
                    },
                  }))
                }
                className="rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
              />
            )
          )}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <h2 className="md:col-span-2 text-lg font-semibold">Package</h2>
          {(["price", "inclusions", "exclusions", "notes"] as const).map((field) => (
            <input
              key={field}
              placeholder={field}
              value={form.package[field]}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  package: { ...prev.package, [field]: event.target.value },
                }))
              }
              className="rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
            />
          ))}
        </section>

        <button
          type="submit"
          className="rounded-xl bg-yellow-400 text-black px-6 py-3 font-semibold"
        >
          Generate quotation
        </button>
      </form>

      <div className="grid gap-4">
        {quotations.map((quote) => (
          <div
            key={quote.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold">{quote.client.name}</p>
                <p className="text-sm text-white/70">{quote.client.phone}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => convertToInvoice(quote)}
                  className="rounded-xl border border-yellow-400/50 px-4 py-2 text-sm text-yellow-300"
                >
                  Convert to invoice
                </button>
                <button
                  onClick={() => window.print()}
                  className="rounded-xl border border-white/20 px-4 py-2 text-sm text-white"
                >
                  Printable quotation
                </button>
              </div>
            </div>
            <p className="text-sm text-white/60 mt-2">
              Created {new Date(quote.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
