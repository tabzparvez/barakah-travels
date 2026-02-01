import Link from "next/link";

export const metadata = {
  title: "Umrah Packages from Karachi | Visa, Hotels & Transport – Barakah Travels",
  description:
    "Affordable Umrah packages from Karachi with visa, hotels near Haram, flights and transport. Book your Umrah with Barakah Travels Pakistan.",
};

export default function Page() {
  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Umrah Packages from Karachi
      </h1>

      <p className="text-lg mb-6 text-center">
        Complete Umrah visa, hotel accommodation near Haram, return flights and
        transport between Makkah and Madinah.
      </p>

      <div className="space-y-6 text-lg leading-8">
        <h2 className="text-2xl font-semibold">What’s Included</h2>
        <ul className="list-disc ml-6">
          <li>Umrah Visa Processing</li>
          <li>Hotels near Masjid al Haram & Masjid an Nabawi</li>
          <li>Return Flights from Karachi</li>
          <li>Transport Makkah to Madinah</li>
          <li>Guidance for first-time pilgrims</li>
        </ul>

        <h2 className="text-2xl font-semibold">Hotel Options</h2>
        <p>3 Star, 4 Star and 5 Star options within walking distance of Haram.</p>

        <h2 className="text-2xl font-semibold">Why Choose Barakah Travels?</h2>
        <p>
          Trusted Umrah travel agency in Karachi with transparent pricing and
          fast visa processing.
        </p>

        <h2 className="text-2xl font-semibold">FAQs</h2>
        <p><b>How much does Umrah cost from Karachi?</b><br/>Depends on hotel & dates. Contact us on WhatsApp.</p>
        <p><b>Is visa included?</b><br/>Yes, complete visa processing included.</p>
        <p><b>How many days required?</b><br/>10, 15 and 21 days packages available.</p>
      </div>

      <div className="text-center mt-10">
        <Link href="/contact" className="bg-yellow-600 text-white px-6 py-3 rounded-lg">
          Contact Us for Latest Prices
        </Link>
      </div>
    </div>
  );
}
