"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Login() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl font-bold mb-6">Sign in to your account</h1>

      <button
        onClick={() =>
          signIn("google", {
            callbackUrl: "/",
          })
        }
        className="flex items-center gap-3 px-6 py-3 bg-white border rounded shadow hover:bg-gray-100 transition"
      >
        <Image src="/google-logo.png" alt="Google" width={24} height={24} />
        Sign in with Google
      </button>

      <p className="mt-4 text-gray-500 text-sm text-center">
        New users will be automatically registered when signing in with Google.
      </p>
    </main>
  );
}
