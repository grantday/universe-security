"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/content/schema";
import { useRouter } from "next/navigation";

export function AdminPanel() {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then(setContent)
      .catch(() => setStatus("Failed to load content"));
  }, []);

  async function save() {
    if (!content) return;
    setSaving(true);
    setStatus("");
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setStatus(data.error ?? "Save failed");
      return;
    }
    setStatus("Saved — changes go live on the site within a minute.");
    router.refresh();
  }

  async function uploadLogo(file: File) {
    const form = new FormData();
    form.set("file", file);
    form.set("folder", "branding");
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    const data = await res.json();
    if (!res.ok) {
      setStatus(data.error ?? "Upload failed");
      return;
    }
    setContent((c) => (c ? { ...c, branding: { ...c.branding, logoUrl: data.url } } : c));
    setStatus("Logo uploaded.");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
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
            <a href="/" className="text-sm font-semibold text-slate-600 hover:text-brand-900">
              View site
            </a>
            <button type="button" onClick={logout} className="text-sm font-semibold text-slate-600">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="container-page max-w-3xl space-y-8 py-10">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="font-display text-lg font-bold text-brand-900">Branding</h2>
          <p className="mt-1 text-sm text-slate-600">Logo appears in the header when uploaded.</p>
          {content.branding.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={content.branding.logoUrl} alt="Logo preview" className="mt-4 h-12 w-auto object-contain" />
          ) : null}
          <input
            type="file"
            accept="image/*"
            className="mt-4 block text-sm"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void uploadLogo(f);
            }}
          />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="font-display text-lg font-bold text-brand-900">Site details</h2>
          <div className="mt-4 grid gap-4">
            <Field label="Company name" value={content.site.name} onChange={(v) => setContent({ ...content, site: { ...content.site, name: v } })} />
            <Field label="Tagline" value={content.site.tagline} onChange={(v) => setContent({ ...content, site: { ...content.site, tagline: v } })} />
            <Field label="Email" value={content.site.email} onChange={(v) => setContent({ ...content, site: { ...content.site, email: v } })} />
            <Field
              label="Sales phone (display)"
              value={content.site.salesPhoneDisplay}
              onChange={(v) => setContent({ ...content, site: { ...content.site, salesPhoneDisplay: v } })}
            />
            <Field
              label="Emergency phone (display)"
              value={content.site.emergencyPhoneDisplay}
              onChange={(v) => setContent({ ...content, site: { ...content.site, emergencyPhoneDisplay: v } })}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="font-display text-lg font-bold text-brand-900">Hero (slide 1)</h2>
          <div className="mt-4 grid gap-4">
            <Field
              label="Eyebrow"
              value={content.heroSlides[0]?.eyebrow ?? ""}
              onChange={(v) => {
                const slides = [...content.heroSlides];
                slides[0] = { ...slides[0]!, eyebrow: v };
                setContent({ ...content, heroSlides: slides });
              }}
            />
            <Field
              label="Title"
              value={content.heroSlides[0]?.title ?? ""}
              onChange={(v) => {
                const slides = [...content.heroSlides];
                slides[0] = { ...slides[0]!, title: v };
                setContent({ ...content, heroSlides: slides });
              }}
            />
            <label className="block text-sm font-semibold text-slate-700">
              Body
              <textarea
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                rows={3}
                value={content.heroSlides[0]?.body ?? ""}
                onChange={(e) => {
                  const slides = [...content.heroSlides];
                  slides[0] = { ...slides[0]!, body: e.target.value };
                  setContent({ ...content, heroSlides: slides });
                }}
              />
            </label>
          </div>
        </section>

        {status ? <p className="text-sm font-medium text-brand-700">{status}</p> : null}

        <button
          type="button"
          onClick={() => void save()}
          disabled={saving}
          className="rounded-xl bg-brand-900 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save & publish"}
        </button>

        <p className="text-xs text-slate-500">
          Part of this Vercel site. Set ADMIN_PASSWORD in Vercel; add Storage → Blob once for image uploads.
        </p>
      </main>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      <input
        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-normal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
