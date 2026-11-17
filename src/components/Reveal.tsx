"use client";
import { createElement, useEffect, useRef, useState, type ReactNode } from "react";

/** Smooth scroll-in reveal (fade + rise). Visible by default for no-JS and reduced-motion visitors. */
export default function Reveal({ children, className = "", delay = 0, as = "div" }: { children: ReactNode; className?: string; delay?: number; as?: "div" | "li" | "section" }) {
  const ref = useRef<HTMLElement | null>(null);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return; // already on screen
    setHidden(true);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setHidden(false); io.disconnect(); } }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return createElement(as, {
    ref: (n: HTMLElement | null) => { ref.current = n; },
    className: `transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(.22,1,.36,1)] will-change-transform ${hidden ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100"} ${className}`,
    style: { transitionDelay: hidden ? "0ms" : `${delay}ms` },
  }, children);
}
