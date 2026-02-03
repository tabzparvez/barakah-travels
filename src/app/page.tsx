"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Ayesha Siddiqui",
    city: "Lahore",
    review:
      "Barakah Travels delivered a flawless Umrah experience — hotels, flights, and guidance were premium throughout.",
  },
  {
    name: "Imran Qureshi",
    city: "Karachi",
    review:
      "Our Turkey tour was curated to perfection with boutique stays and seamless transfers. Truly luxury service.",
  },
  {
    name: "Fatima Noor",
    city: "Islamabad",
    review:
      "From visa support to airport pickups, every detail was handled. A five-star experience for Baku travel.",
  },
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [umrahForm, setUmrahForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    persons: "",
    travelMonth: "",
    message: "",
  });
  const [tourForm, setTourForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    persons: "",
    destination: "",
    travelMonth: "",
    message: "",
  });
  const [umrahStatus, setUmrahStatus] = useState("");
  const [tourStatus, setTourStatus] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  async function submitUmrah(event: React.FormEvent) {
    event.preventDefault();
    setUmrahStatus("Submitting...");
    const response = await fetch("/api/forms/umrah", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(umrahForm),
    });
    if (response.ok) {
      setUmrahStatus("Inquiry received. Our concierge will contact you soon.");
      setUmrahForm({
        name: "",
        phone: "",
        email: "",
        city: "",
        persons: "",
        travelMonth: "",
        message: "",
      });
      return;
    }
    setUmrahStatus("Something went wrong. Please try again.");
  }

  async function submitTour(event: React.FormEvent) {
    event.preventDefault();
    setTourStatus("Submitting...");
    const response = await fetch("/api/forms/tour", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tourForm),
    });
    if (response.ok) {
      setTourStatus("Inquiry received. Our concierge will contact you soon.");
      setTourForm({
        name: "",
        phone: "",
        email: "",
        city: "",
        persons: "",
        destination: "",
        travelMonth: "",
        message: "",
      });
      return;
    }
    setTourStatus("Something went wrong. Please try again.");
  }

  const active = testimonials[activeTestimonial];

  return (
    <main className="space-y-24">
      <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#111111]">
        <Image
          src="/umrah2.png"
          alt="Luxury Umrah travel"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="relative z-10 px-6 py-20 md:py-28 lg:px-16">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm uppercase tracking-[0.4em] text-yellow-300">
              Premium International Travel Agency
            </p>
            <h1 className="text-4xl md:text-6xl font-semibold">
              Experience Umrah & Global Tours with a Luxury Concierge Touch
            </h1>
            <p className="text-lg text-white/70">
              Barakah Travels curates premium Umrah packages from Pakistan and
              signature tours to Turkey and Baku with visa handling, five-star
              hotels, and 24/7 concierge service.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/923183548299"
                className="rounded-full bg-yellow-400 text-black font-semibold px-8 py-3 hover:bg-yellow-300"
              >
                Get Personalized Quote
              </a>
              <Link
                href="#umrah-inquiry"
                className="rounded-full border border-white/30 px-8 py-3 font-semibold text-white hover:border-yellow-300"
              >
                Umrah Inquiry Form
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 pt-6 text-sm text-white/70">
              <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                500+ Pilgrims Served
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                48-Hour Visa Support
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                Hotels within 300m of Haram
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="umrah-packages" className="space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
              Popular Destinations
            </p>
            <h2 className="text-3xl font-semibold">Luxury Travel Collections</h2>
          </div>
          <Link
            href="/contact"
            className="rounded-full border border-yellow-400/50 px-6 py-2 text-sm text-yellow-300"
          >
            Speak to an advisor
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Umrah", image: "/umrah2.png", tag: "Spiritual Luxury" },
            { title: "Turkey", image: "/turkey.jpg", tag: "Cultural Elegance" },
            { title: "Baku", image: "/baku.jpg", tag: "Modern Escape" },
          ].map((destination) => (
            <div
              key={destination.title}
              id={destination.title.toLowerCase()}
              className="group rounded-3xl border border-white/10 bg-white/5 overflow-hidden"
            >
              <div className="relative h-52">
                <Image
                  src={destination.image}
                  alt={destination.title}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>
              <div className="p-6 space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-yellow-300">
                  {destination.tag}
                </p>
                <h3 className="text-xl font-semibold">{destination.title}</h3>
                <p className="text-sm text-white/70">
                  Tailor-made itineraries, premium hotels, and curated experiences
                  for {destination.title} travel.
                </p>
                <Link
                  href="#tour-inquiry"
                  className="text-sm font-semibold text-yellow-300"
                >
                  Explore packages →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">
              Client Testimonials
            </p>
            <h2 className="text-3xl font-semibold">
              Trusted by Travelers Across Pakistan
            </h2>
            <p className="text-white/70">
              We curate unforgettable journeys with precision and care. Hear how
              our concierge team delivers extraordinary Umrah and tour
              experiences.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/40 p-8 text-center">
            <p className="text-lg italic text-white/80">“{active.review}”</p>
            <p className="mt-4 font-semibold text-yellow-300">
              {active.name}
            </p>
            <p className="text-sm text-white/60">{active.city}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-2" id="umrah-inquiry">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold">Umrah Inquiry Form</h2>
          <p className="text-sm text-white/70 mt-2">
            Share your Umrah travel preferences and our team will craft a
            personalized package.
          </p>
          <form onSubmit={submitUmrah} className="mt-6 grid gap-4">
            {[
              { label: "Full Name", key: "name" },
              { label: "Phone Number", key: "phone" },
              { label: "Email", key: "email" },
              { label: "City", key: "city" },
              { label: "Number of Persons", key: "persons" },
              { label: "Preferred Travel Month", key: "travelMonth" },
            ].map((field) => (
              <input
                key={field.key}
                placeholder={field.label}
                value={umrahForm[field.key as keyof typeof umrahForm]}
                onChange={(event) =>
                  setUmrahForm((prev) => ({
                    ...prev,
                    [field.key]: event.target.value,
                  }))
                }
                className="rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white"
                required={field.key === "name" || field.key === "phone"}
              />
            ))}
            <textarea
              placeholder="Message / Special requests"
              value={umrahForm.message}
              onChange={(event) =>
                setUmrahForm((prev) => ({ ...prev, message: event.target.value }))
              }
              className="rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white"
              rows={4}
            />
            <button
              type="submit"
              className="rounded-full bg-yellow-400 text-black font-semibold px-6 py-3"
            >
              Submit Umrah Inquiry
            </button>
            {umrahStatus && (
              <p className="text-sm text-white/70">{umrahStatus}</p>
            )}
          </form>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8" id="tour-inquiry">
          <h2 className="text-2xl font-semibold">Tour Inquiry Form</h2>
          <p className="text-sm text-white/70 mt-2">
            Planning Turkey or Baku? Share your travel dates and we will send a
            tailored itinerary with pricing.
          </p>
          <form onSubmit={submitTour} className="mt-6 grid gap-4">
            {[
              { label: "Full Name", key: "name" },
              { label: "Phone Number", key: "phone" },
              { label: "Email", key: "email" },
              { label: "City", key: "city" },
              { label: "Number of Persons", key: "persons" },
              { label: "Destination (Turkey/Baku)", key: "destination" },
              { label: "Preferred Travel Month", key: "travelMonth" },
            ].map((field) => (
              <input
                key={field.key}
                placeholder={field.label}
                value={tourForm[field.key as keyof typeof tourForm]}
                onChange={(event) =>
                  setTourForm((prev) => ({
                    ...prev,
                    [field.key]: event.target.value,
                  }))
                }
                className="rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white"
                required={field.key === "name" || field.key === "phone"}
              />
            ))}
            <textarea
              placeholder="Message / Special requests"
              value={tourForm.message}
              onChange={(event) =>
                setTourForm((prev) => ({ ...prev, message: event.target.value }))
              }
              className="rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white"
              rows={4}
            />
            <button
              type="submit"
              className="rounded-full bg-yellow-400 text-black font-semibold px-6 py-3"
            >
              Submit Tour Inquiry
            </button>
            {tourStatus && (
              <p className="text-sm text-white/70">{tourStatus}</p>
            )}
          </form>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#111111] p-8 md:p-12">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">Ready to Plan Your Journey?</h2>
            <p className="text-white/70">
              Barakah Travels delivers Umrah packages from Pakistan, Turkey tour
              packages, and Baku tour packages designed around your comfort.
              Speak with our advisors for transparent pricing and fast visas.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/923183548299"
              className="rounded-full bg-yellow-400 text-black font-semibold px-6 py-3"
            >
              WhatsApp Concierge
            </a>
            <Link
              href="/contact"
              className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white"
            >
              Contact Office
            </Link>
          </div>
        </div>
      </section>

      <section className="text-sm text-white/70 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-white">
          Umrah Packages from Pakistan, Turkey & Baku Tours
        </h2>
        <p className="mt-4">
          Barakah Travels specializes in premium Umrah packages from Pakistan
          with visa facilitation, five-star hotel options near Haram, and luxury
          transport. Our Turkey tour packages include Istanbul, Bursa, and
          Cappadocia experiences with concierge support throughout your journey.
          We also curate Baku tour packages with boutique stays and guided city
          tours.
        </p>
      </section>
    </main>
  );
}
