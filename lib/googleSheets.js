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

// Fetch tasks
export async function fetchTasks() {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Sheet1!A2:G",
  });

  const rows = response.data.values || [];

  return rows.map((row, index) => ({
    id: index + 2, // row index in sheet
    taskName: row[0],
    taskType: row[1],
    assignedTo: row[2],
    plannedDate: row[3],
    actualDate: row[4],
    status: row[5],
    score: row[6],
  }));
}

// Update task
export async function updateTask(rowIndex) {
  const today = new Date().toISOString().split("T")[0];

  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `Sheet1!E${rowIndex}:F${rowIndex}`,
    valueInputOption: "RAW",
    requestBody: {
      values: [[today, "Done"]],
    },
  });

  return { success: true };
}