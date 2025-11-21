#  Pulse Dashboard

**Build a Team Pulse Dashboard** — a productivity monitoring tool for internal teams. This dashboard allows **Team Leads** to monitor member statuses and assign tasks, while **Team Members** can update their status and manage task progress.

The project uses **React** for UI rendering and **Redux Toolkit** for global state management. No backend is required, but the project can simulate initial team member data , API such as [RandomUser.me](https://randomuser.me/).

---

## Features

### Role Switching
- Toggle between **Team Lead** and **Team Member** roles using a switch (top-right corner).
- Current role and user are tracked in Redux state.

### Team Lead View
1. **Team Member Status Monitoring**
   - List all members with status badges: `Working`, `Break`, `Meeting`, `Offline`.
   - Summary section: e.g., `2 Working · 1 Meeting · 1 Break`.

2. **Assign Tasks**
   - Task form with:
     - Member selection dropdown
     - Task title input
     - Due date picker
   - On submission, Redux state updates to assign tasks to selected members.

3. **Filtering & Sorting**
   - Filter team members by status.
   - Sort members by number of active (not completed) tasks.

### Team Member View
1. **Update Your Status**
   - Buttons for selecting: `Working`, `Break`, `Meeting`, `Offline`.
   - Only one can be active; updates global Redux state.

2. **View Your Tasks**
   - Shows a list of assigned tasks.
   - Each task includes:
     - Title and due date
     - Progress bar (0–100%)
     - Increment/decrement progress in steps of 10%
     - Marks completed automatically when progress reaches 100%

### UI & State Management
- **React** for UI rendering
- **Redux Toolkit** for state management:
  - `createSlice`, `configureStore`, `useSelector`, `useDispatch`
- **TailwindCSS** for styling
- **Redux Persist** for state persistence

### Bonus
- Charts for status visualization using **Recharts**
- Auto-reset functionality for statuses and tasks

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Pragyagit-07/Pulse-Dashboard.git

```
2. cd Pulse-Dashboard
3.  npm install
4.  npm run dev

## Tech Stack
- React - Frontend UI

- Redux Toolkit - State management

- Redux Persist - Persisting Redux state

- TailwindCSS - Styling

- Recharts - Charts and visualizations


