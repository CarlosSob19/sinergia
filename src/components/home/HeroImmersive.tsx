"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowDown, ArrowRight, Certificate, Receipt, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/content/site";
import { photo } from "@/content/photos";
import { whatsappUrl } from "@/lib/whatsapp";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import s from "./HeroImmersive.module.css";

/**
 * Hero: la foto se descubre, una franja de sol barre los paneles y el titular
 * entra letra por letra. Al hacer scroll la foto se encuadra en una ventana,
 * se acerca al techo y el texto se va con parallax.
 */
export function HeroImmersive() {
  const root = useRef<HTMLElement>(null);
  const hero = photo("bodega-rio-sinu");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const split = SplitText.create(q("[data-title]")[0], { type: "lines,chars", mask: "lines" });
        gsap.set(q("[data-title]"), { visibility: "visible" });

        const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        intro
          .fromTo(q("[data-frame]"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "expo.inOut" })
          .from(q("[data-img]"), { scale: 1.35, duration: 2.6, ease: "expo.out" }, 0)
          .fromTo(q("[data-sun]"), { xPercent: -100, opacity: 1 }, { xPercent: 100, duration: 1.8, ease: "power2.inOut" }, 0.5)
          .to(q("[data-sun]"), { opacity: 0, duration: 0.3 }, ">-0.3")
          .from(split.chars, { yPercent: 115, rotate: 8, duration: 1.1, stagger: 0.022 }, 0.7)
          .from(q("[data-lead]"), { y: 30, opacity: 0, duration: 1 }, 1.15)
          .from(q("[data-ctas] > *"), { y: 30, opacity: 0, duration: 1, stagger: 0.08 }, 1.25)
          .from(q("[data-foot] li, [data-cue]"), { y: 20, opacity: 0, duration: 0.9, stagger: 0.06 }, 1.35);

        const play = () => intro.play();
        if (document.documentElement.dataset.intro) window.addEventListener("sinergia:intro-done", play, { once: true });
        else play();

        // Salida con scroll: la foto se enmarca y se acerca; el texto sube más rápido.
        gsap
          .timeline({
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
          })
          .to(q("[data-frame]"), { clipPath: "inset(7% 5% 7% 5% round 36px)", ease: "none" }, 0)
          .to(q("[data-img]"), { scale: 1.25, yPercent: 8, ease: "none" }, 0)
          .to(q("[data-copy]"), { yPercent: -45, opacity: 0, ease: "none" }, 0)
          .to(q("[data-foot]"), { opacity: 0, ease: "none" }, 0);

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
    <section ref={root} className={s.hero} aria-labelledby="hero-title">
      <div className={s.frame} data-frame>
        <div className={s.imgWrap} data-img>
          <Image src={hero.src} alt="" fill priority sizes="100vw" className={s.img} />
        </div>
        <div className={s.shade} aria-hidden="true" />
        <span className={s.sun} data-sun aria-hidden="true" />
        <div className={s.grain} aria-hidden="true" />
      </div>

      <div className={`container ${s.inner}`} data-copy>
        <h1 id="hero-title" className={s.title} data-title>
          Energía solar para donde <em>llegue el sol.</em>
        </h1>
        <p className={s.lead} data-lead>
          Diseñamos, instalamos y mantenemos sistemas solares para hogares, empresas y fincas en Montería, Córdoba y el Caribe. Tú dejas de pagar de más
          por la energía; nosotros nos encargamos del resto.
        </p>
        <div className={s.ctas} data-ctas>
          <a className="btn" data-magnetic href={whatsappUrl(SITE.whatsapp, "Hola Sinergia, quiero una cotización solar.")} target="_blank" rel="noopener noreferrer">
            Cotizar gratis
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="btn btn--ghost" data-magnetic href="#calculadora">
            Calcula tu ahorro
          </a>
        </div>
      </div>

      <div className={`container ${s.foot}`} data-foot>
        <ul className={s.trust}>
          <li>
            <ShieldCheck size={22} aria-hidden="true" /> Diseño, instalación y mantenimiento
          </li>
          <li>
            <Receipt size={22} aria-hidden="true" /> Trámites con el operador de red incluidos
          </li>
          <li>
            <Certificate size={22} aria-hidden="true" /> Acompañamiento en beneficios Ley 1715
          </li>
        </ul>
        <a href="#un-dia-de-sol" className={s.cue} data-cue aria-label="Bajar a la siguiente sección">
          <ArrowDown size={20} aria-hidden="true" />
        </a>
      </div>
      <p className={s.caption}>Proyecto en alianza · Bodega junto al río Sinú, Montería</p>
    </section>
  );
}
