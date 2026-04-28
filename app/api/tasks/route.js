import { NextResponse } from "next/server";
import { mockTasks } from "@/lib/mockData";

/**
 * GET /api/tasks
 *
 * Returns mock task data. Supports optional query params:
 * - assignedTo: filter by assigned user
 * - date: filter by planned date (YYYY-MM-DD)
 * - status: filter by status (Pending / Done)
 * - type: filter by task type (Daily / Weekly / One-time)
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const assignedTo = searchParams.get("assignedTo");
  const date = searchParams.get("date");
  const status = searchParams.get("status");
  const type = searchParams.get("type");

  let tasks = [...mockTasks];

  if (assignedTo) {
    tasks = tasks.filter(
      (t) => t.assignedTo.toLowerCase() === assignedTo.toLowerCase()
    );
  }

  if (date) {
    tasks = tasks.filter((t) => t.plannedDate === date);
  }

  if (status) {
    tasks = tasks.filter(
      (t) => t.status.toLowerCase() === status.toLowerCase()
    );
  }

  if (type) {
    tasks = tasks.filter(
      (t) => t.taskType.toLowerCase() === type.toLowerCase()
    );
  }

  return NextResponse.json({ tasks, total: tasks.length });
}
