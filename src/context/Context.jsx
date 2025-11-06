import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/todos");
        setTasks(res.data.todos || []);
      } catch (err) {
        setError("Failed to load tasks.");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

//   const addTask = async (todo) => {
//     try {
//       const newTask = { todo, completed: false };
//       const res = await axios.post("https://dummyjson.com/todos", newTask);
//       setTasks([...tasks, res.data]);
//     } catch (err) {
//       setError("Failed to add task.");
//     }
//   };

    const addTask = async (todo) => {
  try {
    const newTask = { todo, completed: false, userId: 1 };
    const res = await axios.post("https://dummyjson.com/todos/add", newTask);
    const createdTask = res.data;

    setTasks((prevTasks) => [...prevTasks, createdTask]);
  } catch (err) {
    console.error("Error adding task:", err);
    setError("Failed to add task.");
  }
};


  const updateTask = async (id, updatedTask) => {
    try {
      await axios.put(`https://dummyjson.com/todos/${id}`, updatedTask);
      setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task));
    } catch (err) {
      setError("Failed to update task.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://dummyjson.com/todos/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError("Failed to delete task.");
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, error, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
