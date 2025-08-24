"use client";
import Link from "next/link";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// ...existing code...


// --- Shared Types ---
interface Testimonial {
  name: string;
  city?: string;
  rating: number;
  review: string;
}

// --- Destination Card Component ---
type DestinationCardProps = {
  title: string;
  image: string;
  description: string;
  link: string;
};

function DestinationCard({ title, image, description, link }: DestinationCardProps) {
  return (
    <div className="card flex flex-col items-center p-0 overflow-hidden group hover:shadow-lg transition-shadow duration-200">
      <div className="w-full h-40 overflow-hidden">
  <Image src={image} alt={title} width={400} height={160} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-200" />
      </div>
      <div className="p-4 flex flex-col items-center flex-1">
        <h3 className="text-xl font-bold text-primary mb-2 font-heading text-center">{title}</h3>
        <p className="text-center text-secondary mb-4 flex-1">{description}</p>
        <Link href={link} className="btn bg-primary text-white w-full">Explore</Link>
      </div>
    </div>
  );
}

// --- Testimonials Hook ---
function useTestimonials() {
  interface Testimonial {
    name: string;
    city?: string;
    rating: number;
    review: string;
  }
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load testimonials");
        setLoading(false);
      });
  }, []);
  return { testimonials, loading, error };
}


// --- Destination Card Component ---

function ReviewsSlider() {
  // Fetch client reviews from DB
  const [clientReviews, setClientReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        setClientReviews(data);
        setLoading(false);
      });
  }, []);
  // Fake reviews for fallback/demo
  const fakeReviews = [
    { name: "Ayesha Siddiqui", city: "Lahore", rating: 5, review: "Barakah Travels made our Umrah journey so smooth and stress-free. The hotel was very close to Haram and the staff was always available for help. Highly recommended!" },
    { name: "Imran Qureshi", city: "Karachi", rating: 4, review: "Excellent visa guidance and quick response on WhatsApp. The transport arrangements were perfect. Will book again!" },
    { name: "Fatima Noor", city: "Islamabad", rating: 5, review: "Very professional team. They handled all our hotel and flight bookings. Thank you for making our Umrah memorable!" },
    { name: "Ahmed Raza", city: "Faisalabad", rating: 5, review: "I was worried about the process but Barakah Travels guided me at every step. Everything was delivered as promised." },
    { name: "Sana Khalid", city: "Multan", rating: 4, review: "Great service and very responsive team. The package was affordable and included everything we needed." },
    { name: "Bilal Hussain", city: "Peshawar", rating: 5, review: "Best Umrah experience! The team was always available and the hotel was excellent. Will recommend to friends and family." },
  ];
  // Combine client reviews (latest first) and fake reviews
  const reviews = [...clientReviews, ...fakeReviews];
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i === 0 ? reviews.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === reviews.length - 1 ? 0 : i + 1));
  if (loading) return <div>Loading reviews...</div>;
  const r = reviews[index];
  return (
    <div className="max-w-xl mx-auto flex flex-col items-center">
      <div className="card w-full mb-4">
        <div className="flex items-center mb-2 justify-center">
          {Array.from({ length: r.rating || 5 }).map((_, idx) => (
            <span key={idx} className="text-yellow-400 text-lg">★</span>
          ))}
          {Array.from({ length: 5 - (r.rating || 5) }).map((_, idx) => (
            <span key={idx} className="text-gray-300 text-lg">★</span>
          ))}
        </div>
        <div className="mb-2 text-lg italic text-secondary-dark text-center">“{r.review}”</div>
        <div className="font-bold text-primary text-center">— {r.name}{r.city ? `, ${r.city}` : ''}</div>
      </div>
      <div className="flex gap-4">
        <button onClick={prev} className="btn px-4 py-1" aria-label="Previous Review">&#8592; Prev</button>
        <button onClick={next} className="btn px-4 py-1" aria-label="Next Review">Next &#8594;</button>
      </div>
      <div className="mt-2 text-xs text-gray-400">{index + 1} / {reviews.length}</div>
    </div>
  );
}


