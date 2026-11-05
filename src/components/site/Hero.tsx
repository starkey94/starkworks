import { ArrowRight, BadgeCheck, Phone, ShieldCheck, Sun, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import heroImg from "@/assets/hero-solar.jpg";

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-ink text-ink-foreground">
      <img
        src={heroImg}
        alt="Stark technician installing rooftop solar panels at sunset"
        width={1600}
        height={1008}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-hero" />
      <div className="absolute inset-0 -z-10 bg-gradient-fade-up" />
      <div className="absolute inset-0 -z-10 grid-lines opacity-40 [mask-image:linear-gradient(90deg,black,transparent_60%)]" />

      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-16 pt-32 lg:px-8">
        <div className="max-w-2xl animate-rise">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink-foreground/5 px-4 py-2 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-pulse-glow rounded-full bg-primary" />
              <span className="relative h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="eyebrow text-ink-muted">Registered · RC {SITE.rc}</span>
          </div>

          <h1 className="mt-7 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            Comprehensive <span className="text-gradient-power">Electrical &amp; Solar</span> Solutions
            for Residential &amp; Commercial Needs.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            Professional electrical works, solar installations, and high-quality electrical supplies —
            delivered with efficiency and excellence.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="power" size="xl">
              <a href="#services">
                Explore Services <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href={`tel:${SITE.phoneE164}`}>
                <Phone /> Contact Us Now
              </a>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-ink-muted">
            <span className="inline-flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-primary" /> 100% Satisfaction Guaranteed
            </span>
            <span className="inline-flex items-center gap-2">
              <Sun className="h-5 w-5 text-accent" /> Solar experts
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" /> Safety-first workmanship
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-10 right-8 hidden items-center gap-4 rounded-2xl border border-ink-line bg-ink/70 p-4 pr-6 backdrop-blur-xl lg:flex">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-power text-primary-foreground">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <div className="font-display text-lg font-bold">100% Satisfaction</div>
            <div className="text-sm text-ink-muted">Guaranteed on every job</div>
          </div>
        </div>
      </div>
    </section>
  );
}
