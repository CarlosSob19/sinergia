"use client";

import { useId, useState, type FormEvent } from "react";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/content/site";
import { SEGMENT_LABEL, type Segment } from "@/lib/solar";
import { buildQuoteMessage, whatsappUrl } from "@/lib/whatsapp";
import styles from "./QuoteForm.module.css";

/** No envía datos a ningún servidor: arma el mensaje y abre WhatsApp. */
export function QuoteForm() {
  const id = useId();
  const [nameError, setNameError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "");
    const name = get("name").trim();
    if (!name) {
      setNameError("Escribe tu nombre para saber cómo dirigirnos a ti.");
      document.getElementById(`${id}-name`)?.focus();
      return;
    }
    setNameError(null);
    const text = buildQuoteMessage({
      name,
      city: get("city"),
      segment: (get("segment") as Segment) || "hogar",
      bill: get("bill"),
      message: get("message"),
    });
    window.open(whatsappUrl(SITE.whatsapp, text), "_blank", "noopener,noreferrer");
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor={`${id}-name`}>
          Nombre <span aria-hidden="true">*</span>
        </label>
        <input
          id={`${id}-name`}
          name="name"
          autoComplete="name"
          maxLength={80}
          required
          aria-invalid={!!nameError}
          aria-describedby={nameError ? `${id}-name-err` : undefined}
        />
        {nameError && (
          <p id={`${id}-name-err`} className="error" role="alert">
            {nameError}
          </p>
        )}
      </div>
      <div className={styles.row}>
        <div className="field">
          <label htmlFor={`${id}-city`}>Ciudad o municipio</label>
          <input id={`${id}-city`} name="city" autoComplete="address-level2" maxLength={60} placeholder="Montería" />
        </div>
        <div className="field">
          <label htmlFor={`${id}-segment`}>Tipo de proyecto</label>
          <select id={`${id}-segment`} name="segment" defaultValue="hogar">
            {(Object.keys(SEGMENT_LABEL) as Segment[]).map((s) => (
              <option key={s} value={s}>
                {SEGMENT_LABEL[s]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor={`${id}-bill`}>Factura de energía mensual (opcional)</label>
        <input id={`${id}-bill`} name="bill" inputMode="numeric" maxLength={20} placeholder="$ 450.000" />
      </div>
      <div className="field">
        <label htmlFor={`${id}-msg`}>Cuéntanos tu proyecto (opcional)</label>
        <textarea id={`${id}-msg`} name="message" maxLength={600} />
      </div>
      <button type="submit" className="btn btn--block">
        <WhatsappLogo size={20} weight="fill" aria-hidden="true" />
        Enviar por WhatsApp
      </button>
      <p className={styles.note}>
        Se abrirá WhatsApp con tu mensaje listo. Esta página no guarda tus datos. Consulta nuestra{" "}
        <a href="/privacidad">política de privacidad</a>.
      </p>
    </form>
  );
}
