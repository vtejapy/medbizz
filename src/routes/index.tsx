import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MedbizzLogo } from "@/components/MedbizzLogo";
import {
  ShieldCheck,
  Clock3,
  Stethoscope,
  HeartPulse,
  Activity,
  Microscope,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Check,
  Star,
} from "lucide-react";
import heroDoctor from "@/assets/hero-doctor.jpg";
import nurseImg from "@/assets/nurse.jpg";
import surgicalImg from "@/assets/surgical.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MedBizz — Healthcare Staffing, Reimagined" },
      {
        name: "description",
        content:
          "MedBizz connects hospitals with verified doctors, nurses, and technicians in 24 hours. Premium healthcare staffing built on trust, speed, and care.",
      },
      { property: "og:title", content: "MedBizz — Healthcare Staffing, Reimagined" },
      {
        property: "og:description",
        content:
          "Premium healthcare staffing connecting hospitals with verified medical professionals across India.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Marquee />
      <Stats />
      <Why />
      <Services />
      <Process />
      <Specialties />
      <Testimonial />
      <CTA />
      <Footer />
    </div>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#" className="flex items-center" aria-label="medbizz Consulting home">
          <MedbizzLogo className="h-11 w-auto" />
        </a>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#services" className="hover:text-foreground transition">Services</a>
          <a href="#process" className="hover:text-foreground transition">How it works</a>
          <a href="#specialties" className="hover:text-foreground transition">Specialties</a>
          <Link to="/careers" className="hover:text-foreground transition">Careers</Link>
          <a href="#contact" className="hover:text-foreground transition">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="tel:+919154193939" className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
            <Phone className="h-3.5 w-3.5" /> +91 91541 93939
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:bg-teal-deep"
          >
            Get started <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="container-x grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Trusted by 500+ hospitals across India
          </div>
          <h1 className="mt-6 text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.95]">
            Healthcare staffing,{" "}
            <em className="text-teal italic">made human</em> again.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            We place verified doctors, nurses, and technicians in your wards
            within 24 hours — so your patients never wait, and your team never
            burns out.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-teal-deep px-6 py-3.5 text-sm font-medium text-cream transition hover:bg-foreground"
            >
              Request medical staff <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-transparent px-6 py-3.5 text-sm font-medium text-foreground transition hover:bg-foreground hover:text-background"
            >
              View job vacancies
            </Link>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              { k: "24h", v: "Average placement" },
              { k: "10k+", v: "Verified professionals" },
              { k: "98%", v: "Client satisfaction" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="font-serif text-3xl text-foreground">{s.k}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_30px_80px_-30px_oklch(0.32_0.06_210/0.35)]">
            <img
              src={heroDoctor}
              alt="Verified physician at a partner hospital"
              width={1600}
              height={1808}
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-ink/70 p-4 backdrop-blur-md">
              <div className="flex items-center gap-3 text-cream">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gold/90 text-ink">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <div className="text-sm">
                  <p className="font-medium">Credential verified</p>
                  <p className="text-xs text-cream/70">
                    NMC, MCI & state council checks complete
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -left-6 -top-6 hidden h-24 w-24 rounded-full border border-gold/40 bg-gold/15 backdrop-blur lg:block" />
        </div>
      </div>
    </section>
  );
}

