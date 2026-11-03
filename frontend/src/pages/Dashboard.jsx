import { useCallback, useEffect, useState } from "react";

import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

import {
  getTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../services/taskService";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch tasks from backend
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getTasks(statusFilter, priorityFilter);

      setTasks(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch tasks. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, [statusFilter, priorityFilter]);

  // Fetch whenever filters change
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Create or update task
  const handleSubmitTask = async (taskData) => {
    try {
      setError("");
      setSuccess("");

      if (editingTask) {
        await updateTask(editingTask.id, taskData);
        setSuccess("Task updated successfully.");
      } else {
        await createTask(taskData);
        setSuccess("Task created successfully.");
      }

      setShowForm(false);
      setEditingTask(null);

      await fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save task.");
    }
  };

  // Open edit form
  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  // Change task status
  const handleStatusChange = async (id, status) => {
    try {
      setError("");
      setSuccess("");

      await updateTaskStatus(id, status);

      setSuccess("Task status updated successfully.");

      await fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task status.");
    }
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await deleteTask(id);

      setSuccess("Task deleted successfully.");

      await fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task.");
    }
  };

  // Open create form
  const handleAddTask = () => {
    setEditingTask(null);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  // Close form
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.status === "DONE").length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS",
  ).length;

  return (
    <div className="dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div>
          <h1>Task Manager</h1>
          <p>Manage your daily tasks efficiently.</p>
        </div>

        <button onClick={handleAddTask}>+ Add Task</button>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Tasks</h3>
          <p>{totalTasks}</p>
        </div>

        <div className="summary-card">
          <h3>In Progress</h3>
          <p>{inProgressTasks}</p>
        </div>

        <div className="summary-card">
          <h3>Completed</h3>
          <p>{completedTasks}</p>
        </div>
      </div>

      {/* Filters */}
      {/* Filters */}
      <div className="filters">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">All Priorities</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <button
          className="reset-button"
          onClick={() => {
            setStatusFilter("");
            setPriorityFilter("");
          }}
          disabled={!statusFilter && !priorityFilter}
        >
          <span>↺</span> Reset Filters
        </button>
      </div>

      {/* Feedback Messages */}
      {error && <div className="error-message">{error}</div>}

      {success && <div className="success-message">{success}</div>}

      {/* Create/Edit Form */}
      {showForm && (
        <TaskForm
          key={editingTask?.id ?? "new-task"}
          initialTask={editingTask}
          onSubmitTask={handleSubmitTask}
          onCancel={handleCancelForm}
        />
      )}

      {/* Task List */}
      {loading ? (
        <p className="loading-message">Loading tasks...</p>
      ) : (
        <TaskList
          tasks={tasks}
          onStatusChange={handleStatusChange}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
      )}
    </div>
  );
}

export default Dashboard;
