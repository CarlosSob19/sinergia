import Link from "next/link";
import { EnvelopeSimple, FacebookLogo, InstagramLogo, MapPin, Phone, XLogo } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "./Logo";
import { NAV, SITE } from "@/content/site";
import styles from "./Footer.module.css";

const tel = (p: string) => `tel:${p.replace(/\s/g, "")}`;

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.about}>
          <Logo tone="light" />
          <p>{SITE.description}</p>
          <p className={styles.tagline}>{SITE.tagline}.</p>
        </div>

        <nav aria-label="Pie de página">
          <h2 className={styles.h}>Sitio</h2>
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/contacto">Contacto</Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className={styles.h}>Contacto</h2>
          <ul>
            <li className={styles.row}>
              <MapPin size={18} aria-hidden="true" />
              <span>
                {SITE.address.street}
                <br />
                {SITE.address.city}, {SITE.address.region}
              </span>
            </li>
            {SITE.phones.slice(0, 2).map((p) => (
              <li key={p} className={styles.row}>
                <Phone size={18} aria-hidden="true" />
                <a href={tel(p)}>{p}</a>
              </li>
            ))}
            <li className={styles.row}>
              <EnvelopeSimple size={18} aria-hidden="true" />
              <a href={`mailto:${SITE.emails.comercial}`}>{SITE.emails.comercial}</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className={styles.h}>Síguenos</h2>
          <ul className={styles.social}>
            <li>
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Sinergia">
                <InstagramLogo size={22} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook de Sinergia">
                <FacebookLogo size={22} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={SITE.social.x} target="_blank" rel="noopener noreferrer" aria-label="X de Sinergia">
                <XLogo size={22} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className={styles.wordmark} aria-hidden="true" data-rise>
        Sinergia
      </p>

      <div className={`container ${styles.legal}`}>
        <p>© {new Date().getFullYear()} Sinergia Energy · Montería, Colombia</p>
        <Link href="/privacidad">Política de privacidad</Link>
      </div>
    </footer>
  );
}
