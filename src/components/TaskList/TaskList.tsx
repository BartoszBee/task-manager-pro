import styles from "./TaskList.module.css";
import TaskItem from "../TaskItem/TaskItem";

const mockTasks = [
  { id: 1, title: "Nauczyć się React Hooks", completed: false },
  { id: 2, title: "Stworzyć mini projekt", completed: true },
];

function TaskList() {
  return (
    <ul className={styles.list}>
      {mockTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;
