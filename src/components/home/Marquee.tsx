"use client";

import { useRef } from "react";
import { LogoMark } from "../Logo";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import s from "./Marquee.module.css";

const WORDS = ["Hogares", "Empresas", "Fincas", "Bombeo solar", "Baterías", "Mantenimiento", "Ley 1715"];

/** Cinta de servicios que acelera y cambia de sentido con la velocidad del scroll. */
export function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const track = root.current!.querySelector("[data-track]")!;
        const loop = gsap.to(track, { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
        let dir = 1;
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
          onUpdate: (self) => {
            const v = self.getVelocity();
            if (Math.abs(v) > 40) dir = v > 0 ? 1 : -1;
            gsap.to(loop, { timeScale: dir * (1 + Math.min(Math.abs(v) / 260, 5)), duration: 0.4, overwrite: true });
            gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.4, ease: "power2.out" });
          },
        });
        return () => {
          st.kill();
          loop.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const row = (
    <>
      {WORDS.map((w) => (
        <span key={w} className={s.item}>
          {w}
          <LogoMark size={44} className={s.mark} />
        </span>
      ))}
    </>
  );

  return (
    <div ref={root} className={s.marquee} aria-label={`Servicios: ${WORDS.join(", ")}`} role="img">
      <div className={s.track} data-track aria-hidden="true">
        {row}
        {row}
      </div>
    </div>
  );
}
