import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import api from "../services/api";

function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);

  const fetchTask = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/tasks/${id}`);
      setTask(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to load task"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleUpdate = async (taskData) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);

      setTask(response.data.task);
      setEditing(false);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to update task"
      );
    }
  };

  const handleStatusChange = async (event) => {
    try {
      const response = await api.patch(`/tasks/${id}/status`, {
        status: event.target.value,
      });

      setTask(response.data.task);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update task status"
      );
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/tasks/${id}`);
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to delete task"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted">Loading task...</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text">
            Task not found
          </h1>

          <Link
            to="/"
            className="mt-4 inline-block text-primary hover:underline"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <Link
            to="/"
            className="text-sm font-medium text-primary hover:underline"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-danger">
            {error}
          </div>
        )}

        {editing ? (
          <div>
            <h1 className="mb-5 text-2xl font-bold text-text">
              Edit Task
            </h1>

            <TaskForm
              task={task}
              onSubmit={handleUpdate}
              onCancel={() => setEditing(false)}
            />
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
              <div>
                <h1 className="text-3xl font-bold text-text">
                  {task.title}
                </h1>

                <p className="mt-3 text-muted">
                  {task.description || "No description provided."}
                </p>
              </div>

              <span className="h-fit rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {task.priority}
              </span>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted">Status</p>

                <select
                  value={task.status}
                  onChange={handleStatusChange}
                  className="mt-2 rounded-lg border border-border bg-surface px-4 py-2.5 outline-none focus:border-primary"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <p className="text-sm text-muted">Due Date</p>

                <p className="mt-2 font-medium text-text">
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "No due date"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted">Created</p>

                <p className="mt-2 font-medium text-text">
                  {new Date(task.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted">Last Updated</p>

                <p className="mt-2 font-medium text-text">
                  {new Date(task.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-6">
              <button
                onClick={() => setEditing(true)}
                className="rounded-lg bg-primary px-5 py-2.5 font-medium text-white transition hover:bg-primary-dark"
              >
                Edit Task
              </button>

              <button
                onClick={handleDelete}
                className="rounded-lg border border-red-200 px-5 py-2.5 font-medium text-danger transition hover:bg-red-50"
              >
                Delete Task
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskDetailPage;