import axios from "axios";

const apiBaseUrl = "http://localhost:8080";

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
