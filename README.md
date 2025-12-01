# Alexander Smirnov - Portfolio Frontend 🎨

[![Deploy Status](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-orange)](https://asmirnov.pages.dev)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

This repository contains the **Frontend Client** for my interactive portfolio and resume platform. It is a Single Page Application built with React and TypeScript, designed to provide a seamless, responsive, and engaging user experience.

🔗 **Live Demo:** [https://asmirnov.pages.dev](https://asmirnov.pages.dev)
🔗 **Backend Repository:** [https://github.com/BI8US/server-node](https://github.com/BI8US/server-node)

---

## ✨ Key Features

### 🎨 UI/UX & Design
- **Dynamic Themes:** Robust **Dark/Light mode** implementation using CSS variables and Tailwind. The theme preference is saved in `localStorage` and respects system settings.
- **Responsive Design:** Mobile-first approach. The navigation bar adapts from text links (desktop) to icon-only buttons (mobile).
- **Visual Feedback:** Integrated **Sonner** for beautiful, theme-aware toast notifications (success/error states).
- **Custom UI Kit:** A set of reusable, consistent components (`Button`, `Input`, `Modal`, `ContentCard`) built from scratch with Tailwind.

### 🎮 Interactive "Cold Start" Handling
Since the backend runs on a free-tier PaaS, it enters "sleep mode" after inactivity. To turn this limitation into a feature:
- **Interactive Loader:** A custom **Snake Game** appears automatically while waiting for the initial API response.
- **Smart Transition:** Once the backend wakes up, the UI notifies the user without interrupting their game, offering a smooth transition to the content.

### 🛠 Functionality
- **Resume Management:** Admin interface for editing bio, skills, education, and experience in real-time.
- **PDF Export:** One-click download of the resume as a high-quality PDF file.
- **Job Application Tracker:** A table view to track job applications status (Admin only).
- **Authentication:** JWT-based auth flow with protected routes and automatic token expiration handling.
- **RBAC (Role-Based Access Control):**
    - **Admin:** Full editing capabilities.
    - **Guest (Demo):** Read-only access to explore the admin interface safely.

---

## 🛠️ Tech Stack

- **Core:** React 18 (Create React App), TypeScript
- **Styling:** Tailwind CSS, CSS Variables (for theming)
- **State Management & Data Fetching:** TanStack Query (React Query) v5
- **Routing:** React Router v6
- **HTTP Client:** Axios (with interceptors for auth and error handling)
- **Utilities:** jwt-decode, qs
- **Icons:** Material Symbols (Google Fonts)
- **Code Quality:** ESLint v8, Prettier
- **Deployment:** Cloudflare Pages (CI/CD)

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
- Node.js (v16 or higher)
- NPM or Yarn

### 1. Clone the Repository
```bash
git clone git@github.com:BI8US/frontend.git
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
REACT_APP_API_URL_DEV=http://localhost:8080/api
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
Runs Prettier to check for code style issues.

`npm run fix:all`
Runs both Prettier (formatting) and ESLint --fix (logic & import sorting) on the entire project. Use this before committing code to ensure consistency.

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