
import TaskCard from "./TaskCard";

function TaskList({ tasks, onStatusChange, onDeleteTask }) {
  return (
    <div className="task-list">

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onDeleteTask={onDeleteTask}
        />
      ))}

      {tasks.length === 0 && (
        <p>No tasks available. Create your first task!</p>
      )}

    </div>
  );
}

export default TaskList;
