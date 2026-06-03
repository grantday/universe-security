"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { assessmentSchema, type AssessmentInput } from "@/lib/validations";
import { Button } from "@/components/Button";

const STEPS = ["Site", "Services", "Urgency", "Contact"] as const;

const SERVICE_OPTIONS = [
  "Guarding & patrols",
  "CCTV & monitoring",
  "Access control",
  "Alarm response",
  "Control centre only",
  "Risk assessment",
];

type Props = {
  officeHours: string;
};

export function AssessmentWizard({ officeHours }: Props) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState("");

  const form = useForm<AssessmentInput>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      siteType: "commercial",
      siteSize: "medium",
      services: [],
      urgency: "planning",
      name: "",
      phone: "",
      email: "",
      notes: "",
    },
  });

  const { register, handleSubmit, watch, setValue, trigger, formState } = form;
  const services = watch("services");

  function toggleService(label: string) {
    const next = services.includes(label) ? services.filter((s) => s !== label) : [...services, label];
    setValue("services", next, { shouldValidate: true });
  }

  async function nextStep() {
    const fields: (keyof AssessmentInput)[][] = [
      ["siteType", "siteSize"],
      ["services"],
      ["urgency"],
      ["name", "phone", "email"],
    ];
    const ok = await trigger(fields[step]);
    if (ok) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  async function onSubmit(data: AssessmentInput) {
    setServerError("");
    const staticMode = process.env.NEXT_PUBLIC_FORMS_MODE === "mailto";
    if (staticMode) {
      const subject = encodeURIComponent("Security assessment request");
      const body = encodeURIComponent(
        `Site: ${data.siteType} / ${data.siteSize}\nServices: ${data.services.join(", ")}\nUrgency: ${data.urgency}\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\n\nNotes:\n${data.notes ?? ""}\n`,
      );
      window.location.href = `mailto:info@universe-security.com?subject=${subject}&body=${body}`;
      setDone(true);
      return;
    }
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, leadType: "assessment", website: "" }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      setServerError((json as { error?: string }).error ?? "Could not submit. Please call us.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="font-display text-lg font-bold text-green-900">Assessment received</p>
        <p className="mt-2 text-sm text-green-800">Our team will review your site profile and contact you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex gap-2">
        {STEPS.map((label, i) => (
          <div
            key={label}
            className={`flex-1 rounded-lg border px-2 py-2 text-center text-xs font-semibold ${
              i === step ? "border-brand-500 bg-brand-50 text-brand-900" : "border-slate-200 text-slate-500"
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {step === 0 ? (
        <div className="space-y-4">
          <fieldset>
            <legend className="text-sm font-semibold text-slate-900">Site type</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {(["residential", "commercial", "industrial", "mixed"] as const).map((v) => (
                <label key={v} className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm capitalize">
                  <input type="radio" value={v} {...register("siteType")} />
                  {v}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-sm font-semibold text-slate-900">Site size</legend>
            <select
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
              {...register("siteSize")}
            >
              <option value="small">Small (home, shop, single gate)</option>
              <option value="medium">Medium (office, retail, estate)</option>
              <option value="large">Large (warehouse, campus, multi-building)</option>
              <option value="multi-site">Multiple sites</option>
            </select>
          </fieldset>
        </div>
      ) : null}

      {step === 1 ? (
        <fieldset>
          <legend className="text-sm font-semibold text-slate-900">Services needed</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {SERVICE_OPTIONS.map((label) => (
              <label
                key={label}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                  services.includes(label) ? "border-brand-500 bg-brand-50" : "border-slate-200"
                }`}
              >
                <input type="checkbox" checked={services.includes(label)} onChange={() => toggleService(label)} />
                {label}
              </label>
            ))}
          </div>
          {formState.errors.services ? (
            <p className="mt-2 text-sm text-accent-red">{formState.errors.services.message}</p>
          ) : null}
        </fieldset>
      ) : null}

      {step === 2 ? (
        <fieldset>
          <legend className="text-sm font-semibold text-slate-900">When do you need this?</legend>
          <div className="mt-2 space-y-2">
            {(
              [
                ["planning", "Planning ahead (30+ days)"],
                ["soon", "Within the next 2 weeks"],
                ["urgent", "Urgent — active risk or incident"],
              ] as const
            ).map(([v, label]) => (
              <label key={v} className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <input type="radio" value={v} {...register("urgency")} />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      {step === 3 ? (
        <div className="space-y-4">
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
            placeholder="Full name"
            {...register("name")}
          />
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
            placeholder="Phone"
            {...register("phone")}
          />
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
            placeholder="Email"
            type="email"
            {...register("email")}
          />
          <textarea
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
            placeholder="Anything else we should know (optional)"
            rows={3}
            {...register("notes")}
          />
          <p className="text-xs text-slate-500">{officeHours}</p>
        </div>
      ) : null}

      {serverError ? <p className="text-sm text-accent-red">{serverError}</p> : null}

      <div className="flex flex-wrap gap-3">
        {step > 0 ? (
          <button
            type="button"
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700"
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </button>
        ) : null}
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            className="rounded-xl bg-brand-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
            onClick={() => void nextStep()}
          >
            Continue
          </button>
        ) : (
          <Button type="submit" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? "Sending…" : "Submit assessment"}
          </Button>
        )}
      </div>
    </form>
  );
}
