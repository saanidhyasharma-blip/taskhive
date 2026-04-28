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
  today.setHours(0, 0, 0, 0);

  return rows.map((row, index) => {
    const planned = parseDate(row[3]);
    const actual = row[4] ? parseDate(row[4]) : null;
    const status = row[5];

    let score = 0;

    // Scoring Logic: Missed (-2) or Late (-1)
    if (status !== "Completed" && status !== "Done" && planned && planned < today) {
      score = -2;
    } else if (actual && planned && actual > planned) {
      score = -1;
    }

    return {
      id: index + 2,
      taskName: row[0],
      taskType: row[1],
      assignedTo: row[2],
      plannedDate: row[3],
      actualDate: row[4],
      status: row[5],
      score,
    };
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