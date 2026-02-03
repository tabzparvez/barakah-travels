import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SessionWrapper from "@/components/SessionWrapper";

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
    "Barakah Travels delivers premium Umrah packages from Pakistan, luxury Turkey tour packages, and bespoke Baku tour packages with concierge support.",

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
          <main className="w-full flex-1 pt-20 md:pt-24">
            <div className="max-w-7xl mx-auto px-4">{children}</div>
          </main>
        </SessionWrapper>
        <WhatsAppButton />


        <Footer />
      </body>
    </html>
  );
}
