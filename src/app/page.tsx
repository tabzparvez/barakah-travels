"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";

/* ================= TYPES ================= */
interface Testimonial {
  name: string;
  city?: string;
  rating: number;
  review: string;
}

/* ================= DESTINATION CARD ================= */
function DestinationCard({
  title,
  image,
  description,
  link,
}: {
  title: string;
  image: string;
  description: string;
  link: string;
}) {
  return (
    <div className="card group overflow-hidden hover:shadow-xl transition">
      <div className="relative h-40">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition"
        />
      </div>
      <div className="p-4 text-center flex flex-col flex-1">
        <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
        <p className="text-secondary mb-4 flex-1">{description}</p>
        <Link href={link} className="btn bg-primary text-white">
          Explore
        </Link>
      </div>
    </div>
  );
}

/* ================= REVIEWS SLIDER ================= */
function ReviewsSlider() {
  const [clientReviews, setClientReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        setClientReviews(data);
        setLoading(false);
      });
  }, []);

  const fallback = [
    {
      name: "Ayesha Siddiqui",
      city: "Lahore",
      rating: 5,
      review:
        "Barakah Travels made our Umrah journey smooth and stress-free. Highly recommended!",
    },
    {
      name: "Imran Qureshi",
      city: "Karachi",
      rating: 4,
      review:
        "Excellent visa guidance and fast WhatsApp support. Will book again.",
    },
    {
      name: "Fatima Noor",
      city: "Islamabad",
      rating: 5,
      review:
        "Professional team and excellent hotel arrangements near Haram.",
    },
  ];

  const reviews = [...clientReviews, ...fallback];
  const [index, setIndex] = useState(0);
  if (loading) return <div className="text-center">Loading reviews…</div>;

  const r = reviews[index];

  return (
    <div className="max-w-xl mx-auto text-center">
      <div className="card mb-4">
        <div className="flex justify-center mb-2">
          {Array.from({ length: r.rating }).map((_, i) => (
            <span key={i} className="text-yellow-400 text-lg">★</span>
          ))}
        </div>
        <p className="italic text-secondary-dark mb-2">“{r.review}”</p>
        <p className="font-bold text-primary">
          — {r.name}{r.city && `, ${r.city}`}
        </p>
      </div>
      <div className="flex justify-center gap-4">
        <button onClick={() => setIndex(i => i === 0 ? reviews.length - 1 : i - 1)} className="btn px-4 py-1">
          Prev
        </button>
        <button onClick={() => setIndex(i => i === reviews.length - 1 ? 0 : i + 1)} className="btn px-4 py-1">
          Next
        </button>
      </div>
    </div>
  );
}

/* ================= HOME PAGE ================= */
export default function Home() {
  return (
    <main>

      {/* ================= HERO ================= */}
      <section className="relative min-h-[65vh] rounded-2xl overflow-hidden shadow-card mb-16 mt-8">
        <Image
          src="/umrah2.png"
          alt="Umrah"
          fill
          className="object-cover opacity-30"
        />
        <div className="relative z-10 text-center py-20 px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-4">
            Barakah Travels
          </h1>
          <p className="text-xl md:text-2xl text-secondary-dark mb-6">
            Trusted Umrah & Visa Services — From Pakistan to Makkah & Madinah
          </p>
          <a
            href="https://wa.me/923183548299"
            className="btn text-lg px-8 py-3"
          >
            Get Umrah Quote on WhatsApp
          </a>

          {/* TRUST STRIP */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-semibold text-primary">
            <span>✔ Visa Included</span>
            <span>✔ Hotels Near Haram</span>
            <span>✔ 24/7 WhatsApp Support</span>
          </div>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          What Our Clients Say
        </h2>
        <ReviewsSlider />
      </section>

      {/* ================= DESTINATIONS ================= */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">
          Popular Destinations
        </h2>
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
          <DestinationCard
            title="Umrah"
            image="/umrah2.png"
            description="Complete Umrah packages with visa & hotels."
            link="/packages"
          />
          <DestinationCard
            title="Dubai"
            image="/dubai.jpg"
            description="Luxury tours and shopping experiences."
            link="/contact"
          />
          <DestinationCard
            title="Turkey"
            image="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&q=80"
            description="Explore Istanbul & Cappadocia."
            link="/contact"
          />
          <DestinationCard
            title="Thailand"
            image="/thailand.jpg"
            description="Beautiful beaches and nightlife."
            link="/contact"
          />
          <DestinationCard
            title="Baku"
            image="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=400&q=80"
            description="Caspian coast & culture."
            link="/contact"
          />
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="grid gap-8 md:grid-cols-2 mb-20">
        <div className="card">
          <h3 className="text-2xl font-bold text-primary mb-2">Umrah Packages</h3>
          <p className="mb-4">Visa, hotels, transport & Ziyārāt included.</p>
          <Link href="/packages" className="btn bg-primary text-white">
            View Packages
          </Link>
        </div>
        <div className="card">
          <h3 className="text-2xl font-bold text-primary mb-2">Visa Guidance</h3>
          <p className="mb-4">Umrah, tourist & family visa assistance.</p>
          <Link href="/contact" className="btn bg-primary text-white">
            Contact Us
          </Link>
        </div>
      </section>
      {/* ================= SEO CONTENT ================= */}
<section className="max-w-4xl mx-auto text-sm text-secondary leading-relaxed mt-24">
  <h2 className="text-2xl font-bold text-primary mb-4">
    Umrah Packages & Travel Services in Pakistan
  </h2>
  <p className="mb-3">
    Barakah Travels is a trusted Umrah travel agency in Pakistan providing
    affordable and premium Umrah packages from Karachi, Lahore, Islamabad and
    other cities. Our services include Umrah visa processing, hotels near Haram,
    transport, and guided ziyārāt.
  </p>
  <p className="mb-3">
    Whether you are planning your first Umrah or travelling with family, our
    experienced team ensures a smooth and spiritually fulfilling journey.
  </p>
  <p>
    Contact Barakah Travels today for customized Umrah packages with transparent
    pricing and 24/7 WhatsApp support.
  </p>
</section>

    </main>
  );
}
