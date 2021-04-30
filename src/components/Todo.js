import React,{ useState } from "react";

// To do list component
export default function Todo(props) {
  // Store the Edit boolean - which is used to render the view or edit template once the edit button is clicked
    const [isEditing, setEditing] = useState(false);
    // Stores the updated name for the given to do lists 
    const [newName, setNewName] = useState('');

    // Edit template
    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="todo-label" htmlFor={props.id}>
              New name for {props.title}
            </label>
            <input id={props.id} className="todo-text" type="text" value={newName} onChange={handleChange} />
          </div>
          <div className="btn-group">
            <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
              Cancel
              <span className="visually-hidden">renaming {props.title}</span>
            </button>
            <button type="submit" className="btn btn__primary todo-edit" >
              Save
              <span className="visually-hidden">new name for {props.title}</span>
            </button>
          </div>
        </form>
      );
// View template
      const viewTemplate = (
        <div className=" stack-small">
        <div className="c-cb">
          <input
            id={props.id}
            type="checkbox"
            defaultChecked={props.isCompleted === 0 ? false : true}
            onChange={() => props.toggleTaskCompleted(props.id)}
          />
          <label className="todo-label">{props.title}</label>
          <button type="button mr-2" className="btn" onClick={() => setEditing(true)}>
            Edit
          </button>
          <button type="button" className="btn btn__danger" onClick={() => props.deleteTask(props.id)}>
            Delete
          </button>
        </div>
        
      </div>
      );

    //  Handle the  updated name change event 
      function handleChange(e) {     
        // Set the newname to component name - which will be used once the save button is clicked  
        setNewName(e.target.value);
      }

      // Handle the edit save event
      function handleSubmit(e) {
        // Prevent the default behavior of the page reload after form submission
        e.preventDefault();
         // Update the task in the Database
        props.editTask(props.id, newName);
        // Reset the newName state variable nad the boolean
        setNewName("");
        setEditing(false);
      }
      // Render the todoList form based on the boolean
  return (
     <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
  );
}
