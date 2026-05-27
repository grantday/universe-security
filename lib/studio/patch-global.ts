import "server-only";

import { revalidatePath } from "next/cache";
import { getPayloadClient } from "@/lib/payload";
import type { Config } from "@/payload-types";

type GlobalSlug = keyof Config["globals"];

export async function getPayloadGlobal<S extends GlobalSlug>(slug: S, depth = 0): Promise<Config["globals"][S]> {
  const payload = await getPayloadClient();
  return (await payload.findGlobal({ slug, depth })) as Config["globals"][S];
}

export async function patchPayloadGlobal<S extends GlobalSlug>(
  slug: S,
  patch: Partial<Config["globals"][S]>,
  revalidatePaths: string[],
) {
  const payload = await getPayloadClient();
  const doc = await getPayloadGlobal(slug, 0);
  const { id: _id, updatedAt: _u, createdAt: _c, ...rest } = doc as Config["globals"][S] & {
    id?: number;
    updatedAt?: string | null;
    createdAt?: string | null;
  };

  await payload.updateGlobal({
    slug,
    // @ts-expect-error Payload DeepPartial merge across generic global slugs
    data: { ...rest, ...patch },
  });

  for (const path of revalidatePaths) {
    revalidatePath(path, "layout");
  }
}
