"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Card from "../components/Card";
import SectionHeader from "../components/SectionHeader";
import EmptyState from "../components/EmptyState";
import TaskCard from "../components/TaskCard";

export default function DashboardPage() {
  const [userName, setUserName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchTasks = useCallback(async (user) => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();

      // Handle the "value" property from the sheet response
      const allTasks = Array.isArray(data) ? data : data.value || [];

      // Filter: Match the sheet's status and assigned user
      // Statuses in sheet: "In Progress", "Not Started", "Completed"
      const filtered = allTasks.filter(
        (t) =>
          t.assignedTo.toLowerCase() === user.toLowerCase() &&
          (t.status === "In Progress" || t.status === "Not Started")
      );

      setTasks(filtered);
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load tasks");
    }
  }, []);

  // Hydration-safe: read localStorage only after mount
  useEffect(() => {
    const stored = localStorage.getItem("taskhive_user");
    if (!stored) {
      router.push("/");
      return;
    }
    setUserName(stored);
    fetchTasks(stored).then(() => setIsLoaded(true));
  }, [router, fetchTasks]);

  const handleMarkDone = async (taskId) => {
    const res = await fetch("/api/update-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: taskId }),
    });
    const data = await res.json();

    if (data.success) {
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  };

  // Split tasks - adjust categories to match your sheet or show all in one
  const recurringTasks = tasks.filter(
    (t) => t.taskType === "Daily" || t.taskType === "Weekly"
  );
  const otherTasks = tasks.filter(
    (t) => t.taskType !== "Daily" && t.taskType !== "Weekly"
  );

  if (!isLoaded) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <p className="text-muted text-sm">Loading tasks...</p>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-6">
      {/* Header */}
      <header className="mb-8">
        <p className="text-sm text-muted mb-1">Welcome back,</p>
        <h1 className="text-2xl font-bold text-foreground">{userName}</h1>
        <p className="text-xs text-muted mt-1">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Recurring Tasks Section */}
      <section className="mb-6">
        <Card>
          <SectionHeader
            title="Recurring Tasks"
            icon="🔁"
            count={recurringTasks.length}
          />
          {recurringTasks.length === 0 ? (
            <EmptyState message="No recurring tasks for today." />
          ) : (
            <div className="space-y-3">
              {recurringTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onMarkDone={handleMarkDone}
                />
              ))}
            </div>
          )}
        </Card>
      </section>

      {/* Project Tasks Section */}
      <section className="mb-6">
        <Card>
          <SectionHeader
            title="Project Tasks"
            icon="📌"
            count={otherTasks.length}
          />
          {otherTasks.length === 0 ? (
            <EmptyState message="No project tasks found." />
          ) : (
            <div className="space-y-3">
              {otherTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onMarkDone={handleMarkDone}
                />
              ))}
            </div>
          )}
        </Card>
      </section>

      {/* Footer */}
      <footer className="mt-auto pt-6 pb-4 text-center">
        <button
          onClick={() => {
            localStorage.removeItem("taskhive_user");
            router.push("/");
          }}
          className="text-xs text-muted hover:text-foreground transition-colors cursor-pointer"
        >
          Switch user
        </button>
      </footer>
    </main>
  );
}
