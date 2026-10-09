"use client";

import { useRef } from "react";
import { STEPS } from "@/content/site";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import s from "./ProcessStack.module.css";

/**
 * Los cuatro pasos como tarjetas que se apilan: cada una queda fija y la
 * siguiente la cubre mientras la anterior se aleja (escala y oscurece).
 */
export function ProcessStack() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]", root.current);
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card, {
            scale: 0.9,
            filter: "brightness(0.55)",
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 30%", scrub: true },
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-line]", root.current).forEach((line) => {
          gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: line, start: "top 85%", end: "top 45%", scrub: true } });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.process} aria-labelledby="proc-title">
      <div className={`container ${s.grid}`}>
        <header className={s.head}>
          <h2 id="proc-title" className={s.title} data-split>
            De la factura al primer kilovatio, en cuatro pasos.
          </h2>
          <p className="lead">Te acompañamos en todo el camino: nadie tiene que convertirse en ingeniero para pasarse al sol.</p>
        </header>
        <ol className={s.cards}>
          {STEPS.map((st, i) => (
            <li key={st.title} className={s.card} data-card style={{ ["--i" as string]: i }}>
              <span className={`${s.num} num`}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <span className={s.line} data-line aria-hidden="true" />
                <h3 className={s.cardTitle}>{st.title}</h3>
                <p>{st.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
