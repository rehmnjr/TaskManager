
import { useState } from "react";

function TaskCard({ task, onStatusChange, onDeleteTask }) {

  const [isEditing, setIsEditing] = useState(false);
  const [newStatus, setNewStatus] = useState(task.status);

  // Save updated status
  const handleSave = () => {
    onStatusChange(task.id, newStatus);
    setIsEditing(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setNewStatus(task.status);
    setIsEditing(false);
  };

  return (
    <div className="task-card">

      <div className="task-card-header">
        <h3>{task.title}</h3>
        <span>{task.priority}</span>
      </div>

      <p>{task.description}</p>

      <div className="task-card-footer">

        {/* Status display or editing */}
        {isEditing ? (
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        ) : (
          <span>{task.status}</span>
        )}

        <div className="task-actions">

          {isEditing ? (
            <>
              <button onClick={handleSave}>
                Save
              </button>

              <button onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={() => {
                setNewStatus(task.status);
                setIsEditing(true);
              }}>
                Edit
              </button>

              <button onClick={() => onDeleteTask(task.id)}>
                Delete
              </button>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default TaskCard;
