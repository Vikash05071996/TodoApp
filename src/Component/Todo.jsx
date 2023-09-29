
import React, { useState } from 'react';
import "./TodoApp.css"

function TodoApp() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
      setCompletedTasks([...completedTasks, false]);
    }
  };

  const handleRemoveTask = (index) => {
    const newTasks = [...tasks];
    const newCompletedTasks = [...completedTasks];
    newTasks.splice(index, 1);
    newCompletedTasks.splice(index, 1);
    setTasks(newTasks);
    setCompletedTasks(newCompletedTasks);
  };

  const handleEditTask = (index) => {
    setEditingIndex(index);
    setTask(tasks[index]);
  };

  const handleUpdateTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index] = task;
    setTasks(newTasks);
    setTask('');
    setEditingIndex(null);
  };

  const handleCancelEdit = () => {
    setTask('');
    setEditingIndex(null);
  };

  const handleCompleteTask = (index) => {
    const newCompletedTasks = [...completedTasks];
    newCompletedTasks[index] = !completedTasks[index];
    setCompletedTasks(newCompletedTasks);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="todo-app">
      <h1>TodoApp</h1>
      <div>
        <input
          type="text"
          placeholder="Add a new task"
          value={task}
          onChange={handleInputChange}
        />
        {editingIndex !== null ? (
          <>
            <button onClick={() => handleUpdateTask(editingIndex)}>Update</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <button onClick={handleAddTask}>Add</button>
        )}
      </div>
      <ul>
        {tasks.map((item, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={completedTasks[index]}
              onChange={() => handleCompleteTask(index)}
            />
            {index === editingIndex ? (
              <input
                type="text"
                value={task}
                onChange={handleInputChange}
              />
            ) : (
              item
            )}
            <div>
              <button onClick={() => handleRemoveTask(index)}>Remove</button>
              {completedTasks[index] && (
                <span>Completed</span>
              )}
              {!completedTasks[index] && (
                <span>Added: {formatTimestamp(Date.now())}</span>
              )}
            </div>
            {index === editingIndex ? (
              <>
                <button onClick={() => handleUpdateTask(index)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <button onClick={() => handleEditTask(index)}>Edit</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;

