'use client';

import { useEffect, useState } from 'react';

type Testimonial = {
  _id: string;
  name: string;
  message: string;
  city?: string;
  createdAt?: string;
};

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [form, setForm] = useState({ name: '', message: '', city: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/testimonials').then(res => res.json()).then(setTestimonials);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setLoading(false);
    setForm({ name: '', message: '', city: '' });
    fetch('/api/testimonials').then(res => res.json()).then(setTestimonials);
  }

  return (
    <main className="section max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Testimonials</h1>
      <form className="form mb-8" onSubmit={handleSubmit}>
        <input className="input mb-2" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
        <input className="input mb-2" placeholder="City" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
        <textarea className="input mb-2" placeholder="Message" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
        <button className="btn" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Add Testimonial'}</button>
      </form>
      <h2 className="text-xl font-bold mb-2">All Testimonials</h2>
      <ul>
        {testimonials.map(t => (
          <li key={t._id} className="card mb-2">
            <div className="font-bold">{t.name} ({t.city})</div>
            <div>{t.message}</div>
            <div className="text-xs text-gray-500">{t.createdAt ? new Date(t.createdAt).toLocaleString() : ''}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
