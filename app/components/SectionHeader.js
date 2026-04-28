export default function SectionHeader({ title, icon, count = 0 }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        </div>
        <span className="text-xs font-medium text-muted bg-section-bg px-2.5 py-1 rounded-full border border-card-border/50">
          {count} {count === 1 ? "task" : "tasks"}
        </span>
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-card-border/60 via-card-border/20 to-transparent" />
    </div>
  );
}
