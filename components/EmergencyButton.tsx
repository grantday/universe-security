"use client";

import { useState } from "react";
import { AlertTriangle, Phone, X } from "lucide-react";
import { Button } from "@/components/Button";
import type { SiteInfo } from "@/lib/content/site-types";

export function EmergencyButton({ site }: { site: SiteInfo }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function sendSilentAlert() {
    const staticMode = process.env.NEXT_PUBLIC_FORMS_MODE === "mailto";
    if (staticMode) {
      const subject = encodeURIComponent("Emergency alert (website)");
      const body = encodeURIComponent(
        `Optional note: ${message || "(none)"}\n\nPlease call ${site.emergencyPhoneDisplay} for immediate response.`,
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      return;
    }
    setStatus("sending");
    let lat: number | undefined;
    let lng: number | undefined;
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 8000,
          });
        });
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
      } catch {
        /* optional location */
      }
    }
    try {
      const res = await fetch("/api/emergency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: message || undefined, lat, lng }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button
        type="button"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent-red text-white shadow-lg ring-2 ring-white hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-red lg:hidden"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Phone className="h-6 w-6" aria-hidden />
        <span className="sr-only">Open emergency options</span>
      </button>

      <div className="pointer-events-none fixed bottom-6 right-6 z-40 hidden lg:block">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-accent-red px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-red"
        >
          <AlertTriangle className="h-4 w-4" aria-hidden />
          Emergency 24/7
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="emergency-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="emergency-title" className="font-display text-lg font-bold text-brand-900">
                  Emergency response
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  For life-threatening emergencies, call immediately. You can also send a silent alert to our control
                  room (email notification).
                </p>
              </div>
              <button
                type="button"
                className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
                onClick={() => {
                  setOpen(false);
                  setStatus("idle");
                  setMessage("");
                }}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`tel:${site.emergencyPhone}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-red px-4 py-3 text-center text-sm font-semibold text-white hover:bg-red-700"
              >
                <Phone className="h-4 w-4" aria-hidden />
                Call {site.emergencyPhoneDisplay}
              </a>
              <label className="text-xs font-medium text-slate-600" htmlFor="emergency-note">
                Optional note for silent alert
              </label>
              <textarea
                id="emergency-note"
                rows={3}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                placeholder="Location, incident type, site name…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                type="button"
                variant="secondary"
                className="w-full"
                disabled={status === "sending"}
                onClick={sendSilentAlert}
              >
                {status === "sending" ? "Sending…" : "Send silent alert"}
              </Button>
              {status === "sent" && (
                <p className="text-center text-sm text-green-700" role="status">
                  Alert queued. If urgent, please call the hotline.
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-sm text-accent-red" role="alert">
                  Could not send alert. Please call the hotline.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
