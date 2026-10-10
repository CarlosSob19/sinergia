"use client";

import { useId, useMemo, useState } from "react";
import { ArrowRight, Info, Leaf, Lightning, SolarPanel, Timer, TrendUp } from "@phosphor-icons/react/dist/ssr";
import { CITIES, SEGMENT_LABEL, estimateSavings, findCity, formatCop, validateBill, type Segment } from "@/lib/solar";
import { whatsappUrl } from "@/lib/whatsapp";
import { SITE } from "@/content/site";
import { AnimatedNumber } from "./AnimatedNumber";
import { EnergyFlow } from "./EnergyFlow";
import styles from "./SavingsCalculator.module.css";

const fmtCop = (n: number) => formatCop(n);
const fmtInt = (n: number) => Math.round(n).toLocaleString("es-CO");
const fmtOne = (n: number) => (Math.round(n * 10) / 10).toLocaleString("es-CO");

const SEGMENTS: Segment[] = ["hogar", "empresas", "agro"];
const parseCop = (s: string) => Number(s.replace(/\D/g, "") || NaN);

export function SavingsCalculator({ defaultSegment = "hogar" }: { defaultSegment?: Segment }) {
  const id = useId();
  const [raw, setRaw] = useState("450.000");
  const [touched, setTouched] = useState(false);
  const [cityId, setCityId] = useState("monteria");
  const [segment, setSegment] = useState<Segment>(defaultSegment);

  const bill = parseCop(raw);
  const error = validateBill(bill);
  const result = useMemo(() => (error ? null : estimateSavings({ monthlyBill: bill, cityId, segment })), [bill, cityId, segment, error]);

  const onBillChange = (v: string) => {
    const n = parseCop(v);
    setRaw(Number.isFinite(n) ? n.toLocaleString("es-CO") : "");
  };

  const message = result
    ? [
        "Hola Sinergia, usé la calculadora de su página:",
        `Tipo: ${SEGMENT_LABEL[segment]}`,
        `Ciudad: ${findCity(cityId).name}`,
        `Factura mensual: ${formatCop(bill)}`,
        `Sistema estimado: ${result.systemKwp} kWp (${result.panels} paneles)`,
        "Quiero una visita técnica.",
      ].join("\n")
    : "";

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()} noValidate>
        <fieldset className={styles.segments}>
          <legend>¿Para dónde es el sistema?</legend>
          <div className={styles.seg}>
            <span
              className={styles.thumb}
              aria-hidden="true"
              style={{ transform: `translateX(calc(${SEGMENTS.indexOf(segment)} * (100% + 6px)))` }}
            />
            {SEGMENTS.map((s) => (
              <label key={s} data-checked={segment === s}>
                <input type="radio" name={`${id}-seg`} value={s} checked={segment === s} onChange={() => setSegment(s)} />
                {SEGMENT_LABEL[s]}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="field">
          <label htmlFor={`${id}-bill`}>Valor de tu factura de energía al mes</label>
          <div className={styles.money}>
            <span aria-hidden="true">$</span>
            <input
              id={`${id}-bill`}
              inputMode="numeric"
              autoComplete="off"
              value={raw}
              onChange={(e) => onBillChange(e.target.value)}
              onBlur={() => setTouched(true)}
              aria-invalid={touched && !!error}
              aria-describedby={`${id}-bill-help${touched && error ? ` ${id}-bill-err` : ""}`}
            />
            <span className={styles.unit}>COP</span>
          </div>
          <p id={`${id}-bill-help`} className="help">
            Usa el promedio de tus últimas facturas.
          </p>
          {touched && error && (
            <p id={`${id}-bill-err`} className="error" role="alert">
              {error}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor={`${id}-city`}>Ciudad o municipio</label>
          <select id={`${id}-city`} value={cityId} onChange={(e) => setCityId(e.target.value)}>
            {CITIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </form>

      <div className={styles.result} aria-live="polite" aria-atomic="true">
        {result ? (
          <>
            <p className={styles.kicker}>Ahorro estimado</p>
            <p className={`${styles.big} num`}>
              <AnimatedNumber value={result.annualSavings} format={fmtCop} />
              <span className={styles.per}> al año</span>
            </p>
            <p className={styles.sub}>
              Unos <strong className="num">
                <AnimatedNumber value={result.monthlySavings} format={fmtCop} />
              </strong> menos en tu factura cada mes.
            </p>

            <EnergyFlow kwp={result.systemKwp} />

            <dl className={styles.stats}>
              <div>
                <dt>
                  <SolarPanel size={20} aria-hidden="true" /> Sistema
                </dt>
                <dd className="num">
                  <AnimatedNumber value={result.systemKwp} format={fmtOne} /> kWp · <AnimatedNumber value={result.panels} format={fmtInt} /> paneles
                </dd>
              </div>
              <div>
                <dt>
                  <Lightning size={20} aria-hidden="true" /> Consumo cubierto
                </dt>
                <dd className="num">
                  <AnimatedNumber value={result.monthlyKwh} format={fmtInt} /> kWh/mes
                </dd>
              </div>
              <div>
                <dt>
                  <Timer size={20} aria-hidden="true" /> Retorno
                </dt>
                <dd className="num">
                  ≈ <AnimatedNumber value={result.paybackYears} format={fmtOne} /> años
                </dd>
              </div>
              <div>
                <dt>
                  <Leaf size={20} aria-hidden="true" /> CO₂ evitado
                </dt>
                <dd className="num">
                  <AnimatedNumber value={result.co2KgPerYear} format={fmtInt} /> kg/año
                </dd>
              </div>
              <div className={styles.wide}>
                <dt>
                  <TrendUp size={20} aria-hidden="true" /> Inversión aproximada
                </dt>
                <dd className="num">
                  <AnimatedNumber value={result.estimatedCost} format={fmtCop} />
                </dd>
              </div>
            </dl>

            <a className="btn btn--block" data-magnetic href={whatsappUrl(SITE.whatsapp, message)} target="_blank" rel="noopener noreferrer">
              Pedir visita técnica gratis
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </>
        ) : (
          <p className={styles.empty}>Escribe el valor de tu factura para ver tu ahorro estimado.</p>
        )}
        <p className={styles.note}>
          <Info size={16} aria-hidden="true" />
          Estimación orientativa con tarifas y radiación promedio. La cifra exacta sale de la visita técnica.
        </p>
      </div>
    </div>
  );
}
