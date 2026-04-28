/**
 * Mock task data for development.
 * Will be replaced by Google Sheets data in a future phase.
 */

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function getYesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

function getTomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export const mockTasks = [
  // Daily recurring tasks
  {
    id: "task-001",
    taskName: "Check and respond to emails",
    taskType: "Daily",
    assignedTo: "Saanidhya",
    plannedDate: getToday(),
    status: "Pending",
  },
  {
    id: "task-002",
    taskName: "Stand-up meeting notes",
    taskType: "Daily",
    assignedTo: "Saanidhya",
    plannedDate: getToday(),
    status: "Pending",
  },
  {
    id: "task-003",
    taskName: "Review pull requests",
    taskType: "Daily",
    assignedTo: "Rahul",
    plannedDate: getToday(),
    status: "Pending",
  },
  {
    id: "task-004",
    taskName: "Update project tracker",
    taskType: "Daily",
    assignedTo: "Saanidhya",
    plannedDate: getToday(),
    status: "Done",
  },

  // Weekly recurring tasks
  {
    id: "task-005",
    taskName: "Weekly team sync",
    taskType: "Weekly",
    assignedTo: "Saanidhya",
    plannedDate: getToday(),
    status: "Pending",
  },
  {
    id: "task-006",
    taskName: "Sprint retrospective",
    taskType: "Weekly",
    assignedTo: "Rahul",
    plannedDate: getToday(),
    status: "Pending",
  },
  {
    id: "task-007",
    taskName: "Code quality review",
    taskType: "Weekly",
    assignedTo: "Saanidhya",
    plannedDate: getTomorrow(),
    status: "Pending",
  },

  // One-time tasks
  {
    id: "task-008",
    taskName: "Set up CI/CD pipeline",
    taskType: "One-time",
    assignedTo: "Saanidhya",
    plannedDate: getToday(),
    status: "Pending",
  },
  {
    id: "task-009",
    taskName: "Write project documentation",
    taskType: "One-time",
    assignedTo: "Saanidhya",
    plannedDate: getToday(),
    status: "Pending",
  },
  {
    id: "task-010",
    taskName: "Design database schema",
    taskType: "One-time",
    assignedTo: "Rahul",
    plannedDate: getToday(),
    status: "Pending",
  },
  {
    id: "task-011",
    taskName: "Prepare onboarding guide",
    taskType: "One-time",
    assignedTo: "Saanidhya",
    plannedDate: getYesterday(),
    status: "Pending",
  },
  {
    id: "task-012",
    taskName: "Submit internship report",
    taskType: "One-time",
    assignedTo: "Saanidhya",
    plannedDate: getTomorrow(),
    status: "Pending",
  },
];
