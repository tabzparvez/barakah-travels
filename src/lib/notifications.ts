export type NotificationItem = {
  id: string;
  type: string;
  message: string;
  createdAt: string;
  read?: boolean;
};

const ADMIN_KEY = "admin-notifications";
const USER_PREFIX = "user-notifications-";

const dispatchUpdate = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("notifications-updated"));
};

const readStore = (key: string): NotificationItem[] => {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(key);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as NotificationItem[];
  } catch {
    return [];
  }
};

const writeStore = (key: string, items: NotificationItem[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(items));
  dispatchUpdate();
};

const addItem = (key: string, item: NotificationItem) => {
  const existing = readStore(key);
  const next = [item, ...existing].slice(0, 50);
  writeStore(key, next);
};

export const getNotificationKey = (mode: "admin" | "user", userId?: string) =>
  mode === "admin" ? ADMIN_KEY : `${USER_PREFIX}${userId || "unknown"}`;

export const getNotifications = (
  mode: "admin" | "user",
  userId?: string
) => readStore(getNotificationKey(mode, userId));

export const addAdminNotification = (item: NotificationItem) =>
  addItem(ADMIN_KEY, item);

export const addUserNotification = (userId: string, item: NotificationItem) =>
  addItem(`${USER_PREFIX}${userId}`, item);

export const markAllRead = (mode: "admin" | "user", userId?: string) => {
  const key = getNotificationKey(mode, userId);
  const existing = readStore(key);
  if (!existing.length) return;
  const next = existing.map((item) => ({ ...item, read: true }));
  writeStore(key, next);
};
