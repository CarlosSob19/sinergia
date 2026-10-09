import type { Metadata } from "next";
import Image from "next/image";
import { TEAM, VALUES } from "@/content/site";
import { photo } from "@/content/photos";
import { CtaBand } from "@/components/CtaBand";
import s from "@/components/inner.module.css";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Sinergia Energía Solar: misión, visión y equipo. Energía solar para tu hogar, empresa y cualquier sitio donde llegue el sol.",
  alternates: { canonical: "/nosotros" },
};

export default function AboutPage() {
  const p = photo("edificio-oficinas");
  return (
    <>
      <section className={s.pageHead}>
        <div className="container">
          <h1 className="h1">Comprometidos con un futuro sostenible desde Montería.</h1>
          <p className="lead">Energía solar para tu hogar, tu empresa y cualquier sitio donde llegue el sol.</p>
        </div>
      </section>

      <section className="container">
        <Image src={p.src} width={p.width} height={p.height} alt="Edificio con sistema solar instalado por Sinergia" sizes="(max-width: 1240px) 100vw, 1240px" style={{ width: "100%", height: "min(62vh, 620px)", objectFit: "cover", borderRadius: "var(--r-lg)" }} />
      </section>

      <section className="section">
        <div className={`container ${s.split}`}>
          <div className={s.sticky}>
            <h2 className="h2">Liderar la transición energética del Caribe.</h2>
          </div>
          <ul className={s.cards}>
            <li>
              <h3 className="h3">Misión</h3>
              <p>
                Liderar la revolución energética mediante la promoción y la instalación de sistemas de energía solar accesibles y sostenibles. Nos
                comprometemos a ofrecer soluciones innovadoras y de alta calidad que satisfagan las necesidades de nuestros clientes y contribuyan a la
                preservación del medio ambiente y al desarrollo de comunidades resilientes.
              </p>
            </li>
            <li>
              <h3 className="h3">Visión</h3>
              <p>
                Un mundo donde la energía solar sea una de las fuentes renovables más al alcance de la comunidad. Nos esforzamos por ser líderes del sector,
                con tecnologías avanzadas, servicio excepcional y un impacto positivo en la sociedad y el medio ambiente.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className={`section ${s.band}`}>
        <div className="container">
          <h2 className="h2" style={{ marginBottom: 32 }}>
            Lo que te ofrecemos
          </h2>
          <ul className={s.team}>
            {[
              ...VALUES,
              { title: "Compromiso ambiental", text: "Minimizamos el impacto ambiental de nuestras operaciones y promovemos prácticas sostenibles." },
              { title: "Innovación continua", text: "Adoptamos nuevas tecnologías y prácticas para mejorar la eficiencia y el rendimiento de cada sistema." },
            ].map((v) => (
              <li key={v.title}>
                <strong className="h3">{v.title}</strong>
                <span>{v.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="h2" style={{ margin: "16px 0 32px" }}>
            Las personas detrás de Sinergia
          </h2>
          <ul className={s.team}>
            {TEAM.map((m) => (
              <li key={m.name}>
                <strong className="h3">{m.name}</strong>
                <span>{m.role}</span>
                {"email" in m && <a href={`mailto:${m.email}`}>{m.email}</a>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
