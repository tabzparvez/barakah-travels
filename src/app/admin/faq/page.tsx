'use client';

import { useEffect, useState } from 'react';

type Faq = {
  _id: string;
  question: string;
  answer: string;
  createdAt: string;
};

export default function AdminFaq() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [form, setForm] = useState({ question: '', answer: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/faq').then(res => res.json()).then(setFaqs);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/faq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setLoading(false);
    setForm({ question: '', answer: '' });
    fetch('/api/faq').then(res => res.json()).then(setFaqs);
  }

  return (
    <main className="section max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage FAQs</h1>
      <form className="form mb-8" onSubmit={handleSubmit}>
        <input className="input mb-2" placeholder="Question" value={form.question} onChange={e => setForm(f => ({ ...f, question: e.target.value }))} required />
        <textarea className="input mb-2" placeholder="Answer" value={form.answer} onChange={e => setForm(f => ({ ...f, answer: e.target.value }))} required />
        <button className="btn" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Add FAQ'}</button>
      </form>
      <h2 className="text-xl font-bold mb-2">All FAQs</h2>
      <ul>
        {faqs.map(faq => (
          <li key={faq._id} className="card mb-2">
            <div className="font-bold">Q: {faq.question}</div>
            <div>A: {faq.answer}</div>
            <div className="text-xs text-gray-500">{new Date(faq.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
