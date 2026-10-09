import type { PhotoKey } from "./site";

// Fotos reales de proyectos de Sinergia (galería de sinergiaenergy.com),
// sin la marca de agua y escaladas con Real-ESRGAN.
const SIZES: Partial<Record<PhotoKey, [number, number]>> = {
  "corral-ganadero": [1600, 1200],
  "patio-paneles-suelo": [1600, 1200],
  encabezado: [1600, 940],
};

export function photo(key: PhotoKey) {
  const [width, height] = SIZES[key] ?? [1600, 1463];
  return { src: `/img/${key}.webp`, width, height };
}
