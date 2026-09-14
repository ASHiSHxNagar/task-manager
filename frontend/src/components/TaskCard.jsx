import { Link } from "react-router-dom";

function TaskCard({ task, onDelete, onStatusChange }) {
  const priorityClasses = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  const statusClasses = {
    pending: "bg-slate-100 text-slate-700",
    "in-progress": "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
  };

  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-text">
            {task.title}
          </h3>

          {task.description && (
            <p className="mt-2 text-sm text-muted">
              {task.description}
            </p>
          )}
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            priorityClasses[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            statusClasses[task.status]
          }`}
        >
          {task.status}
        </span>

        {task.dueDate && (
          <span className="text-sm text-muted">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <select
          value={task.status}
          onChange={(event) =>
            onStatusChange(task._id, event.target.value)
          }
          className="rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <Link
          to={`/tasks/${task._id}`}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-dark"
        >
          View / Edit
        </Link>

        <button
          onClick={() => onDelete(task._id)}
          className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-danger transition hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;