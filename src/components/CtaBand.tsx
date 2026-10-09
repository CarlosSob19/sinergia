import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import s from "./inner.module.css";

export function CtaBand({ title = "¿Listo para producir tu propia energía?", text = "La visita técnica no tiene costo. Te respondemos por WhatsApp." }) {
  return (
    <section className="section">
      <div className="container">
        <div className={`${s.cta} reveal`}>
          <div>
            <h2 className="h2">{title}</h2>
            <p>{text}</p>
          </div>
          <a className="btn" href={whatsappUrl(SITE.whatsapp, "Hola Sinergia, quiero una cotización solar.")} target="_blank" rel="noopener noreferrer">
            Cotizar gratis <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
