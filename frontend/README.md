# Task Manager

A simple and responsive Task Management application built using React and JavaScript. The application allows users to create, manage, update, delete, and filter their daily tasks through an intuitive dashboard.

## Project Overview

The Task Manager helps users organize their daily activities by maintaining tasks with different statuses and priority levels.

The frontend is built using React functional components and React Hooks. Component communication is handled through props and callback functions, while `useState` manages application state.

## Features

### 1. Task Management (CRUD)

- **Create:** Add new tasks with a title, description, status, and priority.
- **Read:** Display all available tasks in an organized dashboard.
- **Update:** Change the status of an existing task using the Edit option.
- **Delete:** Remove tasks with a confirmation prompt.

### 2. Task Status

Each task can have one of three statuses:

- TODO
- IN_PROGRESS
- DONE

### 3. Task Priority

Tasks support three priority levels:

- LOW
- MEDIUM
- HIGH

### 4. Filtering

- Filter tasks by status.
- Filter tasks by priority.
- Apply status and priority filters simultaneously.
- Reset filters to display all tasks.

### 5. Dashboard Summary

The dashboard dynamically displays:

- Total number of tasks.
- Number of tasks in progress.
- Number of completed tasks.

### 6. User Interface

- Responsive task creation form.
- Clear task cards and action buttons.
- Loading-independent frontend interactions.
- Empty task list message.
- Confirmation before deleting tasks.

## Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend library |
| JavaScript (ES6+) | Application logic |
| HTML5 | Structure |
| CSS3 | Styling and responsive design |
| React Hooks | State management |
| Git | Version control |

## Project Architecture

The application follows a component-based architecture.

```text
src/
│
├── components/
│   ├── TaskCard.jsx
│   ├── TaskList.jsx
│   └── TaskForm.jsx
│
├── pages/
│   └── Dashboard.jsx
│
├── App.jsx
├── App.css
└── main.jsx
```

### Component Responsibilities

**Dashboard.jsx**
- Main application page.
- Maintains the tasks state using `useState`.
- Handles task creation, status updates, and deletion.
- Manages status and priority filters.
- Calculates dashboard summary statistics.

**TaskForm.jsx**
- Provides the form for creating new tasks.
- Manages form input using controlled components.
- Validates required task titles.
- Sends task data to the Dashboard through callback props.

**TaskList.jsx**
- Receives tasks through props.
- Renders the list of tasks using JavaScript `map()`.
- Passes individual tasks and callback functions to TaskCard.

**TaskCard.jsx**
- Displays individual task information.
- Allows users to edit task status.
- Provides Save and Cancel actions.
- Allows users to delete tasks.

## Application Data Flow

The application follows unidirectional data flow.

```text
             Dashboard
                 |
          Passes data via props
                 |
                 v
              TaskList
                 |
          Passes individual tasks
                 |
                 v
              TaskCard
                 |
          User interactions
                 |
          Callback functions
                 |
                 v
              Dashboard
                 |
             setTasks()
                 |
                 v
          React re-renders UI
```

### State Management

React's `useState` Hook manages:

- Task collection.
- Task form visibility.
- Current editing status inside individual task cards.
- Selected status filter.
- Selected priority filter.

Filtered tasks are derived from the original task collection using JavaScript's `filter()` method.

## Installation and Setup

### Prerequisites

- Node.js (v18 or later recommended)
- npm
- Git

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

### 2. Navigate to Frontend

```bash
cd frontend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal to access the application.

## Current Implementation

The current frontend uses React local state for task management.

**Important:** Task data is currently stored in application memory. It does not persist after a browser refresh.

## Planned Backend Integration

The next development phase will introduce:

- ASP.NET Core Web API using C#.
- Entity Framework Core for database operations.
- SQL relational database for persistent storage.
- REST API integration with the React frontend.
- Server-side validation and error handling.
- Backend filtering by status and priority.

## Version Control

Git is used to track development changes.

Meaningful commits are maintained throughout the development process.

## Project Status

Frontend core functionality implemented. Backend and database integration are planned for the next development phase.