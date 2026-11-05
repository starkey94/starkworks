import { Cable, Fence, Lamp, LampCeiling, Lightbulb, MessageCircle, Package, PanelTop, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";
import storeImg from "@/assets/store-materials.jpg";

const PRODUCTS = [
  { icon: Lightbulb, name: "Bulbs" },
  { icon: Lamp, name: "LED Lights" },
  { icon: PanelTop, name: "Panel Lights" },
  { icon: LampCeiling, name: "POP Lights" },
  { icon: Fence, name: "Fence Lights" },
  { icon: Cable, name: "Cables" },
  { icon: Package, name: "General Goods" },
];

export function Store() {
  return (
    <section id="store" className="bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow text-accent">&amp; Store Deals</span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Electrical &amp; solar materials, retail and wholesale.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Stock up on quality materials for your home, site or shop — all in one place.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <div className="relative overflow-hidden rounded-3xl bg-ink shadow-lift lg:col-span-3">
            <img
              src={storeImg}
              alt="Bulbs, panel lights, POP lights, fence lights and cables available at Stark"
              width={1200}
              height={770}
              loading="lazy"
              className="h-full min-h-[320px] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-fade-up p-6 pt-24">
              <div className="flex flex-wrap gap-2">
                {["Retail", "Wholesale", "Genuine products"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-ink-line bg-ink/70 px-3 py-1 text-xs font-semibold text-ink-foreground backdrop-blur"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <ul className="grid grid-cols-2 gap-3">
              {PRODUCTS.map(({ icon: Icon, name }) => (
                <li
                  key={name}
                  className="group flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lift"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-muted text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 text-sm font-semibold">{name}</span>
                </li>
              ))}
            </ul>

            <div className="relative flex-1 overflow-hidden rounded-3xl bg-gradient-ember p-7 text-accent-foreground">
              <Tag className="absolute -right-4 -top-4 h-28 w-28 rotate-12 opacity-15" />
              <h3 className="text-2xl font-extrabold">High quality. Competitive prices.</h3>
              <p className="mt-2 text-sm font-medium opacity-80">
                Buying in bulk for a project or reselling? Ask for our wholesale rates.
              </p>
              <Button asChild size="xl" className="mt-6 bg-ink text-ink-foreground hover:bg-ink-soft">
                <a href={whatsappLink("Hello Stark, I'd like a price list for electrical materials.")} target="_blank" rel="noreferrer">
                  <MessageCircle /> Get price list
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
