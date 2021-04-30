// Main component similar to app.component in angular
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.isCompleted,
  Completed: (task) => task.isCompleted,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

// const baseUrl ='http://35.208.206.47/api/v1'
const baseUrl = "http://localhost:8080";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");


  // Handle the completed checkbox
  function toggleTaskCompleted(id) {
    console.log("inside toggle");
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted

        // Make the update call to the server
        task.isCompleted = task.isCompleted === 1 ? 0 : 1;
        
          // .then((response) => console.log(response.data.message));

        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // Hadle the deletion of the item
  function deleteTask(id) {
    axios
      .delete(`${baseUrl}/item/${id}`)
      .then((response) => console.log(response));
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  // Handle the edit item
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // Update the DB
        task.title = newName;
        axios
          .put(`${baseUrl}/item/${id}`, task)
          .then((response) => console.log(response.data.message));
        return { ...task, title: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  // Component mount just like ngOnit in angular
  useEffect(() => {
    axios.get(`${baseUrl}/items`).then((res) => {
      setTasks([...res.data.data]);
    });
  }, []);

  // To create list of todo's
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        title={task.title}
        isCompleted={task.isCompleted}
        key={nanoid()}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      title={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));
  
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;


  // Handle adding of the new task
  function addTask(name) {
    const newTask = { title: name, isCompleted: 0 };
    console.log(newTask);
    setTasks([...tasks, newTask]);
    // Call the POST API method
    axios
      .post(`${baseUrl}/item`, newTask)
      .then((response) => console.log(response));
  }
  // Render the App component
  return (
    <div className="todoapp stack-large">
      <h1>Todo</h1>
      <Form addTask={addTask} />
      {/* <Form/> */}
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading">{headingText}</h2>
      <ul className="todo-list stack-large stack-exception">{taskList}</ul>
    </div>
  );
}

export default App;
