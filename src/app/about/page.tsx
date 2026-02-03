
export default function About() {
  return (
    <main className="section max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary mb-3">
          About Barakah Travels
        </h1>
        <p className="text-gray-600">
          A trusted partner for Umrah travelers across Pakistan.
        </p>
      </div>

      <div className="grid gap-6">
        <section className="card">
          <h2 className="text-2xl font-semibold text-primary mb-3">
            Who We Are
          </h2>
          <p className="text-gray-700">
            Barakah Travels is a Pakistan-based travel company focused on
            Umrah journeys. We support pilgrims with guidance, planning, and
            transparent communication from inquiry to return.
          </p>
        </section>

        <section className="card">
          <h2 className="text-2xl font-semibold text-primary mb-3">
            What We Do
          </h2>
          <p className="text-gray-700 mb-4">
            Our team coordinates visa processing, hotels near Haram, flight
            options, and transport so families can travel with ease.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Umrah visa guidance and documentation support</li>
            <li>Hotel options close to Haram and Masjid Nabawi</li>
            <li>Flight and ground transport coordination</li>
            <li>Continuous WhatsApp support throughout the journey</li>
          </ul>
        </section>

        <section className="card">
          <h2 className="text-2xl font-semibold text-primary mb-3">
            Trust &amp; Peace of Mind
          </h2>
          <p className="text-gray-700">
            We are committed to clear pricing, dependable timelines, and
            compassionate service. Every itinerary is designed to keep your
            focus on worship while we handle the logistics.
          </p>
        </section>
      </div>
    </main>
  );
}
