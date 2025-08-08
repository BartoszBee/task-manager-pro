import { useState } from "react";
import styles from "./TaskItem.module.css";
import type { Task } from "../../types/Task";
import { useTasks } from "../../context/TaskContext";
import cx from "classnames";

function TaskItem({ task }: { task: Task }) {
  const { toggleTask, removeTask, editTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const save = () => {
    const trimmed = title.trim();
    if (trimmed && trimmed !== task.title) editTask(task.id, trimmed);
    setIsEditing(false);
  };

  return (
    <li className={styles.item}>
      <label className={styles.left}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          aria-label="toggle-task"
        />
        {isEditing ? (
          <input
            className={styles.editInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => e.key === "Enter" && save()}
            autoFocus
          />
        ) : (
          <span className={cx(styles.title, task.completed && styles.completed)}>
            {task.title}
          </span>
        )}
      </label>
      <div className={styles.actions}>
        <button className={styles.link} onClick={() => setIsEditing((v) => !v)}>
          {isEditing ? "Zapisz" : "Edytuj"}
        </button>
        <button className={styles.danger} onClick={() => removeTask(task.id)}>
          Usuń
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
