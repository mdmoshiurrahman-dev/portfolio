"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const emptySubscribe = () => () => {};

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const prefersReducedMotion = useSyncExternalStore(
    (notify) => {
      if (typeof window === "undefined") return () => {};
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      mql.addEventListener("change", notify);
      return () => mql.removeEventListener("change", notify);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion) return;

    if (!("IntersectionObserver" in window)) {
      queueMicrotask(() => setIsVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  const shouldAnimate = isMounted && (prefersReducedMotion || isVisible);

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative w-full border-t border-zinc-200/80 dark:border-zinc-800 transition-colors duration-300"
      aria-label="Footer & Contact Section"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col justify-between">
        {/* Top Header Row: Serif Logo on Left & Social Action Links on Right */}
        <div
          className={`flex items-center justify-between pt-8 sm:pt-10 pb-6 sm:pb-8 transition-opacity duration-300 ${
            shouldAnimate ? "animate-footer-top" : "opacity-0"
          }`}
        >
          {/* Logo in Elegant Serif */}
          <Link
            href="#home"
            className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-zinc-950 dark:text-zinc-50 hover:opacity-80 transition-opacity"
          >
            Reyad.
          </Link>

          {/* Social Links with Subtle Pill State and Directional Arrow */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href="https://github.com/mdmoshiurrahman-dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="group inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-200/60 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700/80 transition-all duration-200"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="https://www.linkedin.com/in/md-reyad-hasan-823975443/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="group inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-sm font-medium transition-all duration-200"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="mailto:mdreyadahmed36@gmail.com"
              aria-label="Send email"
              className="group inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-sm font-medium transition-all duration-200"
            >
              <span>Email</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Center Prominent Headline & Subtitle */}
        <div className="py-24 sm:py-32 md:py-40 flex flex-col items-center justify-center text-center">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.14] mb-3 sm:mb-4 ${
              shouldAnimate ? "animate-footer-heading" : "opacity-0"
            }`}
          >
            Let&apos;s build something meaningful.
          </h2>
          <p
            className={`text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-normal max-w-xl leading-relaxed ${
              shouldAnimate ? "animate-footer-desc" : "opacity-0"
            }`}
          >
            Always learning, always creating. Feel free to reach out.
          </p>
        </div>

        {/* Hairline Divider */}
        <div className="border-t border-zinc-200/80 dark:border-zinc-800" />

        {/* Bottom Bar: Copyright on Left & Tagline on Right */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between py-6 sm:py-8 gap-3 sm:gap-4 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 ${
            shouldAnimate ? "animate-footer-bottom" : "opacity-0"
          }`}
        >
          <p>© 2026 MOSHIUR. All rights reserved.</p>
          <p>Designed &amp; built with care.</p>
        </div>
      </div>
    </footer>
  );
}
