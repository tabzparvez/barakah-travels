"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Umrah",
    from: "",
    to: "",
    notes: "",
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInquirySubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setFormStatus({ loading: true, success: false, error: "" });

    const response = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    });

    if (!response.ok) {
      setFormStatus({
        loading: false,
        success: false,
        error: "Something went wrong. Please try again.",
      });
      return;
    }

    setFormStatus({ loading: false, success: true, error: "" });
    setFormState({
      name: "",
      phone: "",
      email: "",
      service: "Umrah",
      from: "",
      to: "",
      notes: "",
    });
  };

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
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/65 to-white/80" />
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

      {/* INQUIRY FORM */}
      <section className="mb-24 reveal">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="card">
            <h2 className="text-2xl font-bold text-primary mb-2">
              Umrah Inquiry Form
            </h2>
            <p className="text-sm text-secondary-dark mb-6">
              Tell us your travel preferences and our team will send the best
              Umrah package options within 24 hours.
            </p>
            <form className="form" onSubmit={handleInquirySubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  className="input"
                  name="name"
                  placeholder="Full Name"
                  value={formState.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  className="input"
                  name="phone"
                  placeholder="Phone / WhatsApp"
                  value={formState.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  className="input"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formState.email}
                  onChange={handleInputChange}
                />
                <select
                  className="input"
                  name="service"
                  value={formState.service}
                  onChange={handleInputChange}
                >
                  <option>Umrah</option>
                  <option>Dubai</option>
                  <option>Turkey</option>
                  <option>Baku</option>
                </select>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  className="input"
                  name="from"
                  placeholder="Traveling From"
                  value={formState.from}
                  onChange={handleInputChange}
                />
                <input
                  className="input"
                  name="to"
                  placeholder="Preferred Dates / Month"
                  value={formState.to}
                  onChange={handleInputChange}
                />
              </div>
              <textarea
                className="input min-h-[120px]"
                name="notes"
                placeholder="Special requests, hotel preferences, or notes"
                value={formState.notes}
                onChange={handleInputChange}
              />
              <div className="flex flex-wrap items-center gap-3">
                <button className="btn" type="submit" disabled={formStatus.loading}>
                  {formStatus.loading ? "Submitting..." : "Submit Inquiry"}
                </button>
                {formStatus.success && (
                  <span className="text-sm text-green-600">
                    Inquiry sent! We will contact you shortly.
                  </span>
                )}
                {formStatus.error && (
                  <span className="text-sm text-red-600">{formStatus.error}</span>
                )}
              </div>
            </form>
          </div>
          <div className="card space-y-4">
            <h3 className="text-xl font-semibold text-primary">
              Why pilgrims choose Barakah Travels
            </h3>
            <ul className="space-y-3 text-sm text-secondary-dark">
              <li>• Saudi visa processing with real-time updates.</li>
              <li>• Hand-picked hotels within walking distance of Haram.</li>
              <li>• Dedicated WhatsApp support before and during travel.</li>
              <li>• Flexible packages for families, groups, and seniors.</li>
            </ul>
            <a
              href="https://wa.me/923183548299"
              className="btn-outline w-full justify-center"
            >
              Get Instant WhatsApp Quote
            </a>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mb-24 reveal">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          What Our Clients Say
        </h2>
        <ReviewsSlider />
        <div className="mt-8 text-center space-y-3">
          <Link href="/submit-review" className="btn-outline">
            Add Review
          </Link>
          {!session && (
            <p className="text-sm text-gray-500">
              Please sign in with Google to leave a review
            </p>
          )}
        </div>
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
            <div
              key={i}
              className="card text-center p-4 reveal flex flex-col h-full"
            >
              <div className="relative w-full aspect-[4/3] mb-4">
                <Image
                  src={d.img}
                  alt={d.title}
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">{d.title}</h3>
              <Link href="/contact" className="btn mt-auto">
                Explore
              </Link>
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
