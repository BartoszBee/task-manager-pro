import TaskForm from "../components/TaskForm/TaskForm";
import Filters from "../components/Filters/Filters";
import TaskList from "../components/TaskList/TaskList";

function Home() {
  return (
    <main>
      <TaskForm />
      <Filters />
      <TaskList />
    </main>
  );
}
export default Home;
