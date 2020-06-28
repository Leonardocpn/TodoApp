import axios from "axios";

const api = axios.create({
  baseURL: "https://us-central1-todoapp-firebase-72c4a.cloudfunctions.net/api",
});

export default api;
