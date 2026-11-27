import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/* Small pill label above section titles */
export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] ${
        dark
          ? "border-white/12 bg-white/[0.06] text-white/80 backdrop-blur"
          : "border-navy/10 bg-white/70 text-navy/70 backdrop-blur"
      }`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inset-0 animate-ping rounded-full bg-brand opacity-60" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-brand" />
      </span>
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  dark = false,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  /** optional words appended to the title in the italic accent face */
  highlight?: string;
  description?: string;
  dark?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={`reveal max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2
        className={`font-display mt-5 text-[2.1rem] font-semibold leading-[1.05] sm:text-5xl lg:text-[3.4rem] ${
          dark ? "text-white" : "text-navy"
        }`}
      >
        {title}
        {highlight && (
          <>
            {" "}
            <span className={`font-accent ${dark ? "text-flame" : "text-flame-deep"}`}>{highlight}</span>
          </>
        )}
      </h2>
      {description && (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${align === "center" ? "mx-auto" : ""} ${
            dark ? "text-white/65" : "text-slate"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/** Dark, glowing header used at the top of every inner page (About, Services, …) */
export function PageHero({
  eyebrow,
  title,
  description,
  highlight,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  highlight?: string;
}) {
  return (
    <section className="grain relative isolate overflow-hidden bg-night text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0" />
        <div className="glow drift-a -left-40 -top-40 h-[480px] w-[480px] bg-[#e11d2a]/35" />
        <div className="glow drift-b right-[-10%] top-10 h-[420px] w-[520px] bg-[#4c5fd7]/30" />
        <div className="glow drift-c bottom-[-220px] left-1/3 h-[360px] w-[460px] bg-[#ff7a2f]/20" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-36 sm:px-8 sm:pb-24 sm:pt-44">
        {eyebrow && (
          <div className="rise">
            <Eyebrow dark>{eyebrow}</Eyebrow>
          </div>
        )}
        <h1
          className="rise font-display mt-6 max-w-4xl text-[2.6rem] font-semibold leading-[1.02] sm:text-6xl lg:text-7xl"
          style={{ "--d": "90ms" } as React.CSSProperties}
        >
          <span className="text-silver">{title}</span>
          {highlight && (
            <>
              {" "}
              <span className="font-accent text-flame">{highlight}</span>
            </>
          )}
        </h1>
        {description && (
          <p
            className="rise mt-6 max-w-2xl text-lg leading-relaxed text-white/65"
            style={{ "--d": "180ms" } as React.CSSProperties}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

export function PrimaryButton({
  to,
  href,
  children,
  className = "",
  type,
  onClick,
}: {
  to?: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  const classes = `btn-flame group inline-flex min-h-12 w-fit items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold ${className}`;
  const arrow = (
    <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 transition-transform group-hover:rotate-45">
      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
    </span>
  );
  if (type) {
    return (
      <button type={type} onClick={onClick} className={classes}>
        {children}
      </button>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
        {arrow}
      </a>
    );
  }
  return (
    <Link href={to ?? "/"} className={classes}>
      {children}
      {arrow}
    </Link>
  );
}

export function GhostButton({
  to,
  href,
  children,
  className = "",
  tone = "dark",
}: {
  to?: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
  /** "dark" = on dark backgrounds, "light" = on white / grey backgrounds */
  tone?: "dark" | "light";
}) {
  const toneClasses =
    tone === "light"
      ? "border-navy/15 bg-white/60 text-navy hover:border-navy/30 hover:bg-white"
      : "border-white/15 bg-white/[0.06] text-white hover:border-white/30 hover:bg-white/[0.12]";
  const classes = `group inline-flex min-h-12 w-fit items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold backdrop-blur transition-colors ${toneClasses} ${className}`;
  const arrow = <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />;
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
        {arrow}
      </a>
    );
  }
  return (
    <Link href={to ?? "/"} className={classes}>
      {children}
      {arrow}
    </Link>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`glass-light spot spot-light rounded-3xl p-7 ${className}`}>{children}</div>;
}

/** Soft colour wash behind light sections so glass cards have something to blur */
export function LightBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="grid-lines-dark absolute inset-0" />
      <div className="glow -left-32 top-10 h-[380px] w-[380px] bg-[#e11d2a]/[0.07]" />
      <div className="glow right-[-8%] bottom-0 h-[420px] w-[520px] bg-[#4c5fd7]/[0.08]" />
    </div>
  );
}
