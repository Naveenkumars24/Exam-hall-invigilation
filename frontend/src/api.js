import axios from "axios";

const API = axios.create({
  baseURL: "https://exam-hall-invigilation.onrender.com/api", // your backend URL
});

// Add JWT token automatically if stored
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
