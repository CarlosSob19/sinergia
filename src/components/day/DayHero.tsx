"use client";

import { useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import s from "./day.module.css";

const PANELS = Array.from({ length: 7 }, (_, i) => i);

/**
 * Amanecer: escena en planos independientes (colinas, horizonte de Montería, titular,
 * techo con paneles, bruma). Al hacer scroll cada plano se desplaza a su propio ritmo:
 * la cámara "baja" hacia el techo mientras el sol sube detrás.
 */
export function DayHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const split = SplitText.create(q("[data-title]")[0], { type: "lines,words", mask: "lines" });
        gsap.set(q("[data-title]"), { visibility: "visible" });

        const intro = gsap.timeline({ defaults: { ease: "expo.out" }, onComplete: () => split.revert() });
        intro
          .from(q("[data-plane=hills]"), { yPercent: 18, duration: 2.4 }, 0)
          .from(q("[data-plane=city]"), { yPercent: 30, duration: 2.2 }, 0.1)
          .from(q("[data-plane=roof]"), { yPercent: 55, duration: 2 }, 0.25)
          .from(split.words, { yPercent: 115, duration: 1.1, stagger: 0.05 }, 0.6)
          .from(q("[data-rest] > *"), { y: 24, opacity: 0, duration: 1, stagger: 0.1 }, 1.1);

        const play = () => intro.play();
        if (document.documentElement.dataset.intro) {
          intro.pause();
          window.addEventListener("sinergia:intro-done", play, { once: true });
        }

        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } })
          .to(q("[data-plane=hills]"), { yPercent: 22, ease: "none" }, 0)
          .to(q("[data-plane=city]"), { yPercent: 10, scale: 1.04, ease: "none" }, 0)
          .to(q("[data-copy]"), { yPercent: -45, opacity: 0, ease: "none" }, 0)
          .to(q("[data-plane=roof]"), { yPercent: -6, scale: 1.12, ease: "none" }, 0)
          .to(q("[data-plane=haze]"), { opacity: 0, ease: "none" }, 0);
        return () => {
          window.removeEventListener("sinergia:intro-done", play);
          split.revert();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="amanecer" data-hour="5.5" data-label="Amanecer" className={s.hero} aria-labelledby="day-title">
      <div className={s.heroStage}>
        {/* Plano 1: colinas lejanas del Sinú */}
        <svg data-plane="hills" className={`${s.plane} ${s.hills}`} viewBox="0 0 1600 400" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 260 C 180 190 300 230 460 200 S 760 150 920 190 S 1240 160 1400 200 S 1560 220 1600 210 V400 H0Z" />
          <path className={s.hillsNear} d="M0 300 C 220 250 380 290 560 270 S 880 240 1060 275 S 1380 250 1600 280 V400 H0Z" />
        </svg>

        {/* Plano 2: horizonte urbano de Montería con árboles */}
        <svg data-plane="city" className={`${s.plane} ${s.city}`} viewBox="0 0 1600 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <g className={s.cityBlocks}>
            <rect x="80" y="250" width="60" height="170" />
            <rect x="150" y="210" width="44" height="210" />
            <rect x="205" y="270" width="70" height="150" />
            <rect x="1080" y="160" width="46" height="260" />
            <rect x="1134" y="120" width="40" height="300" />
            <rect x="1182" y="190" width="58" height="230" />
            <rect x="1250" y="150" width="36" height="270" />
            <rect x="1296" y="230" width="64" height="190" />
            <rect x="1420" y="260" width="50" height="160" />
          </g>
          <g className={s.cityWindows}>
            {[1140, 1146, 1152, 1158, 1164].map((x) => (
              <rect key={x} x={x} y="140" width="3" height="200" />
            ))}
          </g>
          <path
            className={s.trees}
            d="M0 330 q 30 -60 60 0 q 25 -50 55 -5 q 30 -70 70 5 q 40 -55 80 0 q 30 -40 60 0 q 35 -65 75 -5 q 40 -50 85 5 q 30 -45 60 0 q 45 -60 95 0 q 35 -40 70 5 q 30 -55 70 -5 q 40 -45 80 5 q 35 -60 75 0 q 30 -40 60 0 q 40 -55 85 -5 q 30 -50 70 5 q 40 -60 85 0 q 35 -45 70 5 q 30 -50 65 0 q 40 -60 90 0 V420 H0Z"
          />
        </svg>

        {/* Titular entre el horizonte y el techo */}
        <div className={`container ${s.heroCopy}`} data-copy>
          <h1 id="day-title" className={s.heroTitle} data-title>
            Amanece en Montería. <em>Tu techo también lo nota.</em>
          </h1>
          <div className={s.heroRest} data-rest>
            <p className={s.heroLead}>Baja y vive un día de sol: te mostramos cuánta energía produce un techo como el tuyo, hora por hora.</p>
            <a className="btn" data-magnetic href={whatsappUrl(SITE.whatsapp, "Hola Sinergia, quiero una cotización solar.")} target="_blank" rel="noopener noreferrer">
              Cotizar gratis <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Plano 3: techo con paneles (primer plano) */}
        <svg data-plane="roof" className={`${s.plane} ${s.roof}`} viewBox="0 0 1600 360" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <defs>
            <linearGradient id="dh-panel" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#2a6a99" />
              <stop offset="1" stopColor="#0c2742" />
            </linearGradient>
            <linearGradient id="dh-glint" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#ffd59a" stopOpacity="0" />
              <stop offset="0.5" stopColor="#ffe6bd" stopOpacity="0.9" />
              <stop offset="1" stopColor="#ffd59a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className={s.roofSlab} d="M120 360 L360 170 H1240 L1480 360Z" />
          {PANELS.map((i) => (
            <g key={i} transform={`translate(${420 + i * 112} 188) skewX(-24)`}>
              <rect width="100" height="132" rx="4" fill="url(#dh-panel)" stroke="#9fb7c6" strokeWidth="2" />
              <path d="M0 44 H100 M0 88 H100 M50 0 V132" stroke="#5f8aa8" strokeWidth="1.4" />
            </g>
          ))}
          <rect className={s.glint} x="380" y="188" width="840" height="132" fill="url(#dh-glint)" />
        </svg>

        {/* Plano 4: bruma frontal */}
        <div data-plane="haze" className={s.haze} aria-hidden="true" />
      </div>
    </section>
  );
}
