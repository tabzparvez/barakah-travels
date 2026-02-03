'use client';

import { useEffect, useState } from 'react';

type Inquiry = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  from: string;
  to: string;
  notes: string;
  createdAt: string;
};

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    fetch('/api/inquiries').then(res => res.json()).then(setInquiries);
  }, []);

  return (
    <main className="section max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Inquiries</h1>
        <p className="text-sm text-gray-500">
          Review form submissions and convert them to quotations.
        </p>
      </div>
      <ul className="space-y-4">
        {inquiries.map(inq => (
          <li key={inq._id} className="card">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-semibold text-lg text-secondary">
                  {inq.name} ({inq.phone})
                </div>
                <div className="text-sm text-gray-600">Email: {inq.email}</div>
                <div className="text-sm text-gray-600">Service: {inq.service}</div>
                <div className="text-sm text-gray-600">
                  From: {inq.from} To: {inq.to}
                </div>
                <div className="text-sm text-gray-600">Notes: {inq.notes}</div>
                <div className="text-xs text-gray-400 mt-2">
                  {new Date(inq.createdAt).toLocaleString()}
                </div>
              </div>
              <a
                href={`/admin/quotations/new?name=${encodeURIComponent(
                  inq.name
                )}&phone=${encodeURIComponent(inq.phone)}&email=${encodeURIComponent(
                  inq.email
                )}`}
                className="btn"
              >
                Convert to Quotation
              </a>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
