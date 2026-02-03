"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function AdminLogout() {
  useEffect(() => {
    signOut({ callbackUrl: "/login" });
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b0c] flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Signing you out...</h1>
        <p className="text-white/70 mt-2">Redirecting to login.</p>
      </div>
    </div>
  );
}
