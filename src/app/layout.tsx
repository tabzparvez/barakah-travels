import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SessionWrapper from "@/components/SessionWrapper";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Barakah Travels | Umrah, Visa & Travel Services",
  description: "Barakah Travels - Your trusted partner for Umrah packages, visas, and travel services.",
  icons: {
    icon: "/barakah-logo.png",
    shortcut: "/barakah-logo.png",
    apple: "/barakah-logo.png",
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black min-h-screen flex flex-col`}>
        <SessionWrapper>
          <Header />
          <main className="max-w-7xl mx-auto px-4 flex-1">{children}</main>
        </SessionWrapper>
        <footer className="bg-secondary text-secondary-light py-8 mt-16">
          <div className="max-w-7xl mx-auto flex flex-col gap-4 md:flex-row md:justify-between md:items-center px-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4 text-center md:text-left">
              <span className="flex items-center gap-2 font-bold text-primary justify-center md:justify-start"><FaPhoneAlt /> Call:</span>
              <a href="tel:+923400799777" className="text-primary font-semibold">+92 340 0799777</a>
              <span className="flex items-center gap-2 font-bold text-primary md:ml-2 justify-center md:justify-start"><FaWhatsapp /> WhatsApp:</span>
              <a href="https://wa.me/923183548299" className="text-primary font-semibold">+92 318 3548299</a>
              <span className="flex items-center gap-2 font-bold text-primary md:ml-2 justify-center md:justify-start"><FaEnvelope /> Email:</span>
              <a href="mailto:info@barakahtravels.online" className="text-primary font-semibold">info@barakahtravels.online</a>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:gap-2 text-center md:text-right">
              <a href="/privacy-policy" className="text-primary mx-2">Privacy Policy</a>
              <span className="hidden md:inline">|</span>
              <a href="/terms" className="text-primary mx-2">Terms & Conditions</a>
            </div>
          </div>
          <div className="text-center text-xs text-secondary-light mt-4">&copy; 2025 Barakah Travels. All rights reserved.</div>
        </footer>
      </body>
    </html>
  );
}
