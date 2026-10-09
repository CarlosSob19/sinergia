import type { MetadataRoute } from "next";
import { SITE, SOLUTIONS } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/proyectos", "/nosotros", "/foro", "/contacto", "/privacidad", ...SOLUTIONS.map((s) => `/soluciones/${s.slug}`)];
  return paths.map((p) => ({ url: `${SITE.url}${p}`, lastModified: new Date() }));
}
