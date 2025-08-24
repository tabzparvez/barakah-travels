
export default function PrivacyPolicy() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-primary mb-6 font-heading text-center">Privacy Policy</h1>
      <p className="mb-6 text-lg text-gray-700 text-center">At Barakah Travels, we respect your privacy and are committed to protecting your personal data.</p>

      <section className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">Information We Collect</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Contact details you provide (name, email, phone number)</li>
          <li>Booking information (passport details if required for Umrah/Hajj/Travel)</li>
          <li>Payment details processed securely via third-party providers</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">How We Use Your Information</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>To process your inquiries and bookings</li>
          <li>To improve our services and customer support</li>
          <li>To comply with legal and regulatory requirements</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">Data Sharing</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>We do not sell your data</li>
          <li>We only share information with service providers (airlines, hotels, visa services) strictly for completing your booking</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">Cookies &amp; Analytics</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Our website may use cookies and analytics tools to improve performance and user experience</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">Data Security &amp; Retention</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>We implement security measures to protect your data</li>
          <li>Personal data is retained only as long as necessary to fulfill bookings and legal obligations</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">Contact Us</h2>
        <p className="text-gray-700">For any questions about this policy, email us at: <a href="mailto:info@barakahtravels.online" className="text-primary underline">info@barakahtravels.online</a></p>
      </section>
    </main>
  );
}
