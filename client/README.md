# To-Do List App

This is a full-stack To-Do List application built with React on the frontend and Node.js with Express on the backend. The app uses MongoDB as the database to store tasks and provides CRUD operations (Create, Read, Update, Delete).

## Features

- **Add Tasks**: Create new tasks with a description and due date.
- **Edit Tasks**: Modify the description or due date of an existing task.
- **Delete Tasks**: Remove tasks from the list.
- **View Tasks**: Display all tasks with their descriptions and due dates.
- **Modal Interface**: Provides a user-friendly modal for editing tasks.

## Technology Stack

### Frontend:
- React
- Axios for HTTP requests
- CSS for styling

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose

## Getting Started

### Prerequisites
- Node.js and npm
- MongoDB Atlas account (or local MongoDB instance)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/todo-list-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd todo-list-app
   ```

3. Install dependencies for the backend:
   ```bash
   cd server
   npm install
   ```

4. Set up environment variables in a `.env` file:
   ```
   DB_PASSWORD=your-mongodb-password
   PORT=5000
   ```

5. Start the backend server:
   ```bash
   node server.js
   ```

6. Install dependencies for the frontend:
   ```bash
   cd ../client
   npm install
   ```

7. Start the frontend application:
   ```bash
   npm start
   ```

### Deployment

The backend server can be deployed to platforms like Render, and the frontend can be deployed to platforms like Netlify or Vercel.

## API Endpoints

- `GET /api/tasks`: Fetch all tasks.
- `POST /api/tasks`: Add a new task.
- `PUT /api/tasks/:id`: Update a task by ID.
- `DELETE /api/tasks/:id`: Delete a task by ID.

## Future Enhancements

- **Task Prioritization**: Add a priority level for each task.
- **User Authentication**: Enable multiple users with their own task lists.
- **Search and Filter**: Provide search and filter functionality for tasks.
- **Responsive Design**: Improve mobile responsiveness.

---

