import Link from "next/link";

export default function Contact() {
  return (
    <main className="space-y-10">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
        <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
          Contact Concierge
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold mt-3">
          Let&apos;s Plan Your Premium Journey
        </h1>
        <p className="text-white/70 mt-4 max-w-2xl">
          Reach out to Barakah Travels for Umrah packages from Pakistan, Turkey
          tour packages, or Baku tour packages. Our advisors respond quickly with
          tailored itineraries and transparent pricing.
        </p>
        <div className="grid gap-4 mt-6 text-sm text-white/80">
          <p>
            WhatsApp:{" "}
            <a href="https://wa.me/923183548299" className="text-yellow-300">
              +92 318 3548299
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+923400799777" className="text-yellow-300">
              +92 340 0799777
            </a>
          </p>
          <p>
            Email:{" "}
            <a href="mailto:info@barakahtravels.online" className="text-yellow-300">
              info@barakahtravels.online
            </a>
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="https://wa.me/923183548299"
            className="rounded-full bg-yellow-400 text-black font-semibold px-6 py-3"
          >
            Chat on WhatsApp
          </a>
          <Link
            href="/#umrah-inquiry"
            className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white"
          >
            Submit Inquiry Form
          </Link>
        </div>
      </section>
    </main>
  );
}
