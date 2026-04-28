# TaskHive

## What This Is

A mobile-friendly task management web application built with Next.js (App Router) and Tailwind CSS. Users enter their name on a welcoming homepage and land on a personalized dashboard where they can view, add, and manage tasks with priority levels, statuses, and due dates. v1 is frontend-only with hardcoded sample data and client-side state.

## Core Value

Users can quickly see and manage their tasks in a clean, responsive interface that feels polished on mobile and desktop.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

(None yet — ship to validate)

### Active

<!-- Current scope. Building toward these. -->

- [ ] Homepage with name input and redirect to dashboard
- [ ] Personalized dashboard greeting using localStorage
- [ ] Task list displaying hardcoded sample tasks
- [ ] Task model: Title, Priority (Low/Medium/High), Status (Todo/In Progress/Done), optional Due Date
- [ ] Functional "Add Task" modal with form inputs
- [ ] Client-side task state management (add, toggle status)
- [ ] Mobile-first responsive design with Tailwind CSS
- [ ] Interactive UI states: hover effects, toggles, modal open/close
- [ ] Clean App Router folder structure (/app directory)
- [ ] Working client-side navigation between pages

### Out of Scope

- Backend API or database — frontend-only for v1
- Google Sheets integration — deferred to future milestone
- Animation libraries (Framer Motion, etc.) — keeping bundle light
- Authentication/authorization — name input is cosmetic, not secure
- OAuth or social login — not needed for v1
- PWA features — deferred

## Context

- This is a greenfield project starting from scratch
- Next.js App Router (not Pages Router) is the required routing approach
- Tailwind CSS for all styling — no component libraries (Shadcn, MUI, etc.)
- CSS-only animations where needed to keep dependencies minimal
- localStorage for name persistence across sessions
- All task data is client-side (hardcoded samples + user-added tasks via React state)

## Constraints

- **Tech stack**: Next.js 15 (App Router) + Tailwind CSS v4 — no additional UI frameworks
- **Bundle size**: Keep dependencies minimal — no animation libraries for v1
- **Design**: Mobile-first, must look good on 375px+ screens
- **Routing**: Use Next.js App Router conventions (/app directory)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router over Pages Router | Modern convention, better layouts/loading states | — Pending |
| localStorage for name persistence | Simple, no backend needed for v1 | — Pending |
| Hardcoded sample tasks | Dashboard looks populated immediately, better UX | — Pending |
| No animation libraries | Keep initial bundle light per user preference | — Pending |
| Tailwind CSS only (no component library) | Full control over design, minimal dependencies | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-28 after initialization*
