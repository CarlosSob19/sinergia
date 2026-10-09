"use client";

import Image from "next/image";
import { useRef } from "react";
import { photo } from "@/content/photos";
import type { PhotoKey } from "@/content/site";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import s from "./FanStack.module.css";

const KEYS: PhotoKey[] = ["edificio-residencial", "corral-ganadero", "concesionario"];

/** Tres fotos de proyectos apiladas que se abren en abanico mientras se lee el manifiesto. */
export function FanStack() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-fan]", root.current);
        const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 85%", end: "bottom 25%", scrub: 0.8 } });
        cards.forEach((c, i) => {
          const k = i - 1;
          tl.fromTo(c, { rotate: 0, xPercent: 0, yPercent: 12 }, { rotate: k * 9, xPercent: k * 24, yPercent: Math.abs(k) * 4, ease: "none" }, 0);
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={s.stack} aria-hidden="true">
      {KEYS.map((k, i) => {
        const p = photo(k);
        return (
          <div key={k} className={s.card} data-fan style={{ zIndex: i === 1 ? 3 : 1 }}>
            <Image src={p.src} alt="" fill sizes="(max-width: 900px) 70vw, 30vw" />
          </div>
        );
      })}
    </div>
  );
}
