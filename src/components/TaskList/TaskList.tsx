import styles from "./TaskList.module.css";
import TaskItem from "../TaskItem/TaskItem";
import { useTasks } from "../../context/TaskContext";

function TaskList() {
  const { filteredTasks } = useTasks();
  if (filteredTasks.length === 0)
    return <p className={styles.empty}>Brak zadań w tym widoku.</p>;

  return (
    <ul className={styles.list} aria-live="polite">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
export default TaskList;
