import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { ArrowLeft, Save } from "lucide-react";

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
 * @typedef {Object} TaskFormProps
 * @property {Task|null} [task]
 * @property {(taskData: Omit<Task, 'id'>) => void} onSave
 * @property {() => void} onCancel
 */

const TaskForm = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCategory(task.category);
      setPriority(task.priority);
    }
  }, [task]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!category.trim()) {
      newErrors.category = "Category is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      priority,
      completed: task?.completed || false,
    });
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-2">
      <Card className="w-full max-w-lg rounded-xl shadow-xl bg-white/95 p-0 overflow-hidden">
        {/* Back Icon */}
        <div className="flex items-center gap-2 px-6 pt-6 pb-2">
          <button
            onClick={onCancel}
            aria-label="Back to Tasks"
            className="rounded-full p-2 hover:bg-gray-100 transition"
            type="button"
          >
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        {/* Header */}
        <div className="px-6 pb-2">
          <h2 className="text-2xl font-bold text-gray-900">{task ? "Edit Task" : "Create New Task"}</h2>
          <p className="text-gray-500 text-base mt-1 mb-2">{task ? "Update your task details" : "Add a new task to your tracker"}</p>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-2 space-y-5">
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Task Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              className={`mt-1 w-full rounded-full pl-6 text-center border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-base ${errors.title ? 'border-red-300 focus:border-red-500' : ''}`}
            />
            {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
          </div>
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add task description (optional)..."
              className="mt-1 w-full rounded-full pl-6 text-center border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-base min-h-[90px] resize-none"
            />
          </div>
          <div>
            <Label htmlFor="category" className="text-sm font-medium text-gray-700">
              Category <span className="text-red-500">*</span>
            </Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., work, personal"
              className={`mt-1 w-full rounded-full pl-6 text-center border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-base ${errors.category ? 'border-red-300 focus:border-red-500' : ''}`}
            />
            {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700">Priority</Label>
            <Select value={priority} onValueChange={handlePriorityChange}>
              <SelectTrigger className="mt-1 w-full rounded-full pl-6 text-center border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-full">
                <SelectItem value="Low">Low Priority</SelectItem>
                <SelectItem value="Medium">Medium Priority</SelectItem>
                <SelectItem value="High">High Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3 pt-2">
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base font-semibold rounded-full shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {task ? "Update Task" : "Create Task"}
            </Button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full h-12 text-base font-medium text-gray-500 hover:text-blue-700 hover:bg-gray-100 rounded-full transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default TaskForm;