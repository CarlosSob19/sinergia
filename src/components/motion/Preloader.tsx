"use client";

import { useRef, useState } from "react";
import { LogoMark } from "../Logo";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Entrada de marca, solo la primera vez por sesión: los cinco pétalos del
 * isotipo giran hasta encajar y la cortina sube descubriendo el sitio.
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      // El script del <head> ya decidió si mostrar la intro (data-intro) antes de pintar.
      const seen = document.documentElement.dataset.intro !== "pending";
      try {
        sessionStorage.setItem("sinergia-intro", "1");
      } catch {}
      if (seen || !window.matchMedia(MOTION_OK).matches) {
        delete document.documentElement.dataset.intro;
        setDone(true);
        return;
      }
      const petals = el.querySelectorAll("path");
      const tl = gsap.timeline({
        onComplete: () => {
          delete document.documentElement.dataset.intro;
          window.dispatchEvent(new Event("sinergia:intro-done"));
          setDone(true);
        },
      });
      tl.from(petals, {
        rotate: -140,
        scale: 0.2,
        opacity: 0,
        svgOrigin: "545 490",
        duration: 1,
        ease: "expo.out",
        stagger: 0.07,
      })
        .from(el.querySelector("[data-word]"), { yPercent: 120, duration: 0.8, ease: "expo.out" }, "-=0.7")
        .to(el.querySelector("[data-bar]"), { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, "-=0.6")
        .to(el.querySelector("[data-inner]"), { y: -40, opacity: 0, duration: 0.45, ease: "power2.in" }, "+=0.05")
        .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "expo.inOut" }, "-=0.2");
    },
    { scope: ref },
  );

  if (done) return null;
  return (
    <div ref={ref} className="preloader" aria-hidden="true">
      <div data-inner className="preloader__inner">
        <LogoMark size={96} />
        <span className="preloader__word">
          <span data-word>Sinergia</span>
        </span>
        <span data-bar className="preloader__bar" />
      </div>
    </div>
  );
}
