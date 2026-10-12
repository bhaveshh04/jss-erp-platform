"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import type { CompanySection, CategoriesSection } from "@/lib/site-sections";

type Props = {
  company: CompanySection;
  products: CategoriesSection["items"];
  solutions: CategoriesSection["items"];
};

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={`relative px-3.5 py-2 text-sm font-medium transition-colors ${
        active ? "text-navy" : "text-slate hover:text-navy"
      }`}
    >
      {children}
      {active && <span className="absolute inset-x-3.5 -bottom-[17px] h-0.5 bg-brand" />}
    </Link>
  );
}

function Dropdown({
  label,
  items,
  open,
  onOpen,
  onClose,
}: {
  label: string;
  items: CategoriesSection["items"];
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-slate transition-colors hover:text-navy">
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full pt-3">
          <div className="w-80 rounded-xl border border-line bg-white p-2 shadow-xl shadow-navy/10">
            {items.map((p) => (
              <Link key={p.slug} href={`/services#${p.slug}`} className="block rounded-lg px-4 py-3 transition-colors hover:bg-paper-dim">
                <div className="text-sm font-semibold text-navy">{p.name}</div>
                <div className="mt-0.5 text-xs leading-relaxed text-slate">{p.summary}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar({ company, products, solutions }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<"products" | "solutions" | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow ${
        scrolled ? "border-line shadow-sm shadow-navy/5" : "border-line"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)} aria-label={company.name}>
          <Image src="/logo.png" alt={company.name} width={762} height={327} priority className="h-11 w-auto sm:h-12" />
        </Link>

        <nav className="hidden items-center lg:flex">
          <NavLink href="/">Home</NavLink>
          <Dropdown label="Products" items={products} open={dropdown === "products"} onOpen={() => setDropdown("products")} onClose={() => setDropdown(null)} />
          <Dropdown label="Solutions" items={solutions} open={dropdown === "solutions"} onOpen={() => setDropdown("solutions")} onClose={() => setDropdown(null)} />
          <NavLink href="/about">Company</NavLink>
          <NavLink href="/portfolio">Portfolio</NavLink>
          <NavLink href="/careers">Careers</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login" className="rounded-md px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-paper-dim">
            Login
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Request Demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
          </Link>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-md border border-line text-navy lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-line bg-white px-5 pb-8 pt-2 lg:hidden">
          <nav className="flex flex-col">
            <Link href="/" className="border-b border-line py-3.5 text-base font-medium text-navy" onClick={() => setOpen(false)}>
              Home
            </Link>

            <div className="border-b border-line py-3.5">
              <div className="text-base font-medium text-navy">Products</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {products.map((p) => (
                  <Link key={p.slug} href={`/services#${p.slug}`} onClick={() => setOpen(false)} className="rounded-md border border-line bg-paper-dim px-3 py-1.5 text-xs text-navy">
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-b border-line py-3.5">
              <div className="text-base font-medium text-navy">Solutions</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {solutions.map((s) => (
                  <Link key={s.slug} href={`/services#${s.slug}`} onClick={() => setOpen(false)} className="rounded-md border border-line bg-paper-dim px-3 py-1.5 text-xs text-navy">
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>

            {[
              { to: "/about", label: "Company" },
              { to: "/portfolio", label: "Portfolio" },
              { to: "/careers", label: "Careers" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <Link key={l.to} href={l.to} onClick={() => setOpen(false)} className="border-b border-line py-3.5 text-base font-medium text-navy">
                {l.label}
              </Link>
            ))}

            <Link href="/login" onClick={() => setOpen(false)} className="mt-5 flex items-center justify-center rounded-md border border-navy/20 px-5 py-3 text-sm font-semibold text-navy">
              Employee Login
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="mt-3 flex items-center justify-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white">
              Request Demo <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
            </Link>
            <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="mt-4 text-center text-sm text-slate">
              or call {company.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}