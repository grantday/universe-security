import "server-only";

import { revalidatePath } from "next/cache";
import { getPayloadClient } from "@/lib/payload";
import type { ContactSubmission } from "@/payload-types";

export type StudioContactSubmission = {
  id: number;
  leadType: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  siteType: string;
  siteSize: string;
  urgency: string;
  createdAt: string;
};

function map(doc: ContactSubmission): StudioContactSubmission {
  return {
    id: doc.id,
    leadType: doc.leadType ?? "contact",
    name: doc.name,
    phone: doc.phone,
    email: doc.email,
    service: doc.service,
    message: doc.message,
    siteType: doc.siteType ?? "",
    siteSize: doc.siteSize ?? "",
    urgency: doc.urgency ?? "",
    createdAt: doc.createdAt ? new Date(doc.createdAt).toLocaleString() : "",
  };
}

export async function getStudioContactInbox() {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "contact-submissions",
    limit: 100,
    sort: "-createdAt",
    pagination: false,
    overrideAccess: true,
  });
  return { items: result.docs.map((d) => map(d as ContactSubmission)) };
}

export async function deleteStudioContactSubmission(id: number) {
  const payload = await getPayloadClient();
  await payload.delete({
    collection: "contact-submissions",
    id,
    overrideAccess: true,
  });
  revalidatePath("/studio/inbox");
  return getStudioContactInbox();
}
