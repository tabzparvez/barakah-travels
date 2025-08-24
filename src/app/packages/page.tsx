"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';

type Package = {
  _id: string;
  name: string;
  days: number;
  type: string;
  description?: string;
  price?: number;
  features?: string[];
  image?: string;
};

function usePackages() {
  const [packages, setPackages] = useState<Package[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/packages')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch packages');
        return res.json();
      })
      .then((data) => {
        setPackages(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { packages, loading, error };
}

export default function Packages() {
  const { packages, loading, error } = usePackages();
  const demoPackages: Package[] = [
    {
      _id: 'demo1',
      name: 'Economy Umrah Package',
      days: 7,
      type: 'Economy',
      description: 'Affordable Umrah package with 3-star hotel, visa, and transport.',
      price: 95000,
      features: ['Visa Included', '3-Star Hotel', 'Airport Transfers', 'Ziyārāt'],
      image: '/umrah2.png',
    },
    {
      _id: 'demo2',
      name: 'Premium Umrah Package',
      days: 10,
      type: 'Premium',
      description: 'Premium Umrah package with 5-star hotel, visa, and private transport.',
      price: 185000,
      features: ['Visa Included', '5-Star Hotel', 'Private Transport', 'Ziyārāt'],
      image: '/umrah2.png',
    },
  ];
  const showPackages = packages && packages.length > 0 ? packages : demoPackages;
  return (
    <main className="section">
      <h1 className="text-3xl font-bold mb-4">Umrah Packages</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {showPackages.map((pkg) => (
            <div className="card" key={pkg._id}>
              <span className="badge">Visa Included</span>
              <h2 className="text-xl font-bold mb-2">{pkg.days} Days · {pkg.type}</h2>
              <div className="font-bold mb-1">{pkg.name}</div>
              <ul className="list-disc pl-5 mb-2">
                {pkg.features?.map((f: string, i: number) => <li key={i}>{f}</li>)}
              </ul>
              {pkg.description && <div className="mb-2">{pkg.description}</div>}
              {pkg.price && <div className="mb-2">Price: {pkg.price}</div>}
              {pkg.image && <Image src={pkg.image} alt={pkg.name} width={128} height={80} className="w-32 h-20 object-cover mb-2" />}
              <a className="btn" href={`https://wa.me/923183548299?text=I want ${pkg.days}D ${pkg.type} Umrah package`}>Book on WhatsApp</a>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}