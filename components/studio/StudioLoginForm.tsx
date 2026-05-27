"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Shield } from "lucide-react";

export function StudioLoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError((data as { error?: string }).error ?? "Login failed");
      return;
    }
    router.push(search.get("next") || "/studio");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f3f3f4] p-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-lg"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#2f4050] text-white">
            <Shield className="h-6 w-6" aria-hidden />
          </span>
          <div>
            <h1 className="font-display text-xl font-bold text-slate-900">Universe Studio</h1>
            <p className="text-sm text-slate-600">Sign in to manage website content</p>
          </div>
        </div>
        <label className="mt-8 block text-sm font-semibold text-slate-700">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5"
            autoComplete="current-password"
            required
          />
        </label>
        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-[#2f4050] px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
