# Smart Task Tracker – Frontend

A modern, responsive task tracking app built with React and Create React App, featuring AI-powered UI components for enhanced productivity.

---

## 🚀 Live Demo

- **Frontend:** [https://smart-task-tracker-frontend.vercel.app](https://smart-task-tracker-frontend.vercel.app)
- **Backend API:** [https://smart-task-tracker-backend-production.up.railway.app](https://smart-task-tracker-backend-production.up.railway.app)

---

## 🛠️ Setup Steps

### Prerequisites

- Node.js & npm
- Git

### Local Setup

```bash
git clone https://github.com/kumarjaishankar/smart-task-tracker-frontend.git
cd smart-task-tracker-frontend
npm install
npm start
```

> The app will run at [http://localhost:3000](http://localhost:3000).

### API Configuration

- By default, the frontend expects the backend API at `/tasks` to be available at the backend URL.
- If running locally, update the API URL in your code or via an `.env` file to point to your backend (e.g., `http://localhost:8000`).

---

## ✨ Features

- Add, edit, and delete tasks
- Task summary and filtering
- Responsive, clean UI with Tailwind CSS
- **AI-powered productivity insights dashboard**
- **Smart task suggestions with one-click add**
- **Real-time productivity analytics**
- **Interactive category and priority management**
- Persistent storage via backend API

---

## �� UI Components

### Core Components
- **TaskList:** Main task management interface
- **TaskForm:** Add/edit task modal with smart defaults
- **TaskSummary:** Real-time task statistics
- **Index:** Main dashboard with AI features

### AI-Powered UI Components
- **AIInsights:** Productivity analytics dashboard with:
  - Productivity score visualization
  - Category distribution charts
  - Priority analysis
  - Smart recommendations
  - Completion rate tracking

- **SmartSuggestions:** Intelligent task suggestions with:
  - Context-aware task recommendations
  - One-click task creation
  - Category and priority suggestions
  - Productivity tips and insights

---

## 📂 Repository

- [Frontend GitHub Repo](https://github.com/kumarjaishankar/smart-task-tracker-frontend)

---

## 📄 Project Documentation

- See the backend repo for API documentation and architecture.
- UI components use Tailwind CSS for styling
- AI features integrate with backend analytics endpoints
