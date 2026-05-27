import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(120),
  phone: z.string().min(8, "Valid phone required").max(40),
  email: z.string().email("Valid email required"),
  service: z.string().min(1, "Select a service"),
  message: z.string().min(10, "Please add a short message").max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const emergencySchema = z.object({
  name: z.string().min(1).max(120).optional(),
  note: z.string().max(2000).optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

export type EmergencyInput = z.infer<typeof emergencySchema>;

export const assessmentSchema = z.object({
  siteType: z.enum(["residential", "commercial", "industrial", "mixed"]),
  siteSize: z.enum(["small", "medium", "large", "multi-site"]),
  services: z.array(z.string()).min(1, "Select at least one service"),
  urgency: z.enum(["planning", "soon", "urgent"]),
  name: z.string().min(2).max(120),
  phone: z.string().min(8).max(40),
  email: z.string().email(),
  notes: z.string().max(2000).optional(),
});

export type AssessmentInput = z.infer<typeof assessmentSchema>;
