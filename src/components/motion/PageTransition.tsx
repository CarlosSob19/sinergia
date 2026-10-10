"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LogoMark } from "../Logo";
import { gsap, MOTION_OK } from "@/lib/gsap";

/**
 * Cortina entre páginas: al tocar un enlace interno la cortina sube cubriendo
 * la página con el isotipo girando; cuando carga la nueva ruta, se retira hacia arriba.
 * Respeta Ctrl/Cmd-clic, enlaces externos, anclas y movimiento reducido.
 */
export function PageTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const covering = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onClick = (e: MouseEvent) => {
      if (!window.matchMedia(MOTION_OK).matches) return;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return; // anclas y misma página: scroll normal
      e.preventDefault();
      covering.current = true;
      gsap
        .timeline({ onComplete: () => router.push(url.pathname + url.search + url.hash) })
        .set(el, { display: "grid", clipPath: "inset(100% 0 0 0)" })
        .to(el, { clipPath: "inset(0% 0 0 0)", duration: 0.55, ease: "expo.inOut" })
        .fromTo(el.querySelector("svg"), { rotate: -90, scale: 0.6, opacity: 0 }, { rotate: 0, scale: 1, opacity: 1, duration: 0.5, ease: "expo.out" }, "-=0.25");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !covering.current) return;
    covering.current = false;
    window.scrollTo(0, 0);
    gsap
      .timeline()
      .to(el.querySelector("svg"), { rotate: 90, scale: 0.8, opacity: 0, duration: 0.35, ease: "power2.in" }, 0.15)
      .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.7, ease: "expo.inOut" }, 0.25)
      .set(el, { display: "none" });
  }, [pathname]);

  return (
    <div ref={ref} className="page-curtain" aria-hidden="true">
      <LogoMark size={72} />
    </div>
  );
}
