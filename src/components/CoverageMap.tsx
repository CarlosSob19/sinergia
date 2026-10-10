"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, MapPin, NavigationArrow, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { CITY_XY, CORDOBA_PATH, MAP_H, MAP_W, NEIGHBORS } from "@/content/cordoba-map";
import { MAP_DIRECTIONS, PROJECTS, SITE } from "@/content/site";
import { photo } from "@/content/photos";
import { whatsappUrl } from "@/lib/whatsapp";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import s from "./CoverageMap.module.css";

// TODO-CONFIRMAR con Sinergia qué municipios atienden; las coordenadas sí son reales.
// Coordenadas reales (lat, lon) para calcular distancias por carretera aproximadas en línea recta.
const LATLON: Record<string, [number, number]> = {
  Montería: [8.7479, -75.8814],
  Cereté: [8.8848, -75.7906],
  Lorica: [9.2365, -75.8141],
  Sahagún: [8.9464, -75.4455],
  "Planeta Rica": [8.4108, -75.5855],
  Montelíbano: [7.9797, -75.4167],
  Tierralta: [8.1735, -76.059],
  "Ciénaga de Oro": [8.8749, -75.6208],
};

const km = (a: [number, number], b: [number, number]) => {
  const r = (d: number) => (d * Math.PI) / 180;
  const h = Math.sin(r(b[0] - a[0]) / 2) ** 2 + Math.cos(r(a[0])) * Math.cos(r(b[0])) * Math.sin(r(b[1] - a[1]) / 2) ** 2;
  return Math.round(2 * 6371 * Math.asin(Math.sqrt(h)));
};

const NEIGHBOR_LABEL: Record<string, [number, number]> = { Sucre: [690, 150], Antioquia: [560, 860], Bolivar: [740, 40] };

/**
 * Mapa ilustrado de Córdoba: el contorno se dibuja al entrar en pantalla, los pines caen
 * y una onda sale desde la oficina en Montería. Cada municipio muestra su distancia a la
 * oficina y un acceso directo para cotizar por WhatsApp.
 */
export function CoverageMap() {
  const root = useRef<HTMLElement>(null);
  const [city, setCity] = useState("Montería");
  const isHQ = city === "Montería";
  const dist = km(LATLON["Montería"], LATLON[city]);
  const thumbs = PROJECTS.slice(0, 6);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const outline = q("[data-outline]")[0] as unknown as SVGPathElement;
        const len = outline.getTotalLength();
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: "top 70%", once: true } })
          .fromTo(outline, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" })
          .from(q("[data-fill]"), { opacity: 0, duration: 1 }, 1.4)
          .from(q("[data-neighbor]"), { opacity: 0, duration: 1, stagger: 0.1 }, 0.4)
          .from(q("[data-pin]"), { y: -40, opacity: 0, duration: 0.8, ease: "back.out(2)", stagger: 0.08 }, 1.6)
          .from(q("[data-panel]"), { x: 40, opacity: 0, duration: 1, ease: "expo.out" }, 1.2);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.section} aria-labelledby="map-title">
      <div className={`container ${s.grid}`}>
        <div className={s.mapWrap}>
          <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className={s.svg} role="group" aria-label="Mapa de Córdoba con los municipios que atendemos">
            <defs>
              <pattern id="cm-dots" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.4" className={s.dot} />
              </pattern>
              <radialGradient id="cm-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#f5a524" stopOpacity="0.55" />
                <stop offset="1" stopColor="#f5a524" stopOpacity="0" />
              </radialGradient>
            </defs>

            {Object.entries(NEIGHBORS).map(([name, d]) => (
              <g key={name} data-neighbor>
                <path d={d} className={s.neighbor} />
                {NEIGHBOR_LABEL[name] && (
                  <text x={NEIGHBOR_LABEL[name][0]} y={NEIGHBOR_LABEL[name][1]} className={s.neighborLabel}>
                    {name === "Bolivar" ? "Bolívar" : name}
                  </text>
                )}
              </g>
            ))}

            <path d={CORDOBA_PATH} className={s.fill} data-fill />
            <path d={CORDOBA_PATH} fill="url(#cm-dots)" data-fill />
            <path d={CORDOBA_PATH} className={s.outline} data-outline />
            <text x="120" y="760" className={s.dept}>
              Córdoba
            </text>

            {/* Ondas desde la oficina */}
            <g transform={`translate(${CITY_XY["Montería"][0]} ${CITY_XY["Montería"][1]})`} aria-hidden="true">
              <circle r="90" fill="url(#cm-glow)" />
              <circle r="20" className={s.ripple} />
              <circle r="20" className={`${s.ripple} ${s.ripple2}`} />
            </g>

            {Object.entries(CITY_XY).map(([name, [x, y]]) => {
              const active = name === city;
              const hq = name === "Montería";
              return (
                <g
                  key={name}
                  data-pin
                  className={s.pin}
                  data-active={active}
                  data-hq={hq}
                  transform={`translate(${x} ${y})`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={active}
                  aria-label={hq ? "Montería, oficina principal" : `${name}, a ${km(LATLON["Montería"], LATLON[name])} km de Montería`}
                  onClick={() => setCity(name)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setCity(name))}
                >
                  <circle r="26" className={s.hit} />
                  <circle r={hq ? 13 : 9} className={s.pinDot} />
                  {hq && <circle r="5" className={s.pinCore} />}
                  <text x="16" y="5" className={s.pinLabel}>
                    {name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <aside className={s.panel} data-panel aria-live="polite">
          <h2 id="map-title" className={s.title}>
            Desde Montería, para todo Córdoba.
          </h2>
          <div className={s.card} key={city}>
            <p className={s.cityName}>
              <MapPin size={22} weight="fill" aria-hidden="true" />
              {city}
            </p>
            {isHQ ? (
              <>
                <p className={s.meta}>
                  Oficina principal · {SITE.address.street}
                </p>
                <ul className={s.thumbs}>
                  {thumbs.map((pr) => {
                    const p = photo(pr.photo);
                    return (
                      <li key={pr.photo}>
                        <Image src={p.src} alt={pr.title} fill sizes="120px" />
                      </li>
                    );
                  })}
                </ul>
                <div className={s.actions}>
                  <Link href="/proyectos" className="btn btn--dark">
                    Ver proyectos <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                  <a href={MAP_DIRECTIONS} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                    <NavigationArrow size={18} weight="fill" aria-hidden="true" /> Cómo llegar
                  </a>
                </div>
              </>
            ) : (
              <>
                <p className={s.meta}>
                  A unos <strong className="num">{dist} km</strong> en línea recta de nuestra oficina en Montería.
                </p>
                <p className={s.copy}>Hacemos la visita técnica en {city}, diseñamos el sistema para tu techo o tu finca y lo instalamos con nuestro equipo.</p>
                <div className={s.actions}>
                  <a
                    href={whatsappUrl(SITE.whatsapp, `Hola Sinergia, quiero una cotización solar en ${city}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    <WhatsappLogo size={18} weight="fill" aria-hidden="true" /> Cotizar en {city}
                  </a>
                </div>
              </>
            )}
          </div>
          <p className={s.hint}>Toca un municipio en el mapa.</p>
        </aside>
      </div>
    </section>
  );
}
