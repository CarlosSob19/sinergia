"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Buildings, HouseLine, Phone, Plant, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { PROJECTS, SITE, SOLUTIONS } from "@/content/site";
import { photo } from "@/content/photos";
import { whatsappUrl } from "@/lib/whatsapp";
import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import { SavingsCalculator } from "../SavingsCalculator";
import { LogoMark } from "../Logo";
import s from "./day.module.css";

/* ---------------------------------------------------------------------------
 * Tensión (07:30) · kinetic: dos frases que se arman palabra por palabra con el scroll.
 * ------------------------------------------------------------------------- */
export function DayTension() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const lines = gsap.utils.toArray<HTMLElement>("[data-kline]", root.current);
        const splits = lines.map((l) => SplitText.create(l, { type: "words" }));
        const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 60%", scrub: 0.6 } });
        splits.forEach((sp, i) => {
          tl.from(sp.words, { opacity: 0.08, yPercent: 30, filter: "blur(6px)", stagger: 0.12, ease: "power2.out" }, i * 0.9);
        });
        return () => splits.forEach((sp) => sp.revert());
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <section ref={root} id="manana" data-hour="7.5" data-label="Mañana" className={s.tension} aria-label="El costo de no aprovechar el sol">
      <div className="container">
        <p className={s.kineticA} data-kline>
          Cada mes le pagas la luz a la red.
        </p>
        <p className={s.kineticB} data-kline>
          Mientras tanto, el sol cae gratis <em>en tu techo.</em>
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * Giro (09:00) · reveal: la foto real del río Sinú se abre desde una franja.
 * ------------------------------------------------------------------------- */
