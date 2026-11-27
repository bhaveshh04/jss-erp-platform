import Link from "next/link";
import { ArrowUpRight, Check, Plus, X } from "lucide-react";
import { Eyebrow, SectionHeading, PageHero, PrimaryButton, GhostButton, LightBackdrop } from "@/components/ui/marketing-ui";
import { SITE_URL } from "@/lib/seo";
import { ALL_LANDING_PAGES, landingPath, type LandingPage } from "@/lib/landing-pages";
import type { CompanySection, CaseStudiesSection } from "@/lib/site-sections";

const css = (vars: Record<string, string>) => vars as React.CSSProperties;

/** Shared layout for every search-targeted landing page (industries + Pune). */
export default function LandingPageView({
  page,
  company,
  caseStudies,
}: {
  page: LandingPage;
  company: CompanySection;
  caseStudies: CaseStudiesSection["items"];
}) {
  const path = landingPath(page);
  const url = `${SITE_URL}${path}`;
  const story = page.caseStudyIndustry
    ? caseStudies.find((c) => c.industry.toLowerCase() === page.caseStudyIndustry!.toLowerCase())
    : undefined;
  const others = ALL_LANDING_PAGES.filter((p) => p.slug !== page.slug);
  const tel = `tel:${company.phone.replace(/\s/g, "")}`;

  // Structured data: what this page offers + its FAQ (can show as rich results in Google)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.keyword.replace(/^./, (c) => c.toUpperCase()),
        serviceType: "ERP software development and implementation",
        description: page.metaDescription,
        url,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Country", name: "India" },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: page.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <PageHero
        crumb={{ name: page.name, path }}
        eyebrow={page.eyebrow}
        title={page.title}
        highlight={page.highlight}
        description={page.intro}
      >
        <PrimaryButton to="/contact">Book a free demo</PrimaryButton>
        <GhostButton href={tel}>Call {company.phone}</GhostButton>
      </PageHero>

      {/* ---------------------------------------------------------- PAIN POINTS */}
      <section className="relative isolate overflow-hidden bg-white">
        <LightBackdrop />
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <SectionHeading eyebrow="Sound familiar?" title="The problems we hear" highlight="every week." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {page.painPoints.map((p, i) => (
              <div
                key={p.title}
                className="reveal glass-light spot spot-light flex gap-4 rounded-3xl p-6 sm:p-7"
                style={css({ "--d": `${(i % 2) * 100}ms` })}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand">
                  <X className="h-4 w-4" strokeWidth={2.75} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-navy">{p.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-slate">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- FEATURES */}
      <section className="grain relative isolate overflow-hidden bg-night text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="glow right-[-10%] top-[-10%] h-[520px] w-[620px] bg-[#4c5fd7]/30" />
          <div className="glow bottom-[-20%] left-[-10%] h-[420px] w-[520px] bg-[#e11d2a]/25" />
        </div>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <SectionHeading
            dark
            eyebrow="What you get"
            title={`One ${page.name.replace(/ in Pune$/, "")} system,`}
            highlight="every module connected."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.features.map((f, i) => (
              <article
                key={f.title}
                className="reveal glass spot rounded-3xl p-6 sm:p-7"
                style={css({ "--d": `${(i % 3) * 90}ms` })}
              >
                <span className="font-display text-sm font-semibold text-white/30">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display mt-3 text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{f.text}</p>
                <ul className="mt-5 space-y-2 border-t border-white/10 pt-5">
                  {f.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-white/75">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#ff7a2f]" strokeWidth={2.75} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- EXPLAINER + CASE STUDY */}
      <section className="relative isolate overflow-hidden bg-paper-dim">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="reveal">
            <Eyebrow>{page.keyword}</Eyebrow>
            <h2 className="font-display mt-5 text-3xl font-semibold leading-[1.08] text-navy sm:text-[2.6rem]">
              {page.explainerTitle}
            </h2>
            {page.explainer.map((para) => (
              <p key={para.slice(0, 24)} className="mt-5 text-base leading-relaxed text-slate sm:text-[17px]">
                {para}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton to="/contact">Map my process</PrimaryButton>
              <GhostButton to="/services" tone="light">
                All modules
              </GhostButton>
            </div>
          </div>

          {story ? (
            <aside className="reveal grain relative isolate self-start overflow-hidden rounded-[2rem] bg-night p-7 text-white sm:p-9">
              <div aria-hidden="true" className="glow -right-20 -top-24 -z-10 h-72 w-72 bg-[#e11d2a]/45" />
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/70">
                Case study · {story.industry}
              </span>
              <h3 className="font-display mt-5 text-2xl font-semibold leading-tight">{story.title}</h3>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-white/40">The challenge</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-white/70">{story.challenge}</dd>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#ffb648]">The outcome</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-white/85">{story.outcome}</dd>
                </div>
              </dl>
              <Link
                href="/portfolio"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
              >
                More case studies <ArrowUpRight className="h-4 w-4" />
              </Link>
            </aside>
          ) : (
            <aside className="reveal glass-light self-start rounded-[2rem] p-7 sm:p-9">
              <h3 className="font-display text-2xl font-semibold text-navy">How an engagement runs</h3>
              <ol className="mt-6 space-y-4">
                {["Discover your process on site", "Map every flow & report", "Build around that map", "Go live with floor training", "Stay on for support"].map(
                  (step, i) => (
                    <li key={step} className="flex items-center gap-4">
                      <span className="font-display grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy text-sm font-semibold text-white">
                        {i + 1}
                      </span>
                      <span className="text-[15px] text-navy/80">{step}</span>
                    </li>
                  )
                )}
              </ol>
            </aside>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------- FAQ */}
      <section className="relative isolate overflow-hidden bg-white">
        <LightBackdrop />
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
          <SectionHeading align="center" eyebrow="FAQ" title="Questions we're" highlight="often asked." />
          <div className="mt-12 space-y-3">
            {page.faqs.map((f) => (
              <details key={f.q} className="reveal glass-light group rounded-2xl p-1 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-4 text-left">
                  <h3 className="font-display text-base font-semibold text-navy sm:text-lg">{f.q}</h3>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-navy/10 bg-white text-navy transition-transform duration-300 group-open:rotate-45 group-open:border-brand group-open:bg-brand group-open:text-white">
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <p className="px-5 pb-5 text-[15px] leading-relaxed text-slate">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- CTA + RELATED PAGES */}
      <section className="bg-white px-3 pb-20 sm:px-5 sm:pb-28">
        <div className="reveal grain relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-night px-6 py-14 text-white sm:px-14 sm:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="grid-lines absolute inset-0" />
            <div className="glow -right-20 -top-32 h-[420px] w-[420px] bg-[#e11d2a]/50" />
            <div className="glow -bottom-40 left-10 h-[380px] w-[480px] bg-[#4c5fd7]/40" />
          </div>
          <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="font-display text-3xl font-semibold leading-[1.05] sm:text-5xl">
                <span className="text-silver">See {page.keyword} built</span>{" "}
                <span className="font-accent text-flame">around your floor.</span>
              </h2>
              <p className="mt-5 max-w-xl text-white/60">
                Tell us how your business runs today. We&apos;ll show you what a customised ERP looks like for it — no
                generic demo.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <PrimaryButton to="/contact">Request a Demo</PrimaryButton>
              <a href={tel} className="inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white">
                or call {company.phone} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* internal links help Google discover and connect these pages */}
        <nav aria-label="Related solutions" className="mx-auto mt-14 max-w-7xl px-2">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-navy/40">Explore more</p>
          <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={landingPath(o)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-navy/10 bg-white px-4 py-2 text-sm font-medium text-navy/75 shadow-sm shadow-navy/5 transition-colors hover:border-brand hover:text-brand"
                >
                  {o.keyword.replace(/^./, (c) => c.toUpperCase())}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </>
  );
}
