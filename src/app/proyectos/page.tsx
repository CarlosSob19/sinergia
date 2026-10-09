import type { Metadata } from "next";
import { ProjectGallery } from "./ProjectGallery";
import { CtaBand } from "@/components/CtaBand";
import s from "@/components/inner.module.css";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Sistemas solares instalados por Sinergia en hogares, empresas y fincas de Montería y Córdoba.",
  alternates: { canonical: "/proyectos" },
};

export default function ProjectsPage() {
  return (
    <>
      <section className={s.pageHead}>
        <div className="container">
          <p className="eyebrow">Proyectos</p>
          <h1 className="h1">Techos que ya producen su propia energía.</h1>
          <p className="lead">Una muestra de los sistemas que hemos instalado en alianza en Montería y la región: casas, comercios, bodegas, edificios y fincas.</p>
        </div>
      </section>
      <section style={{ paddingBottom: "var(--section)" }}>
        <div className="container">
          <ProjectGallery />
        </div>
      </section>
      <CtaBand title="¿Tu techo es el siguiente?" />
    </>
  );
}
