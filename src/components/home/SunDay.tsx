"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import s from "./SunDay.module.css";

const STEPS = [
  { time: "06:00", title: "Amanece.", text: "Con la primera luz tus paneles empiezan a producir. La casa aún usa la red." },
  { time: "12:00", title: "Mediodía.", text: "Produces más de lo que consumes. El excedente se entrega a la red y se descuenta de tu factura." },
  { time: "18:00", title: "Atardece.", text: "La producción baja. La red, o tus baterías si las tienes, toman el relevo hasta mañana." },
];

// Arco del sol = curva de producción: el sol dibuja la energía que generas.
const ARC = "M 80 470 C 330 -60, 870 -60, 1120 470";
const CELLS = Array.from({ length: 6 * 10 }, (_, i) => i);

/**
 * "Un día de sol en Montería": sección fija mientras el scroll avanza de 6:00 a 18:00.
 * El cielo cambia de color, el sol recorre el arco dibujando la curva de producción,
 * los paneles se iluminan y un reloj y un porcentaje acompañan el recorrido.
 */
export function SunDay() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const clock = q("[data-clock]")[0] as HTMLElement;
        const pct = q("[data-pct]")[0] as HTMLElement;
        const bar = q("[data-bar]")[0] as HTMLElement;
        const tracker = q("[data-tracker]")[0] as HTMLElement;
        const curve = q("[data-curve]")[0] as unknown as SVGPathElement;
        const len = curve.getTotalLength();
        gsap.set(curve, { strokeDasharray: len, strokeDashoffset: len });
        gsap.set(q("[data-step]"), { autoAlpha: 0, y: 40 });
        gsap.set(q("[data-area]"), { attr: { width: 0 } });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=280%",
            pin: true,
            scrub: 0.6,
            onUpdate: (self) => {
              const p = self.progress;
              const minutes = 6 * 60 + Math.round(p * 12 * 60);
              const h = String(Math.floor(minutes / 60)).padStart(2, "0");
              const m = String(Math.floor((minutes % 60) / 15) * 15).padStart(2, "0");
              clock.textContent = `${h}:${m}`;
              const prod = Math.round(Math.sin(Math.PI * p) ** 1.5 * 100);
              pct.textContent = String(prod);
              bar.style.transform = `scaleX(${prod / 100})`;
              // Seguidor solar: el panel gira de este a oeste mirando al sol y el reflejo lo recorre.
              tracker.style.setProperty("--tilt", `${(-52 + 104 * p).toFixed(2)}deg`);
              tracker.style.setProperty("--glare-x", `${(-60 + 220 * p).toFixed(1)}%`);
              tracker.style.setProperty("--glare-o", (0.15 + 0.85 * Math.sin(Math.PI * p)).toFixed(3));
              tracker.style.setProperty("--shadow-x", `${((0.5 - p) * 90).toFixed(1)}px`);
            },
          },
        });

        tl.to(q("[data-sun]"), { motionPath: { path: ARC, align: q("[data-arc]")[0] as unknown as SVGPathElement, alignOrigin: [0.5, 0.5] }, duration: 1 }, 0)
          .to(curve, { strokeDashoffset: 0, duration: 1 }, 0)
          .to(q("[data-area]"), { attr: { width: 1200 }, duration: 1 }, 0)
          // Cielo: madrugada → mediodía → atardecer
          .to(q("[data-sky=noon]"), { opacity: 1, duration: 0.4 }, 0.1)
          .to(q("[data-sky=dusk]"), { opacity: 1, duration: 0.35 }, 0.62)
          ;

        // Textos por momento del día
        const steps = q("[data-step]");
        steps.forEach((el, i) => {
          const at = [0.02, 0.38, 0.72][i];
          tl.to(el, { autoAlpha: 1, y: 0, duration: 0.08, ease: "power2.out" }, at);
          if (i < steps.length - 1) tl.to(el, { autoAlpha: 0, y: -40, duration: 0.08, ease: "power2.in" }, [0.3, 0.64][i]);
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="un-dia-de-sol" className={s.day} aria-labelledby="sunday-title">
      <div className={s.sky} data-sky="dawn" aria-hidden="true" />
      <div className={`${s.sky} ${s.noon}`} data-sky="noon" aria-hidden="true" />
      <div className={`${s.sky} ${s.dusk}`} data-sky="dusk" aria-hidden="true" />

      <div className={`container ${s.layout}`}>
        <header className={s.head}>
          <h2 id="sunday-title" className={s.title}>
            Un día de sol en Montería.
          </h2>
          <div className={s.readout} aria-hidden="true">
            <span className={`${s.clock} num`} data-clock>
              06:00
            </span>
            <span className={s.prod}>
              Producción <strong className="num" data-pct>0</strong>%
            </span>
            <span className={s.track}>
              <span className={s.fill} data-bar />
            </span>
          </div>
        </header>

        <ol className={s.steps}>
          {STEPS.map((st) => (
            <li key={st.time} data-step>
              <span className="num">{st.time}</span>
              <strong>{st.title}</strong>
              <p>{st.text}</p>
            </li>
          ))}
        </ol>

        <svg className={s.scene} viewBox="0 0 1200 620" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
          <defs>
            <radialGradient id="sd-sun" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#fff6d8" />
              <stop offset="0.35" stopColor="#ffd27a" />
              <stop offset="1" stopColor="#f5a524" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sd-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f5a524" stopOpacity="0.45" />
              <stop offset="1" stopColor="#f5a524" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sd-panel" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1c3f5c" />
              <stop offset="1" stopColor="#0a2233" />
            </linearGradient>
            <linearGradient id="sd-glare" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#ffe3a3" stopOpacity="0" />
              <stop offset="0.5" stopColor="#fff2cf" stopOpacity="0.85" />
              <stop offset="1" stopColor="#ffe3a3" stopOpacity="0" />
            </linearGradient>
            <clipPath id="sd-clip">
              <rect data-area x="0" y="0" width="1200" height="620" />
            </clipPath>
          </defs>

          <path d={ARC} className={s.arcGuide} data-arc />
          <path d={`${ARC} L 1120 470 L 80 470 Z`} fill="url(#sd-area)" clipPath="url(#sd-clip)" />
          <path d={ARC} className={s.curve} data-curve />

          <g data-sun transform="translate(600 75)">
            <circle r="120" fill="url(#sd-sun)" />
            <circle r="34" fill="#fff4d1" />
          </g>

          <line x1="0" y1="470" x2="1200" y2="470" className={s.horizon} />

        </svg>

        <div className={s.tracker} data-tracker aria-hidden="true">
          <div className={s.panel}>
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
    </section>
  );
}
