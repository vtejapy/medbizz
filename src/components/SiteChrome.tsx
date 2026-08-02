import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { MedbizzLogo } from "@/components/MedbizzLogo";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center" aria-label="medbizz Consulting home">
          <MedbizzLogo className="h-11 w-auto" />
        </Link>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <Link to="/" className="hover:text-foreground transition">Home</Link>
          <Link to="/careers" className="text-foreground transition">Careers</Link>
          <a href="/#services" className="hover:text-foreground transition">Services</a>
          <a href="/#contact" className="hover:text-foreground transition">Contact</a>
        </nav>
        <a
          href="tel:+919154193939"
          className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-sm text-foreground transition hover:bg-foreground hover:text-background"
        >
          <Phone className="h-3.5 w-3.5" /> +91 91541 93939
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-background">
      <div className="container-x flex flex-col gap-3 py-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} MedBizz Consulting. All rights reserved.</p>
        <p>info@medbizz.in · +91 91541 93939 · Puppalaguda, Hyderabad</p>
      </div>
    </footer>
  );
}
