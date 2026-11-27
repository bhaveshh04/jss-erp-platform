import {
  ArrowUpRight,
  Check,
  BrainCircuit,
  ChartColumn,
  Cpu,
  CodeXml,
  Compass,
  Layers,
  TrendingUp,
  Gauge,
  ShieldCheck,
  Search,
  Map as MapIcon,
  Hammer,
  Rocket,
  Handshake,
  Boxes,
  Users,
  Activity,
} from "lucide-react";
import { Eyebrow, SectionHeading, PrimaryButton, GhostButton, LightBackdrop } from "@/components/ui/marketing-ui";
import HeroSlider from "@/components/marketing/HeroSlider";
import { getSiteContentMany } from "@/lib/site-content-db";
import { pageMetadata, DEFAULT_TITLE, DEFAULT_DESCRIPTION } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: { absolute: DEFAULT_TITLE },
  description: DEFAULT_DESCRIPTION,
  path: "/",
});

const serviceIcons = [BrainCircuit, ChartColumn, Cpu, CodeXml];
const whyIcons = [Compass, Layers, TrendingUp, Gauge, ShieldCheck];

// How an engagement runs — fixed copy, describes the consulting approach.
const steps = [
  { Icon: Search, title: "Discover", text: "We sit on your floor and in your accounts office before we open a laptop." },
  { Icon: MapIcon, title: "Map", text: "Every process, exception and report is mapped and signed off with your team." },
  { Icon: Hammer, title: "Build", text: "Modules are built 200% around that map — not configured from a template." },
  { Icon: Rocket, title: "Go live", text: "Data migration, floor-level training and a phased switch-over, plant by plant." },
  { Icon: Handshake, title: "Stay", text: "The same engineers support you after go-live — not a rotating ticket queue." },
];

const techStack = ["React", "Next.js", "Java Spring Boot", "Node.js", "MySQL", "MS SQL", "PostgreSQL", "IoT / PLC", "Cloud", "Mobile apps"];

