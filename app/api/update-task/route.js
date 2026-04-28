import { NextResponse } from "next/server";

/**
 * POST /api/update-task
 *
 * Accepts a task ID and marks it as "Done".
 * Body: { id: string }
 * Returns: { success: true, id, status: "Done" }
 *
 * Note: This is a simulation — no real persistence.
 * In production, this will update the Google Sheet.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Task ID is required" },
        { status: 400 }
      );
    }

    // Simulate a small delay like a real API call
    await new Promise((resolve) => setTimeout(resolve, 200));

    return NextResponse.json({
      success: true,
      id,
      status: "Done",
      message: `Task ${id} marked as done`,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}
