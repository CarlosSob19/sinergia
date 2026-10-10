import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cpu, Headset, Ruler, Wrench } from "@phosphor-icons/react/dist/ssr";
import { FAQ, FORUM, PROJECTS, VALUES } from "@/content/site";
import { photo } from "@/content/photos";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { WordReveal } from "@/components/WordReveal";
import { Faq } from "@/components/Faq";
import { QuoteForm } from "@/components/QuoteForm";
import { HeroImmersive } from "@/components/home/HeroImmersive";
import { SunDay } from "@/components/home/SunDay";
import { Marquee } from "@/components/home/Marquee";
import { SolutionsRail } from "@/components/home/SolutionsRail";
import { ProcessStack } from "@/components/home/ProcessStack";
import { FanStack } from "@/components/home/FanStack";
import { PetalDivider, PetalWatermark } from "@/components/Petals";
import { CoverageMap } from "@/components/CoverageMap";
import s from "./home.module.css";

const VALUE_ICONS = { wrench: Wrench, headset: Headset, cpu: Cpu, ruler: Ruler } as const;

export default function Home() {
  const featured = PROJECTS.slice(0, 7);

  return (
    <>
      <HeroImmersive />

      {/* MANIFIESTO */}
      <section id="manifiesto" className={`section ${s.manifesto}`}>
        <div className={`container ${s.manifestoGrid}`}>
          <WordReveal
            text="Cada techo de Córdoba recibe sol todo el año. Nosotros lo convertimos en energía propia, ahorro real y un futuro más limpio para tu casa, tu empresa o tu finca."
            highlight={["energía", "propia", "ahorro", "real"]}
          />
          <FanStack />
        </div>
      </section>

      <SunDay />

      <Marquee />

      <SolutionsRail />

      {/* CALCULADORA */}
      <section id="calculadora" className={`section ${s.calc}`} aria-labelledby="calc-title">
        <div className="container">
          <header className={s.head}>
            <h2 id="calc-title" className={s.bigTitle} data-split>
              ¿Cuánto dejarías de pagar?
            </h2>
            <p className="lead">Escribe el valor de tu factura y mira en segundos el tamaño del sistema que necesitas, tu ahorro y en cuánto tiempo recuperas la inversión.</p>
          </header>
          <SavingsCalculator />
        </div>
      </section>

      {/* VALOR */}
      <section className={`section ${s.values}`} aria-labelledby="val-title">
        <PetalWatermark side="right" />
        <div className={`container ${s.valuesGrid}`}>
          <header className={s.valuesHead}>
            <h2 id="val-title" className={s.bigTitle} data-split>
              No te vendemos paneles. Te acompañamos durante toda la vida del sistema.
            </h2>
          </header>
          <ul className={s.valuesList} data-stagger>
            {VALUES.map((v) => {
              const Icon = VALUE_ICONS[v.icon];
              return (
                <li key={v.title}>
                  <Icon size={34} aria-hidden="true" />
                  <h3 className="h3">{v.title}</h3>
                  <p>{v.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <ProcessStack />

      {/* PROYECTOS */}
      <section className="section" aria-labelledby="proj-title">
        <PetalDivider />
        <div style={{ height: "clamp(48px, 7vw, 96px)" }} />
        <div className="container">
          <header className={`${s.head} ${s.headRow}`}>
            <h2 id="proj-title" className={s.bigTitle} data-split>
              Energía que ya se ve desde el aire.
            </h2>
            <Link href="/proyectos" className="link-arrow" data-magnetic>
              Ver todos los proyectos <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </header>
          <ul className={s.bento}>
            {featured.map((pr, i) => {
              const p = photo(pr.photo);
              return (
                <li key={pr.photo} className={`${s.bentoItem} reveal`} style={{ ["--d" as string]: `${Math.min(i, 4) * 70}ms` }}>
                  <div className={s.bentoImg} data-parallax="10">
                    <Image src={p.src} alt={`${pr.title}: paneles solares instalados por Sinergia`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                  </div>
                  <div className={s.bentoCap}>
                    <span>{pr.type}</span>
                    <strong>{pr.title}</strong>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CoverageMap />

      {/* LEY 1715 */}
      <section className={`section ${s.law}`} aria-labelledby="law-title">
        <div className={`container ${s.lawGrid}`}>
          <div>
            <h2 id="law-title" className={s.bigTitle} data-split>
              Tu empresa puede recuperar parte de la inversión en impuestos.
            </h2>
            <p className="lead" style={{ marginTop: 20 }}>
              La Ley 1715 de 2014 y la Ley 2099 de 2021 dan incentivos tributarios a los proyectos de energía renovable. Te acompañamos en la certificación
              ante la UPME para que los aproveches.
            </p>
          </div>
          <ul className={s.lawList} data-stagger>
            <li>
              <strong>Deducción de renta</strong>
              <span>Hasta el 50 % de la inversión, en un período de hasta 15 años.</span>
            </li>
            <li>
              <strong>Exclusión de IVA</strong>
              <span>En equipos y servicios del proyecto.</span>
            </li>
            <li>
              <strong>Exención arancelaria</strong>
              <span>Para equipos importados destinados al proyecto.</span>
            </li>
            <li>
              <strong>Depreciación acelerada</strong>
              <span>De los activos del sistema solar.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* FORO FIER */}
      <section className={s.forum} aria-labelledby="fier-title">
        <PetalWatermark side="left" />
        <div className={`container ${s.forumGrid}`}>
          <div>
            <h2 id="fier-title" className={s.bigTitle} data-split>
              Organizamos el Foro Internacional de Energías Renovables
            </h2>
            <p className={s.forumLead}>
              {FORUM.edition}: {FORUM.theme.charAt(0).toLowerCase() + FORUM.theme.slice(1)}.
            </p>
            <Link href="/foro" className="btn btn--ghost" data-magnetic style={{ marginTop: 28 }}>
              Conoce el FIER <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className={s.forumStat}>
            <p className={`${s.forumNum} num`}>
              <span data-count="1294">1.294</span>
              <small>MW</small>
            </p>
            <p>en proyectos fotovoltaicos asignados a Córdoba y Montería en la subasta de energía 2027-2028. El Caribe está liderando la transición.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" aria-labelledby="faq-title">
        <PetalDivider tone="sun" />
        <div style={{ height: "clamp(48px, 7vw, 96px)" }} />
        <div className={`container ${s.faqGrid}`}>
          <header className={s.faqHead}>
            <h2 id="faq-title" className={s.bigTitle} data-split>
              Lo que todos preguntan antes de pasarse al sol.
            </h2>
          </header>
          <Faq items={FAQ} />
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className={`section ${s.contact}`} aria-labelledby="contact-title">
        <div className={`container ${s.contactGrid}`}>
          <div>
            <h2 id="contact-title" className={s.giant} data-split>
              Tu techo ya está listo. ¿Y tú?
            </h2>
            <p className="lead" style={{ marginTop: 24 }}>
              Cuéntanos de tu proyecto y te respondemos por WhatsApp. La visita técnica no tiene costo.
            </p>
          </div>
          <div className={s.contactCard}>
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
