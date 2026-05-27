"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { UniverseLogo } from "@/components/brand/UniverseLogo";
import { studioNav, type StudioNavItem } from "@/lib/studio/nav";

function NavLink({ item, depth = 0 }: { item: StudioNavItem; depth?: number }) {
  const pathname = usePathname();
  const active = item.href && (pathname === item.href || pathname.startsWith(`${item.href}/`));

  if (item.disabled || !item.href) {
    return (
      <span
        className={clsx(
          "flex items-center justify-between rounded-md px-3 py-2 text-sm",
          depth > 0 ? "ml-3" : "",
          "cursor-not-allowed text-slate-500",
        )}
      >
        <span>{item.label}</span>
        {item.badge ? (
          <span className="rounded bg-slate-700 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-300">
            {item.badge}
          </span>
        ) : null}
      </span>
    );
  }

  const external = item.href.startsWith("/admin");

  return (
    <Link
      href={item.href}
      className={clsx(
        "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
        depth > 0 ? "ml-3" : "",
        active ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-700/60 hover:text-white",
      )}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{item.label}</span>
      {item.badge ? (
        <span className="rounded bg-slate-600 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-200">
          {item.badge}
        </span>
      ) : null}
    </Link>
  );
}

function NavGroup({ item }: { item: StudioNavItem }) {
  return (
    <div className="space-y-1">
      {item.href ? (
        <NavLink item={{ ...item, label: item.label }} depth={0} />
      ) : (
        <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">{item.label}</p>
      )}
      {item.children?.map((child) => (
        <NavLink key={child.label + (child.href ?? "")} item={child} depth={1} />
      ))}
    </div>
  );
}

export function StudioSidebar() {
  return (
    <aside className="flex w-60 shrink-0 flex-col bg-[#2f4050] text-slate-200">
      <div className="flex h-16 items-center gap-2 border-b border-slate-600/50 px-4">
        <UniverseLogo alt="Universe Security" onDark className="max-w-[130px]" />
        <div className="min-w-0">
          <p className="text-sm font-bold text-white">Universe Studio</p>
          <p className="text-[11px] text-slate-400">Content management</p>
        </div>
      </div>
      <nav className="flex-1 space-y-6 overflow-y-auto p-3">
        {studioNav.map((item) =>
          item.children ? (
            <NavGroup key={item.label} item={item} />
          ) : (
            <NavLink key={item.label} item={item} />
          ),
        )}
      </nav>
      <div className="border-t border-slate-600/50 p-3 text-[11px] text-slate-500">
        Saves update the live site via Payload.
      </div>
    </aside>
  );
}
