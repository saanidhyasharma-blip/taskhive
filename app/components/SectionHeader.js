export default function SectionHeader({ title, icon, count = 0 }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>
      <span className="text-xs font-medium text-muted bg-section-bg px-2.5 py-1 rounded-full">
        {count} {count === 1 ? "task" : "tasks"}
      </span>
    </div>
  );
}
