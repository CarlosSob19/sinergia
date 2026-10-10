import { Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

const WA_TEXT = "Hola Sinergia, quiero información sobre energía solar.";

/**
 * Contacto siempre a mano: en escritorio una burbuja de WhatsApp; en móvil una
 * barra inferior con Llamar y WhatsApp al alcance del pulgar.
 */
export function WhatsAppFloat() {
  return (
    <>
      <a href={whatsappUrl(SITE.whatsapp, WA_TEXT)} target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por WhatsApp" className="wa-float">
        <WhatsappLogo size={30} weight="fill" aria-hidden="true" />
      </a>
      <nav className="mobile-dock" aria-label="Contacto rápido">
        <a href={`tel:${SITE.phones[0].replace(/\s/g, "")}`} className="mobile-dock__call">
          <Phone size={20} weight="fill" aria-hidden="true" />
          Llamar
        </a>
        <a href={whatsappUrl(SITE.whatsapp, WA_TEXT)} target="_blank" rel="noopener noreferrer" className="mobile-dock__wa">
          <WhatsappLogo size={22} weight="fill" aria-hidden="true" />
          WhatsApp
        </a>
      </nav>
    </>
  );
}
