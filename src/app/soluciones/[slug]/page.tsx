import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { PROJECTS, SOLUTIONS } from "@/content/site";
import { photo } from "@/content/photos";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { CtaBand } from "@/components/CtaBand";
import s from "@/components/inner.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return SOLUTIONS.map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const sol = SOLUTIONS.find((x) => x.slug === slug);
  if (!sol) return {};
  return { title: sol.title, description: sol.lead, alternates: { canonical: `/soluciones/${sol.slug}` } };
}

const TYPE = { hogar: "Hogar", empresas: "Empresa", agro: "Agro" } as const;

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sol = SOLUTIONS.find((x) => x.slug === slug);
  if (!sol) notFound();
  const hero = photo(sol.photo);
  const related = PROJECTS.filter((p) => p.type === TYPE[sol.slug]).slice(0, 3);

  return (
    <>
      <section className={s.photoHero}>
        <Image src={hero.src} alt="" fill priority sizes="100vw" />
        <div className={`container ${s.inner}`}>
          <h1 className="h1">{sol.title}</h1>
          <p className="lead">{sol.lead}</p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${s.split}`}>
          <div className={s.sticky}>
            <h2 className="h2">Todo el proyecto, de principio a fin.</h2>
            <h3 className="h3" style={{ marginTop: 16 }}>
              Ideal para
            </h3>
            <ul className={s.checks}>
              {sol.ideal.map((i) => (
                <li key={i}>
                  <CheckCircle size={22} weight="fill" aria-hidden="true" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <ul className={s.cards}>
            {sol.points.map((p, i) => (
              <li key={p.title} className="reveal" style={{ ["--d" as string]: `${i * 80}ms` }}>
                <h3 className="h3">{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`section ${s.band}`} aria-labelledby="calc">
        <div className="container">
          <div style={{ display: "grid", gap: 16, marginBottom: 48, maxWidth: 760 }}>
            <h2 id="calc" className="h1">
              Estima tu ahorro
            </h2>
          </div>
          <SavingsCalculator defaultSegment={sol.slug} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="section" aria-labelledby="rel">
          <div className="container">
            <h2 id="rel" className="h2" style={{ marginBottom: 32 }}>
              Proyectos similares
            </h2>
            <ul className={s.gallery}>
              {related.map((pr) => {
                const p = photo(pr.photo);
                return (
                  <li key={pr.photo} className="reveal">
                    <figure>
                      <Image src={p.src} width={p.width} height={p.height} alt={`${pr.title}: sistema solar instalado por Sinergia`} sizes="(max-width: 700px) 100vw, 33vw" />
                      <figcaption>
                        <span>{pr.type}</span>
                        <strong>{pr.title}</strong>
                      </figcaption>
                    </figure>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