/* ---------- Marquee ---------- */
function Marquee() {
  const items = [
    "Apollo Hospitals", "Fortis Healthcare", "Manipal", "Max Healthcare",
    "Narayana Health", "Medanta", "Aster", "KIMS",
  ];
  return (
    <div className="border-y border-border bg-card/50 py-6">
      <div className="container-x flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <span className="text-foreground/60">Partners</span>
        {items.map((i) => (
          <span key={i}>{i}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Stats ---------- */
function Stats() {
  const stats = [
    { k: "500+", v: "Healthcare partners", note: "Public & private hospitals" },
    { k: "10,000+", v: "Medical professionals", note: "Across 40+ specialties" },
    { k: "24/7", v: "Operations desk", note: "Real humans, always" },
    { k: "<24h", v: "Average response", note: "From request to roster" },
  ];
  return (
    <section className="container-x py-20 lg:py-28">
      <div className="grid gap-10 border-y border-border py-12 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.v} className="space-y-2">
            <p className="font-serif text-5xl text-teal-deep">{s.k}</p>
            <p className="text-sm font-medium text-foreground">{s.v}</p>
            <p className="text-xs text-muted-foreground">{s.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Why ---------- */
function Why() {
  const items = [
    {
      icon: ShieldCheck,
      t: "Verified professionals",
      d: "Every clinician passes credentialing, background checks, and reference review before joining the roster.",
    },
    {
      icon: Clock3,
      t: "Rapid response",
      d: "Urgent cover delivered in 24–48 hours through a dedicated regional placement desk.",
    },
    {
      icon: Activity,
      t: "Flexible models",
      d: "Single-shift locums, weekend cover, or permanent recruitment — structured to your facility.",
    },
    {
      icon: HeartPulse,
      t: "Quality assurance",
      d: "Continuous performance monitoring with hospital-side feedback loops after every placement.",
    },
  ];
  return (
    <section className="bg-card border-y border-border py-24 lg:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.25em] text-teal">Why MedBizz</p>
            <h2 className="mt-4 text-4xl leading-tight lg:text-5xl">
              The staffing partner your patients deserve.
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              We know healthcare can't pause. Every detail of our process is
              built around the urgency, accountability, and care that medicine
              demands.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-3xl bg-border lg:col-span-8 sm:grid-cols-2">
            {items.map((i) => (
              <div key={i.t} className="bg-card p-8">
                <span className="inline-grid h-11 w-11 place-items-center rounded-xl bg-teal-deep/10 text-teal-deep">
                  <i.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl">{i.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
function Services() {
  const services = [
    {
      t: "Doctor staffing",
      d: "Board-certified physicians across 40+ specialties for locum or permanent roles.",
      img: heroDoctor,
      tag: "Most requested",
    },
    {
      t: "Nurse staffing",
      d: "RNs, LPNs, ICU, OT, and specialty nurses — pre-vetted and shift-ready.",
      img: nurseImg,
    },
    {
      t: "Surgical & technical",
      d: "OT assistants, ECG, X-ray, lab, and dialysis technicians on demand.",
      img: surgicalImg,
    },
  ];
  return (
    <section id="services" className="container-x py-24 lg:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-teal">Services</p>
          <h2 className="mt-3 max-w-2xl text-4xl leading-tight lg:text-5xl">
            Comprehensive staffing for every healthcare need.
          </h2>
        </div>
        <a href="#contact" className="text-sm text-foreground underline-offset-4 hover:underline">
          View all services →
        </a>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {services.map((s) => (
          <article
            key={s.t}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_oklch(0.32_0.06_210/0.3)]"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={s.img}
                alt={s.t}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              {s.tag && (
                <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-ink">
                  {s.tag}
                </span>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-2xl">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-sm text-teal-deep">
                Learn more <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- Process ---------- */
function Process() {
  const steps = [
    {
      n: "01",
      t: "Submit your request",
      d: "Share specialty, duration, and shift requirements through our portal or operations desk.",
    },
    {
      n: "02",
      t: "We match & verify",
      d: "Our team shortlists qualified professionals and re-confirms credentials within hours.",
    },
    {
      n: "03",
      t: "Staff arrives ready",
      d: "Your professional reports on time, fully briefed, and ready to deliver excellent care.",
    },
  ];
  return (
    <section id="process" className="bg-foreground py-24 text-cream lg:py-32">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">How it works</p>
          <h2 className="mt-3 text-4xl leading-tight text-cream lg:text-5xl">
            Three simple steps to solve your staffing challenge.
          </h2>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-cream/10 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="bg-foreground p-8">
              <p className="font-serif text-5xl text-gold">{s.n}</p>
              <h3 className="mt-6 text-2xl text-cream">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Specialties ---------- */
function Specialties() {
  const groups = [
    { icon: Stethoscope, t: "Physicians", items: ["General Medicine", "Cardiology", "Pediatrics", "Orthopedics", "Neurology", "Oncology"] },
    { icon: HeartPulse, t: "Nursing", items: ["ICU & CCU", "Emergency", "OT", "Pediatric", "Oncology", "Dialysis"] },
    { icon: Microscope, t: "Technical", items: ["Radiology", "Laboratory", "ECG", "Cath Lab", "Dialysis", "OT Assistance"] },
  ];
  return (
    <section id="specialties" className="container-x py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-xs uppercase tracking-[0.25em] text-teal">Specialties</p>
          <h2 className="mt-3 text-4xl leading-tight lg:text-5xl">
            From the ER to the OT — coverage you can count on.
          </h2>
          <p className="mt-5 max-w-md text-muted-foreground">
            We source talent across 40+ medical and allied health specialties.
            Tell us the gap; we fill it with someone your patients will trust.
          </p>
        </div>
        <div className="grid gap-6 lg:col-span-7 sm:grid-cols-3">
          {groups.map((g) => (
            <div key={g.t} className="rounded-2xl border border-border bg-card p-6">
              <span className="inline-grid h-10 w-10 place-items-center rounded-lg bg-foreground text-cream">
                <g.icon className="h-4 w-4" />
              </span>
              <h3 className="mt-5 text-xl">{g.t}</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {g.items.map((x) => (
                  <li key={x} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-teal" /> {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonial ---------- */
function Testimonial() {
  return (
    <section className="bg-card border-y border-border py-24 lg:py-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="flex gap-1 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <blockquote className="mt-6 font-serif text-3xl leading-tight lg:text-5xl">
            <span className="text-gold">"</span>MedBizz placed two ICU
            specialists in a single night during our surge. They didn't just
            fill shifts — they understood what our patients needed.<span className="text-gold">"</span>
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-teal-deep/15" />
            <div>
              <p className="font-medium">Dr. Anjali Rao</p>
              <p className="text-sm text-muted-foreground">Medical Director, Apex Multispeciality</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <img
            src={surgicalImg}
            alt="Surgical team at a partner hospital"
            loading="lazy"
            className="aspect-[4/5] w-full rounded-3xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
function CTA() {
  return (
    <section id="contact" className="container-x py-24 lg:py-32">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-teal-deep px-8 py-16 text-cream lg:px-20 lg:py-24">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.25em] text-gold">Get started</p>
            <h2 className="mt-3 text-4xl leading-tight text-cream lg:text-6xl">
              Ready to solve your staffing challenges?
            </h2>
            <p className="mt-5 max-w-xl text-cream/75">
              One nurse for a night shift or an entire department covered —
              we're here, 24/7. Tell us what you need and we'll respond within
              the hour.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:info@medbizz.in"
                className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-gold"
              >
                Request staff now <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="tel:+919154193939"
                className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3.5 text-sm font-medium text-cream transition hover:bg-cream/10"
              >
                <Phone className="h-4 w-4" /> Call operations
              </a>
            </div>
          </div>
          <div className="space-y-4 lg:col-span-5">
            <ContactRow icon={Phone} label="24/7 Operations" value="+91 91541 93939" />
            <ContactRow icon={Mail} label="Email" value="info@medbizz.in" />
            <ContactRow icon={MapPin} label="Headquarters" value="Puppalaguda, Hyderabad" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, label, value }: { icon: typeof Phone; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-cream/15 bg-cream/5 p-5">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-cream/10">
        <Icon className="h-4 w-4 text-gold" />
      </span>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-cream/60">{label}</p>
        <p className="mt-1 text-base text-cream">{value}</p>
      </div>
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center">
              <MedbizzLogo className="h-12 w-auto" />
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Premium healthcare staffing. Connecting hospitals with verified
              medical professionals across India.
            </p>
            <address className="mt-5 not-italic text-sm text-muted-foreground leading-relaxed">
              Plot No: 4/p, Secretariat Colony<br />
              Puppalaguda, Hyderabad<br />
              Rangareddy, Telangana 500075
            </address>
          </div>
          <FooterCol title="Services" items={["Doctors", "Nurses", "Technicians", "Locum Tenens"]} />
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.25em] text-foreground">Company</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">About</a></li>
              <li><a href="#" className="hover:text-foreground">Partners</a></li>
              <li><Link to="/careers" className="hover:text-foreground">Careers</Link></li>
              <li><a href="#" className="hover:text-foreground">Press</a></li>
            </ul>
          </div>
          <FooterCol title="Contact" items={["info@medbizz.in", "+91 91541 93939", "Hyderabad, IN"]} />
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} MedBizz Consulting. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="md:col-span-2">
      <p className="text-xs uppercase tracking-[0.25em] text-foreground">{title}</p>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="hover:text-foreground">{i}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
