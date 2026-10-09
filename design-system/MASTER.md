# Sinergia — Design System (MASTER)

Fuente de verdad visual. Las páginas pueden tener overrides en `design-system/pages/<pagina>.md`.

> Origen: búsqueda en ui-ux-pro-max (patrón "Trust & Authority + Conversion", paleta "Sky blue + sun amber", tipografía "Startup Bold"). Se descartó el resultado automático ("Organic Biophilic", verde + Syncopate/Space Mono) por ser el cliché verde-hojita y por la mala legibilidad de una mono como texto de cuerpo.

## Concepto
**"Luz de mediodía sobre techo."** Técnico, confiable, cálido. Cielo profundo + sol ámbar + papel cálido. El verde solo como color semántico (éxito/ahorro), nunca como marca.

## Patrón
Trust & Authority + Conversion: Hero (promesa + CTA) → Prueba (garantías, certificaciones, cifras reales) → Calculadora → Soluciones → Proceso → Casos → FAQ → CTA final.
Un CTA primario por vista: **«Cotizar gratis»** (WhatsApp). Secundario: «Calcula tu ahorro».

## Color (tokens en `:root`)
| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--bg` | `#FBF8F2` | `#0A1420` | Fondo (papel cálido / noche) |
| `--surface` | `#FFFFFF` | `#122033` | Tarjetas |
| `--surface-2` | `#F3EEE4` | `#18293F` | Bandas alternas |
| `--ink` | `#0E1A2B` | `#F3EFE7` | Texto principal |
| `--ink-muted` | `#4A5568` | `#A9B4C2` | Texto secundario (≥4.5:1) |
| `--sky` | `#0B3B5C` | `#7CC4F0` | Marca primaria, enlaces, títulos de acento |
| `--sky-deep` | `#072A42` | `#0A1420` | Hero y bandas oscuras |
| `--sun` | `#F5A524` | `#F5B544` | CTA y acento (texto encima = `--ink`) |
| `--sun-soft` | `#FDF0D5` | `#2A2414` | Fondos de resaltado |
| `--saving` | `#127A4B` | `#4ADE9A` | Solo cifras de ahorro / éxito (con ícono, nunca solo color) |
| `--line` | `#E4DCCD` | `#22344D` | Bordes y divisores |
| `--danger` | `#B42318` | `#F97066` | Errores de formulario |
| `--ring` | `#0B3B5C` | `#F5B544` | Foco (3px, offset 2px) |

Contrastes clave: ink/bg ≈ 16:1 · ink-muted/bg ≈ 7:1 · ink/sun ≈ 8.5:1 · bg/sky-deep ≈ 13:1.
Prohibido: texto blanco sobre `--sun` (no pasa AA).

## Tipografía
- Títulos: **Outfit** 600/700, tracking −0.02em, `text-wrap: balance`
- Cuerpo: **Rubik** 400/500, 17px base, line-height 1.6, máx. 68ch
- Cifras (calculadora, estadísticas): `font-variant-numeric: tabular-nums`
- Escala (clamp, mobile→desktop): display 40→72 · h1 34→56 · h2 28→40 · h3 20→24 · body 17 · small 14 · label 13 (500, mayúsculas, +0.08em)
- Carga con `next/font/google` (display: swap, solo pesos usados)

## Espaciado y layout
- Escala 4pt: 4 8 12 16 24 32 48 64 96 128 (densidad baja: secciones 96–128 en desktop, 64 en móvil)
- Contenedor 1200px, gutter 16px móvil / 32px desktop
- Breakpoints: 375 · 768 · 1024 · 1440
- Radios: 8 (inputs/botones) · 16 (tarjetas) · 28 (media destacada) · 999 (pills)
- Sombra única de elevación: `0 1px 2px rgb(14 26 43 / .06), 0 8px 24px rgb(14 26 43 / .08)`
- z-index: base 0 · sticky nav 40 · WhatsApp flotante 50 · modal 100

## Componentes
- **Botón primario**: fondo `--sun`, texto `--ink`, 48px alto, radio 8, hover oscurece 6%, press scale .98
- **Botón secundario**: borde 1.5px `--ink`, transparente
- **Tarjeta de solución**: surface, radio 16, ícono Phosphor 32px en círculo `--sun-soft`, título, 2 líneas, enlace «Ver solución →»
- **Stat**: número grande Outfit tabular + label; solo cifras reales (placeholder visible `—` si falta)
- **Calculadora**: inputs con label visible, ayuda debajo, error con `aria-describedby`; resultado en tarjeta `--sky-deep` con cifras en `--sun`; región `aria-live="polite"`
- **Acordeón FAQ**: `<details>/<summary>` nativo estilizado
- **Badge de confianza**: ícono + texto (garantía, RETIE, Ley 1715)
- **WhatsApp flotante**: 56px, esquina inferior derecha, `aria-label`, respeta safe-area

## Iconos
Phosphor (`@phosphor-icons/react`), peso `regular`, 24px por defecto; decorativos con `aria-hidden`. Nunca emoji.
Sugeridos: SolarPanel, Sun, Lightning, HouseLine, Buildings, Plant/Tractor, Drop (bombeo), ShieldCheck, Certificate, ChartLineUp, Wrench, CalendarCheck, WhatsappLogo.

## Movimiento
- Tokens: rápido 150ms · base 240ms · revelado 450ms; ease `cubic-bezier(.22,1,.36,1)`; salida = 65% de la entrada
- Revelados al hacer scroll (opacity + translateY 16px), stagger 50ms; contador de ahorro animado una vez
- Solo transform/opacity; `prefers-reduced-motion` → estado final inmediato

## Imágenes
Fotos de techos/instalaciones con luz cálida. Generadas con la IA local (C:\IA) o stock libre, marcadas `TODO-FOTO-REAL`; nunca presentadas como proyectos reales de Sinergia. AVIF/WebP, `next/image` con width/height.

## Anti-patrones
Greenwashing, hojas y globos terráqueos de stock, cifras inventadas, gradientes arcoíris, texto blanco sobre ámbar, iconos emoji, carruseles automáticos sin pausa.
