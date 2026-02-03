"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type QuotationData = {
  id: string;
  clientName: string;
  phone: string;
  email: string;
  persons: number;
  goingFlight: {
    date: string;
    departure: string;
    arrival: string;
    airline: string;
    flightNumber: string;
    routeType: string;
  };
  returnFlight: {
    date: string;
    departure: string;
    arrival: string;
    airline: string;
    flightNumber: string;
    routeType: string;
  };
  makkahHotel: {
    name: string;
    distance: string;
    roomType: string;
    nights: string;
  };
  madinahHotel: {
    name: string;
    distance: string;
    roomType: string;
    nights: string;
  };
  transport: {
    type: string;
    airportToMakkah: string;
    makkahToMadinah: string;
    madinahToAirport: string;
  };
  price: number;
  inclusions: string;
  exclusions: string;
  notes: string;
  createdAt: string;
};

export default function QuotationViewPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [quotation, setQuotation] = useState<QuotationData | null>(null);
  const [editData, setEditData] = useState<QuotationData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(`quotation-${params.id}`);
    if (!raw) {
      setQuotation(null);
      setEditData(null);
      return;
    }
    const parsed = JSON.parse(raw) as QuotationData;
    setQuotation(parsed);
    setEditData(parsed);
  }, [params.id]);

  if (!quotation || !editData) {
    return <p className="text-center mt-10">Quotation not found.</p>;
  }

  const displayData = isEditing ? editData : quotation;

  const handleConvertToInvoice = () => {
    const invoiceId = `INV-${Date.now()}`;
    const invoiceData = {
      invoiceId,
      customerName: quotation.clientName,
      phone: quotation.phone,
      email: quotation.email,
      description: `Umrah package quotation ${quotation.id}`,
      qty: quotation.persons || 1,
      unitPrice: quotation.price,
      total: quotation.price,
      paid: 0,
      balance: quotation.price,
      paymentMethod: "Pending",
      date: new Date().toISOString(),
      quotationId: quotation.id,
      notes: "",
    };

    localStorage.setItem(`invoice-${invoiceId}`, JSON.stringify(invoiceData));
    router.push(`/admin/invoices/${invoiceId}`);
  };

  const handleSaveChanges = () => {
    localStorage.setItem(`quotation-${quotation.id}`, JSON.stringify(editData));
    setQuotation(editData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditData(quotation);
    setIsEditing(false);
  };

  return (
    <main className="section max-w-5xl mx-auto">
      <div id="quotation-print" className="card">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between mb-6">
          <div className="flex items-start gap-4">
            <img
              src="/newlogo.png"
              alt="Barakah Travels Logo"
              className="h-16 w-auto"
            />
            <div>
              <h1 className="text-2xl font-extrabold tracking-wide">
                BARAKAH TRAVELS
              </h1>
              <p className="text-xs">Umrah • Visa • Travel Services</p>
              <p className="text-xs mt-1">Karachi, Pakistan</p>
              <p className="text-xs">
                +92 340 0799777 | +92 318 3548299
              </p>
              <p className="text-xs">info@barakahtravels.online</p>
              <p className="text-xs">NTN: 7933776</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">QUOTATION</p>
            <p>
              <strong>No:</strong> {displayData.id}
            </p>
            <p className="text-sm text-gray-500">
              Created {new Date(displayData.createdAt).toLocaleString()}
            </p>
            <div className="mt-3">
              <p className="text-sm text-gray-500">Total Price</p>
              {isEditing ? (
                <input
                  className="input text-right"
                  type="number"
                  value={editData.price}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      price: Number(e.target.value),
                    })
                  }
                />
              ) : (
                <p className="text-2xl font-semibold text-primary">
                  PKR {Number(displayData.price).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>

        <section className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-xs text-gray-500">Client Name</p>
              <p className="font-semibold">{displayData.clientName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="font-semibold">{displayData.phone}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Persons</p>
              <p className="font-semibold">{displayData.persons}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-semibold">{displayData.email}</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-primary/10 p-4">
              <h2 className="text-sm font-semibold text-primary mb-3">
                Flights (Going)
              </h2>
              {isEditing ? (
                <div className="grid gap-3">
                  <input
                    className="input"
                    type="date"
                    value={editData.goingFlight.date}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        goingFlight: {
                          ...editData.goingFlight,
                          date: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    className="input"
                    placeholder="Departure"
                    value={editData.goingFlight.departure}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        goingFlight: {
                          ...editData.goingFlight,
                          departure: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    className="input"
                    placeholder="Arrival"
                    value={editData.goingFlight.arrival}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        goingFlight: {
                          ...editData.goingFlight,
                          arrival: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    className="input"
                    placeholder="Airline"
                    value={editData.goingFlight.airline}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        goingFlight: {
                          ...editData.goingFlight,
                          airline: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    className="input"
                    placeholder="Flight number"
                    value={editData.goingFlight.flightNumber}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        goingFlight: {
                          ...editData.goingFlight,
                          flightNumber: e.target.value,
                        },
                      })
                    }
                  />
                  <select
                    className="input"
                    value={editData.goingFlight.routeType}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        goingFlight: {
                          ...editData.goingFlight,
                          routeType: e.target.value,
                        },
                      })
                    }
                  >
                    <option>Direct</option>
                    <option>Connecting</option>
                  </select>
                </div>
              ) : (
                <>
                  <p className="text-sm">Date: {displayData.goingFlight.date}</p>
                  <p className="text-sm">
                    Route: {displayData.goingFlight.departure} →{" "}
                    {displayData.goingFlight.arrival}
                  </p>
                  <p className="text-sm">
                    Airline: {displayData.goingFlight.airline}
                  </p>
                  <p className="text-sm">
                    Flight #: {displayData.goingFlight.flightNumber}
                  </p>
                  <p className="text-sm">
                    Type: {displayData.goingFlight.routeType}
                  </p>
                </>
              )}
            </div>
            <div className="rounded-2xl border border-primary/10 p-4">
              <h2 className="text-sm font-semibold text-primary mb-3">
                Flights (Return)
              </h2>
              {isEditing ? (
                <div className="grid gap-3">
                  <input
                    className="input"
                    type="date"
                    value={editData.returnFlight.date}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        returnFlight: {
                          ...editData.returnFlight,
                          date: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    className="input"
                    placeholder="Departure"
                    value={editData.returnFlight.departure}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        returnFlight: {
                          ...editData.returnFlight,
                          departure: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    className="input"
                    placeholder="Arrival"
                    value={editData.returnFlight.arrival}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        returnFlight: {
                          ...editData.returnFlight,
                          arrival: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    className="input"
                    placeholder="Airline"
                    value={editData.returnFlight.airline}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        returnFlight: {
                          ...editData.returnFlight,
                          airline: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    className="input"
                    placeholder="Flight number"
                    value={editData.returnFlight.flightNumber}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        returnFlight: {
                          ...editData.returnFlight,
                          flightNumber: e.target.value,
                        },
                      })
                    }
                  />
                  <select
                    className="input"
                    value={editData.returnFlight.routeType}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        returnFlight: {
                          ...editData.returnFlight,
                          routeType: e.target.value,
                        },
                      })
                    }
                  >
                    <option>Direct</option>
                    <option>Connecting</option>
                  </select>
                </div>
              ) : (
                <>
                  <p className="text-sm">
                    Date: {displayData.returnFlight.date}
                  </p>
                  <p className="text-sm">
                    Route: {displayData.returnFlight.departure} →{" "}
                    {displayData.returnFlight.arrival}
                  </p>
                  <p className="text-sm">
                    Airline: {displayData.returnFlight.airline}
                  </p>
                  <p className="text-sm">
                    Flight #: {displayData.returnFlight.flightNumber}
                  </p>
                  <p className="text-sm">
                    Type: {displayData.returnFlight.routeType}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-primary/10 p-4">
              <h2 className="text-sm font-semibold text-primary mb-3">
                Makkah Hotel
              </h2>
              {isEditing ? (
                <div className="grid gap-3">
                  <input
                    className="input"
                    placeholder="Name"
                    value={editData.makkahHotel.name}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        makkahHotel: {
                          ...editData.makkahHotel,
                          name: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    className="input"
                    placeholder="Distance from Haram"
                    value={editData.makkahHotel.distance}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        makkahHotel: {
                          ...editData.makkahHotel,
                          distance: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    className="input"
                    placeholder="Room type"
                    value={editData.makkahHotel.roomType}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        makkahHotel: {
                          ...editData.makkahHotel,
                          roomType: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    className="input"
                    placeholder="Nights"
                    value={editData.makkahHotel.nights}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        makkahHotel: {
                          ...editData.makkahHotel,
                          nights: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              ) : (
                <>
                  <p className="text-sm">
                    Name: {displayData.makkahHotel.name}
                  </p>
                  <p className="text-sm">
                    Distance: {displayData.makkahHotel.distance}
                  </p>
                  <p className="text-sm">
                    Room Type: {displayData.makkahHotel.roomType}
                  </p>
                  <p className="text-sm">
                    Nights: {displayData.makkahHotel.nights}
                  </p>
                </>
              )}
            </div>
            <div className="rounded-2xl border border-primary/10 p-4">
              <h2 className="text-sm font-semibold text-primary mb-3">
                Madinah Hotel
              </h2>
              {isEditing ? (
                <div className="grid gap-3">
                  <input
                    className="input"
                    placeholder="Name"
                    value={editData.madinahHotel.name}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        madinahHotel: {
                          ...editData.madinahHotel,
                          name: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    className="input"
                    placeholder="Distance from Masjid Nabawi"
                    value={editData.madinahHotel.distance}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        madinahHotel: {
                          ...editData.madinahHotel,
                          distance: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    className="input"
                    placeholder="Room type"
                    value={editData.madinahHotel.roomType}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        madinahHotel: {
                          ...editData.madinahHotel,
                          roomType: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    className="input"
                    placeholder="Nights"
                    value={editData.madinahHotel.nights}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        madinahHotel: {
                          ...editData.madinahHotel,
                          nights: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              ) : (
                <>
                  <p className="text-sm">
                    Name: {displayData.madinahHotel.name}
                  </p>
                  <p className="text-sm">
                    Distance: {displayData.madinahHotel.distance}
                  </p>
                  <p className="text-sm">
                    Room Type: {displayData.madinahHotel.roomType}
                  </p>
                  <p className="text-sm">
                    Nights: {displayData.madinahHotel.nights}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-primary/10 p-4">
            <h2 className="text-sm font-semibold text-primary mb-3">
              Transport
            </h2>
            {isEditing ? (
              <div className="grid gap-3 md:grid-cols-2">
                <select
                  className="input"
                  value={editData.transport.type}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      transport: {
                        ...editData.transport,
                        type: e.target.value,
                      },
                    })
                  }
                >
                  <option>Private</option>
                  <option>Sharing</option>
                </select>
                <input
                  className="input"
                  placeholder="Airport → Makkah"
                  value={editData.transport.airportToMakkah}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      transport: {
                        ...editData.transport,
                        airportToMakkah: e.target.value,
                      },
                    })
                  }
                />
                <input
                  className="input"
                  placeholder="Makkah → Madinah"
                  value={editData.transport.makkahToMadinah}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      transport: {
                        ...editData.transport,
                        makkahToMadinah: e.target.value,
                      },
                    })
                  }
                />
                <input
                  className="input"
                  placeholder="Madinah → Airport"
                  value={editData.transport.madinahToAirport}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      transport: {
                        ...editData.transport,
                        madinahToAirport: e.target.value,
                      },
                    })
                  }
                />
              </div>
            ) : (
              <>
                <p className="text-sm">Type: {displayData.transport.type}</p>
                <p className="text-sm">
                  Airport → Makkah: {displayData.transport.airportToMakkah}
                </p>
                <p className="text-sm">
                  Makkah → Madinah: {displayData.transport.makkahToMadinah}
                </p>
                <p className="text-sm">
                  Madinah → Airport: {displayData.transport.madinahToAirport}
                </p>
              </>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-primary/10 p-4">
              <h2 className="text-sm font-semibold text-primary mb-3">
                Inclusions
              </h2>
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {displayData.inclusions || "—"}
              </p>
            </div>
            <div className="rounded-2xl border border-primary/10 p-4">
              <h2 className="text-sm font-semibold text-primary mb-3">
                Exclusions
              </h2>
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {displayData.exclusions || "—"}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-primary/10 p-4">
            <h2 className="text-sm font-semibold text-primary mb-3">Notes</h2>
            {isEditing ? (
              <textarea
                className="input"
                rows={4}
                value={editData.notes}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    notes: e.target.value,
                  })
                }
              />
            ) : (
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {displayData.notes || "—"}
              </p>
            )}
          </div>
        </section>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {isEditing ? (
          <>
            <button onClick={handleSaveChanges} className="btn">
              Save Changes
            </button>
            <button onClick={handleCancelEdit} className="btn-outline">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="btn">
              Edit Quotation
            </button>
            <button onClick={() => window.print()} className="btn-outline">
              Printable Quotation
            </button>
            <button onClick={() => window.print()} className="btn-outline">
              Download PDF
            </button>
            <button onClick={handleConvertToInvoice} className="btn">
              Convert to Invoice
            </button>
          </>
        )}
      </div>
    </main>
  );
}
