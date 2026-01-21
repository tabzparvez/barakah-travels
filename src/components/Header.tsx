"use client";

import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  /* Close all menus on route change */
  useEffect(() => {
    setMenuOpen(false);
    setPackagesOpen(false);
  }, [pathname]);

  /* Header shadow on scroll */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Lock body scroll on mobile menu */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const handleLinkClick = () => {
    setMenuOpen(false);
    setPackagesOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy-policy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ];

  /* ✅ ONLY ONE PACKAGES LINK (NO /packages/umrah) */
  const packageLinks = [{ href: "/packages", label: "Umrah Packages" }];

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled
          ? "shadow-xl backdrop-blur-md bg-white/30"
          : "bg-gradient-to-r from-primary to-primary-dark"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 md:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={handleLinkClick}>
          <Image
            src="/newlogo.png"
            alt="Barakah Travels Logo"
            width={120}
            height={120}
            className="rounded-full border-2 border-yellow-500 shadow bg-white object-cover"
            priority
          />
          <span className="text-2xl font-extrabold text-yellow-400 ml-2">
            Barakah Travels
          </span>
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white text-2xl z-50"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`z-50 flex flex-col md:flex-row gap-6 px-6 py-4 rounded-xl
            bg-gradient-to-r from-primary/95 to-primary-dark/95
            md:bg-transparent text-white
            absolute md:static right-6 top-20 md:top-auto md:right-auto
            ${menuOpen ? "block" : "hidden md:flex"}
          `}
        >
          {/* Packages */}
          <div className="relative">
            <button
              onClick={() => setPackagesOpen((v) => !v)}
              className="flex items-center gap-1 hover:text-yellow-300"
            >
              Packages ▾
            </button>

            {packagesOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-primary rounded shadow-lg flex flex-col">
                {packageLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="px-4 py-2 hover:bg-yellow-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="hover:text-yellow-300"
            >
              {link.label}
            </Link>
          ))}

          {!session ? (
            <Link
              href="/login"
              onClick={handleLinkClick}
              className="bg-white text-primary font-bold px-4 py-1 rounded"
            >
              Sign In
            </Link>
          ) : (
            <button
              onClick={() => signOut()}
              className="bg-white/20 px-3 py-1 rounded"
            >
              Sign Out
            </button>
          )}
        </motion.nav>
      </div>
    </header>
  );
}
