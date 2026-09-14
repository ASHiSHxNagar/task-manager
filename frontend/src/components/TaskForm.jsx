import { useEffect, useState } from "react";

function TaskForm({ task, onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setPriority(task.priority || "medium");

      if (task.dueDate) {
        setDueDate(task.dueDate.slice(0, 10));
      } else {
        setDueDate("");
      }
    }
  }, [task]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate || undefined,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-surface p-6 shadow-sm"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-text">
          Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter task title"
          className="w-full rounded-lg border border-border px-4 py-2.5 outline-none focus:border-primary"
        />
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-sm font-medium text-text">
          Description
        </label>

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter task description"
          rows="4"
          className="w-full rounded-lg border border-border px-4 py-2.5 outline-none focus:border-primary"
        />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-text">
            Priority
          </label>

          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 outline-none focus:border-primary"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-text">
            Due Date
          </label>

          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            className="w-full rounded-lg border border-border px-4 py-2.5 outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-primary px-5 py-2.5 font-medium text-white transition hover:bg-primary-dark"
        >
          {task ? "Update Task" : "Create Task"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-border px-5 py-2.5 font-medium text-text transition hover:bg-background"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;