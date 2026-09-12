import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { Briefcase, Eye, EyeOff, Plus, Trash2, Users, LogOut } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { supabase } from "@/integrations/supabase/client";
import {
  claimFirstAdmin,
  createJob,
  deleteJob,
  getAdminStatus,
  listAllJobs,
  listApplications,
  setJobActive,
  updateJob,
  type AdminJob,
  type JobInput,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Hiring Admin · medbizz Consulting" },
      { name: "description", content: "Post job openings, close filled roles, and review applications." },
      { property: "og:title", content: "Hiring Admin · medbizz Consulting" },
      { property: "og:description", content: "Post job openings and review applications." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const EMPTY: JobInput = {
  title: "",
  department: "",
  location: "",
  employment_type: "Full-time",
  experience_level: "Mid-level",
  salary_range: "",
  description: "",
  requirements: [],
};

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const status = useServerFn(getAdminStatus);
  const claim = useServerFn(claimFirstAdmin);

  const statusQuery = useQuery({ queryKey: ["admin-status"], queryFn: () => status() });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container-x py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl text-foreground">Hiring admin</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Post new vacancies and close roles once they are filled.
            </p>
          </div>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>

        {statusQuery.isLoading ? (
          <p className="mt-10 text-sm text-muted-foreground">Loading…</p>
        ) : statusQuery.data?.isAdmin ? (
          <AdminDashboard />
        ) : statusQuery.data?.canClaim ? (
          <div className="mt-10 rounded-2xl border border-border bg-card p-8">
            <h2 className="font-display text-2xl text-foreground">Become the first admin</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              No admin exists yet. Claim admin access for this account — after that, this option closes.
            </p>
            <button
              onClick={async () => {
                try {
                  await claim();
                  toast.success("You are now the admin");
                  queryClient.invalidateQueries({ queryKey: ["admin-status"] });
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : "Could not claim admin");
                }
              }}
              className="mt-5 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
            >
              Claim admin access
            </button>
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-border bg-card p-8">
            <h2 className="font-display text-2xl text-foreground">No access</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This account is not an admin. Admin access requires a company email ending in
              <strong> @medbizz.in</strong> — ask an existing admin to grant you access.
            </p>

          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function AdminDashboard() {
  const queryClient = useQueryClient();
  const fetchJobs = useServerFn(listAllJobs);
  const fetchApps = useServerFn(listApplications);
  const create = useServerFn(createJob);
  const update = useServerFn(updateJob);
  const toggle = useServerFn(setJobActive);
  const remove = useServerFn(deleteJob);

  const [tab, setTab] = useState<"jobs" | "applications">("jobs");
  const [form, setForm] = useState<JobInput>(EMPTY);
  const [reqText, setReqText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [busy, setBusy] = useState(false);

  const jobs = useQuery({ queryKey: ["admin-jobs"], queryFn: () => fetchJobs() });
  const apps = useQuery({ queryKey: ["admin-apps"], queryFn: () => fetchApps() });

  function refresh() {
    queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });
    queryClient.invalidateQueries({ queryKey: ["admin-apps"] });
  }

  function startEdit(job: AdminJob) {
    setEditingId(job.id);
    setForm({
      title: job.title,
      department: job.department,
      location: job.location,
      employment_type: job.employment_type,
      experience_level: job.experience_level,
      salary_range: job.salary_range ?? "",
      description: job.description,
      requirements: job.requirements,
    });
    setReqText(job.requirements.join("\n"));
    setShowForm(true);
  }

  function resetForm() {
    setEditingId(null);
    setForm(EMPTY);
    setReqText("");
    setShowForm(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const payload: JobInput = {
        ...form,
        requirements: reqText
          .split("\n")
          .map((r) => r.trim())
          .filter(Boolean),
      };
      if (editingId) {
        await update({ data: { ...payload, id: editingId } });
        toast.success("Job updated");
      } else {
        await create({ data: payload });
        toast.success("Job posted");
      }
      resetForm();
      refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save job");
    } finally {
      setBusy(false);
    }
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground/40";
  const labelClass = "text-xs uppercase tracking-wider text-muted-foreground";

  return (
    <div className="mt-10">
      <div className="flex gap-2">
        <button
          onClick={() => setTab("jobs")}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${tab === "jobs" ? "bg-foreground text-background" : "border border-border text-muted-foreground"}`}
        >
          <Briefcase className="h-3.5 w-3.5" /> Jobs ({jobs.data?.length ?? 0})
        </button>
        <button
          onClick={() => setTab("applications")}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${tab === "applications" ? "bg-foreground text-background" : "border border-border text-muted-foreground"}`}
        >
          <Users className="h-3.5 w-3.5" /> Applications ({apps.data?.length ?? 0})
        </button>
      </div>

      {tab === "jobs" && (
        <div className="mt-8 space-y-6">
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
            >
              <Plus className="h-4 w-4" /> Post a new job
            </button>
          )}

          {showForm && (
            <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-2xl text-foreground">
                {editingId ? "Edit job" : "New job opening"}
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className={labelClass}>Job title</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className={inputClass}
                    placeholder="Staff Nurse — ICU"
                  />
                </div>
                <div>
                  <label className={labelClass}>Department</label>
                  <input
                    required
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className={inputClass}
                    placeholder="Nursing"
                  />
                </div>
                <div>
                  <label className={labelClass}>Location</label>
                  <input
                    required
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className={inputClass}
                    placeholder="Hyderabad, Telangana"
                  />
                </div>
                <div>
                  <label className={labelClass}>Employment type</label>
                  <select
                    value={form.employment_type}
                    onChange={(e) => setForm({ ...form, employment_type: e.target.value })}
                    className={inputClass}
                  >
                    {["Full-time", "Part-time", "Contract", "Locum", "Internship"].map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Experience level</label>
                  <select
                    value={form.experience_level}
                    onChange={(e) => setForm({ ...form, experience_level: e.target.value })}
                    className={inputClass}
                  >
                    {["Entry-level", "Mid-level", "Senior", "Consultant"].map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Salary range (optional)</label>
                  <input
                    value={form.salary_range}
                    onChange={(e) => setForm({ ...form, salary_range: e.target.value })}
                    className={inputClass}
                    placeholder="₹4,50,000 – ₹6,00,000 / year"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Description</label>
                  <textarea
                    required
                    rows={5}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Requirements (one per line)</label>
                  <textarea
                    rows={5}
                    value={reqText}
                    onChange={(e) => setReqText(e.target.value)}
                    className={inputClass}
                    placeholder={"B.Sc Nursing\n2+ years ICU experience\nValid state council registration"}
                  />
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  type="submit"
                  disabled={busy}
                  className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background disabled:opacity-50"
                >
                  {busy ? "Saving…" : editingId ? "Save changes" : "Post job"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full border border-border px-5 py-3 text-sm text-muted-foreground"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {jobs.isLoading && <p className="text-sm text-muted-foreground">Loading jobs…</p>}
            {jobs.data?.map((job) => (
              <div
                key={job.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-5"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium text-foreground">{job.title}</h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] ${job.is_active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
                    >
                      {job.is_active ? "Open" : "Filled / hidden"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {job.department} · {job.location} · {job.employment_type}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => startEdit(job)}
                    className="rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition hover:text-foreground"
                  >
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        await toggle({ data: { id: job.id, is_active: !job.is_active } });
                        toast.success(job.is_active ? "Job hidden from careers page" : "Job is live again");
                        refresh();
                      } catch (err) {
                        toast.error(err instanceof Error ? err.message : "Could not update");
                      }
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition hover:text-foreground"
                  >
                    {job.is_active ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    {job.is_active ? "Mark filled" : "Reopen"}
                  </button>
                  <button
                    onClick={async () => {
                      if (!window.confirm(`Delete "${job.title}" permanently?`)) return;
                      try {
                        await remove({ data: { id: job.id } });
                        toast.success("Job deleted");
                        refresh();
                      } catch (err) {
                        toast.error(err instanceof Error ? err.message : "Could not delete");
                      }
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-destructive/30 px-4 py-2 text-xs text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
            {jobs.data?.length === 0 && (
              <p className="text-sm text-muted-foreground">No jobs yet — post your first opening above.</p>
            )}
          </div>
        </div>
      )}

      {tab === "applications" && (
        <div className="mt-8 space-y-3">
          {apps.isLoading && <p className="text-sm text-muted-foreground">Loading applications…</p>}
          {apps.data?.map((a) => {
            const job = jobs.data?.find((j) => j.id === a.job_id);
            return (
              <div key={a.id} className="rounded-xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-medium text-foreground">{a.full_name}</h3>
                  <span className="text-xs text-muted-foreground">
                    {new Date(a.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Applied for {job?.title ?? "a role"}
                  {a.current_location ? ` · ${a.current_location}` : ""}
                  {a.years_experience ? ` · ${a.years_experience} experience` : ""}
                </p>
                <p className="mt-2 text-sm text-foreground">
                  <a href={`mailto:${a.email}`} className="underline">
                    {a.email}
                  </a>{" "}
                  ·{" "}
                  <a href={`tel:${a.phone}`} className="underline">
                    {a.phone}
                  </a>
                </p>
                {a.resume_url && (
                  <p className="mt-1 text-sm">
                    <a href={a.resume_url} target="_blank" rel="noreferrer" className="underline text-primary">
                      View resume
                    </a>
                  </p>
                )}
                {a.cover_letter && (
                  <p className="mt-3 whitespace-pre-line text-sm text-muted-foreground">{a.cover_letter}</p>
                )}
              </div>
            );
          })}
          {apps.data?.length === 0 && (
            <p className="text-sm text-muted-foreground">No applications yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
