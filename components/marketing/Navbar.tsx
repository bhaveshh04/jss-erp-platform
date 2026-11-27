"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowUpRight, Phone, LogIn } from "lucide-react";
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
      className={`relative whitespace-nowrap rounded-full px-3 py-2 text-[13.5px] xl:px-3.5 font-medium transition-colors ${
        active ? "bg-navy text-white" : "text-navy/70 hover:bg-navy/[0.05] hover:text-navy"
      }`}
    >
      {children}
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
        className={`flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-[13.5px] xl:px-3.5 font-medium transition-colors ${
          open ? "bg-navy/[0.06] text-navy" : "text-navy/70 hover:bg-navy/[0.05] hover:text-navy"
        }`}
      >
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div id={`menu-${id}`} className="absolute left-1/2 top-full -translate-x-1/2 pt-4">
          <div className="rise glass-nav w-[22rem] rounded-3xl p-2" style={{ animationDuration: "0.35s" }}>
            {items.map((p, i) => (
              <Link
                key={p.slug}
                href={`/services#${p.slug}`}
                onClick={onClose}
                className="group flex gap-3.5 rounded-2xl px-3.5 py-3 transition-colors hover:bg-white"
              >
                <span className="font-display grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-navy text-xs font-semibold text-white transition-colors group-hover:bg-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-navy">
                    {p.name}
                    <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-slate">{p.summary}</span>
                </span>
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

  // tighten the floating bar after scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto px-3 transition-all duration-500 sm:px-5 ${
          scrolled ? "max-w-6xl pt-2.5" : "max-w-7xl pt-4 sm:pt-5"
        }`}
      >
        <div
          ref={navRef}
          className={`glass-nav pointer-events-auto flex items-center justify-between rounded-full py-1.5 pl-3 pr-1.5 transition-all duration-500 sm:pl-5 ${
            open ? "rounded-b-none rounded-t-[1.75rem]" : ""
          }`}
        >
          <Link
            href="/"
            onClick={handleLogo}
            aria-label={`${company.name} — home`}
            className="-my-1 shrink-0 rounded-full p-1"
          >
            <Image
              src="/logo.png"
              alt={company.name}
              width={762}
              height={327}
              priority
              className={`w-auto transition-all duration-500 ${scrolled ? "h-9" : "h-10 sm:h-11"}`}
            />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
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

          <div className="hidden items-center gap-1.5 lg:flex">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2.5 text-[13.5px] xl:px-4 font-semibold text-navy/80 transition-colors hover:bg-navy/[0.05] hover:text-navy"
            >
              <LogIn className="h-4 w-4" /> Login
            </Link>
            <Link
              href="/contact"
              className="btn-flame group inline-flex items-center gap-2 whitespace-nowrap rounded-full py-2 pl-5 pr-2 text-[13.5px] font-semibold"
            >
              Request Demo
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20 transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </span>
            </Link>
          </div>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full bg-navy text-white lg:hidden"
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
            className="glass-nav pointer-events-auto max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-b-[1.75rem] border-t-0 px-5 pb-6 pt-1 lg:hidden"
          >
            <nav aria-label="Mobile">
              <Link href="/" onClick={closeAll} className="flex min-h-14 items-center border-b border-navy/10 text-base font-medium text-navy">
                Home
              </Link>

              {(
                [
                  ["Products", products],
                  ["Solutions", solutions],
                ] as const
              ).map(([label, list]) => (
                <details key={label} className="group border-b border-navy/10">
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
                          className="block rounded-2xl px-3 py-3 transition-colors active:bg-white"
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
                  className="flex min-h-14 items-center border-b border-navy/10 text-base font-medium text-navy"
                >
                  {l.label}
                </Link>
              ))}

              <div className="mt-6 grid gap-3">
                <Link
                  href="/contact"
                  onClick={closeAll}
                  className="btn-flame flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
                >
                  Request Demo <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
                </Link>
                <Link
                  href="/login"
                  onClick={closeAll}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-navy/15 bg-white/70 px-5 py-3 text-sm font-semibold text-navy"
                >
                  <LogIn className="h-4 w-4" /> Employee Login
                </Link>
                <a href={tel} className="flex min-h-12 items-center justify-center gap-2 text-sm font-medium text-slate">
                  <Phone className="h-4 w-4" /> {company.phone}
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
