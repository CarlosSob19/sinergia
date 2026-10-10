"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, MOTION_REDUCED } from "@/lib/gsap";
import s from "./day.module.css";

/**
 * Movimiento firma de "Un día de sol": la posición del scroll fija la hora.
 * - Cielo, sol y estrellas fijos detrás de toda la página, regraduados de forma continua.
 * - Curva de producción fija en el borde: se dibuja con la energía de un sistema típico
 *   (4 kWp en Montería, modelo de lib/solar.ts) y sirve de navegación por horas.
 *
 * Cada acto declara su hora con data-hour; la hora se interpola entre actos según el scroll.
 */

const START = 5.5;
const END = 20;
const DAILY_KWH = 4 * 5 * 0.8; // 4 kWp × 5 HSP (Montería) × 0,8 rendimiento = 16 kWh/día

// Cielo por hora: [hora, color arriba, color abajo]. Tonos profundos para que el texto blanco se lea siempre.
const SKY: [number, string, string][] = [
  [5.5, "#0a1430", "#c8643f"],
  [7, "#1a3f74", "#f0a55f"],
  [9, "#14588f", "#6fb2dc"],
  [12, "#0f5f9c", "#3f9bd0"],
  [15, "#165287", "#d9a24f"],
  [17.3, "#3a1f4f", "#ff8a3d"],
  [18.6, "#140f2e", "#5b2a4f"],
  [20, "#040914", "#0b1430"],
];

const lerpColor = (a: string, b: string, t: number) => gsap.utils.interpolate(a, b, t) as string;

function skyAt(h: number) {
  for (let i = 0; i < SKY.length - 1; i++) {
    const [h0, t0, b0] = SKY[i];
    const [h1, t1, b1] = SKY[i + 1];
    if (h <= h1) {
      const t = Math.min(1, Math.max(0, (h - h0) / (h1 - h0)));
      return [lerpColor(t0, t1, t), lerpColor(b0, b1, t)];
    }
  }
  return [SKY[SKY.length - 1][1], SKY[SKY.length - 1][2]];
}

/** Fracción de producción solar (0 fuera de 6:00–18:00, campana al mediodía). */
const production = (h: number) => (h <= 6 || h >= 18 ? 0 : Math.sin((Math.PI * (h - 6)) / 12));
/** kWh acumulados desde las 6:00 hasta la hora h. */
const energyUntil = (h: number) => {
  const f = Math.min(1, Math.max(0, (h - 6) / 12));
  return (DAILY_KWH * (1 - Math.cos(Math.PI * f))) / 2;
};

const W = 1000;
const H = 60;
const xOf = (h: number) => ((h - START) / (END - START)) * W;
// Curva de producción a lo largo del día (para el riel).
const CURVE = Array.from({ length: 121 }, (_, i) => {
  const h = START + ((END - START) * i) / 120;
  return `${i ? "L" : "M"}${xOf(h).toFixed(1)} ${(H - 6 - production(h) * (H - 14)).toFixed(1)}`;
}).join(" ");

