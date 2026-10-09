import type { Metadata, Viewport } from "next";
import { Outfit, Rubik } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { RevealObserver } from "@/components/RevealObserver";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { MotionDirector } from "@/components/motion/MotionDirector";
import { Cursor } from "@/components/motion/Cursor";
import { Preloader } from "@/components/motion/Preloader";
import { SITE } from "@/content/site";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-outfit", display: "swap" });
const rubik = Rubik({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-rubik", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Sinergia Energía Solar | Paneles solares en Montería y Córdoba", template: "%s | Sinergia Energía Solar" },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: SITE.name,
    images: [{ url: "/img/bodega-rio-sinu.webp", width: 1600, height: 1463, alt: "Paneles solares instalados por Sinergia junto al río Sinú en Montería" }],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf8f2" },
    { media: "(prefers-color-scheme: dark)", color: "#071a20" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  telephone: SITE.phones[0],
  email: SITE.emails.comercial,
  image: `${SITE.url}/img/bodega-rio-sinu.webp`,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    addressCountry: "CO",
  },
  areaServed: ["Montería", "Córdoba", "Sucre", "Caribe colombiano"],
  sameAs: Object.values(SITE.social),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={`${outfit.variable} ${rubik.variable}`} suppressHydrationWarning>
      <head>
        {/* Marca que hay JS antes de pintar: solo entonces se ocultan los elementos que se revelan. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(d){d.classList.add('js');try{if(sessionStorage.getItem('sinergia-intro')!=='1'&&matchMedia('(prefers-reduced-motion: no-preference)').matches)d.dataset.intro='pending'}catch(e){}})(document.documentElement)",
          }}
        />
      </head>
      <body>
        <Preloader />
        <a href="#contenido" className="skip">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <RevealObserver />
        <SmoothScroll />
        <MotionDirector />
        <Cursor />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
