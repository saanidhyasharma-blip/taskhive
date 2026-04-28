import { generateSummary } from "@/lib/claude";
import { fetchTasks } from "@/lib/googleSheets";

export async function GET() {
  try {
    const tasks = await fetchTasks();
    const summary = await generateSummary(tasks);
    return Response.json({ summary });
  } catch (err) {
    console.error("AI Summary Error:", err);
    return Response.json({ error: "AI failed" }, { status: 500 });
  }
}
