# Alexander Smirnov - Portfolio Frontend 🎨

[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

This repository contains the **Frontend Client** for my interactive portfolio and resume platform. It is a Single Page Application built with React and TypeScript, designed to provide a seamless, responsive, and engaging user experience.

🔗 **Live Demo:** [https://asmirnov.pages.dev](https://asmirnov.ee/)
🔗 **Backend Repository:** [https://github.com/BI8US/portfolio-backend](https://github.com/BI8US/portfolio-backend)

---

## ✨ Key Features

### 🎨 UI/UX & Design
- **Dynamic Themes:** Robust **Dark/Light mode** implementation using CSS variables and Tailwind. The theme preference is saved in `localStorage` and respects system settings.
- **Responsive Design:** Mobile-first approach. The navigation bar adapts from text links (desktop) to icon-only buttons (mobile).
- **Visual Feedback:** Integrated **Sonner** for beautiful, theme-aware toast notifications (success/error states).
- **Custom UI Kit:** A set of reusable, consistent components (`Button`, `Input`, `Modal`, `ContentCard`) built from scratch with Tailwind.

### 🎮 Snake game
A small **Snake** implementation is still part of the site for fun: open it from the header or go to **`/games/snake`**. High score is stored in `localStorage`. The API is always available in production, so there is no “wake the server” loader flow anymore.

### 🛠 Functionality
- **Resume Management:** Admin interface for editing bio, skills, education, and experience in real-time.
- **PDF Export:** One-click download of the resume as a high-quality PDF file.
- **Job Application Tracker:** A table view to track job applications status (Admin only).
- **Authentication:** JWT-based auth flow with protected routes and automatic token expiration handling.
- **RBAC (Role-Based Access Control):**
    - **Admin:** Full editing capabilities.
    - **Guest (Demo):** Read-only access to explore the admin interface safely.

### 🏋️ AI Fitness Coach (authenticated)
The **Fitness** area (`/fitness`, linked from the header) is available only to **signed-in** users. It talks to the backend under `/api/workouts/*` and combines structured workout data with an in-session AI assistant.

**End-to-end flow**

1. **Profile** — Open *My profile* and save weight, height, age, experience, goals, and optional language. Planning new workouts is disabled until this profile is complete.
2. **Plan a workout** — Describe what you want to train (free text). The client calls `POST /workouts/plan` with `{ userRequest }`. If the server responds with **404** (older API), it falls back to `POST /workouts/generate`.
3. **Current plan (in-gym mode)** — While there is a workout with status **PLANNED**, the **Active workout board** shows the generated plan: exercises, sets, weight/reps, rest hints, check off sets, add or remove sets, and **Finish workout** to submit **actual** performed data via `PUT /workouts/:id/complete`.
4. **Workout AI assistant** — **`WorkoutChatPanel`** is embedded on the active board. Open the assistant to:
   - Load recent history from `GET /workouts/:id/chat/messages`
   - Send messages with `POST /workouts/:id/chat`
   - When the API returns `updatedPlan`, the UI patches the cached workout so the **on-screen plan updates in real time** without leaving the session (e.g. swap an exercise or tweak volume).
   - On mobile the panel behaves as a resizable bottom sheet; on larger screens it is a fixed side-style panel.
5. **History** — Completed workouts list **AI feedback** (`aiFeedback`) when the backend provides it. Individual workouts can be deleted.

At most **one planned** workout is surfaced as “current”; new planning creates or replaces according to backend rules.

---

## 🛠️ Tech Stack

- **Core:** React 18 (Create React App), TypeScript
- **Styling:** Tailwind CSS, CSS Variables (for theming), `@tailwindcss/typography` where needed
- **State Management & Data Fetching:** TanStack Query (React Query) v5
- **Routing:** React Router v7
- **HTTP Client:** Axios (with interceptors for auth and error handling)
- **Content:** `react-markdown` for rendered markdown in chat-style UIs
- **Icons:** Material Symbols (Google Fonts), `react-icons` where appropriate
- **Utilities:** jwt-decode
- **Code Quality:** ESLint v8, Prettier
- **Deployment:** Cloudflare Pages (CI/CD)

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
- Node.js (v16 or higher; LTS 18+ recommended)
- NPM or Yarn

### 1. Clone the Repository
```bash
git clone git@github.com:BI8US/portfolio-frontend.git
cd frontend
```

### 2. Install Dependencies
This project uses legacy peer deps due to ESLint compatibility with Create React App.
```bash
npm install --legacy-peer-deps
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory to point to your local or production backend.
```dotenv
REACT_APP_API_URL=http://127.0.0.1:8080/api
```

### 4. Start Development Server
```bash
npm start
```

## 📦 Available Scripts
In the project directory, you can run:

`npm start`
Runs the app in the development mode.

`npm run build`
Builds the app for production to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance.

`npm run lint`
Runs ESLint to check for code quality issues.

`npm run format`
Runs Prettier with **write** mode on `src` (formats files in place).

`npm run fix:all`
Runs both Prettier (format) and ESLint `--fix` (logic & import sorting) on the entire project. Use this before committing code to ensure consistency.

## 🧪 Code Quality
- This project enforces strict code style rules to ensure maintainability.
- Imports: Automatically sorted (Packages -> Absolute -> Relative).
- Formatting: Prettier handles all spacing, quotes, and line lengths.
- Type Safety: TypeScript strict mode is enabled.

## 💡 Author
**Alexander Smirnov**

**Portfolio:** [asmirnov.pages.dev](https://asmirnov.pages.dev)

**LinkedIn:** [https://www.linkedin.com/in/alex-smrnv/](https://www.linkedin.com/in/alex-smrnv/)

**GitHub:** [https://github.com/BI8US](https://github.com/BI8US)
