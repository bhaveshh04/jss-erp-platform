import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero, LightBackdrop, SectionHeading } from "@/components/ui/marketing-ui";
import { getSiteContent } from "@/lib/site-content-db";
import { INDUSTRY_PAGES, PUNE_PAGE, landingPath } from "@/lib/landing-pages";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "Industry ERP Solutions — Textile, Fabrication, Forging & More",
  description:
    "Industry-specific ERP from JSS Innovative Solutions: textile ERP, sheet metal fabrication ERP, forging ERP and customised ERP for manufacturers across India.",
  path: "/industries",
});

export default async function Industries() {
  const industries = await getSiteContent("industries");

  return (
    <>
      <PageHero
        crumb={{ name: "Industries", path: "/industries" }}
        eyebrow="Industry ERP solutions"
        title="ERP that speaks"
        highlight="your industry's language."
        description="Every industry tracks different things — lots and counts, heat numbers, routings, dies. Our ERP is built around the details of yours."
      />

      <section className="relative isolate overflow-hidden bg-white">
        <LightBackdrop />
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-5 md:grid-cols-2">
            {[...INDUSTRY_PAGES, PUNE_PAGE].map((p, i) => (
              <Link
                key={p.slug}
                href={landingPath(p)}
                className="reveal glass-light spot spot-light group flex flex-col rounded-[2rem] p-7 transition-transform hover:-translate-y-1 sm:p-9"
                style={{ "--d": `${(i % 2) * 100}ms` } as React.CSSProperties}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">{p.keyword}</span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-white transition-colors group-hover:bg-brand">
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                  </span>
                </div>
                <h2 className="font-display mt-6 text-2xl font-semibold text-navy sm:text-3xl">{p.name}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-slate">{p.metaDescription}</p>
              </Link>
            ))}
          </div>

          <SectionHeading className="mt-24" eyebrow="Also on the floor with us" title="Other industries we serve" />
          <ul className="mt-8 flex flex-wrap gap-3">
            {industries.items.map((ind) => (
              <li key={ind} className="reveal glass-light rounded-full px-5 py-3 text-sm font-medium text-navy/80">
                {ind}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
