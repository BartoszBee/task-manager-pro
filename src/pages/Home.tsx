import { lazy, Suspense } from "react";
import Filters from "../components/Filters/Filters";
import TaskList from "../components/TaskList/TaskList";
import Loader from "../components/Loader/Loader";

const TaskForm = lazy(() => import("../components/TaskForm/TaskForm"));

function Home() {
  return (
    <main>
      <Suspense fallback={<Loader />}>
        <TaskForm />
      </Suspense>
      <Filters />
      <TaskList />
    </main>
  );
}
export default Home;
