export const VisibilityControl = ({setShowCompleted, clearTask,isChecked,hasCompletedTasks}) =>{
   
   const handleDelete = () =>{
        if (hasCompletedTasks && window.confirm('Are you sure you want to delete it?')){
            clearTask()
        }
   }

    return (
    <div className="d-flex justify-content-between bg-secondary text-white text-center p-2 border-secondary">    
    <div className="form-check form-switch">
        <input 
            className="form-check-input"
            type='checkbox'  
            onChange={ (e) => setShowCompleted(e.target.checked)} checked={isChecked}
        />
        {" "} 
        <label>Show Task Done</label>
    </div>    
    {hasCompletedTasks && ( // Mostrar el botón y la confirmación solo si hay tareas completadas
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>
          Clear
        </button>
      )}    
    </div>    
   ) 
}

//<button className="btn btn-danger btn-sm" onClick={handleDelete} > 
  //      Clear
//</button>