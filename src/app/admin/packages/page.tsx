'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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

const PACKAGE_TYPES = ['Umrah', 'Turkey', 'Baku'];

export default function AdminPackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [form, setForm] = useState({
    name: '',
    days: '',
    type: 'Umrah',
    description: '',
    price: '',
    features: '',
    image: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    days: '',
    type: 'Umrah',
    description: '',
    price: '',
    features: '',
    image: '',
  });
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

  const groupedPackages = useMemo(() => {
    return PACKAGE_TYPES.reduce((acc, type) => {
      acc[type] = packages.filter(pkg => pkg.type?.toLowerCase() === type.toLowerCase());
      return acc;
    }, {} as Record<string, Package[]>);
  }, [packages]);

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
          features: form.features.split(',').map(f => f.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to add package');
      }
      setForm({
        name: '',
        days: '',
        type: 'Umrah',
        description: '',
        price: '',
        features: '',
        image: '',
      });
      router.refresh();
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="section max-w-6xl mx-auto space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-primary mb-2">Packages</h1>
        <p className="text-sm text-gray-500">
          Manage Umrah, Turkey, and Baku packages with pricing, images, and text updates.
        </p>
      </div>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      <form className="form card" onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold text-primary mb-4">
          Add New Package
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <input
            className="input"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
          <input
            className="input"
            placeholder="Days"
            type="number"
            value={form.days}
            onChange={e => setForm(f => ({ ...f, days: e.target.value }))}
            required
          />
          <select
            className="input"
            value={form.type}
            onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
            required
          >
            {PACKAGE_TYPES.map(type => (
              <option key={type}>{type}</option>
            ))}
          </select>
          <input
            className="input"
            placeholder="Price (PKR)"
            type="number"
            value={form.price}
            onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
          />
          <input
            className="input"
            placeholder="Image URL"
            value={form.image}
            onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
          />
          <input
            className="input"
            placeholder="Features (comma separated)"
            value={form.features}
            onChange={e => setForm(f => ({ ...f, features: e.target.value }))}
          />
        </div>
        <textarea
          className="input"
          placeholder="Description"
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
        />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Add Package'}
        </button>
      </form>

      {PACKAGE_TYPES.map(type => (
        <section key={type} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-secondary">{type} Packages</h2>
            <span className="text-xs text-gray-400">
              {groupedPackages[type]?.length || 0} total
            </span>
          </div>
          {groupedPackages[type]?.length ? (
            <ul className="grid gap-4">
              {groupedPackages[type].map(pkg => (
                <li
                  key={pkg._id}
                  className="card flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
                >
                  {editingId === pkg._id ? (
                    <form className="flex-1" onSubmit={e => handleEditSubmit(e, pkg._id)}>
                      <div className="font-bold mb-2">Editing: {pkg.name}</div>
                      <div className="grid gap-3 md:grid-cols-2">
                        <input
                          className="input"
                          placeholder="Name"
                          value={editForm.name}
                          onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                          required
                        />
                        <input
                          className="input"
                          placeholder="Days"
                          type="number"
                          value={editForm.days}
                          onChange={e => setEditForm(f => ({ ...f, days: e.target.value }))}
                          required
                        />
                        <select
                          className="input"
                          value={editForm.type}
                          onChange={e => setEditForm(f => ({ ...f, type: e.target.value }))}
                          required
                        >
                          {PACKAGE_TYPES.map(option => (
                            <option key={option}>{option}</option>
                          ))}
                        </select>
                        <input
                          className="input"
                          placeholder="Price"
                          type="number"
                          value={editForm.price}
                          onChange={e => setEditForm(f => ({ ...f, price: e.target.value }))}
                        />
                        <input
                          className="input"
                          placeholder="Image URL"
                          value={editForm.image}
                          onChange={e => setEditForm(f => ({ ...f, image: e.target.value }))}
                        />
                        <input
                          className="input"
                          placeholder="Features (comma separated)"
                          value={editForm.features}
                          onChange={e => setEditForm(f => ({ ...f, features: e.target.value }))}
                        />
                      </div>
                      <textarea
                        className="input"
                        placeholder="Description"
                        value={editForm.description}
                        onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                      />
                      <div className="flex gap-2 mt-2">
                        <button className="btn bg-green-600 hover:bg-green-700 text-white" type="submit" disabled={loading}>
                          {loading ? 'Saving...' : 'Save'}
                        </button>
                        <button className="btn bg-gray-400 hover:bg-gray-500 text-white" type="button" onClick={() => setEditingId(null)}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="flex-1 space-y-2">
                        <div className="font-bold text-secondary">
                          {pkg.name} ({pkg.days} days)
                        </div>
                        <div className="text-sm text-gray-600">{pkg.description}</div>
                        <div className="text-sm">Price: PKR {Number(pkg.price || 0).toLocaleString()}</div>
                        <div className="text-xs text-gray-500">
                          Features: {pkg.features?.join(', ') || '—'}
                        </div>
                        {pkg.image && (
                          <Image
                            src={pkg.image}
                            alt={pkg.name}
                            width={160}
                            height={100}
                            className="w-40 h-24 object-cover rounded-lg border"
                          />
                        )}
                      </div>
                      <div className="flex gap-2 mt-2 md:mt-0">
                        <button className="btn bg-yellow-500 hover:bg-yellow-600 text-white" onClick={() => handleEdit(pkg)}>
                          Edit
                        </button>
                        <button className="btn bg-red-500 hover:bg-red-600 text-white" onClick={() => handleDelete(pkg._id)}>
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="card text-sm text-gray-500">
              No {type.toLowerCase()} packages added yet.
            </div>
          )}
        </section>
      ))}
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
      type: pkg.type || 'Umrah',
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
          features: editForm.features.split(',').map(f => f.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error('Failed to update package');
      setPackages(pkgs =>
        pkgs.map(p =>
          p._id === id
            ? {
                ...p,
                ...editForm,
                days: Number(editForm.days),
                price: Number(editForm.price),
                features: editForm.features
                  .split(',')
                  .map(f => f.trim())
                  .filter(Boolean),
              }
            : p
        )
      );
      setEditingId(null);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Unknown error');
    } finally {
      setLoading(false);
    }
  }
}
