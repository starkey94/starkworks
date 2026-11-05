import { Award, FileCheck2, Home, Factory } from "lucide-react";
import { SITE } from "@/lib/site";
import aboutImg from "@/assets/about-wiring.jpg";

export function About() {
  return (
    <section id="about" className="bg-background py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div className="relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-3xl shadow-lift">
            <img
              src={aboutImg}
              alt="Stark electrician wiring a distribution board"
              width={1008}
              height={1200}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-4 max-w-[16rem] rounded-2xl bg-ink p-5 text-ink-foreground shadow-lift sm:-right-8">
            <FileCheck2 className="h-7 w-7 text-primary" />
            <div className="mt-3 font-display text-xl font-bold">RC {SITE.rc}</div>
            <p className="mt-1 text-sm text-ink-muted">Officially registered business you can trust.</p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <span className="eyebrow text-primary">About Us</span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Look no further than our team.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            We provide comprehensive electrical and solar solutions for both residential and commercial
            customers, ensuring that your needs are met with efficiency and excellence.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { icon: Home, title: "Residential", text: "Homes wired safely, lit beautifully, powered by the sun." },
              { icon: Factory, title: "Commercial", text: "Offices, shops and industrial sites built to standard." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border bg-card p-5 shadow-card">
                <Icon className="h-6 w-6 text-accent" />
                <h3 className="mt-3 text-lg font-bold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-4 rounded-2xl bg-secondary p-5">
            <Award className="h-10 w-10 shrink-0 text-accent" />
            <p className="text-sm font-medium text-secondary-foreground">
              Quality workmanship on every job — from a single socket to a full solar system.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
