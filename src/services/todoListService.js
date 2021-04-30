import axios from "axios";

// Local server endpoint
// const apiBaseUrl = "http://localhost:8080";
// Google cloud server endpoint
const apiBaseUrl ="http://35.209.43.217/api/v1";

const TodoListService = {
  getAllTodoTasks: function getAllTodoTasks() {
    return axios.get(`${apiBaseUrl}/tasks`);
  },

  updateTask: function updateTask(taskId, task) {
    return axios.put(`${apiBaseUrl}/task/${taskId}`, task);
  },
  deleteTask: function deleteTask(taskId) {
    return axios.delete(`${apiBaseUrl}/task/${taskId}`);
  },
  addTask: function addTask(newTask) {
    return axios.post(`${apiBaseUrl}/task`, newTask);
  },
};

export default TodoListService;
