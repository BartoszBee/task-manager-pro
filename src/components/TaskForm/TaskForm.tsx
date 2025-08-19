import { useState, useCallback, useRef, useEffect } from "react";
import type { FormEvent } from "react";
import { useTasks } from "../../context/TaskContext";
import styles from "./TaskForm.module.css";

function TaskForm() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // autofocus na mount (gdy komponent dociągnie się lazy)
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
      inputRef.current?.focus();
    },
    [title, addTask]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
      if (error) setError("");
    },
    [error]
  );

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <input
          ref={inputRef}
          className={styles.input}
          placeholder="Dodaj zadanie…"
          value={title}
          onChange={onChange}
          aria-label="task-title"
        />
        <button className={styles.btn} type="submit">
          Dodaj
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
}
export default TaskForm;
