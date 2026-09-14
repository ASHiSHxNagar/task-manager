import { Link } from "react-router-dom";

function TaskCard({ task, onDelete, onStatusChange }) {
  const priorityClasses = {
    low: "bg-emerald-50 text-emerald-700 border-emerald-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    high: "bg-rose-50 text-rose-700 border-rose-200",
  };

  const statusClasses = {
    pending: "bg-slate-100 text-slate-700 border-slate-200",
    "in-progress": "bg-blue-50 text-blue-700 border-blue-200",
    completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  return (
    <div className="flex flex-col justify-between rounded-xl border border-border bg-surface p-5 shadow-xs transition hover:shadow-md">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3
              className="truncate text-lg font-semibold text-text"
              title={task.title}
            >
              {task.title}
            </h3>

            {task.description && (
              <p className="mt-1.5 text-sm text-muted line-clamp-2">
                {task.description}
              </p>
            )}
          </div>

          <span
            className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${
              priorityClasses[task.priority] || "bg-gray-100 text-gray-700"
            }`}
          >
            {task.priority}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${
              statusClasses[task.status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {task.status === "in-progress" ? "In Progress" : task.status}
          </span>

          {task.dueDate && (
            <span className="flex items-center gap-1 text-xs text-muted">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
        {/* Quick Status Select with Styled Chevron */}
        <div className="relative inline-flex items-center">
          <select
            value={task.status}
            onChange={(event) =>
              onStatusChange(task._id, event.target.value)
            }
            className="cursor-pointer appearance-none rounded-lg border border-border bg-surface py-2 pl-3 pr-8 text-sm font-medium text-text outline-none transition hover:border-gray-400 focus:border-primary focus:ring-1 focus:ring-primary capitalize"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-muted">
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M6 8l4 4 4-4"
              />
            </svg>
          </div>
        </div>

        {/* Direct Edit Page Link */}
        <Link
          to={`/tasks/${task._id}`}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-white shadow-xs transition hover:bg-primary-dark active:scale-95"
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit
        </Link>

        {/* Delete Action */}
        <button
          type="button"
          onClick={() => onDelete(task._id)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50/60 px-3 py-2 text-sm font-medium text-danger transition hover:bg-red-100 hover:border-red-300 active:scale-95"
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;