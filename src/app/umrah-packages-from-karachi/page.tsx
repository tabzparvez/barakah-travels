import Link from "next/link";

export const metadata = {
  title: "Umrah Packages from Karachi | Visa, Hotels & Transport – Barakah Travels",
  description:
    "Affordable Umrah packages from Karachi with visa, hotels near Haram, flights and transport between Makkah and Madinah.",
};

export default function Page() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">

      <section className="mb-14 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
          Umrah Packages from Karachi
        </h1>

        <p className="text-lg text-secondary max-w-3xl mx-auto">
          Complete Umrah visa, hotel accommodation near Haram, return flights
          and transport between Makkah and Madinah.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm font-semibold text-primary">
          <span>✔ Visa Included</span>
          <span>✔ Hotels Near Haram</span>
          <span>✔ 24/7 WhatsApp Support</span>
        </div>
      </section>

      <section className="max-w-4xl mx-auto text-sm text-secondary leading-relaxed space-y-6">
        <h2 className="text-2xl font-bold text-primary">What’s Included</h2>
        <ul className="list-disc pl-5">
          <li>Umrah Visa Processing</li>
          <li>Hotels near Masjid al Haram & Masjid an Nabawi</li>
          <li>Return Flights from Karachi</li>
          <li>Transport Makkah to Madinah</li>
          <li>Guidance for first-time pilgrims</li>
        </ul>

        <h2 className="text-2xl font-bold text-primary">Hotel Options</h2>
        <p>3 Star, 4 Star and 5 Star hotels within walking distance of Haram.</p>

        <h2 className="text-2xl font-bold text-primary">Why Choose Barakah Travels?</h2>
        <p>
          Trusted Umrah travel agency in Karachi with transparent pricing and fast visa processing.
        </p>

        <h2 className="text-2xl font-bold text-primary">FAQs</h2>
        <p><b>How much does Umrah cost from Karachi?</b><br/>Depends on hotel & dates. Contact us on WhatsApp.</p>
        <p><b>Is visa included?</b><br/>Yes, complete visa processing included.</p>
        <p><b>How many days required?</b><br/>10, 15 and 21 days packages available.</p>
      </section>

      <div className="text-center mt-10">
        <Link
          href="/contact"
          className="bg-yellow-600 text-white px-6 py-3 rounded-lg"
        >
          Contact Us for Latest Prices
        </Link>
      </div>

    </main>
  );
}