export function DayTurn() {
  const root = useRef<HTMLElement>(null);
  const p = photo("bodega-rio-sinu");
  const more = PROJECTS.slice(1, 4);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        gsap
          .timeline({ scrollTrigger: { trigger: q("[data-reveal]")[0], start: "top 85%", end: "center 45%", scrub: 0.6 } })
          .fromTo(q("[data-reveal]"), { clipPath: "inset(42% 30% 42% 30% round 24px)" }, { clipPath: "inset(0% 0% 0% 0% round 24px)", ease: "none" })
          .fromTo(q("[data-reveal] img"), { scale: 1.35 }, { scale: 1, ease: "none" }, 0);
        gsap.from(q("[data-thumb]"), {
          y: 60,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: q("[data-thumbs]")[0], start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <section ref={root} id="media-manana" data-hour="9" data-label="Media mañana" className={s.turn} aria-labelledby="turn-title">
      <div className={`container ${s.turnHead}`}>
        <h2 id="turn-title" className={s.sceneTitle}>
          Tus vecinos ya lo hacen.
        </h2>
        <p className={s.sceneLead}>Bodegas, casas, comercios y fincas de Montería ya producen su propia energía con Sinergia.</p>
      </div>
      <div className={`container ${s.turnMedia}`}>
        <figure className={s.revealFig} data-reveal>
          <Image src={p.src} alt="Bodega junto al río Sinú con paneles solares instalados por Sinergia" fill sizes="(max-width: 1240px) 100vw, 1240px" />
        </figure>
        <p className={s.figCaption}>Proyecto en alianza · Bodega junto al río Sinú, Montería</p>
        <ul className={s.thumbs} data-thumbs>
          {more.map((pr) => {
            const ph = photo(pr.photo);
            return (
              <li key={pr.photo} data-thumb>
                <Image src={ph.src} alt={`${pr.title}: paneles instalados por Sinergia`} fill sizes="(max-width: 700px) 50vw, 25vw" />
                <span>{pr.title}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * Mediodía (pico) · pin + pointer: el panel sigue al sol del día global y la
 * calculadora queda a mano. La sección más larga de la página.
 * ------------------------------------------------------------------------- */
const CELLS = Array.from({ length: 60 }, (_, i) => i);

export function DayNoon() {
  const root = useRef<HTMLElement>(null);
  const tracker = useRef<HTMLDivElement>(null);
  const [hour, setHour] = useState(10.5);

  useEffect(() => {
    const onHour = (e: Event) => {
      const h = (e as CustomEvent<number>).detail;
      setHour(h);
      const t = tracker.current;
      if (!t) return;
      const f = Math.min(1, Math.max(0, (h - 6) / 12));
      t.style.setProperty("--tilt", `${(-52 + 104 * f).toFixed(2)}deg`);
      t.style.setProperty("--glare-x", `${(-60 + 220 * f).toFixed(1)}%`);
      t.style.setProperty("--glare-o", (0.15 + 0.85 * Math.sin(Math.PI * f)).toFixed(3));
      t.style.setProperty("--shadow-x", `${((0.5 - f) * 90).toFixed(1)}px`);
    };
    window.addEventListener("sinergia:hour", onHour);
    return () => window.removeEventListener("sinergia:hour", onHour);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1000px) and (prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.create({ trigger: root.current, start: "top top", end: "+=140%", pin: root.current!.querySelector("[data-pin]") as HTMLElement, pinSpacing: true });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const prod = Math.round((hour <= 6 || hour >= 18 ? 0 : Math.sin((Math.PI * (hour - 6)) / 12)) * 100);
  const line =
    hour < 11.3
      ? "El sol sube y tu techo ya produce más de lo que consume la casa."
      : hour < 12.8
        ? "Mediodía: el panel mira directo al sol. Es la hora de máxima producción."
        : "Pasado el mediodía todavía produces de sobra: el excedente se descuenta de tu factura.";

  return (
    <section ref={root} id="mediodia" data-hour="10.5" data-label="Mediodía" className={s.noon} aria-labelledby="noon-title">
      <div className={s.noonPin} data-pin>
        <div className={`container ${s.noonGrid}`}>
          <div className={s.noonLeft}>
            <h2 id="noon-title" className={s.noonTitle}>
              ¿Cuánto produce tu techo <em>a esta hora?</em>
            </h2>
            <p className={s.noonLine} aria-live="polite">
              {line}
            </p>
            <div className={s.noonMeter}>
              <span className="num">{prod}</span>
              <small>% de producción</small>
            </div>
            <div className={s.tracker} ref={tracker} aria-hidden="true">
              <div className={s.panel3d}>
                <div className={s.cells}>
                  {CELLS.map((c) => (
                    <span key={c} />
                  ))}
                </div>
                <span className={s.glare} />
              </div>
              <span className={s.post} />
              <span className={s.shadow} />
            </div>
          </div>
          <div className={s.noonCalc}>
            <SavingsCalculator />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * Rango (13:30) · pan: las tres soluciones pasan de lado.
 * ------------------------------------------------------------------------- */
const ICONS = { hogar: HouseLine, empresas: Buildings, agro: Plant } as const;

export function DayRange() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current!.querySelector<HTMLElement>("[data-track]")!;
        const dist = () => track.scrollWidth - window.innerWidth + 64;
        gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <section ref={root} id="tarde" data-hour="13.5" data-label="Tarde" className={s.range} aria-labelledby="range-title">
      <div className={s.rangeTrack} data-track>
        <h2 id="range-title" className={s.rangeTitle}>
          El mismo sol, <em>tres maneras</em> de aprovecharlo.
        </h2>
        {SOLUTIONS.map((sol) => {
          const Icon = ICONS[sol.slug];
          const p = photo(sol.photo);
          return (
            <Link key={sol.slug} href={`/soluciones/${sol.slug}`} className={s.rangeCard}>
              <div className={s.rangeImg}>
                <Image src={p.src} alt="" fill sizes="(max-width: 900px) 85vw, 40vw" />
              </div>
              <div className={s.rangeCopy}>
                <span className={s.rangeIcon}>
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h3>{sol.kicker}</h3>
                <p>{sol.lead}</p>
                <span className={s.rangeMore}>
                  Ver solución <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * Noche (cierre) · el sol se oculta detrás del wordmark; el CTA queda solo.
 * ------------------------------------------------------------------------- */
export function DayNight() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: "top 85%", end: "top 15%", scrub: 0.8 } })
          .fromTo(q("[data-setting-sun]"), { yPercent: -120 }, { yPercent: 40, ease: "none" }, 0)
          .from(q("[data-word] span"), { yPercent: 40, opacity: 0, stagger: 0.04, ease: "none" }, 0.1)
          .from(q("[data-close] > *"), { y: 40, opacity: 0, stagger: 0.08, ease: "none" }, 0.45);
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <section ref={root} id="noche" data-hour="18.4" data-label="Noche" className={s.night} aria-labelledby="night-title">
      <div className={s.nightScene} aria-hidden="true">
        <span className={s.settingSun} data-setting-sun />
        <p className={s.nightWord} data-word>
          {"Sinergia".split("").map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </p>
        <span className={s.nightHorizon} />
      </div>
      <div className={`container ${s.nightClose}`} data-close>
        <LogoMark size={44} className={s.nightMark} />
        <h2 id="night-title" className={s.nightTitle}>
          Mañana vuelve a salir el sol. Que tu techo esté listo.
        </h2>
        <div className={s.nightCtas}>
          <a className="btn" data-magnetic href={whatsappUrl(SITE.whatsapp, "Hola Sinergia, quiero una cotización solar.")} target="_blank" rel="noopener noreferrer">
            <WhatsappLogo size={20} weight="fill" aria-hidden="true" /> Cotizar gratis
          </a>
          <a className={`btn btn--ghost ${s.ghostLight}`} href={`tel:${SITE.phones[0].replace(/\s/g, "")}`}>
            <Phone size={18} weight="fill" aria-hidden="true" /> Llamar a un asesor
          </a>
        </div>
      </div>
    </section>
  );
}
