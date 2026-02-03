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
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { data: session } = useSession();
  const pathname = usePathname();

  /* Close menus on route change */
  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  /* Header shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll on mobile */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const handleLinkClick = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/packages", label: "Umrah Packages" },
    { href: "/contact?destination=Turkey", label: "Turkey" },
    { href: "/contact?destination=Baku", label: "Baku" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-20 md:h-24">

        {/* Logo */}
        <Link href="/" onClick={handleLinkClick} className="flex items-center gap-2">
<Image
  src="/newlogo.png"
  alt="Barakah Travels"
  width={120}
  height={120}
  priority
  className="
    h-20 w-auto
    md:h-18
    object-contain drop-shadow-x1
  "
/>




          <span className="text-lg md:text-2xl font-extrabold text-primary">
  Barakah Travels
</span>



        </Link>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-primary text-2xl z-50"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Overlay */}
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
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`z-50 flex flex-col md:flex-row items-start md:items-center gap-6 px-6 py-4 rounded-2xl
            bg-white md:bg-transparent text-primary
            absolute md:static right-6 top-20 md:right-auto md:top-auto
            ${menuOpen ? "block" : "hidden md:flex"}
          `}
        >
          {/* Links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="hover:text-primary-dark font-semibold"
            >
              {link.label}
            </Link>
          ))}

          {/* Auth */}
          {!session ? (
            <Link
              href="/login"
              onClick={handleLinkClick}
              className="bg-primary text-white font-bold px-4 py-2 rounded-full shadow hover:bg-primary-dark transition"
            >
              Sign In
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-full hover:bg-primary/20"
              >
                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                )}
                <span className="text-primary font-bold">
                  {session.user?.name?.split(" ")[0]}
                </span>
              </button>

              {profileOpen && (
  <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg overflow-hidden text-primary">
{session.user?.email === "info@barakahtravels.online" && (
  <Link
    href="/admin"
    onClick={handleLinkClick}
    className="block px-4 py-2 hover:bg-yellow-100 font-semibold"
  >
    Admin Panel
  </Link>
)}

    <Link
      href="/dashboard"
      onClick={handleLinkClick}
      className="block px-4 py-2 hover:bg-yellow-100 font-semibold"
    >
      Dashboard
    </Link>

    <form action="/api/auth/signout" method="post">
      <button
        type="submit"
        className="w-full text-left px-4 py-2 hover:bg-yellow-100 font-semibold"
      >
        Sign Out
      </button>
    </form>

  </div>
)}

            </div>
          )}
        </motion.nav>
      </div>
    </header>
  );
}
