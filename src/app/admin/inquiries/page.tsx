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
    <main className="section max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Inquiries</h1>
      <ul>
        {inquiries.map(inq => (
          <li key={inq._id} className="card mb-2">
            <div className="font-bold">{inq.name} ({inq.phone})</div>
            <div>Email: {inq.email}</div>
            <div>Service: {inq.service}</div>
            <div>From: {inq.from} To: {inq.to}</div>
            <div>Notes: {inq.notes}</div>
            <div className="text-xs text-gray-500">{new Date(inq.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
