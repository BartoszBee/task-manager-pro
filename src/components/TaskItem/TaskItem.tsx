// src/components/TaskItem/TaskItem.tsx
import { useCallback, useRef, useState, memo } from "react";
import styles from "./TaskItem.module.css";
import type { Task } from "../../types/Task";
import { useTasks } from "../../context/TaskContext";
import cx from "classnames";

function TaskItemBase({ task }: { task: Task }) {
  const { toggleTask, removeTask, editTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  // strażnik: żeby blur nie kasował zapisu
  const savingRef = useRef(false);

  const onToggle = useCallback(
    () => toggleTask(task.id),
    [toggleTask, task.id]
  );
  const onRemove = useCallback(
    () => removeTask(task.id),
    [removeTask, task.id]
  );

  const startEdit = useCallback(() => {
    setTitle(task.title); // zawsze zaczynamy od aktualnej wartości
    setIsEditing(true);
  }, [task.title]);

  const save = useCallback(() => {
    if (savingRef.current) return;
    savingRef.current = true;

    const trimmed = title.trim();
    if (trimmed && trimmed !== task.title) {
      editTask(task.id, trimmed);
    }
    setIsEditing(false);

    setTimeout(() => {
      savingRef.current = false;
    }, 0);
  }, [title, task.id, task.title, editTask]);

  const cancel = useCallback(() => {
    if (savingRef.current) return;
    setIsEditing(false);
    setTitle(task.title); // przywróć oryginalny tekst
  }, [task.title]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") save();
      if (e.key === "Escape") cancel();
    },
    [save, cancel]
  );

  return (
    <li className={styles.item}>
      <label className={styles.left}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          aria-label="toggle-task"
        />

        {isEditing ? (
          <input
            className={styles.editInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={onKeyDown}
            autoFocus
          />
        ) : (
          <span
            className={cx(styles.title, task.completed && styles.completed)}
          >
            {task.title}
          </span>
        )}
      </label>

      <div className={styles.actions}>
        {isEditing ? (
          <>
            <button
              className={styles.link}
              type="button"
              onMouseDown={save} // zapis przed blur
            >
              Zapisz
            </button>
            <button
              className={styles.link}
              type="button"
              onMouseDown={cancel} // anulowanie
            >
              Anuluj
            </button>
          </>
        ) : (
          <button className={styles.link} type="button" onClick={startEdit}>
            Edytuj
          </button>
        )}
        <button className={styles.danger} type="button" onClick={onRemove}>
          Usuń
        </button>
      </div>
    </li>
  );
}

const areEqual = (prev: { task: Task }, next: { task: Task }) =>
  prev.task.id === next.task.id &&
  prev.task.title === next.task.title &&
  prev.task.completed === next.task.completed;

export default memo(TaskItemBase, areEqual);
