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
  const [aiSummary, setAiSummary] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const router = useRouter();

  const fetchAiSummary = async () => {
    setIsAiLoading(true);
    try {
      const res = await fetch("/api/ai-summary");
      const data = await res.json();
      if (data.summary) {
        setAiSummary(data.summary);
      }
    } catch (err) {
      console.error("AI Summary fetch error:", err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const fetchTasks = useCallback(async (user) => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();

      const allTasks = Array.isArray(data) ? data : data.value || [];

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
    fetchTasks(stored).then(() => {
      setIsLoaded(true);
      fetchAiSummary();
    });
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

  const totalScore = tasks.reduce((acc, t) => acc + (t.score || 0), 0);

  if (!isLoaded) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted text-sm font-medium">Loading tasks...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-6">
      {/* Header */}
      <header className="mb-8 flex items-start justify-between">
        <div>
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
        </div>

        <div className="text-right flex flex-col items-end">
          <div
            className={`px-3 py-1.5 rounded-lg border font-bold text-sm ${
              totalScore >= 0
                ? "bg-success/5 text-success border-success/20"
                : "bg-destructive/5 text-destructive border-destructive/20"
            }`}
          >
            Weekly Score: {totalScore > 0 ? `+${totalScore}` : totalScore}
          </div>
        </div>
      </header>

      {/* AI Summary Section */}
      {(isAiLoading || aiSummary) && (
        <section className="mb-8">
          <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/10">
            <div className="flex items-start gap-3">
              <div className="mt-1 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  Your Productivity Insight
                </h3>
                {isAiLoading ? (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce [animation-delay:-.3s]" />
                    <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce [animation-delay:-.5s]" />
                  </div>
                ) : (
                  <p className="text-sm text-muted leading-relaxed">
                    &ldquo;{aiSummary}&rdquo;
                  </p>
                )}
              </div>
            </div>
          </Card>
        </section>
      )}

      {error && (
        <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
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
            <EmptyState message="No tasks for today 🎉" />
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
            <EmptyState message="No tasks for today 🎉" />
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
