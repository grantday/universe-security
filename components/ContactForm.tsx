"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { Button } from "@/components/Button";

const services = [
  "Home security",
  "Business security",
  "Industrial security",
  "Control centre / monitoring",
  "Technology review",
  "Other",
] as const;

export function ContactForm() {
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactInput) {
    if (honeypotRef.current?.value) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypotRef.current?.value ?? "" }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setErrorMsg(json.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
      reset();
      if (honeypotRef.current) honeypotRef.current.value = "";
    } catch {
      setErrorMsg("Network error. Please try again or call us.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-5" noValidate>
      <input
        ref={honeypotRef}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-0 top-0 h-px w-px opacity-0"
        aria-hidden
        name="company_website"
      />
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/25"
          autoComplete="name"
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-accent-red" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/25"
            autoComplete="tel"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-accent-red" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/25"
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-accent-red" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-slate-700">
          Service required
        </label>
        <select
          id="service"
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/25"
          {...register("service")}
        >
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="mt-1 text-sm text-accent-red" role="alert">
            {errors.service.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/25"
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-accent-red" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>
      <Button type="submit" variant="primary" className="w-full sm:w-auto" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send enquiry"}
      </Button>
      {status === "success" && (
        <p className="text-sm font-medium text-green-700" role="status">
          Thank you — we will respond shortly.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm font-medium text-accent-red" role="alert">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
