import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us instantly on WhatsApp"
        className="group flex items-center gap-2.5 rounded-full border border-primary-glow/40 bg-ink-soft/90 px-4 py-3 text-sm font-semibold text-ink-foreground shadow-lift backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-ink hover:text-white hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-power text-primary-foreground shadow-sm transition-transform duration-300 group-hover:rotate-12">
          <MessageCircle className="h-4 w-4 fill-current" />
        </span>
        <span className="hidden pr-1 sm:inline">Chat with us instantly</span>
      </a>
    </aside>
  );
}
