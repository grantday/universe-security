import { cache } from "react";
import { getPayloadSiteContent } from "@/lib/payload/queries";
import { getSiteContent } from "@/lib/content/store";

/** Cached per request — prefers Payload when seeded, else JSON/Blob store. */
export const getContent = cache(async () => {
  const fromPayload = await getPayloadSiteContent();
  if (fromPayload) return fromPayload;
  return getSiteContent();
});