export default function Home() {
  // const { testimonials, loading, error } = useTestimonials();
  return (
    <main>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-primary-light to-primary-dark rounded-2xl shadow-card overflow-hidden mb-12 mt-8">
  <Image src="/umrah2.png" alt="Umrah" fill className="absolute inset-0 w-full h-full object-cover opacity-30" style={{ filter: 'blur(1px) grayscale(10%)' }} />
        <div className="relative z-10 text-center py-16 px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary drop-shadow mb-4 font-heading">Barakah Travels</h1>
          <p className="mb-6 text-xl md:text-2xl text-secondary-dark font-medium drop-shadow">Your trusted partner for Umrah packages, visas, and travel services.</p>
          <a className="btn text-lg" href="https://wa.me/923183548299">Get Your Quote on WhatsApp</a>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-primary font-heading mb-8">Client Reviews</h2>
        <ReviewsSlider />
        <div className="text-center text-sm text-gray-500 mt-4">Only signed-in users can submit reviews. All reviews are moderated before display.</div>
      </section>

      {/* Popular Destinations Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-primary font-heading mb-8">Popular Destinations</h2>
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5 max-w-7xl mx-auto">
          <DestinationCard
            title="Umrah"
            image="/umrah2.png"
            description="Spiritual journeys to Makkah & Madinah with full support."
            link="/packages"
          />
          <DestinationCard
            title="Dubai"
            image="/dubai.jpg"
            description="Luxury tours, shopping, and desert adventures in Dubai."
            link="/contact"
          />
          <DestinationCard
            title="Turkey"
            image="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&q=80" // Istanbul, Hagia Sophia
            description="Explore Istanbul, Cappadocia, and Turkish culture."
            link="/contact"
          />
          <DestinationCard
            title="Thailand"
            image="/thailand.jpg"
            description="Beautiful beaches, islands, and vibrant city life."
            link="/contact"
          />
          <DestinationCard
            title="Baku"
            image="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=400&q=80" // Baku, Flame Towers
            description="Discover Azerbaijan’s capital and the Caspian coast."
            link="/contact"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="grid gap-8 md:grid-cols-2 mb-16">
        <div className="card flex flex-col items-start">
          <h2 className="text-2xl font-bold mb-2 text-primary font-heading">Umrah Packages</h2>
          <p className="mb-2">Visa, hotels, transfers, and Ziyārāt included.</p>
          <Link href="/packages" className="btn bg-primary text-white mt-auto">View Packages</Link>
        </div>
        <div className="card flex flex-col items-start">
          <h2 className="text-2xl font-bold mb-2 text-primary font-heading">Visa Guidance</h2>
          <p className="mb-2">Expert help for Umrah, Tourist, Family, and Business visas.</p>
          <Link href="/contact" className="btn bg-primary text-white mt-auto">Contact Us</Link>
        </div>
      </section>



      {/* Quote Form Section */}
      <section className="bg-white rounded-2xl shadow-card p-8 mb-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-primary font-heading text-center">Get a Custom Quote</h2>
        <QuoteForm />
      </section>
        {/* Newsletter Signup Section */}
        <section className="py-12 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-center mb-4 text-primary font-heading">Sign up for our Newsletter</h2>
          <NewsletterSignup />
        </section>
    </main>
  );
}

// --- Custom Quote Form Component ---
// --- Newsletter Signup Component ---
function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      setStatus("Subscribed! You'll get updates and offers.");
      setEmail("");
    } else {
      setStatus("Failed to subscribe. Try again.");
    }
  }

  return (
    <form className="flex flex-col gap-4 w-full max-w-md items-center" onSubmit={handleSubmit}>
      <div className="flex w-full gap-4">
        <input
          type="email"
          className="input flex-1"
          placeholder="Enter your email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn bg-primary text-white px-6 py-2 rounded">
          Subscribe
        </button>
      </div>
      {status && <div className="mt-2 text-green-600 font-semibold w-full text-center">{status}</div>}
    </form>
  );
}

function QuoteForm() {
  const [form, setForm] = React.useState({
    name: '',
    phone: '',
    email: '',
    service: 'Umrah',
    from: '',
    to: '',
    notes: '',
  });
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState('');
  const [error, setError] = React.useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to send request');
      setSuccess('Your inquiry has been sent! We will contact you soon.');
      setForm({ name: '', phone: '', email: '', service: 'Umrah', from: '', to: '', notes: '' });
    } catch {
      setError('Failed to send request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form grid gap-4" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-4">
        <input type="text" name="name" placeholder="Full Name" required className="input" value={form.name} onChange={handleChange} />
        <input type="tel" name="phone" placeholder="WhatsApp Number" required className="input" value={form.phone} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required className="input" value={form.email} onChange={handleChange} />
        <select name="service" required className="input" value={form.service} onChange={handleChange}>
          <option value="Umrah">Umrah Package (Visa Included)</option>
          <option value="Flights">Flights</option>
          <option value="Hotels">Hotels</option>
          <option value="Transport">Transport & Ziyārāt</option>
          <option value="Visa">Other Visa Guidance</option>
        </select>
        <input type="date" name="from" placeholder="From Date" required className="input" value={form.from} onChange={handleChange} />
        <input type="date" name="to" placeholder="To Date" className="input" value={form.to} onChange={handleChange} />
      </div>

      <textarea name="notes" rows={4} placeholder="Tell us your city, passengers, hotel preference, and other details" className="input mb-4" value={form.notes} onChange={handleChange} />
      <button type="submit" className="btn w-full" disabled={loading}>{loading ? 'Sending...' : 'Send Request'}</button>
      {success && <div className="text-green-600 text-center mt-2">{success}</div>}
      {error && <div className="text-red-600 text-center mt-2">{error}</div>}
    </form>
  );
}

