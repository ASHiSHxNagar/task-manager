function FilterBar({
  search,
  status,
  priority,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onReset,
}) {
  const hasActiveFilters = Boolean(
    (search && search.trim() !== "") || status || priority
  );

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted">
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full rounded-lg border border-border bg-surface py-2 pl-10 pr-9 text-sm text-text outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
        />

        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted transition hover:text-text"
            title="Clear search text"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Status Dropdown */}
        <div className="relative min-w-[130px] flex-1 sm:flex-initial">
          <select
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            className="w-full cursor-pointer appearance-none rounded-lg border border-border bg-surface py-2 pl-3.5 pr-8 text-sm text-text outline-none transition hover:border-gray-400 focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-muted">
            <svg
              className="h-4 w-4"
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

        {/* Priority Dropdown */}
        <div className="relative min-w-[130px] flex-1 sm:flex-initial">
          <select
            value={priority}
            onChange={(event) => onPriorityChange(event.target.value)}
            className="w-full cursor-pointer appearance-none rounded-lg border border-border bg-surface py-2 pl-3.5 pr-8 text-sm text-text outline-none transition hover:border-gray-400 focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-muted">
            <svg
              className="h-4 w-4"
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

        {/* Reset Filter Button */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50/80 px-3.5 py-2 text-sm font-medium text-danger transition hover:bg-red-100 hover:border-red-300 active:scale-95"
            title="Reset all active filters"
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}

export default FilterBar;