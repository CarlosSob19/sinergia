import styles from "./EnergyFlow.module.css";

/**
 * Diagrama vivo del sistema: paneles → inversor → tu casa, con el excedente
 * hacia la red. La energía fluye más rápido cuanto más grande es el sistema.
 */
export function EnergyFlow({ kwp }: { kwp: number }) {
  const speed = Math.max(0.5, 2.6 - kwp * 0.12);
  return (
    <figure className={styles.flow} style={{ ["--flow" as string]: `${speed}s` }} aria-label={`Flujo de energía de un sistema de ${kwp} kWp`}>
      <svg viewBox="0 0 360 120" aria-hidden="true">
        <path d="M 52 50 H 150" className={styles.wire} />
        <path d="M 52 50 H 150" className={styles.pulse} />
        <path d="M 210 50 H 300" className={styles.wire} />
        <path d="M 210 50 H 300" className={styles.pulse} />
        <path d="M 180 74 V 102 H 300" className={styles.wire} />
        <path d="M 180 74 V 102 H 300" className={`${styles.pulse} ${styles.slow}`} />

        {/* Paneles */}
        <g transform="translate(10 26)">
          <rect width="42" height="48" rx="4" className={styles.node} />
          <path d="M 4 16 H 38 M 4 32 H 38 M 21 4 V 44" className={styles.grid} />
        </g>
        {/* Inversor */}
        <g transform="translate(150 26)">
          <rect width="60" height="48" rx="8" className={styles.node} />
          <path d="M 14 30 q 8 -14 16 0 t 16 0" className={styles.wave} />
        </g>
        {/* Casa */}
        <g transform="translate(300 24)">
          <path d="M 4 26 L 26 6 L 48 26 V 52 H 4 Z" className={styles.node} />
          <rect x="20" y="34" width="12" height="18" className={styles.door} />
        </g>
        {/* Red */}
        <g transform="translate(300 90)">
          <path d="M 10 24 L 24 0 L 38 24 M 14 16 H 34" className={styles.tower} />
        </g>
      </svg>
      <figcaption className={styles.labels}>
        <span>Paneles</span>
        <span>Inversor</span>
        <span>Tu casa · Red</span>
      </figcaption>
    </figure>
  );
}
