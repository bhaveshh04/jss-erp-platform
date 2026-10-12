import { Compass, Layers, TrendingUp, Gauge, ShieldCheck, Check } from "lucide-react";
import { Eyebrow, SectionHeading, PrimaryButton, GhostButton } from "@/components/ui/marketing-ui";
import { StatCounter } from "@/components/ui/StatCounter";
import HeroSlider from "@/components/marketing/HeroSlider";
import { getSiteContentMany } from "@/lib/site-content-db";

export const dynamic = "force-dynamic";

const whyIcons = [Compass, Layers, TrendingUp, Gauge, ShieldCheck];

export default async function Home() {
  const { company, hero, slider, services, values, whyChooseUs, industries, about } = await getSiteContentMany([
    "company",
    "hero",
    "slider",
    "services",
    "values",
    "whyChooseUs",
    "industries",
    "about",
  ]);

  return (
    <>
      {/* SLIDER — full width, aligned to the navbar */}
      {slider.slides.length > 0 && (
        <section aria-label="Highlights">
          <HeroSlider slides={slider.slides} />
        </section>
      )}

      {/* INTRO + STATS */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
            <div>
              <Eyebrow>
                {company.location} · {company.tagline}
              </Eyebrow>
              <h1 className="mt-5 font-heading text-4xl font-semibold leading-[1.1] text-navy sm:text-5xl lg:text-[3.25rem]">
                {hero.headline} <span className="block text-brand">{hero.headlineHighlight}</span>
              </h1>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-slate">{hero.subheadline}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <PrimaryButton to="/contact">{hero.primaryCta}</PrimaryButton>
                <GhostButton to="/services" tone="light">
                  {hero.secondaryCta}
                </GhostButton>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            {hero.stats.map((s) => (
              <div key={s.label} className="border-t border-navy/15 pt-5">
                <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="border-y border-line bg-paper-dim">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <Eyebrow>Who we are</Eyebrow>
              <h2 className="mt-3 font-heading text-3xl font-semibold leading-[1.15] text-navy sm:text-4xl">
                An ERP partner that starts with your process, not our product
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate">{about.whoWeAreBody}</p>
              <div className="mt-8">
                <GhostButton to="/about" tone="light">
                  More about us
                </GhostButton>
              </div>
            </div>
            <div className="space-y-10 lg:pt-10">
              <div className="border-l-2 border-brand pl-6">
                <h3 className="text-lg font-semibold text-navy">Our Vision</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{about.vision}</p>
              </div>
              <div className="border-l-2 border-navy/20 pl-6">
                <h3 className="text-lg font-semibold text-navy">Our Mission</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{about.mission}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SERVICES */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading
            eyebrow="What we build"
            title="Core services"
            description="Four practice areas that plug directly into the ERP core, not bolt-on add-ons sold separately."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.items.map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-line bg-white p-7 transition-all hover:border-navy/30 hover:shadow-lg hover:shadow-navy/5"
              >
                <h3 className="text-lg font-semibold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{s.description}</p>
                <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-slate">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2.5} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US — the one navy band */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading dark eyebrow="Why choose us" title="Five reasons implementations stick with us" />
          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
            {whyChooseUs.items.map((w, i) => {
              const Icon = whyIcons[i % whyIcons.length];
              return (
                <div key={w.title}>
                  <div className="grid h-11 w-11 place-items-center rounded-lg border border-white/20 text-gold">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-white">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{w.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="bg-paper-dim">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading eyebrow="Core values" title="The five I's behind every implementation" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {values.items.map((v) => (
              <div key={v.title} className="rounded-xl border border-line bg-white p-6">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-navy font-heading text-lg font-semibold text-white">
                  {v.letter}
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <Eyebrow>Industries we work with</Eyebrow>
          <div className="mt-6 flex flex-wrap gap-3">
            {industries.items.map((ind) => (
              <span key={ind} className="rounded-md border border-line bg-paper-dim px-4 py-2 text-sm text-navy/80">
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-paper-dim">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl font-semibold leading-[1.15] text-navy">
              Ready to see your process mapped, not just quoted?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate">
              Tell us where the leakages are — inventory, billing, production, or all three — and we&apos;ll show you
              what a 200% customised implementation looks like on your floor.
            </p>
          </div>
          <PrimaryButton to="/contact" className="shrink-0">
            Request a Demo
          </PrimaryButton>
        </div>
      </section>
    </>
  );
}