"use client";

import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Sistema de movimiento declarativo para toda la página:
 *  - [data-split]     títulos que suben línea por línea detrás de una máscara.
 *  - [data-parallax]  imágenes que se desplazan más lento que el scroll.
 *  - [data-stagger]   hijos que entran en cascada cuando el grupo aparece.
 *  - [data-count]     números que cuentan hasta su valor una vez.
 *  - [data-rise]      bloque que emerge desde abajo ligado al scroll.
 * Sin movimiento reducido no se toca nada: el contenido ya está visible.
 */
export function MotionDirector() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const splits: SplitText[] = [];

        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
          splits.push(split);
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            // Sin máscaras al terminar: nada queda recortado si cambia el ancho de la ventana.
            onComplete: () => split.revert(),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((wrap) => {
          const target = wrap.querySelector("img") ?? wrap;
          const amount = Number(wrap.dataset.parallax || 12);
          gsap.fromTo(
            target,
            { yPercent: -amount, scale: 1 + amount / 50 },
            {
              yPercent: amount,
              ease: "none",
              scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
          gsap.from(group.children, {
            y: 48,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count);
          const decimals = Number(el.dataset.decimals || 0);
          const state = { v: 0 };
          const fmt = (n: number) => n.toLocaleString("es-CO", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
          gsap.to(state, {
            v: end,
            duration: 2.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            onUpdate: () => {
              el.textContent = fmt(state.v);
            },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: 45, opacity: 0.2 },
            { yPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: true } },
          );
        });

        ScrollTrigger.refresh();
        return () => splits.forEach((s) => s.revert());
      });
      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
