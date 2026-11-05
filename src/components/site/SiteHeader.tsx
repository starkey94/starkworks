import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import logoMark from "@/assets/stark-logo-mark.png";

export function BrandLockup({ className }: { className?: string }) {
  return (
    <a href="#home" className={cn("flex min-w-0 items-center gap-3", className)}>
      <img src={logoMark} alt="Stark Electrical Work logo" width={44} height={44} className="h-11 w-11 shrink-0" />
      <span className="min-w-0 leading-none">
        <span className="block truncate font-brand text-sm tracking-[0.12em] text-ink-foreground sm:text-base">
          STARK
        </span>
        <span className="mt-1 block truncate font-brand text-[0.55rem] tracking-[0.3em] text-accent">
          ELECTRICAL WORK
        </span>
        <span className="mt-1 hidden truncate text-[0.6rem] uppercase tracking-[0.3em] text-ink-muted sm:block">
          {SITE.tagline}
        </span>
      </span>
    </a>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-ink-line bg-ink/90 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:flex lg:justify-between lg:px-8">
        <BrandLockup />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-ink-foreground/5 hover:text-ink-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Button asChild variant="power" size="xl" className="hidden h-11 px-5 text-sm sm:inline-flex">
            <a href={`tel:${SITE.phoneE164}`}>
              <Phone /> Call Now
            </a>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-ink-line text-ink-foreground lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="animate-in fade-in slide-in-from-top-2 border-t border-ink-line bg-ink px-5 pb-6 pt-2 lg:hidden"
          aria-label="Mobile"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-ink-line py-4 font-display text-lg text-ink-foreground"
            >
              {l.label}
            </a>
          ))}
          <Button asChild variant="power" size="xl" className="mt-6 w-full">
            <a href={`tel:${SITE.phoneE164}`}>
              <Phone /> Call {SITE.phoneDisplay}
            </a>
          </Button>
        </nav>
      )}
    </header>
  );
}
