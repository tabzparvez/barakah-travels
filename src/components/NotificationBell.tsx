"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  getNotifications,
  markAllRead,
  NotificationItem,
} from "@/lib/notifications";

type NotificationBellProps = {
  mode: "admin" | "user";
  userId?: string;
  align?: "left" | "right";
};

export default function NotificationBell({
  mode,
  userId,
  align = "right",
}: NotificationBellProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<NotificationItem[]>([]);
  const prevUnreadRef = useRef(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const unreadCount = useMemo(
    () => items.filter((item) => !item.read).length,
    [items]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!audioCtxRef.current) {
      audioCtxRef.current =
        new (window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const load = () => {
      setItems(getNotifications(mode, userId));
    };
    load();
    window.addEventListener("notifications-updated", load);
    return () => window.removeEventListener("notifications-updated", load);
  }, [mode, userId]);

  useEffect(() => {
    if (unreadCount > prevUnreadRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => null);
      }
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = 880;
      gain.gain.value = 0.12;
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.12);
    }
    prevUnreadRef.current = unreadCount;
  }, [unreadCount]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
    if (!open) {
      markAllRead(mode, userId);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="relative rounded-full border border-primary/20 p-2 bg-white/80 hover:bg-white shadow-sm transition"
        aria-label="Notifications"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full bg-primary text-white text-[10px] font-semibold flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className={`absolute mt-3 w-72 max-h-72 overflow-auto rounded-2xl bg-white shadow-lg border border-primary/10 p-3 text-sm ${
            align === "left" ? "left-0" : "right-0"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-primary">Notifications</span>
            <span className="text-xs text-gray-400">{items.length}</span>
          </div>
          {items.length === 0 ? (
            <p className="text-gray-500 text-xs">No notifications yet.</p>
          ) : (
            <ul className="space-y-2">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="rounded-xl border border-primary/10 p-3 bg-primary/5"
                >
                  <p className="font-medium text-secondary">{item.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
