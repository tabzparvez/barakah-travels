import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SessionWrapper from "@/components/SessionWrapper";
import PageTransition from "@/components/PageTransition";
import PageLoader from "@/components/PageLoader";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#fbf7ef] text-secondary min-h-screen flex flex-col`}
      >
        <SessionWrapper>
          <Header />
          <PageLoader />

          {/* MAIN CONTENT */}
          <main className="w-full flex-1 pt-28 md:pt-32">
            <div className="max-w-7xl mx-auto px-4">
              <PageTransition>{children}</PageTransition>
            </div>
          </main>
        </SessionWrapper>
        <a
  href="https://wa.me/923183548299"
  target="_blank"
  className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition"
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24" fill="white">
    <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 2.816.74 5.566 2.148 7.984L0 32l7.848-2.108a15.93 15.93 0 0 0 8.152 2.252c8.836 0 16-7.164 16-16S24.836.396 16 .396zm0 29.168c-2.42 0-4.788-.648-6.852-1.876l-.492-.292-4.656 1.252 1.244-4.532-.32-.516A13.55 13.55 0 0 1 2.452 16.4c0-7.49 6.058-13.548 13.548-13.548S29.548 8.91 29.548 16.4 23.49 29.564 16 29.564zm7.52-10.084c-.412-.204-2.44-1.204-2.82-1.34-.38-.136-.656-.204-.932.204-.276.412-1.064 1.34-1.304 1.616-.24.276-.48.308-.892.104-.412-.204-1.74-.64-3.316-2.044-1.228-1.096-2.056-2.452-2.296-2.864-.24-.412-.024-.636.18-.84.184-.184.412-.48.616-.72.204-.24.272-.412.408-.684.136-.276.068-.516-.034-.72-.104-.204-.932-2.244-1.276-3.072-.336-.804-.676-.696-.932-.708l-.792-.012c-.276 0-.72.104-1.096.516-.376.412-1.44 1.408-1.44 3.436 0 2.028 1.476 3.988 1.68 4.264.204.276 2.9 4.428 7.024 6.204.984.424 1.752.676 2.352.864.988.312 1.888.268 2.6.164.792-.12 2.44-1 2.784-1.964.344-.964.344-1.792.24-1.964-.104-.172-.38-.276-.792-.48z"/>
  </svg>
</a>


        {/* FOOTER */}
        <footer className="bg-secondary text-secondary-light mt-16">
          <div className="max-w-7xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
            <div className="space-y-3">
              <h3 className="text-primary font-bold text-lg">
                Barakah Travels
              </h3>
              <p className="text-sm text-secondary-light/80">
                Trusted Umrah & travel specialists delivering visa support,
                hotels near Haram, and guided spiritual journeys across
                Pakistan.
              </p>
              <a
                href="https://wa.me/923183548299"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-4 py-2 text-sm font-semibold shadow-md"
              >
                <span>WhatsApp Us 24/7</span>
              </a>
            </div>

            <div className="space-y-3 text-sm">
              <h4 className="font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2 text-secondary-light/80">
                <li><a href="/about" className="hover:text-white">About</a></li>
                <li><a href="/packages" className="hover:text-white">Umrah Packages</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
                <li><a href="/submit-review" className="hover:text-white">Submit Review</a></li>
              </ul>
            </div>

            <div className="space-y-3 text-sm">
              <h4 className="font-semibold text-white">Services</h4>
              <ul className="space-y-2 text-secondary-light/80">
                <li>Umrah Visa Processing</li>
                <li>Hotel Bookings Near Haram</li>
                <li>Private Transport</li>
                <li>Ziyarat Tours</li>
              </ul>
            </div>

            <div className="space-y-3 text-sm">
              <h4 className="font-semibold text-white">Cities Served</h4>
              <ul className="space-y-2 text-secondary-light/80">
                <li>Karachi</li>
                <li>Lahore</li>
                <li>Islamabad</li>
                <li>Multan</li>
              </ul>
              <div className="text-secondary-light/70 text-xs">
                Phone: +92 340 0799777
              </div>
              <div className="text-secondary-light/70 text-xs">
                Email: info@barakahtravels.online
              </div>
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
