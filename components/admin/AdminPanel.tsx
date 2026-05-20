"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/content/schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatValidationErrors, prepareContentForSave } from "@/lib/content/normalize";
import { AdminPanelBody } from "@/components/admin/AdminPanelBody";

const TABS = ["Branding & site", "Hero slides", "Services", "KPIs & testimonials", "Home sections", "Pages"] as const;
type Tab = (typeof TABS)[number];

export function AdminPanel() {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [tab, setTab] = useState<Tab>("Branding & site");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content", { credentials: "include" })
      .then((r) => {
        if (r.status === 401) {
          router.push("/admin/login");
          return null;
        }
        if (!r.ok) throw new Error("Load failed");
        return r.json() as Promise<SiteContent>;
      })
      .then((data) => {
        if (data) setContent(data);
      })
      .catch(() => setStatus("Failed to load content"));
  }, [router]);

  async function save() {
    if (!content) return;
    setSaving(true);
    setStatus("");
    let payload;
    try {
      payload = prepareContentForSave(content);
    } catch (err) {
      setSaving(false);
      setStatus(err instanceof Error ? err.message : "Invalid content in form");
      return;
    }

    const res = await fetch("/api/admin/content", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const msg = (data as { error?: string }).error ?? "Save failed";
      const details = (data as { details?: unknown }).details;
      if (res.status === 401) {
        setStatus("Session expired — sign out and log in again, then retry.");
        return;
      }
      setStatus(details ? `${msg} — ${formatValidationErrors(details)}` : msg);
      return;
    }
    setContent(payload);
    setStatus("Saved — changes go live on the site within a minute.");
    router.refresh();
  }

  async function uploadLogo(file: File) {
    const form = new FormData();
    form.set("file", file);
    form.set("folder", "branding");
    const res = await fetch("/api/admin/upload", { method: "POST", body: form, credentials: "include" });
    const data = await res.json();
    if (!res.ok) {
      setStatus(data.error ?? "Upload failed");
      return;
    }
    setContent((c) => (c ? { ...c, branding: { ...c.branding, logoUrl: data.url } } : c));
    setStatus("Logo uploaded.");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    router.push("/admin/login");
  }

  if (!content) {
    return <p className="p-8 text-slate-600">Loading…</p>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="container-page flex h-14 items-center justify-between">
          <p className="font-display font-bold text-brand-900">Content admin</p>
          <div className="flex gap-3">
            <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-brand-900">
              View site
            </Link>
            <button type="button" onClick={logout} className="text-sm font-semibold text-slate-600">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="container-page max-w-4xl space-y-6 py-10">
        <nav className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
                tab === t ? "bg-brand-900 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </nav>

        <AdminPanelBody tab={tab} content={content} setContent={setContent} onUploadLogo={uploadLogo} />

        {status ? (
          <p
            className={`rounded-lg px-4 py-3 text-sm font-medium ${
              status.startsWith("Saved") ? "bg-brand-50 text-brand-800" : "bg-red-50 text-red-800"
            }`}
          >
            {status}
          </p>
        ) : null}

        <button
          type="button"
          onClick={() => void save()}
          disabled={saving}
          className="rounded-xl bg-brand-900 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save & publish"}
        </button>

        <p className="text-xs text-slate-500">
          CMS editor v2 (full-site). If you only see &quot;Hero slide 1&quot;, hard-refresh this page (Ctrl+Shift+R). Saves
          need Vercel Storage → Blob on this project.
        </p>
      </main>
    </div>
  );
}
