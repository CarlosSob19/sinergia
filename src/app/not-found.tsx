import Link from "next/link";
import s from "@/components/inner.module.css";

export default function NotFound() {
  return (
    <section className={s.pageHead} style={{ minHeight: "70vh" }}>
      <div className="container">
        <p className="eyebrow">Error 404</p>
        <h1 className="h1">Aquí no llega el sol.</h1>
        <p className="lead">La página que buscas no existe o cambió de dirección.</p>
        <Link href="/" className="btn btn--dark" style={{ marginTop: 32 }}>
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
