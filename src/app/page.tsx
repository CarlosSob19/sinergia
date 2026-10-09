import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Buildings,
  Certificate,
  Cpu,
  Headset,
  HouseLine,
  Plant,
  Receipt,
  Ruler,
  ShieldCheck,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import { FAQ, FORUM, PROJECTS, SITE, SOLUTIONS, STEPS, VALUES } from "@/content/site";
import { photo } from "@/content/photos";
import { whatsappUrl } from "@/lib/whatsapp";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { WordReveal } from "@/components/WordReveal";
import { Faq } from "@/components/Faq";
import { QuoteForm } from "@/components/QuoteForm";
import s from "./home.module.css";

const VALUE_ICONS = { wrench: Wrench, headset: Headset, cpu: Cpu, ruler: Ruler } as const;
const SOLUTION_ICONS = { hogar: HouseLine, empresas: Buildings, agro: Plant } as const;

export default function Home() {
  const hero = photo("bodega-rio-sinu");
  const featured = PROJECTS.slice(0, 7);

  return (
    <>
      {/* HERO */}
      <section className={s.hero} aria-labelledby="hero-title">
        <Image src={hero.src} alt="" fill priority sizes="100vw" className={s.heroImg} />
        <div className={s.heroShade} aria-hidden="true" />
        <div className={`container ${s.heroInner}`}>
          <h1 id="hero-title" className={`h-display ${s.heroTitle}`}>
            Energía solar para donde <em>llegue el sol.</em>
          </h1>
          <p className={s.heroLead}>
            Diseñamos, instalamos y mantenemos sistemas solares para hogares, empresas y fincas en Montería, Córdoba y el Caribe. Tú dejas de pagar de más
            por la energía; nosotros nos encargamos del resto.
          </p>
          <div className={s.heroCtas}>
            <a className="btn" href={whatsappUrl(SITE.whatsapp, "Hola Sinergia, quiero una cotización solar.")} target="_blank" rel="noopener noreferrer">
              Cotizar gratis
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="btn btn--ghost" href="#calculadora">
              Calcula tu ahorro
            </a>
          </div>
        </div>
        <div className={`container ${s.heroFoot}`}>
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
          <a href="#manifiesto" className={s.scrollCue} aria-label="Bajar a la siguiente sección">
            <ArrowDown size={20} aria-hidden="true" />
          </a>
        </div>
        <p className={s.heroCaption}>Proyecto en alianza · Bodega junto al río Sinú, Montería</p>
      </section>

      {/* MANIFIESTO */}
      <section id="manifiesto" className={`section ${s.manifesto}`}>
        <div className={`container ${s.manifestoGrid}`}>
          <div>
            <div>
              <WordReveal
                text="Cada techo de Córdoba recibe sol todo el año. Nosotros lo convertimos en energía propia, ahorro real y un futuro más limpio para tu casa, tu empresa o tu finca."
                highlight={["energía", "propia", "ahorro", "real"]}
              />
            </div>
          </div>
          <div className={s.stack} aria-hidden="true">
            {(["edificio-residencial", "corral-ganadero", "concesionario"] as const).map((k, i) => {
              const p = photo(k);
              return (
                <div key={k} className={s.stackCard} style={{ ["--k" as string]: i }}>
                  <Image src={p.src} alt="" fill sizes="(max-width: 900px) 70vw, 30vw" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CALCULADORA */}
      <section id="calculadora" className={`section ${s.calc}`} aria-labelledby="calc-title">
        <div className="container">
          <header className={s.head}>
            <h2 id="calc-title" className="h1">
              ¿Cuánto dejarías de pagar?
            </h2>
            <p className="lead">Escribe el valor de tu factura y mira en segundos el tamaño del sistema que necesitas, tu ahorro y en cuánto tiempo recuperas la inversión.</p>
          </header>
          <div className="reveal">
            <SavingsCalculator />
          </div>
        </div>
      </section>

      {/* SOLUCIONES */}
      <section className="section" aria-labelledby="sol-title">
        <div className="container">
          <header className={`${s.head} ${s.headRow}`}>
            <div>
              <h2 id="sol-title" className="h1">
                Un sistema para cada techo.
              </h2>
            </div>
            <p className="lead">Desde una casa en Montería hasta una finca ganadera sin red eléctrica: diseñamos cada proyecto a la medida de tu consumo.</p>
          </header>
          <div className={s.solutions}>
            {SOLUTIONS.map((sol, i) => {
              const Icon = SOLUTION_ICONS[sol.slug];
              const p = photo(sol.photo);
              return (
                <Link key={sol.slug} href={`/soluciones/${sol.slug}`} className={`${s.solCard} reveal`} style={{ ["--d" as string]: `${i * 80}ms` }}>
                  <Image src={p.src} alt="" fill sizes="(max-width: 900px) 100vw, 33vw" className={s.solImg} />
                  <div className={s.solBody}>
                    <span className={s.solIcon}>
                      <Icon size={24} aria-hidden="true" />
                    </span>
                    <h3 className="h2">{sol.kicker}</h3>
                    <p>{sol.lead}</p>
                    <span className={s.solMore}>
                      Ver solución <ArrowUpRight size={18} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* VALOR */}
      <section className={`section ${s.values}`} aria-labelledby="val-title">
        <div className={`container ${s.valuesGrid}`}>
          <header className={s.valuesHead}>
            <h2 id="val-title" className="h1">
              No te vendemos paneles. Te acompañamos durante toda la vida del sistema.
            </h2>
          </header>
          <ul className={s.valuesList}>
            {VALUES.map((v, i) => {
              const Icon = VALUE_ICONS[v.icon];
              return (
                <li key={v.title} className="reveal" style={{ ["--d" as string]: `${i * 70}ms` }}>
                  <Icon size={30} aria-hidden="true" />
                  <h3 className="h3">{v.title}</h3>
                  <p>{v.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* PROCESO */}
      <section className={`section ${s.process}`} aria-labelledby="proc-title">
        <div className="container">
          <header className={s.head}>
            <h2 id="proc-title" className="h1">
              De la factura al primer kilovatio, en cuatro pasos.
            </h2>
          </header>
          <ol className={s.steps}>
            {STEPS.map((st, i) => (
              <li key={st.title} className="reveal" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <span className={`${s.stepNum} num`}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{st.title}</h3>
                <p>{st.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PROYECTOS */}
      <section className="section" aria-labelledby="proj-title">
        <div className="container">
          <header className={`${s.head} ${s.headRow}`}>
            <div>
              <h2 id="proj-title" className="h1">
                Energía que ya se ve desde el aire.
              </h2>
            </div>
            <Link href="/proyectos" className="link-arrow">
              Ver todos los proyectos <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </header>
          <ul className={s.bento}>
            {featured.map((pr, i) => {
              const p = photo(pr.photo);
              return (
                <li key={pr.photo} className={`${s.bentoItem} reveal`} style={{ ["--d" as string]: `${i * 60}ms` }}>
                  <Image src={p.src} alt={`${pr.title}: paneles solares instalados por Sinergia`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
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

      {/* LEY 1715 */}
      <section className={`section ${s.law}`} aria-labelledby="law-title">
        <div className={`container ${s.lawGrid}`}>
          <div>
            <h2 id="law-title" className="h1">
              Tu empresa puede recuperar parte de la inversión en impuestos.
            </h2>
            <p className="lead" style={{ marginTop: 20 }}>
              La Ley 1715 de 2014 y la Ley 2099 de 2021 dan incentivos tributarios a los proyectos de energía renovable. Te acompañamos en la certificación
              ante la UPME para que los aproveches.
            </p>
          </div>
          <ul className={s.lawList}>
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
        <div className={`container ${s.forumGrid}`}>
          <div>
            <h2 id="fier-title" className="h1">
              Organizamos el Foro Internacional de Energías Renovables
            </h2>
            <p className={s.forumLead}>
              {FORUM.edition}: {FORUM.theme.charAt(0).toLowerCase() + FORUM.theme.slice(1)}.
            </p>
            <Link href="/foro" className="btn btn--ghost" style={{ marginTop: 28 }}>
              Conoce el FIER <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className={s.forumStat}>
            <p className={`${s.forumNum} num`}>
              1.294<span>MW</span>
            </p>
            <p>en proyectos fotovoltaicos asignados a Córdoba y Montería en la subasta de energía 2027-2028. El Caribe está liderando la transición.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" aria-labelledby="faq-title">
        <div className={`container ${s.faqGrid}`}>
          <header className={s.faqHead}>
            <h2 id="faq-title" className="h1">
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
            <h2 id="contact-title" className="h-display" style={{ fontSize: "clamp(44px, 6vw, 84px)" }}>
              Tu techo ya está listo. ¿Y tú?
            </h2>
            <p className="lead" style={{ marginTop: 20 }}>
              Cuéntanos de tu proyecto y te respondemos por WhatsApp. La visita técnica no tiene costo.
            </p>
            <dl className={s.contactList}>
              <div>
                <dt>Oficina</dt>
                <dd>
                  {SITE.address.street}, {SITE.address.city}
                </dd>
              </div>
              <div>
                <dt>Teléfonos</dt>
                <dd>
                  {SITE.phones.slice(0, 2).map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`}>
                      {p}
                    </a>
                  ))}
                </dd>
              </div>
              <div>
                <dt>Correo</dt>
                <dd>
                  <a href={`mailto:${SITE.emails.comercial}`}>{SITE.emails.comercial}</a>
                </dd>
              </div>
            </dl>
          </div>
          <div className={s.contactCard}>
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
