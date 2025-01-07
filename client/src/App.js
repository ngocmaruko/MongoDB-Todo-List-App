// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch tasks from the API
  const fetchTasks = async () => {
    const response = await axios.get('https://mongodb-todo-list-app.onrender.com/api/tasks');
    setTasks(response.data);
  };

  // Add a new task
  const addTask = async () => {
    if (!taskDescription || !taskDate) return;
    const response = await axios.post('https://mongodb-todo-list-app.onrender.com/api/tasks', { 
      description: taskDescription, 
      date: taskDate 
    });
    setTasks([...tasks, response.data]);
    setTaskDescription('');
    setTaskDate('');
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
    const response = await axios.put(`https://mongodb-todo-list-app.onrender.com/api/tasks/${editingTask._id}`, { 
      description: taskDescription, 
      date: taskDate 
    });
    setTasks(tasks.map(task => task._id === editingTask._id ? response.data : task));
    setTaskDescription('');
    setTaskDate('');
    setEditingTask(null);
    setShowModal(false); // Close the modal after saving
  };

  // Delete a task
  const deleteTask = async (id) => {
    await axios.delete(`https://mongodb-todo-list-app.onrender.com/api/tasks/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  // UseEffect to fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center">To-Do List</h1>
      <div className="input-group mb-3">
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
        <button 
          className="btn btn-primary" 
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      <ul className="list-group">
        {tasks.map(task => (
          <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{task.description}</strong><br />
              <small>{new Date(task.date).toLocaleDateString()}</small>
            </div>
            <div>
              <button 
                className="btn btn-info btn-sm" 
                onClick={() => editTask(task)}
              >
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
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Task</h2>
            <div className="form-group">
              <input 
                type="text" 
                className="form-control" 
                value={taskDescription} 
                onChange={(e) => setTaskDescription(e.target.value)} 
                placeholder="Task Description" 
              />
              <input 
                type="date" 
                className="form-control" 
                value={taskDate} 
                onChange={(e) => setTaskDate(e.target.value)} 
              />
            </div>
            <button className="btn btn-primary" onClick={updateTask}>Save</button>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
