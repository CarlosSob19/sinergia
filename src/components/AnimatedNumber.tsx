"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Número que se desliza al nuevo valor (estado). Interrumpible: cada cambio
 * retoma desde el valor mostrado. Con movimiento reducido cambia al instante.
 */
export function AnimatedNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      shown.current = value;
      el.textContent = format(value);
      return;
    }
    const state = { v: shown.current };
    const tween = gsap.to(state, {
      v: value,
      duration: 0.7,
      ease: "power3.out",
      onUpdate: () => {
        shown.current = state.v;
        el.textContent = format(state.v);
      },
    });
    return () => {
      tween.kill();
    };
  }, [value, format]);

  return <span ref={ref}>{format(value)}</span>;
}
