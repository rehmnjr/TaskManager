
import { useState } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

function Dashboard() {

  // 1. Tasks state
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Learn ASP.NET Core",
      description: "Understand Web API and Entity Framework",
      status: "IN_PROGRESS",
      priority: "HIGH",
    },
    {
      id: 2,
      title: "Build React Dashboard",
      description: "Create task management interface",
      status: "TODO",
      priority: "MEDIUM",
    },
    {
      id: 3,
      title: "Practice SQL",
      description: "Learn joins and relationships",
      status: "DONE",
      priority: "LOW",
    },
  ]);

  // 2. Other state variables
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  // 3. Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "ALL" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "ALL" || task.priority === priorityFilter;

    return matchesStatus && matchesPriority;
  });

  // 4. Create task
  const handleCreateTask = (newTask) => {
    const task = {
      id: Date.now(),
      ...newTask,
      createdDate: new Date().toISOString(),
    };

    setTasks((previousTasks) => [task, ...previousTasks]);
    setShowForm(false);
  };

  // 5. Update task status
  const handleStatusChange = (taskId, newStatus) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );
  };

  // 6. Delete task
  const handleDeleteTask = (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId)
    );
  };

  return (
    <div className="dashboard">

      {/* Header */}
      <header className="dashboard-header">
        <div>
          <h1>Task Manager</h1>
          <p>Manage your daily tasks efficiently.</p>
        </div>

        <button
          className="create-button"
          onClick={() => setShowForm(true)}
        >
          + Create Task
        </button>
      </header>

      {/* Create Task Form */}
      {showForm && (
        <TaskForm
          onCreateTask={handleCreateTask}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Summary */}
      <section className="summary">

        <div className="summary-card">
          <h3>Total Tasks</h3>
          <h2>{tasks.length}</h2>
        </div>

        <div className="summary-card">
          <h3>In Progress</h3>
          <h2>
            {tasks.filter(
              (task) => task.status === "IN_PROGRESS"
            ).length}
          </h2>
        </div>

        <div className="summary-card">
          <h3>Completed</h3>
          <h2>
            {tasks.filter(
              (task) => task.status === "DONE"
            ).length}
          </h2>
        </div>

      </section>

      {/* Filters */}
      <div className="task-filters">

        <div className="form-group">
          <label>Filter by Status</label>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </div>

        <div className="form-group">
          <label>Filter by Priority</label>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="ALL">All Priorities</option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        <button
          className="reset-filter-button"
          onClick={() => {
            setStatusFilter("ALL");
            setPriorityFilter("ALL");
          }}
        >
          Reset Filters
        </button>

      </div>

      {/* Task List */}
      <section className="tasks-section">
        <h2>My Tasks</h2>

        <TaskList
          tasks={filteredTasks}
          onStatusChange={handleStatusChange}
          onDeleteTask={handleDeleteTask}
        />

      </section>

    </div>
  );
}

export default Dashboard;
