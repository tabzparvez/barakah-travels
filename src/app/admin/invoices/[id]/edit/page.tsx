"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { addAdminNotification } from "@/lib/notifications";

type InvoiceData = {
  invoiceId: string;
  userId?: string;
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
};

export default function EditInvoicePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [description, setDescription] = useState("Umrah Package");
  const [qty, setQty] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [paid, setPaid] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [quotationId, setQuotationId] = useState("");
  const [initialPaid, setInitialPaid] = useState(0);
  const [initialTotal, setInitialTotal] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(`invoice-${params.id}`);
    if (!raw) {
      setNotFound(true);
      setLoaded(true);
      return;
    }
    const data = JSON.parse(raw) as InvoiceData;
    setCustomerName(data.customerName || "");
    setPhone(data.phone || "");
    setEmail(data.email || "");
    setUserId(data.userId || "");
    setDescription(data.description || "Umrah Package");
    setQty(Number(data.qty || 1));
    setUnitPrice(Number(data.unitPrice || 0));
    setPaid(Number(data.paid || 0));
    setPaymentMethod(data.paymentMethod || "Cash");
    setQuotationId(data.quotationId || "");
    setInitialPaid(Number(data.paid || 0));
    setInitialTotal(Number(data.total || 0));
    setLoaded(true);
  }, [params.id]);

  const total = qty * unitPrice;
  const balance = total - paid;

  function handleSubmit() {
    const data: InvoiceData = {
      invoiceId: params.id,
      userId: userId || undefined,
      customerName,
      phone,
      email,
      description,
      qty,
      unitPrice,
      total,
      paid,
      balance,
      paymentMethod,
      date: new Date().toISOString(),
      quotationId: quotationId || undefined,
    };

    localStorage.setItem(`invoice-${params.id}`, JSON.stringify(data));
    if (initialPaid < initialTotal && paid >= total && total > 0) {
      addAdminNotification({
        id: `admin-invoice-paid-${params.id}`,
        type: "invoice-paid",
        message: `Invoice ${params.id} marked as paid.`,
        createdAt: new Date().toISOString(),
        read: false,
      });
    }
    router.push(`/admin/invoices/${params.id}`);
  }

  if (!loaded) {
    return <p className="text-center mt-10">Loading invoice...</p>;
  }

  if (notFound) {
    return <p className="text-center mt-10">Invoice not found.</p>;
  }

  return (
    <div className="card max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">Edit Invoice</h1>
      <p className="text-sm text-gray-500 mb-6">
        Update payment status or invoice line items.
      </p>

      <input
        className="input"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <input
        className="input"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        className="input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        className="input"
        placeholder="Quotation ID"
        value={quotationId}
        onChange={(e) => setQuotationId(e.target.value)}
      />

      <input
        className="input"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="input"
        type="number"
        placeholder="Quantity"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
      />
      <input
        className="input"
        type="number"
        placeholder="Unit Price"
        value={unitPrice}
        onChange={(e) => setUnitPrice(Number(e.target.value))}
      />

      <select
        className="input"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option>Cash</option>
        <option>Bank Transfer</option>
        <option>EasyPaisa</option>
        <option>JazzCash</option>
        <option>Pending</option>
      </select>

      <input
        className="input"
        type="number"
        placeholder="Paid Amount"
        value={paid}
        onChange={(e) => setPaid(Number(e.target.value))}
      />

      <div className="mt-4 text-sm">
        <p>
          Total: <strong>PKR {total.toLocaleString()}</strong>
        </p>
        <p>
          Paid: <strong>PKR {paid.toLocaleString()}</strong>
        </p>
        <p>
          Balance: <strong>PKR {balance.toLocaleString()}</strong>
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={handleSubmit} className="btn">
          Save Changes
        </button>
        <button
          onClick={() => router.push(`/admin/invoices/${params.id}`)}
          className="btn-outline"
        >
          Back to Invoice
        </button>
      </div>
    </div>
  );
}
