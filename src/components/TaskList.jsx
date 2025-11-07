import { useTasks } from "../context/Context";
import TaskItem from "./TaskItem";


export default function TaskList() {
  const { tasks, loading, error } = useTasks();


  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;


  return (
    <ul className="max-w-lg mx-auto mt-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}


