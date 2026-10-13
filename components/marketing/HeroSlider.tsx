"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export type Slide = {
  title: string;
  text: string;
  imageUrl: string;
  ctaLabel: string;
  ctaHref: string;
};

const AUTOPLAY_MS = 7000;
const SWIPE_PX = 48;

/* ------------------------------------------------------------------ */
/*  Product-preview illustrations (pure SVG, scale to any screen)      */
/* ------------------------------------------------------------------ */

const N = "#0B1F4B";
const R = "#D7141F";
const G = "#7B8598";
const L = "#E3E7EE";
const T = "#D5DCEB";
const BG = "#F5F7FA";

function Frame({ title, badge, children }: { title: string; badge?: string; children: React.ReactNode }) {
  return (
    <>
      <rect width="560" height="400" rx="16" fill="#fff" />
      <circle cx="26" cy="26" r="5" fill={L} />
      <circle cx="44" cy="26" r="5" fill={L} />
      <circle cx="62" cy="26" r="5" fill={L} />
      <text x="88" y="30" fontSize="13" fontWeight="600" fill={N}>{title}</text>
      {badge && (
        <g transform={`translate(${542 - (34 + badge.length * 6.4)} 14)`}>
          <rect width={34 + badge.length * 6.4} height="24" rx="12" fill="#FDECEE" />
          <circle cx="15" cy="12" r="4" fill={R} />
          <text x="26" y="16" fontSize="11" fontWeight="600" fill={R}>{badge}</text>
        </g>
      )}
      <line x1="0" y1="52" x2="560" y2="52" stroke={L} />
      {children}
    </>
  );
}

function ErpVisual() {
  const bars = [44, 62, 50, 78, 70, 92, 84, 108, 126];
  const rows: [string, string, string, string][] = [
    ["Pune plant", "Ready", "#E8ECF5", N],
    ["Chakan unit", "Loading", "#E8ECF5", N],
    ["Warehouse 2", "Delayed", "#FDECEE", R],
  ];
  return (
    <Frame title="Production overview" badge="Live">
      {[["Orders today", "1,248"], ["Stock accuracy", "98.2%"], ["Dispatches", "342"]].map(([l, v], i) => (
        <g key={l} transform={`translate(${24 + i * 174} 68)`}>
          <rect width="160" height="78" rx="10" fill={BG} stroke={L} />
          <text x="14" y="26" fontSize="11" fill={G}>{l}</text>
          <text x="14" y="58" fontSize="26" fontWeight="700" fill={N}>{v}</text>
        </g>
      ))}
      <g transform="translate(24 162)">
        <rect width="318" height="214" rx="10" fill="#fff" stroke={L} />
        <text x="16" y="28" fontSize="12" fontWeight="600" fill={N}>Monthly output</text>
        <text x="302" y="28" fontSize="11" fill={G} textAnchor="end">Units (000)</text>
        {bars.map((h, i) => (
          <rect key={i} x={20 + i * 32} y={190 - h} width="20" height={h} rx="3" fill={i === bars.length - 1 ? R : T} />
        ))}
        <line x1="14" y1="190" x2="304" y2="190" stroke={L} />
      </g>
      <g transform="translate(358 162)">
        <rect width="178" height="214" rx="10" fill="#fff" stroke={L} />
        <text x="16" y="28" fontSize="12" fontWeight="600" fill={N}>Dispatch status</text>
        {rows.map(([name, status, bg, fg], i) => (
          <g key={name} transform={`translate(0 ${48 + i * 52})`}>
            <text x="16" y="14" fontSize="11" fill={N}>{name}</text>
            <rect x="16" y="22" width="62" height="20" rx="10" fill={bg} />
            <text x="47" y="36" fontSize="10" fontWeight="600" fill={fg} textAnchor="middle">{status}</text>
          </g>
        ))}
      </g>
    </Frame>
  );
}

