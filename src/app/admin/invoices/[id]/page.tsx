"use client";

import { useEffect, useState } from "react";
import { amountToWords } from "@/lib/amountToWords";

type InvoiceData = {
  invoiceId: string;
  customerName: string;
  phone: string;
  email: string;
  description: string;
  qty: number;
  unitPrice: number;
  total: number;
  paid: number;
  balance: number;
  paymentMethod: string;
  date: string;
  quotationId?: string;
  notes?: string;
};

export default function InvoiceViewPage({
  params,
}: {
  params: { id: string };
}) {
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [editData, setEditData] = useState<InvoiceData | null>(null);
  const [status, setStatus] = useState("Unpaid");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(`invoice-${params.id}`);
    if (!raw) {
      setInvoice(null);
      setEditData(null);
      return;
    }
    const parsed = JSON.parse(raw) as InvoiceData;
    setInvoice(parsed);
    setEditData(parsed);
    setStatus(parsed.balance > 0 ? "Unpaid" : "Paid");
  }, [params.id]);

  if (!invoice || !editData) {
    return <p className="text-center mt-10">Invoice not found.</p>;
  }

  const displayData = isEditing ? editData : invoice;
  const invoiceNumber = displayData.invoiceId || params.id;

  const handleSaveChanges = () => {
    const total = Number(editData.total || 0);
    const qty = Number(editData.qty || 1);
    const paid = status === "Paid" ? total : 0;
    const balance = status === "Paid" ? 0 : total;
    const unitPrice = qty > 0 ? total / qty : total;
    const updated = {
      ...editData,
      total,
      paid,
      balance,
      unitPrice,
    };
    localStorage.setItem(`invoice-${params.id}`, JSON.stringify(updated));
    setInvoice(updated);
    setEditData(updated);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditData(invoice);
    setStatus(invoice.balance > 0 ? "Unpaid" : "Paid");
    setIsEditing(false);
  };

  return (
    <div
      id="invoice-print"
      className="max-w-4xl mx-auto bg-white p-10 text-sm"
    >
      {/* ================= HEADER ================= */}
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
          <p className="text-lg font-bold">INVOICE</p>
          <p>
            <strong>No:</strong> {invoiceNumber}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(displayData.date || new Date().toISOString()).toLocaleDateString()}
          </p>
          <span
            className={`inline-block mt-2 px-3 py-1 rounded text-white text-xs ${
              displayData.balance > 0 ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {displayData.balance > 0 ? "UNPAID" : "PAID"}
          </span>
        </div>
      </div>

      <hr className="my-4" />

      {/* ================= CUSTOMER ================= */}
      <div className="mb-4 border border-gray-200 rounded-xl p-4">
        <h2 className="font-semibold text-sm text-primary mb-2">
          Client Details
        </h2>
        <p>
          <strong>Customer Name:</strong>{" "}
          {displayData.customerName}
        </p>
        <p>
          <strong>Phone:</strong> {displayData.phone}
        </p>
        <p>
          <strong>Email:</strong> {displayData.email}
        </p>
        {displayData.quotationId && (
          <p>
            <strong>Quotation:</strong> {displayData.quotationId}
          </p>
        )}
      </div>

      {/* ================= TABLE ================= */}
      <table className="w-full border border-black border-collapse mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black p-2 text-left">
              Description
            </th>
            <th className="border border-black p-2 text-center">
              Qty
            </th>
            <th className="border border-black p-2 text-right">
              Unit Price
            </th>
            <th className="border border-black p-2 text-right">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black p-2">
              {displayData.description}
            </td>
            <td className="border border-black p-2 text-center">
              {displayData.qty}
            </td>
            <td className="border border-black p-2 text-right">
              PKR {Number(displayData.unitPrice).toLocaleString()}
            </td>
            <td className="border border-black p-2 text-right">
              PKR {Number(displayData.total).toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>

      {/* ================= TOTALS ================= */}
      <div className="flex justify-end mb-4">
        <table className="w-1/2 border border-black">
          <tbody>
            <tr>
              <td className="border p-2">Total</td>
              <td className="border p-2 text-right">
                {isEditing ? (
                  <input
                    className="input text-right"
                    type="number"
                    value={editData.total}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        total: Number(e.target.value),
                      })
                    }
                  />
                ) : (
                  <>PKR {Number(displayData.total).toLocaleString()}</>
                )}
              </td>
            </tr>
            <tr>
              <td className="border p-2">Paid</td>
              <td className="border p-2 text-right">
                PKR {Number(displayData.paid).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="border p-2 font-bold">
                Balance
              </td>
              <td className="border p-2 text-right font-bold">
                PKR {Number(displayData.balance).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs mb-3">
        <strong>Amount in Words:</strong>{" "}
        {amountToWords(Number(displayData.total))} only
      </p>

      <div className="text-xs mb-4 border border-gray-200 rounded-xl p-4">
        <p>
          <strong>Payment Method:</strong>{" "}
          {displayData.paymentMethod}
        </p>
        {isEditing && (
          <div className="mt-3">
            <label className="block text-xs font-semibold mb-2">
              Status
            </label>
            <select
              className="input"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Paid</option>
              <option>Unpaid</option>
            </select>
          </div>
        )}
      </div>

      <div className="text-xs mb-4">
        <p className="font-bold mb-2">Notes:</p>
        {isEditing ? (
          <textarea
            className="input"
            rows={3}
            value={editData.notes || ""}
            onChange={(e) =>
              setEditData({
                ...editData,
                notes: e.target.value,
              })
            }
          />
        ) : (
          <p className="text-xs">{displayData.notes || "—"}</p>
        )}
      </div>

      {/* ================= TERMS ================= */}
      <div className="text-xs mt-4">
        <p className="font-bold mb-1">
          Terms & Conditions:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            All payments once made are non-refundable.
          </li>
          <li>
            Any increase in government taxes or airline
            charges will be payable by customer.
          </li>
          <li>
            Barakah Travels is not responsible for delays
            due to airline, visa or weather conditions.
          </li>
        </ul>
      </div>

      {/* ================= SIGNATURE ================= */}
      <div className="flex justify-between mt-10 text-xs">
        <div>
          <p>Prepared By</p>
          <p className="font-bold mt-4">
            Tabish Parvez
          </p>
        </div>
        <div className="text-right">
          <p>Authorized Signature</p>
          <div className="border-t mt-6 w-40 ml-auto"></div>
        </div>
      </div>

      {/* ================= PRINT ================= */}
      <div className="mt-6 no-print">
        {isEditing ? (
          <div className="flex flex-wrap gap-3">
            <button onClick={handleSaveChanges} className="btn">
              Save Changes
            </button>
            <button onClick={handleCancelEdit} className="btn-outline">
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setIsEditing(true)} className="btn">
              Edit Invoice
            </button>
            <button
              onClick={() => window.print()}
              className="btn-outline"
            >
              Print Invoice
            </button>
            <button
              onClick={() => window.print()}
              className="btn-outline"
            >
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
