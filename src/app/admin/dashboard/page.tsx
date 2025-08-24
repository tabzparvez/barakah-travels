"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaBoxOpen, FaEnvelopeOpenText, FaStar, FaImages, FaBlog, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";

export default function AdminDashboard() {
  const router = useRouter();
  useEffect(() => {
    // Simple check for admin session (cookie or localStorage)
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary-light to-primary-dark px-2">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-xl flex flex-col items-center border border-primary/10">
        <h1 className="text-4xl font-extrabold mb-8 text-primary font-heading text-center drop-shadow">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-10">
          <a href="/admin/packages" className="flex flex-col items-center justify-center p-6 rounded-xl shadow-card bg-primary-light hover:bg-primary transition-all duration-200 group cursor-pointer">
            <FaBoxOpen className="text-3xl mb-2 text-primary group-hover:text-white transition" />
            <span className="font-semibold text-primary group-hover:text-white transition">Manage Packages</span>
          </a>
          <a href="/admin/inquiries" className="flex flex-col items-center justify-center p-6 rounded-xl shadow-card bg-primary-light hover:bg-primary transition-all duration-200 group cursor-pointer">
            <FaEnvelopeOpenText className="text-3xl mb-2 text-primary group-hover:text-white transition" />
            <span className="font-semibold text-primary group-hover:text-white transition">View Inquiries</span>
          </a>
          <a href="/admin/testimonials" className="flex flex-col items-center justify-center p-6 rounded-xl shadow-card bg-primary-light hover:bg-primary transition-all duration-200 group cursor-pointer">
            <FaStar className="text-3xl mb-2 text-primary group-hover:text-white transition" />
            <span className="font-semibold text-primary group-hover:text-white transition">Manage Testimonials</span>
          </a>
          <a href="/admin/gallery" className="flex flex-col items-center justify-center p-6 rounded-xl shadow-card bg-primary-light hover:bg-primary transition-all duration-200 group cursor-pointer">
            <FaImages className="text-3xl mb-2 text-primary group-hover:text-white transition" />
            <span className="font-semibold text-primary group-hover:text-white transition">Manage Gallery</span>
          </a>
          <a href="/admin/blog" className="flex flex-col items-center justify-center p-6 rounded-xl shadow-card bg-primary-light hover:bg-primary transition-all duration-200 group cursor-pointer">
            <FaBlog className="text-3xl mb-2 text-primary group-hover:text-white transition" />
            <span className="font-semibold text-primary group-hover:text-white transition">Manage Blog</span>
          </a>
          <a href="/admin/faq" className="flex flex-col items-center justify-center p-6 rounded-xl shadow-card bg-primary-light hover:bg-primary transition-all duration-200 group cursor-pointer">
            <FaQuestionCircle className="text-3xl mb-2 text-primary group-hover:text-white transition" />
            <span className="font-semibold text-primary group-hover:text-white transition">Manage FAQ</span>
          </a>
        </div>
        <a href="/admin/logout" className="flex items-center gap-2 justify-center mt-2 px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-card transition-all duration-200 w-full max-w-xs">
          <FaSignOutAlt className="text-lg" /> Logout
        </a>
      </div>
  {/* Button style is now global in globals.css for consistency */}
    </main>
  );
}
