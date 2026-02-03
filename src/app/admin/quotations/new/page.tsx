"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type FlightDetails = {
  date: string;
  departure: string;
  arrival: string;
  airline: string;
  flightNumber: string;
  routeType: string;
};

type HotelDetails = {
  name: string;
  distance: string;
  roomType: string;
  nights: string;
};

type TransportDetails = {
  type: string;
  airportToMakkah: string;
  makkahToMadinah: string;
  madinahToAirport: string;
};

export default function NewQuotationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [persons, setPersons] = useState("2");

  const [goingFlight, setGoingFlight] = useState<FlightDetails>({
    date: "",
    departure: "",
    arrival: "",
    airline: "",
    flightNumber: "",
    routeType: "Direct",
  });
  const [returnFlight, setReturnFlight] = useState<FlightDetails>({
    date: "",
    departure: "",
    arrival: "",
    airline: "",
    flightNumber: "",
    routeType: "Direct",
  });

  const [makkahHotel, setMakkahHotel] = useState<HotelDetails>({
    name: "",
    distance: "",
    roomType: "",
    nights: "",
  });
  const [madinahHotel, setMadinahHotel] = useState<HotelDetails>({
    name: "",
    distance: "",
    roomType: "",
    nights: "",
  });

  const [transport, setTransport] = useState<TransportDetails>({
    type: "Private",
    airportToMakkah: "",
    makkahToMadinah: "",
    madinahToAirport: "",
  });

  const [price, setPrice] = useState("0");
  const [inclusions, setInclusions] = useState("");
  const [exclusions, setExclusions] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const name = searchParams.get("name");
    const phoneParam = searchParams.get("phone");
    const emailParam = searchParams.get("email");
    if (name) setClientName(name);
    if (phoneParam) setPhone(phoneParam);
    if (emailParam) setEmail(emailParam);
  }, [searchParams]);

  const handleSave = () => {
    const id = `QT-${Date.now()}`;
    const data = {
      id,
      clientName,
      phone,
      email,
      persons: Number(persons || 0),
      goingFlight,
      returnFlight,
      makkahHotel,
      madinahHotel,
      transport,
      price: Number(price || 0),
      inclusions,
      exclusions,
      notes,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(`quotation-${id}`, JSON.stringify(data));
    router.push(`/admin/quotations/${id}`);
  };

  return (
    <main className="section max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">New Quotation</h1>
        <p className="text-sm text-gray-500">
          Capture detailed Umrah requirements for your client.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-primary mb-4">Client</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <input className="input" placeholder="Name" value={clientName} onChange={(e) => setClientName(e.target.value)} />
            <input className="input" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input className="input" placeholder="Persons" type="number" value={persons} onChange={(e) => setPersons(e.target.value)} />
          </div>
          <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-primary mb-4">Flights (Going)</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <input className="input" placeholder="Date" type="date" value={goingFlight.date} onChange={(e) => setGoingFlight({ ...goingFlight, date: e.target.value })} />
            <input className="input" placeholder="Departure airport" value={goingFlight.departure} onChange={(e) => setGoingFlight({ ...goingFlight, departure: e.target.value })} />
            <input className="input" placeholder="Arrival airport" value={goingFlight.arrival} onChange={(e) => setGoingFlight({ ...goingFlight, arrival: e.target.value })} />
            <input className="input" placeholder="Airline" value={goingFlight.airline} onChange={(e) => setGoingFlight({ ...goingFlight, airline: e.target.value })} />
            <input className="input" placeholder="Flight number" value={goingFlight.flightNumber} onChange={(e) => setGoingFlight({ ...goingFlight, flightNumber: e.target.value })} />
            <select className="input" value={goingFlight.routeType} onChange={(e) => setGoingFlight({ ...goingFlight, routeType: e.target.value })}>
              <option>Direct</option>
              <option>Connecting</option>
            </select>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-primary mb-4">Flights (Return)</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <input className="input" placeholder="Date" type="date" value={returnFlight.date} onChange={(e) => setReturnFlight({ ...returnFlight, date: e.target.value })} />
            <input className="input" placeholder="Departure airport" value={returnFlight.departure} onChange={(e) => setReturnFlight({ ...returnFlight, departure: e.target.value })} />
            <input className="input" placeholder="Arrival airport" value={returnFlight.arrival} onChange={(e) => setReturnFlight({ ...returnFlight, arrival: e.target.value })} />
            <input className="input" placeholder="Airline" value={returnFlight.airline} onChange={(e) => setReturnFlight({ ...returnFlight, airline: e.target.value })} />
            <input className="input" placeholder="Flight number" value={returnFlight.flightNumber} onChange={(e) => setReturnFlight({ ...returnFlight, flightNumber: e.target.value })} />
            <select className="input" value={returnFlight.routeType} onChange={(e) => setReturnFlight({ ...returnFlight, routeType: e.target.value })}>
              <option>Direct</option>
              <option>Connecting</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-4">Makkah Hotel</h2>
            <input className="input" placeholder="Name" value={makkahHotel.name} onChange={(e) => setMakkahHotel({ ...makkahHotel, name: e.target.value })} />
            <input className="input" placeholder="Distance from Haram" value={makkahHotel.distance} onChange={(e) => setMakkahHotel({ ...makkahHotel, distance: e.target.value })} />
            <input className="input" placeholder="Room type" value={makkahHotel.roomType} onChange={(e) => setMakkahHotel({ ...makkahHotel, roomType: e.target.value })} />
            <input className="input" placeholder="Nights" value={makkahHotel.nights} onChange={(e) => setMakkahHotel({ ...makkahHotel, nights: e.target.value })} />
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-4">Madinah Hotel</h2>
            <input className="input" placeholder="Name" value={madinahHotel.name} onChange={(e) => setMadinahHotel({ ...madinahHotel, name: e.target.value })} />
            <input className="input" placeholder="Distance from Masjid Nabawi" value={madinahHotel.distance} onChange={(e) => setMadinahHotel({ ...madinahHotel, distance: e.target.value })} />
            <input className="input" placeholder="Room type" value={madinahHotel.roomType} onChange={(e) => setMadinahHotel({ ...madinahHotel, roomType: e.target.value })} />
            <input className="input" placeholder="Nights" value={madinahHotel.nights} onChange={(e) => setMadinahHotel({ ...madinahHotel, nights: e.target.value })} />
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-primary mb-4">Transport</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <select className="input" value={transport.type} onChange={(e) => setTransport({ ...transport, type: e.target.value })}>
              <option>Private</option>
              <option>Sharing</option>
            </select>
            <input className="input" placeholder="Airport → Makkah" value={transport.airportToMakkah} onChange={(e) => setTransport({ ...transport, airportToMakkah: e.target.value })} />
            <input className="input" placeholder="Makkah → Madinah" value={transport.makkahToMadinah} onChange={(e) => setTransport({ ...transport, makkahToMadinah: e.target.value })} />
            <input className="input" placeholder="Madinah → Airport" value={transport.madinahToAirport} onChange={(e) => setTransport({ ...transport, madinahToAirport: e.target.value })} />
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-primary mb-4">Price & Details</h2>
          <input className="input" placeholder="Price (PKR)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          <textarea className="input" placeholder="Inclusions" rows={3} value={inclusions} onChange={(e) => setInclusions(e.target.value)} />
          <textarea className="input" placeholder="Exclusions" rows={3} value={exclusions} onChange={(e) => setExclusions(e.target.value)} />
          <textarea className="input" placeholder="Notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button onClick={handleSave} className="btn">
          Save Quotation
        </button>
        <button onClick={() => router.push("/admin/quotations")} className="btn-outline">
          Back to Quotations
        </button>
      </div>
    </main>
  );
}
