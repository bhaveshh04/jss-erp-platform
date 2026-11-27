import type { Metadata } from "next";
import { Eyebrow, SectionHeading, PrimaryButton, PageHero } from "@/components/ui/marketing-ui";
import { getSiteContentMany } from "@/lib/site-content-db";
import { pageMetadata } from "@/lib/seo";
export const revalidate = 300;

export const metadata = pageMetadata({
  title: "About Us — ERP Partner in Pune",
  description:
    "Meet JSS Innovative Solutions, a Pune-based ERP implementation partner. Our story, vision, mission and the values behind every 200% customised build.",
  path: "/about",
});
export default async function About() {
  const { company, about, values, whyChooseUs } = await getSiteContentMany([
    "company",
    "about",
    "values",
    "whyChooseUs",
  ]);

  return (
    <>
<PageHero
  eyebrow={`About ${company.name}`}
  title="Integrating business"
  highlight="with technology."
  description={`We're a ${company.location}-based ERP and software development partner, building systems for manufacturing, textile and process industries across ${company.serves}.`}
/>

      {/* WHO WE ARE */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl">
              {about.whoWeAreTitle}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate">{about.whoWeAreBody}</p>
            <p className="mt-4 text-base leading-relaxed text-slate">{about.whoWeAreBody2}</p>
          </div>

          <div className="grid gap-6">
            <div className="reveal glass-light spot spot-light rounded-3xl p-8">
              <h3 className="font-display text-xl font-semibold text-navy">Our Vision</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate">{about.vision}</p>
            </div>
            <div className="reveal glass-light spot spot-light rounded-3xl p-8">
              <h3 className="font-display text-xl font-semibold text-navy">Our Mission</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate">{about.mission}</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="grain relative isolate overflow-hidden bg-night bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(225,29,42,0.22),transparent),radial-gradient(ellipse_50%_50%_at_90%_100%,rgba(76,95,215,0.22),transparent)] py-14 text-white sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading dark eyebrow="Why choose us" title="What an engagement with us actually looks like" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {whyChooseUs.items.map((w) => (
              <div key={w.title} className="reveal glass spot rounded-3xl p-6">
                <h3 className="font-display text-base font-semibold text-white">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{w.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
        <SectionHeading eyebrow="Core values" title="The five I's" align="center" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {values.items.map((v) => (
            <div key={v.title} className="reveal glass-light spot spot-light rounded-3xl p-6 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-navy font-display text-lg font-semibold text-white">
                {v.letter}
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-navy">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="bg-paper-dim py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-center">
            <div>
              <Eyebrow>Leadership</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold text-navy">
                Led from the floor, not the boardroom
              </h2>
            </div>
            <div className="reveal glass-light spot spot-light rounded-3xl p-8">
              <h3 className="font-display text-xl font-semibold text-navy">{about.leaderName}</h3>
              <p className="mt-1 font-sans text-xs font-semibold uppercase tracking-wide text-brand">
                {about.leaderTitle}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-slate">{about.leaderBio}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grain relative isolate overflow-hidden bg-night bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(225,29,42,0.22),transparent),radial-gradient(ellipse_50%_50%_at_90%_100%,rgba(76,95,215,0.22),transparent)] py-24 text-white sm:py-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-5 text-center sm:px-8">
          <h2 className="font-display text-silver text-3xl font-semibold leading-[1.05] sm:text-5xl">
            Want the full picture before you call?
          </h2>
          <PrimaryButton to="/services">See what we build</PrimaryButton>
        </div>
      </section>
    </>
  );
}
