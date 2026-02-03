"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogout() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("barakahAdminSession");
    router.replace("/admin/login");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0b0b0c] flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Signing you out...</h1>
        <p className="text-white/70 mt-2">Redirecting to admin login.</p>
      </div>
    </div>
  );
}
