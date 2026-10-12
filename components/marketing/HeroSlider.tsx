"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export type Slide = {
  title: string;
  text: string;
  imageUrl: string;
  ctaLabel: string;
  ctaHref: string;
};

const AUTOPLAY_MS = 6500;
const SWIPE_THRESHOLD_PX = 50;

// Each slide turns the single red arc to a different angle
const ARC_ROTATIONS = [-150, -70, 20, 110];

function Arcs({ rotate }: { rotate: number }) {
  return (
    <svg
      className="pointer-events-none absolute right-0 top-0 h-full w-[65%] opacity-60 lg:opacity-100"
      viewBox="0 0 700 560"
      preserveAspectRatio="xMaxYMid slice"
      fill="none"
      stroke="#fff"
      aria-hidden="true"
    >
      <circle cx="640" cy="280" r="110" strokeOpacity=".14" />
      <circle cx="640" cy="280" r="190" strokeOpacity=".10" />
      <circle cx="640" cy="280" r="270" strokeOpacity=".08" />
      <circle cx="640" cy="280" r="350" strokeOpacity=".06" />
      <circle cx="640" cy="280" r="430" strokeOpacity=".05" />
      <circle
        cx="640"
        cy="280"
        r="190"
        stroke="#d7141f"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="260 940"
        transform={`rotate(${rotate} 640 280)`}
      />
    </svg>
  );
}

function SlideCta({ href, label, active }: { href: string; label: string; active: boolean }) {
  const classes =
    "group mt-9 inline-flex w-fit items-center gap-2 rounded-md bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-navy";
  const tabIndex = active ? 0 : -1;
  const arrow = <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />;

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} tabIndex={tabIndex}>
        {label}
        {arrow}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} tabIndex={tabIndex} target="_blank" rel="noopener noreferrer">
      {label}
      {arrow}
    </a>
  );
}

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [count, paused, index]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") goTo(index - 1);
    if (e.key === "ArrowRight") goTo(index + 1);
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
    goTo(dx < 0 ? index + 1 : index - 1);
  }

  if (count === 0) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={onTouchEnd}
      className="relative overflow-hidden bg-navy outline-offset-[-4px]"
    >
      <div
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
        style={{ transform: `translateX(-${index * 100}%)` }}
        aria-live={paused ? "polite" : "off"}
      >
        {slides.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!active}
              className="relative flex min-h-[480px] w-full shrink-0 grow-0 basis-full items-center lg:min-h-[560px]"
            >
              {slide.imageUrl ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.imageUrl}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/30" aria-hidden="true" />
                </>
              ) : (
                <Arcs rotate={ARC_ROTATIONS[i % ARC_ROTATIONS.length]} />
              )}

              <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 pt-16 sm:px-8">
                <div
                  key={active ? `a-${i}` : `i-${i}`}
                  className="max-w-2xl"
                  style={active ? { animation: "slide-rise 0.6s ease-out both" } : undefined}
                >
                  <p className="tabular flex items-center gap-3 text-sm font-medium text-white/60">
                    <span className="h-0.5 w-8 bg-brand" />
                    {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                  </p>
                  {slide.title && (
                    <h2 className="mt-5 font-heading text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
                      {slide.title}
                    </h2>
                  )}
                  {slide.text && <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">{slide.text}</p>}
                  {slide.ctaLabel && slide.ctaHref && <SlideCta href={slide.ctaHref} label={slide.ctaLabel} active={active} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-0 z-20">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 pb-8 sm:px-8">
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  className="flex h-6 w-10 items-center sm:w-14"
                >
                  <span className="relative block h-[3px] w-full overflow-hidden bg-white/25">
                    {i === index && (
                      <span
                        key={`${index}-${paused}`}
                        className="absolute inset-0 origin-left bg-white"
                        style={{
                          animation: `slider-progress ${AUTOPLAY_MS}ms linear forwards`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Previous slide"
                className="grid h-10 w-10 place-items-center rounded-md border border-white/25 text-white transition-colors hover:bg-white hover:text-navy"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Next slide"
                className="grid h-10 w-10 place-items-center rounded-md border border-white/25 text-white transition-colors hover:bg-white hover:text-navy"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}