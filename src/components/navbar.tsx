"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon, Menu, X, Download } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [activeItem, setActiveItem] = useState("Home");
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDarkInitial =
      savedTheme === "dark" || (!savedTheme && systemPrefersDark);

    if (isDarkInitial) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    requestAnimationFrame(() => {
      setIsDark(isDarkInitial);
    });
  }, []);

  // Apple-inspired Sticky Navbar scroll detection & scrollspy for active nav item
  useEffect(() => {
    const sections: { id: string; label: string }[] = [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "projects", label: "Projects" },
      { id: "skills", label: "Skills" },
      { id: "contact", label: "Contact" },
    ];

    let ticking = false;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Determine active section based on scroll position
      const scrollPosition = scrollY + 160; // Offset for header & threshold
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i].id);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveItem(sections[i].label);
            break;
          }
        }
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    if (nextTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled || isMobileMenuOpen
          ? "backdrop-blur-md bg-[#FBFBFA]/80 dark:bg-[#0D0D0F]/80 border-b border-zinc-200/60 dark:border-zinc-800/60 shadow-xs shadow-zinc-950/[0.03] dark:shadow-black/20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 h-20 flex items-center justify-between animate-nav-entrance">
        {/* Logo */}
        <Link
          href="#home"
          onClick={() => setActiveItem("Home")}
          className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 transition-opacity hover:opacity-80"
        >
          MOSHIUR.
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-8 lg:gap-10"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeItem === item.label;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActiveItem(item.label)}
                className={`nav-link text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "active text-zinc-950 dark:text-zinc-50 font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle & Download CV CTA */}
        <div className="hidden md:flex items-center gap-4">
          {/* Animated Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative flex items-center justify-center w-9 h-9 rounded-full text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
          >
            {/* Sun Icon */}
            <Sun
              className={`w-[18px] h-[18px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
                isDark
                  ? "rotate-90 scale-0 opacity-0 absolute"
                  : "rotate-0 scale-100 opacity-100"
              }`}
            />
            {/* Moon Icon */}
            <Moon
              className={`w-[18px] h-[18px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
                isDark
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-0 opacity-0 absolute"
              }`}
            />
          </button>

          {/* Download CV Button */}
          <a
            href="/Moshiur_CV.pdf"
            download="Moshiur_CV.pdf"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 bg-transparent hover:border-zinc-900 dark:hover:border-zinc-200 hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            <span>Download CV</span>
          </a>
        </div>

        {/* Mobile Hamburger & Theme Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex items-center justify-center w-9 h-9 rounded-full text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors duration-200"
          >
            {isDark ? (
              <Moon className="w-[18px] h-[18px]" />
            ) : (
              <Sun className="w-[18px] h-[18px]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Subtle Entrance Animation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200/60 dark:border-zinc-800/60 bg-[#FBFBFA] dark:bg-[#0D0D0F] px-6 pt-2 pb-6 animate-mobile-menu">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => {
              const isActive = activeItem === item.label;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setActiveItem(item.label);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`py-2 text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-zinc-950 dark:text-zinc-50 font-semibold"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-2">
              <a
                href="/Moshiur_CV.pdf"
                download="Moshiur_CV.pdf"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:border-zinc-900 dark:hover:border-zinc-200 hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
