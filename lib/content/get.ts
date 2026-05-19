import { cache } from "react";
import { getSiteContent } from "@/lib/content/store";

/** Cached per request — use in server components. */
export const getContent = cache(getSiteContent);
