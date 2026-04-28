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
      const today = new Date().toISOString().split("T")[0];
      const res = await fetch(
        `/api/tasks?date=${today}&status=Pending`
      );
      const data = await res.json();
      setTasks(data.tasks || []);
      setError(null);
    } catch {
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
      // Update UI instantly — remove the task from the pending list
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  };

  // Split tasks into recurring (Daily + Weekly) and one-time
  const recurringTasks = tasks.filter(
    (t) => t.taskType === "Daily" || t.taskType === "Weekly"
  );
  const oneTimeTasks = tasks.filter((t) => t.taskType === "One-time");

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

      {/* One-time Tasks Section */}
      <section className="mb-6">
        <Card>
          <SectionHeader
            title="One-time Tasks"
            icon="📌"
            count={oneTimeTasks.length}
          />
          {oneTimeTasks.length === 0 ? (
            <EmptyState message="No one-time tasks for today." />
          ) : (
            <div className="space-y-3">
              {oneTimeTasks.map((task) => (
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
