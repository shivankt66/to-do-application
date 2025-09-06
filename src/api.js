import axios from "axios";

const API = axios.create({
  baseURL: process.env.API_URL || "http://localhost:5000/api",
});


// Automatically add token if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response.status === 401) {
      // Token expired → log out user or ask to login again
      alert("Session expired. Please login again.");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);


export default API;
