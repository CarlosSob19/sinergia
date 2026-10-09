"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Añade .is-in a cada .reveal cuando su contenedor entra en pantalla (una sola vez).
 * Se observa el contenedor y no el elemento: el elemento arranca recortado con
 * clip-path y IntersectionObserver lo daría por invisible para siempre.
 */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)")];
    const reveal = (group: Element) => group.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
    const groups = [...new Set(els.map((el) => el.parentElement).filter((p): p is HTMLElement => !!p))];
    if (!("IntersectionObserver" in window)) {
      groups.forEach(reveal);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            reveal(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );
    groups.forEach((g) => io.observe(g));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
