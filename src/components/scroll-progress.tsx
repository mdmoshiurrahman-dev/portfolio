"use client";

import React, { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight > 0) {
        const rawProgress = scrollY / docHeight;
        const currentProgress = Math.min(Math.max(rawProgress, 0), 1);
        setProgress(currentProgress);
      } else {
        setProgress(0);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none overflow-hidden"
    >
      <div
        className="h-full w-full bg-zinc-950 dark:bg-zinc-100 origin-left will-change-transform transition-transform duration-75 ease-out shadow-[0_0_8px_rgba(0,0,0,0.12)] dark:shadow-[0_0_8px_rgba(255,255,255,0.35)]"
        style={{
          transform: `scaleX(${progress})`,
        }}
      />
    </div>
  );
}

