"use client";

import { useCallback, useEffect, useState } from "react";

export function useStudioFetch<T>(apiPath: string, loginNext: string) {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setStatus("");
    const res = await fetch(apiPath, { credentials: "include" });
    setLoading(false);
    if (res.status === 401) {
      window.location.href = `/studio/login?next=${loginNext}`;
      return;
    }
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setStatus((body as { error?: string }).error ?? "Failed to load");
      return;
    }
    setData((await res.json()) as T);
  }, [apiPath, loginNext]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, setData, status, setStatus, loading, reload: load };
}

export async function studioPut<T>(apiPath: string, body: unknown): Promise<{ ok: true; data: T } | { ok: false; error: string }> {
  const res = await fetch(apiPath, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    return { ok: false, error: (json as { error?: string }).error ?? "Save failed" };
  }
  return { ok: true, data: (await res.json()) as T };
}
