import { SEGMENT_LABEL, type Segment } from "./solar";

export function whatsappUrl(phone: string, text: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export interface QuoteFields {
  name: string;
  city: string;
  segment: Segment;
  bill: string;
  message: string;
}

const clip = (s: string, max: number) => s.trim().slice(0, max);

export function buildQuoteMessage(f: QuoteFields): string {
  const lines = ["Hola Sinergia, quiero una cotización solar."];
  if (f.name.trim()) lines.push(`Nombre: ${clip(f.name, 80)}`);
  if (f.city.trim()) lines.push(`Ciudad: ${clip(f.city, 60)}`);
  lines.push(`Tipo: ${SEGMENT_LABEL[f.segment] ?? SEGMENT_LABEL.hogar}`);
  if (f.bill.trim()) lines.push(`Factura mensual: ${clip(f.bill, 20)}`);
  if (f.message.trim()) lines.push(`Mensaje: ${clip(f.message, 600)}`);
  return lines.join("\n");
}
