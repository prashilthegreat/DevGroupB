import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
        setTasks([...tasks, newTask.trim()]);
        setNewTask("");
        toast.success('Task added successfully!');

      }
  }

  function handleKeyPress(event) {
        if (event.key === "Enter" && newTask.trim()!== "") {
        addTask();
        }
    }

  function deleteTask(index) {
    setTasks(tasks.filter((task, i) => i !== index));
    toast.error('Task deleted successfully!');
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const newTasks = [...tasks];
      [newTasks[index], newTasks[index - 1]] = [newTasks[index - 1], newTasks[index]];
      setTasks(newTasks);
      toast.info('Task moved up!');

    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const newTasks = [...tasks];
      [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
      setTasks(newTasks);
      toast.info('Task moved down!');
    }
  }

  return (
    <div className="to-do-list">
      <h1>My To-Do List</h1>
      <div>
        <input 
          type="text"
          value={newTask}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>Add Task</button>
        <ol>
          {tasks.map((task, index) => (
            <li key={index}>
              <span className="task-name">{task}</span>
              <div className="button-group">
                <button className="delete" onClick={() => deleteTask(index)}>🚮</button>
                <button className="up" onClick={() => moveTaskUp(index)}>🔼</button>
                <button className="down" onClick={() => moveTaskDown(index)}>🔽</button>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ToDoList;