import styles from "./TaskItem.module.css";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

function TaskItem({ task }: { task: Task }) {
  return (
    <li className={styles.item}>
      <input type="checkbox" checked={task.completed} readOnly />
      <span className={task.completed ? styles.completed : ""}>
        {task.title}
      </span>
    </li>
  );
}

export default TaskItem;
