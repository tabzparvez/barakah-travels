"use client";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const { data: session } = useSession();
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
    setPackagesOpen(false);
    setProfileOpen(false);
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

  const packageLinks = [
    { href: "/packages/umrah", label: "Umrah" },
    { href: "/packages/hajj", label: "Hajj" },
    { href: "/packages/special-offers", label: "Special Offers" },
  ];

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-xl backdrop-blur-md bg-white/30" : "bg-gradient-to-r from-primary to-primary-dark"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 md:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/newlogo.png"
            alt="Barakah Travels Logo"
            width={120}
            height={120}
            className="rounded-full border-2 border-yellow-500 shadow bg-white object-cover hover:scale-105 transition-transform duration-300"
            priority
            style={{ imageRendering: "crisp-edges" }}
          />
          <span className="text-2xl font-extrabold text-yellow-400 tracking-wide font-heading ml-2">
            Barakah Travels
          </span>
        </Link>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-white text-2xl ml-auto z-50"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Open Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation */}
        <AnimatePresence>
          {(menuOpen || typeof window !== "undefined") && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`absolute md:static flex flex-col md:flex-row gap-6 text-base font-semibold px-6 py-4 md:py-0 rounded-xl shadow-lg md:shadow-none right-6 top-20 md:top-auto md:right-auto transition-all duration-300 bg-gradient-to-r from-primary/90 to-primary-dark/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-0 text-white md:text-white`}
            >
              {/* Packages Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setPackagesOpen(true)}
                onMouseLeave={() => setPackagesOpen(false)}
              >
                <button
                  className="hover:text-yellow-300 transition-colors duration-200 flex items-center gap-1"
                  onClick={() => setPackagesOpen((v) => !v)}
                >
                  Packages
                  <span className="text-sm">▾</span>
                </button>
                {packagesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-2 w-48 bg-white/95 text-primary rounded shadow-lg flex flex-col"
                  >
                    {packageLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={handleLinkClick}
                        className="px-4 py-2 hover:bg-yellow-100 transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Other Links */}
              {navLinks.map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  onClick={handleLinkClick}
                  className="hover:text-yellow-300 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}

              {/* Auth Buttons / Profile */}
              {!session ? (
                <Link
                  href="/login"
                  onClick={handleLinkClick}
                  className="bg-white text-primary font-bold px-4 py-1 rounded shadow hover:bg-yellow-100 ml-0 md:ml-2 transition-colors duration-200"
                >
                  Sign In
                </Link>
              ) : (
                <div className="relative ml-0 md:ml-2">
                  <button
                    onClick={() => setProfileOpen((v) => !v)}
                    className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded shadow hover:bg-white/30 transition-colors duration-200"
                  >
                    {session.user?.image && (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        width={32}
                        height={32}
                        className="rounded-full border shadow"
                      />
                    )}
                    <span className="font-bold text-yellow-300">{session.user?.name}</span>
                  </button>

                  {/* Dropdown */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg overflow-hidden z-50">
                      <button
                        onClick={() => signOut()}
                        className="w-full text-left px-4 py-2 hover:bg-yellow-100 text-primary font-semibold"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

