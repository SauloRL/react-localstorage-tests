import React from 'react';
import { TaskRow } from "./TaskRow";

export const TaskTable = ({ task, toggleTask, deleteTask, editTask, editingTaskId, editingTaskContent, showComplete = false }) => {   
   const taskTableRows = (doneValue) => {
      return (
         task.filter(task => task.done === doneValue)
         .map(task => (
          <TaskRow
          task={task}
          key={task.id}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask}
          editingTaskId={editingTaskId}
        />
         ))
      )
   }
   
   return (    
      <div className="table-responsive">
         <table className="table table-dark table-striped table-bordered border-secondary table-lg">
            <thead>
               <tr className="table-primary">
                  <th className="text-center">Task</th>
               </tr>
            </thead>
            <tbody>
               {taskTableRows(showComplete)}
            </tbody>
         </table>         
      </div>
   ) 
}
