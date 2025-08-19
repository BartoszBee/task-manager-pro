import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { TaskProvider } from "./context/TaskContext";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader/Loader";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <Router>
      <TaskProvider>
        <Header />
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </TaskProvider>
    </Router>
  );
}
export default App;
