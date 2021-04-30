// Contains the Form component handles addding of the new Item to the list
import React, { useState } from "react";

function Form(props) {
  
  // title holds the title of the new to do to be added
  const [title, setTitle] = useState("");

  // Handles the input chnage in the new task input text box
  function handleChange(e) {
    setTitle(e.target.value);
  }

  // Handles the form submission of the new tasks
  function handleSubmit(e) {
    // Prevent the default behavior of the page reload after form submission
    e.preventDefault();
    // Basic simple check to ignore adding the empty title
    if (title) {
      //Place your add item to the list
      props.addTask(title);
      // Reset the title after adding the task to the state
      setTitle("");
    }
  }

  // Render the Form component
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={title}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
