
export default function About() {
  return (
    <main className="section max-w-5xl mx-auto space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">
          About Barakah Travels
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          We deliver faith-led journeys with reliable visa support, hotel
          coordination, and caring guidance for pilgrims across Pakistan.
        </p>
      </div>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="card space-y-3">
          <h2 className="text-2xl font-semibold text-primary">Who We Are</h2>
          <p className="text-sm text-gray-600">
            Barakah Travels is a dedicated Umrah and travel agency focused on
            providing safe, transparent, and spiritually fulfilling journeys.
            Our team has helped hundreds of pilgrims travel with confidence and
            comfort.
          </p>
        </div>
        <div className="card space-y-3">
          <h2 className="text-2xl font-semibold text-primary">
            What Makes Us Different
          </h2>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Visa processing updates shared in real time.</li>
            <li>• Hotels within walking distance of Haram.</li>
            <li>• 24/7 WhatsApp support before and during travel.</li>
            <li>• Clear pricing with no hidden fees.</li>
          </ul>
        </div>
      </section>

      <section className="card space-y-4">
        <h2 className="text-2xl font-semibold text-primary">Our Process</h2>
        <div className="grid gap-4 md:grid-cols-4 text-sm text-gray-600">
          <div>
            <p className="font-semibold text-secondary">1. Consult</p>
            <p>Understand your preferred dates and budget.</p>
          </div>
          <div>
            <p className="font-semibold text-secondary">2. Plan</p>
            <p>Share visa, hotel, and transport options fast.</p>
          </div>
          <div>
            <p className="font-semibold text-secondary">3. Confirm</p>
            <p>Lock in flights, rooms, and documentation.</p>
          </div>
          <div>
            <p className="font-semibold text-secondary">4. Support</p>
            <p>Stay connected with your travel advisor 24/7.</p>
          </div>
        </div>
      </section>

      <section className="card space-y-4">
        <h2 className="text-2xl font-semibold text-primary">Cities Served</h2>
        <p className="text-sm text-gray-600">
          We provide Umrah services for pilgrims traveling from Karachi, Lahore,
          Islamabad, Multan, and other major cities across Pakistan.
        </p>
      </section>
    </main>
  );
}
