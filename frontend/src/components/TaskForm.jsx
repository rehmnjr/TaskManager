
import { useState } from "react";

function TaskForm({ onCreateTask, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM"
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    if (name === "title") {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError("Task title is required.");
      return;
    }

    onCreateTask({
      ...formData,
      title: formData.title.trim()
    });
  };

  return (
    <div className="task-form-container">

      <div className="form-header">
        <div>
          <h2>Create New Task</h2>
          <p>Add a new task to your task manager.</p>
        </div>

        <button
          type="button"
          className="close-button"
          onClick={onCancel}
          aria-label="Close form"
        >
          ×
        </button>
      </div>

      <form className="task-form" onSubmit={handleSubmit}>

        <div className="form-group full-width">
          <label htmlFor="title">Task Title *</label>

          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Complete React project"
            maxLength={200}
            required
          />

          {error && <span className="form-error">{error}</span>}
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe what needs to be done..."
            rows={4}
            maxLength={1000}
          />
        </div>

        <div className="form-row">

          <div className="form-group">
            <label htmlFor="status">Status</label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>

            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          </div>

        </div>

        <div className="form-actions">

          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>

          <button type="submit" className="save-button">
            Create Task
          </button>

        </div>

      </form>
    </div>
  );
}

export default TaskForm;
