import React, { useState, useEffect } from 'react';
import './App.css';
import { TaskCreator } from "./components/TaskCreator";
import { TaskTable } from './components/TaskTable';
import { VisibilityControl } from './components/VisibilityControl';
import { Container } from './components/Conatainer';


function App() {

  const [taskItems, setTaskItems] = useState([]);
  const [showComplete, setShowCompleted] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);  
  const [editingTaskName, setEditingTaskName] = useState(''); // Agregado para manejar el nombre de la tarea en edición
  const hasCompletedTasks = taskItems.some(task => task.done);

  function createNewTask(taskName) {
    if (!taskName.trim()) {
      // No se agrega si el nombre está vacío o solo contiene espacios en blanco
      return;
    }    
    if (taskItems.some(task => task.name === taskName)) {
      // Ya existe una tarea con el mismo nombre, no se agrega
      return;
    }  
    const lastTaskId = taskItems.length > 0 ? taskItems[taskItems.length - 1].id : 0;
    const newTask = { id: lastTaskId + 1, name: taskName, done: false };
    setTaskItems([...taskItems, newTask]);
  }

  function deleteTask(taskId) {
    setTaskItems(taskItems.filter(task => task.id !== taskId));
  }

  const toggleTask = task => {
    setTaskItems(
      taskItems.map(t => (t.id === task.id) ? {...t, done: !t.done} : t)
    );  
  }

  // Elimina cualquier mención de editingTaskContent en esta parte
  const editTask = (taskId, newTaskName) => {
    if (!newTaskName.trim()) {
      // No se edita si el nombre está vacío o solo contiene espacios en blanco
      return;
    }
  
    const isNameTaken = taskItems.some(
      task => task.name === newTaskName && task.id !== taskId
    );
  
    const isExistingName = taskItems.some(task => task.name === newTaskName);
  
    if (!isNameTaken && !isExistingName) {
      setEditingTaskId(taskId);
      setEditingTaskName(newTaskName);
    } else if (isNameTaken) {
      alert("Nombre de tarea ya existente en otra tarea");
    } else if (isExistingName && taskItems.some(task => task.id === taskId)) {
      setEditingTaskId(taskId);
      setEditingTaskName(newTaskName);
    } else {
      alert("El nombre ya existe en otra tarea");
    }
  };
  
  
  
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

 // Resto de tu código...

 return (
  <main className="bg-dark vh-100 text-white">
    <Container>   
    <TaskCreator
      createNewTask={createNewTask}
      editingTask={taskItems.find(task => task.id === editingTaskId)}
      editingTaskId={editingTaskId}
      setEditingTaskId={setEditingTaskId}
      taskItems={taskItems} // Pasa taskItems como una propiedad
      setTaskItems={setTaskItems} // Pasa setTaskItems como una propiedad
    />
      <TaskTable
        task={showComplete ? taskItems : taskItems.filter(task => !task.done)} // Ajusta la lógica aquí
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        editTask={editTask}
        editingTaskId={editingTaskId}
        editingTaskName={editingTaskName}
      />
      <VisibilityControl
        isChecked={showComplete}
        setShowCompleted={(checked) => setShowCompleted(checked)}
        clearTask={clearTask}
        hasCompletedTasks={hasCompletedTasks}
      />
      {showComplete === true && (
        <TaskTable
          task={taskItems}
          toggleTask={toggleTask}
          showComplete={showComplete}
          deleteTask={deleteTask}
          editTask={editTask}
          editingTaskId={editingTaskId}
          editingTaskName={editingTaskName} // Agrega esta línea
        />
      )}
    </Container>
  </main>
);
}


//https://youtu.be/sjrK6RA65eQ?t=5116
export default App;
