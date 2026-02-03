import InquiryForm from "@/components/InquiryForm";

export default function Contact() {
  return (
    <main className="section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Umrah Inquiry & Contact
          </h1>
          <p className="text-gray-600">
            Share your requirements and our team will respond quickly with the
            best options.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <InquiryForm
            title="Umrah Inquiry Form"
            description="Tell us your preferred dates, cities, and group size."
          />
          <div className="space-y-6">
            <div className="card space-y-3">
              <h2 className="text-lg font-semibold text-primary">
                Contact Directly
              </h2>
              <p>
                WhatsApp:{" "}
                <a
                  href="https://wa.me/923183548299"
                  className="text-primary font-semibold"
                >
                  +92 318 3548299
                </a>
              </p>
              <p>
                Call:{" "}
                <a
                  href="tel:+923400799777"
                  className="text-primary font-semibold"
                >
                  +92 340 0799777
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@barakahtravels.online"
                  className="text-primary font-semibold"
                >
                  info@barakahtravels.online
                </a>
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-primary mb-3">
                Why Pilgrims Trust Us
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>✔ Visa processing guidance within 48 hours</li>
                <li>✔ Hotels within 300m of Haram and Masjid Nabawi</li>
                <li>✔ 24/7 WhatsApp support before and during travel</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