const css = (vars: Record<string, string>) => vars as React.CSSProperties;

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
      {/* ================================================================ HERO */}
      <section className="grain relative isolate overflow-hidden bg-night text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="grid-lines absolute inset-0" />
          <div className="glow drift-a -left-48 -top-32 h-[560px] w-[560px] bg-[#e11d2a]/40" />
          <div className="glow drift-b right-[-12%] top-[8%] h-[520px] w-[620px] bg-[#4c5fd7]/35" />
          <div className="glow drift-c bottom-[-200px] left-[35%] h-[420px] w-[520px] bg-[#ff7a2f]/25" />
          {/* light beam */}
          <div className="absolute left-1/2 top-0 h-[70%] w-px -translate-x-1/2 bg-gradient-to-b from-white/0 via-white/25 to-white/0 max-lg:hidden" />
        </div>

        <div className="mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-8 sm:pt-40 lg:pb-24 lg:pt-44">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
            {/* copy */}
            <div>
              <div className="rise">
                <Eyebrow dark>{hero.eyebrow}</Eyebrow>
              </div>
              <h1
                className="rise font-display mt-7 text-[2.75rem] font-semibold leading-[0.98] sm:text-6xl lg:text-[4rem] xl:text-[4.75rem]"
                style={css({ "--d": "80ms" })}
              >
                <span className="text-silver">{hero.headline}</span>{" "}
                <span className="font-accent text-flame pr-2">{hero.headlineHighlight}</span>
              </h1>
              <p
                className="rise mt-7 max-w-xl text-lg leading-relaxed text-white/65"
                style={css({ "--d": "160ms" })}
              >
                {hero.subheadline}
              </p>
              <div className="rise mt-10 flex flex-wrap gap-3" style={css({ "--d": "240ms" })}>
                <PrimaryButton to="/contact">{hero.primaryCta}</PrimaryButton>
                <GhostButton to="/services">{hero.secondaryCta}</GhostButton>
              </div>
              <div
                className="rise mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/50"
                style={css({ "--d": "320ms" })}
              >
                {["GST & e-invoicing ready", "On-premise or cloud", "Pune-based team"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-2">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-white/10">
                      <Check className="h-3 w-3 text-[#ffb648]" strokeWidth={3} />
                    </span>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* product composition */}
            <HeroVisual />
          </div>

          {/* stats */}
          {/* any number of stats: each cell draws its own right/bottom hairline, the
              wrapper hides the outermost ones */}
          <div
            className="rise glass edge mt-16 overflow-hidden rounded-3xl lg:mt-24"
            style={css({ "--d": "420ms" })}
          >
            <div className="-mb-px -mr-px grid grid-cols-2 lg:grid-cols-4">
            {hero.stats.map((s) => (
              <div
                key={s.label}
                className="relative border-b border-r border-white/10 p-6 transition-colors hover:bg-white/[0.03] sm:p-8"
              >
                <div className="font-display text-4xl font-semibold tabular-nums sm:text-6xl">
                  <span data-count={s.value} className="text-silver">
                    {s.value}
                  </span>
                  <span className="text-flame">{s.suffix}</span>
                </div>
                <div className="mt-2 text-sm text-white/50">{s.label}</div>
              </div>
            ))}
            </div>
          </div>
        </div>

        {/* industries marquee */}
        <div className="border-t border-white/10 py-8">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
            Trusted on the shop floor across
          </p>
          <div className="marquee overflow-hidden">
            <div className="marquee-track gap-3">
              {[...industries.items, ...industries.items].map((ind, i) => (
                <span
                  key={`${ind}-${i}`}
                  aria-hidden={i >= industries.items.length}
                  className="glass inline-flex shrink-0 items-center gap-2.5 rounded-full px-5 py-2.5 text-sm text-white/75"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#ff7a2f] to-[#e11d2a]" />
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ ABOUT */}
      <section className="relative isolate overflow-hidden bg-white">
        <LightBackdrop />
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
            <div className="reveal">
              <Eyebrow>Who we are</Eyebrow>
              <p className="font-display mt-7 text-3xl font-medium leading-[1.15] text-navy sm:text-[2.75rem]">
                An ERP partner that starts with{" "}
                <span className="font-accent text-flame-deep">your process</span>,{" "}
                <span className="text-navy/35">not our product.</span>
              </p>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-slate sm:text-lg">{about.whoWeAreBody}</p>
              <div className="mt-10">
                <GhostButton to="/about" tone="light">
                  More about us
                </GhostButton>
              </div>
            </div>
            <div className="grid content-end gap-5">
              {[
                { label: "Our Vision", text: about.vision, n: "01" },
                { label: "Our Mission", text: about.mission, n: "02" },
              ].map((b, i) => (
                <div
                  key={b.label}
                  className="reveal glass-light spot spot-light rounded-3xl p-7 sm:p-8"
                  style={css({ "--d": `${120 + i * 120}ms` })}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-semibold text-navy">{b.label}</h3>
                    <span className="font-display text-sm font-semibold text-brand">{b.n}</span>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ SERVICES BENTO */}
      <section className="relative isolate overflow-hidden bg-paper-dim">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="glow left-1/2 top-1/3 h-[500px] w-[800px] -translate-x-1/2 bg-[#ff7a2f]/[0.08]" />
        </div>
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="What we build"
              title="Core services that plug"
              highlight="straight into your ERP."
            />
            <p className="reveal max-w-sm text-base leading-relaxed text-slate">
              Four practice areas built on the same core as your ERP — not bolt-on add-ons sold separately.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-6">
            {services.items.map((s, i) => {
              const Icon = serviceIcons[i % serviceIcons.length];
              const wide = i % 4 === 0 || i % 4 === 3;
              return (
                <article
                  key={s.title}
                  className={`reveal glass-light spot spot-light group relative overflow-hidden rounded-[2rem] p-7 sm:p-9 ${
                    wide ? "lg:col-span-4" : "lg:col-span-2"
                  }`}
                  style={css({ "--d": `${(i % 2) * 120}ms` })}
                >
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-white shadow-lg shadow-navy/20 transition-colors duration-300 group-hover:bg-brand">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="font-display text-outline-dark text-6xl font-bold leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className={wide ? "grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end" : ""}>
                    <div>
                      <h3 className="font-display mt-8 text-2xl font-semibold text-navy sm:text-[1.75rem]">{s.title}</h3>
                      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-slate">{s.description}</p>
                      {s.points.length > 0 && (
                        <ul className="mt-6 flex flex-wrap gap-2">
                          {s.points.map((p) => (
                            <li
                              key={p}
                              className="inline-flex items-center gap-1.5 rounded-full border border-navy/10 bg-white px-3 py-1.5 text-xs font-medium text-navy/75"
                            >
                              <Check className="h-3 w-3 text-brand" strokeWidth={3} />
                              {p}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {wide && <BentoVisual variant={i % 4 === 0 ? "bars" : "nodes"} />}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ PRODUCT TOUR (CMS slider) */}
      {slider.slides.length > 0 && (
        <section className="grain relative isolate overflow-hidden bg-night text-white">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="glow right-[-10%] top-[-10%] h-[520px] w-[620px] bg-[#4c5fd7]/30" />
            <div className="glow bottom-[-20%] left-[-10%] h-[420px] w-[520px] bg-[#e11d2a]/25" />
          </div>
          <div className="mx-auto max-w-7xl px-5 pt-24 sm:px-8 sm:pt-32">
            <SectionHeading
              dark
              align="center"
              eyebrow="Inside the platform"
              title="One system for the whole floor —"
              highlight="see it in action."
            />
          </div>
          <HeroSlider slides={slider.slides} />
        </section>
      )}

      {/* ================================================================ WHY CHOOSE US */}
      <section className="relative isolate bg-white">
        <LightBackdrop />
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Why choose us"
              title="Five reasons implementations"
              highlight="stick with us."
              description="Most ERP projects fail at adoption, not at code. Everything about how we work is designed around the people who'll use the system every day."
            />
            <div className="reveal mt-10">
              <PrimaryButton to="/contact">Talk to an expert</PrimaryButton>
            </div>
          </div>
          <ol className="grid gap-4">
            {whyChooseUs.items.map((w, i) => {
              const Icon = whyIcons[i % whyIcons.length];
              return (
                <li
                  key={w.title}
                  className="reveal glass-light spot spot-light group flex gap-5 rounded-3xl p-6 sm:gap-7 sm:p-8"
                  style={css({ "--d": `${i * 60}ms` })}
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-navy/10 bg-white text-navy transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="font-display text-xs font-semibold text-navy/30">0{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-navy sm:text-2xl">{w.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate">{w.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ================================================================ PROCESS */}
      <section className="grain relative isolate overflow-hidden bg-night text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="dots absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
          <div className="glow left-1/2 top-1/2 h-[400px] w-[900px] -translate-x-1/2 -translate-y-1/2 bg-[#e11d2a]/20" />
        </div>
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <SectionHeading
            dark
            align="center"
            eyebrow="How we work"
            title="From whiteboard to go‑live,"
            highlight="without the guesswork."
          />
          <div className="relative mt-16">
            {/* connecting line */}
            <div
              aria-hidden="true"
              className="absolute left-[10%] right-[10%] top-9 hidden h-px bg-gradient-to-r from-transparent via-[#ff7a2f]/60 to-transparent lg:block"
            />
            <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {steps.map(({ Icon, title, text }, i) => (
                <li
                  key={title}
                  className="reveal glass spot relative rounded-3xl p-6 text-center lg:pt-0"
                  style={css({ "--d": `${i * 100}ms` })}
                >
                  <span className="relative mx-auto grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full border border-white/15 bg-night-2 lg:-mt-0 lg:translate-y-0">
                    <span className="absolute inset-1.5 rounded-full bg-gradient-to-br from-[#ff7a2f] to-[#e11d2a] opacity-90" />
                    <Icon className="relative h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <div className="font-display mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                    Step 0{i + 1}
                  </div>
                  <h3 className="font-display mt-1.5 text-2xl font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ================================================================ VALUES */}
      <section className="relative isolate overflow-hidden bg-paper-dim">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <SectionHeading
            align="center"
            eyebrow="Core values"
            title={`The five ${values.items[0]?.letter ?? "I"}'s behind`}
            highlight="every implementation."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {values.items.map((v, i) => (
              <div
                key={v.title}
                className="reveal glass-light spot spot-light group relative overflow-hidden rounded-3xl p-6 pt-28"
                style={css({ "--d": `${i * 80}ms` })}
              >
                <span
                  aria-hidden="true"
                  className="font-accent text-flame-deep absolute left-5 top-3 pr-3 text-[5.5rem] leading-none opacity-30 transition-all duration-500 group-hover:-translate-y-1 group-hover:opacity-100"
                >
                  {v.letter}
                </span>
                <h3 className="font-display relative text-xl font-semibold text-navy">{v.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-slate">{v.description}</p>
              </div>
            ))}
          </div>

          {/* tech stack */}
          <div className="reveal mt-20 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy/40">Built with modern, proven tech</p>
            <ul className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-2.5">
              {techStack.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-navy/10 bg-white/80 px-4 py-2 text-sm font-medium text-navy/70 shadow-sm shadow-navy/5 backdrop-blur"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================================================================ CTA */}
      <section className="bg-paper-dim px-3 pb-24 sm:px-5 sm:pb-32">
        <div className="reveal grain relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-night px-6 py-16 text-white sm:px-14 sm:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="grid-lines absolute inset-0" />
            <div className="glow drift-a -right-20 -top-32 h-[420px] w-[420px] bg-[#e11d2a]/50" />
            <div className="glow drift-b -bottom-40 left-10 h-[380px] w-[480px] bg-[#4c5fd7]/40" />
            <svg className="spin-slow absolute -right-40 top-1/2 h-[560px] w-[560px] -translate-y-1/2 opacity-30" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="98" stroke="url(#ctaRing)" strokeWidth="0.6" strokeDasharray="2 6" />
              <circle cx="100" cy="100" r="70" stroke="white" strokeOpacity="0.25" strokeWidth="0.4" />
              <defs>
                <linearGradient id="ctaRing" x1="0" y1="0" x2="200" y2="200">
                  <stop stopColor="#ff7a2f" />
                  <stop offset="1" stopColor="#4c5fd7" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="relative grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <Eyebrow dark>Free discovery call</Eyebrow>
              <h2 className="font-display mt-6 text-4xl font-semibold leading-[1.02] sm:text-6xl">
                <span className="text-silver">Ready to see your process</span>{" "}
                <span className="font-accent text-flame">mapped, not just quoted?</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                Tell us where the leakages are — inventory, billing, production, or all three — and we&apos;ll show you
                what a 200% customised implementation looks like on your floor.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <PrimaryButton to="/contact">Request a Demo</PrimaryButton>
              <a
                href={`tel:${company.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-1.5 text-sm text-white/55 transition-colors hover:text-white"
              >
                or call {company.phone} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------------------------------------------------------------------
   Hero composition — layered glass "command centre" (pure HTML/SVG, no images)
   --------------------------------------------------------------------------- */
function HeroVisual() {
  const bars = [38, 52, 44, 66, 58, 74, 69, 88, 96];
  return (
    <div
      aria-hidden="true"
      className="rise relative mx-auto w-full max-w-[560px] [perspective:1600px]"
      style={css({ "--d": "300ms" })}
    >
      {/* rings */}
      <svg className="spin-slow absolute left-1/2 top-1/2 -z-10 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-40" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="96" stroke="white" strokeOpacity="0.18" strokeWidth="0.4" strokeDasharray="1 4" />
        <circle cx="100" cy="100" r="74" stroke="white" strokeOpacity="0.1" strokeWidth="0.4" />
      </svg>

      {/* main window */}
      <div className="glass edge rounded-[1.75rem] p-4 sm:p-5 lg:[transform:rotateY(-8deg)_rotateX(4deg)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs font-medium text-white/60">Command Centre</span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[
            { k: "Orders today", v: "1,248", d: "+12%" },
            { k: "OEE", v: "86.4%", d: "+3.1%" },
            { k: "Stock value", v: "₹4.2Cr", d: "synced" },
          ].map((m) => (
            <div key={m.k} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <div className="text-[10px] text-white/45 sm:text-[11px]">{m.k}</div>
              <div className="font-display mt-1 text-base font-semibold sm:text-xl">{m.v}</div>
              <div className="mt-0.5 text-[10px] font-semibold text-emerald-300">{m.d}</div>
            </div>
          ))}
        </div>

        <div className="mt-2.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-white/75">Production vs plan</span>
            <span className="text-white/40">Last 9 weeks</span>
          </div>
          <div className="relative mt-3 h-36 sm:h-40">
            <div className="absolute inset-0 flex items-end gap-2 sm:gap-2.5">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className={`grow flex-1 rounded-t-md ${
                    i === bars.length - 1 ? "bg-gradient-to-t from-[#e11d2a] to-[#ff7a2f]" : "bg-white/[0.09]"
                  }`}
                  style={{ height: `${h}%`, "--d": `${500 + i * 70}ms` } as React.CSSProperties}
                />
              ))}
            </div>
            <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none" fill="none">
              <defs>
                <linearGradient id="heroLine" x1="0" x2="1">
                  <stop stopColor="#ffb648" />
                  <stop offset="1" stopColor="#ff4d4f" />
                </linearGradient>
              </defs>
              <path
                className="draw"
                d="M0 70 C 30 62, 45 66, 70 54 S 120 50, 150 40 S 200 38, 225 26 S 270 18, 300 8"
                stroke="url(#heroLine)"
                strokeWidth="2.2"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* floating chips */}
      <div className="float-a glass-strong absolute -left-4 bottom-20 hidden items-center gap-3 rounded-2xl p-3 pr-4 sm:-left-10 sm:flex">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#ff7a2f] to-[#e11d2a]">
          <Boxes className="h-5 w-5" />
        </span>
        <div>
          <div className="text-xs font-semibold">Inventory synced</div>
          <div className="text-[11px] text-white/50">3 plants · real-time</div>
        </div>
      </div>

      <div className="float-b glass-strong absolute -bottom-6 right-2 flex items-center gap-3 rounded-2xl p-3 pr-4 sm:-right-8">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#4c5fd7]">
          <Users className="h-5 w-5" />
        </span>
        <div>
          <div className="text-xs font-semibold">Payroll processed</div>
          <div className="text-[11px] text-white/50">PF / ESI reports ready</div>
        </div>
        <Check className="ml-1 h-4 w-4 text-emerald-300" strokeWidth={3} />
      </div>

      <div className="float-a glass-strong absolute -top-5 right-6 hidden items-center gap-2 rounded-full px-3.5 py-2 text-[11px] font-semibold sm:flex">
        <Activity className="h-3.5 w-3.5 text-[#ffb648]" /> Machine 07 · 94% uptime
      </div>
    </div>
  );
}

/* small decorative visuals for the wide bento cards */
function BentoVisual({ variant }: { variant: "bars" | "nodes" }) {
  if (variant === "bars") {
    const h = [30, 46, 38, 60, 52, 74, 90];
    return (
      <div aria-hidden="true" className="hidden h-36 w-56 items-end gap-2 rounded-2xl border border-navy/10 bg-white/70 p-4 sm:flex">
        {h.map((v, i) => (
          <div
            key={i}
            className={`flex-1 rounded-md transition-all duration-500 group-hover:opacity-100 ${
              i === h.length - 1 ? "bg-gradient-to-t from-[#e11d2a] to-[#ff7a2f]" : "bg-navy/10 group-hover:bg-navy/20"
            }`}
            style={{ height: `${v}%` }}
          />
        ))}
      </div>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 220 140" className="hidden h-36 w-56 sm:block" fill="none">
      <rect x="0.5" y="0.5" width="219" height="139" rx="16" fill="white" fillOpacity="0.7" stroke="#0b1f4b" strokeOpacity="0.1" />
      {[
        [40, 40],
        [40, 100],
        [180, 40],
        [180, 100],
      ].map(([x, y], i) => (
        <g key={i}>
          <line x1="110" y1="70" x2={x} y2={y} stroke="#0b1f4b" strokeOpacity="0.15" strokeDasharray="3 4" />
          <rect x={x - 16} y={y - 12} width="32" height="24" rx="7" fill="#fff" stroke="#0b1f4b" strokeOpacity="0.12" />
          <circle cx={x} cy={y} r="3.5" fill="#0b1f4b" fillOpacity="0.35" />
        </g>
      ))}
      <circle cx="110" cy="70" r="22" fill="#e11d2a" />
      <circle cx="110" cy="70" r="30" stroke="#e11d2a" strokeOpacity="0.25" />
      <path d="M103 70h14M110 63v14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
