import Link from "next/link";
import Image from "next/image";

export default function BakuPage() {
  return (
    <main className="bg-[#0b1220] text-white rounded-[32px] mt-6 md:mt-10 p-8 md:p-12 border border-white/10">
      <div className="grid gap-10 md:grid-cols-2 items-center">
        <div>
          <p className="uppercase tracking-[0.4em] text-yellow-400 text-xs mb-4">
            Baku Tour Packages
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Experience Baku in Style with Tailored Luxury Escapes
          </h1>
          <p className="text-white/75 mb-6">
            Our Baku tour packages blend skyline stays, cultural discoveries,
            and private transport for a refined and unforgettable Caspian
            getaway.
          </p>
          <Link
            href="/#inquiry"
            className="inline-flex items-center px-6 py-3 rounded-full bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition"
          >
            Plan Your Baku Tour
          </Link>
        </div>
        <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden border border-white/10">
          <Image src="/baku.jpg" alt="Baku tours" fill className="object-cover" />
        </div>
      </div>
    </main>
  );
}
