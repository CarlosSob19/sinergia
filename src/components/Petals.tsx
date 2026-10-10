import { LogoMark } from "./Logo";

/** Separador de secciones: dos líneas y el isotipo, que gira con el scroll. */
export function PetalDivider({ tone = "brand" }: { tone?: "brand" | "sun" | "light" }) {
  return (
    <div className={`petal-divider petal-divider--${tone}`} aria-hidden="true">
      <span />
      <div data-spin="180">
        <LogoMark size={34} />
      </div>
      <span />
    </div>
  );
}

/** Isotipo gigante y tenue detrás de una sección oscura; gira lento con el scroll. */
export function PetalWatermark({ side = "right" }: { side?: "left" | "right" }) {
  return (
    <div className={`petal-watermark petal-watermark--${side}`} aria-hidden="true">
      <div data-spin="120">
        <LogoMark size={720} />
      </div>
    </div>
  );
}
