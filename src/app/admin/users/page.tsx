"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
  permissions: string[];
};

const rolePermissions: Record<string, string[]> = {
  "Super Admin": ["packages", "inquiries", "quotations", "invoices", "users"],
  Admin: ["packages", "inquiries", "quotations", "invoices"],
  Employee: ["inquiries", "quotations"],
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    role: "Admin",
  });

  const loadUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      permissions: rolePermissions[form.role] ?? [],
    };
    await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setForm({ name: "", email: "", username: "", password: "", role: "Admin" });
    loadUsers();
  };

  return (
    <div className="space-y-10">
      <div className="admin-card">
        <h2 className="text-2xl font-semibold mb-2">User Management</h2>
        <p className="text-slate-500">
          Create accounts and assign roles with granular permissions.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_2fr] gap-8">
        <form onSubmit={handleSubmit} className="admin-card space-y-4">
          <h3 className="text-lg font-semibold">Add New User</h3>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="admin-input"
            required
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="admin-input"
            required
          />
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="admin-input"
            required
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Temporary Password"
            className="admin-input"
            required
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="admin-input"
          >
            <option value="Super Admin">Super Admin</option>
            <option value="Admin">Admin</option>
            <option value="Employee">Employee</option>
          </select>
          <button type="submit" className="btn w-full">
            Create User
          </button>
        </form>

        <div className="admin-card">
          <h3 className="text-lg font-semibold mb-4">Team Members</h3>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border border-slate-200 rounded-2xl p-4"
              >
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="badge bg-slate-100 text-slate-700">
                    {user.role}
                  </span>
                  <span className="text-xs text-slate-400">
                    {user.permissions?.join(", ")}
                  </span>
                </div>
              </div>
            ))}
            {users.length === 0 && (
              <p className="text-sm text-slate-500">No users created yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
