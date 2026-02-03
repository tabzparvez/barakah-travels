"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type Quotation = {
  id: string;
  client: { name: string; phone: string; persons: string };
  flightGoing: any;
  flightReturn: any;
  makkahHotel: any;
  madinahHotel: any;
  transport: any;
  packageDetails: any;
  createdAt: string;
};

export default function QuotationDetailPage() {
  const params = useParams();
  const [quote, setQuote] = useState<Quotation | null>(null);

  useEffect(() => {
    fetch("/api/quotations")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item: Quotation) => item.id === params.id);
        setQuote(found);
      });
  }, [params.id]);

  const handlePrint = () => {
    window.print();
  };

  const handleConvert = async () => {
    if (!quote) return;
    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client: quote.client,
        quotationId: quote.id,
        packageDetails: quote.packageDetails,
        status: "Unpaid",
      }),
    });
    const data = await res.json();
    window.location.href = `/admin/invoices/${data.id}`;
  };

  if (!quote) {
    return <p className="text-slate-500">Loading quotation...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Quotation Preview</h2>
          <p className="text-slate-500">Generate and print a professional quotation.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-outline" onClick={handlePrint}>
            Print Quotation
          </button>
          <button className="btn" onClick={handleConvert}>
            Convert to Invoice
          </button>
        </div>
      </div>

      <div id="quotation-print" className="admin-card">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-yellow-500">
              Barakah Travels
            </p>
            <h3 className="text-2xl font-semibold">Umrah Quotation</h3>
          </div>
          <div className="text-sm text-slate-500">
            {new Date(quote.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Client</h4>
            <p>Name: {quote.client?.name}</p>
            <p>Phone: {quote.client?.phone}</p>
            <p>Persons: {quote.client?.persons}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Package Pricing</h4>
            <p>Price: {quote.packageDetails?.price || "TBD"}</p>
            <p>Notes: {quote.packageDetails?.notes || "-"}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Flight (Going)</h4>
            <p>
              {quote.flightGoing?.departure} → {quote.flightGoing?.arrival}
            </p>
            <p>
              {quote.flightGoing?.airline} · {quote.flightGoing?.flightNumber}
            </p>
            <p>
              {quote.flightGoing?.date} · {quote.flightGoing?.routeType}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Flight (Return)</h4>
            <p>
              {quote.flightReturn?.departure} → {quote.flightReturn?.arrival}
            </p>
            <p>
              {quote.flightReturn?.airline} · {quote.flightReturn?.flightNumber}
            </p>
            <p>
              {quote.flightReturn?.date} · {quote.flightReturn?.routeType}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Makkah Hotel</h4>
            <p>{quote.makkahHotel?.name}</p>
            <p>{quote.makkahHotel?.distance}</p>
            <p>{quote.makkahHotel?.roomType} · {quote.makkahHotel?.nights} nights</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Madinah Hotel</h4>
            <p>{quote.madinahHotel?.name}</p>
            <p>{quote.madinahHotel?.distance}</p>
            <p>{quote.madinahHotel?.roomType} · {quote.madinahHotel?.nights} nights</p>
          </div>
        </div>

        <div className="mt-6 text-sm">
          <h4 className="font-semibold mb-2">Transport</h4>
          <p>Type: {quote.transport?.type}</p>
          <p>Airport to Makkah: {quote.transport?.airportToMakkah}</p>
          <p>Makkah to Madinah: {quote.transport?.makkahToMadinah}</p>
          <p>Madinah to Airport: {quote.transport?.madinahToAirport}</p>
        </div>

        <div className="mt-6 text-sm">
          <h4 className="font-semibold mb-2">Inclusions</h4>
          <ul className="list-disc list-inside">
            {(quote.packageDetails?.inclusions || []).map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 text-sm">
          <h4 className="font-semibold mb-2">Exclusions</h4>
          <ul className="list-disc list-inside">
            {(quote.packageDetails?.exclusions || []).map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <Link href="/admin/quotations" className="btn-outline">
        Back to Quotations
      </Link>
    </div>
  );
}
