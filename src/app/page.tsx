"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Ayesha Siddiqui",
    city: "Lahore",
    rating: 5,
    review:
      "Barakah Travels planned a premium Umrah experience with seamless visas, hotels, and support.",
  },
  {
    name: "Imran Qureshi",
    city: "Karachi",
    rating: 5,
    review:
      "Their Turkey itinerary felt luxury-grade. The team handled every detail perfectly.",
  },
  {
    name: "Fatima Noor",
    city: "Islamabad",
    rating: 5,
    review:
      "Baku tour was elegant, punctual, and very well organized. Highly recommend them.",
  },
];

function TestimonialsSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <div className="max-w-3xl mx-auto bg-white/5 border border-yellow-500/20 rounded-3xl p-10 text-center text-white shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
      <div className="flex justify-center mb-4 text-yellow-400 text-xl">
        {Array.from({ length: current.rating }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>
      <p className="text-lg text-white/80 mb-6 leading-relaxed">
        “{current.review}”
      </p>
      <p className="font-semibold text-yellow-300">
        — {current.name}, {current.city}
      </p>
    </div>
  );
}

function InquiryForm({
  title,
  description,
  type,
}: {
  title: string;
  description: string;
  type: "Umrah" | "Tour";
}) {
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    travelDate: "",
    persons: "2",
    destination: "",
    message: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("Submitting...");
    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, type }),
    });
    if (res.ok) {
      setStatus("Thanks! We will contact you within 30 minutes.");
      setForm({
        name: "",
        phone: "",
        email: "",
        city: "",
        travelDate: "",
        persons: "2",
        destination: "",
        message: "",
      });
    } else {
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
      <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/70 mb-6">{description}</p>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-white/60"
            required
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="WhatsApp Number"
            className="rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-white/60"
            required
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-white/60"
          />
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className="rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-white/60"
          />
          <input
            name="travelDate"
            value={form.travelDate}
            onChange={handleChange}
            placeholder="Preferred Travel Date"
            className="rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-white/60"
          />
          <input
            name="persons"
            value={form.persons}
            onChange={handleChange}
            placeholder="Number of Persons"
            className="rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-white/60"
          />
        </div>
        <input
          name="destination"
          value={form.destination}
          onChange={handleChange}
          placeholder={type === "Umrah" ? "Package preference" : "Destination interest"}
          className="rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-white/60"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us more about your requirements"
          rows={4}
          className="rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-white/60"
        />
        <button
          type="submit"
          className="w-full md:w-auto px-8 py-3 rounded-full bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition"
        >
          Submit Inquiry
        </button>
        {status && <p className="text-sm text-yellow-200">{status}</p>}
      </form>
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-[#0b1220] text-white">
      <section className="relative overflow-hidden rounded-[32px] mt-6 md:mt-10 mb-24 border border-white/10">
        <div className="absolute inset-0">
          <Image
            src="/umrah2.png"
            alt="Premium Umrah Packages"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b1220] via-[#0b1220]/80 to-[#3b2b10]" />
        </div>
        <div className="relative z-10 px-6 md:px-16 py-20 md:py-28 text-center">
          <p className="uppercase tracking-[0.4em] text-yellow-400 text-xs mb-4">
            Premium Umrah & International Tours
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Crafted Luxury Travel Experiences for Umrah, Turkey & Baku
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10">
            Barakah Travels brings you curated Umrah packages from Pakistan,
            signature Turkey tour packages, and elite Baku itineraries with
            24/7 concierge support.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/923183548299"
              className="px-8 py-3 rounded-full bg-yellow-500 text-black font-semibold shadow-lg hover:bg-yellow-400 transition"
            >
              WhatsApp for Latest Packages
            </a>
            <Link
              href="#inquiry"
              className="px-8 py-3 rounded-full border border-white/40 text-white hover:border-yellow-400 hover:text-yellow-300 transition"
            >
              Start Your Inquiry
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3 text-left">
            {[
              "500+ pilgrims and travelers served worldwide",
              "Luxury hotels within walking distance of Haram",
              "Dedicated visa & concierge team for every journey",
            ].map((text) => (
              <div
                key={text}
                className="bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <p className="text-sm text-white/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="grid gap-10 md:grid-cols-3 text-center">
          {[
            { title: "Umrah Elegance", desc: "Visa, hotels, transport, and spiritual guidance in one seamless journey." },
            { title: "Turkey Signature Tours", desc: "Boutique stays, curated excursions, and premium city itineraries." },
            { title: "Baku Luxury Escapes", desc: "Caspian sunsets, skyline stays, and bespoke cultural experiences." },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            >
              <h3 className="text-xl font-semibold text-yellow-300 mb-3">
                {item.title}
              </h3>
              <p className="text-white/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Popular Destinations
          </h2>
          <Link href="/packages" className="text-yellow-300 uppercase text-xs tracking-[0.3em]">
            View all packages
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Umrah", image: "/umrah2.png", subtitle: "Premium 10-21 night programs" },
            { title: "Turkey", image: "/turkey.jpg", subtitle: "Istanbul, Cappadocia, Bursa" },
            { title: "Baku", image: "/baku.jpg", subtitle: "Caspian coast & heritage" },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            >
              <div className="relative h-56">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-yellow-300 mb-2">
                  {item.title}
                </h3>
                <p className="text-white/70 mb-4">{item.subtitle}</p>
                <Link
                  href="#inquiry"
                  className="inline-flex items-center gap-2 text-yellow-300 font-semibold"
                >
                  Explore Packages →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Testimonials from Premium Travelers
        </h2>
        <TestimonialsSlider />
      </section>

      <section id="inquiry" className="max-w-6xl mx-auto px-6 mb-24">
        <div className="grid gap-8 md:grid-cols-2">
          <InquiryForm
            title="Umrah Inquiry Form"
            description="Share your Umrah preferences and receive a curated itinerary within hours."
            type="Umrah"
          />
          <InquiryForm
            title="Tour Inquiry Form"
            description="Tell us your preferred destination and we will tailor the perfect tour."
            type="Tour"
          />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24 text-white/70 text-sm leading-relaxed">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
          Premium Umrah Packages from Pakistan & Luxury Tours Abroad
        </h2>
        <p className="mb-4">
          Barakah Travels specializes in Umrah packages from Pakistan with
          premium hotels near Haram, fast visa processing, and private transport
          between Makkah and Madinah. Our team also curates Turkey tour packages
          and Baku tour packages with luxury stays, guided experiences, and
          bespoke itineraries.
        </p>
        <p>
          Whether you seek a spiritual Umrah journey or an international escape,
          our travel concierge ensures a refined, seamless, and unforgettable
          experience.
        </p>
      </section>
    </main>
  );
}
