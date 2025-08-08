import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <Router>
      <TaskProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </TaskProvider>
    </Router>
  );
}
export default App;
