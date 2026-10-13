import type { Metadata } from "next";
import { Eyebrow, SectionHeading, PrimaryButton, PageHero } from "@/components/ui/marketing-ui";
import { getSiteContent } from "@/lib/site-content-db";
import { pageMetadata } from "@/lib/seo";
export const revalidate = 300;

export const metadata = pageMetadata({
  title: "Case Studies & Portfolio",
  description:
    "Sample ERP, production planning and HRMS implementations by JSS Innovative Solutions across textile, manufacturing and engineering businesses.",
  path: "/portfolio",
});
export default async function Portfolio() {
  const caseStudies = await getSiteContent("caseStudies");

  return (
    <>
    <PageHero
  eyebrow="Portfolio"
  title="Representative implementations"
  description="A sample of the kind of problems our implementations are built to solve — illustrative of the process, not an exhaustive client list."
/>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
        <div className="grid gap-8">
          {caseStudies.items.map((c) => (
            <div key={c.title} className="grid gap-6 rounded-xl border border-line bg-white p-8 sm:p-10 lg:grid-cols-[1fr_2fr]">
              <div>
                <span className="rounded-md bg-navy/5 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wide text-navy/70">
                  {c.industry}
                </span>
                <h2 className="mt-4 font-heading text-2xl font-semibold leading-tight text-navy">{c.title}</h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <h3 className="font-sans text-xs font-semibold uppercase tracking-wide text-slate">The challenge</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{c.challenge}</p>
                </div>
                <div>
                  <h3 className="font-sans text-xs font-semibold uppercase tracking-wide text-gold-dim">The outcome</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/80">{c.outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-paper-dim py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="Yours could be next"
            title="Tell us about your process and we'll scope it the same way"
          />
          <div className="mt-8 flex justify-center">
            <PrimaryButton to="/contact">Start a conversation</PrimaryButton>
          </div>
        </div>
      </section>
    </>
  );
}
