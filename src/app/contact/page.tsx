export default function Contact() {
  return (
    <main className="section">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-6">
          Reach out for Umrah packages, Turkey, or Baku inquiries. We reply
          promptly on WhatsApp.
        </p>
        <div className="card space-y-3">
          <p>
            WhatsApp:{" "}
            <a href="https://wa.me/923183548299" className="text-primary font-semibold">
              +92 318 3548299
            </a>
          </p>
          <p>
            Call:{" "}
            <a href="tel:+923400799777" className="text-primary font-semibold">
              +92 340 0799777
            </a>
          </p>
          <p>
            Email:{" "}
            <a href="mailto:info@barakahtravels.online" className="text-primary font-semibold">
              info@barakahtravels.online
            </a>
          </p>
          <p className="text-sm text-gray-500">
            Or use the inquiry form on the Home page for a custom quote.
          </p>
        </div>
      </div>
    </main>
  );
}
