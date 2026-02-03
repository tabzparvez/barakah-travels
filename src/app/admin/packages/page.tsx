"use client";

import { useEffect, useState } from "react";

type TravelPackage = {
  id: string;
  type: "Umrah" | "International";
  title: string;
  price: string;
  duration: string;
  status: string;
  images: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: string[];
};

const emptyForm = {
  type: "Umrah",
  title: "",
  price: "",
  duration: "",
  status: "Active",
  images: "",
  inclusions: "",
  exclusions: "",
  itinerary: "",
};

export default function PackagesPage() {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [form, setForm] = useState(emptyForm);

  const loadPackages = async () => {
    const res = await fetch("/api/packages");
    const data = await res.json();
    setPackages(data);
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/packages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        images: form.images.split(",").map((item) => item.trim()).filter(Boolean),
        inclusions: form.inclusions.split(",").map((item) => item.trim()).filter(Boolean),
        exclusions: form.exclusions.split(",").map((item) => item.trim()).filter(Boolean),
        itinerary: form.itinerary.split(",").map((item) => item.trim()).filter(Boolean),
      }),
    });
    setForm(emptyForm);
    loadPackages();
  };

  const grouped = {
    Umrah: packages.filter((pkg) => pkg.type === "Umrah"),
    International: packages.filter((pkg) => pkg.type === "International"),
  };

  return (
    <div className="space-y-10">
      <div className="admin-card">
        <h2 className="text-2xl font-semibold mb-2">Package Management</h2>
        <p className="text-slate-500">
          Maintain Umrah packages and international tour packages in one place.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="admin-card space-y-4">
        <h3 className="text-lg font-semibold">Add New Package</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="admin-input"
          >
            <option value="Umrah">Umrah Package</option>
            <option value="International">International Tour</option>
          </select>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Package Title"
            className="admin-input"
            required
          />
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price (e.g. PKR 250,000)"
            className="admin-input"
            required
          />
          <input
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="Duration (e.g. 10 Nights)"
            className="admin-input"
            required
          />
          <input
            name="status"
            value={form.status}
            onChange={handleChange}
            placeholder="Status"
            className="admin-input"
          />
          <input
            name="images"
            value={form.images}
            onChange={handleChange}
            placeholder="Image URLs (comma separated)"
            className="admin-input"
          />
        </div>
        <textarea
          name="inclusions"
          value={form.inclusions}
          onChange={handleChange}
          placeholder="Inclusions (comma separated)"
          className="admin-input"
          rows={3}
        />
        <textarea
          name="exclusions"
          value={form.exclusions}
          onChange={handleChange}
          placeholder="Exclusions (comma separated)"
          className="admin-input"
          rows={3}
        />
        <textarea
          name="itinerary"
          value={form.itinerary}
          onChange={handleChange}
          placeholder="Itinerary highlights (comma separated)"
          className="admin-input"
          rows={3}
        />
        <button type="submit" className="btn w-full md:w-auto">
          Save Package
        </button>
      </form>

      <div className="grid gap-8">
        {(["Umrah", "International"] as const).map((type) => (
          <div key={type} className="admin-card">
            <h3 className="text-lg font-semibold mb-4">
              {type === "Umrah" ? "Umrah Packages" : "International Tours"}
            </h3>
            <div className="grid gap-4">
              {grouped[type].map((pkg) => (
                <div
                  key={pkg.id}
                  className="border border-slate-200 rounded-2xl p-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-semibold">{pkg.title}</h4>
                      <p className="text-sm text-slate-500">
                        {pkg.duration} · {pkg.price}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Status: {pkg.status}
                      </p>
                    </div>
                    <span className="badge bg-yellow-100 text-yellow-800">
                      {pkg.type}
                    </span>
                  </div>
                  <div className="mt-4 grid md:grid-cols-3 gap-3 text-sm text-slate-500">
                    <div>
                      <p className="font-semibold text-slate-700 mb-1">
                        Inclusions
                      </p>
                      <ul className="list-disc list-inside">
                        {pkg.inclusions?.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700 mb-1">
                        Exclusions
                      </p>
                      <ul className="list-disc list-inside">
                        {pkg.exclusions?.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700 mb-1">
                        Itinerary
                      </p>
                      <ul className="list-disc list-inside">
                        {pkg.itinerary?.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
              {grouped[type].length === 0 && (
                <p className="text-sm text-slate-500">
                  No packages available yet.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
