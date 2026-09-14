function StatsCard({ title, value }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <p className="text-sm font-medium text-muted">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-text">
        {value}
      </p>
    </div>
  );
}

export default StatsCard;