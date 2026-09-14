import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import FilterBar from "../components/FilterBar";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import api from "../services/api";

function DashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });

  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      const response = await api.get("/tasks/stats");
      setStats(response.data);
    } catch (error) {
      setError("Failed to load task stats");
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (search) {
        params.append("search", search);
      }

      if (status) {
        params.append("status", status);
      }

      if (priority) {
        params.append("priority", priority);
      }

      const query = params.toString();

      const response = await api.get(
        query ? `/tasks?${query}` : "/tasks"
      );

      setTasks(response.data.tasks);
    } catch (error) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [search, status, priority]);

  const handleCreateTask = async (taskData) => {
    try {
      await api.post("/tasks", taskData);
      setShowForm(false);

      await fetchTasks();
      await fetchStats();
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to create task"
      );
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, {
        status: newStatus,
      });

      await fetchTasks();
      await fetchStats();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update task status"
      );
    }
  };

  const handleDelete = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/tasks/${taskId}`);

      await fetchTasks();
      await fetchStats();
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to delete task"
      );
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatus("");
    setPriority("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-text">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-muted">
              Manage and track your tasks
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-medium text-white shadow-xs transition hover:bg-primary-dark active:scale-95"
          >
            {showForm ? (
              <>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Close Form
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Task
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-danger">
            {error}
          </div>
        )}

        {showForm && (
          <div className="mb-8">
            <TaskForm
              onSubmit={handleCreateTask}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Tasks"
            value={stats.total}
          />

          <StatsCard
            title="Pending"
            value={stats.pending}
          />

          <StatsCard
            title="In Progress"
            value={stats.inProgress}
          />

          <StatsCard
            title="Completed"
            value={stats.completed}
          />
        </div>

        <div className="mb-6">
          <FilterBar
            search={search}
            status={status}
            priority={priority}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
            onPriorityChange={setPriority}
            onReset={handleResetFilters}
          />
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text">
              Tasks
            </h2>

            <span className="text-sm font-medium text-muted">
              {tasks.length} task{tasks.length !== 1 ? "s" : ""}
            </span>
          </div>

          {loading ? (
            <div className="rounded-xl border border-border bg-surface p-12 text-center">
              <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="text-sm text-muted">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="rounded-xl border border-border bg-surface p-12 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-muted">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>

              <h3 className="text-base font-semibold text-text">
                No tasks found
              </h3>

              <p className="mt-1 text-sm text-muted">
                {search || status || priority
                  ? "No tasks match your current filter criteria."
                  : "Create a task or change your filters."}
              </p>

              {(search || status || priority) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-text transition hover:bg-gray-100"
                >
                  Reset Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;