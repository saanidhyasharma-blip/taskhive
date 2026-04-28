"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "../components/Card";
import SectionHeader from "../components/SectionHeader";
import EmptyState from "../components/EmptyState";

export default function DashboardPage() {
  const [userName, setUserName] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  // Hydration-safe: read localStorage only after mount
  useEffect(() => {
    const stored = localStorage.getItem("taskhive_user");
    if (!stored) {
      router.push("/");
      return;
    }
    setUserName(stored);
    setIsLoaded(true);
  }, [router]);

  if (!isLoaded) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <p className="text-muted text-sm">Loading...</p>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-6">
      {/* Header */}
      <header className="mb-8">
        <p className="text-sm text-muted mb-1">Welcome back,</p>
        <h1 className="text-2xl font-bold text-foreground">{userName}</h1>
      </header>

      {/* Recurring Tasks Section */}
      <section className="mb-6">
        <Card>
          <SectionHeader title="Recurring Tasks" icon="🔁" count={0} />
          <EmptyState message="No recurring tasks yet. These will repeat on a schedule." />
        </Card>
      </section>

      {/* One-time Tasks Section */}
      <section className="mb-6">
        <Card>
          <SectionHeader title="One-time Tasks" icon="📌" count={0} />
          <EmptyState message="No one-time tasks yet. Add tasks to get started." />
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
