function FilterBar({
  search,
  status,
  priority,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 md:flex-row">
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        className="flex-1 rounded-lg border border-border px-4 py-2.5 outline-none focus:border-primary"
      />

      <select
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
        className="rounded-lg border border-border bg-surface px-4 py-2.5 outline-none focus:border-primary"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        value={priority}
        onChange={(event) => onPriorityChange(event.target.value)}
        className="rounded-lg border border-border bg-surface px-4 py-2.5 outline-none focus:border-primary"
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}

export default FilterBar;