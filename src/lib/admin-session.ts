"use client";

import type { PermissionSet } from "@/lib/local-data";

export type AdminSession = {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Admin" | "Employee";
  permissions: PermissionSet;
};

export function getAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("barakahAdminSession");
  if (!stored) return null;

  try {
    return JSON.parse(stored) as AdminSession;
  } catch {
    return null;
  }
}

export function getAdminAuthHeaders(): HeadersInit {
  const session = getAdminSession();
  if (!session) return {};
  return {
    "x-admin-user-id": session.id,
    "x-admin-user-email": session.email,
  };
}
