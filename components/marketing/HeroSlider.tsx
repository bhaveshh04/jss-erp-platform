"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type FocusEvent,
  type TouchEvent,
} from "react";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  ChevronLeft,
  ChevronRight,
  Code2,
  Factory,
  Workflow,
} from "lucide-react";

export type Slide = {
  title: string;
  text: string;
  imageUrl: string;
  ctaLabel: string;
  ctaHref: string;
};

const AUTOPLAY_MS = 6500;
const SWIPE_THRESHOLD = 50;

const visuals = [
  { Icon: Factory, label: "Manufacturing", number: "01" },
  { Icon: Boxes, label: "Connected ERP", number: "02" },
  { Icon: Workflow, label: "Process automation", number: "03" },
  { Icon: Code2, label: "Custom software", number: "04" },
];

function SlideVisual({
  slide,
  index,
}: {
  slide: Slide;
  index: number;
}) {
  const visual = visuals[index % visuals.length];
  const Icon = visual.Icon;

  return (
    <div className="relative min-h-[270px] overflow-hidden rounded-2xl border border-white/10 bg-[#10294e] shadow-2xl shadow-black/20 sm:min-h-[340px] lg:min-h-[390px]">
      {slide.imageUrl ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.imageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07172f]/90 via-[#07172f]/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">
              JSS Innovative Solutions
            </p>
            <p className="mt-2 max-w-sm text-xl font-semibold leading-snug text-white sm:text-2xl">
              Technology designed around the way your business works.
            </p>
          </div>
        </>
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 75% 20%, rgba(215,20,31,.45), transparent 30%), radial-gradient(circle at 20% 85%, rgba(70,120,190,.35), transparent 35%)",
            }}
          />

          <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -right-5 -top-9 h-52 w-52 rounded-full border border-white/10" />
          <div className="absolute right-8 top-8 h-32 w-32 rounded-full border border-[#e53b45]/50" />

          <div className="relative flex h-full min-h-[270px] flex-col justify-between p-5 sm:min-h-[340px] sm:p-8 lg:min-h-[390px]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50 sm:text-xs">
                  JSS / TECHNOLOGY
                </p>
                <p className="mt-1 text-sm font-medium text-white/80">
                  Built for your workflow
                </p>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/15 bg-white/5">
                <Icon className="h-6 w-6 text-[#ff777e]" strokeWidth={1.6} />
              </div>
            </div>

            <div className="relative mx-auto my-7 w-full max-w-sm">
              <div className="absolute left-1/2 top-8 h-[calc(100%-64px)] w-px -translate-x-1/2 bg-gradient-to-b from-[#ff777e]/70 via-white/20 to-white/5" />

              {[
                { title: "Understand", sub: "Map the real process" },
                { title: "Build", sub: visual.label },
                { title: "Improve", sub: "Measure and refine" },
              ].map((item, itemIndex) => (
                <div
                  key={item.title}
                  className={`relative mb-3 flex items-center gap-3 rounded-xl border p-3 backdrop-blur-sm sm:p-4 ${
                    itemIndex === 1
                      ? "border-[#ff777e]/40 bg-[#d7141f]/15"
                      : "border-white/10 bg-[#07172f]/65"
                  }`}
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg text-xs font-bold ${
                      itemIndex === 1
                        ? "bg-[#d7141f] text-white"
                        : "bg-white/10 text-white/75"
                    }`}
                  >
                    {itemIndex + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-xs text-white/55">
                      {item.sub}
                    </p>
                  </div>
                  {itemIndex === 1 && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-[#ff777e]" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-xs text-white/50">
                {visual.number} / BUSINESS SYSTEMS
              </span>
              <span className="text-xs font-medium text-white/75">
                Custom-fit technology
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SlideCta({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const classes =
    "group inline-flex w-fit items-center gap-2 rounded-lg bg-[#d7141f] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-950/20 transition-colors hover:bg-[#b50f18] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link href={href} className={classes}>
        {label}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    );
  }

  if (/^https?:\/\//i.test(href)) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
    );
  }

  return null;
}

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const safeSlides = slides.filter(
    (slide) => slide.title?.trim() || slide.text?.trim() || slide.imageUrl?.trim()
  );

  const count = safeSlides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => {
      if (!count) return;
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  useEffect(() => {
    setIndex((current) => (count ? current % count : 0));
  }, [count]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (count < 2 || paused || reducedMotion) return;

    const timer = window.setTimeout(
      () => setIndex((current) => (current + 1) % count),
      AUTOPLAY_MS
    );

    return () => window.clearTimeout(timer);
  }, [count, index, paused, reducedMotion]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setPaused(false);
    }
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;

    const delta =
      event.changedTouches[0].clientX - touchStartX.current;

    touchStartX.current = null;

    if (Math.abs(delta) >= SWIPE_THRESHOLD) {
      goTo(delta < 0 ? index + 1 : index - 1);
    }
  }

  if (!count) return null;

  const slide = safeSlides[index];

  return (
    <section
      aria-label="Featured JSS solutions"
      className="bg-[#07172f] text-white"
    >
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured solutions"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={handleBlur}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0].clientX;
        }}
        onTouchEnd={handleTouchEnd}
        className="mx-auto max-w-[1440px] px-4 py-5 outline-offset-[-4px] sm:px-8 sm:py-8 lg:px-12 lg:py-10"
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c2345] via-[#0b1f3d] to-[#07172f]">
          <div className="grid gap-7 p-5 sm:p-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-10 lg:p-10 xl:p-12">
            <div key={`copy-${index}`} className="py-2 sm:py-4">
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                <span className="h-px w-8 bg-[#e52b36]" />
                JSS Innovative Solutions
              </div>

              <h2 className="mt-6 max-w-xl text-3xl font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl">
                {slide.title}
              </h2>

              {slide.text && (
                <p className="mt-5 max-w-lg text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                  {slide.text}
                </p>
              )}

              {slide.ctaLabel && slide.ctaHref && (
                <div className="mt-7">
                  <SlideCta href={slide.ctaHref} label={slide.ctaLabel} />
                </div>
              )}

              <div className="mt-8 flex items-center gap-3 text-xs font-medium text-white/45">
                <span className="tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-8 bg-white/20" />
                <span className="tabular-nums">
                  {String(count).padStart(2, "0")}
                </span>
                <span className="ml-1">Solutions that fit your process</span>
              </div>
            </div>

            <div key={`visual-${index}`}>
              <SlideVisual slide={slide} index={index} />
            </div>
          </div>

          {count > 1 && (
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-5 py-4 sm:px-8 lg:px-10">
              <div className="flex flex-wrap items-center gap-2">
                {safeSlides.map((item, itemIndex) => (
                  <button
                    key={`${item.title}-${itemIndex}`}
                    type="button"
                    onClick={() => goTo(itemIndex)}
                    aria-label={`Show slide ${itemIndex + 1}: ${item.title || "highlight"}`}
                    aria-pressed={itemIndex === index}
                    className={`h-2 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                      itemIndex === index
                        ? "w-8 bg-[#ff777e]"
                        : "w-2 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="mr-2 hidden text-xs text-white/45 sm:inline">
                  Explore our capabilities
                </span>
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  aria-label="Previous slide"
                  className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 text-white transition-colors hover:bg-white/10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  aria-label="Next slide"
                  className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 text-white transition-colors hover:bg-white/10"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


