import { TaskRow } from "./TaskRow"
export const TaskTable = ({task, toggleTask, showComplete = false}) => {
   
   const taskTableRows = (doneValue) => {
    return(
        task.filter(task => task.done === doneValue)        
        .map(task =>(
            <TaskRow task={task} key={task.id} toggleTask = {toggleTask}/>
          ))
    )
   }   
    return (    
        <table className="table table-dark table-striped table-bordered border-secondary table-lg">
        <thead>
          <tr className="table-primary">
            <th>Task</th>
          </tr>
        </thead>
        <tbody>
          {
            taskTableRows(showComplete)
          }
        </tbody>
      </table>         
   ) 
}