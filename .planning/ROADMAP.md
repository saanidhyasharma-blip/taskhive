# Roadmap: TaskHive

**Created:** 2026-04-28
**Milestone:** v1.0 — Frontend MVP
**Granularity:** Coarse (4 phases)

## Phases

### Phase 1: Project Scaffolding & Design System
**Goal:** Initialize Next.js 15 project with App Router, Tailwind CSS v4, and establish the design foundation.
**Requirements:** SETUP-01, SETUP-02, SETUP-03
**Depends on:** Nothing
**UI hint:** no

**Success Criteria:**
1. `npm run dev` starts without errors
2. App Router structure exists with root layout and placeholder pages
3. Tailwind v4 is configured with CSS variables for priority colors (Low/Med/High)
4. Global styles define typography, color palette, and spacing tokens

**Plans:** 1-2

---

### Phase 2: Homepage & Navigation
**Goal:** Build the welcoming homepage with name input and client-side navigation to dashboard.
**Requirements:** HOME-01, HOME-02, HOME-03, HOME-04
**Depends on:** Phase 1
**UI hint:** yes

**Success Criteria:**
1. User sees a visually appealing landing page with a name input field
2. Submitting the name saves it to localStorage and redirects to `/dashboard`
3. Page is fully responsive on 375px+ screens
4. Navigation between homepage and dashboard works via Next.js router

**Plans:** 1-2

---

### Phase 3: Dashboard & Task Management
**Goal:** Build the personalized dashboard with task list, hardcoded data, and Add Task modal.
**Requirements:** DASH-01, DASH-02, DASH-03, DASH-04, DASH-05, DASH-06, DASH-07, TASK-01, TASK-02, TASK-03, TASK-04, TASK-05
**Depends on:** Phase 2
**UI hint:** yes

**Success Criteria:**
1. Dashboard shows "Welcome, [Name]" greeting with hydration-safe rendering
2. Hardcoded sample tasks display with Title, Priority, Status, and Due Date
3. Tasks are color-coded by priority using Tailwind CSS variables
4. "Add Task" modal opens, accepts input, and adds task to the list
5. User can toggle task status (Todo → In Progress → Done)
6. Modal closes via button or outside click
7. Layout is responsive on mobile and desktop

**Plans:** 2-3

---

### Phase 4: UI Polish & Final QA
**Goal:** Add hover effects, transitions, consistent spacing, and ensure production-quality polish.
**Requirements:** UI-01, UI-02, UI-03, UI-04
**Depends on:** Phase 3
**UI hint:** yes

**Success Criteria:**
1. All buttons and task cards have hover/focus states
2. Modal open/close has smooth CSS transitions
3. Typography and spacing are consistent across all pages
4. App looks and feels premium on both mobile (375px) and desktop (1440px)

**Plans:** 1-2

---

## Summary

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 1 | Project Scaffolding & Design System | Init Next.js + Tailwind foundation | SETUP-01, SETUP-02, SETUP-03 | 4 |
| 2 | Homepage & Navigation | Landing page with name input + routing | HOME-01 through HOME-04 | 4 |
| 3 | Dashboard & Task Management | Task list, greeting, Add Task modal | DASH-01 through DASH-07, TASK-01 through TASK-05 | 7 |
| 4 | UI Polish & Final QA | Hover, transitions, consistency | UI-01 through UI-04 | 4 |

**Total:** 4 phases | 23 requirements | 19 success criteria

---
*Roadmap created: 2026-04-28*
*Last updated: 2026-04-28 after initial creation*