function HrmsVisual() {
  const people: [string, string, boolean][] = [
    ["Asha Patil", "Present", true],
    ["Rohan Deshmukh", "Present", true],
    ["Neha Kulkarni", "On leave", false],
    ["Imran Shaikh", "Present", true],
  ];
  const c = 2 * Math.PI * 52;
  return (
    <Frame title="Attendance & payroll" badge="Today">
      <g transform="translate(24 68)">
        <rect width="200" height="308" rx="10" fill="#fff" stroke={L} />
        <text x="16" y="28" fontSize="12" fontWeight="600" fill={N}>Attendance</text>
        <g transform="translate(100 138)">
          <circle r="52" fill="none" stroke={T} strokeWidth="14" />
          <circle r="52" fill="none" stroke={R} strokeWidth="14" strokeLinecap="round" strokeDasharray={`${c * 0.94} ${c}`} transform="rotate(-90)" />
          <text y="8" fontSize="26" fontWeight="700" fill={N} textAnchor="middle">94%</text>
        </g>
        <text x="100" y="232" fontSize="11" fill={G} textAnchor="middle">47 of 50 present</text>
        <rect x="16" y="252" width="168" height="40" rx="8" fill={BG} stroke={L} />
        <text x="28" y="270" fontSize="10" fill={G}>Payroll</text>
        <text x="28" y="285" fontSize="12" fontWeight="600" fill={N}>Processed</text>
        <circle cx="166" cy="272" r="9" fill={N} />
        <path d="M161.5 272.2l3 3 5-5.5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g transform="translate(240 68)">
        <rect width="296" height="308" rx="10" fill="#fff" stroke={L} />
        <text x="16" y="28" fontSize="12" fontWeight="600" fill={N}>Team today</text>
        {people.map(([name, status, ok], i) => (
          <g key={name} transform={`translate(0 ${48 + i * 62})`}>
            <rect x="16" y="0" width="264" height="50" rx="8" fill={BG} />
            <circle cx="42" cy="25" r="14" fill={ok ? N : T} />
            <text x="42" y="29" fontSize="11" fontWeight="600" fill={ok ? "#fff" : N} textAnchor="middle">{name[0]}</text>
            <text x="66" y="22" fontSize="12" fontWeight="600" fill={N}>{name}</text>
            <text x="66" y="38" fontSize="10" fill={G}>Shift 9:30 – 6:30</text>
            <rect x="208" y="15" width="62" height="20" rx="10" fill={ok ? "#E8ECF5" : "#FDECEE"} />
            <text x="239" y="29" fontSize="10" fontWeight="600" fill={ok ? N : R} textAnchor="middle">{status}</text>
          </g>
        ))}
      </g>
    </Frame>
  );
}

function AutomationVisual() {
  const steps = ["Request raised", "Manager approval", "Purchase order", "Vendor notified"];
  return (
    <Frame title="Approval workflow" badge="Automated">
      <g transform="translate(24 76)">
        {steps.map((s, i) => {
          const active = i === 1;
          return (
            <g key={s} transform={`translate(0 ${i * 62})`}>
              {i < steps.length - 1 && <line x1="30" y1="46" x2="30" y2="70" stroke={active ? R : T} strokeWidth="2" />}
              <rect x="0" y="0" width="360" height="48" rx="10" fill={active ? "#FDECEE" : BG} stroke={active ? R : L} />
              <circle cx="30" cy="24" r="13" fill={active ? R : N} />
              <text x="30" y="28" fontSize="12" fontWeight="700" fill="#fff" textAnchor="middle">{i + 1}</text>
              <text x="56" y="28" fontSize="13" fontWeight="600" fill={N}>{s}</text>
              <text x="344" y="28" fontSize="10" fill={active ? R : G} textAnchor="end">{["0 min", "2 min", "Auto", "Sent"][i]}</text>
            </g>
          );
        })}
        <g transform="translate(0 258)">
          <rect width="360" height="38" rx="8" fill="#fff" stroke={L} />
          <circle cx="20" cy="19" r="9" fill={N} />
          <path d="M15.8 19.2l3 3 5-5.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <text x="38" y="23" fontSize="11" fill={N}>Approved by R. Deshmukh · 2 min ago</text>
        </g>
      </g>
      <g transform="translate(404 76)">
        <rect width="132" height="296" rx="10" fill="#fff" stroke={L} />
        <text x="14" y="28" fontSize="12" fontWeight="600" fill={N}>This week</text>
        <text x="14" y="72" fontSize="30" fontWeight="700" fill={N}>186</text>
        <text x="14" y="90" fontSize="10" fill={G}>approvals handled</text>
        <line x1="14" y1="112" x2="118" y2="112" stroke={L} />
        <text x="14" y="148" fontSize="30" fontWeight="700" fill={R}>0</text>
        <text x="14" y="166" fontSize="10" fill={G}>missed follow-ups</text>
        <line x1="14" y1="188" x2="118" y2="188" stroke={L} />
        <text x="14" y="224" fontSize="30" fontWeight="700" fill={N}>14h</text>
        <text x="14" y="242" fontSize="10" fill={G}>saved by the team</text>
      </g>
    </Frame>
  );
}

