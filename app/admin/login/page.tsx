import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<p className="p-8 text-center text-slate-600">Loading…</p>}>
      <AdminLoginForm />
    </Suspense>
  );
}
