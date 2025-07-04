import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../App.css'; // Import custom styles
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
    fetch("http://localhost:8000/tasks/")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => setError("Failed to fetch tasks."));
  };

  const fetchSummary = () => {
    fetch("http://localhost:8000/tasks/summary")
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch(() => setError("Failed to fetch summary."));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      fetch(`http://localhost:8000/tasks/${id}`, {
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
    fetch(`http://localhost:8000/tasks/${task.id}`, {
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

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Smart Task Tracker</h2>
        <Link to="/create" className="btn btn-primary">
          + Add Task
        </Link>
      </div>
      <div className="mb-3">
        <strong>Total:</strong> {summary.total} | <strong>Completed:</strong> {summary.completed} | <strong>% Completed:</strong> {(summary.percent_completed ?? 0).toFixed(1)}%
      </div>
      {tasks.length === 0 ? (
        <div className="alert alert-info">No tasks found. Add your first task!</div>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex align-items-center justify-content-between"
            >
              <div>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task)}
                  className="form-check-input me-2"
                />
                <span className={task.completed ? "task-title-done" : ""}>
                  <strong>{task.title}</strong>
                </span>
                <span className="badge bg-secondary ms-2">{task.category || "None"}</span>
                <span className="badge bg-info ms-2">{task.priority}</span>
              </div>
              <div>
                <Link to={`/edit/${task.id}`} className="btn btn-sm btn-outline-primary me-2">
                  {/* <FaEdit /> */}Edit
                </Link>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="btn btn-sm btn-outline-danger"
                >
                  {/* <FaTrash /> */}Delete
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