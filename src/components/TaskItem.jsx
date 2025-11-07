import { useTasks } from "../context/Context";


export default function TaskItem({ task }) {
  const { updateTask, deleteTask } = useTasks();


  const toggleComplete = () => {
    updateTask(task.id, { completed: !task.completed });
  };


  return (
    <li className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-2">
      <span
        onClick={toggleComplete}
        className={`cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
      >
        {task.todo}
      </span>
      <button
        onClick={() => deleteTask(task.id)}
        className="bg-red-500 text-white px-2 py-1 rounded-md"
      >
        Delete
      </button>
    </li>
  );
}
