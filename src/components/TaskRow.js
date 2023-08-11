export const TaskRow = ({ task, toggleTask, deleteTask }) => {
    return (
      <tr>
        <td className="d-flex justify-content-between">
          {task.name}
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => toggleTask(task)}
          />
          {task.done && (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteTask(task.id)}
            >
              <i className="bi bi-trash"></i> Delete
            </button>
          )}
        </td>
      </tr>
    );
  };
  