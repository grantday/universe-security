"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ExternalLink, LogOut } from "lucide-react";

export function StudioTopbar({
  title,
  breadcrumbs,
}: {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
}) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    router.push("/studio/login");
    router.refresh();
  }

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav className="mb-0.5 flex items-center gap-1 text-xs text-slate-500">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-1">
                {i > 0 ? <ChevronRight className="h-3 w-3" aria-hidden /> : null}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-[#2f4050]">
                    {crumb.label}
                  </Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}
        <h1 className="font-display text-lg font-bold text-slate-900">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          View site
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </Link>
        <button
          type="button"
          onClick={() => void logout()}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Sign out
        </button>
      </div>
    </header>
  );
}
