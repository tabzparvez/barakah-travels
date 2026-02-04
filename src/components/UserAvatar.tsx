"use client";

import Image from "next/image";

type UserAvatarProps = {
  src?: string | null;
  name?: string | null;
  size?: number;
};

export default function UserAvatar({ src, name, size = 36 }: UserAvatarProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={name || "User"}
        width={size}
        height={size}
        className="rounded-full border border-primary/20 shadow-sm object-cover"
      />
    );
  }

  return (
    <div
      className="rounded-full border border-primary/20 shadow-sm bg-primary/10 text-primary flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-label="Default avatar"
      role="img"
    >
      <svg
        width={size * 0.55}
        height={size * 0.55}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </div>
  );
}
