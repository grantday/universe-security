"use client";

import { StudioSidebar } from "@/components/studio/StudioSidebar";
import { StudioTopbar } from "@/components/studio/StudioTopbar";

export function StudioShell({
  title,
  breadcrumbs,
  children,
}: {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f3f3f4]">
      <StudioSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <StudioTopbar title={title} breadcrumbs={breadcrumbs} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
