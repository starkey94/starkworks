import { cn } from "@/lib/utils";

/** Rotating "100% Satisfaction Guaranteed" seal. */
export function SatisfactionSeal({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-square", className)} role="img" aria-label="100% Satisfaction Guaranteed">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow">
        <defs>
          <path id="seal-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="96" className="fill-ink stroke-primary" strokeWidth="2" />
        <circle cx="100" cy="100" r="62" className="fill-none stroke-accent" strokeWidth="1.5" strokeDasharray="3 5" />
        <text className="fill-ink-foreground font-brand" fontSize="11">
          <textPath href="#seal-circle" textLength="472" lengthAdjust="spacing">{"SATISFACTION • GUARANTEED • QUALITY •"}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="font-display text-[clamp(1.6rem,22%,3rem)] font-extrabold leading-none text-gradient-power">
            100%
          </div>
          <div className="mt-1 font-brand text-[0.55rem] tracking-[0.25em] text-accent">STARK</div>
        </div>
      </div>
    </div>
  );
}
