import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

export type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  experience_level: string;
  salary_range: string | null;
  description: string;
  requirements: string[];
  posted_at: string;
};

const JOB_COLUMNS =
  "id, title, department, location, employment_type, experience_level, salary_range, description, requirements, posted_at";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const url = process.env["SUPABASE_URL"]!;
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listJobs = createServerFn({ method: "GET" }).handler(async (): Promise<Job[]> => {
  const { data, error } = await publicClient()
    .from("jobs")
    .select(JOB_COLUMNS)
    .eq("is_active", true)
    .order("posted_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Job[];
});

export const getJob = createServerFn({ method: "GET" })
  .inputValidator((data: { id: string }) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }): Promise<Job | null> => {
    const { data: job, error } = await publicClient()
      .from("jobs")
      .select(JOB_COLUMNS)
      .eq("id", data.id)
      .eq("is_active", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (job ?? null) as Job | null;
  });

export const applicationSchema = z.object({
  job_id: z.string().uuid(),
  full_name: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .min(6, "Enter a valid phone number")
    .max(20)
    .regex(/^[+0-9\s()-]+$/, "Phone can only contain digits and + ( ) -"),
  years_experience: z.string().trim().max(40).optional().or(z.literal("")),
  current_location: z.string().trim().max(120).optional().or(z.literal("")),
  resume_url: z.string().trim().url("Enter a valid link").max(500).optional().or(z.literal("")),
  cover_letter: z.string().trim().max(4000).optional().or(z.literal("")),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

export const applyToJob = createServerFn({ method: "POST" })
  .inputValidator((data: ApplicationInput) => applicationSchema.parse(data))
  .handler(async ({ data }) => {
    const { error } = await publicClient()
      .from("job_applications")
      .insert({
        job_id: data.job_id,
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        years_experience: data.years_experience || null,
        current_location: data.current_location || null,
        resume_url: data.resume_url || null,
        cover_letter: data.cover_letter || null,
      });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
