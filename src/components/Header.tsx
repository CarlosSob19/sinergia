"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { List, X, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "./Logo";
import { NAV, SITE } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import styles from "./Header.module.css";

// Páginas que abren con una foto a sangre bajo el header.
const HERO_ROUTES = ["/", "/soluciones/", "/foro"];

export function Header() {
  const pathname = usePathname();
  const overHero = HERO_ROUTES.some((r) => (r === "/" ? pathname === "/" : pathname.startsWith(r)));
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // El scroll suave seguiría moviendo la página detrás del menú: se detiene mientras está abierto.
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    document.documentElement.dataset.menu = "open";
    return () => {
      delete document.documentElement.dataset.menu;
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [open]);

  const transparent = overHero && !scrolled && !open;

  return (
    <>
    <header className={styles.header} data-transparent={transparent} data-open={open}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.brand} aria-label="Sinergia Energía Solar, inicio">
          <Logo tone={transparent || open ? "light" : "brand"} />
        </Link>

        <nav aria-label="Principal" className={styles.nav}>
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={pathname.startsWith(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          className={`btn ${styles.cta}`}
          href={whatsappUrl(SITE.whatsapp, "Hola Sinergia, quiero una cotización solar.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsappLogo size={20} weight="fill" aria-hidden="true" />
          Cotizar gratis
        </a>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} aria-hidden="true" /> : <List size={26} aria-hidden="true" />}
        </button>
      </div>
    </header>

    {/* Fuera del <header>: en Safari un ancestro con backdrop-filter atrapa a los
        elementos position:fixed y el panel quedaba encerrado en los 72 px del header. */}
    <div id="menu-movil" className={styles.sheet} hidden={!open} data-lenis-prevent>
        <nav aria-label="Móvil" className="container">
          <ul>
            {NAV.map((item, i) => (
              <li key={item.href} style={{ ["--i" as string]: i }}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li style={{ ["--i" as string]: NAV.length }}>
              <Link href="/contacto">Contacto</Link>
            </li>
          </ul>
          <a className="btn btn--block" href={whatsappUrl(SITE.whatsapp, "Hola Sinergia, quiero una cotización solar.")} target="_blank" rel="noopener noreferrer">
            <WhatsappLogo size={20} weight="fill" aria-hidden="true" />
            Cotizar por WhatsApp
          </a>
        </nav>
    </div>
    </>
  );
}
