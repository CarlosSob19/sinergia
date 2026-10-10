# BRIEF — Sinergia · "Un día de sol"

**Self-authored under explicit creative delegation.** El usuario pidió: "muéstramelo en otro diseño como lo harías". Restricción explícita: no generar ni recortar imágenes con la IA local (GPU ocupada); el hero en capas se resuelve con planos vectoriales y las fotos reales existentes.

## Las ocho preguntas

1. **Vibe:** cálido, técnico, caribeño, luminoso, confiable. Referencias: la luz de *Roma* (Cuarón) al amanecer, los reportes anuales de Patagonia, el reloj de sol de una plaza.
2. **Recorrido (decisión autoral):** amanece sobre Montería → lo que cuesta no aprovechar el sol → ya lo hacen tus vecinos → mediodía: calcula tu ahorro → elige tu solución → cae la tarde: por qué confiar → noche: habla con un asesor.
3. **Energía:** calma al amanecer, sube hasta un mediodía intenso, baja a una tarde serena, cierre quieto y firme de noche.
4. **Sentimiento por etapa / momento a recordar:** ver en el sitio a qué hora produce más su techo y calcular su ahorro con el sol en lo más alto.
5. **Lo que ningún sitio hace:** el scroll es un día. Todo el sitio cambia de hora contigo y tu visita "genera" energía que se suma en una curva viva.
6. **Distancia de lo premium-minimal:** editorial cálido; nada de neón ni brutalismo.
7. **¿Un mundo o escenas?** Un solo cielo continuo (nunca corta) con escenas que llegan a ciertas horas.
8. **Assets:** 12 fotos de drone reales de proyectos (upscaled), logo vectorial, sin video. Sin generación de imágenes en esta ronda.

## Journey

1. Reconocimiento — Amanece en Montería; tu techo también recibe este sol.
2. Tensión — Pagas la luz a la red mientras el sol cae gratis en tu techo.
3. Giro — Ya lo hacen tus vecinos: proyectos reales en Montería.
4. Sustancia (pico) — Mediodía: el panel mira al sol y calculas tu ahorro.
5. Rango — Hogar, empresa o finca.
6. Confianza — Atardecer: ley, garantías, preguntas.
7. Compromiso — Noche: un asesor, un botón.

## Curva de sentimiento

| Acto | Hora | Emoción | Qué la causa |
|---|---|---|---|
| Amanecer | 05:30–07:30 | Asombro sereno | El sol sale detrás del horizonte de Montería; el titular está entre el horizonte y el techo con paneles |
| Tensión | 07:30–09:00 | Incomodidad | Tipografía enorme que se arma: "Tu factura sube. El sol no cobra." |
| Giro | 09:00–10:30 | Alivio, prueba | La foto real del río Sinú se descubre en barrido |
| **Mediodía (pico)** | 10:30–13:30 | Poder, claridad | Sección fija: el panel 3D mira al sol en el cenit y la calculadora cuenta tu ahorro con energía fluyendo |
| Rango | 13:30–15:00 | Elección | Las tres soluciones pasan en horizontal |
| Atardecer | 15:00–17:30 | Confianza tranquila | Ley 1715 y preguntas en lectura calmada, luz dorada |
| Noche | 17:30–20:00 | Decisión, calma | El sol se oculta tras el wordmark, aparecen estrellas, el CTA queda solo |

**Peak:** "Es el sitio donde vi a qué hora produce más mi techo y calculé mi ahorro con el sol en lo más alto." Vive en Mediodía; es la sección más larga (pin de 220 %).

**Tell-someone:** "Es el sitio donde bajar es vivir un día de sol en Montería, y al final te dice cuánta energía habría generado tu techo mientras mirabas."

**Silencio autoral:** el respiro entre Giro y Mediodía (la luz sube sin texto durante ~40 vh) es intencional, no scroll muerto.

## Gramática: "Reloj solar" (nueva)

- **Organización:** horas del día, no secciones. El cielo (suelo de toda la página) se regradúa de forma continua con el scroll y nunca corta.
- **Navegación:** la curva de producción fija en el borde: dibuja la energía del día, marca cada hora visitada y es clicable.
- **Secuencia:** amanecer → noche, en orden; ninguna escena retrocede la hora.
- **Cierre:** llegada a la noche: el sol se pone detrás del wordmark y el CTA queda bajo las estrellas.
- **Prohíbe:** cortes de fondo entre secciones, contadores 01/06, indicadores de scroll, eyebrows, `scrub` de video, hero centrado, cifras inventadas.

Por qué no las otras ocho: *Filmic one-shot* depende de video scrub (no hay video). *Continuous world* exige worldflight con un plano fijo y prohíbe pins y pan. *Chaptered editorial* prohíbe la gradación continua que es la idea central. *Split stage* exige dos columnas toda la página. *Typographic poster* prohíbe fotos, y las fotos reales son la prueba. *Gallery* y *Live surface* no cuentan un recorrido. *Rhythmic cutlist* se basa en cortes duros, lo opuesto a un día continuo.

## Movimiento firma

**La hora como regrade global + curva de producción como navegación.** El scroll fija la hora (05:30→20:00); cielo, sol, luz de las fotos y acentos cambian juntos. Una curva en el borde se dibuja con la producción de un sistema típico de 4 kWp en Montería (modelo de `lib/solar.ts`: 4 kWp × 5 HSP × 0,8 = 16 kWh/día, distribuidos en una curva solar) y suma los kWh "generados durante tu visita".
