import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AdminJob = {
  id: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  experience_level: string;
  salary_range: string | null;
  description: string;
  requirements: string[];
  is_active: boolean;
  posted_at: string;
};

export type AdminApplication = {
  id: string;
  job_id: string;
  full_name: string;
  email: string;
  phone: string;
  years_experience: string | null;
  current_location: string | null;
  resume_url: string | null;
  cover_letter: string | null;
  status: string;
  created_at: string;
};

const ADMIN_JOB_COLUMNS =
  "id, title, department, location, employment_type, experience_level, salary_range, description, requirements, is_active, posted_at";

export const ALLOWED_EMAIL_DOMAIN = "medbizz.in";

function isCompanyEmail(email: unknown): boolean {
  return (
    typeof email === "string" &&
    email.toLowerCase().trim().endsWith(`@${ALLOWED_EMAIL_DOMAIN}`)
  );
}

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden");
}


/** Returns whether the signed-in user is an admin, and whether any admin exists yet. */
export const getAdminStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (error) throw new Error(error.message);
    if (data) return { isAdmin: true as const, canClaim: false, allowedDomain: ALLOWED_EMAIL_DOMAIN };

    if (!isCompanyEmail((context.claims as { email?: string }).email)) {
      return { isAdmin: false as const, canClaim: false, allowedDomain: ALLOWED_EMAIL_DOMAIN };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    return {
      isAdmin: false as const,
      canClaim: (count ?? 0) === 0,
      allowedDomain: ALLOWED_EMAIL_DOMAIN,
    };
  });

/** First signed-in user with a company email can claim admin access; afterwards this closes. */
export const claimFirstAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    if (!isCompanyEmail((context.claims as { email?: string }).email)) {
      throw new Error(`Only @${ALLOWED_EMAIL_DOMAIN} email addresses can be admins`);
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if ((count ?? 0) > 0) throw new Error("An admin already exists");
    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });


export const listAllJobs = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminJob[]> => {
    await assertAdmin(context);
    const { data, error } = await context.supabase
      .from("jobs")
      .select(ADMIN_JOB_COLUMNS)
      .order("posted_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as AdminJob[];
  });

export const jobSchema = z.object({
  title: z.string().trim().min(3).max(160),
  department: z.string().trim().min(2).max(80),
  location: z.string().trim().min(2).max(120),
  employment_type: z.string().trim().min(2).max(60),
  experience_level: z.string().trim().min(2).max(60),
  salary_range: z.string().trim().max(80).optional().or(z.literal("")),
  description: z.string().trim().min(10).max(6000),
  requirements: z.array(z.string().trim().min(1).max(300)).max(20),
});

export type JobInput = z.infer<typeof jobSchema>;

export const createJob = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: JobInput) => jobSchema.parse(data))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("jobs").insert({
      title: data.title,
      department: data.department,
      location: data.location,
      employment_type: data.employment_type,
      experience_level: data.experience_level,
      salary_range: data.salary_range || null,
      description: data.description,
      requirements: data.requirements,
      is_active: true,
    });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const updateJob = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: JobInput & { id: string }) =>
    jobSchema.extend({ id: z.string().uuid() }).parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { id, ...rest } = data;
    const { error } = await context.supabase
      .from("jobs")
      .update({ ...rest, salary_range: rest.salary_range || null })
      .eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const setJobActive = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; is_active: boolean }) =>
    z.object({ id: z.string().uuid(), is_active: z.boolean() }).parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase
      .from("jobs")
      .update({ is_active: data.is_active })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const deleteJob = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("jobs").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const listApplications = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminApplication[]> => {
    await assertAdmin(context);
    const { data, error } = await context.supabase
      .from("job_applications")
      .select(
        "id, job_id, full_name, email, phone, years_experience, current_location, resume_url, cover_letter, status, created_at",
      )
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as AdminApplication[];
  });
