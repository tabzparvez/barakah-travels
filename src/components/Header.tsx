"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#umrah-packages", label: "Umrah Packages" },
  { href: "/#turkey", label: "Turkey" },
  { href: "/#baku", label: "Baku" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "bg-[#0b0b0c]/90 backdrop-blur border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/newlogo.png"
            alt="Barakah Travels"
            width={56}
            height={56}
            className="rounded-full border border-yellow-400/40"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">
              Barakah Travels
            </p>
            <p className="text-lg font-semibold text-white">
              Premium Travel Agency
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-white">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-yellow-300 transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://wa.me/923183548299"
            className="rounded-full border border-yellow-400/70 px-5 py-2 text-sm font-semibold text-yellow-300 hover:bg-yellow-400/10"
          >
            WhatsApp Concierge
          </a>
        </div>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-white text-2xl"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0b0b0c] border-t border-white/10 px-6 py-6 space-y-4 text-white">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-lg font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/923183548299"
            className="inline-flex items-center justify-center rounded-full border border-yellow-400/70 px-5 py-2 text-sm font-semibold text-yellow-300"
          >
            WhatsApp Concierge
          </a>
        </div>
      )}
    </header>
  );
}
