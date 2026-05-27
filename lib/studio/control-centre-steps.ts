import "server-only";

import { revalidatePath } from "next/cache";
import type { IconKey } from "@/lib/content/schema";
import { getPayloadClient } from "@/lib/payload";
export type StudioFlowStep = {
  payloadId?: number;
  title: string;
  body: string;
  icon: IconKey;
  order: number;
  published: boolean;
};

export async function getStudioControlCentreSteps() {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "control-centre-steps",
    limit: 100,
    sort: "order",
    pagination: false,
    overrideAccess: true,
  });

  const steps: StudioFlowStep[] = result.docs.map((doc) => ({
    payloadId: doc.id,
    title: doc.title,
    body: doc.body,
    icon: doc.icon as IconKey,
    order: doc.order ?? 0,
    published: doc.published ?? true,
  }));

  return { steps, updatedAt: null };
}

export async function saveStudioControlCentreSteps(steps: StudioFlowStep[]) {
  if (steps.length < 1) throw new Error("At least one flow step is required.");

  const payload = await getPayloadClient();
  const existing = await payload.find({
    collection: "control-centre-steps",
    limit: 100,
    pagination: false,
    overrideAccess: true,
  });

  const keepIds = new Set(steps.map((s) => s.payloadId).filter((id): id is number => typeof id === "number"));

  for (const doc of existing.docs) {
    if (!keepIds.has(doc.id)) {
      await payload.delete({ collection: "control-centre-steps", id: doc.id, overrideAccess: true });
    }
  }

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i]!;
    const data = {
      title: step.title,
      body: step.body,
      icon: step.icon,
      order: i,
      published: step.published,
    };
    if (step.payloadId) {
      await payload.update({
        collection: "control-centre-steps",
        id: step.payloadId,
        data,
        overrideAccess: true,
      });
    } else {
      await payload.create({
        collection: "control-centre-steps",
        data,
        overrideAccess: true,
      });
    }
  }

  revalidatePath("/control-centre", "layout");
  revalidatePath("/", "layout");
  return getStudioControlCentreSteps();
}
