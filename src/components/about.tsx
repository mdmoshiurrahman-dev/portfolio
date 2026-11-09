"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Bookmark } from "lucide-react";

const emptySubscribe = () => () => {};

export function About() {
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
        rootMargin: "0px 0px -50px 0px",
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
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full max-w-6xl mx-auto px-6 sm:px-8 md:px-12 py-16 sm:py-24 transition-colors duration-300"
      aria-label="About Me Section"
    >
      {/* 1. Header: Label, Main Heading, Intro Description */}
      <div className="mb-10 sm:mb-12">
        <p
          className={`text-xs sm:text-[13px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-3 sm:mb-4 ${
            shouldAnimate ? "animate-about-header" : "opacity-0"
          }`}
        >
          ABOUT
        </p>

        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.15] mb-4 sm:mb-5 ${
            shouldAnimate ? "animate-about-heading" : "opacity-0"
          }`}
        >
          A little about me.
        </h2>

        <p
          className={`text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal leading-relaxed ${
            shouldAnimate ? "animate-about-intro" : "opacity-0"
          }`}
        >
          I&apos;m Moshiur Rehman, a developer from Bangladesh who enjoys turning ideas into
          meaningful digital experiences.
        </p>
      </div>

      {/* Hairline Divider */}
      <div className="border-t border-zinc-200/80 dark:border-zinc-800 my-8 sm:my-12" />

      {/* 2. Middle Row: 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-start">
        {/* Column 1: Curiosity keeps me moving */}
        <div
          className={`${
            shouldAnimate ? "animate-about-col-0" : "opacity-0"
          }`}
        >
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 mb-3 sm:mb-4">
            Curiosity keeps me moving.
          </h3>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            As I began my journey into programming, I realized a natural and immediate
            passion for learning. I&apos;m driven by curiosity, finding genuine joy in
            exploring new concepts, and turning that curiosity into building useful
            digital products.
          </p>
        </div>

        {/* Column 2: What I'm focused on */}
        <div
          className={`${
            shouldAnimate ? "animate-about-col-1" : "opacity-0"
          }`}
        >
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 mb-3 sm:mb-4">
            What I&apos;m focused on.
          </h3>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal mb-4">
            I&apos;m specifically focused on modern web development, particularly
            React, Next.js, and TypeScript, along with modern backend technologies.
          </p>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            I have a clear goal of becoming a skilled software engineer who builds
            reliable and meaningful applications.
          </p>
        </div>
      </div>

      {/* Hairline Divider */}
      <div className="border-t border-zinc-200/80 dark:border-zinc-800 my-8 sm:my-12" />

      {/* 3. Education: My Academic Journey */}
      <div id="education" className="py-2 sm:py-4">
        {/* Eyebrow & Main Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <p
            className={`text-xs sm:text-[13px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-2 sm:mb-3 ${
              shouldAnimate ? "animate-about-edu-header" : "opacity-0"
            }`}
          >
            EDUCATION
          </p>

          <h3
            className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 ${
              shouldAnimate ? "animate-about-edu-heading" : "opacity-0"
            }`}
          >
            My Academic Journey
          </h3>
        </div>

        {/* Education Card */}
        <div className="flex justify-center">
          <div
            className={`w-full max-w-[340px] sm:max-w-[370px] bg-white dark:bg-zinc-900/90 rounded-xl border border-zinc-200/80 dark:border-zinc-800 border-l-[4px] border-l-[#23543e] dark:border-l-emerald-500 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 ${
              shouldAnimate ? "animate-about-edu-card" : "opacity-0"
            }`}
          >
            <div>
              <h4 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-50 tracking-tight leading-snug">
                Diploma in Engineering
              </h4>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Electrical Technology
              </p>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                Sirajganj Polytechnic Institute
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2.5">
              <Bookmark className="w-4 h-4 fill-[#23543e] text-[#23543e] dark:fill-emerald-500 dark:text-emerald-500 shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200">
                Currently Studying
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hairline Divider */}
      <div className="border-t border-zinc-200/80 dark:border-zinc-800 my-8 sm:my-12" />

      {/* 4. Bottom Row: 3 Highlights / Taglines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* Highlight 1 */}
        <div
          className={`text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed ${
            shouldAnimate ? "animate-about-tag-0" : "opacity-0"
          }`}
        >
          <span className="font-semibold text-zinc-950 dark:text-zinc-50">
            Beyond code
          </span>{" "}
          — Anime, stories, and creativity.
        </div>

        {/* Highlight 2 */}
        <div
          className={`text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed ${
            shouldAnimate ? "animate-about-tag-1" : "opacity-0"
          }`}
        >
          <span className="font-semibold text-zinc-950 dark:text-zinc-50">
            Always learning
          </span>{" "}
          — Exploring new technologies and ideas.
        </div>

        {/* Highlight 3 */}
        <div
          className={`text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed ${
            shouldAnimate ? "animate-about-tag-2" : "opacity-0"
          }`}
        >
          <span className="font-semibold text-zinc-950 dark:text-zinc-50">
            Building things
          </span>{" "}
          — Turning curiosity into real projects.
        </div>
      </div>

      {/* Hairline Divider */}
      <div className="border-t border-zinc-200/80 dark:border-zinc-800 my-8 sm:my-12" />

      {/* 4. Final Centered Mantra */}
      <div
        className={`text-center pt-2 sm:pt-4 ${
          shouldAnimate ? "animate-about-footer" : "opacity-0"
        }`}
      >
        <p className="text-base sm:text-lg md:text-xl font-medium text-zinc-950 dark:text-zinc-50 tracking-tight">
          Still learning. Still building. Just getting started.
        </p>
      </div>
    </section>
  );
}

