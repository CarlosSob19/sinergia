"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight, Buildings, HouseLine, Plant } from "@phosphor-icons/react/dist/ssr";
import { SOLUTIONS } from "@/content/site";
import { photo } from "@/content/photos";
import { gsap, useGSAP } from "@/lib/gsap";
import s from "./SolutionsRail.module.css";

const ICONS = { hogar: HouseLine, empresas: Buildings, agro: Plant } as const;

/**
 * En escritorio la sección se fija y las tres soluciones pasan de lado mientras
 * se hace scroll vertical, cada foto con su propio parallax. En móvil, lista vertical.
 */
export function SolutionsRail() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current!.querySelector<HTMLElement>("[data-track]")!;
        const distance = () => track.scrollWidth - window.innerWidth;
        const move = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-rail-img]", root.current).forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -12 },
            { xPercent: 12, ease: "none", scrollTrigger: { trigger: img.parentElement, containerAnimation: move, start: "left right", end: "right left", scrub: true } },
          );
        });
        gsap.utils.toArray<HTMLElement>("[data-rail-copy]", root.current).forEach((copy) => {
          gsap.from(copy.children, {
            y: 60,
            opacity: 0,
            stagger: 0.08,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: copy, containerAnimation: move, start: "left 75%" },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.rail} aria-labelledby="sol-title">
      <div className={s.track} data-track>
        <header className={s.intro}>
          <h2 id="sol-title" className={s.title} data-split>
            Un sistema para cada techo.
          </h2>
          <p className="lead">Desde una casa en Montería hasta una finca ganadera sin red eléctrica: diseñamos cada proyecto a la medida de tu consumo.</p>
          <p className={s.hint} aria-hidden="true">
            <span className={s.hintDesk}>Sigue bajando</span>
            <span className={s.hintMob}>Desliza</span> <span className={s.arrow}>→</span>
          </p>
        </header>
        {/* En escritorio este contenedor es transparente (display: contents); en móvil es el carrusel. */}
        <div className={s.cards}>
        {SOLUTIONS.map((sol, i) => {
          const Icon = ICONS[sol.slug];
          const p = photo(sol.photo);
          return (
            <Link key={sol.slug} href={`/soluciones/${sol.slug}`} className={`${s.card} press`}>
              <div className={s.media}>
                <div className={s.imgWrap} data-rail-img>
                  <Image src={p.src} alt="" fill sizes="(max-width: 900px) 100vw, 60vw" className={s.img} />
                </div>
              </div>
              <div className={s.copy} data-rail-copy>
                <span className={`${s.index} num`}>0{i + 1}</span>
                <span className={s.icon}>
                  <Icon size={26} aria-hidden="true" />
                </span>
                <h3 className={s.cardTitle}>{sol.kicker}</h3>
                <p>{sol.lead}</p>
                <span className={s.more}>
                  Ver solución <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </div>
            </Link>
          );
        })}
        </div>
      </div>
    </section>
  );
}