function SoftwareVisual() {
  return (
    <Frame title="app.yourcompany.in">
      <g transform="translate(24 68)">
        <rect width="150" height="308" rx="10" fill={BG} stroke={L} />
        {["Dashboard", "Orders", "Customers", "Reports", "Settings"].map((t, i) => (
          <g key={t} transform={`translate(12 ${16 + i * 38})`}>
            <rect width="126" height="30" rx="7" fill={i === 1 ? "#FDECEE" : "none"} />
            <rect x="10" y="9" width="12" height="12" rx="3" fill={i === 1 ? R : T} />
            <text x="32" y="20" fontSize="11" fontWeight={i === 1 ? 600 : 500} fill={i === 1 ? R : N}>{t}</text>
          </g>
        ))}
      </g>
      <g transform="translate(190 68)">
        <rect width="346" height="308" rx="10" fill="#fff" stroke={L} />
        <text x="16" y="28" fontSize="12" fontWeight="600" fill={N}>Orders</text>
        <rect x="262" y="12" width="70" height="26" rx="6" fill={R} />
        <text x="297" y="29" fontSize="11" fontWeight="600" fill="#fff" textAnchor="middle">+ New</text>
        <rect x="16" y="52" width="314" height="26" rx="6" fill={BG} />
        {["Order", "Customer", "Status"].map((h, i) => (
          <text key={h} x={28 + i * 112} y="69" fontSize="10" fontWeight="600" fill={G}>{h}</text>
        ))}
        {[
          ["#4021", "Shree Textiles", "Packed"],
          ["#4020", "Apex Castings", "Shipped"],
          ["#4019", "Nilgiri Foods", "Packed"],
          ["#4018", "Kalyani Tools", "Pending"],
          ["#4017", "Mehta Plastics", "Shipped"],
        ].map(([a, b, c], i) => (
          <g key={a} transform={`translate(0 ${92 + i * 40})`}>
            <text x="28" y="18" fontSize="11" fontWeight="600" fill={N}>{a}</text>
            <text x="140" y="18" fontSize="11" fill={N}>{b}</text>
            <rect x="252" y="4" width="62" height="20" rx="10" fill={c === "Pending" ? "#FDECEE" : "#E8ECF5"} />
            <text x="283" y="18" fontSize="10" fontWeight="600" fill={c === "Pending" ? R : N} textAnchor="middle">{c}</text>
            <line x1="16" y1="34" x2="330" y2="34" stroke={L} />
          </g>
        ))}
      </g>
    </Frame>
  );
}

const VISUALS = [ErpVisual, HrmsVisual, AutomationVisual, SoftwareVisual];
const VISUAL_LABELS = ["ERP dashboard preview", "HRMS dashboard preview", "Workflow automation preview", "Custom software preview"];

/* ------------------------------------------------------------------ */
/*  CTA — handles internal, external, tel:, mailto: and #anchor links  */
/* ------------------------------------------------------------------ */

