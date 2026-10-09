# Sinergia Energía Solar — sitio web

Rediseño de [sinergiaenergy.com](https://www.sinergiaenergy.com): empresa de energía solar en Montería, Córdoba.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- CSS Modules con tokens en `src/app/globals.css`
- GSAP 3 (ScrollTrigger, SplitText, MotionPath) + Lenis para el movimiento
- Vitest para la lógica de la calculadora y del enlace de WhatsApp
- Íconos Phosphor; fuentes Outfit y Rubik

## Comandos

```bash
npm install
npm run dev      # http://localhost:3000
npm test
npm run build
```

## Estructura

| Ruta | Qué hay |
|---|---|
| `src/app/` | Páginas: inicio, soluciones (hogar, empresas, agro), proyectos, nosotros, foro, contacto, privacidad |
| `src/components/home/` | Secciones inmersivas del inicio (hero, día de sol, cinta, soluciones horizontales, pasos apilados) |
| `src/components/motion/` | Scroll suave, sistema de animación declarativo (`data-split`, `data-parallax`, `data-stagger`, `data-count`, `data-rise`), cursor y entrada de marca |
| `src/content/site.ts` | Datos reales de la empresa, proyectos, preguntas frecuentes y foro |
| `src/lib/solar.ts` | Calculadora de ahorro (con pruebas) |
| `public/img/` | Fotos reales de proyectos de Sinergia, sin marca de agua y escaladas |
| `design-system/MASTER.md` | Sistema de diseño |
| `SPEC.md` | Especificación y criterios de aceptación |

## Pendiente de confirmar con Sinergia

Buscar `TODO-DATO-REAL` y `TODO-CONFIRMAR` en el código: tarifas, horas de sol y precio por Wp de la calculadora; potencia y año de cada proyecto; revisión legal de la política de privacidad.
