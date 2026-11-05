import { ArrowUpRight, Factory, GraduationCap, MessagesSquare, PencilRuler, Sun, Truck } from "lucide-react";

const ITEMS = [
  {
    icon: Factory,
    title: "Domestic & Industrial Electrical Works",
    text: "Complete wiring, rewiring, fault-finding and maintenance for homes, offices and factories.",
  },
  {
    icon: Sun,
    title: "Solar Installations",
    text: "Panels, inverters and batteries sized for your load — reliable power, lower bills.",
  },
  {
    icon: PencilRuler,
    title: "Electrical Designs & Installations",
    text: "Load planning, layouts and installation done right the first time, to safety standard.",
  },
  {
    icon: Truck,
    title: "Electrical Supply / Procurement",
    text: "We source genuine materials for your project, in retail or wholesale quantities.",
  },
  {
    icon: MessagesSquare,
    title: "Consultation",
    text: "Honest expert advice before you build, upgrade or go solar.",
  },
  {
    icon: GraduationCap,
    title: "Training",
    text: "Hands-on electrical and solar training for upcoming technicians.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-ink py-24 text-ink-foreground lg:py-32">
      <div className="absolute inset-0 grid-lines opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow text-primary">Our Service</span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Everything electrical, <span className="text-accent">under one roof.</span>
            </h2>
          </div>
          <p className="max-w-md text-ink-muted">
            From design to installation, supply to training — one trusted team for every electrical and
            solar need.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(({ icon: Icon, title, text }, i) => (
            <article
              key={title}
              className="group relative bg-ink p-8 transition-colors duration-300 hover:bg-ink-soft"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-14 w-14 place-items-center rounded-2xl border border-ink-line bg-ink-soft text-primary transition-all duration-300 group-hover:bg-gradient-power group-hover:text-primary-foreground group-hover:shadow-glow">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-brand text-xs text-ink-muted">0{i + 1}</span>
              </div>
              <h3 className="mt-8 text-xl font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{text}</p>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent opacity-80 transition-all group-hover:gap-2 group-hover:opacity-100"
              >
                Request this <ArrowUpRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
