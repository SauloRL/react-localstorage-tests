import React from 'react';

export const TaskRow = ({ task, toggleTask, deleteTask, editTask, editingTaskId, editingTaskContent }) => {
    const isEditing = task.id === editingTaskId;

    const handleEditClick = () => {
        if (!isEditing) {
          editTask(task.id, task.name); // Establece la tarea en edición en el componente App
        }
    };

    return (
      <tr
        style={{
          backgroundColor: isEditing ? '#f8f9fa' : 'transparent',
          fontWeight: isEditing ? 'bold' : 'normal',
        }}
      >
        <td className="d-flex align-items-center">
          <input
            type="checkbox"
            className="me-3"
            checked={task.done}
            onChange={() => toggleTask(task)}
          />
          <span
            className="text-truncate"
            style={{ width: '90%', cursor: 'pointer' }}
            onClick={handleEditClick} // Cambia el manejo del clic para establecer la tarea en edición
          >
            {task.name}
          </span>
          {task.done && (
            <button 
              className="btn btn-danger btn-sm ms-3"
              onClick={() => deleteTask(task.id)}
              style={{ fontSize: '14px', backgroundColor: '#dc3545' }}
            >
              Delete
            </button>                              
          )}
        </td>
      </tr>
    );
};
