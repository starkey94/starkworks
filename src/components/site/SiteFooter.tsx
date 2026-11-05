import { AtSign, MessageCircle, Phone } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";
import logoFull from "@/assets/stark-logo-full.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-line bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <img src={logoFull} alt="Stark Electrical Work — Dreams to Reality" width={136} height={156} className="h-32 w-auto" loading="lazy" />
          <p className="mt-5 max-w-sm text-sm text-ink-muted">
            Electrical works, solar installations and quality electrical materials for homes and businesses.
          </p>
          <p className="mt-4 inline-flex rounded-full border border-ink-line px-3 py-1 font-brand text-[0.65rem] tracking-[0.2em] text-accent">
            RC: {SITE.rc}
          </p>
        </div>

        <div>
          <h4 className="eyebrow text-ink-muted">Quick Links</h4>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm transition-colors hover:text-primary">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow text-ink-muted">Reach Us</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li>{SITE.address}</li>
            <li>
              <a href={`tel:${SITE.phoneE164}`} className="inline-flex items-center gap-2 hover:text-primary">
                <Phone className="h-4 w-4" /> {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-primary">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={SITE.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-primary">
                <AtSign className="h-4 w-4" /> {SITE.social}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-ink-muted sm:flex-row sm:justify-between lg:px-8">
          <span>© 2026 Stark Electrical Work. All rights reserved.</span>
          <span>Dreams to Reality · RC {SITE.rc}</span>
        </div>
      </div>
    </footer>
  );
}
