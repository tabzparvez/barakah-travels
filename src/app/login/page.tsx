"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  /* Auto redirect if already logged in */
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-card p-8 text-center">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/newlogo.png"
            alt="Barakah Travels"
            width={80}
            height={80}
            className="rounded-full"
          />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-primary mb-2">
          Welcome to Barakah Travels
        </h1>
        <p className="text-sm text-secondary mb-6">
          Sign in to continue and manage your bookings, reviews and inquiries.
        </p>

        {/* Google Button */}
        <button
          onClick={() =>
            signIn("google", {
              callbackUrl: "/",
            })
          }
          className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-white border rounded-lg shadow hover:bg-gray-100 transition font-semibold"
        >
          <Image
            src="/google-logo.png"
            alt="Google"
            width={22}
            height={22}
          />
          Continue with Google
        </button>

        {/* Trust note */}
        <p className="mt-4 text-xs text-gray-500">
          Secure Google sign-in. No passwords required.
        </p>

        {/* Loading state */}
        {status === "loading" && (
          <p className="mt-4 text-sm text-secondary">
            Checking your session…
          </p>
        )}
      </div>
    </main>
  );
}
