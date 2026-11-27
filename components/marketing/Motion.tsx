"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One tiny client component that powers every effect on the public site, so
 * pages can stay server components and just use CSS class names:
 *
 *  - `.reveal`          fades/slides in when scrolled into view (`style={{"--d": "120ms"}}` to stagger)
 *  - `.spot`            card gets a soft glow that follows the mouse
 *  - `[data-count]`     number counts up from 0 when it comes into view
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- scroll reveal ----
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)"));
    let io: IntersectionObserver | null = null;
    if (reduced || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-in"));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io?.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      revealEls.forEach((el) => io!.observe(el));
    }

    // ---- count up ----
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    let co: IntersectionObserver | null = null;
    const run = (el: HTMLElement) => {
      const target = Number(el.dataset.count) || 0;
      if (reduced) {
        el.textContent = String(target);
        return;
      }
      const start = performance.now();
      const dur = 1600;
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 4))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ("IntersectionObserver" in window) {
      co = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              run(e.target as HTMLElement);
              co?.unobserve(e.target);
            }
          }
        },
        { threshold: 0.5 }
      );
      counters.forEach((el) => co!.observe(el));
    }

    // ---- spotlight (event delegation, one listener for the whole page) ----
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.(".spot") as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    // only on devices with a real mouse — phones don't need it
    const hasMouse = window.matchMedia("(hover: hover) and (min-width: 1024px)").matches;
    if (hasMouse) document.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io?.disconnect();
      co?.disconnect();
      document.removeEventListener("pointermove", onMove);
    };
  }, [pathname]);

  return null;
}
