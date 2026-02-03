"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";

/* ================= REVIEWS AUTO SLIDER ================= */
function ReviewsSlider() {
  const reviews = [
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
      rating: 5,
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

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % reviews.length);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const r = reviews[index];

  return (
    <div className="max-w-xl mx-auto text-center card reveal">
      <div className="flex justify-center mb-2">
        {Array.from({ length: r.rating }).map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">★</span>
        ))}
      </div>
      <p className="italic text-secondary-dark mb-2">“{r.review}”</p>
      <p className="font-bold text-primary">
        — {r.name}, {r.city}
      </p>
    </div>
  );
}

/* ================= HOME ================= */
export default function Home() {

  useEffect(() => {
    setTimeout(() => {
      const reveals = document.querySelectorAll(".reveal");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
            }
          });
        },
        { threshold: 0.15 }
      );

      reveals.forEach((el) => observer.observe(el));
    }, 300);
  }, []);

  return (
    <main className="pb-16">

      {/* HERO */}
      <section className="relative min-h-[70vh] rounded-[32px] overflow-hidden shadow-card mb-20 mt-4 md:mt-6 reveal">
        <Image
          src="/umrah2.png"
          alt="Kaaba"
          fill
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/95" />
        <div className="relative z-10 text-center py-24 md:py-28 px-6">
          <span className="badge mb-4">Trusted Umrah Support</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-6">
            Answer the Call for Umrah with Peace of Mind
          </h1>

          <p className="text-lg md:text-xl text-secondary-dark mb-8 max-w-3xl mx-auto">
            Complete Umrah visa, hotels near Haram, flights and transport —
            handled by Barakah Travels with 24/7 WhatsApp support.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/923183548299"
              className="btn text-base md:text-lg px-8 py-3"
            >
              Get Latest Umrah Price on WhatsApp
            </a>
            <a href="/packages" className="btn-outline text-base md:text-lg px-8 py-3">
              View Umrah Packages
            </a>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-primary font-semibold">
            <span className="flex items-center gap-2">• 500+ Pilgrims Served</span>
            <span className="flex items-center gap-2">• Visa in 48 Hours</span>
            <span className="flex items-center gap-2">• Hotels Within 300m of Haram</span>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mb-24 reveal">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          What Our Clients Say
        </h2>
        <ReviewsSlider />
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="mb-24 reveal">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">
          Popular Destinations
        </h2>

        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
          {[
            { title: "Umrah", img: "/umrah2.png" },
            { title: "Dubai", img: "/dubai.jpg" },
            { title: "Turkey", img: "/turkey.jpg" },
            { title: "Thailand", img: "/thailand.jpg" },
            { title: "Baku", img: "/baku.jpg" },
          ].map((d, i) => (
            <div key={i} className="card text-center p-4 reveal">
              <Image src={d.img} alt={d.title} width={300} height={160} className="rounded-xl mb-4"/>
              <h3 className="text-xl font-bold text-primary mb-2">{d.title}</h3>
              <Link href="/contact" className="btn">Explore</Link>
            </div>
          ))}
        </div>
      </section>

      {/* UMRAH JOURNEY */}
      <section className="mb-24 max-w-6xl mx-auto reveal">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          Your Umrah Journey With Barakah Travels
        </h2>

        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="card reveal">
            <h3 className="font-bold text-lg mb-2">1. Contact on WhatsApp</h3>
            <p>Get complete package details instantly.</p>
          </div>
          <div className="card reveal">
            <h3 className="font-bold text-lg mb-2">2. Visa Processing</h3>
            <p>Fast and hassle-free Umrah visa service.</p>
          </div>
          <div className="card reveal">
            <h3 className="font-bold text-lg mb-2">3. Flights & Hotels</h3>
            <p>Stay near Haram with comfortable transport.</p>
          </div>
          <div className="card reveal">
            <h3 className="font-bold text-lg mb-2">4. Perform Umrah Peacefully</h3>
            <p>Guidance and support throughout your journey.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center mb-24 reveal">
        <h2 className="text-3xl font-bold text-primary mb-6">
          Ready for Your Umrah Journey?
        </h2>
        <a
          href="https://wa.me/923183548299"
          className="btn text-lg px-8 py-3"
        >
          Contact on WhatsApp Now
        </a>
      </section>

      {/* SEO CONTENT */}
      <section className="max-w-4xl mx-auto text-sm text-secondary leading-relaxed mt-24 reveal">
        <h2 className="text-2xl font-bold text-primary mb-4">
          Umrah Packages & Travel Services in Pakistan
        </h2>
        <p className="mb-3">
          Barakah Travels provides affordable and comfortable Umrah packages from Karachi,
          Lahore and Islamabad including visa, hotels near Haram and transport.
        </p>
        <p>
          Our experienced team ensures a smooth and spiritually fulfilling Umrah
          journey with transparent pricing and 24/7 WhatsApp support.
        </p>
      </section>

    </main>
  );
}
