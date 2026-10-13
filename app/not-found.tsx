import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

const quickLinks = [
  { href: "/services", title: "Products & services", text: "ERP, HRMS, CRM and IoT" },
  { href: "/portfolio", title: "Portfolio", text: "Sample implementations" },
  { href: "/about", title: "About us", text: "Our story and values" },
  { href: "/careers", title: "Careers", text: "Open roles in Pune" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
          <Link href="/" aria-label="JSS Innovative Solutions — home" className="shrink-0">
            <Image src="/logo.png" alt="JSS Innovative Solutions" width={762} height={327} priority className="h-10 w-auto sm:h-12" />
          </Link>
          <Link
            href="/contact"
            className="rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Contact us
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-24">
          <p className="flex items-center gap-2.5 text-sm font-semibold text-brand">
            <span className="h-px w-6 bg-brand" />
            Error 404
          </p>
          <h1 className="mt-4 max-w-2xl font-heading text-4xl font-semibold leading-[1.1] text-navy sm:text-5xl">
            This page doesn&apos;t exist or has moved.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate sm:text-lg">
            The link may be out of date or mistyped. Head back to the homepage or jump straight to one of the pages below.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="group inline-flex min-h-12 items-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Back to homepage
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center rounded-md border border-navy/20 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              Contact us
            </Link>
          </div>

          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block h-full rounded-xl border border-line bg-white p-5 transition-all hover:border-navy/30 hover:shadow-lg hover:shadow-navy/5"
                >
                  <span className="block text-base font-semibold text-navy">{l.title}</span>
                  <span className="mt-1 block text-sm text-slate">{l.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer className="border-t border-line">
        <p className="mx-auto max-w-7xl px-5 py-5 text-xs text-slate sm:px-8">
          © {new Date().getFullYear()} JSS Innovative Solutions. All rights reserved.
        </p>
      </footer>
    </div>
  );
}