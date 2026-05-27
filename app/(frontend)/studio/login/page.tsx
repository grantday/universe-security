import { Suspense } from "react";
import { StudioLoginForm } from "@/components/studio/StudioLoginForm";

export default function StudioLoginPage() {
  return (
    <Suspense fallback={<p className="p-8 text-center text-slate-600">Loading…</p>}>
      <StudioLoginForm />
    </Suspense>
  );
}
