"use client";

import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  a: number;
}

/**
 * Lightweight canvas particle field — slow-drifting glowing dots.
 * Density scales with viewport; disabled entirely for reduced motion.
 */
export function Particles({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = false;
    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // theme-aware dot color; kept in sync when data-theme flips
    let rgb = "23, 232, 143";
    const readTheme = () => {
      rgb =
        document.documentElement.dataset.theme === "light"
          ? "10, 143, 92"
          : "23, 232, 143";
    };
    readTheme();
    const themeObserver = new MutationObserver(readTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const seed = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = width < 768 ? 26 : 64;
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.6 + Math.random() * 1.6,
        vy: -(0.08 + Math.random() * 0.22),
        vx: (Math.random() - 0.5) * 0.08,
        a: 0.12 + Math.random() * 0.45,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const d of dots) {
        d.y += d.vy;
        d.x += d.vx;
        if (d.y < -8) {
          d.y = height + 8;
          d.x = Math.random() * width;
        }
        if (d.x < -8) d.x = width + 8;
        if (d.x > width + 8) d.x = -8;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${d.a})`;
        ctx.fill();
      }
      if (running) raf = requestAnimationFrame(draw);
    };

    seed();

    // Only animate while the canvas is actually on screen and the tab is
    // visible. Left unchecked this rAF loop runs for the life of the page —
    // invisible work that keeps a phone's CPU awake and drains battery.
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (canvas.getBoundingClientRect().bottom > 0) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => seed();
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}
