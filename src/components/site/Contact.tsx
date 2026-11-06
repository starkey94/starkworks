import { useState, type FormEvent } from "react";
import { AtSign, CheckCircle2, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SERVICES, SITE, whatsappLink } from "@/lib/site";

type FormState = { name: string; phone: string; service: string; message: string };
const EMPTY: FormState = { name: "", phone: "", service: "", message: "" };

export function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<FormState | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.service) {
      setError("Please add your name, phone number and the service you need.");
      return;
    }
    setError(null);
    setSent(form);
    setForm(EMPTY);
  };

  const sentMessage = sent
    ? `Hello Stark, my name is ${sent.name} (${sent.phone}). I need: ${sent.service}.${sent.message ? ` ${sent.message}` : ""}`
    : "";

  const details = [
    { icon: MapPin, label: "Visit us", value: SITE.address, href: SITE.mapsUrl, external: true },
    { icon: Phone, label: "Call us", value: SITE.phoneDisplay, href: `tel:${SITE.phoneE164}` },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat with us instantly",
      href: whatsappLink("Hello Stark Electrical Work, I'd like to chat with you."),
      external: true,
    },
    { icon: AtSign, label: "Follow us", value: SITE.social, href: SITE.instagram, external: true },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-24 text-ink-foreground lg:py-32">
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <span className="eyebrow text-primary">Contact &amp; Location</span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Let's power up your project.
          </h2>
          <p className="mt-5 max-w-md text-lg text-ink-muted">
            Tell us what you need and we'll get back to you with a quote.
          </p>

          <ul className="mt-10 space-y-3">
            {details.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-ink-line bg-ink-soft/60 p-4 transition-all hover:border-primary/60 hover:bg-ink-soft"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ink text-primary transition-colors group-hover:bg-gradient-power group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-widest text-ink-muted">{label}</span>
                    <span className="block font-semibold">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl bg-card p-6 text-card-foreground shadow-lift sm:p-10">
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in-95">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-power text-primary-foreground shadow-glow">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="mt-6 text-2xl font-extrabold">Thank you, {sent.name.split(" ")[0]}!</h3>
              <p className="mt-2 max-w-sm text-muted-foreground">
                Your request for <strong className="text-foreground">{sent.service}</strong> is ready. For the
                fastest reply, send it to us on WhatsApp.
              </p>
              <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button asChild variant="power" size="xl">
                  <a href={whatsappLink(sentMessage)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle /> Send on WhatsApp
                  </a>
                </Button>
                <Button variant="outline" size="xl" onClick={() => setSent(null)}>
                  New request
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <h3 className="text-2xl font-extrabold">Get a Quote</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className="h-12 rounded-xl"
                    maxLength={80}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="080..."
                    className="h-12 rounded-xl"
                    maxLength={20}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">Service Needed</Label>
                <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
                  <SelectTrigger id="service" className="h-12 rounded-xl">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...SERVICES, "Buying Electrical Materials"].map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your project..."
                  className="min-h-32 rounded-xl"
                  maxLength={1000}
                />
              </div>
              {error && (
                <p className="text-sm font-medium text-destructive" role="alert">
                  {error}
                </p>
              )}
              <Button type="submit" variant="power" size="xl" className="w-full">
                <Send /> Send Request
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