const fmtHour = (h: number) => {
  const m = Math.round(h * 4) * 15;
  return `${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
};

export function DaySky() {
  const root = useRef<HTMLDivElement>(null);
  const [acts, setActs] = useState<{ id: string; label: string; hour: number }[]>([]);

  useEffect(() => {
    const el = root.current!;
    const reduced = window.matchMedia(MOTION_REDUCED).matches;
    const nodes = [...document.querySelectorAll<HTMLElement>("[data-hour]")];
    setActs(nodes.map((n) => ({ id: n.id, label: n.dataset.label || "", hour: Number(n.dataset.hour) })));

    let anchors: { y: number; h: number }[] = [];
    const measure = () => {
      anchors = nodes.map((n) => ({ y: n.getBoundingClientRect().top + window.scrollY, h: Number(n.dataset.hour) }));
      anchors.push({ y: document.documentElement.scrollHeight - window.innerHeight, h: END });
    };
    const hourAt = (y: number) => {
      if (y <= anchors[0].y) return anchors[0].h;
      for (let i = 0; i < anchors.length - 1; i++) {
        const a = anchors[i];
        const b = anchors[i + 1];
        if (y <= b.y) return a.h + ((b.h - a.h) * (y - a.y)) / Math.max(1, b.y - a.y);
      }
      return END;
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      const h = reduced ? 12 : hourAt(window.scrollY + window.innerHeight * 0.35);
      const [top, bottom] = skyAt(h);
      const f = Math.min(1, Math.max(0, (h - 6) / 12));
      const up = production(h);
      el.style.setProperty("--sky-top", top);
      el.style.setProperty("--sky-bottom", bottom);
      el.style.setProperty("--sun-x", `${(6 + 88 * f).toFixed(2)}vw`);
      el.style.setProperty("--sun-y", `${(70 - up * 58).toFixed(2)}vh`);
      el.style.setProperty("--sun-o", h < 5.8 || h > 18.4 ? "0" : String(Math.min(1, Math.min(h - 5.8, 18.4 - h) * 2.5)));
      el.style.setProperty("--stars", String(Math.min(1, Math.max(0, (h - 18.2) / 1.2) + Math.max(0, (6.2 - h) / 0.7))));
      el.style.setProperty("--trace", `${((xOf(h) / W) * 100).toFixed(2)}%`);
      // Hora y producción también para las escenas (tracker, textos del mediodía).
      document.documentElement.style.setProperty("--day-hour", h.toFixed(3));
      document.documentElement.style.setProperty("--day-prod", up.toFixed(3));
      window.dispatchEvent(new CustomEvent("sinergia:hour", { detail: h }));
      const clock = el.querySelector<HTMLElement>("[data-clock]");
      const kwh = el.querySelector<HTMLElement>("[data-kwh]");
      if (clock) clock.textContent = fmtHour(h);
      if (kwh) kwh.textContent = energyUntil(h).toLocaleString("es-CO", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    measure();
    update();
    const ro = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      document.documentElement.style.removeProperty("--day-hour");
      document.documentElement.style.removeProperty("--day-prod");
    };
  }, []);

  const go = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(target, { offset: -40, duration: 1.6 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={root} className={s.sky}>
      <div className={s.skyGrad} aria-hidden="true" />
      <div className={s.stars} aria-hidden="true" />
      <div className={s.sun} aria-hidden="true">
        <span />
      </div>

      <nav className={s.rail} aria-label="Horas del día">
        <div className={s.railReadout} aria-hidden="true">
          <span className={`${s.railClock} num`} data-clock>
            05:30
          </span>
          <span className={s.railKwh}>
            <strong className="num" data-kwh>
              0,0
            </strong>{" "}
            kWh
          </span>
        </div>
        <div className={s.railTrack}>
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
            <path d={CURVE} className={s.railGhost} vectorEffect="non-scaling-stroke" />
            <clipPath id="rail-clip">
              <rect x="0" y="0" height={H} className={s.railClipRect} />
            </clipPath>
            <path d={`${CURVE} L ${W} ${H} L 0 ${H} Z`} className={s.railArea} clipPath="url(#rail-clip)" />
            <path d={CURVE} className={s.railLine} clipPath="url(#rail-clip)" vectorEffect="non-scaling-stroke" />
          </svg>
          <span className={s.railHead} aria-hidden="true" />
          <ul>
            {acts.map((a) => (
              <li key={a.id} style={{ left: `${((a.hour - START) / (END - START)) * 100}%` }}>
                <button type="button" onClick={() => go(a.id)} aria-label={`Ir a ${a.label}, ${fmtHour(a.hour)}`}>
                  <span className={s.tick} />
                  <span className={s.tickLabel}>{a.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <p className={s.railNote}>Lo que un sistema de 4 kWp produciría en Montería mientras recorres el día.</p>
      </nav>
    </div>
  );
}
