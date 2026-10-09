import { describe, expect, it } from "vitest";
import { buildQuoteMessage, whatsappUrl } from "./whatsapp";

describe("whatsappUrl", () => {
  it("arma un enlace wa.me con el número limpio y el texto codificado", () => {
    const url = whatsappUrl("+57 300 000 0000", "Hola & bienvenidos?");
    expect(url).toBe("https://wa.me/573000000000?text=Hola%20%26%20bienvenidos%3F");
  });

  it("no permite inyectar parámetros extra en la URL", () => {
    const url = new URL(whatsappUrl("573000000000", "a&phone=1#x"));
    expect(url.host).toBe("wa.me");
    expect([...url.searchParams.keys()]).toEqual(["text"]);
    expect(url.searchParams.get("text")).toBe("a&phone=1#x");
  });
});

describe("buildQuoteMessage", () => {
  it("incluye solo los campos llenos", () => {
    const msg = buildQuoteMessage({ name: "Ana", city: "Montería", segment: "hogar", bill: "", message: "" });
    expect(msg).toContain("Ana");
    expect(msg).toContain("Montería");
    expect(msg).toContain("Hogar");
    expect(msg).not.toContain("Factura");
  });

  it("recorta textos muy largos", () => {
    const msg = buildQuoteMessage({ name: "x".repeat(500), city: "", segment: "empresas", bill: "", message: "y".repeat(5000) });
    expect(msg.length).toBeLessThan(1200);
  });
});
