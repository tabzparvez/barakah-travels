"use client";

import NotificationBell from "@/components/NotificationBell";
import UserAvatar from "@/components/UserAvatar";

type AdminTopBarProps = {
  name?: string | null;
  image?: string | null;
};

export default function AdminTopBar({ name, image }: AdminTopBarProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-400">
          Admin Console
        </p>
        <h1 className="text-xl font-semibold text-primary">
          Welcome back, {name || "Admin"}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <NotificationBell mode="admin" align="right" />
        <UserAvatar src={image} name={name} size={36} />
      </div>
    </div>
  );
}
