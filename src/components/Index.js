import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import { Plus, Edit, Trash2, CheckCircle2, X, Brain, Lightbulb, AlertTriangle, Sparkles } from "lucide-react";
import TaskForm from "./TaskForm";
import TaskSummary from "./TaskSummary";
import AIInsights from "./AIInsights";
import SmartSuggestions from "./SmartSuggestions";

/**
 * @typedef {Object} Task
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {'Low'|'Medium'|'High'} priority
 * @property {boolean} completed
 */

/**
 * @typedef {Object} Summary
 * @property {number} total
 * @property {number} completed
 * @property {number} percent_completed
 */

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ total: 0, completed: 0, percent_completed: 0 });
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showError, setShowError] = useState(true);
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [showSmartSuggestions, setShowSmartSuggestions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showEditConfirm, setShowEditConfirm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchSummary();
  }, []);

  const fetchTasks = () => {
    setLoading(true);
    fetch("https://smart-task-tracker-backend-production.up.railway.app/tasks/")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch tasks.");
        setLoading(false);
      });
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

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      fetch(`https://smart-task-tracker-backend-production.up.railway.app/tasks/${taskToDelete.id}`, {
        method: "DELETE",
      })
        .then(() => {
          fetchTasks();
          fetchSummary();
          setShowDeleteConfirm(false);
          setTaskToDelete(null);
        })
        .catch(() => setError("Failed to delete task."));
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setTaskToDelete(null);
  };

  const handleEditClick = (task) => {
    setTaskToEdit(task);
    setShowEditConfirm(true);
  };

  const confirmEdit = () => {
    if (taskToEdit) {
      setEditingTask(taskToEdit);
      setShowForm(true);
      setShowEditConfirm(false);
      setTaskToEdit(null);
    }
  };

  const cancelEdit = () => {
    setShowEditConfirm(false);
    setTaskToEdit(null);
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

  const handleTaskSave = (taskData) => {
    if (editingTask) {
      // Update existing task
      fetch(`https://smart-task-tracker-backend-production.up.railway.app/tasks/${editingTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      })
        .then((res) => res.json())
        .then(() => {
          fetchTasks();
          fetchSummary();
          setShowForm(false);
          setEditingTask(null);
        })
        .catch(() => setError("Failed to update task."));
    } else {
      // Add new task
      fetch("https://smart-task-tracker-backend-production.up.railway.app/tasks/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      })
        .then((res) => res.json())
        .then(() => {
          fetchTasks();
          fetchSummary();
          setShowForm(false);
        })
        .catch(() => setError("Failed to create task."));
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-600";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Low": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case "work": return "bg-blue-100 text-blue-600";
      case "personal": return "bg-purple-100 text-purple-600";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-40">
        <div className="w-full max-w-2xl mx-auto">
          <TaskForm
            task={editingTask}
            onSave={handleTaskSave}
            onCancel={() => {
              setShowForm(false);
              setEditingTask(null);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white relative overflow-x-hidden">
      {/* Custom Delete Confirmation Modal */}
      {showDeleteConfirm && taskToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-red-100">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Task</h3>
            </div>
            
            {!taskToDelete.completed && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 font-medium text-sm">
                  Task is not yet completed
                </p>
              </div>
            )}
            
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete "{taskToDelete.title}"?
            </p>
            
            <div className="flex gap-3 justify-end">
              <Button
                onClick={cancelDelete}
                variant="outline"
                className="px-4 py-2"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Edit Confirmation Modal */}
      {showEditConfirm && taskToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-blue-100">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Edit Task</h3>
            </div>
            
            <p className="text-gray-700 mb-6">
              Ready to make this task even better? ✨
            </p>
            
            <div className="flex gap-3 justify-end">
              <Button
                onClick={cancelEdit}
                variant="outline"
                className="px-4 py-2"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmEdit}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white"
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="absolute top-8 right-12 z-20 flex gap-3">
        <Button
          onClick={() => {
            setShowSmartSuggestions(!showSmartSuggestions);
            setShowAIInsights(false); // Close AI Insights when opening Smart Tips
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-full shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-base transition-all duration-200 hover:from-green-600 hover:to-emerald-600 focus:outline-none"
        >
          <Lightbulb className="w-5 h-5" /> Smart Tips
        </Button>
        <Button
          onClick={() => {
            setShowAIInsights(!showAIInsights);
            setShowSmartSuggestions(false); // Close Smart Tips when opening AI Insights
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-base transition-all duration-200 hover:from-purple-600 hover:to-pink-600 focus:outline-none"
        >
          <Brain className="w-5 h-5" /> AI Insights
        </Button>
        <Button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-8 py-3 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-lg transition-all duration-200 hover:from-blue-600 hover:to-indigo-600 focus:outline-none"
          disabled={showForm}
        >
          <Plus className="w-5 h-5" /> Add Task
        </Button>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        {/* Header */}
        <div className="relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-30 blur-3xl animate-pulse z-0"></div>
          <h1 className="relative z-10 text-5xl font-bold text-gray-900 mb-2">Smart Task Tracker</h1>
          <p className="relative z-10 font-montserrat text-lg text-purple-500 tracking-wide mb-8">Stay organized and boost your productivity</p>
        </div>

        {/* Summary */}
        <TaskSummary summary={summary} />

        {/* AI Insights */}
        {showAIInsights && <AIInsights />}

        {/* Smart Suggestions */}
        {showSmartSuggestions && <SmartSuggestions onAddTask={handleTaskSave} />}

        {/* Tasks */}
        {showError && error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6 flex items-center justify-between">
              <p className="text-red-600">{error}</p>
              <Button variant="outline" className="ml-4" onClick={() => setShowError(false)}><X className="w-4 h-4" /></Button>
            </CardContent>
          </Card>
        )}

        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-14 h-14 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No tasks yet</h3>
            <p className="text-gray-600 mb-6">Create your first task to get started!</p>
            <Button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-8 py-3 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-lg transition-all duration-200 hover:from-blue-600 hover:to-indigo-600 focus:outline-none"
              disabled={showForm}
            >
              <Plus className="w-5 h-5" /> Add Your First Task
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {tasks.map((task) => (
              <Card
                key={task.id}
                className={`transition-all duration-200 bg-white/90 border-0 shadow-2xl px-6 py-5 mb-6 ${task.completed ? 'opacity-70' : ''}`}
              >
                <CardContent className="p-6 flex items-start gap-4">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => handleToggleComplete(task)}
                    className="w-6 h-6 rounded border-2 border-gray-300 checked:bg-green-500"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className={`text-lg font-bold ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>{task.title}</h3>
                      <Badge className={getCategoryColor(task.category) + ' rounded-full px-3 py-1 text-xs font-semibold'}>
                        {task.category || 'No Category'}
                      </Badge>
                      <Badge className={getPriorityColor(task.priority) + ' rounded-full px-3 py-1 text-xs font-semibold'}>
                        {task.priority}
                      </Badge>
                    </div>
                    {task.description && (
                      <p className={`text-base ${task.completed ? 'text-gray-400 line-through' : 'text-gray-600'}`}>{task.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => handleEditClick(task)}
                      disabled={showForm}
                      aria-label="Edit Task"
                      className="p-2 rounded-full hover:bg-blue-100 transition flex items-center justify-center focus:outline-none"
                      type="button"
                    >
                      <Edit className="w-5 h-5 text-blue-500" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(task)}
                      disabled={showForm}
                      aria-label="Delete Task"
                      className="p-2 rounded-full hover:bg-red-100 transition flex items-center justify-center focus:outline-none"
                      type="button"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;