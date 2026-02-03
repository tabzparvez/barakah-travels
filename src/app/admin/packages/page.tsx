'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Package = {
  _id: string;
  name: string;
  days: number;
  type: string;
  description?: string;
  price?: number;
  features?: string[];
  image?: string;
  createdAt?: string;
};
import { useRouter } from 'next/navigation';

export default function AdminPackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [form, setForm] = useState({ name: '', days: '', type: '', description: '', price: '', features: '', image: '' });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', days: '', type: '', description: '', price: '', features: '', image: '' });
  const router = useRouter();


  useEffect(() => {
    fetch('/api/packages')
      .then(async res => {
        if (!res.ok) throw new Error('Failed to fetch packages');
        try {
          return await res.json();
        } catch {
          throw new Error('Invalid JSON response');
        }
      })
      .then(setPackages)

      .catch((err: unknown) => {
        if (err instanceof Error) setError(err.message);
        else setError('Unknown error');
      });
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          days: Number(form.days),
          price: Number(form.price),
          features: form.features.split(',').map(f => f.trim()),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to add package');
      }
      setForm({ name: '', days: '', type: '', description: '', price: '', features: '', image: '' });
      router.refresh();
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="section max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-primary mb-4">Umrah Packages</h1>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      <form className="form mb-8" onSubmit={handleSubmit}>
        <input className="input mb-2" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
        <input className="input mb-2" placeholder="Days" type="number" value={form.days} onChange={e => setForm(f => ({ ...f, days: e.target.value }))} required />
        <input className="input mb-2" placeholder="Type (Economy, Standard, Comfort)" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} required />
        <input className="input mb-2" placeholder="Price" type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
        <input className="input mb-2" placeholder="Image URL" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} />
        <textarea className="input mb-2" placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
        <input className="input mb-2" placeholder="Features (comma separated)" value={form.features} onChange={e => setForm(f => ({ ...f, features: e.target.value }))} />
        <button className="btn" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Add Package'}</button>
      </form>
      <h2 className="text-xl font-bold mb-2">All Packages</h2>

      <ul>
        {packages.map(pkg => (
          <li key={pkg._id} className="card mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {editingId === pkg._id ? (
              <form className="flex-1" onSubmit={e => handleEditSubmit(e, pkg._id)}>
                <div className="font-bold mb-2">Editing: {pkg.name}</div>
                <input className="input mb-2" placeholder="Name" value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} required />
                <input className="input mb-2" placeholder="Days" type="number" value={editForm.days} onChange={e => setEditForm(f => ({ ...f, days: e.target.value }))} required />
                <input className="input mb-2" placeholder="Type" value={editForm.type} onChange={e => setEditForm(f => ({ ...f, type: e.target.value }))} required />
                <input className="input mb-2" placeholder="Price" type="number" value={editForm.price} onChange={e => setEditForm(f => ({ ...f, price: e.target.value }))} />
                <input className="input mb-2" placeholder="Image URL" value={editForm.image} onChange={e => setEditForm(f => ({ ...f, image: e.target.value }))} />
                <textarea className="input mb-2" placeholder="Description" value={editForm.description} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} />
                <input className="input mb-2" placeholder="Features (comma separated)" value={editForm.features} onChange={e => setEditForm(f => ({ ...f, features: e.target.value }))} />
                <div className="flex gap-2 mt-2">
                  <button className="btn bg-green-600 hover:bg-green-700 text-white" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
                  <button className="btn bg-gray-400 hover:bg-gray-500 text-white" type="button" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <div>
                  <div className="font-bold">{pkg.name} ({pkg.days} days, {pkg.type})</div>
                  <div>{pkg.description}</div>
                  <div>Price: {pkg.price}</div>
                  <div>Features: {pkg.features?.join(', ')}</div>
                  {pkg.image && <Image src={pkg.image} alt={pkg.name} width={128} height={80} className="w-32 h-20 object-cover mt-2" />}
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button className="btn bg-yellow-500 hover:bg-yellow-600 text-white" onClick={() => handleEdit(pkg)}>Edit</button>
                  <button className="btn bg-red-500 hover:bg-red-600 text-white" onClick={() => handleDelete(pkg._id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  );

  // Handle delete
  async function handleDelete(id: string) {
    if (!window.confirm('Are you sure you want to delete this package?')) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/packages?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete package');
      setPackages(pkgs => pkgs.filter(p => p._id !== id));
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Unknown error');
    } finally {
      setLoading(false);
    }
  }

  // Start editing a package
  function handleEdit(pkg: Package) {
    setEditingId(pkg._id);
    setEditForm({
      name: pkg.name || '',
      days: pkg.days?.toString() || '',
      type: pkg.type || '',
      description: pkg.description || '',
      price: pkg.price?.toString() || '',
      features: pkg.features?.join(', ') || '',
      image: pkg.image || '',
    });
  }

  // Submit edit
  async function handleEditSubmit(e: React.FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/packages?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editForm,
          days: Number(editForm.days),
          price: Number(editForm.price),
          features: editForm.features.split(',').map(f => f.trim()),
        }),
      });
      if (!res.ok) throw new Error('Failed to update package');
      // Update local state
      setPackages(pkgs => pkgs.map(p => p._id === id ? { ...p, ...editForm, days: Number(editForm.days), price: Number(editForm.price), features: editForm.features.split(',').map(f => f.trim()) } : p));
      setEditingId(null);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Unknown error');
    } finally {
      setLoading(false);
    }
  }
}
