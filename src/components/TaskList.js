import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../App.css'; // Import custom styles
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
// import { FaEdit, FaTrash } from "react-icons/fa"; // Uncomment if using react-icons

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ total: 0, completed: 0, percent_completed: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
    fetchSummary();
  }, []);

  const fetchTasks = () => {
    fetch("https://smart-task-tracker-backend-production.up.railway.app/tasks/")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => setError("Failed to fetch tasks."));
  };

  const fetchSummary = () => {
    fetch("https://smart-task-tracker-backend-production.up.railway.app/tasks/summary")
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch(() => setError("Failed to fetch summary."));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      fetch(`https://smart-task-tracker-backend-production.up.railway.app/tasks/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          fetchTasks();
          fetchSummary();
        })
        .catch(() => setError("Failed to delete task."));
    }
  };

  const handleToggleComplete = (task) => {
    fetch(`https://smart-task-tracker-backend-production.up.railway.app/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        category: task.category,
        priority: task.priority,
        completed: !task.completed,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchTasks();
        fetchSummary();
      })
      .catch(() => setError("Failed to update task status."));
  };

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  // Priority color mapping
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "red";
      case "Medium": return "yellow";
      case "Low": return "green";
      default: return "info";
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Smart Task Tracker</h2>
        <Link to="/create" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-sm font-semibold shadow-md transition-all">+ Add Task</Link>
      </div>
      <div className="mb-4 text-sm text-gray-700 flex gap-4">
        <span><strong>Total:</strong> {summary.total}</span>
        <span><strong>Completed:</strong> {summary.completed}</span>
        <span><strong>% Completed:</strong> {(summary.percent_completed ?? 0).toFixed(1)}%</span>
      </div>
      {tasks.length === 0 ? (
        <div className="bg-blue-50 border border-blue-100 text-blue-700 rounded-xl px-4 py-3 text-center">No tasks found. Add your first task!</div>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-white rounded-xl shadow p-4 gap-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => handleToggleComplete(task)}
                  className="relative"
                />
                <span className={`truncate ${task.completed ? "line-through text-gray-400" : "text-gray-900"} font-medium text-base`}>
                  {task.title}
                </span>
                <Badge color="secondary" className="ml-2">{task.category || "None"}</Badge>
                <Badge color={getPriorityColor(task.priority)} className="ml-2">{task.priority}</Badge>
              </div>
              <div className="flex gap-2">
                <Link to={`/edit/${task.id}`} className="rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-1 text-xs font-semibold transition-all">Edit</Link>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="rounded-full border border-red-500 text-red-500 hover:bg-red-50 px-4 py-1 text-xs font-semibold transition-all"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;