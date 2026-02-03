"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

type QuotationData = {
  id: string;
  clientName: string;
  phone: string;
  email: string;
  persons: number;
  service?: string;
  travelFrom?: string;
  travelTo?: string;
  inquiryNotes?: string;
  status?: string;
  goingFlight: FlightDetails;
  returnFlight: FlightDetails;
  makkahHotel: HotelDetails;
  madinahHotel: HotelDetails;
  transport: TransportDetails;
  price: number;
  inclusions: string;
  exclusions: string;
  notes: string;
  createdAt: string;
};

export default function EditQuotationPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [persons, setPersons] = useState("2");
  const [service, setService] = useState("Umrah");
  const [travelFrom, setTravelFrom] = useState("");
  const [travelTo, setTravelTo] = useState("");
  const [inquiryNotes, setInquiryNotes] = useState("");
  const [status, setStatus] = useState("Draft");

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
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(`quotation-${params.id}`);
    if (!raw) {
      setNotFound(true);
      setLoaded(true);
      return;
    }

    const data = JSON.parse(raw) as QuotationData;
    setClientName(data.clientName || "");
    setPhone(data.phone || "");
    setEmail(data.email || "");
    setPersons(String(data.persons || 0));
    setService(data.service || "Umrah");
    setTravelFrom(data.travelFrom || "");
    setTravelTo(data.travelTo || "");
    setInquiryNotes(data.inquiryNotes || "");
    setStatus(data.status || "Draft");
    setGoingFlight(data.goingFlight || goingFlight);
    setReturnFlight(data.returnFlight || returnFlight);
    setMakkahHotel(data.makkahHotel || makkahHotel);
    setMadinahHotel(data.madinahHotel || madinahHotel);
    setTransport(data.transport || transport);
    setPrice(String(data.price || 0));
    setInclusions(data.inclusions || "");
    setExclusions(data.exclusions || "");
    setNotes(data.notes || "");
    setCreatedAt(data.createdAt || "");
    setLoaded(true);
  }, [params.id]);

  const handleSave = () => {
    const data: QuotationData = {
      id: params.id,
      clientName,
      phone,
      email,
      persons: Number(persons || 0),
      service,
      travelFrom,
      travelTo,
      inquiryNotes,
      status,
      goingFlight,
      returnFlight,
      makkahHotel,
      madinahHotel,
      transport,
      price: Number(price || 0),
      inclusions,
      exclusions,
      notes,
      createdAt: createdAt || new Date().toISOString(),
    };

    localStorage.setItem(`quotation-${params.id}`, JSON.stringify(data));
    router.push(`/admin/quotations/${params.id}`);
  };

  if (!loaded) {
    return <p className="text-center mt-10">Loading quotation...</p>;
  }

  if (notFound) {
    return <p className="text-center mt-10">Quotation not found.</p>;
  }

  return (
    <main className="section max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Edit Quotation</h1>
        <p className="text-sm text-gray-500">
          Update client requirements and quotation status.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="card">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-primary">Client</h2>
              <p className="text-sm text-gray-500">
                Primary contact details for the quotation.
              </p>
            </div>
            <div className="w-full md:w-56">
              <label className="text-xs text-gray-500">Status</label>
              <select
                className="input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Draft</option>
                <option>Sent</option>
                <option>Accepted</option>
              </select>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3 mt-4">
            <input
              className="input"
              placeholder="Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
            <input
              className="input"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="input"
              placeholder="Persons"
              type="number"
              value={persons}
              onChange={(e) => setPersons(e.target.value)}
            />
          </div>
          <input
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-primary mb-4">
            Trip Overview
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              className="input"
              placeholder="Service (Umrah / Turkey / Baku)"
              value={service}
              onChange={(e) => setService(e.target.value)}
            />
            <input
              className="input"
              placeholder="Departure city"
              value={travelFrom}
              onChange={(e) => setTravelFrom(e.target.value)}
            />
            <input
              className="input"
              placeholder="Destination city"
              value={travelTo}
              onChange={(e) => setTravelTo(e.target.value)}
            />
            <textarea
              className="input"
              placeholder="Inquiry notes"
              rows={3}
              value={inquiryNotes}
              onChange={(e) => setInquiryNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-primary mb-4">
            Flights (Going)
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <input
              className="input"
              placeholder="Date"
              type="date"
              value={goingFlight.date}
              onChange={(e) =>
                setGoingFlight({ ...goingFlight, date: e.target.value })
              }
            />
            <input
              className="input"
              placeholder="Departure airport"
              value={goingFlight.departure}
              onChange={(e) =>
                setGoingFlight({ ...goingFlight, departure: e.target.value })
              }
            />
            <input
              className="input"
              placeholder="Arrival airport"
              value={goingFlight.arrival}
              onChange={(e) =>
                setGoingFlight({ ...goingFlight, arrival: e.target.value })
              }
            />
            <input
              className="input"
              placeholder="Airline"
              value={goingFlight.airline}
              onChange={(e) =>
                setGoingFlight({ ...goingFlight, airline: e.target.value })
              }
            />
            <input
              className="input"
              placeholder="Flight number"
              value={goingFlight.flightNumber}
              onChange={(e) =>
                setGoingFlight({
                  ...goingFlight,
                  flightNumber: e.target.value,
                })
              }
            />
            <select
              className="input"
              value={goingFlight.routeType}
              onChange={(e) =>
                setGoingFlight({ ...goingFlight, routeType: e.target.value })
              }
            >
              <option>Direct</option>
              <option>Connecting</option>
            </select>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-primary mb-4">
            Flights (Return)
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <input
              className="input"
              placeholder="Date"
              type="date"
              value={returnFlight.date}
              onChange={(e) =>
                setReturnFlight({ ...returnFlight, date: e.target.value })
              }
            />
            <input
              className="input"
              placeholder="Departure airport"
              value={returnFlight.departure}
              onChange={(e) =>
                setReturnFlight({
                  ...returnFlight,
                  departure: e.target.value,
                })
              }
            />
            <input
              className="input"
              placeholder="Arrival airport"
              value={returnFlight.arrival}
              onChange={(e) =>
                setReturnFlight({ ...returnFlight, arrival: e.target.value })
              }
            />
            <input
              className="input"
              placeholder="Airline"
              value={returnFlight.airline}
              onChange={(e) =>
                setReturnFlight({ ...returnFlight, airline: e.target.value })
              }
            />
            <input
              className="input"
              placeholder="Flight number"
              value={returnFlight.flightNumber}
              onChange={(e) =>
                setReturnFlight({
                  ...returnFlight,
                  flightNumber: e.target.value,
                })
              }
            />
            <select
              className="input"
              value={returnFlight.routeType}
              onChange={(e) =>
                setReturnFlight({ ...returnFlight, routeType: e.target.value })
              }
            >
              <option>Direct</option>
              <option>Connecting</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-4">
              Makkah Hotel
            </h2>
            <input
              className="input"
              placeholder="Name"
              value={makkahHotel.name}
              onChange={(e) =>
                setMakkahHotel({ ...makkahHotel, name: e.target.value })
              }
            />
            <input
              className="input"
              placeholder="Distance from Haram"
              value={makkahHotel.distance}
              onChange={(e) =>
                setMakkahHotel({ ...makkahHotel, distance: e.target.value })
              }
            />
            <input
              className="input"
              placeholder="Room type"
              value={makkahHotel.roomType}
              onChange={(e) =>
                setMakkahHotel({ ...makkahHotel, roomType: e.target.value })
              }
            />
            <input
              className="input"
              placeholder="Nights"
              value={makkahHotel.nights}
              onChange={(e) =>
                setMakkahHotel({ ...makkahHotel, nights: e.target.value })
              }
            />
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-primary mb-4">
              Madinah Hotel
            </h2>
            <input
              className="input"
              placeholder="Name"
              value={madinahHotel.name}
              onChange={(e) =>
                setMadinahHotel({ ...madinahHotel, name: e.target.value })
              }
            />
            <input
              className="input"
              placeholder="Distance from Masjid Nabawi"
              value={madinahHotel.distance}
              onChange={(e) =>
                setMadinahHotel({ ...madinahHotel, distance: e.target.value })
              }
            />
            <input
              className="input"
              placeholder="Room type"
              value={madinahHotel.roomType}
              onChange={(e) =>
                setMadinahHotel({ ...madinahHotel, roomType: e.target.value })
              }
            />
            <input
              className="input"
              placeholder="Nights"
              value={madinahHotel.nights}
              onChange={(e) =>
                setMadinahHotel({ ...madinahHotel, nights: e.target.value })
              }
            />
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-primary mb-4">Transport</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <select
              className="input"
              value={transport.type}
              onChange={(e) =>
                setTransport({ ...transport, type: e.target.value })
              }
            >
              <option>Private</option>
              <option>Sharing</option>
            </select>
            <input
              className="input"
              placeholder="Airport → Makkah"
              value={transport.airportToMakkah}
              onChange={(e) =>
                setTransport({
                  ...transport,
                  airportToMakkah: e.target.value,
                })
              }
            />
            <input
              className="input"
              placeholder="Makkah → Madinah"
              value={transport.makkahToMadinah}
              onChange={(e) =>
                setTransport({
                  ...transport,
                  makkahToMadinah: e.target.value,
                })
              }
            />
            <input
              className="input"
              placeholder="Madinah → Airport"
              value={transport.madinahToAirport}
              onChange={(e) =>
                setTransport({
                  ...transport,
                  madinahToAirport: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-primary mb-4">
            Price & Details
          </h2>
          <input
            className="input"
            placeholder="Price (PKR)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <textarea
            className="input"
            placeholder="Inclusions"
            rows={3}
            value={inclusions}
            onChange={(e) => setInclusions(e.target.value)}
          />
          <textarea
            className="input"
            placeholder="Exclusions"
            rows={3}
            value={exclusions}
            onChange={(e) => setExclusions(e.target.value)}
          />
          <textarea
            className="input"
            placeholder="Notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button onClick={handleSave} className="btn">
          Save Changes
        </button>
        <button
          onClick={() => router.push(`/admin/quotations/${params.id}`)}
          className="btn-outline"
        >
          Back to Quotation
        </button>
      </div>
    </main>
  );
}
