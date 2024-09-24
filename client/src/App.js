// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');

  // Fetch tasks from the API
  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:5000/api/tasks');
    setTasks(response.data);
  };

  // Add a new task
  const addTask = async () => {
    if (!taskDescription) return;
    const response = await axios.post('http://localhost:5000/api/tasks', { description: taskDescription });
    setTasks([...tasks, response.data]);
    setTaskDescription('');
  };

  // Delete a task
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
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
        <button className="btn btn-primary" onClick={addTask}>Add Task</button>
      </div>
      <ul className="list-group">
        {tasks.map(task => (
          <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
            {task.description}
            <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
