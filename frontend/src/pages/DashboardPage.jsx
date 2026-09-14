import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-text">
              Dashboard
            </h1>

            <p className="mt-1 text-muted">
              Manage and track your tasks
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-primary px-5 py-3 font-medium text-white transition hover:bg-primary-dark"
          >
            {showForm ? "Close" : "+ Add Task"}
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-danger">
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
          />
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text">
              Tasks
            </h2>

            <span className="text-sm text-muted">
              {tasks.length} task{tasks.length !== 1 ? "s" : ""}
            </span>
          </div>

          {loading ? (
            <div className="rounded-xl border border-border bg-surface p-8 text-center">
              <p className="text-muted">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="rounded-xl border border-border bg-surface p-8 text-center">
              <h3 className="text-lg font-semibold text-text">
                No tasks found
              </h3>

              <p className="mt-2 text-sm text-muted">
                Create a task or change your filters.
              </p>
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