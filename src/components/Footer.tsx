"use client";

import { usePathname } from "next/navigation";
import { FaEnvelope, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-[#0b1220] text-white mt-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-yellow-400">
            Barakah Travels
          </h3>
          <p className="text-white/70">
            Premium Umrah packages from Pakistan with luxury stays near Haram,
            plus curated Turkey and Baku tours with concierge planning.
          </p>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-yellow-400" />
              <a href="tel:+923400799777" className="font-semibold">
                +92 340 0799777
              </a>
            </p>
            <p className="flex items-center gap-2">
              <FaWhatsapp className="text-yellow-400" />
              <a href="https://wa.me/923183548299" className="font-semibold">
                +92 318 3548299
              </a>
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-yellow-400" />
              <a
                href="mailto:info@barakahtravels.online"
                className="font-semibold"
              >
                info@barakahtravels.online
              </a>
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">
            Destinations
          </h4>
          <ul className="space-y-2 text-white/70">
            <li>
              <a href="/umrah-packages-from-karachi" className="hover:text-yellow-300">
                Umrah Packages
              </a>
            </li>
            <li>
              <a href="/turkey" className="hover:text-yellow-300">
                Turkey Tours
              </a>
            </li>
            <li>
              <a href="/baku" className="hover:text-yellow-300">
                Baku Tours
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-yellow-300">
                Custom Itineraries
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">
            Company
          </h4>
          <ul className="space-y-2 text-white/70">
            <li>
              <a href="/about" className="hover:text-yellow-300">
                About Us
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:text-yellow-300">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-yellow-300">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs py-4 border-t border-white/10 text-white/60">
        © 2025 Barakah Travels. All rights reserved.
      </div>
    </footer>
  );
}
