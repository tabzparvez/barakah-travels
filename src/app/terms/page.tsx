
export default function Terms() {
  return (
    <main className="section max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-primary">Terms & Conditions</h1>
      <div className="bg-white rounded-2xl shadow-card p-8 mb-8">
        <p className="mb-6 text-lg text-gray-700">By using the services of Barakah Travels, you agree to the following terms:</p>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-primary-dark">Bookings & Confirmation</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>All bookings are subject to availability and confirmation from airlines, hotels, and service providers.</li>
            <li>Prices may vary depending on currency exchange rates, airline surcharges, and seasonal changes.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-primary-dark">Payments</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Full or partial payment may be required at the time of booking.</li>
            <li>Payments must be made through the approved methods listed on our website.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-primary-dark">Cancellations & Refunds</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Cancellation policies vary depending on airlines, hotels, and visa providers.</li>
            <li>Refunds (if applicable) will be processed as per the policies of the respective service providers.</li>
            <li>Barakah Travels is not responsible for delays in refund processing caused by third-party providers.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-primary-dark">Responsibilities</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Barakah Travels acts as an agent between the customer and airlines/hotels/visa providers.</li>
            <li>We are not responsible for changes in flight schedules, visa rejections, or hotel policies.</li>
            <li>Customers are responsible for ensuring valid travel documents (passport, visa, health certificates).</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-primary-dark">Liability</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Barakah Travels is not liable for any loss, injury, delay, or additional costs arising from circumstances beyond our control (such as airline delays, natural disasters, political issues).</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-primary-dark">Contact</h2>
          <p className="text-gray-700">For questions regarding these terms, please contact us at <a href="mailto:info@barakahtravels.online" className="text-primary underline">info@barakahtravels.online</a></p>
        </section>
      </div>
    </main>
  );
}
