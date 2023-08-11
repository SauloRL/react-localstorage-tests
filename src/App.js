import { useState, useEffect } from 'react';
import './App.css';
import {TaskCreator} from "./components/TaskCreator"
import { TaskTable } from './components/TaskTable';
import { VisibilityControl } from './components/VisibilityControl';
import { Container } from './components/Conatainer';


function App() {

  const [taskItems,setTaskItems] = useState([])
  const [showComplete,setShowCompleted] = useState(false)

  const hasCompletedTasks = taskItems.some(task => task.done);

  function createNewTask(taskName){    
    const lastTaskId = taskItems.length > 0 ? taskItems[taskItems.length - 1].id : 0;
    const newTask = { id: lastTaskId + 1, name: taskName, done: false };        
    if (!taskItems.find(task => task.name === taskName) && taskName !== '') {
      setTaskItems([...taskItems, newTask]);
    }    
  }

  function deleteTask(taskId) {
    setTaskItems(taskItems.filter(task => task.id !== taskId));
  }

  const toggleTask = task => {
    setTaskItems(
      taskItems.map(t => (t.id === task.id) ? {...t, done: !t.done} : t)
    );  
  }
  
  //para cargar 
  useEffect(()=>{
    let data  = localStorage.getItem('tasks')
    if(data){
      setTaskItems(JSON.parse(data))
    }
  },[ ])

  //para eliminar 
  const clearTask = ()=>{      
   setTaskItems(taskItems.filter(task => !task.done))
   setShowCompleted(false)   
  }

  //ara guardar
  useEffect(() => {
    localStorage.setItem('tasks',JSON.stringify(taskItems))
  },[taskItems])

  return (
    <main className="bg-dark vh-100 text-white">
      <Container>
      <TaskCreator createNewTask={createNewTask} />        
        <TaskTable task={taskItems} toggleTask={toggleTask} deleteTask={deleteTask} />
        <VisibilityControl isChecked={showComplete} setShowCompleted = {(checked) => setShowCompleted(checked)}
        clearTask= {clearTask}
        hasCompletedTasks={hasCompletedTasks}
        />
        {
          showComplete === true && (              
              <TaskTable task={taskItems} toggleTask={toggleTask}  showComplete ={showComplete} deleteTask={deleteTask} />   
          )
        }
      </Container>              
    </main>
  );
}

//https://youtu.be/sjrK6RA65eQ?t=5116
export default App;
