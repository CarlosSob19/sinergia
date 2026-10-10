import Link from "next/link";
import { FacebookLogo, InstagramLogo, XLogo } from "@phosphor-icons/react/dist/ssr";
import { FooterContact } from "./FooterContact";
import { Logo } from "./Logo";
import { NAV, SITE } from "@/content/site";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <FooterContact />

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
        {"Sinergia".split("").map((ch, i) => (
          <span key={i}>{ch}</span>
        ))}
      </p>

      <div className={`container ${styles.legal}`}>
        <p>© {new Date().getFullYear()} Sinergia Energy · Montería, Colombia</p>
        <Link href="/privacidad">Política de privacidad</Link>
      </div>
    </footer>
  );
}
