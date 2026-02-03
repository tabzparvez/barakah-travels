import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SessionWrapper from "@/components/SessionWrapper";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.barakahtravels.online"),
  title: {
    default: "Barakah Travels | Premium Umrah & International Tours",
    template: "%s | Barakah Travels",
  },
  description:
    "Premium Umrah packages from Pakistan, Turkey tour packages, and Baku tour packages with luxury hotels, seamless visas, and 24/7 concierge support.",
  openGraph: {
    title: "Barakah Travels",
    description:
      "Premium Umrah packages, Turkey tours, and Baku luxury escapes tailored for travelers from Pakistan.",
    url: "https://www.barakahtravels.online",
    siteName: "Barakah Travels",
    images: [
      {
        url: "/newlogo.png",
        width: 800,
        height: 800,
        alt: "Barakah Travels Logo",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0b0b0c] text-white min-h-screen flex flex-col`}
      >
        <SessionWrapper>
          <Header />
          <main className="w-full flex-1 pt-24 md:pt-28">
            <div className="max-w-7xl mx-auto px-4">{children}</div>
          </main>
        </SessionWrapper>

        <a
          href="https://wa.me/923183548299"
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition"
          aria-label="Chat on WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="24"
            height="24"
            fill="white"
          >
            <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 2.816.74 5.566 2.148 7.984L0 32l7.848-2.108a15.93 15.93 0 0 0 8.152 2.252c8.836 0 16-7.164 16-16S24.836.396 16 .396zm0 29.168c-2.42 0-4.788-.648-6.852-1.876l-.492-.292-4.656 1.252 1.244-4.532-.32-.516A13.55 13.55 0 0 1 2.452 16.4c0-7.49 6.058-13.548 13.548-13.548S29.548 8.91 29.548 16.4 23.49 29.564 16 29.564zm7.52-10.084c-.412-.204-2.44-1.204-2.82-1.34-.38-.136-.656-.204-.932.204-.276.412-1.064 1.34-1.304 1.616-.24.276-.48.308-.892.104-.412-.204-1.74-.64-3.316-2.044-1.228-1.096-2.056-2.452-2.296-2.864-.24-.412-.024-.636.18-.84.184-.184.412-.48.616-.72.204-.24.272-.412.408-.684.136-.276.068-.516-.034-.72-.104-.204-.932-2.244-1.276-3.072-.336-.804-.676-.696-.932-.708l-.792-.012c-.276 0-.72.104-1.096.516-.376.412-1.44 1.408-1.44 3.436 0 2.028 1.476 3.988 1.68 4.264.204.276 2.9 4.428 7.024 6.204.984.424 1.752.676 2.352.864.988.312 1.888.268 2.6.164.792-.12 2.44-1 2.784-1.964.344-.964.344-1.792.24-1.964-.104-.172-.38-.276-.792-.48z" />
          </svg>
        </a>

        <footer className="bg-[#0f0f11] border-t border-white/10 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">
                Barakah Travels
              </p>
              <h3 className="text-xl font-semibold">Luxury Travel Concierge</h3>
              <p className="text-sm text-white/70">
                Premium Umrah experiences, curated international tours, and
                private travel management tailored for discerning travelers.
              </p>
            </div>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-yellow-300" />
                <span>+92 318 3548299</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-yellow-300" />
                <span>info@barakahtravels.online</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-yellow-300" />
                <span>Karachi • Lahore • Islamabad</span>
              </div>
            </div>
            <div className="space-y-3 text-sm text-white/70 md:text-right">
              <p className="font-semibold text-white">Quick Links</p>
              <div className="flex flex-col gap-2">
                <a href="/privacy-policy" className="hover:text-yellow-300">
                  Privacy Policy
                </a>
                <a href="/terms" className="hover:text-yellow-300">
                  Terms & Conditions
                </a>
                <a href="/contact" className="hover:text-yellow-300">
                  Contact Concierge
                </a>
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-white/50 py-4 border-t border-white/10">
            © 2025 Barakah Travels. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
