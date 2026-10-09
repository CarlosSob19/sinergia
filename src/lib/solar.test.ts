import { describe, expect, it } from "vitest";
import { CITIES, estimateSavings, validateBill } from "./solar";

describe("estimateSavings", () => {
  it("dimensiona un sistema residencial en Bogotá a partir de la factura", () => {
    const r = estimateSavings({ monthlyBill: 400_000, cityId: "bogota", segment: "hogar" });
    expect(r.monthlyKwh).toBe(444);
    expect(r.systemKwp).toBe(4.6);
    expect(r.panels).toBe(9);
    expect(r.estimatedCost).toBe(19_320_000);
    expect(r.monthlySavings).toBe(360_000);
    expect(r.annualSavings).toBe(4_320_000);
    expect(r.paybackYears).toBe(4.5);
    expect(r.co2KgPerYear).toBe(672);
  });

  it("una ciudad con más sol necesita un sistema más pequeño para la misma factura", () => {
    const bogota = estimateSavings({ monthlyBill: 400_000, cityId: "bogota", segment: "hogar" });
    const barranquilla = estimateSavings({ monthlyBill: 400_000, cityId: "barranquilla", segment: "hogar" });
    expect(barranquilla.systemKwp).toBeLessThan(bogota.systemKwp);
  });

  it("el doble de factura da aproximadamente el doble de sistema", () => {
    const a = estimateSavings({ monthlyBill: 400_000, cityId: "medellin", segment: "hogar" });
    const b = estimateSavings({ monthlyBill: 800_000, cityId: "medellin", segment: "hogar" });
    expect(b.systemKwp).toBeCloseTo(a.systemKwp * 2, 0);
  });

  it("empresas pagan una tarifa mayor por kWh, así que el mismo valor equivale a menos consumo", () => {
    const hogar = estimateSavings({ monthlyBill: 2_000_000, cityId: "cali", segment: "hogar" });
    const empresa = estimateSavings({ monthlyBill: 2_000_000, cityId: "cali", segment: "empresas" });
    expect(empresa.monthlyKwh).toBeLessThan(hogar.monthlyKwh);
  });

  it("usa valores por defecto si la ciudad no existe", () => {
    const r = estimateSavings({ monthlyBill: 400_000, cityId: "no-existe", segment: "hogar" });
    expect(Number.isFinite(r.systemKwp)).toBe(true);
    expect(r.systemKwp).toBeGreaterThan(0);
  });

  it("nunca devuelve menos de un panel", () => {
    const r = estimateSavings({ monthlyBill: 50_000, cityId: "barranquilla", segment: "hogar" });
    expect(r.panels).toBeGreaterThanOrEqual(1);
  });

  it("rechaza facturas inválidas", () => {
    for (const bad of [0, -1, Number.NaN, Number.POSITIVE_INFINITY, 1e12]) {
      expect(() => estimateSavings({ monthlyBill: bad, cityId: "bogota", segment: "hogar" })).toThrow();
    }
  });

  it("todas las ciudades tienen datos positivos", () => {
    for (const c of CITIES) {
      expect(c.tariff).toBeGreaterThan(0);
      expect(c.sunHours).toBeGreaterThan(0);
    }
  });
});

describe("validateBill", () => {
  it("acepta un valor razonable", () => {
    expect(validateBill(350_000)).toBeNull();
  });
  it("explica cómo corregir un valor vacío o en cero", () => {
    expect(validateBill(0)).toMatch(/valor/i);
    expect(validateBill(Number.NaN)).toMatch(/valor/i);
  });
  it("rechaza facturas por debajo del mínimo", () => {
    expect(validateBill(20_000)).toMatch(/mínimo/i);
  });
  it("rechaza facturas absurdamente altas", () => {
    expect(validateBill(1e12)).toMatch(/máximo/i);
  });
});
