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
  const [packagesOpen, setPackagesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { data: session } = useSession();
  const pathname = usePathname();

  /* Close menus on route change */
  useEffect(() => {
    setMenuOpen(false);
    setPackagesOpen(false);
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

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-md shadow-xl"
          : "bg-gradient-to-r from-primary to-primary-dark"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" onClick={handleLinkClick} className="flex items-center gap-2">
<Image
  src="/newlogo.png"
  alt="Barakah Travels"
  width={120}
  height={120}
  priority
  className="
    object-contain
    drop-shadow-xl
    w-[70px] h-[70px] md:w-[120px] md:h-[120px]
  "
/>



          <span className="text-2xl md:text-3xl font-extrabold text-yellow-400 tracking-wide">
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
          className={`z-50 flex flex-col md:flex-row items-start md:items-center gap-6 px-6 py-4 rounded-xl
            bg-gradient-to-r from-primary/95 to-primary-dark/95
            md:bg-transparent text-white
            absolute md:static right-6 top-20 md:right-auto md:top-auto
            ${menuOpen ? "block" : "hidden md:flex"}
          `}
        >
          {/* Packages */}
          <div className="relative">
            <button
              onClick={() => setPackagesOpen((v) => !v)}
              className="hover:text-yellow-300 font-semibold"
            >
              Packages ▾
            </button>

            {packagesOpen && (
              <div className="absolute left-0 mt-2 w-44 bg-white text-primary rounded-lg shadow-lg overflow-hidden">
                <Link
                  href="/packages"
                  onClick={handleLinkClick}
                  className="block px-4 py-2 hover:bg-yellow-100"
                >
                  Umrah Packages
                </Link>
              </div>
            )}
          </div>

          {/* Links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="hover:text-yellow-300 font-semibold"
            >
              {link.label}
            </Link>
          ))}

          {/* Auth */}
          {!session ? (
            <Link
              href="/login"
              onClick={handleLinkClick}
              className="bg-white text-primary font-bold px-4 py-1 rounded shadow"
            >
              Sign In
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded hover:bg-white/30"
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
                <span className="text-yellow-300 font-bold">
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
