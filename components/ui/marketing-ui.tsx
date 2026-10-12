import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-sm font-semibold ${dark ? "text-gold" : "text-brand"}`}>
      <span className={`h-px w-6 ${dark ? "bg-gold" : "bg-brand"}`} />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  dark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2
        className={`mt-3 font-heading text-3xl font-semibold leading-[1.15] sm:text-4xl ${
          dark ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-white/70" : "text-slate"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

/** Header used at the top of every inner page (About, Services, …) */
export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-line bg-paper-dim">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-4 max-w-3xl font-heading text-4xl font-semibold leading-[1.1] text-navy sm:text-5xl">
          {title}
        </h1>
        {description && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate">{description}</p>}
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
  const classes = `group inline-flex w-fit items-center gap-2 rounded-md bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark ${className}`;
  const arrow = <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />;
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
      ? "border-navy/20 text-navy hover:border-navy hover:bg-navy hover:text-white"
      : "border-white/30 text-white hover:bg-white hover:text-navy";
  const classes = `inline-flex w-fit items-center gap-2 rounded-md border px-6 py-3.5 text-sm font-semibold transition-colors ${toneClasses} ${className}`;
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={to ?? "/"} className={classes}>
      {children}
    </Link>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-line bg-white p-7 ${className}`}>{children}</div>;
}