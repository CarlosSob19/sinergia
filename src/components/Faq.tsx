import { Plus } from "@phosphor-icons/react/dist/ssr";
import styles from "./Faq.module.css";

export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className={styles.list}>
      {items.map((it) => (
        <details key={it.q} className={styles.item}>
          <summary>
            <span>{it.q}</span>
            <Plus size={22} aria-hidden="true" />
          </summary>
          <p>{it.a}</p>
        </details>
      ))}
    </div>
  );
}
