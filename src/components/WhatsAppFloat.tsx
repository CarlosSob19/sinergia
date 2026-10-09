import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl(SITE.whatsapp, "Hola Sinergia, quiero información sobre energía solar.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      style={{
        position: "fixed",
        right: "max(16px, env(safe-area-inset-right))",
        bottom: "max(16px, env(safe-area-inset-bottom))",
        zIndex: 50,
        width: 58,
        height: 58,
        borderRadius: 999,
        display: "grid",
        placeItems: "center",
        background: "#1f9d55",
        color: "#fff",
        boxShadow: "0 8px 24px rgb(0 0 0 / 0.25)",
      }}
    >
      <WhatsappLogo size={30} weight="fill" aria-hidden="true" />
    </a>
  );
}
