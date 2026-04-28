export default function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-success/5 to-success/10 flex items-center justify-center mb-4 border border-success/10 animate-in fade-in zoom-in duration-500">
        <span className="text-2xl">🎉</span>
      </div>
      <p className="text-sm font-medium text-foreground mb-1">{message}</p>
      <p className="text-xs text-muted">You're all caught up for now!</p>
    </div>
  );
}
