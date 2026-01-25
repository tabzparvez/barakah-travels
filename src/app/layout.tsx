import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SessionWrapper from "@/components/SessionWrapper";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope } from "react-icons/fa";

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
    default: "Barakah Travels | Umrah, Visa & Travel Services",
    template: "%s | Barakah Travels",
  },
  description:
    "Barakah Travels – Trusted Umrah, Hajj, Visa & Travel services in Pakistan. WhatsApp booking available.",

  openGraph: {
    title: "Barakah Travels",
    description:
      "Your trusted partner for Umrah packages, visas, and travel services.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black min-h-screen flex flex-col`}
      >
        <SessionWrapper>
          <Header />

          {/* MAIN CONTENT */}
          <main className="w-full flex-1">
            <div className="max-w-7xl mx-auto px-4">{children}</div>
          </main>
        </SessionWrapper>

        {/* FOOTER */}
        <footer className="bg-secondary text-secondary-light mt-16">
          <div className="max-w-7xl mx-auto px-4 py-8 grid gap-6 md:grid-cols-2">
            {/* Business Info */}
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-primary font-bold text-lg">
                Barakah Travels
              </h3>
              <p className="text-sm">
                Trusted Umrah & Travel Services. Visa assistance, hotel
                arrangements & guided journeys.
              </p>

              <div className="flex flex-col gap-2 mt-4 md:items-start items-center">
                <span className="flex items-center gap-2">
                  <FaPhoneAlt />{" "}
                  <a href="tel:+923400799777" className="font-semibold">
                    +92 340 0799777
                  </a>
                </span>
                <span className="flex items-center gap-2">
                  <FaWhatsapp />{" "}
                  <a
                    href="https://wa.me/923183548299"
                    className="font-semibold"
                  >
                    +92 318 3548299
                  </a>
                </span>
                <span className="flex items-center gap-2">
                  <FaEnvelope />{" "}
                  <a
                    href="mailto:info@barakahtravels.online"
                    className="font-semibold"
                  >
                    info@barakahtravels.online
                  </a>
                </span>
              </div>
            </div>

            {/* Legal */}
            <div className="flex flex-col justify-center items-center md:items-end gap-2 text-sm">
              <a href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:underline">
                Terms & Conditions
              </a>
            </div>
          </div>

          <div className="text-center text-xs py-4 border-t border-white/10">
            © 2025 Barakah Travels. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
