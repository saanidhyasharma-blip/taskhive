"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./components/Button";
import Card from "./components/Card";

export default function HomePage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    localStorage.setItem("taskhive_user", trimmed);
    router.push("/dashboard");
  };

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md text-center">
        {/* Logo / Brand */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground">TaskHive</h1>
          <p className="text-muted mt-2 text-sm">
            Organize your tasks, stay productive.
          </p>
        </div>

        {/* Name Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-foreground mb-2 text-left"
            >
              What&#39;s your name?
            </label>
            <input
              id="username"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              autoComplete="off"
              className="w-full px-4 py-3 rounded-lg border border-card-border bg-white text-foreground placeholder:text-muted/60 text-sm transition-colors hover:border-primary/40 focus:border-primary"
            />
          </div>
          <Button type="submit" disabled={!name.trim()} fullWidth>
            Continue to Dashboard
          </Button>
        </form>
      </Card>
    </main>
  );
}    


"use client";

export default function Home() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>TaskHive is Live 🚀</h1>
      <p>If you see this, routing is working.</p>
    </div>
  );
}
