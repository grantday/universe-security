import "server-only";

import { getPayload, type Payload } from "payload";

import config from "@payload-config";
import { canUsePayloadDatabase } from "@/lib/payload/database";

let cached: Payload | null = null;

export async function getPayloadClient(): Promise<Payload> {
  if (!canUsePayloadDatabase()) {
    throw new Error(
      "Payload database is not available. On Vercel, set DATABASE_URI to a Postgres connection string (e.g. from neon.tech), not a local SQLite file.",
    );
  }
  if (!cached) {
    cached = await getPayload({ config });
  }
  return cached;
}
