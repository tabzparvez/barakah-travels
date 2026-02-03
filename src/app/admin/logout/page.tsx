"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogout() {
  const router = useRouter();
  useEffect(() => {
    // Clear admin session (if using cookies/localStorage)
    if (typeof window !== "undefined") {
      localStorage.removeItem("barakahAdminUser");
    }
    router.replace("/admin/login");
  }, [router]);
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-4">Logging out...</h1>
      <p className="text-secondary">You are being redirected to the homepage.</p>
    </div>
  );
}
