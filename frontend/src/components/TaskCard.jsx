function TaskCard({
  task,
  onStatusChange,
  onDeleteTask,
  onEditTask,
}) {
  const handleStatusChange = (e) => {
    onStatusChange(task.id, e.target.value);
  };

  return (
    <div className="task-card">
      <div className="task-card-header">
        <h3>{task.title}</h3>
        <span>{task.priority}</span>
      </div>

      <p>{task.description || "No description provided."}</p>

      <div className="task-card-footer">
        <select
          value={task.status}
          onChange={handleStatusChange}
          aria-label={`Change status of ${task.title}`}
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>

        <div className="task-actions">
          <button onClick={() => onEditTask(task)}>
            Edit
          </button>

          <button onClick={() => onDeleteTask(task.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;