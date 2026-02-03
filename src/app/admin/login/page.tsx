"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    const data = await response.json();
    localStorage.setItem("barakahAdminSession", JSON.stringify(data.user));
    router.push("/admin/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#0b0b0c] flex items-center justify-center px-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-10 items-center">
        <div className="text-white space-y-6">
          <span className="text-sm uppercase tracking-[0.3em] text-yellow-400">
            Barakah Travels
          </span>
          <h1 className="text-4xl font-bold">Admin Login</h1>
          <p className="text-white/70">
            Access your premium travel operations dashboard, manage inquiries,
            quotations, and invoices with full visibility.
          </p>
          <div className="flex items-center gap-4">
            <Image
              src="/newlogo.png"
              alt="Barakah Travels"
              width={96}
              height={96}
              className="rounded-full border border-yellow-400/50"
            />
            <div>
              <p className="font-semibold">Demo credentials</p>
              <p className="text-sm text-white/70">
                superadmin@barakahtravels.online
              </p>
              <p className="text-sm text-white/70">Password: demo-admin</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-white/70">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="name@barakahtravels.online"
              />
            </div>
            <div>
              <label className="text-sm text-white/70">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="••••••••"
              />
            </div>
            {error && (
              <p className="text-sm text-red-300 bg-red-500/10 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-yellow-400 text-black font-semibold py-3 hover:bg-yellow-300 transition"
            >
              {loading ? "Signing in..." : "Sign in to Admin"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
