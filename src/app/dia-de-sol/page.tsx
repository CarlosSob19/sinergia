import type { Metadata } from "next";
import { FAQ } from "@/content/site";
import { Faq } from "@/components/Faq";
import { DaySky } from "@/components/day/DaySky";
import { DayHero } from "@/components/day/DayHero";
import { DayNight, DayNoon, DayRange, DayTension, DayTurn } from "@/components/day/DayScenes";
import s from "@/components/day/day.module.css";

export const metadata: Metadata = {
  title: "Un día de sol en Montería",
  description: "Recorre un día de sol en Montería y descubre cuánta energía produce un techo como el tuyo, hora por hora.",
  alternates: { canonical: "/dia-de-sol" },
};

export default function DiaDeSol() {
  return (
    <div className={s.page}>
      <DaySky />
      <DayHero />
      <DayTension />
      <DayTurn />

      {/* Silencio autoral: la luz sube hacia el mediodía sin texto. */}
      <div className={s.silence} aria-hidden="true" />

      <DayNoon />
      <DayRange />

      {/* Atardecer · flow: lectura calmada con luz dorada. */}
      <section id="atardecer" data-hour="15.5" data-label="Atardecer" className={s.dusk} aria-labelledby="dusk-title">
        <div className={`container ${s.duskGrid}`}>
          <div className={s.duskIntro}>
            <h2 id="dusk-title" className={s.sceneTitle}>
              Cae la tarde. <em>Hablemos claro.</em>
            </h2>
            <p className={s.sceneLead}>
              La Ley 1715 de 2014 y la Ley 2099 de 2021 dan deducción de renta, exclusión de IVA, exención arancelaria y depreciación acelerada a los
              proyectos de energía renovable. Te acompañamos en la certificación ante la UPME.
            </p>
          </div>
          <div className={s.duskFaq}>
            <Faq items={FAQ} />
          </div>
        </div>
      </section>

      <DayNight />
    </div>
  );
}
