'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type GalleryItem = {
  _id: string;
  title: string;
  url: string;
  type: 'image' | 'video';
  createdAt: string;
};

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [form, setForm] = useState({ title: '', url: '', type: 'image' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/gallery').then(res => res.json()).then(setItems);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setLoading(false);
    setForm({ title: '', url: '', type: 'image' });
    fetch('/api/gallery').then(res => res.json()).then(setItems);
  }

  return (
    <main className="section max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Gallery</h1>
      <form className="form mb-8" onSubmit={handleSubmit}>
        <input className="input mb-2" placeholder="Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
        <input className="input mb-2" placeholder="Image/Video URL" value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} required />
        <select className="input mb-2" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
        <button className="btn" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Add to Gallery'}</button>
      </form>
      <h2 className="text-xl font-bold mb-2">All Gallery Items</h2>
      <ul>
        {items.map(item => (
          <li key={item._id} className="card mb-2">
            <div className="font-bold">{item.title}</div>
            {item.type === 'image' ? (
              <Image src={item.url} alt={item.title} width={128} height={80} className="w-32 h-20 object-cover mt-2" />
            ) : (
              <video src={item.url} controls className="w-32 h-20 mt-2" />
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
