"use client";
import Link from 'next/link';
import Image from 'next/image';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  // Helper to close menu on link click (mobile only)
  const handleLinkClick = () => {
    if (menuOpen) setMenuOpen(false);
  };
  return (
    <header className="w-full bg-gradient-to-r from-primary to-primary-dark shadow-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <Image
  src="/newlogo.png"
  alt="Barakah Travels Logo"
  width={120}
  height={120}
  className="rounded-full border-2 border-yellow-500 shadow bg-white object-cover"
  priority
  style={{ imageRendering: 'crisp-edges' }}
/>

          <span className="text-2xl font-extrabold text-yellow-400 tracking-wide font-heading ml-2">Barakah Travels</span>
        </div>
        <button className="md:hidden text-white text-2xl ml-auto" onClick={() => setMenuOpen(v => !v)} aria-label="Open Menu">
          <FaBars />
        </button>
        <nav className={`flex-col md:flex-row md:flex gap-6 text-base font-semibold px-6 py-2 rounded-xl shadow absolute md:static right-6 top-20 md:top-auto md:right-auto z-50 transition-all duration-200
          ${menuOpen ? 'flex bg-gradient-to-r from-primary/90 to-primary-dark/90 text-white' : 'hidden md:flex bg-white/10 text-white backdrop-blur'}`}>
          <Link href="/" onClick={handleLinkClick}>Home</Link>
          <Link href="/packages" onClick={handleLinkClick}>Packages</Link>
          <Link href="/about" onClick={handleLinkClick}>About</Link>
          <Link href="/gallery" onClick={handleLinkClick}>Gallery</Link>
          <Link href="/blog" onClick={handleLinkClick}>Blog</Link>
          <Link href="/faq" onClick={handleLinkClick}>FAQ</Link>
          <Link href="/contact" onClick={handleLinkClick}>Contact</Link>
          <Link href="/privacy-policy" onClick={handleLinkClick}>Privacy</Link>
          <Link href="/terms" onClick={handleLinkClick}>Terms</Link>
          {/* TODO: Show Admin link only for authenticated admin users */}
          {/* <Link href="/admin" onClick={handleLinkClick}>Admin</Link> */}
          {!session ? (
            <Link href="/login" onClick={handleLinkClick} className="bg-white text-primary font-bold px-4 py-1 rounded shadow hover:bg-yellow-100 ml-2">Sign In</Link>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              {session.user?.image && (
                <Image src={session.user.image} alt={session.user.name || 'User'} width={32} height={32} className="rounded-full border shadow" />
              )}
              <span className="font-bold text-yellow-300">{session.user?.name}</span>
              <button onClick={() => signOut()} className="bg-white text-primary font-bold px-3 py-1 rounded shadow hover:bg-yellow-100">Sign Out</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
