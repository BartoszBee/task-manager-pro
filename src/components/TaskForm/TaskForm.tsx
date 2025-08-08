import { useState, useCallback} from "react";
import type { FormEvent } from "react";
import { useTasks } from "../../context/TaskContext";
import styles from "./TaskForm.module.css";

function TaskForm() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const trimmed = title.trim();
      if (trimmed.length < 3) {
        setError("Wpisz min. 3 znaki");
        return;
      }
      addTask(trimmed);
      setTitle("");
      setError("");
    },
    [title, addTask]
  );

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <input
        className={styles.input}
        placeholder="Dodaj zadanie…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="task-title"
      />
      <button className={styles.btn} type="submit">Dodaj</button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}

export default TaskForm;
