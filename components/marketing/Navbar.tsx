"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight, Phone } from "lucide-react";
import type { CompanySection, CategoriesSection } from "@/lib/site-sections";

type Items = CategoriesSection["items"];
type MenuKey = "products" | "solutions";

type Props = {
  company: CompanySection;
  products: Items;
  solutions: Items;
};

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
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
  id,
  label,
  items,
  open,
  onOpen,
  onClose,
  onToggle,
}: {
  id: string;
  label: string;
  items: Items;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}) {
  const pointer = useRef("mouse");

  return (
    <div
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && onOpen()}
      onPointerLeave={(e) => e.pointerType === "mouse" && onClose()}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`menu-${id}`}
        onPointerDown={(e) => {
          pointer.current = e.pointerType;
        }}
        // mouse click keeps the hover-opened menu open; touch and keyboard toggle it
        onClick={(e) => (pointer.current === "mouse" && e.detail > 0 ? onOpen() : onToggle())}
        className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-slate transition-colors hover:text-navy"
      >
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div id={`menu-${id}`} className="absolute left-0 top-full pt-3">
          <div className="w-80 rounded-xl border border-line bg-white p-2 shadow-xl shadow-navy/10">
            {items.map((p) => (
              <Link
                key={p.slug}
                href={`/services#${p.slug}`}
                onClick={onClose}
                className="block rounded-lg px-4 py-3 transition-colors hover:bg-paper-dim"
              >
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
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const closeAll = () => {
    setOpen(false);
    setMenu(null);
  };

  // shadow after scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close everything whenever the page changes
  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  // Escape + outside click close the dropdowns / mobile menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMenu(null);
      }
    };
    const onDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, []);

  // lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleLogo(e: React.MouseEvent) {
    closeAll();
    // on the homepage a plain link click does nothing visible, so scroll to the top instead
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const tel = `tel:${company.phone.replace(/\s/g, "")}`;

  return (
    <header
      className={`sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur transition-shadow ${
        scrolled || open ? "shadow-sm shadow-navy/5" : ""
      }`}
    >
      <div ref={navRef} className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2.5 sm:px-8 sm:py-3">
        <Link
          href="/"
          onClick={handleLogo}
          aria-label={`${company.name} — home`}
          className="-m-1 shrink-0 rounded-md p-1 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <Image src="/logo.png" alt={company.name} width={762} height={327} priority className="h-10 w-auto sm:h-12" />
        </Link>

        <nav aria-label="Main" className="hidden items-center lg:flex">
          <NavLink href="/">Home</NavLink>
          <Dropdown
            id="products"
            label="Products"
            items={products}
            open={menu === "products"}
            onOpen={() => setMenu("products")}
            onClose={() => setMenu(null)}
            onToggle={() => setMenu((m) => (m === "products" ? null : "products"))}
          />
          <Dropdown
            id="solutions"
            label="Solutions"
            items={solutions}
            open={menu === "solutions"}
            onOpen={() => setMenu("solutions")}
            onClose={() => setMenu(null)}
            onToggle={() => setMenu((m) => (m === "solutions" ? null : "solutions"))}
          />
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
          className="grid h-11 w-11 place-items-center rounded-md border border-line text-navy lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain border-t border-line bg-white px-5 pb-8 pt-1 lg:hidden"
        >
          <nav aria-label="Mobile">
            <Link href="/" onClick={closeAll} className="flex min-h-14 items-center border-b border-line text-base font-medium text-navy">
              Home
            </Link>

            {(
              [
                ["Products", products],
                ["Solutions", solutions],
              ] as const
            ).map(([label, list]) => (
              <details key={label} className="group border-b border-line">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between text-base font-medium text-navy [&::-webkit-details-marker]:hidden">
                  {label}
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <ul className="pb-3">
                  {list.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/services#${p.slug}`}
                        onClick={closeAll}
                        className="block rounded-lg px-3 py-3 transition-colors active:bg-paper-dim"
                      >
                        <span className="block text-sm font-semibold text-navy">{p.name}</span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-slate">{p.summary}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}

            {[
              { to: "/about", label: "Company" },
              { to: "/portfolio", label: "Portfolio" },
              { to: "/careers", label: "Careers" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.to}
                href={l.to}
                onClick={closeAll}
                className="flex min-h-14 items-center border-b border-line text-base font-medium text-navy"
              >
                {l.label}
              </Link>
            ))}

            <div className="mt-6 grid gap-3">
              <Link
                href="/contact"
                onClick={closeAll}
                className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white"
              >
                Request Demo <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
              </Link>
              <Link
                href="/login"
                onClick={closeAll}
                className="flex min-h-12 items-center justify-center rounded-md border border-navy/20 px-5 py-3 text-sm font-semibold text-navy"
              >
                Employee Login
              </Link>
              <a href={tel} className="flex min-h-12 items-center justify-center gap-2 text-sm font-medium text-slate">
                <Phone className="h-4 w-4" /> {company.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}