import { updateTask } from "@/lib/googleSheets";

export async function POST(req) {
  try {
    const { id } = await req.json();
    await updateTask(id);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "Update failed" }, { status: 500 });
  }
}
