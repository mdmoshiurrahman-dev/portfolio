"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import {
  ArrowRight,
  ExternalLink,
  FolderUser,
  ServerNas,
  Star,
} from "lucide-react";

interface Project {
  title: string;
  isFeatured?: boolean;
  description: string;
  imageSrc: string;
  githubUrl: string;
  backendUrl?: string;
  liveUrl: string;
}

const projects: Project[] = [
  {
    title: "SocialServe",
    isFeatured: true,
    description:
      "A community event platform where people can discover, join, and manage events.",
    imageSrc: "/projects/socialserve.png",
    githubUrl: "https://github.com/mdmoshiurrahman-dev/ASSIGNMENT-9-FRONT-END",
    backendUrl: "https://github.com/mdmoshiurrahman-dev/ASSIGNMENT-9-BACK-END",
    liveUrl: "https://social-serve-phi.vercel.app/",
  },
  {
    title: "Wanderlast",
    isFeatured: false,
    description:
      "A travel booking application with secure bookings and personalized user experience.",
    imageSrc: "/projects/wanderlast.png",
    githubUrl: "https://github.com/mdmoshiurrahman-dev/wander-last-front-end",
    backendUrl: "https://github.com/mdmoshiurrahman-dev/wander-last-back-end",
    liveUrl: "https://wander-last-front-end.vercel.app/",
  },
  {
    title: "Bazar Dor",
    isFeatured: false,
    description:
      "A dynamic marketplace for buying and selling products in Bangladesh.",
    imageSrc: "/projects/bazar-dor.png",
    githubUrl: "https://github.com/mdmoshiurrahman-dev/ASSIGNMENT-7",
    backendUrl: "",
    liveUrl: "https://bazar-dor-eosin.vercel.app/",
  },
];

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

const emptySubscribe = () => () => {};

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const prefersReducedMotion = useSyncExternalStore(
    (notify) => {
      if (typeof window === "undefined") return () => {};
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      mql.addEventListener("change", notify);
      return () => mql.removeEventListener("change", notify);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);

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
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Restrained subtle parallax on project card visual mockups
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // Only update when section is in or near viewport
            if (rect.top < windowHeight && rect.bottom > 0) {
              const centerOffset =
                rect.top + rect.height / 2 - windowHeight / 2;
              // Very subtle shift, clamped between -10px and 10px
              const offset = Math.round(
                Math.max(-10, Math.min(10, -centerOffset * 0.025)),
              );
              setParallaxOffset(offset);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prefersReducedMotion]);

  const shouldAnimate = isMounted && (prefersReducedMotion || isVisible);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full max-w-6xl mx-auto px-6 sm:px-8 md:px-12 py-16 sm:py-24"
    >
      {/* Header Row: Badge, Title, Description on Left; "View All Projects ->" on Right */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div>
          {/* Badge: MY WORK */}
          <div
            className={`inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 px-3.5 py-1 text-xs font-semibold tracking-wider text-zinc-600 dark:text-zinc-400 mb-4 uppercase shadow-2xs ${
              shouldAnimate ? "animate-project-reveal-badge" : "opacity-0"
            }`}
          >
            MY WORK
          </div>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.15] mb-3 ${
              shouldAnimate ? "animate-project-reveal-heading" : "opacity-0"
            }`}
          >
            Featured Projects.
          </h2>

          <p
            className={`text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal leading-relaxed ${
              shouldAnimate ? "animate-project-reveal-desc" : "opacity-0"
            }`}
          >
            A selection of my recent projects that showcase my skills and
            passion for development.
          </p>
        </div>

        <div
          className={`pt-1 md:pt-0 shrink-0 ${
            shouldAnimate ? "animate-project-reveal-link" : "opacity-0"
          }`}
        >
          <a
            href="#projects"
            className="group/link inline-flex items-center gap-1.5 text-sm sm:text-base font-medium text-zinc-950 dark:text-zinc-50 border-b border-zinc-950 dark:border-zinc-50 pb-0.5 hover:text-zinc-600 dark:hover:text-zinc-300 hover:border-zinc-600 dark:hover:border-zinc-300 transition-colors"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 ml-0.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
          </a>
        </div>
      </div>

      {/* 3 Project Cards Grid: Staggered Fade-Up with Restrained Mockup Parallax */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {projects.map((project, index) => {
          const cardAnimationClass = shouldAnimate
            ? index === 0
              ? "animate-project-card-0"
              : index === 1
                ? "animate-project-card-1"
                : "animate-project-card-2"
            : "opacity-0";

          return (
            <div
              key={project.title}
              className={`group rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-[#161619] p-4 sm:p-5 flex flex-col justify-between shadow-2xs transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg hover:shadow-zinc-950/5 dark:hover:shadow-black/40 ${cardAnimationClass}`}
            >
              <div>
                {/* Top Screenshot Mockup Container with Subtle Parallax Depth and Hover Zoom */}
                <div className="relative w-full aspect-[278/191] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-800 mb-5">
                  <div
                    className="relative w-full h-[106%] -top-[3%] transition-transform duration-100 ease-out will-change-transform"
                    style={{
                      transform: parallaxOffset
                        ? `translate3d(0, ${parallaxOffset}px, 0)`
                        : undefined,
                    }}
                  >
                    <Image
                      src={project.imageSrc}
                      alt={`${project.title} preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                      priority
                    />
                  </div>
                </div>

                {/* Title & Badge */}
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="text-xl sm:text-[22px] font-bold tracking-tight text-zinc-950 dark:text-zinc-50 transition-colors duration-200 group-hover:text-zinc-900 dark:group-hover:text-white">
                    {project.title}
                  </h3>
                  {project.isFeatured && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 shadow-2xs">
                      <Star className="w-3 h-3 fill-zinc-900 dark:fill-zinc-100 text-zinc-900 dark:text-zinc-100" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5 min-h-[42px]">
                  {project.description}
                </p>
              </div>

              {/* Bottom Actions Row */}
              <div>
                {/* Hairline Divider */}
                <div className="border-t border-zinc-100 dark:border-zinc-800/80 mb-4" />

                <div className="flex items-center justify-around px-1">
                  <a
                    href={project.githubUrl}
                    className="group/btn inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white px-2.5 py-1.5 -mx-2.5 -my-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all duration-200"
                  >
                    <FolderUser className="inline size-4" />
                    <span>Client</span>
                  </a>

                  {project.backendUrl && (
                    <a
                      href={project.githubUrl}
                      className="group/btn inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white px-2.5 py-1.5 -mx-2.5 -my-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all duration-200"
                    >
                      <ServerNas className="inline size-4" />
                      <span>Backend</span>
                    </a>
                  )}
                  <a
                    href={project.liveUrl}
                    className="group/demo inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white px-2.5 py-1.5 -mx-2.5 -my-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all duration-200"
                  >
                    <ExternalLink className="w-4 h-4 stroke-[2] transition-transform duration-200 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
