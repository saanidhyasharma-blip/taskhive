import { fetchTasks } from "@/lib/googleSheets";

export async function GET() {
  try {
    const tasks = await fetchTasks();
    return Response.json(tasks);
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return Response.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}
