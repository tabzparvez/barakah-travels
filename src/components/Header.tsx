"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/umrah-packages-from-karachi", label: "Umrah Packages" },
  { href: "/turkey", label: "Turkey" },
  { href: "/baku", label: "Baku" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isAdminRoute = pathname?.startsWith("/admin");

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  if (isAdminRoute) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0f172a]/90 backdrop-blur-lg shadow-xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-white/10 border border-yellow-500/40 flex items-center justify-center">
            <Image
              src="/newlogo.png"
              alt="Barakah Travels"
              width={36}
              height={36}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
              Barakah
            </p>
            <p className="text-lg md:text-2xl font-extrabold text-white">
              Luxury Travels
            </p>
          </div>
        </Link>

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className={`z-50 flex flex-col md:flex-row md:items-center gap-6 px-6 py-6 md:py-2 rounded-2xl md:rounded-full
            bg-[#0f172a]/95 md:bg-transparent text-white
            absolute md:static right-6 top-20 md:right-auto md:top-auto
            ${menuOpen ? "block" : "hidden md:flex"}`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-[0.2em] text-white/80 hover:text-yellow-300 transition"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="px-5 py-2 rounded-full bg-yellow-500 text-black font-semibold shadow-lg hover:bg-yellow-400 transition"
          >
            Plan Your Trip
          </Link>
        </motion.nav>
      </div>
    </header>
  );
}
