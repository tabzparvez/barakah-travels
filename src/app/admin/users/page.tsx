"use client";

import { useEffect, useState } from "react";

type PermissionSet = {
  packages: boolean;
  inquiries: boolean;
  quotations: boolean;
  invoices: boolean;
};

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: PermissionSet;
};

const defaultPermissions: PermissionSet = {
  packages: false,
  inquiries: true,
  quotations: true,
  invoices: false,
};

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Employee",
    password: "",
    permissions: defaultPermissions,
  });
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    setUsers((prev) => [data.user, ...prev]);
    setForm({
      name: "",
      email: "",
      role: "Employee",
      password: "",
      permissions: defaultPermissions,
    });
  }

  async function handleUpdate(event: React.FormEvent) {
    event.preventDefault();
    if (!editing) return;
    const response = await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id: editing }),
    });
    const data = await response.json();
    setUsers((prev) => prev.map((user) => (user.id === editing ? data.user : user)));
    setEditing(null);
    setForm({
      name: "",
      email: "",
      role: "Employee",
      password: "",
      permissions: defaultPermissions,
    });
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
    setUsers((prev) => prev.filter((user) => user.id !== id));
  }

  function startEdit(user: AdminUser) {
    setEditing(user.id);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      password: "",
      permissions: user.permissions,
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">User Management</h1>
        <p className="text-white/70 mt-2">
          Super Admin can create, edit, and assign roles with specific
          permissions.
        </p>
      </div>

      <form
        onSubmit={editing ? handleUpdate : handleSubmit}
        className="rounded-3xl border border-white/10 bg-white/5 p-6 grid gap-4 md:grid-cols-2"
      >
        <div>
          <label className="text-sm text-white/70">Full Name</label>
          <input
            value={form.name}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, name: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
            required
          />
        </div>
        <div>
          <label className="text-sm text-white/70">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, email: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
            required
          />
        </div>
        <div>
          <label className="text-sm text-white/70">Role</label>
          <select
            value={form.role}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, role: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
          >
            <option>Super Admin</option>
            <option>Admin</option>
            <option>Employee</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-white/70">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, password: event.target.value }))
            }
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white"
            placeholder={editing ? "Leave blank to keep" : "Set password"}
          />
        </div>
        <div className="md:col-span-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Object.keys(form.permissions).map((key) => (
            <label
              key={key}
              className="flex items-center gap-2 text-sm text-white/70"
            >
              <input
                type="checkbox"
                checked={form.permissions[key as keyof PermissionSet]}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    permissions: {
                      ...prev.permissions,
                      [key]: event.target.checked,
                    },
                  }))
                }
                className="h-4 w-4 rounded border-white/20 bg-black/40"
              />
              {key}
            </label>
          ))}
        </div>
        <div className="md:col-span-2 flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-xl bg-yellow-400 text-black px-6 py-2 font-semibold"
          >
            {editing ? "Update user" : "Create user"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setForm({
                  name: "",
                  email: "",
                  role: "Employee",
                  password: "",
                  permissions: defaultPermissions,
                });
              }}
              className="rounded-xl border border-white/20 px-6 py-2 text-white"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4">Active Users</h2>
        <div className="grid gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="rounded-2xl border border-white/10 bg-black/40 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-white/70">{user.email}</p>
                <p className="text-sm text-yellow-300">{user.role}</p>
              </div>
              <div className="text-xs text-white/60">
                Permissions: {Object.keys(user.permissions).filter((key) => user.permissions[key as keyof PermissionSet]).join(", ") || "None"}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(user)}
                  className="rounded-xl border border-white/20 px-4 py-2 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="rounded-xl border border-red-400/40 px-4 py-2 text-sm text-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
