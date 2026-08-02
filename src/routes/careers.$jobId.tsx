import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Briefcase, Check, Clock3, IndianRupee, MapPin, Send } from "lucide-react";
import { getJob, applyToJob, applicationSchema, type Job } from "@/lib/jobs.functions";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

const jobQuery = (jobId: string) =>
  queryOptions({
    queryKey: ["job", jobId],
    queryFn: () => getJob({ data: { id: jobId } }),
  });

export const Route = createFileRoute("/careers/$jobId")({
  loader: async ({ context, params }) => {
    const job = await context.queryClient.ensureQueryData(jobQuery(params.jobId));
    if (!job) throw notFound();
  },
  head: () => ({
    meta: [
      { title: "Job opening & application | MedBizz Careers" },
      {
        name: "description",
        content:
          "See full role details — responsibilities, requirements, location and salary range — and apply online for this MedBizz healthcare vacancy.",
      },
      { property: "og:title", content: "Job opening & application | MedBizz Careers" },
      {
        property: "og:description",
        content: "Full role details and online application form for this MedBizz healthcare vacancy.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: JobDetail,
  errorComponent: ({ error }) => (
    <div className="container-x py-24" role="alert">
      <h1 className="text-3xl">We couldn't load this role</h1>
      <p className="mt-3 text-muted-foreground">{error.message}</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="container-x py-24">
      <h1 className="text-3xl">This opening is no longer available</h1>
      <Link to="/careers" className="mt-4 inline-block text-teal underline">
        Browse all openings
      </Link>
    </div>
  ),
});

function JobDetail() {
  const { jobId } = Route.useParams();
  const { data } = useSuspenseQuery(jobQuery(jobId));
  const job = data as Job;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="container-x pt-10">
        <Link
          to="/careers"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All openings
        </Link>
      </div>

      <div className="container-x grid gap-12 py-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {job.department}
          </p>
          <h1 className="mt-4 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05]">{job.title}</h1>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> {job.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-4 w-4" /> {job.employment_type}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="h-4 w-4" /> {job.experience_level}
            </span>
            {job.salary_range && (
              <span className="inline-flex items-center gap-1.5">
                <IndianRupee className="h-4 w-4" /> {job.salary_range}
              </span>
            )}
          </div>

          <h2 className="mt-12 text-2xl">About the role</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{job.description}</p>

          <h2 className="mt-10 text-2xl">What we're looking for</h2>
          <ul className="mt-4 space-y-3">
            {job.requirements.map((r) => (
              <li key={r} className="flex gap-3 text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <ApplyForm jobId={job.id} jobTitle={job.title} />
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

const EMPTY = {
  full_name: "",
  email: "",
  phone: "",
  years_experience: "",
  current_location: "",
  resume_url: "",
  cover_letter: "",
};

function ApplyForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const apply = useServerFn(applyToJob);

  const mutation = useMutation({
    mutationFn: (input: typeof EMPTY) => apply({ data: { ...input, job_id: jobId } }),
    onSuccess: () => {
      setDone(true);
      setValues(EMPTY);
      toast.success("Application submitted", {
        description: `We've received your application for ${jobTitle}.`,
      });
    },
    onError: () =>
      toast.error("Could not submit application", {
        description: "Please check your details and try again.",
      }),
  });

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = applicationSchema.safeParse({ ...values, job_id: jobId });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    mutation.mutate(values);
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-teal/10">
          <Check className="h-5 w-5 text-teal" />
        </span>
        <h2 className="mt-5 text-2xl">Application received</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Thank you for applying to {jobTitle}. Our recruitment team will reach
          out within 48 hours if your profile matches.
        </p>
        <Link
          to="/careers"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal-deep px-5 py-3 text-sm font-medium text-cream transition hover:bg-foreground"
        >
          Browse more openings
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-border bg-card p-7 lg:sticky lg:top-8"
    >
      <h2 className="text-2xl">Apply for this role</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Takes about two minutes. All fields marked * are required.
      </p>

      <div className="mt-6 space-y-4">
        <Field label="Full name *" error={errors["full_name"]}>
          <input className={inputCls} value={values.full_name} onChange={set("full_name")} maxLength={120} />
        </Field>
        <Field label="Email *" error={errors["email"]}>
          <input type="email" className={inputCls} value={values.email} onChange={set("email")} maxLength={255} />
        </Field>
        <Field label="Phone *" error={errors["phone"]}>
          <input className={inputCls} value={values.phone} onChange={set("phone")} maxLength={20} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Years of experience" error={errors["years_experience"]}>
            <input className={inputCls} value={values.years_experience} onChange={set("years_experience")} maxLength={40} placeholder="e.g. 3 years" />
          </Field>
          <Field label="Current city" error={errors["current_location"]}>
            <input className={inputCls} value={values.current_location} onChange={set("current_location")} maxLength={120} />
          </Field>
        </div>
        <Field label="Resume link (Drive / Dropbox)" error={errors["resume_url"]}>
          <input className={inputCls} value={values.resume_url} onChange={set("resume_url")} maxLength={500} placeholder="https://" />
        </Field>
        <Field label="Why are you a good fit?" error={errors["cover_letter"]}>
          <textarea rows={4} className={inputCls} value={values.cover_letter} onChange={set("cover_letter")} maxLength={4000} />
        </Field>
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-deep px-6 py-3.5 text-sm font-medium text-cream transition hover:bg-foreground disabled:opacity-60"
      >
        {mutation.isPending ? "Submitting…" : "Submit application"} <Send className="h-4 w-4" />
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Or email your CV to info@medbizz.in
      </p>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-teal";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
