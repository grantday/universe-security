import Link from "next/link";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">404</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-brand-900">Page not found</h1>
      <p className="mt-3 max-w-md text-slate-600">The page you are looking for does not exist or was moved.</p>
      <Button href="/" className="mt-8">
        Back to home
      </Button>
      <Link href="/contact" className="mt-4 text-sm font-semibold text-brand-700 hover:underline">
        Contact us
      </Link>
    </div>
  );
}
