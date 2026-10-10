import Link from "next/link";
import s from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={s.page} aria-labelledby="nf-title">
      <div className={s.sky} aria-hidden="true" />
      <svg className={s.scene} viewBox="0 0 1200 600" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs>
          <radialGradient id="nf-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#fff1c9" />
            <stop offset="0.4" stopColor="#ffb547" />
            <stop offset="1" stopColor="#f5a524" stopOpacity="0" />
          </radialGradient>
          <clipPath id="nf-horizon">
            <rect x="0" y="0" width="1200" height="430" />
          </clipPath>
        </defs>
        <g clipPath="url(#nf-horizon)">
          <g className={s.sun}>
            <circle cx="600" cy="330" r="190" fill="url(#nf-sun)" />
            <circle cx="600" cy="330" r="70" fill="#ffe9b0" />
          </g>
        </g>
        <rect x="0" y="430" width="1200" height="170" fill="#062a33" />
        <g transform="translate(330 440)">
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i} transform={`translate(${i * 70} 0) skewX(-18)`}>
              <rect width="60" height="70" rx="3" fill="#0f3a4f" stroke="#2c5a78" />
              <path d="M 0 23 H 60 M 0 46 H 60 M 30 0 V 70" stroke="#2c5a78" />
            </g>
          ))}
        </g>
      </svg>
      <div className={`container ${s.copy}`}>
        <p className={s.code}>404</p>
        <h1 id="nf-title" className={s.title}>
          Aquí ya se ocultó el sol.
        </h1>
        <p className={s.lead}>La página que buscas no existe o cambió de dirección. Mañana vuelve a salir; mientras tanto, te llevamos al inicio.</p>
        <Link href="/" className="btn">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
