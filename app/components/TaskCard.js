"use client";

import { useState } from "react";

export default function TaskCard({ task, onMarkDone }) {
  const [loading, setLoading] = useState(false);
  const isDone = task.status === "Done";

  const handleMarkDone = async () => {
    if (isDone || loading) return;
    setLoading(true);
    try {
      await onMarkDone(task.id);
    } finally {
      setLoading(false);
    }
  };

  const typeColors = {
    Daily: "bg-blue-50 text-blue-700 border-blue-200",
    Weekly: "bg-purple-50 text-purple-700 border-purple-200",
    "One-time": "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <div
      className={`flex items-center justify-between gap-3 p-4 rounded-lg border transition-colors ${
        isDone
          ? "bg-gray-50 border-gray-200 opacity-60"
          : "bg-white border-card-border hover:border-primary/30"
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${typeColors[task.taskType] || "bg-gray-50 text-gray-600 border-gray-200"}`}
          >
            {task.taskType}
          </span>
          {isDone && (
            <span className="text-[11px] font-medium text-success">
              ✓ Done
            </span>
          )}
        </div>
        <p
          className={`text-sm font-medium ${isDone ? "line-through text-muted" : "text-foreground"}`}
        >
          {task.taskName}
        </p>
        <p className="text-xs text-muted mt-1">
          {task.plannedDate} · {task.assignedTo}
        </p>
      </div>

      {!isDone && (
        <button
          onClick={handleMarkDone}
          disabled={loading}
          className="shrink-0 px-3 py-1.5 text-xs font-medium rounded-md bg-success/10 text-success border border-success/20 hover:bg-success/20 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "..." : "Mark Done"}
        </button>
      )}
    </div>
  );
}
