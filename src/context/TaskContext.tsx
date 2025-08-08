import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { Task, Filter } from "../types/Task";

type State = {
  tasks: Task[];
  filter: Filter;
};

type Action =
  | { type: "ADD_TASK"; title: string }
  | { type: "TOGGLE_TASK"; id: string }
  | { type: "REMOVE_TASK"; id: string }
  | { type: "EDIT_TASK"; id: string; title: string }
  | { type: "SET_FILTER"; filter: Filter }
  | { type: "HYDRATE"; payload: State };

const initialState: State = { tasks: [], filter: "all" };

function tasksReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TASK": {
      const title = action.title.trim();
      if (!title) return state;
      const newTask: Task = {
        id: crypto.randomUUID(),
        title,
        completed: false,
        createdAt: Date.now(),
      };
      return { ...state, tasks: [newTask, ...state.tasks] };
    }
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.id ? { ...t, completed: !t.completed } : t
        ),
      };
    case "REMOVE_TASK":
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.id) };
    case "EDIT_TASK": {
      const title = action.title.trim();
      if (!title) return state;
      return {
        ...state,
        tasks: state.tasks.map(t => (t.id === action.id ? { ...t, title } : t)),
      };
    }
    case "SET_FILTER":
      return { ...state, filter: action.filter };
    case "HYDRATE":
      return action.payload;
    default:
      return state;
  }
}

type TaskContextValue = {
  state: State;
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  editTask: (id: string, title: string) => void;
  setFilter: (filter: Filter) => void;
  filteredTasks: Task[];
  activeCount: number;
  completedCount: number;
};

const TaskContext = createContext<TaskContextValue | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

 
  useEffect(() => {
    try {
      const raw = localStorage.getItem("task-manager-pro");
      if (raw) {
        const parsed = JSON.parse(raw) as State;
        dispatch({ type: "HYDRATE", payload: parsed });
      }
    } catch {}
  }, []);


  useEffect(() => {
    try {
      localStorage.setItem("task-manager-pro", JSON.stringify(state));
    } catch {}
  }, [state]);

  // Akcje
  const addTask = (title: string) => dispatch({ type: "ADD_TASK", title });
  const toggleTask = (id: string) => dispatch({ type: "TOGGLE_TASK", id });
  const removeTask = (id: string) => dispatch({ type: "REMOVE_TASK", id });
  const editTask = (id: string, title: string) => dispatch({ type: "EDIT_TASK", id, title });
  const setFilter = (filter: Filter) => dispatch({ type: "SET_FILTER", filter });

  // Pochodne
  const filteredTasks = useMemo(() => {
    switch (state.filter) {
      case "active":
        return state.tasks.filter(t => !t.completed);
      case "completed":
        return state.tasks.filter(t => t.completed);
      default:
        return state.tasks;
    }
  }, [state.tasks, state.filter]);

  const activeCount = useMemo(() => state.tasks.filter(t => !t.completed).length, [state.tasks]);
  const completedCount = useMemo(() => state.tasks.filter(t => t.completed).length, [state.tasks]);

  const value: TaskContextValue = {
    state,
    addTask,
    toggleTask,
    removeTask,
    editTask,
    setFilter,
    filteredTasks,
    activeCount,
    completedCount,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used within TaskProvider");
  return ctx;
}
