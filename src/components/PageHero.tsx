"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import type { PhotoKey } from "@/content/site";
import { photo } from "@/content/photos";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import s from "./PageHero.module.css";

/**
 * Hero de páginas internas con el mismo lenguaje del inicio: la foto se descubre,
 * el título entra letra por letra y al hacer scroll la foto se encuadra y se acerca.
 */
export function PageHero({
  photoKey,
  title,
  lead,
  caption,
  children,
  next = "#contenido-pagina",
}: {
  photoKey: PhotoKey;
  title: ReactNode;
  lead?: ReactNode;
  caption?: string;
  children?: ReactNode;
  next?: string;
}) {
  const root = useRef<HTMLElement>(null);
  const p = photo(photoKey);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const split = SplitText.create(q("[data-title]")[0], { type: "lines,words", mask: "lines" });
        gsap.set(q("[data-title]"), { visibility: "visible" });
        gsap
          .timeline({ defaults: { ease: "expo.out" }, onComplete: () => split.revert() })
          .fromTo(q("[data-frame]"), { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "expo.inOut" })
          .from(q("[data-img]"), { scale: 1.3, duration: 2.2 }, 0)
          .from(split.words, { yPercent: 115, duration: 1, stagger: 0.045 }, 0.55)
          .from(q("[data-rest] > *"), { y: 28, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.9);

        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } })
          .to(q("[data-frame]"), { clipPath: "inset(6% 4% 6% 4% round 32px)", ease: "none" }, 0)
          .to(q("[data-img]"), { scale: 1.2, yPercent: 10, ease: "none" }, 0)
          .to(q("[data-copy]"), { yPercent: -40, opacity: 0, ease: "none" }, 0);
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.hero}>
      <div className={s.frame} data-frame>
        <div className={s.imgWrap} data-img>
          <Image src={p.src} alt="" fill priority sizes="100vw" className={s.img} />
        </div>
        <div className={s.shade} aria-hidden="true" />
      </div>
      <div className={`container ${s.copy}`} data-copy>
        <h1 className={s.title} data-title>
          {title}
        </h1>
        <div className={s.rest} data-rest>
          {lead && <p className={s.lead}>{lead}</p>}
          {children}
        </div>
      </div>
      <div className={`container ${s.foot}`}>
        {caption && <p className={s.caption}>{caption}</p>}
        <a href={next} className={s.cue} aria-label="Bajar al contenido">
          <ArrowDown size={20} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
