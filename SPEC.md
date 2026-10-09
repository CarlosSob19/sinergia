# Sinergia — Energía Solar · Especificación del sitio

Estado: **borrador para aprobación** · 2026-10-09

## 1. Objetivo
Sitio web que convierta visitas en **solicitudes de cotización** (WhatsApp + formulario) para una empresa de instalación de energía solar en Colombia. El visitante debe entender en 10 segundos: cuánto puede ahorrar, que la empresa es confiable y cómo pedir una cotización.

Modo de diseño (impeccable): **Persuade**.

## 2. Enfoques considerados
| Opción | Qué es | Pros | Contras |
|---|---|---|---|
| **A. Landing de conversión + páginas por segmento** (recomendada) | Inicio largo y persuasivo + `/hogar`, `/empresas`, `/agro`, `/proyectos`, `/contacto` | SEO por segmento, mensaje específico por cliente, crece sin rehacer | Más contenido que escribir |
| B. Landing única | Todo en una página | Rápida de hacer y de lanzar | Poco SEO, un solo mensaje para todos |
| C. Sitio + cotizador avanzado | A + cotizador con mapa/irradiación por ciudad y PDF | Diferenciador fuerte | Mucho más tiempo; requiere datos técnicos reales |

**Recomendación: A**, con una calculadora de ahorro simple (no la C completa); la C puede venir después.

## 3. Decisiones (supuestos a confirmar)
| Tema | Decisión |
|---|---|
| Stack | Next.js 16 (App Router) + React 19 + TypeScript + CSS Modules/variables + Vitest + Phosphor — igual que Ortodoncia; despliegue en Vercel; sin backend |
| País / moneda | Colombia · COP · tarifas en $/kWh — `TODO-DATO-REAL` |
| Segmentos | Hogares, Empresas/Comercio, Fincas/Agro (bombeo solar) — `TODO-CONFIRMAR` |
| Contacto | WhatsApp, teléfono, correo, ciudad — placeholders `TODO-DATO-REAL` |
| Formulario | Abre WhatsApp con mensaje prellenado (sin servidor, sin guardar datos personales) |
| Imágenes | Generadas con la IA local (C:\IA, SDXL) o stock libre, **marcadas `TODO-FOTO-REAL`**; nunca presentadas como proyectos reales |
| Cifras | Nada de "+500 proyectos" inventados: placeholders visibles hasta tener datos reales |

## 4. Mapa del sitio
- `/` Inicio
- `/hogar`, `/empresas`, `/agro` — misma plantilla, contenido desde `content/segments.ts`
- `/proyectos` — galería de casos (`content/projects.ts`)
- `/contacto`

## 5. Inicio
1. **Navegación**: logo, Soluciones (Hogar · Empresas · Agro), Proyectos, Contacto, CTA «Cotizar gratis».
2. **Hero**: titular grande («Tu techo ya produce energía. Empieza a cobrarla.»), subtítulo, CTA WhatsApp + CTA «Calcula tu ahorro»; foto de instalación.
3. **Franja de confianza**: garantías (paneles 25 años, inversor 10), certificaciones RETIE, beneficios tributarios Ley 1715 — `TODO-CONFIRMAR`.
4. **Calculadora de ahorro**: factura mensual (COP) + ciudad + tipo de cliente → kWp sugeridos, n.º de paneles, ahorro mensual/anual, retorno estimado, CO₂ evitado. Con aviso «estimación, no cotización».
5. **Soluciones por segmento**: 3 tarjetas → páginas de segmento.
6. **Cómo funciona**: 4 pasos (visita técnica → diseño → instalación y trámite con el operador de red → monitoreo).
7. **Beneficios Ley 1715**: deducción de renta, IVA y aranceles, depreciación acelerada (texto revisado, con enlace a la fuente oficial).
8. **Proyectos**: 3 casos destacados (placeholders).
9. **Financiación**: opciones de pago — `TODO-DATO-REAL`.
10. **Preguntas frecuentes**: acordeón accesible.
11. **CTA final** + formulario → WhatsApp.
12. **Footer** + botón flotante de WhatsApp.

## 6. Lógica de la calculadora (`lib/solar.ts`, pura y testeada)
- consumo kWh/mes = factura ÷ tarifa ($/kWh por ciudad o el valor por defecto)
- HSP (horas de sol pico) por ciudad, valor por defecto 4,5
- kWp = consumo ÷ (HSP × 30 × rendimiento 0,8), redondeado a 0,1
- paneles = ⌈kWp × 1000 ÷ potencia del panel (550 W)⌉
- costo estimado = kWp × $/Wp por segmento — `TODO-DATO-REAL`
- retorno (años) = costo ÷ ahorro anual · CO₂ = kWh × factor de emisiones de Colombia (~0,126 kg/kWh, a verificar)
- Validación: factura > 0, límites razonables, sin NaN/Infinity

## 7. Sistema visual
Definido en `design-system/MASTER.md`: cielo profundo `#0B3B5C` + sol ámbar `#F5A524` (CTA) + papel cálido `#FBF8F2`; Outfit (títulos) + Rubik (cuerpo); íconos Phosphor; modo oscuro incluido.

## 8. Criterios de aceptación
- Lighthouse móvil ≥ 90 (Performance, Accesibilidad, SEO)
- Contraste AA, teclado completo, alt en imágenes, sin scroll horizontal a 375 px
- Tests de Vitest en verde para `lib/solar.ts`
- Metadatos SEO + Open Graph por página; JSON-LD `LocalBusiness`

## 9. Plan de implementación (siguiendo el flujo de skills)
1. /ui-ux-pro-max → paleta, tipografía, tokens
2. Scaffold de Next.js + estructura `content/` y `lib/`
3. /test-driven-development → `lib/solar.ts` (tests primero), luego la UI de la calculadora
4. Inicio sección por sección → páginas de segmento → proyectos → contacto
5. /find-security-vulnerabilities-in-code → revisión (enlaces de WhatsApp, entradas del formulario, cabeceras)
6. /animate → movimiento
7. /test-fixing si hay fallos · /impeccable para pulir · /verify-and-stop para la verificación final
8. /git-pushing cuando tú lo indiques (la carpeta aún no es un repositorio git)

## 10. Pendiente del cliente
Nombre/logo definitivos, ciudad(es), WhatsApp/teléfono/correo, segmentos reales, tarifas y precio por Wp, fotos de proyectos reales, financiación, certificaciones.
