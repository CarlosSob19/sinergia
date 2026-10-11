"use client";

import Image from "next/image";
import { useState } from "react";
import { PROJECTS, type Project } from "@/content/site";
import { photo } from "@/content/photos";
import s from "@/components/inner.module.css";

const FILTERS: ("Todos" | Project["type"])[] = ["Todos", "Hogar", "Empresa", "Agro"];

export function ProjectGallery() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Todos");
  const list = filter === "Todos" ? PROJECTS : PROJECTS.filter((p) => p.type === filter);

  return (
    <>
      <div className={s.filters} role="group" aria-label="Filtrar proyectos">
        {FILTERS.map((f) => (
          <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {list.length} proyectos
      </p>
      <ul className={s.gallery} data-stagger>
        {list.map((pr) => {
          const p = photo(pr.photo);
          return (
            <li key={pr.photo} className="press">
              <figure>
                <Image src={p.src} width={p.width} height={p.height} alt={`${pr.title}: sistema solar instalado por Sinergia`} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                <figcaption>
                  <span>{pr.type}</span>
                  <strong>{pr.title}</strong>
                  <em>{pr.note} · Proyecto en alianza</em>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </>
  );
}
