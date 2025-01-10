import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch tasks from the API
  const fetchTasks = async () => {
    const response = await axios.get(
      "https://mongodb-todo-list-app.onrender.com/api/tasks"
    );
    setTasks(response.data);
  };

  // Add a new task
  const addTask = async () => {
    if (!taskDescription || !taskDate) return;
    const response = await axios.post(
      "https://mongodb-todo-list-app.onrender.com/api/tasks",
      {
        description: taskDescription,
        date: taskDate,
        completed: false, // Add the completed property
      }
    );
    setTasks([...tasks, response.data]);
    setTaskDescription("");
    setTaskDate("");
  };

  // Toggle the completed state of a task
  const toggleCompleted = async (id) => {
    const taskToUpdate = tasks.find((task) => task._id === id);
    const updatedTask = {
      ...taskToUpdate,
      completed: !taskToUpdate.completed, // Toggle completed
    };

    const response = await axios.put(
      `https://mongodb-todo-list-app.onrender.com/api/tasks/${id}`,
      updatedTask
    );

    setTasks(
      tasks.map((task) =>
        task._id === id ? { ...task, completed: updatedTask.completed } : task
      )
    );
  };

  // Edit a task
  const editTask = (task) => {
    setTaskDescription(task.description);
    setTaskDate(task.date);
    setEditingTask(task);
    setShowModal(true); // Show the modal when editing
  };

  // Update an existing task
  const updateTask = async () => {
    if (!taskDescription || !taskDate || !editingTask) return;
    const response = await axios.put(
      `https://mongodb-todo-list-app.onrender.com/api/tasks/${editingTask._id}`,
      {
        description: taskDescription,
        date: taskDate,
      }
    );
    setTasks(
      tasks.map((task) => (task._id === editingTask._id ? response.data : task))
    );
    setTaskDescription("");
    setTaskDate("");
    setEditingTask(null);
    setShowModal(false); // Close the modal after saving
  };

  // Delete a task
  const deleteTask = async (id) => {
    await axios.delete(
      `https://mongodb-todo-list-app.onrender.com/api/tasks/${id}`
    );
    setTasks(tasks.filter((task) => task._id !== id));
  };

  // UseEffect to fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">To-Do List</h1>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Add a new task"
        />
        <input
          type="date"
          className="form-control"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTask}>
          Add Task
        </button>
      </div>
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task._id}
            className={`list-group-item ${task.completed ? "completed" : ""}`}
            onClick={() => toggleCompleted(task._id)}
          >
            <div className="list-group-item-task">
              <strong>{task.description}</strong>
              <br />
              <small>{new Date(task.date).toLocaleDateString()}</small>
            </div>
            <div className="list-group-item-modify">
              <button className="btn btn-info" onClick={() => editTask(task)}>
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for editing */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target.className === "modal-overlay") {
              setShowModal(false);
            }
          }}
        >
          <div className="modal-content">
            <h2>Edit Task</h2>
            <div className="form-group">
              <textarea
                className="form-control"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Task Description"
                rows="4"
                style={{ resize: "none" }}
              />
              <input
                type="date"
                className="form-control"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button className="btn btn-info" onClick={updateTask}>
                Save
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
