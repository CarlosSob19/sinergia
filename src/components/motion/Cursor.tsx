"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Halo de sol que sigue al puntero y botones magnéticos ([data-magnetic]).
 * Solo con mouse/trackpad y sin movimiento reducido. El cursor nativo se conserva.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ok = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!ok.matches) return;

    el.style.display = "block";
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const t = e.target as Element | null;
      const hot = t?.closest("a, button, [data-magnetic], summary, label");
      el.dataset.hot = hot ? "true" : "false";

      const mag = t?.closest<HTMLElement>("[data-magnetic]");
      if (mag) {
        const r = mag.getBoundingClientRect();
        gsap.to(mag, {
          x: (e.clientX - (r.left + r.width / 2)) * 0.3,
          y: (e.clientY - (r.top + r.height / 2)) * 0.4,
          duration: 0.5,
          ease: "power3.out",
        });
      }
    };
    const onLeave = (e: PointerEvent) => {
      const mag = (e.target as Element | null)?.closest?.("[data-magnetic]");
      if (mag) gsap.to(mag, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
    };
    const onOut = () => gsap.to(el, { opacity: 0, duration: 0.3 });
    const onIn = () => gsap.to(el, { opacity: 1, duration: 0.3 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onLeave, true);
    document.documentElement.addEventListener("pointerleave", onOut);
    document.documentElement.addEventListener("pointerenter", onIn);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onLeave, true);
      document.documentElement.removeEventListener("pointerleave", onOut);
      document.documentElement.removeEventListener("pointerenter", onIn);
    };
  }, []);

  return <div ref={ref} className="sun-cursor" aria-hidden="true" />;
}
