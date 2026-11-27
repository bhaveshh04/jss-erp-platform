import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import type { CompanySection, CategoriesSection } from "@/lib/site-sections";

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V21h-4V9Z" />
    </svg>
  );
}
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.9V9.9H8v3.1h2.62v8h2.88Z" />
    </svg>
  );
}
function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.5 6.4c-.6.27-1.25.45-1.93.53a3.4 3.4 0 0 0 1.48-1.87c-.65.38-1.36.66-2.13.81a3.36 3.36 0 0 0-5.73 3.06A9.53 9.53 0 0 1 5.1 5.6a3.36 3.36 0 0 0 1.04 4.49c-.55-.02-1.07-.17-1.53-.42v.04a3.36 3.36 0 0 0 2.7 3.3 3.4 3.4 0 0 1-1.52.06 3.37 3.37 0 0 0 3.14 2.34A6.75 6.75 0 0 1 3.5 16.8a9.5 9.5 0 0 0 5.15 1.51c6.18 0 9.56-5.12 9.56-9.56l-.01-.44c.66-.47 1.23-1.06 1.68-1.73l.02-.18Z" />
    </svg>
  );
}
function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.6 7.2s-.2-1.5-.83-2.15c-.8-.83-1.68-.84-2.1-.89C15.7 4 12 4 12 4h-.01s-3.68 0-6.66.16c-.42.05-1.3.06-2.1.89C2.6 5.7 2.4 7.2 2.4 7.2S2.2 8.95 2.2 10.7v1.6c0 1.75.2 3.5.2 3.5s.2 1.5.83 2.15c.8.84 1.85.81 2.32.9 1.68.16 7.05.16 7.05.16s3.7 0 6.68-.17c.42-.05 1.3-.06 2.1-.89.63-.65.83-2.15.83-2.15s.2-1.75.2-3.5v-1.6c0-1.75-.2-3.5-.2-3.5ZM9.9 14.6V8.9l5.4 2.86-5.4 2.85Z" />
    </svg>
  );
}

const companyLinks = [
  { to: "/about", label: "About us" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

type Props = {
  company: CompanySection;
  products: CategoriesSection["items"];
};

export default function Footer({ company, products }: Props) {
  const columns = [
    { title: "Company", links: companyLinks },
    { title: "Products", links: products.map((p) => ({ to: `/services#${p.slug}`, label: p.name })) },
  ];

  // only render social icons that have a real https:// link (blank / invalid ones are hidden)
  const socials = [
    { href: company.social.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
    { href: company.social.facebook, Icon: FacebookIcon, label: "Facebook" },
    { href: company.social.twitter, Icon: TwitterIcon, label: "X (Twitter)" },
    { href: company.social.youtube, Icon: YoutubeIcon, label: "YouTube" },
  ].filter((s) => /^https?:\/\//i.test(s.href?.trim() ?? ""));

  const linkClass =
    "group inline-flex items-center gap-1 py-1 text-sm text-white/55 transition-colors hover:text-white";

  return (
    <footer className="grain relative isolate overflow-hidden bg-night text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="dots absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,transparent,#000_40%,transparent)]" />
        <div className="glow left-1/2 top-[-260px] h-[420px] w-[900px] -translate-x-1/2 bg-[#e11d2a]/20" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8 sm:pt-20">
        {/* top row: big statement + contact CTA */}
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end">
          <h2 className="font-display max-w-2xl text-4xl font-semibold leading-[1.02] sm:text-5xl">
            <span className="text-silver">Let&apos;s build the ERP your floor</span>{" "}
            <span className="font-accent text-flame">actually needs.</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="btn-flame group inline-flex min-h-12 items-center gap-2 rounded-full py-2 pl-6 pr-2 text-sm font-semibold"
            >
              Start a project
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20 transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </span>
            </Link>
            <a
              href={`tel:${company.phone.replace(/\s/g, "")}`}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-6 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4" /> {company.phone}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr] lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-block rounded-2xl bg-white px-4 py-3 shadow-[0_10px_40px_-10px_rgba(225,29,42,0.45)]"
              aria-label={`${company.name} — home`}
            >
              <Image src="/logo.png" alt={company.name} width={140} height={60} className="h-11 w-auto" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/55">
              {company.tagline} — a Pune-based ERP implementation and software development partner serving
              manufacturing, textile and process industries across {company.serves}.
            </p>
            {socials.length > 0 && (
              <div className="mt-6 flex gap-2.5">
                {socials.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass grid h-11 w-11 place-items-center rounded-full text-white/70 transition-all hover:-translate-y-0.5 hover:text-white"
                    aria-label={`${company.name} on ${label}`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/35">{col.title}</h2>
              <ul className="mt-5 space-y-1.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.to} className={linkClass}>
                      {l.label}
                      <ArrowUpRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/35">Get in touch</h2>
            <ul className="mt-5 space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <span className="glass grid h-8 w-8 shrink-0 place-items-center rounded-full">
                  <Mail className="h-3.5 w-3.5 text-[#ff7a2f]" />
                </span>
                <a href={`mailto:${company.email}`} className="pt-1.5 transition-colors [overflow-wrap:anywhere] hover:text-white">
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="glass grid h-8 w-8 shrink-0 place-items-center rounded-full">
                  <MapPin className="h-3.5 w-3.5 text-[#ff7a2f]" />
                </span>
                <span className="pt-1.5 leading-relaxed">{company.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* oversized wordmark */}
      <div aria-hidden="true" className="relative mx-auto max-w-7xl select-none overflow-hidden px-5 sm:px-8">
        <div className="font-display text-outline text-center text-[24vw] font-bold leading-[0.78] tracking-[-0.06em] lg:text-[17rem]">
          JSS<span className="ml-[0.04em] inline-block h-[0.16em] w-[0.16em] rounded-full bg-gradient-to-br from-[#ffb648] via-[#ff7a2f] to-[#e11d2a] align-baseline shadow-[0_0_60px_rgba(255,122,47,0.6)]" />
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            {company.tagline} · {company.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
