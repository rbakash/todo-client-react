import axios from "axios";

const apiBaseUrl = "http://localhost:8080";

export function getList() {
    return fetch('http://35.208.206.47/api/v1/add')
      .then(data => data.json())
  }

  export function updateItem(itemId){
    return axios
    .put(`${apiBaseUrl}/item/${id}`, task)
  }