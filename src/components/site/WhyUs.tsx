import { HardHat, ShieldCheck, Timer, Gem } from "lucide-react";
import { SatisfactionSeal } from "./SatisfactionSeal";

const POINTS = [
  { icon: Timer, title: "Reliability", text: "We show up on time and finish what we start." },
  { icon: HardHat, title: "Expert Technicians", text: "Trained, experienced hands on every job." },
  { icon: ShieldCheck, title: "Safety Standards", text: "Work done to code, protecting people and property." },
  { icon: Gem, title: "Top-Grade Materials", text: "Only quality components that last." },
];

export function WhyUs() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1fr_1.3fr] lg:px-8">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute inset-6 animate-pulse-glow rounded-full bg-primary/25 blur-3xl" />
          <SatisfactionSeal className="relative w-full drop-shadow-2xl" />
        </div>

        <div>
          <span className="eyebrow text-primary">Why Choose Us</span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            100% Satisfaction <span className="text-accent">Guaranteed.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Turning your dreams to reality means doing the job properly — every time.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {POINTS.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group rounded-2xl border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-accent transition-colors group-hover:bg-gradient-ember group-hover:text-accent-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
