// Calculadora de ahorro solar. Estimación orientativa, no reemplaza la visita técnica.
// TODO-DATO-REAL: tarifas, HSP y precios por Wp deben confirmarse con Sinergia.

export type Segment = "hogar" | "empresas" | "agro";

export interface City {
  id: string;
  name: string;
  /** Tarifa residencial aproximada, COP por kWh. */
  tariff: number;
  /** Horas de sol pico promedio por día. */
  sunHours: number;
}

export const CITIES: City[] = [
  { id: "monteria", name: "Montería", tariff: 940, sunHours: 5.0 },
  { id: "cerete", name: "Cereté", tariff: 940, sunHours: 5.0 },
  { id: "lorica", name: "Lorica", tariff: 940, sunHours: 5.1 },
  { id: "sahagun", name: "Sahagún", tariff: 940, sunHours: 5.0 },
  { id: "planeta-rica", name: "Planeta Rica", tariff: 940, sunHours: 4.9 },
  { id: "sincelejo", name: "Sincelejo", tariff: 940, sunHours: 5.1 },
  { id: "bogota", name: "Bogotá", tariff: 900, sunHours: 4.0 },
  { id: "medellin", name: "Medellín", tariff: 880, sunHours: 4.5 },
  { id: "cali", name: "Cali", tariff: 870, sunHours: 4.6 },
  { id: "barranquilla", name: "Barranquilla", tariff: 950, sunHours: 5.5 },
  { id: "cartagena", name: "Cartagena", tariff: 950, sunHours: 5.4 },
  { id: "bucaramanga", name: "Bucaramanga", tariff: 890, sunHours: 4.8 },
  { id: "otra", name: "Otra ciudad", tariff: 900, sunHours: 4.5 },
];

const DEFAULT_CITY = CITIES[CITIES.length - 1];

/** Comercio e industria pagan contribución sobre la tarifa. */
const TARIFF_FACTOR: Record<Segment, number> = { hogar: 1, empresas: 1.2, agro: 1 };
/** Precio instalado aproximado, COP por Wp. */
const COST_PER_WP: Record<Segment, number> = { hogar: 4200, empresas: 3600, agro: 4000 };

export const SEGMENT_LABEL: Record<Segment, string> = {
  hogar: "Hogar",
  empresas: "Empresa / comercio",
  agro: "Finca / agro",
};

const PERFORMANCE_RATIO = 0.8;
const PANEL_WATTS = 550;
/** Parte de la factura que se puede compensar (cargos fijos y comercialización no). */
const SAVINGS_SHARE = 0.9;
/** Factor de emisión de la red colombiana, kg CO₂ por kWh (verificar con la UPME). */
const GRID_CO2_KG_PER_KWH = 0.126;

export const MIN_BILL = 30_000;
export const MAX_BILL = 500_000_000;

export interface SavingsInput {
  monthlyBill: number;
  cityId: string;
  segment: Segment;
}

export interface SavingsResult {
  monthlyKwh: number;
  systemKwp: number;
  panels: number;
  estimatedCost: number;
  monthlySavings: number;
  annualSavings: number;
  paybackYears: number;
  co2KgPerYear: number;
}

export const formatCop = (n: number) => `$${Math.round(n).toLocaleString("es-CO")}`;

export function validateBill(bill: number): string | null {
  if (!Number.isFinite(bill) || bill <= 0) return "Ingresa el valor de tu factura mensual en pesos.";
  if (bill < MIN_BILL) return `El valor mínimo para calcular es ${formatCop(MIN_BILL)}.`;
  if (bill > MAX_BILL) return `El valor máximo para calcular es ${formatCop(MAX_BILL)}. Para consumos mayores, escríbenos.`;
  return null;
}

export function findCity(cityId: string): City {
  return CITIES.find((c) => c.id === cityId) ?? DEFAULT_CITY;
}

export function estimateSavings({ monthlyBill, cityId, segment }: SavingsInput): SavingsResult {
  const error = validateBill(monthlyBill);
  if (error) throw new RangeError(error);

  const city = findCity(cityId);
  const kwh = monthlyBill / (city.tariff * (TARIFF_FACTOR[segment] ?? 1));
  const systemKwp = Math.max(0.6, Math.round((kwh / (city.sunHours * 30 * PERFORMANCE_RATIO)) * 10) / 10);
  const panels = Math.max(1, Math.ceil((systemKwp * 1000) / PANEL_WATTS));
  const estimatedCost = Math.round(systemKwp * 1000 * (COST_PER_WP[segment] ?? COST_PER_WP.hogar));
  const monthlySavings = Math.round(monthlyBill * SAVINGS_SHARE);
  const annualSavings = monthlySavings * 12;

  return {
    monthlyKwh: Math.round(kwh),
    systemKwp,
    panels,
    estimatedCost,
    monthlySavings,
    annualSavings,
    paybackYears: Math.round((estimatedCost / annualSavings) * 10) / 10,
    co2KgPerYear: Math.round(kwh * 12 * GRID_CO2_KG_PER_KWH),
  };
}
