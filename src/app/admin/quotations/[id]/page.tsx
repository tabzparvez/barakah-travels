"use client";

import { useRouter } from "next/navigation";

type QuotationData = {
  id: string;
  clientName: string;
  phone: string;
  email: string;
  persons: number;
  service?: string;
  travelFrom?: string;
  travelTo?: string;
  inquiryNotes?: string;
  status?: string;
  goingFlight: {
    date: string;
    departure: string;
    arrival: string;
    airline: string;
    flightNumber: string;
    routeType: string;
  };
  returnFlight: {
    date: string;
    departure: string;
    arrival: string;
    airline: string;
    flightNumber: string;
    routeType: string;
  };
  makkahHotel: {
    name: string;
    distance: string;
    roomType: string;
    nights: string;
  };
  madinahHotel: {
    name: string;
    distance: string;
    roomType: string;
    nights: string;
  };
  transport: {
    type: string;
    airportToMakkah: string;
    makkahToMadinah: string;
    madinahToAirport: string;
  };
  price: number;
  inclusions: string;
  exclusions: string;
  notes: string;
  createdAt: string;
};

const statusStyles: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-600",
  Sent: "bg-blue-100 text-blue-700",
  Accepted: "bg-green-100 text-green-700",
};

export default function QuotationViewPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(`quotation-${params.id}`);
  if (!raw) {
    return <p className="text-center mt-10">Quotation not found.</p>;
  }

  const data = JSON.parse(raw) as QuotationData;
  const status = data.status || "Draft";

  const handleConvertToInvoice = () => {
    const invoiceId = `INV-${Date.now()}`;
    const invoiceData = {
      invoiceId,
      customerName: data.clientName,
      phone: data.phone,
      email: data.email,
      description: `Umrah package quotation ${data.id}`,
      qty: data.persons || 1,
      unitPrice: data.price,
      total: data.price,
      paid: 0,
      balance: data.price,
      paymentMethod: "Pending",
      date: new Date().toISOString(),
      quotationId: data.id,
    };

    localStorage.setItem(`invoice-${invoiceId}`, JSON.stringify(invoiceData));
    router.push(`/admin/invoices/${invoiceId}`);
  };

  return (
    <main className="section max-w-5xl mx-auto">
      <div id="quotation-print" className="card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-primary/10 pb-4 mb-6">
          <div className="flex items-center gap-4">
            <img
              src="/newlogo.png"
              alt="Barakah Travels"
              className="h-14 w-auto object-contain"
            />
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Barakah Travels
              </p>
              <p className="text-sm text-gray-600">Umrah • Visa • Travel</p>
              <p className="text-xs text-gray-500">
                +92 318 3548299 • info@barakahtravels.online
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-primary">Quotation</p>
            <p className="text-xs text-gray-500">
              Created {new Date(data.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-primary">
                Quotation #{data.id}
              </h1>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  statusStyles[status] || "bg-gray-100 text-gray-600"
                }`}
              >
                {status}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Prepared for {data.clientName}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Price</p>
            <p className="text-2xl font-semibold text-primary">
              PKR {Number(data.price).toLocaleString()}
            </p>
          </div>
        </div>

        <section className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-xs text-gray-500">Client Name</p>
              <p className="font-semibold">{data.clientName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="font-semibold">{data.phone}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Persons</p>
              <p className="font-semibold">{data.persons}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-semibold">{data.email}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-primary/10 p-4">
            <h2 className="text-sm font-semibold text-primary mb-3">
              Trip Overview
            </h2>
            <p className="text-sm">Service: {data.service || "Umrah"}</p>
            <p className="text-sm">
              Route: {data.travelFrom || "—"} → {data.travelTo || "—"}
            </p>
            <p className="text-sm text-gray-600 whitespace-pre-line">
              Notes: {data.inquiryNotes || "—"}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-primary/10 p-4">
              <h2 className="text-sm font-semibold text-primary mb-3">
                Flights (Going)
              </h2>
              <p className="text-sm">Date: {data.goingFlight.date}</p>
              <p className="text-sm">
                Route: {data.goingFlight.departure} → {data.goingFlight.arrival}
              </p>
              <p className="text-sm">Airline: {data.goingFlight.airline}</p>
              <p className="text-sm">
                Flight #: {data.goingFlight.flightNumber}
              </p>
              <p className="text-sm">Type: {data.goingFlight.routeType}</p>
            </div>
            <div className="rounded-2xl border border-primary/10 p-4">
              <h2 className="text-sm font-semibold text-primary mb-3">
                Flights (Return)
              </h2>
              <p className="text-sm">Date: {data.returnFlight.date}</p>
              <p className="text-sm">
                Route: {data.returnFlight.departure} → {data.returnFlight.arrival}
              </p>
              <p className="text-sm">Airline: {data.returnFlight.airline}</p>
              <p className="text-sm">
                Flight #: {data.returnFlight.flightNumber}
              </p>
              <p className="text-sm">Type: {data.returnFlight.routeType}</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-primary/10 p-4">
              <h2 className="text-sm font-semibold text-primary mb-3">
                Makkah Hotel
              </h2>
              <p className="text-sm">Name: {data.makkahHotel.name}</p>
              <p className="text-sm">Distance: {data.makkahHotel.distance}</p>
              <p className="text-sm">Room Type: {data.makkahHotel.roomType}</p>
              <p className="text-sm">Nights: {data.makkahHotel.nights}</p>
            </div>
            <div className="rounded-2xl border border-primary/10 p-4">
              <h2 className="text-sm font-semibold text-primary mb-3">
                Madinah Hotel
              </h2>
              <p className="text-sm">Name: {data.madinahHotel.name}</p>
              <p className="text-sm">Distance: {data.madinahHotel.distance}</p>
              <p className="text-sm">Room Type: {data.madinahHotel.roomType}</p>
              <p className="text-sm">Nights: {data.madinahHotel.nights}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-primary/10 p-4">
            <h2 className="text-sm font-semibold text-primary mb-3">Transport</h2>
            <p className="text-sm">Type: {data.transport.type}</p>
            <p className="text-sm">
              Airport → Makkah: {data.transport.airportToMakkah}
            </p>
            <p className="text-sm">
              Makkah → Madinah: {data.transport.makkahToMadinah}
            </p>
            <p className="text-sm">
              Madinah → Airport: {data.transport.madinahToAirport}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-primary/10 p-4">
              <h2 className="text-sm font-semibold text-primary mb-3">
                Inclusions
              </h2>
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {data.inclusions || "—"}
              </p>
            </div>
            <div className="rounded-2xl border border-primary/10 p-4">
              <h2 className="text-sm font-semibold text-primary mb-3">
                Exclusions
              </h2>
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {data.exclusions || "—"}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-primary/10 p-4">
            <h2 className="text-sm font-semibold text-primary mb-3">Notes</h2>
            <p className="text-sm text-gray-600 whitespace-pre-line">
              {data.notes || "—"}
            </p>
          </div>
        </section>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={() => window.print()} className="btn">
          Printable Quotation
        </button>
        <button onClick={() => window.print()} className="btn-outline">
          Download PDF
        </button>
        <button
          onClick={() => router.push(`/admin/quotations/${params.id}/edit`)}
          className="btn-outline"
        >
          Edit Quotation
        </button>
        <button onClick={handleConvertToInvoice} className="btn">
          Convert to Invoice
        </button>
      </div>
    </main>
  );
}
