import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";

type FetchOptions = {
  tags?: string[];
  revalidate?: number | false;
};

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 60,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number | false;
}): Promise<T | null> {
  if (!isSanityConfigured()) return null;

  try {
    return await client.fetch<T>(query, params, {
      next: {
        revalidate: revalidate === false ? false : revalidate,
        tags,
      },
    });
  } catch {
    return null;
  }
}
