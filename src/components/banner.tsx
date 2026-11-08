"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Folder } from "lucide-react";
import personImage from "@/image/banner-person.jpeg";

export function Banner() {
  const [imageError, setImageError] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    // Respect user's motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Apply restrained subtle parallax only while banner is visible
          if (scrollY < 900) {
            setParallaxOffset(Math.round(scrollY * 0.06));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="relative w-full max-w-6xl mx-auto px-6 sm:px-8 md:px-12 pt-8 sm:pt-14 md:pt-20 pb-16 sm:pb-24 overflow-hidden lg:overflow-visible"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Left Column: Staggered Content */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* 1. Introductory label: gentle fade-in */}
          <div className="animate-hero-label">
            <p className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400 mb-4 sm:mb-6">
              HELLO, I&apos;M MOSHIUR — A DEVELOPER FROM BANGLADESH
            </p>
          </div>

          {/* 2. Main heading: fade-up with slight vertical movement */}
          <div className="animate-hero-heading">
            <h1 className="text-[38px] sm:text-5xl md:text-[58px] lg:text-[62px] font-bold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.12] mb-6">
              Building digital <br />
              experiences with <br />
              code and curiosity.
            </h1>
          </div>

          {/* 3. Description: fade-up after the heading */}
          <div className="animate-hero-description">
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed mb-8 sm:mb-10 font-normal">
              I&apos;m a developer passionate about creating useful digital
              products and exploring the intersection of technology, creativity,
              and problem-solving.
            </p>
          </div>

          {/* 4. CTA buttons: subtle staggered fade-up */}
          <div className="animate-hero-cta flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-6 py-3 text-sm sm:text-base font-medium rounded-lg bg-zinc-950 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 shadow-sm transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              Explore My Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 text-sm sm:text-base font-medium rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Right Column: 6. Portrait image with subtle parallax depth */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end animate-hero-portrait">
          {/* Subtle decorative ambient glow with subtle parallax */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 -right-8 w-72 h-72 rounded-full bg-zinc-300/30 dark:bg-zinc-800/20 blur-3xl -z-10 will-change-transform"
            style={{
              transform: parallaxOffset
                ? `translate3d(0, ${Math.round(parallaxOffset * 1.3)}px, 0)`
                : undefined,
            }}
          />

          <div
            className="relative w-full max-w-[380px] lg:max-w-[420px] aspect-[4/5] rounded-3xl border border-zinc-200/90 dark:border-zinc-800 bg-[#F4F4F2]/50 dark:bg-zinc-900/40 p-2 overflow-hidden shadow-xs will-change-transform"
            style={{
              transform: parallaxOffset
                ? `translate3d(0, ${parallaxOffset}px, 0)`
                : undefined,
            }}
          >
            {!imageError ? (
              <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-zinc-200/50 dark:bg-zinc-800/50">
                <Image
                  src={personImage}
                  alt="MOSHIUR portrait"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
                  className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]"
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              /* Fallback Placeholder (as shown in design wireframe) */
              <div className="w-full h-full rounded-[20px] border border-dashed border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center p-6 text-center text-zinc-400 dark:text-zinc-500">
                <p className="text-base font-normal">Your photograph goes here</p>
                <p className="text-sm mt-1">(4:5 Portrait)</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

