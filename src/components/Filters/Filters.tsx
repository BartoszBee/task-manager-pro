import { useTasks } from "../../context/TaskContext";
import type { Filter } from "../../types/Task";
import styles from "./Filters.module.css";
import cx from "classnames";

const options: { key: Filter; label: string }[] = [
  { key: "all", label: "Wszystkie" },
  { key: "active", label: "Aktywne" },
  { key: "completed", label: "Ukończone" },
];

function Filters() {
  const { state, setFilter, activeCount, completedCount } = useTasks();

  return (
    <div className={styles.wrap}>
      <div className={styles.group}>
        {options.map(o => (
          <button
            key={o.key}
            className={cx(styles.chip, state.filter === o.key && styles.active)}
            onClick={() => setFilter(o.key)}
            type="button"
          >
            {o.label}
          </button>
        ))}
      </div>
      <div className={styles.counters}>
        <span>Aktywne: {activeCount}</span>
        <span>Ukończone: {completedCount}</span>
      </div>
    </div>
  );
}

export default Filters;
