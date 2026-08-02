import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { ArrowUpRight, Briefcase, MapPin, Search, Clock3 } from "lucide-react";
import { listJobs } from "@/lib/jobs.functions";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

const jobsQuery = queryOptions({
  queryKey: ["jobs"],
  queryFn: () => listJobs(),
});

export const Route = createFileRoute("/careers/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(jobsQuery);
  },
  head: () => ({
    meta: [
      { title: "Healthcare Jobs & Vacancies | MedBizz Careers" },
      {
        name: "description",
        content:
          "Browse current healthcare vacancies at MedBizz — nursing, medical officer, diagnostics, physiotherapy and hospital admin roles across India. Apply online in minutes.",
      },
      { property: "og:title", content: "Healthcare Jobs & Vacancies | MedBizz Careers" },
      {
        property: "og:description",
        content:
          "Current openings for nurses, doctors, technicians and hospital administrators. Apply online with MedBizz Consulting.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Careers,
  errorComponent: ({ error }) => (
    <div className="container-x py-24" role="alert">
      <h1 className="text-3xl">We couldn't load the openings</h1>
      <p className="mt-3 text-muted-foreground">{error.message}</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="container-x py-24">
      <h1 className="text-3xl">No openings found</h1>
    </div>
  ),
});

function Careers() {
  const { data: jobs } = useSuspenseQuery(jobsQuery);
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("All");

  const departments = useMemo(
    () => ["All", ...Array.from(new Set(jobs.map((j) => j.department)))],
    [jobs],
  );

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return jobs.filter((j) => {
      const matchesDept = dept === "All" || j.department === dept;
      const matchesTerm =
        !term ||
        j.title.toLowerCase().includes(term) ||
        j.location.toLowerCase().includes(term) ||
        j.department.toLowerCase().includes(term);
      return matchesDept && matchesTerm;
    });
  }, [jobs, q, dept]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="container-x pt-16 pb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Careers</p>
        <h1 className="mt-4 max-w-3xl text-[clamp(2.25rem,5.5vw,4rem)] leading-[1]">
          Current <em className="italic text-teal">vacancies</em> across our hospital network.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {jobs.length} open roles for clinical and non-clinical professionals.
          Apply in under two minutes — our team responds within 48 hours.
        </p>

        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center">
          <label className="flex flex-1 items-center gap-3 rounded-full border border-border bg-card px-5 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search role, city or department"
              aria-label="Search openings"
              maxLength={80}
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setDept(d)}
                className={`rounded-full border px-4 py-2 text-xs transition ${
                  dept === d
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x">
        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
            No openings match your search. Try a different city or department.
          </p>
        ) : (
          <ul className="divide-y divide-border border-y border-border">
            {filtered.map((job) => (
              <li key={job.id}>
                <Link
                  to="/careers/$jobId"
                  params={{ jobId: job.id }}
                  className="group grid gap-4 py-7 md:grid-cols-12 md:items-center"
                >
                  <div className="md:col-span-6">
                    <h2 className="text-2xl leading-tight group-hover:text-teal transition">
                      {job.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {job.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground md:col-span-5">
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5" /> {job.department}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" /> {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5" /> {job.employment_type}
                    </span>
                  </div>
                  <div className="md:col-span-1 md:text-right">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                      View <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
