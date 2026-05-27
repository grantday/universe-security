"use client";

import { Trash2 } from "lucide-react";
import { useStudioFetch } from "@/components/studio/useStudioFetch";
import type { StudioContactSubmission } from "@/lib/studio/collections/contact-inbox";
import { StudioListHeader, StudioStatusMessage } from "@/components/studio/studio-ui";

type Payload = { items: StudioContactSubmission[] };

export function ContactInboxEditor() {
  const { data, setData, status, setStatus, loading, reload } = useStudioFetch<Payload>("/api/studio/inbox", "/studio/inbox");

  const list = data?.items ?? [];

  async function remove(id: number, name: string) {
    if (!confirm(`Delete submission from ${name}?`)) return;
    setStatus("");
    const res = await fetch(`/api/studio/inbox?id=${id}`, { method: "DELETE", credentials: "include" });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      setStatus((json as { error?: string }).error ?? "Delete failed");
      return;
    }
    setData((await res.json()) as Payload);
    setStatus("Submission removed.");
  }

  if (loading && !data) {
    return <p className="text-sm text-slate-600">Loading inbox…</p>;
  }

  return (
    <div className="space-y-6">
      <StudioListHeader
        title="Contact form submissions"
        count={list.length}
        countLabel="messages"
        description="Read-only — delete to clear old entries."
        onAdd={() => reload()}
        addLabel="Refresh"
      />
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Received</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                  No submissions yet.
                </td>
              </tr>
            ) : (
              list.map((row) => (
                <tr key={row.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/80">
                  <td className="px-4 py-3 text-slate-600">{row.createdAt}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        row.leadType === "assessment" ? "bg-amber-100 text-amber-900" : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {row.leadType === "assessment" ? "Assessment" : "Contact"}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{row.name}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${row.email}`} className="font-semibold text-[#2f4050] hover:underline">
                      {row.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{row.service}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => void remove(row.id, row.name)}
                        className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {list.map((row) => (
        <details key={`msg-${row.id}`} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <summary className="cursor-pointer font-semibold text-slate-900">
            Message from {row.name} — {row.createdAt}
          </summary>
          <p className="mt-2 text-sm text-slate-600">
            <span className="font-semibold">Phone:</span> {row.phone}
          </p>
          <p className="mt-3 whitespace-pre-wrap text-sm text-slate-800">{row.message}</p>
        </details>
      ))}
      <StudioStatusMessage status={status} />
    </div>
  );
}
