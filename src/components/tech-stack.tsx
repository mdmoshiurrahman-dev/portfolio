"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";

interface Technology {
  name: string;
  icon: React.ReactNode;
}

interface TechCategory {
  title: string;
  description: string;
  skills: Technology[];
}

const emptySubscribe = () => () => {};

export function TechStack() {
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
            observer.disconnect(); // Animate only once
          }
        });
      },
      {
        threshold: 0.15,
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

  const categories: TechCategory[] = [
    {
      title: "Frontend Development",
      description: "Creating modern, responsive user interfaces.",
      skills: [
        {
          name: "HTML5",
          icon: (
            <svg
              viewBox="0 0 100 115"
              className="w-9 h-10 object-contain drop-shadow-xs"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* HTML Top Banner */}
              <text
                x="50"
                y="14"
                textAnchor="middle"
                fill="#1E1E1E"
                className="dark:fill-zinc-300 font-extrabold text-[15px] tracking-tight"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                HTML
              </text>
              {/* Shield Base */}
              <path
                d="M10 22L17.5 106L50 115L82.5 106L90 22H10Z"
                fill="#E44D26"
              />
              <path
                d="M50 29.5V107.5L75.5 100.5L81.5 29.5H50Z"
                fill="#F16529"
              />
              {/* White 5 shape */}
              <path
                d="M50 45.5H27L28 58H50V45.5ZM50 71H38.5L37.5 59H25L27 82H50V71ZM50 96.5L39.5 93.5L39 86H26.5L27.5 99.5L50 106V96.5Z"
                fill="#EBEBEB"
              />
              <path
                d="M50 45.5H73L71 68.5H50V56.5H59L59.5 54H50V45.5ZM50 71H60.5L59.5 83.5L50 86V96.5L72 90.5L73 68.5L73.5 59.5H50V71Z"
                fill="#FFFFFF"
              />
            </svg>
          ),
        },
        {
          name: "CSS3",
          icon: (
            <svg
              viewBox="0 0 100 115"
              className="w-9 h-10 object-contain drop-shadow-xs"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* CSS Top Banner */}
              <text
                x="50"
                y="14"
                textAnchor="middle"
                fill="#1E1E1E"
                className="dark:fill-zinc-300 font-extrabold text-[15px] tracking-tight"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                CSS
              </text>
              {/* Shield Base */}
              <path
                d="M10 22L17.5 106L50 115L82.5 106L90 22H10Z"
                fill="#1572B6"
              />
              <path
                d="M50 29.5V107.5L75.5 100.5L81.5 29.5H50Z"
                fill="#33A9DC"
              />
              {/* White 3 shape */}
              <path
                d="M50 45.5H27L28 58H50V45.5ZM50 71H38.5L37.5 59H25L27 82H50V71ZM50 96.5L39.5 93.5L39 86H26.5L27.5 99.5L50 106V96.5Z"
                fill="#EBEBEB"
              />
              <path
                d="M50 45.5H73L72.5 58H50V71H60.5L59.5 83.5L50 86V96.5L72 90.5L73.5 45.5H50V45.5Z"
                fill="#FFFFFF"
              />
            </svg>
          ),
        },
        {
          name: "JavaScript",
          icon: (
            <div className="w-10 h-10 rounded-md bg-[#F7DF1E] flex items-end justify-end p-1 shadow-xs">
              <span className="font-extrabold text-black text-sm tracking-tighter leading-none pr-0.5 pb-0.5">
                JS
              </span>
            </div>
          ),
        },
        {
          name: "TypeScript",
          icon: (
            <div className="w-10 h-10 rounded-md bg-[#3178C6] flex items-end justify-end p-1 shadow-xs">
              <span className="font-extrabold text-white text-sm tracking-tighter leading-none pr-0.5 pb-0.5">
                TS
              </span>
            </div>
          ),
        },
        {
          name: "React",
          icon: (
            <svg
              viewBox="-11.5 -10.23174 23 20.46348"
              className="w-10 h-10 object-contain drop-shadow-xs"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
              <g stroke="#61DAFB" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
              </g>
            </svg>
          ),
        },
        {
          name: "Next.js",
          icon: (
            <div className="h-10 flex items-center justify-center">
              <svg
                viewBox="0 0 140 34"
                className="h-6 w-auto text-black dark:text-white"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* NEXT.js typography with official N stylized glyph */}
                <path d="M14.9 2.5L2.8 19.5h5.5l9.3-13.1V31.5h4.3V2.5h-4.7z" />
                <path d="M28.4 2.5h16.2v4.1H32.7v7.9h10.4v4.1H32.7v8.8h12.3v4.1H28.4V2.5z" />
                <path d="M47.2 2.5h5l7 10.8 7-10.8h5l-9.5 14.5 9.8 14.5h-5.2l-7.1-11-7.1 11h-5.1l9.6-14.5-9.4-14.5z" />
                <path d="M80.2 6.6H70.7V2.5h23.3v4.1H84.5v24.9h-4.3V6.6z" />
                <circle cx="98.5" cy="28.5" r="2.8" />
                <path d="M109.8 2.5h4.2v20.5c0 3.8-2.1 5.9-6.3 5.9-1.5 0-2.8-.2-3.8-.5v-3.7c.9.3 1.9.4 2.8.4 1.8 0 3.1-.9 3.1-2.9V2.5z" />
                <path d="M125.4 22.8c1.3.9 2.9 1.4 4.5 1.4 1.5 0 2.4-.6 2.4-1.6 0-2.6-9.1-1.3-9.1-8.5 0-3.3 2.6-5.8 6.7-5.8 1.8 0 3.6.5 4.8 1.4l-1.4 3.1c-1.1-.7-2.3-1.1-3.6-1.1-1.6 0-2.3.7-2.3 1.5 0 2.5 9.1 1.2 9.1 8.4 0 3.6-2.8 6-7.2 6-2 0-4.1-.6-5.5-1.6l1.6-3.2z" />
              </svg>
            </div>
          ),
        },
        {
          name: "Tailwind CSS",
          icon: (
            <svg
              viewBox="0 0 54 33"
              className="w-11 h-8 object-contain"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
                fill="#06B6D4"
              />
            </svg>
          ),
        },
      ],
    },
    {
      title: "Backend Development",
      description: "Building scalable server-side applications.",
      skills: [
        {
          name: "Node.js",
          icon: (
            <svg
              viewBox="0 0 100 36"
              className="h-8 w-auto object-contain"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Stylized Node.js text mark with green hex */}
              <text
                x="4"
                y="27"
                fill="#539E43"
                className="font-bold text-[24px]"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                node
              </text>
              <path
                d="M74 8L86 1L98 8V22L86 29L74 22V8Z"
                fill="#539E43"
              />
              <path
                d="M86 6L94 11V20L86 25L78 20V11L86 6Z"
                fill="#333333"
                className="dark:fill-[#161619]"
              />
              <path
                d="M86 9L91 12V18L86 21L81 18V12L86 9Z"
                fill="#539E43"
              />
            </svg>
          ),
        },
        {
          name: "Express.js",
          icon: (
            <div className="h-9 flex items-center justify-center px-1">
              <span className="font-sans font-light tracking-tight text-[19px] text-zinc-500 dark:text-zinc-400">
                Express
              </span>
            </div>
          ),
        },
        {
          name: "REST APIs",
          icon: (
            <div className="h-9 flex items-center justify-center px-1">
              <span className="font-sans font-extrabold tracking-normal text-[17px] text-zinc-800 dark:text-zinc-200">
                REST
              </span>
            </div>
          ),
        },
        {
          name: "Better Auth",
          icon: (
            <div className="w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center shadow-xs">
              <span className="text-white dark:text-black font-bold text-xs tracking-tight">
                BA
              </span>
            </div>
          ),
        },
        {
          name: "JWT",
          icon: (
            <svg
              viewBox="0 0 100 100"
              className="w-9 h-9 object-contain"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* JWT Multi-colored Starburst / Asterisk */}
              <g strokeWidth="9" strokeLinecap="round">
                <line x1="50" y1="12" x2="50" y2="35" stroke="#FB015B" />
                <line x1="77" y1="23" x2="61" y2="39" stroke="#D63AFF" />
                <line x1="88" y1="50" x2="65" y2="50" stroke="#00B9F1" />
                <line x1="77" y1="77" x2="61" y2="61" stroke="#00F9FF" />
                <line x1="50" y1="88" x2="50" y2="65" stroke="#FB015B" />
                <line x1="23" y1="77" x2="39" y2="61" stroke="#D63AFF" />
                <line x1="12" y1="50" x2="35" y2="50" stroke="#00B9F1" />
                <line x1="23" y1="23" x2="39" y2="39" stroke="#00F9FF" />
              </g>
              <circle cx="50" cy="50" r="5" fill="#1E1E1E" className="dark:fill-white" />
            </svg>
          ),
        },
      ],
    },
    {
      title: "Database",
      description: "Managing and storing data efficiently.",
      skills: [
        {
          name: "MongoDB",
          icon: (
            <svg
              viewBox="0 0 40 80"
              className="w-6 h-10 object-contain drop-shadow-xs"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* MongoDB Green Leaf */}
              <path
                d="M20 0C18 3 8 20 8 38C8 56 18 72 20 80C22 72 32 56 32 38C32 20 22 3 20 0Z"
                fill="#13AA52"
              />
              {/* Darker green right half */}
              <path
                d="M20 0V80C22 72 32 56 32 38C32 20 22 3 20 0Z"
                fill="#116149"
              />
              {/* Center stem fold line */}
              <path
                d="M20 10V74"
                stroke="#A6E5A2"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          ),
        },
      ],
    },
    {
      title: "Development Tools",
      description: "Tools for modern development workflows.",
      skills: [
        {
          name: "Git",
          icon: (
            <svg
              viewBox="0 0 100 100"
              className="w-10 h-10 object-contain drop-shadow-xs"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Tilted diamond */}
              <rect
                x="50"
                y="5"
                width="64"
                height="64"
                rx="10"
                transform="rotate(45 50 5)"
                fill="#F05032"
              />
              {/* Branch lines and commit nodes */}
              <path
                d="M50 32V68"
                stroke="#FFFFFF"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M50 52L68 34"
                stroke="#FFFFFF"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <circle cx="50" cy="32" r="7" fill="#FFFFFF" />
              <circle cx="50" cy="68" r="7" fill="#FFFFFF" />
              <circle cx="68" cy="34" r="7" fill="#FFFFFF" />
            </svg>
          ),
        },
        {
          name: "GitHub",
          icon: (
            <svg
              viewBox="0 0 24 24"
              className="w-9 h-9 text-zinc-950 dark:text-zinc-50"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          ),
        },
        {
          name: "VS Code",
          icon: (
            <svg
              viewBox="0 0 100 100"
              className="w-9 h-9 object-contain drop-shadow-xs"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* VS Code origami ribbon */}
              <path
                d="M72 96L94 85V15L72 4L32 38L16 26L4 33V67L16 74L32 62L72 96Z"
                fill="#0065A9"
              />
              <path
                d="M72 4L32 38L72 70V4Z"
                fill="#007ACC"
              />
              <path
                d="M72 96L32 62L72 30V96Z"
                fill="#1F9CF0"
              />
              <path
                d="M94 15V85L72 70V30L94 15Z"
                fill="#1F9CF0"
              />
              <path
                d="M16 26L4 33V67L16 74L36 50L16 26Z"
                fill="#0065A9"
              />
            </svg>
          ),
        },
        {
          name: "Linux",
          icon: (
            <svg
              viewBox="0 0 100 100"
              className="w-9 h-9 object-contain"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Tux Penguin */}
              {/* Body */}
              <ellipse cx="50" cy="56" rx="28" ry="34" fill="#1A1A1A" />
              {/* Head */}
              <ellipse cx="50" cy="30" rx="19" ry="20" fill="#1A1A1A" />
              {/* White Belly */}
              <ellipse cx="50" cy="62" rx="19" ry="26" fill="#FFFFFF" />
              {/* Eyes */}
              <ellipse cx="44" cy="27" rx="3.5" ry="5.5" fill="#FFFFFF" />
              <ellipse cx="56" cy="27" rx="3.5" ry="5.5" fill="#FFFFFF" />
              <circle cx="45" cy="27" r="2" fill="#000000" />
              <circle cx="55" cy="27" r="2" fill="#000000" />
              {/* Beak */}
              <path
                d="M42 34C42 34 50 39 58 34C58 34 54 44 42 34Z"
                fill="#FFA500"
              />
              {/* Feet */}
              <ellipse cx="35" cy="88" rx="14" ry="6" fill="#FFA500" />
              <ellipse cx="65" cy="88" rx="14" ry="6" fill="#FFA500" />
              {/* Wings / Flippers */}
              <ellipse
                cx="21"
                cy="58"
                rx="6"
                ry="17"
                transform="rotate(22 21 58)"
                fill="#1A1A1A"
              />
              <ellipse
                cx="79"
                cy="58"
                rx="6"
                ry="17"
                transform="rotate(-22 79 58)"
                fill="#1A1A1A"
              />
            </svg>
          ),
        },
        {
          name: "Vercel",
          icon: (
            <svg
              viewBox="0 0 100 86.6"
              className="w-8 h-8 text-black dark:text-white"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="50,0 100,86.6 0,86.6" />
            </svg>
          ),
        },
      ],
    },
  ];

  // Helper to determine animation readiness
  const shouldAnimate = isMounted && (prefersReducedMotion || isVisible);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full max-w-6xl mx-auto px-6 sm:px-8 md:px-12 py-16 sm:py-24"
    >
      {/* 1. Scroll Reveal: Section Heading & Description */}
      <div className="mb-12 sm:mb-16">
        <p
          className={`text-xs sm:text-[13px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-3 ${
            shouldAnimate ? "animate-tech-reveal-label" : "opacity-0"
          }`}
        >
          MY TOOLKIT
        </p>

        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.15] mb-4 ${
            shouldAnimate ? "animate-tech-reveal-heading" : "opacity-0"
          }`}
        >
          Technologies I work with.
        </h2>

        <p
          className={`text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal leading-relaxed ${
            shouldAnimate ? "animate-tech-reveal-desc" : "opacity-0"
          }`}
        >
          A collection of technologies and tools I use to build modern web
          applications and turn ideas into reality.
        </p>
      </div>

      {/* 2. Technology Card Grid: Staggered Fade-Up with Subtle Elevation on Hover */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
        {categories.map((category, index) => {
          const cardAnimationClass = shouldAnimate
            ? index === 0
              ? "animate-tech-card-0"
              : index === 1
              ? "animate-tech-card-1"
              : index === 2
              ? "animate-tech-card-2"
              : "animate-tech-card-3"
            : "opacity-0";

          return (
            <div
              key={category.title}
              className={`rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-[#161619] p-6 sm:p-8 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[3px] hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-[#FFFFFF] dark:hover:bg-[#19191D] hover:shadow-md hover:shadow-zinc-950/4 dark:hover:shadow-black/30 ${cardAnimationClass}`}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-zinc-950 dark:text-zinc-50 tracking-tight">
                {category.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 mb-8">
                {category.description}
              </p>

              {/* 3. Technology Logos: Horizontal wrap, recognizable brand colors, subtle hover scale <= 1.04 */}
              <div className="flex flex-wrap items-end gap-x-5 sm:gap-x-7 gap-y-5">
                {category.skills.map((tech) => (
                  <div
                    key={tech.name}
                    className="group/tech flex flex-col items-center justify-end gap-2 cursor-default select-none p-2 sm:p-2.5 rounded-xl transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50"
                  >
                    <div className="h-10 flex items-center justify-center transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tech:scale-[1.04]">
                      {tech.icon}
                    </div>
                    <span className="text-xs sm:text-[13px] font-medium text-zinc-700 dark:text-zinc-300 tracking-tight text-center transition-colors duration-200 group-hover/tech:text-zinc-950 dark:group-hover/tech:text-zinc-50">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

