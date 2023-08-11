import React, { useState, useEffect } from 'react';

export const TaskCreator = ({ createNewTask, editingTask, editingTaskId, setEditingTaskId, setEditingTaskName, taskItems, setTaskItems }) => {
  const [newTaskName, setNewTaskName] = useState('');

  useEffect(() => {
    if (editingTask) {
      setNewTaskName(editingTask.name);
    } else {
      setNewTaskName('');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!newTaskName.trim()) {
      if (editingTask) {
        setEditingTaskId(null); // Salir del modo de edición si el nombre está vacío
      }
      setNewTaskName('');
      return;
    }
  
    if (editingTask) {
      const isNameTaken = taskItems.some(
        task => task.name === newTaskName && task.id !== editingTask.id
      );
  
      if (!isNameTaken) {
        editingTask.name = newTaskName;
        setEditingTaskId(null);
        const updatedTaskItems = taskItems.map(task =>
          task.id === editingTask.id ? editingTask : task
        );
        setTaskItems(updatedTaskItems);
        setNewTaskName('');
  
        // Actualiza el local storage con la lista de tareas modificada
        localStorage.setItem('tasks', JSON.stringify(updatedTaskItems));
      } else {
        alert("Nombre de tarea ya existente en otra tarea");
      }
    } else {
      createNewTask(newTaskName, taskItems, setTaskItems);
      setNewTaskName('');
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a new task"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          {editingTask ? 'Save Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};