const CTA_CLASSES =
  "group inline-flex min-h-12 w-fit items-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

function SlideCta({ href, label }: { href: string; label: string }) {
  const h = href.trim();
  const arrow = <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />;

  if (/^https?:\/\//i.test(h)) {
    return (
      <a href={h} className={CTA_CLASSES} target="_blank" rel="noopener noreferrer">
        {label}
        {arrow}
      </a>
    );
  }
  if (/^(tel:|mailto:)/i.test(h)) {
    return (
      <a href={h} className={CTA_CLASSES}>
        {label}
        {arrow}
      </a>
    );
  }
  const internal = h.startsWith("//") ? "/" : h.startsWith("/") ? h : `/${h}`;
  return (
    <Link href={internal} className={CTA_CLASSES}>
      {label}
      {arrow}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Slider                                                             */
/* ------------------------------------------------------------------ */

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const items = slides.filter((s) => s.title?.trim() || s.text?.trim() || s.imageUrl?.trim());
  const count = items.length;

  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  const rootRef = useRef<HTMLElement>(null);
  const pausedRef = useRef(false);
  const elapsedRef = useRef(0);
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  const setProgress = useCallback((value: number) => {
    rootRef.current?.style.setProperty("--p", String(value));
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (!count) return;
      elapsedRef.current = 0;
      setProgress(0);
      setIndex(((next % count) + count) % count);
    },
    [count, setProgress]
  );

  // keep the index valid if the owner removes slides
  useEffect(() => {
    setIndex((i) => (count ? Math.min(i, count - 1) : 0));
  }, [count]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // One animation-frame loop drives both the timer and the progress line, so
  // they can never drift apart. Hover, focus, touch and hidden tabs pause both.
  useEffect(() => {
    if (count < 2 || reduced) return;
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (!pausedRef.current && !document.hidden) {
        elapsedRef.current += dt;
        if (elapsedRef.current >= AUTOPLAY_MS) {
          elapsedRef.current = 0;
          setIndex((i) => (i + 1) % count);
        }
        setProgress(Math.min(elapsedRef.current / AUTOPLAY_MS, 1));
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count, reduced, setProgress]);

  function onKeyDown(e: KeyboardEvent<HTMLElement>) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(index + 1);
    }
  }

  function onTouchStart(e: TouchEvent<HTMLElement>) {
    pausedRef.current = true;
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }

  function onTouchEnd(e: TouchEvent<HTMLElement>) {
    pausedRef.current = false;
    const start = touchRef.current;
    touchRef.current = null;
    if (!start) return;
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    // only clearly horizontal swipes change the slide, so normal page scrolling still works
    if (Math.abs(dx) >= SWIPE_PX && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(dx < 0 ? index + 1 : index - 1);
  }

  if (!count) return null;

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label="Featured solutions"
      onKeyDown={onKeyDown}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onFocus={() => (pausedRef.current = true)}
      onBlur={() => (pausedRef.current = false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchCancel={() => (pausedRef.current = false)}
      className="relative isolate overflow-hidden bg-navy text-white"
    >
      {/* quiet background: soft light + the logo's concentric arcs */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(255,255,255,0.08),transparent_55%)]" />
        <svg
          className="absolute right-0 top-0 h-full w-[70%] min-w-[520px] opacity-70"
          viewBox="0 0 700 560"
          preserveAspectRatio="xMaxYMid slice"
          fill="none"
          stroke="#fff"
        >
          <circle cx="600" cy="280" r="150" strokeOpacity=".07" />
          <circle cx="600" cy="280" r="250" strokeOpacity=".06" />
          <circle cx="600" cy="280" r="350" strokeOpacity=".05" />
          <circle cx="600" cy="280" r="450" strokeOpacity=".04" />
          <circle
            cx="600"
            cy="280"
            r="250"
            stroke="#d7141f"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="300 1300"
            transform="rotate(-140 600 280)"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* all slides share one grid cell, so the section is always as tall as the tallest slide */}
        <div className="grid">
          {items.map((slide, i) => {
            const active = i === index;
            const Visual = VISUALS[i % VISUALS.length];
            const showSecondary = !!slide.ctaLabel && !!slide.ctaHref && !/^\/?contact/i.test(slide.ctaHref.trim());

            return (
              <div
                key={`${slide.title}-${i}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={!active}
                inert={!active}
                className={`col-start-1 row-start-1 grid items-center gap-10 py-12 transition-opacity duration-500 sm:py-16 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-24 ${
                  active ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <div
                  className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
                    active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  }`}
                >
                  <p className="flex items-center gap-3 text-sm font-medium text-white/60">
                    <span className="h-0.5 w-8 bg-brand" />
                    <span className="tabular-nums">
                      {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                    </span>
                  </p>

                  {slide.title && (
                    <h2 className="mt-5 max-w-xl font-heading text-[2rem] font-semibold leading-[1.1] text-white sm:text-5xl lg:text-[3.5rem]">
                      {slide.title}
                    </h2>
                  )}

                  {slide.text && (
                    <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">{slide.text}</p>
                  )}

                  {slide.ctaLabel && slide.ctaHref && (
                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <SlideCta href={slide.ctaHref} label={slide.ctaLabel} />
                      {showSecondary && (
                        <Link
                          href="/contact"
                          className="inline-flex min-h-12 items-center text-sm font-semibold text-white/80 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
                        >
                          Talk to an expert
                        </Link>
                      )}
                    </div>
                  )}
                </div>

                {/* right column — hidden on phones, where text + button is the whole message */}
                <div
                  className={`hidden transition-all duration-700 ease-out motion-reduce:transition-none sm:block ${
                    active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                >
                  {slide.imageUrl ? (
                    <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/40">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={slide.imageUrl}
                        alt={slide.title || "JSS Innovative Solutions"}
                        className="h-full w-full object-cover"
                        loading={i === 0 ? "eager" : "lazy"}
                        draggable={false}
                      />
                    </div>
                  ) : (
                    <div className="mx-auto w-full max-w-[560px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]">
                      <svg
                        viewBox="0 0 560 400"
                        role="img"
                        aria-label={VISUAL_LABELS[i % VISUAL_LABELS.length]}
                        className="h-auto w-full"
                      >
                        <Visual />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* controls */}
      {count > 1 && (
        <div className="border-t border-white/10">
          <nav aria-label="Slide navigation" className="mx-auto flex max-w-7xl items-stretch gap-3 px-5 sm:px-8">
            <div className="flex flex-1 items-stretch">
              {items.map((slide, i) => {
                const active = i === index;
                return (
                  <button
                    key={`${slide.title}-tab-${i}`}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show slide ${i + 1}: ${slide.title || "highlight"}`}
                    aria-current={active}
                    className="group relative flex min-h-14 flex-1 items-center pr-3 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white md:items-start md:pt-4"
                  >
                    <span className="absolute inset-x-0 top-0 h-[3px] bg-white/10 md:bg-white/15" aria-hidden="true">
                      <span
                        className={`absolute inset-0 origin-left bg-brand ${active ? "" : "scale-x-0"}`}
                        style={active ? { transform: reduced ? "scaleX(1)" : "scaleX(var(--p, 0))" } : undefined}
                      />
                    </span>
                    <span
                      className={`hidden truncate text-sm font-medium transition-colors md:block ${
                        active ? "text-white" : "text-white/50 group-hover:text-white/80"
                      }`}
                    >
                      <span className="mr-2 tabular-nums text-white/40">{String(i + 1).padStart(2, "0")}</span>
                      {slide.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 py-2">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Previous slide"
                className="grid h-11 w-11 place-items-center rounded-md border border-white/20 text-white transition-colors hover:bg-white hover:text-navy"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Next slide"
                className="grid h-11 w-11 place-items-center rounded-md border border-white/20 text-white transition-colors hover:bg-white hover:text-navy"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </section>
  );
}