"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

/* ================= TYPES ================= */
type TravelPackage = {
  id: string;
  title: string;
  type: string;
  price?: string;
  duration?: string;
  images?: string[];
  inclusions?: string[];
};

/* ================= DATA FETCH ================= */
function usePackages() {
  const [packages, setPackages] = useState<TravelPackage[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/packages")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch packages");
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

/* ================= PAGE ================= */
export default function PackagesPage() {
  const { packages, loading, error } = usePackages();

  /* Fallback / demo data */
  const demoPackages: TravelPackage[] = [
    {
      id: "demo1",
      title: "Economy Umrah Package",
      type: "Umrah",
      duration: "7 Days",
      price: "PKR 95,000",
      images: ["/umrah2.png"],
      inclusions: ["Visa Included", "3-Star Hotel", "Transport", "Ziyārāt"],
    },
    {
      id: "demo2",
      title: "Premium Umrah Package",
      type: "Umrah",
      duration: "10 Days",
      price: "PKR 185,000",
      images: ["/umrah2.png"],
      inclusions: ["Visa Included", "5-Star Hotel", "Private Transport", "Ziyārāt"],
    },
  ];

  const showPackages =
    packages && packages.length > 0 ? packages : demoPackages;

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">

      {/* ================= PAGE HEADER (SEO) ================= */}
      <section className="mb-14 text-center">
        <h1
          id="umrah"
          className="text-4xl md:text-5xl font-extrabold text-primary mb-4"
        >
          Umrah Packages from Pakistan
        </h1>
        <p className="text-lg text-secondary max-w-3xl mx-auto">
          Affordable and premium Umrah packages with visa, hotels near Haram,
          transport and complete guidance. Book with confidence through
          Barakah Travels.
        </p>

        {/* Trust strip */}
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm font-semibold text-primary">
          <span>✔ Visa Included</span>
          <span>✔ Hotels Near Haram</span>
          <span>✔ 24/7 WhatsApp Support</span>
        </div>
      </section>

      <div className="mt-6 text-center">
  <a
    href="/umrah-packages-from-karachi"
    className="text-yellow-600 font-semibold underline"
  >
    View Detailed Umrah Packages from Karachi →
  </a>
</div>

      {/* ================= STATES ================= */}
      {loading && <div className="text-center">Loading packages…</div>}
      {error && (
        <div className="text-center text-red-500">{error}</div>
      )}

      {/* ================= PACKAGES GRID ================= */}
      {!loading && !error && (
        <section className="grid gap-8 md:grid-cols-3">
          {showPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="card flex flex-col hover:shadow-xl transition"
            >
              {/* Image */}
              {pkg.images?.[0] && (
                <div className="relative h-40 mb-4">
                  <Image
                    src={pkg.images[0]}
                    alt={`${pkg.title} Umrah Package`}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}

              {/* Badge */}
              <span className="badge w-fit mb-2">Visa Included</span>

              {/* Title */}
              <h2 className="text-xl font-bold mb-1 text-primary">
                {pkg.title}
              </h2>
              <p className="text-sm text-secondary mb-3">
                {pkg.duration || "Flexible"} · {pkg.type}
              </p>

              {/* Features */}
              <ul className="list-disc pl-5 text-sm mb-4 flex-1">
                {pkg.inclusions?.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>

              {/* Price */}
              {pkg.price && (
                <div className="font-bold text-lg mb-4">{pkg.price}</div>
              )}

              {/* CTA */}
              <a
                href={`https://wa.me/923183548299?text=Assalamualaikum, I want details about ${pkg.title}`}
                className="btn text-center"
              >
                Book on WhatsApp
              </a>
            </div>
          ))}
        </section>
      )}

      {/* ================= SEO CONTENT BLOCK ================= */}
      <section className="mt-20 max-w-4xl mx-auto text-sm text-secondary leading-relaxed">
        <h2 className="text-2xl font-bold text-primary mb-4">
          Why Choose Barakah Travels for Umrah?
        </h2>
        <p className="mb-3">
          Barakah Travels provides reliable and transparent Umrah services for
          pilgrims across Pakistan. Our packages include visa processing,
          hotel accommodation near Haram, transport and ziyārāt arrangements.
        </p>
        <p>
          Whether you are travelling from Karachi, Lahore, Islamabad or any
          other city, our team ensures a smooth and spiritually fulfilling
          journey.
        </p>
      </section>
    </main>
  );
}
