import "server-only";

import { revalidatePath } from "next/cache";
import { getPayloadClient } from "@/lib/payload";
import type { HomePage } from "@/payload-types";

export async function getHomePageGlobal(depth = 0) {
  const payload = await getPayloadClient();
  return (await payload.findGlobal({ slug: "home-page", depth })) as HomePage;
}

export async function patchHomePageGlobal(data: Partial<HomePage>) {
  const payload = await getPayloadClient();
  const home = await getHomePageGlobal(0);
  const { id: _id, updatedAt: _u, createdAt: _c, ...rest } = home;

  await payload.updateGlobal({
    slug: "home-page",
    data: {
      ...rest,
      ...data,
    },
  });

  revalidatePath("/", "layout");
  return getHomePageGlobal(0);
}
