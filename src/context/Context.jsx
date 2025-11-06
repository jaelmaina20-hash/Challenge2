import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://dummyjson.com/todos')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

    const addTask = async (todo) => {
    const newTask = { todo, completed: false };
    const res = await axios.post("https://dummyjson.com/todos", newTask);
    setTasks([...tasks, res.data]);
  };

  const updateTask = async (id, updatedTask) => {
    await axios.put(`https://dummyjson.com/todos/${id}`, updatedTask);
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task));
  };

    const deleteTask = async (id) => {
    await axios.delete(`https://dummyjson.com/todos/${id}`);
    setTasks(tasks.filter(task => task.id !== id));
  };
};