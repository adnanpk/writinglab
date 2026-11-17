"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Gentle scroll-in reveal. Content is visible by default (no-JS / reduced motion safe). */
export default function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return; // already on screen
    setHidden(true);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setHidden(false); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${hidden ? "translate-y-6 opacity-0" : "translate-y-0 opacity-100"} ${className}`} style={{ transitionDelay: hidden ? "0ms" : `${delay}ms` }}>
      {children}
    </div>
  );
}
