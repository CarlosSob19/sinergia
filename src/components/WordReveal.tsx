"use client";

import { useEffect, useRef } from "react";
import styles from "./WordReveal.module.css";

/**
 * Frase que se "enciende" palabra por palabra mientras se hace scroll.
 * El texto completo existe en el DOM desde el inicio (accesible y legible sin JS).
 */
export function WordReveal({ text, highlight = [] }: { text: string; highlight?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el?.style.setProperty("--p", "1");
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.45)));
      el.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const words = text.split(" ");
  return (
    <p ref={ref} className={styles.text} style={{ ["--n" as string]: words.length }}>
      {words.map((w, i) => (
        <span key={i} className={highlight.includes(w.replace(/[.,]/g, "")) ? styles.hl : undefined} style={{ ["--i" as string]: i }}>
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
