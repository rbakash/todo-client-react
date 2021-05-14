// Main component similar to app.component in angular
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import todoListService from "./services/todoListService";

// Constant list of filters
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.isCompleted,
  Completed: (task) => task.isCompleted,
};

// Filter names to filter out the component state
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  // Tasks - contains list of the all the To do's and setTasks is the function to update it
  const [tasks, setTasks] = useState(props.tasks);
  // Set the default filter as ALL
  const [filter, setFilter] = useState("All");

  // Handle the completed checkbox
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // Toggle the checkbox value
        task.isCompleted = task.isCompleted === 1 ? 0 : 1;

        // Update the server
        todoListService
          .updateTask(id, task)
          .then((response) => console.log(response.data.message))
          .catch((error) => console.error(error));

        return { ...task };
      }
      return task;
    });
    // Set the component state to new updated Tasks
    setTasks(updatedTasks);
  }

  // Handle the deletion of the item event
  function deleteTask(id) {
    // Delete it in DB
    todoListService
      .deleteTask(id)
      .then((response) => console.log(response))
      .catch((error) => console.error(error));

    // Filter out the remaining Tasks based on the task Id
    const remainingTasks = tasks.filter((task) => id !== task.id);
    // Update the state
    setTasks(remainingTasks);
  }

  // Handle the edit item event
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // Save the new name
        task.title = newName;
        // Update the DB
        todoListService
          .updateTask(id, task)
          .then((response) => console.log(response.data.message))
          .catch((error) => console.error(error));
        return { ...task, title: newName };
      }
      // Return the new updated task
      return task;
    });
    // Set the updated task
    setTasks(editedTaskList);
  }

  // Component mount just like ngOnit in angular, after the component is rendered
  useEffect(() => {
    // Fetch all the todo's and set the state
    todoListService
      .getAllTodoTasks()
      .then((res) => {
        setTasks([...res.data.data]);
      })
      .catch((error) => console.error(error));
  }, []);

  // To create list of todo's with the given filter
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

  // Create the list of filter buttons
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      title={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  // Count the number of the Remaining task in the given category
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  // Handle adding of the new task event
  function addTask(name) {
    // Construct the Object from the given name
    let newTask = { title: name, isCompleted: 0 };

    todoListService.addTask(newTask).then((response) => {
      newTask.id = response.data.data["insertId"];
      // Update the state
      setTasks([...tasks, newTask]);
    });

    // Update the server
  }
  // Render the App component
  return (
    <div className="todoapp stack-large">
      <h1>Todo</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading">{headingText}</h2>
      <ul className="todo-list stack-large stack-exception">{taskList}</ul>
    </div>
  );
}

export default App;
