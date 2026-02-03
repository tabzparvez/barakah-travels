"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("barakahAdminUser", JSON.stringify(data.user));
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
        <p className="uppercase tracking-[0.3em] text-yellow-400 text-xs mb-2">
          Barakah CRM
        </p>
        <h1 className="text-3xl font-semibold mb-2">Admin Login</h1>
        <p className="text-white/70 mb-6">
          Sign in to manage packages, inquiries, quotations, and invoices.
        </p>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-white/60"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-white/60"
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition"
          >
            Login
          </button>
          {error && <div className="text-red-300 text-sm">{error}</div>}
        </form>
        <p className="text-xs text-white/50 mt-6">
          Default login: admin / barakah123
        </p>
      </div>
    </main>
  );
}
