import type { Metadata } from "next";
import { SITE } from "@/content/site";
import s from "@/components/inner.module.css";

export const metadata: Metadata = { title: "Política de privacidad", alternates: { canonical: "/privacidad" } };

// TODO-CONFIRMAR: revisar con el área legal de Sinergia antes de publicar.
export default function PrivacyPage() {
  return (
    <>
      <section className={s.pageHead}>
        <div className="container">
          <p className="eyebrow">Legal</p>
          <h1 className="h1">Política de privacidad</h1>
        </div>
      </section>
      <section style={{ paddingBottom: "var(--section)" }}>
        <div className={`container ${s.prose}`}>
          <p>
            Sinergia Energy ({SITE.address.street}, {SITE.address.city}) trata los datos personales conforme a la Ley 1581 de 2012 y sus decretos
            reglamentarios.
          </p>
          <h2>Qué datos recibimos</h2>
          <p>
            Este sitio no guarda datos en ningún servidor. El formulario de cotización y la calculadora arman un mensaje que tú decides enviar por WhatsApp.
            Solo recibimos los datos que nos envías por ese medio, por teléfono o por correo.
          </p>
          <h2>Para qué los usamos</h2>
          <p>Para responder tu solicitud, preparar cotizaciones, agendar visitas técnicas y hacer seguimiento a tu proyecto.</p>
          <h2>Tus derechos</h2>
          <p>
            Puedes conocer, actualizar, rectificar y pedir la supresión de tus datos escribiendo a{" "}
            <a href={`mailto:${SITE.emails.gerencia}`}>{SITE.emails.gerencia}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
