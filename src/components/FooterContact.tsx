import { ArrowUpRight, EnvelopeSimple, MapPin, NavigationArrow, Phone, UserCircle, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { MAP_DIRECTIONS, MAP_EMBED, MAP_LINK, SITE } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import s from "./FooterContact.module.css";

const tel = (p: string) => `tel:${p.replace(/\s/g, "")}`;

/**
 * Contacto en el pie: WhatsApp principal, los cuatro asesores con llamada y
 * WhatsApp directos, y la oficina con mapa y botón para llegar.
 */
export function FooterContact() {
  return (
    <section className={`container ${s.contact}`} aria-labelledby="footer-contact-title">
      <div className={s.left}>
        <h2 id="footer-contact-title" className={s.title}>
          Hablemos hoy.
        </h2>

        <a className={`${s.whatsapp} press`} href={whatsappUrl(SITE.whatsapp, "Hola Sinergia, quiero una cotización solar.")} target="_blank" rel="noopener noreferrer">
          <span className={s.waIcon}>
            <WhatsappLogo size={28} weight="fill" aria-hidden="true" />
          </span>
          <span className={s.waText}>
            <strong>Escríbenos por WhatsApp</strong>
            <span className="num">{SITE.whatsapp}</span>
          </span>
          <ArrowUpRight size={22} aria-hidden="true" className={s.waArrow} />
        </a>

        <h3 className={s.label}>Llama a un asesor</h3>
        <ul className={s.advisors}>
          {SITE.phones.map((p, i) => (
            <li key={p} className={s.advisor}>
              <span className={s.avatar} aria-hidden="true">
                <UserCircle size={26} weight="duotone" />
              </span>
              <span className={s.who}>
                <strong>Asesor {i + 1}</strong>
                <span className="num">{p}</span>
              </span>
              <span className={s.actions}>
                <a href={tel(p)} className={`${s.action} press`} aria-label={`Llamar al asesor ${i + 1}, ${p}`}>
                  <Phone size={17} weight="fill" aria-hidden="true" />
                  Llamar
                </a>
                <a
                  href={whatsappUrl(p, `Hola Asesor ${i + 1} de Sinergia, quiero información sobre energía solar.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${s.action} ${s.actionWa} press`}
                  aria-label={`Escribir por WhatsApp al asesor ${i + 1}`}
                >
                  <WhatsappLogo size={17} weight="fill" aria-hidden="true" />
                  WhatsApp
                </a>
              </span>
            </li>
          ))}
        </ul>

        <a className={s.mail} href={`mailto:${SITE.emails.comercial}`}>
          <EnvelopeSimple size={20} aria-hidden="true" />
          {SITE.emails.comercial}
        </a>
      </div>

      <div className={s.office}>
        <div className={s.officeHead}>
          <span className={s.pin} aria-hidden="true">
            <MapPin size={22} weight="fill" />
          </span>
          <div>
            <h3 className={s.label}>Visítanos</h3>
            <p className={s.address}>
              {SITE.address.street}
              <br />
              {SITE.address.city}, {SITE.address.region}
            </p>
          </div>
        </div>

        <div className={s.map}>
          <iframe
            title={`Mapa de la oficina de Sinergia: ${SITE.address.street}, ${SITE.address.city}`}
            src={MAP_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className={s.mapActions}>
          <a className="btn" href={MAP_DIRECTIONS} target="_blank" rel="noopener noreferrer">
            <NavigationArrow size={18} weight="fill" aria-hidden="true" />
            Cómo llegar
          </a>
          <a className={`btn btn--ghost ${s.ghost}`} href={MAP_LINK} target="_blank" rel="noopener noreferrer">
            Abrir en Google Maps
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
