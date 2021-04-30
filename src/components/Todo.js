import React,{ useState } from "react";

// To do list component
export default function Todo(props) {

    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState('');

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
        </div>
        <div className="btn-group">
          <button type="button" className="btn" onClick={() => setEditing(true)}>
            Edit
          </button>
          <button type="button" className="btn btn__danger" onClick={() => props.deleteTask(props.id)}>
            Delete
          </button>
        </div>
      </div>
      );

    //   Set the newname to component name
      function handleChange(e) {       
        setNewName(e.target.value);
      }

      // Handle the edit save event
      function handleSubmit(e) {
        e.preventDefault();
        console.log(props.id, newName);
         // Update the DB 
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);
      }

  return (
     <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
  );
}
