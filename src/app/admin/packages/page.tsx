"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type PackageItem = {
  id: string;
  title: string;
  images: string[];
  price: number;
  duration: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: string;
  status: string;
};

type PackageData = {
  umrah: PackageItem[];
  tours: PackageItem[];
};

const initialForm = {
  title: "",
  price: "",
  duration: "",
  inclusions: "",
  exclusions: "",
  itinerary: "",
  images: "",
  status: "Active",
  category: "umrah",
};

export default function AdminPackages() {
  const [packages, setPackages] = useState<PackageData>({ umrah: [], tours: [] });
  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/packages")
      .then((res) => res.json())
      .then(setPackages);
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      images: form.images.split(",").map((item) => item.trim()).filter(Boolean),
      inclusions: form.inclusions.split(",").map((item) => item.trim()).filter(Boolean),
      exclusions: form.exclusions.split(",").map((item) => item.trim()).filter(Boolean),
    };

    const response = await fetch("/api/admin/packages", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing ? { ...payload, id: editing } : payload),
    });
    const data = await response.json();
    if (editing) {
      setPackages((prev) => ({
        ...prev,
        [form.category]: prev[form.category as keyof PackageData].map((item) =>
          item.id === editing ? data.package : item
        ),
      }));
    } else {
      setPackages((prev) => ({
        ...prev,
        [form.category]: [data.package, ...prev[form.category as keyof PackageData]],
      }));
    }
    setForm(initialForm);
    setEditing(null);
  }

  async function handleDelete(category: "umrah" | "tours", id: string) {
    await fetch(`/api/admin/packages?id=${id}&category=${category}`, {
      method: "DELETE",
    });
    setPackages((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item.id !== id),
    }));
  }

  function startEdit(category: "umrah" | "tours", item: PackageItem) {
    setEditing(item.id);
    setForm({
      title: item.title,
      price: item.price.toString(),
      duration: item.duration,
      inclusions: item.inclusions.join(", "),
      exclusions: item.exclusions.join(", "),
      itinerary: item.itinerary,
      images: item.images.join(", "),
      status: item.status,
      category,
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Package Management</h1>
        <p className="text-white/70 mt-2">
          Manage Umrah packages and international tour offerings with images,
          pricing, and itinerary details.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-white/5 p-6 grid gap-4 md:grid-cols-2"
      >
        <div>
          <label className="text-sm text-white/70">Title</label>
          <input
            value={form.title}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, title: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
            required
          />
        </div>
        <div>
          <label className="text-sm text-white/70">Category</label>
          <select
            value={form.category}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, category: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
          >
            <option value="umrah">Umrah Package</option>
            <option value="tours">International Tour</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-white/70">Price (PKR)</label>
          <input
            type="number"
            value={form.price}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, price: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
            required
          />
        </div>
        <div>
          <label className="text-sm text-white/70">Duration</label>
          <input
            value={form.duration}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, duration: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
            placeholder="7 Nights"
          />
        </div>
        <div>
          <label className="text-sm text-white/70">Inclusions</label>
          <input
            value={form.inclusions}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, inclusions: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
            placeholder="Visa, Hotels, Transfers"
          />
        </div>
        <div>
          <label className="text-sm text-white/70">Exclusions</label>
          <input
            value={form.exclusions}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, exclusions: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
            placeholder="Personal expenses"
          />
        </div>
        <div>
          <label className="text-sm text-white/70">Images (comma separated)</label>
          <input
            value={form.images}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, images: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
          />
        </div>
        <div>
          <label className="text-sm text-white/70">Status</label>
          <select
            value={form.status}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, status: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
          >
            <option>Active</option>
            <option>Draft</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="text-sm text-white/70">Itinerary</label>
          <textarea
            value={form.itinerary}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, itinerary: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
            rows={3}
          />
        </div>
        <div className="md:col-span-2 flex gap-3">
          <button
            type="submit"
            className="rounded-xl bg-yellow-400 text-black px-6 py-2 font-semibold"
          >
            {editing ? "Update package" : "Add package"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setForm(initialForm);
              }}
              className="rounded-xl border border-white/20 px-6 py-2 text-white"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {(["umrah", "tours"] as const).map((category) => (
        <div
          key={category}
          className="rounded-3xl border border-white/10 bg-white/5 p-6"
        >
          <h2 className="text-lg font-semibold mb-4">
            {category === "umrah" ? "Umrah Packages" : "International Tours"}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {packages[category].map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-black/40 p-4 flex flex-col gap-4"
              >
                <div className="flex items-center gap-4">
                  {item.images[0] && (
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      width={120}
                      height={80}
                      className="rounded-xl object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-white/70">
                      {item.duration} • PKR {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white/70">{item.itinerary}</p>
                <div className="flex flex-wrap gap-2 text-xs text-white/60">
                  <span className="rounded-full border border-white/10 px-3 py-1">
                    {item.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(category, item)}
                    className="rounded-xl border border-white/20 px-4 py-2 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category, item.id)}
                    className="rounded-xl border border-red-400/40 px-4 py-2 text-sm text-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
