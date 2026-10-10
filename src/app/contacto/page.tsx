import type { Metadata } from "next";
import { EnvelopeSimple, MapPin, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { QuoteForm } from "@/components/QuoteForm";
import s from "@/components/inner.module.css";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Cotiza tu sistema de energía solar con Sinergia en Montería. WhatsApp, teléfonos y dirección.",
  alternates: { canonical: "/contacto" },
};

export default function ContactPage() {
  const mapQuery = encodeURIComponent(`${SITE.address.street}, ${SITE.address.city}, ${SITE.address.country}`);
  return (
    <>
      <section className={s.pageHead}>
        <div className="container">
          <h1 className="h1" data-split>Hablemos de tu proyecto solar.</h1>
          <p className="lead">Escríbenos y agendamos una visita técnica sin costo.</p>
        </div>
      </section>
      <section style={{ paddingBottom: "var(--section)" }}>
        <div className={`container ${s.split}`}>
          <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
            <ul className={s.cards}>
              <li>
                <h2 className="h3" style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <WhatsappLogo size={22} aria-hidden="true" /> WhatsApp
                </h2>
                <a href={whatsappUrl(SITE.whatsapp, "Hola Sinergia, quiero una cotización solar.")} target="_blank" rel="noopener noreferrer">
                  {SITE.whatsapp}
                </a>
              </li>
              <li>
                <h2 className="h3" style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <Phone size={22} aria-hidden="true" /> Asesores
                </h2>
                {SITE.phones.map((p, i) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, "")}`}>
                    <strong style={{ fontWeight: 500, color: "var(--brand-ink)" }}>Asesor {i + 1}</strong> · {p}
                  </a>
                ))}
              </li>
              <li>
                <h2 className="h3" style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <EnvelopeSimple size={22} aria-hidden="true" /> Correo
                </h2>
                <a href={`mailto:${SITE.emails.comercial}`}>{SITE.emails.comercial}</a>
                <a href={`mailto:${SITE.emails.gerencia}`}>{SITE.emails.gerencia}</a>
              </li>
              <li>
                <h2 className="h3" style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <MapPin size={22} aria-hidden="true" /> Oficina
                </h2>
                <p>
                  {SITE.address.street}, {SITE.address.city}, {SITE.address.region}
                </p>
                <a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noopener noreferrer">
                  Abrir en Google Maps
                </a>
              </li>
            </ul>
          </div>
          <div style={{ background: "var(--surface)", borderRadius: "var(--r-lg)", padding: "clamp(24px, 4vw, 44px)", boxShadow: "var(--shadow)", height: "fit-content" }}>
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
