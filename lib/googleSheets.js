import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;

// Helper to parse DD/MM/YYYY dates
function parseDate(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split("/");
  if (parts.length !== 3) return new Date(dateStr); // Fallback for ISO
  const [day, month, year] = parts.map(Number);
  return new Date(year, month - 1, day);
}

// Fetch tasks
export async function fetchTasks() {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Sheet1!A2:G",
  });

  const rows = response.data.values || [];
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today for fair comparison

  return rows.map((row, index) => {
    const task = {
      id: index + 2, // row index in sheet
      taskName: row[0],
      taskType: row[1],
      assignedTo: row[2],
      plannedDate: row[3],
      actualDate: row[4],
      status: row[5],
      score: parseInt(row[6]) || 0,
    };

    // Weekly Scoring Logic
    const pDate = parseDate(task.plannedDate);
    const aDate = parseDate(task.actualDate);
    const isCompleted = task.status === "Done" || task.status === "Completed";

    if (!isCompleted && pDate && pDate < today) {
      task.score = -2; // missed
    } else if (aDate && pDate && aDate > pDate) {
      task.score = -1; // late
    }

    return task;
  });
}

// Update task
export async function updateTask(rowIndex) {
  const today = new Date().toISOString().split("T")[0];

  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `Sheet1!E${rowIndex}:F${rowIndex}`,
    valueInputOption: "RAW",
    requestBody: {
      values: [[today, "Completed"]],
    },
  });

  return { success: true };
}