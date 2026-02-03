import Link from "next/link";
import Image from "next/image";

export default function TurkeyPage() {
  return (
    <main className="bg-[#0b1220] text-white rounded-[32px] mt-6 md:mt-10 p-8 md:p-12 border border-white/10">
      <div className="grid gap-10 md:grid-cols-2 items-center">
        <div>
          <p className="uppercase tracking-[0.4em] text-yellow-400 text-xs mb-4">
            Turkey Tour Packages
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Discover Turkey with Luxury Stays & Curated Experiences
          </h1>
          <p className="text-white/75 mb-6">
            From Istanbul&apos;s heritage to Cappadocia&apos;s sunsets, our Turkey tour
            packages combine premium hotels, guided excursions, and seamless
            transfers designed for discerning travelers.
          </p>
          <Link
            href="/#inquiry"
            className="inline-flex items-center px-6 py-3 rounded-full bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition"
          >
            Plan Your Turkey Tour
          </Link>
        </div>
        <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden border border-white/10">
          <Image src="/turkey.jpg" alt="Turkey tours" fill className="object-cover" />
        </div>
      </div>
    </main>
  );
}
