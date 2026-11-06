import { useState, useEffect } from "react";
import { MessageCircle, SlidersHorizontal, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";
import { useStoreCatalog } from "@/lib/store-catalog";
import { StoreItemCard } from "./StoreItemCard";
import { StoreAdminModal } from "./StoreAdminModal";
import storeImg from "@/assets/store-materials.jpg";

export function Store() {
  const { items } = useStoreCatalog();
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    const handleOpenAdmin = () => setAdminOpen(true);
    window.addEventListener("stark:open-store-admin", handleOpenAdmin);

    if (typeof window !== "undefined" && window.location.hash === "#store-admin") {
      setAdminOpen(true);
    }

    return () => window.removeEventListener("stark:open-store-admin", handleOpenAdmin);
  }, []);

  return (
    <section id="store" className="bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow text-accent">&amp; Store Deals</span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Electrical &amp; solar materials, retail and wholesale.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Stock up on quality materials for your home, site or shop — choose your quantity and order
              instantly on WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full border-border/80 bg-background/80 text-xs text-muted-foreground backdrop-blur hover:border-primary hover:text-foreground"
            >
              <a href="/admin">
                <SlidersHorizontal className="mr-1.5 h-3.5 w-3.5 text-primary" /> Admin Portal (/admin)
              </a>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setAdminOpen(true)}
              className="rounded-full text-xs text-muted-foreground hover:text-foreground"
            >
              Quick Popup
            </Button>
          </div>
        </div>

        {/* Showcase Banner */}
        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <div className="relative overflow-hidden rounded-3xl bg-ink shadow-lift lg:col-span-3">
            <img
              src={storeImg}
              alt="Bulbs, panel lights, POP lights, fence lights and cables available at Stark"
              width={1200}
              height={770}
              loading="lazy"
              className="h-full min-h-[300px] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-fade-up p-6 pt-24">
              <div className="flex flex-wrap gap-2">
                {["Retail", "Wholesale", "Genuine products", "Nationwide delivery"].map((t) => (
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

          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-ember p-8 text-accent-foreground lg:col-span-2">
            <Tag className="absolute -right-4 -top-4 h-32 w-32 rotate-12 opacity-15" />
            <div>
              <span className="eyebrow text-accent-foreground/80">Bulk Orders &amp; Contractors</span>
              <h3 className="mt-3 text-2xl font-extrabold lg:text-3xl">High quality. Competitive prices.</h3>
              <p className="mt-3 text-sm font-medium leading-relaxed opacity-85">
                Buying in bulk for an ongoing site or reselling in your local shop? Contact us for our complete
                wholesale discount schedule.
              </p>
            </div>
            <Button asChild variant="ink" size="xl" className="mt-8">
              <a
                href={whatsappLink("Hello Stark, I'd like a complete price list for all electrical and solar materials.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle /> Get full price list
              </a>
            </Button>
          </div>
        </div>

        {/* Itemized Materials Catalog */}
        <div className="mt-16">
          <div className="flex items-center justify-between border-b border-border/80 pb-4">
            <div>
              <h3 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Material Price List &amp; Quick Order
              </h3>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Select your desired quantity to calculate your estimate and order directly on WhatsApp.
              </p>
            </div>
            <span className="hidden rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground sm:inline-block">
              {items.length} materials listed
            </span>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <StoreItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Admin Management Modal */}
      <StoreAdminModal open={adminOpen} onOpenChange={setAdminOpen} />
    </section>
  );
}
