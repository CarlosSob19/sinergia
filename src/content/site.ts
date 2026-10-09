// Datos reales tomados de sinergiaenergy.com (octubre 2026).
// Los marcados TODO-CONFIRMAR deben validarse con Sinergia antes de publicar.

export const SITE = {
  name: "Sinergia Energía Solar",
  shortName: "Sinergia",
  tagline: "Siempre contigo",
  url: "https://www.sinergiaenergy.com",
  description:
    "Diseñamos, instalamos y mantenemos sistemas de energía solar para hogares, empresas y fincas en Montería, Córdoba y el Caribe colombiano.",
  whatsapp: "+57 300 786 4522",
  phones: ["+57 313 562 7811", "+57 313 583 6131", "+57 300 853 1949", "+57 301 298 2498"],
  emails: { gerencia: "gerencia@sinergiaenergy.com", comercial: "comercial@sinergiaenergy.com" },
  address: { street: "Cra. 15B # 52-16, Barrio Monteverde", city: "Montería", region: "Córdoba", country: "Colombia" },
  social: {
    instagram: "https://www.instagram.com/sinergia.energy",
    facebook: "https://www.facebook.com/share/3bktm9GcjXQbG8UG/",
    x: "https://x.com/Sinergia_energy",
  },
} as const;

export const NAV = [
  { href: "/soluciones/hogar", label: "Hogar" },
  { href: "/soluciones/empresas", label: "Empresas" },
  { href: "/soluciones/agro", label: "Agro" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/foro", label: "Foro FIER" },
] as const;

export type PhotoKey =
  | "bodega-rio-sinu"
  | "edificio-oficinas"
  | "concesionario"
  | "parqueadero"
  | "comercio-barrio"
  | "finca-paneles-suelo"
  | "patio-paneles-suelo"
  | "corral-ganadero"
  | "techo-comercial-calle"
  | "casa-ronda"
  | "fachada-vertical"
  | "edificio-residencial"
  | "encabezado";

export interface Project {
  photo: PhotoKey;
  title: string;
  type: "Hogar" | "Empresa" | "Agro";
  note: string;
}

// Fotos reales de la galería "Proyecto en alianza" de sinergiaenergy.com.
// TODO-CONFIRMAR: nombres de cliente, potencia instalada y año de cada proyecto.
export const PROJECTS: Project[] = [
  { photo: "bodega-rio-sinu", title: "Bodega industrial junto al río Sinú", type: "Empresa", note: "Cubierta metálica" },
  { photo: "concesionario", title: "Concesionario automotriz", type: "Empresa", note: "Cubierta comercial" },
  { photo: "casa-ronda", title: "Vivienda en la Ronda del Sinú", type: "Hogar", note: "Techo residencial" },
  { photo: "finca-paneles-suelo", title: "Sistema en suelo para finca", type: "Agro", note: "Estructura a nivel de piso" },
  { photo: "edificio-oficinas", title: "Edificio de oficinas", type: "Empresa", note: "Azotea" },
  { photo: "corral-ganadero", title: "Corral ganadero", type: "Agro", note: "Cubierta de establo" },
  { photo: "edificio-residencial", title: "Edificio residencial", type: "Hogar", note: "Azotea multifamiliar" },
  { photo: "parqueadero", title: "Cubierta de parqueadero", type: "Empresa", note: "Gran formato" },
  { photo: "fachada-vertical", title: "Fachada solar vertical", type: "Empresa", note: "Integración arquitectónica" },
  { photo: "comercio-barrio", title: "Local comercial de barrio", type: "Empresa", note: "Techo de comercio" },
  { photo: "patio-paneles-suelo", title: "Sistema en patio", type: "Hogar", note: "Estructura en suelo" },
  { photo: "techo-comercial-calle", title: "Techo comercial urbano", type: "Empresa", note: "Cubierta en avenida" },
];

export interface Solution {
  slug: "hogar" | "empresas" | "agro";
  title: string;
  kicker: string;
  lead: string;
  photo: PhotoKey;
  points: { title: string; text: string }[];
  ideal: string[];
}

export const SOLUTIONS: Solution[] = [
  {
    slug: "hogar",
    title: "Energía solar para tu hogar",
    kicker: "Hogar",
    lead: "Convierte el techo de tu casa en una pequeña central de energía y paga menos por la luz cada mes.",
    photo: "casa-ronda",
    points: [
      { title: "Conectado a la red", text: "Tu casa usa la energía solar primero y la red solo cuando hace falta. Los excedentes se entregan al operador de red." },
      { title: "Respaldo con baterías", text: "Si en tu sector se va la luz, un sistema con baterías mantiene encendido lo esencial." },
      { title: "Trámites incluidos", text: "Nos encargamos de la solicitud de conexión ante el operador de red y de la documentación técnica." },
    ],
    ideal: ["Casas y apartamentos con terraza", "Facturas desde $250.000 al mes", "Familias que quieren estabilidad en su gasto de energía"],
  },
  {
    slug: "empresas",
    title: "Energía solar para empresas y comercio",
    kicker: "Empresas",
    lead: "Reduce uno de tus costos fijos más altos y aprovecha los beneficios tributarios de la Ley 1715.",
    photo: "bodega-rio-sinu",
    points: [
      { title: "Diseño a la medida de tu consumo", text: "Analizamos tus facturas y curva de carga para dimensionar un sistema que se pague en el menor tiempo posible." },
      { title: "Beneficios tributarios", text: "Te acompañamos en la solicitud de incentivos: deducción de renta, exclusión de IVA, exención arancelaria y depreciación acelerada." },
      { title: "Monitoreo y mantenimiento", text: "Seguimos la producción de tu planta y la mantenemos para que rinda durante toda su vida útil." },
    ],
    ideal: ["Bodegas, comercios y oficinas", "Concesionarios, clínicas, hoteles y colegios", "Industrias con consumo diurno alto"],
  },
  {
    slug: "agro",
    title: "Energía solar para fincas y agro",
    kicker: "Agro",
    lead: "Lleva energía confiable a donde la red no llega o llega mal: bombeo de agua, cercas, ordeño y refrigeración.",
    photo: "finca-paneles-suelo",
    points: [
      { title: "Bombeo solar", text: "Saca agua de pozos y reservorios para riego y abrevaderos sin depender de combustible." },
      { title: "Sistemas aislados", text: "Energía propia con baterías para fincas sin conexión a la red eléctrica." },
      { title: "Estructuras en suelo y cubiertas", text: "Instalamos sobre establos, corrales o en estructuras a nivel de piso según el terreno." },
    ],
    ideal: ["Fincas ganaderas y agrícolas", "Sistemas de riego y bombeo", "Predios sin red o con cortes frecuentes"],
  },
];

export const VALUES = [
  { icon: "wrench", title: "Mantenimiento", text: "Mantenemos y optimizamos tu sistema para garantizar un rendimiento óptimo a lo largo del tiempo." },
  { icon: "headset", title: "Soporte", text: "Acompañamiento experto en cada fase del proyecto y durante toda su vida útil." },
  { icon: "cpu", title: "Tecnología", text: "Equipos modernos, con la mejor tecnología y un excelente respaldo de fábrica." },
  { icon: "ruler", title: "Personalización", text: "Cada proyecto se adapta a las necesidades específicas de tu casa, empresa o finca." },
] as const;

export const STEPS = [
  { title: "Visita técnica", text: "Revisamos tus facturas, tu techo o terreno y tu consumo. Sin costo." },
  { title: "Diseño y propuesta", text: "Dimensionamos el sistema, simulamos la producción y te mostramos el ahorro y el retorno." },
  { title: "Instalación y trámites", text: "Instalamos con personal certificado y gestionamos la conexión con el operador de red." },
  { title: "Monitoreo y mantenimiento", text: "Seguimos la producción de tu sistema y lo mantenemos para que rinda por décadas." },
] as const;

export const TEAM = [
  { name: "Fabián J. Villafañe Díaz", role: "Director", email: "gerencia@sinergiaenergy.com" },
  { name: "Claudia Soto Londoño", role: "Comercial", email: "comercial@sinergiaenergy.com" },
  { name: "Stefany Martínez Bravo", role: "Coordinadora administrativa" },
] as const;

export const FAQ = [
  {
    q: "¿Cuánto puedo ahorrar con energía solar?",
    a: "Depende de tu consumo, de tu techo y de la tarifa de tu operador de red. En Córdoba y el Caribe, con buena radiación solar, un sistema bien dimensionado puede cubrir la mayor parte de tu consumo. Usa la calculadora para una estimación y pide una visita técnica para una cifra exacta.",
  },
  {
    q: "¿Qué pasa en los días nublados o de noche?",
    a: "En un sistema conectado a la red, tu casa o empresa toma energía de la red cuando los paneles no producen. Si quieres respaldo durante cortes, se puede incluir un banco de baterías.",
  },
  {
    q: "¿Cuánto duran los paneles solares?",
    a: "Los paneles de buena calidad tienen garantías de producción de 25 años o más, y los inversores suelen tener garantías de 5 a 10 años. Te entregamos las garantías de cada equipo por escrito.",
  },
  {
    q: "¿Qué beneficios tributarios hay en Colombia?",
    a: "La Ley 1715 de 2014 y la Ley 2099 de 2021 contemplan deducción especial en el impuesto de renta, exclusión de IVA, exención de aranceles y depreciación acelerada para proyectos de energías renovables, previa certificación ante la UPME. Te acompañamos en el proceso.",
  },
  {
    q: "¿Necesito permisos para instalar?",
    a: "Para conectar a la red se debe tramitar la conexión ante el operador de red y cumplir el RETIE. Nosotros gestionamos estos trámites como parte del proyecto.",
  },
  {
    q: "¿Hacen mantenimiento a sistemas que no instalaron ustedes?",
    a: "Sí. Revisamos el estado de paneles, inversores, cableado y protecciones, y te proponemos ajustes para recuperar el rendimiento.",
  },
] as const;

export const FORUM = {
  name: "Foro Internacional de Energías Renovables (FIER)",
  edition: "8.ª edición",
  theme: "El Caribe liderando el camino hacia la sostenibilidad energética",
  date: "25 de julio de 2025",
  venue: "Hotel GHL, Montería",
  url: "https://www.foroenergias.org",
  axes: ["Movilidad eléctrica", "Ciudades resilientes", "Costos de la energía", "Innovación"],
  context:
    "En la subasta de energía 2027-2028, Córdoba y Montería fueron las zonas con más proyectos fotovoltaicos asignados: 7 megaproyectos que suman 1.294 MW y más de 1.000 millones de dólares en inversión directa.",
} as const;
