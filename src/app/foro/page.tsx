import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, CalendarBlank, MapPin } from "@phosphor-icons/react/dist/ssr";
import { FORUM } from "@/content/site";
import { photo } from "@/content/photos";
import s from "@/components/inner.module.css";

export const metadata: Metadata = {
  title: "Foro FIER",
  description: `${FORUM.name}: ${FORUM.theme}. Organizado por Sinergia en Montería.`,
  alternates: { canonical: "/foro" },
};

export default function ForumPage() {
  const p = photo("parqueadero");
  return (
    <>
      <section className={s.photoHero}>
        <Image src={p.src} alt="" fill priority sizes="100vw" />
        <div className={`container ${s.inner}`}>
          <h1 className="h1" data-split>{FORUM.name}</h1>
          <p className="lead">
            {FORUM.edition} · {FORUM.theme}.
          </p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${s.split}`}>
          <div className={s.sticky}>
            <h2 className="h2" data-split>El Caribe lidera la transición energética de Colombia.</h2>
          </div>
          <div style={{ display: "grid", gap: 24 }}>
            <p className="lead">{FORUM.context}</p>
            <ul className={s.cards}>
              <li>
                <h3 className="h3" style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <CalendarBlank size={22} aria-hidden="true" /> Última edición
                </h3>
                <p>
                  {FORUM.date} · {FORUM.venue}
                </p>
              </li>
              <li>
                <h3 className="h3" style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <MapPin size={22} aria-hidden="true" /> Dirigido a
                </h3>
                <p>Gremios, sector empresarial, grandes consumidores, organismos internacionales, sector público, medios y academia.</p>
              </li>
            </ul>
            <h3 className="h3">Ejes temáticos</h3>
            <ul className={s.axes}>
              {FORUM.axes.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <p>
              <a className="btn btn--dark" href={FORUM.url} target="_blank" rel="noopener noreferrer" style={{ marginTop: 16 }}>
                Visitar foroenergias.org <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
