"use client";

import { useEffect, useState } from "react";

type Inquiry = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city?: string;
  travelDate?: string;
  persons?: string;
  destination?: string;
  message?: string;
  type: string;
  createdAt: string;
  status: string;
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const loadInquiries = async () => {
    const res = await fetch("/api/inquiries");
    const data = await res.json();
    setInquiries(data);
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const convertToQuotation = async (inq: Inquiry) => {
    setLoadingId(inq.id);
    await fetch("/api/quotations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client: {
          name: inq.name,
          phone: inq.phone,
          email: inq.email,
          persons: inq.persons,
        },
        inquiryId: inq.id,
        notes: inq.message,
        destination: inq.destination,
        type: inq.type,
      }),
    });
    setLoadingId(null);
  };

  return (
    <div className="space-y-8">
      <div className="admin-card">
        <h2 className="text-2xl font-semibold mb-2">Customer Inquiries</h2>
        <p className="text-slate-500">
          All Umrah and tour inquiries received from the website forms.
        </p>
      </div>

      <div className="admin-card">
        <div className="grid gap-4">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="border border-slate-200 rounded-2xl p-4"
            >
              <div className="flex flex-col md:flex-row md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {inq.name} · {inq.phone}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {inq.type} Inquiry · {inq.city || "Pakistan"}
                  </p>
                  <p className="text-sm text-slate-500">
                    {inq.destination || "Custom itinerary"} · {inq.persons || "2"} persons
                  </p>
                </div>
                <div className="text-sm text-slate-400">
                  {new Date(inq.createdAt).toLocaleString()}
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-3">
                {inq.message || "No additional notes provided."}
              </p>
              <button
                className="btn mt-4"
                onClick={() => convertToQuotation(inq)}
                disabled={loadingId === inq.id}
              >
                {loadingId === inq.id
                  ? "Converting..."
                  : "Convert Inquiry to Quotation"}
              </button>
            </div>
          ))}
          {inquiries.length === 0 && (
            <p className="text-sm text-slate-500">
              No inquiries have been submitted yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
