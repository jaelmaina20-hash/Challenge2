import { useState } from "react";
import { useTasks } from "../context/Context";

export default function TaskForm() {
  const [todo, setTodo] = useState("");
  const { addTask } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;
    addTask(todo);
    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center my-4">
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add a new task..."
        className="border p-2 w-1/2 rounded-l-md"
      />
      <button type="submit" className="bg-pink-600 text-white px-4 rounded-r-md">
        Add
      </button>
    </form>
  );
}
