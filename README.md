# TaskFlow

A modern, minimalist task management application built with vanilla HTML5, CSS3, and JavaScript ES6+. Designed as a frontend portfolio project demonstrating clean architecture, responsive design, and polished UI/UX.

![TaskFlow](assets/icons/favicon.svg)

## Overview

TaskFlow is a single-page productivity application that helps users manage tasks with a clean, Linear-inspired interface. It features a productivity dashboard, Kanban board, Pomodoro focus timer, and full CRUD operations — all persisted to localStorage with zero backend dependencies.

## Features

### Task Management
- **Create, Edit, Delete** tasks with title, description, priority, category, status, due date, and due time
- **Subtasks** — add checklist items within each task, track completion progress
- **Bulk operations** — select multiple tasks to complete, change priority, or delete at once
- **Priority levels** — Urgent, High, Medium, Low with color-coded badges

### Views
- **List View** — clean linear task list with inline actions
- **Kanban Board** — drag-and-drop cards across To Do, In Progress, and Completed columns
- **Focus Mode** — Pomodoro timer with 25/5/15 minute modes, circular SVG progress, and audio chimes

### Dashboard
- Productivity metrics (total, completed, pending, overdue)
- Progress bar with completion percentage
- Today's priority tasks
- Category breakdown with per-category progress

### Search, Filter & Sort
- **Search** — real-time search across titles, descriptions, categories, and subtask text
- **Filter tabs** — All, Active, Completed, Today, Upcoming, Overdue
- **Category filter** — dropdown filter by task category
- **Sort** — Newest, Oldest, Priority (High→Low / Low→High), Deadline (nearest / latest)

### Settings & Data
- **Dark/Light theme** — toggle with CSS custom properties, persisted to localStorage
- **Sound effects** — Web Audio API synthesized chimes (no external audio files)
- **Confetti celebrations** — particle effects on task completion
- **Export/Import JSON** — backup and restore all workspace data
- **Reload sample data** — reset to pre-loaded demo tasks

### Responsive Design
Optimized for all screen sizes:
- **Mobile**: 360px, 375px, 390px, 420px
- **Tablet**: 768px – 1024px
- **Desktop**: 1440px – 1920px+

Mobile features:
- Collapsible sidebar drawer with overlay
- Bottom-sheet modals on small screens
- Scrollable filter tabs
- Touch-friendly task cards with always-visible actions

### Accessibility
- Keyboard shortcuts (N, /, 1-4, T, ?, Esc)
- Focus-visible outlines on interactive elements
- ARIA attributes on dialogs and navigation
- Reduced-motion support via `prefers-reduced-motion`
- High contrast mode support

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 semantic markup |
| Styling | CSS3 with Custom Properties, Grid, Flexbox |
| Logic | Vanilla JavaScript ES6+ (Class-based architecture) |
| Icons | Lucide Icons (CDN) |
| Fonts | Plus Jakarta Sans, Outfit, JetBrains Mono (Google Fonts) |
| Effects | canvas-confetti (CDN) |
| Audio | Web Audio API (native, no external files) |
| Storage | localStorage |

**No frameworks. No build tools. No backend.**

## Getting Started

1. Clone or download this repository
2. Open `index.html` in any modern browser
3. Start managing tasks

```bash
# If using a local server (optional)
npx serve .
# or
python -m http.server 8000
```

## File Structure

```
TaskFlow/
├── index.html          # Main HTML (1178 lines)
├── style.css           # All styles, responsive, animations (4209 lines)
├── script.js           # Application logic (2603 lines)
├── assets/
│   └── icons/
│       ├── favicon.svg # App favicon
│       └── logo.svg    # Brand logo (optional)
└── README.md
```

## Architecture

The application uses a clean class-based architecture:

- **`TaskRepository`** — data layer handling localStorage CRUD operations
- **`SoundService`** — Web Audio API synthesizer for chime effects
- **`PomodoroService`** — timer engine with session tracking
- **`TaskFlowApp`** — main controller orchestrating UI rendering, event handling, and state management

State is managed through class properties and synchronized across views on every `render()` call.

## Current Scope

This is a **frontend-only** portfolio project. All data is persisted in the browser's localStorage.

## Future Development

Potential enhancements for a production version:
- Backend API with database persistence
- User authentication and multi-user support
- Real-time collaboration
- Due date reminders and notifications
- Task attachments and file uploads
- Progressive Web App (PWA) offline support
- Internationalization (i18n)

## Browser Support

Tested on:
- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

Requires ES6+ support (classes, template literals, arrow functions, optional chaining).

## License

This project is open source and available for portfolio demonstration purposes.
