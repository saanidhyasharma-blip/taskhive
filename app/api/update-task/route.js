import { updateTask } from "@/lib/googleSheets";

export async function POST(request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return Response.json(
        { success: false, error: "Task ID (row index) is required" },
        { status: 400 }
      );
    }

    const result = await updateTask(id);
    return Response.json(result);
  } catch (error) {
    console.error("Failed to update task:", error);
    return Response.json(
      { success: false, error: "Failed to update task" },
      { status: 500 }
    );
  }
}
