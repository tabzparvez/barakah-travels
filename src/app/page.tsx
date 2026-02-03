"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import InquiryForm from "@/components/InquiryForm";

const FALLBACK_REVIEWS = [
  {
    name: "Ayesha Siddiqui",
    city: "Lahore",
    review:
      "Barakah Travels made our Umrah journey smooth and stress-free. Highly recommended!",
  },
  {
    name: "Imran Qureshi",
    city: "Karachi",
    review:
      "Excellent visa guidance and fast WhatsApp support. Will book again.",
  },
  {
    name: "Fatima Noor",
    city: "Islamabad",
    review:
      "Professional team and excellent hotel arrangements near Haram.",
  },
];

/* ================= REVIEWS AUTO SLIDER ================= */
function ReviewsSlider({ reviews }: { reviews: { name: string; city?: string; review: string }[] }) {
  const [index, setIndex] = useState(0);

  const r = reviews[index];

  useEffect(() => {
    if (!reviews.length) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % reviews.length);
    }, 3500);
    return () => clearInterval(t);
  }, [reviews.length]);

  if (!reviews.length) return null;

  return (
    <div className="max-w-xl mx-auto text-center card reveal">
      <div className="flex justify-center mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">★</span>
        ))}
      </div>
      <p className="italic text-secondary-dark mb-2">“{r.review}”</p>
      <p className="font-bold text-primary">
        — {r.name}{r.city ? `, ${r.city}` : ""}
      </p>
    </div>
  );
}

/* ================= HOME ================= */
export default function Home() {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState(FALLBACK_REVIEWS);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setReviews(data);
        }
      })
      .catch(() => {
        setReviews(FALLBACK_REVIEWS);
      })
      .finally(() => setReviewsLoading(false));
  }, []);

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
      <section className="relative min-h-[70vh] rounded-[32px] overflow-hidden shadow-[0_16px_40px_rgba(22,22,22,0.12)] border border-primary/10 bg-white mb-16 mt-4 md:mt-6 reveal">
        <Image
          src="/umrah2.png"
          alt="Kaaba"
          fill
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/35 to-white/70" />
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

      {/* UMRAH INQUIRY FORM */}
      <section className="mb-24 reveal section-surface">
        <div className="max-w-4xl mx-auto">
          <InquiryForm
            title="Umrah Inquiry Form"
            description="Share your travel needs and we will respond with the best Umrah options."
          />
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mb-24 reveal section-surface">
        <div className="flex flex-col items-center gap-4 mb-8">
          <h2 className="text-3xl font-bold text-center text-primary">
            What Our Clients Say
          </h2>
          <Link href="/submit-review" className="btn">
            Add Review
          </Link>
          {!session && (
            <p className="text-sm text-gray-600">
              Please sign in with Google to leave a review
            </p>
          )}
        </div>
        {!reviewsLoading && reviews.length === 0 ? (
          <p className="text-center text-gray-600">
            Reviews are coming soon.
          </p>
        ) : (
          <ReviewsSlider reviews={reviews} />
        )}
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="mb-24 reveal section-surface">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">
          Popular Destinations
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            { title: "Umrah", img: "/umrah2.png" },
            { title: "Turkey", img: "/turkey.jpg" },
            { title: "Baku", img: "/baku.jpg" },
          ].map((d, i) => (
            <div key={i} className="card text-center p-4 reveal flex flex-col h-full">
              <div className="relative h-40 w-full mb-4">
                <Image src={d.img} alt={d.title} fill className="rounded-xl object-cover"/>
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">{d.title}</h3>
              <div className="mt-auto">
                <Link href="/contact" className="btn">Explore</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* UMRAH JOURNEY */}
      <section className="mb-24 max-w-6xl mx-auto reveal section-surface">
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
      <section className="text-center mb-24 reveal section-surface">
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
      <section className="max-w-4xl mx-auto text-sm text-secondary leading-relaxed mt-24 reveal section-surface">
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
