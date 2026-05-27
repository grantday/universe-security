"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DEFAULT_LOGO_PATH, resolveLogoUrl } from "@/lib/brand";
import type { StudioSiteSettings } from "@/lib/studio/site-settings";
import { UniverseLogo } from "@/components/brand/UniverseLogo";
import { StudioMediaHint } from "@/components/studio/StudioMediaHint";
import { StudioMediaIdField } from "@/components/studio/StudioMediaIdField";
import {
  StudioField,
  StudioSaveButton,
  StudioStatusMessage,
  StudioTextArea,
} from "@/components/studio/studio-ui";
import { studioPut, useStudioFetch } from "@/components/studio/useStudioFetch";

type Payload = { settings: StudioSiteSettings };

export function SiteSettingsEditor() {
  const { data, setData, status, setStatus, loading } = useStudioFetch<Payload>("/api/studio/site", "/studio/site");
  const [settings, setSettings] = useState<StudioSiteSettings | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data?.settings) setSettings(data.settings);
  }, [data]);

  function patch(p: Partial<StudioSiteSettings>) {
    if (!settings) return;
    setSettings({ ...settings, ...p });
  }

  async function save() {
    if (!settings) return;
    setSaving(true);
    setStatus("");
    const result = await studioPut<Payload>("/api/studio/site", { settings });
    setSaving(false);
    if (!result.ok) {
      setStatus(result.error);
      return;
    }
    setData(result.data);
    setSettings(result.data.settings);
    setStatus("Saved — site name, contact details, and branding updated site-wide.");
  }

  if (loading || !settings) {
    return <p className="text-sm text-slate-600">{loading ? "Loading settings…" : status || "Could not load."}</p>;
  }

  const previewLogoUrl = settings.logoId ? settings.logoUrl : resolveLogoUrl(settings.logoUrl);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-display font-bold text-slate-900">Business identity</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <StudioField label="Site name" value={settings.name} onChange={(name) => patch({ name })} />
          <StudioField label="Tagline" value={settings.tagline} onChange={(tagline) => patch({ tagline })} />
        </div>
        <div className="mt-4">
          <StudioTextArea label="Description" value={settings.description} onChange={(description) => patch({ description })} />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-display font-bold text-slate-900">Contact</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <StudioField label="Email" type="email" value={settings.email} onChange={(email) => patch({ email })} />
          <StudioField label="Office hours" value={settings.officeHours} onChange={(officeHours) => patch({ officeHours })} />
          <StudioField label="Sales phone (tel)" value={settings.salesPhone} onChange={(salesPhone) => patch({ salesPhone })} />
          <StudioField
            label="Sales phone (display)"
            value={settings.salesPhoneDisplay}
            onChange={(salesPhoneDisplay) => patch({ salesPhoneDisplay })}
          />
          <StudioField
            label="Emergency phone (tel)"
            value={settings.emergencyPhone}
            onChange={(emergencyPhone) => patch({ emergencyPhone })}
          />
          <StudioField
            label="Emergency phone (display)"
            value={settings.emergencyPhoneDisplay}
            onChange={(emergencyPhoneDisplay) => patch({ emergencyPhoneDisplay })}
          />
        </div>
        <div className="mt-4">
          <StudioTextArea label="Address" value={settings.addressFull} onChange={(addressFull) => patch({ addressFull })} rows={2} />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-display font-bold text-slate-900">Branding</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="flex flex-wrap items-center gap-4 rounded-lg border border-slate-100 bg-white p-4">
            <UniverseLogo logoUrl={previewLogoUrl} className="h-10 w-auto max-w-[220px]" />
            <p className="text-xs text-slate-500">Light background → dark wordmark</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 rounded-lg border border-slate-700 bg-[#0B2545] p-4">
            <UniverseLogo logoUrl={previewLogoUrl} onDark className="h-10 w-auto max-w-[220px]" />
            <p className="text-xs text-white/70">Dark background → light wordmark</p>
          </div>
        </div>
        <div className="mt-4 min-w-0 text-sm text-slate-600">
            <p className="font-semibold text-slate-800">Logo preview</p>
            <p className="mt-1">
              {settings.logoId
                ? `Using Payload media #${settings.logoId}.`
                : `No media ID — site uses ${DEFAULT_LOGO_PATH} until you upload one.`}
            </p>
        </div>
        <StudioMediaHint className="mt-4" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <StudioField
            label="Logo mark text"
            value={settings.logoMarkText}
            onChange={(logoMarkText) => patch({ logoMarkText })}
            hint="1–2 characters shown when no logo image"
          />
          <StudioMediaIdField
            label="Logo media ID (Payload)"
            value={settings.logoId}
            onChange={(logoId) => patch({ logoId, logoUrl: logoId ? settings.logoUrl : "" })}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => patch({ logoId: null, logoUrl: "" })}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Use default site logo
          </button>
          <Link
            href="/admin/collections/media"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-[#2f4050]/30 px-3 py-1.5 text-xs font-semibold text-[#2f4050] hover:bg-[#2f4050]/5"
          >
            Open Payload Media →
          </Link>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-display font-bold text-slate-900">Compliance & credentials</h3>
        <p className="mt-1 text-sm text-slate-600">Shown on the home and solutions pages as a trust strip.</p>
        <div className="mt-4">
          <StudioField
            label="Section heading"
            value={settings.certificationsHeading}
            onChange={(certificationsHeading) => patch({ certificationsHeading })}
          />
        </div>
        <div className="mt-4 space-y-3">
          {settings.certifications.map((item, i) => (
            <div key={i} className="rounded-lg border border-slate-100 bg-slate-50/80 p-4">
              <StudioField
                label={`Credential ${i + 1} title`}
                value={item.title}
                onChange={(title) => {
                  const certifications = [...settings.certifications];
                  certifications[i] = { ...certifications[i], title };
                  patch({ certifications });
                }}
              />
              <div className="mt-2">
                <StudioTextArea
                  label="Detail"
                  value={item.body}
                  onChange={(body) => {
                    const certifications = [...settings.certifications];
                    certifications[i] = { ...certifications[i], body };
                    patch({ certifications });
                  }}
                  rows={2}
                />
              </div>
              <button
                type="button"
                className="mt-2 text-xs font-semibold text-red-700 hover:underline"
                onClick={() => patch({ certifications: settings.certifications.filter((_, j) => j !== i) })}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            onClick={() =>
              patch({
                certifications: [...settings.certifications, { title: "New credential", body: "" }],
              })
            }
          >
            Add credential
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="font-display font-bold text-slate-900">SEO & social</h3>
        <p className="mt-1 text-sm text-slate-600">
          Controls default meta tags, Open Graph previews, and the SEO score on the Studio dashboard.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <StudioField
            label="Social / OG title (optional)"
            value={settings.seoTitle}
            onChange={(seoTitle) => patch({ seoTitle })}
            hint="Short title for link previews; browser title still uses site name + tagline."
          />
          <StudioField
            label="Twitter handle (optional)"
            value={settings.twitterHandle}
            onChange={(twitterHandle) => patch({ twitterHandle })}
            hint="Without @"
          />
        </div>
        <div className="mt-4">
          <StudioTextArea
            label="Meta description (optional)"
            value={settings.seoDescription}
            onChange={(seoDescription) => patch({ seoDescription })}
            rows={2}
            hint={`${settings.seoDescription.length || settings.description.length} chars — aim for 120–160. Empty uses site description.`}
          />
        </div>
        <div className="mt-4">
          <StudioMediaIdField
            label="Open Graph image ID"
            value={settings.ogImageId}
            onChange={(ogImageId) => patch({ ogImageId })}
            hint="1200×630 recommended for WhatsApp, LinkedIn, and Facebook."
          />
          {settings.ogImageUrl ? (
            <p className="mt-2 text-xs text-slate-500">Current OG image URL: {settings.ogImageUrl}</p>
          ) : null}
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <input
            type="checkbox"
            checked={settings.robotsNoIndex}
            onChange={(e) => patch({ robotsNoIndex: e.target.checked })}
          />
          Discourage search engines from indexing the site (staging only)
        </label>
      </div>

      <StudioStatusMessage status={status} />
      <StudioSaveButton saving={saving} onClick={() => void save()} />
    </div>
  );
}
