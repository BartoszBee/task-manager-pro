import { useCallback, useState } from "react";
import styles from "./TaskItem.module.css";
import type { Task } from "../../types/Task";
import { useTasks } from "../../context/TaskContext";
import cx from "classnames";
import { memo } from "react";

function TaskItemBase({ task }: { task: Task }) {
  const { toggleTask, removeTask, editTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const onToggle = useCallback(
    () => toggleTask(task.id),
    [toggleTask, task.id]
  );
  const onRemove = useCallback(
    () => removeTask(task.id),
    [removeTask, task.id]
  );

  const onEditToggle = useCallback(() => {
    setTitle(task.title); // reset na aktualny tytuł przy wejściu w edycję
    setIsEditing(true);
  }, [task.title]);

  const save = useCallback(() => {
    const trimmed = title.trim();
    if (trimmed && trimmed !== task.title) {
      editTask(task.id, trimmed);
    }
    setIsEditing(false);
  }, [title, task.title, task.id, editTask]);

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
            // onBlur={save}
            onKeyDown={(e) => e.key === "Enter" && save()}
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
          <button className={styles.link} onClick={save}>
            Zapisz
          </button>
        ) : (
          <button className={styles.link} onClick={onEditToggle}>
            Edytuj
          </button>
        )}
        <button className={styles.danger} onClick={onRemove}>
          Usuń
        </button>
      </div>
    </li>
  );
}

// React.memo – re-render tylko jeśli zmieni się treść/stan taska
const areEqual = (prev: { task: Task }, next: { task: Task }) =>
  prev.task.id === next.task.id &&
  prev.task.title === next.task.title &&
  prev.task.completed === next.task.completed;

const TaskItem = memo(TaskItemBase, areEqual);
export default TaskItem;
