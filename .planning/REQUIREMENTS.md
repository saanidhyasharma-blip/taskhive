# Requirements: TaskHive

**Defined:** 2026-04-28
**Core Value:** Users can quickly see and manage their tasks in a clean, responsive interface that feels polished on mobile and desktop.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Setup & Structure

- [ ] **SETUP-01**: Next.js 15 project initialized with App Router and Tailwind CSS v4
- [ ] **SETUP-02**: Clean /app directory structure with proper layout hierarchy
- [ ] **SETUP-03**: Global CSS with Tailwind v4 config and CSS variables for priority colors

### Homepage

- [ ] **HOME-01**: User sees a welcoming landing page with name input field
- [ ] **HOME-02**: User can enter their name and submit to navigate to dashboard
- [ ] **HOME-03**: Name is persisted to localStorage on submit
- [ ] **HOME-04**: Homepage is mobile-responsive (375px+)

### Dashboard

- [ ] **DASH-01**: Dashboard displays personalized greeting ("Welcome, [Name]")
- [ ] **DASH-02**: Greeting component uses 'use client' with hydration-safe rendering
- [ ] **DASH-03**: Dashboard shows a list of hardcoded sample tasks on first load
- [ ] **DASH-04**: Each task displays Title, Priority (Low/Medium/High), Status (Todo/In Progress/Done), and optional Due Date
- [ ] **DASH-05**: Tasks are visually distinguished by priority (color-coded via CSS variables)
- [ ] **DASH-06**: Tasks are visually distinguished by status
- [ ] **DASH-07**: Dashboard is mobile-responsive with proper card/list layout

### Task Interactions

- [ ] **TASK-01**: User can open an "Add Task" modal from the dashboard
- [ ] **TASK-02**: Modal contains form inputs for Title, Priority (select), Status (select), Due Date (optional)
- [ ] **TASK-03**: User can submit the modal to add a new task to the list
- [ ] **TASK-04**: User can toggle task status (cycle through Todo → In Progress → Done)
- [ ] **TASK-05**: Modal can be closed via close button or clicking outside

### UI Polish

- [ ] **UI-01**: Hover effects on interactive elements (buttons, task cards)
- [ ] **UI-02**: Smooth modal open/close transitions (CSS-only)
- [ ] **UI-03**: Consistent typography and spacing across pages
- [ ] **UI-04**: Minimal, modern design aesthetic

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Backend Integration

- **BACK-01**: REST API or Google Sheets integration for task persistence
- **BACK-02**: User authentication with real login flow

### Enhanced Features

- **ENH-01**: Task editing (inline or via modal)
- **ENH-02**: Task deletion with confirmation
- **ENH-03**: Task filtering by status/priority
- **ENH-04**: Task sorting (by date, priority)
- **ENH-05**: Animation library integration (Framer Motion)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Backend API / Database | Frontend-only for v1 |
| Google Sheets integration | Deferred to future milestone |
| Framer Motion / animation libs | Keeping bundle light per user preference |
| OAuth / social login | Not needed for v1 |
| PWA features | Deferred |
| Task editing/deletion | v2 feature |
| Real authentication | Name input is cosmetic for v1 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| SETUP-01 | Phase 1 | Pending |
| SETUP-02 | Phase 1 | Pending |
| SETUP-03 | Phase 1 | Pending |
| HOME-01 | Phase 2 | Pending |
| HOME-02 | Phase 2 | Pending |
| HOME-03 | Phase 2 | Pending |
| HOME-04 | Phase 2 | Pending |
| DASH-01 | Phase 3 | Pending |
| DASH-02 | Phase 3 | Pending |
| DASH-03 | Phase 3 | Pending |
| DASH-04 | Phase 3 | Pending |
| DASH-05 | Phase 3 | Pending |
| DASH-06 | Phase 3 | Pending |
| DASH-07 | Phase 3 | Pending |
| TASK-01 | Phase 3 | Pending |
| TASK-02 | Phase 3 | Pending |
| TASK-03 | Phase 3 | Pending |
| TASK-04 | Phase 3 | Pending |
| TASK-05 | Phase 3 | Pending |
| UI-01 | Phase 4 | Pending |
| UI-02 | Phase 4 | Pending |
| UI-03 | Phase 4 | Pending |
| UI-04 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 23 total
- Mapped to phases: 23
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-28*
*Last updated: 2026-04-28 after initial definition*
