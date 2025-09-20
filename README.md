# Task Manager Web App

A simple Task Manager application with user authentication and task CRUD functionality.

## Features

- **Authentication:** Sign up and sign in with JWT-based session handling.
- **Task Management:** Create, read, update, and delete tasks (CRUD) with fields: title, description, due date, priority, and status (todo, doing, done).
- **Frontend:** React single-page app with pages for sign up, sign in, task list, and task editor. Includes validation and loading states.
- **Backend:** Node.js + Express REST API with endpoints for authentication and tasks. Input validation and error handling included.
- **Database:** Used MongoDB. Tasks are associated with users.

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- bun
- MongoDB (depending on backend choice)

### Environment Variables

Copy `.env.example` to `.env` and fill in the required values.

### Backend

```bash
cd server
bun install
bun run dev
```

### Frontend

```bash
cd client
bun install
bun run dev
```

## Testing

Basic tests are included for at least one backend endpoint or a frontend component.

```bash
# Example for backend
cd server
bun test

```

## Design Choices

- **JWT Authentication:** Chosen for stateless session handling and ease of integration with REST APIs.
- **React SPA:** Enables smooth navigation and state management for authentication and tasks.
- **RESTful API:** Follows standard HTTP methods and status codes for clarity and interoperability.
- **Validation & Error Handling:** Both backend and frontend validate inputs and display errors to users.
- **Database:** Supports MongoDB (document) to allow flexibility.

## Folder Structure

```
task-manager/
  client/
  server/
  .env.example
  README.md
```
