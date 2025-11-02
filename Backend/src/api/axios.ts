// src/api/axios.ts
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend base
  timeout: 10000,
});

// Attach token automatically (if present)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("ef_token");
  if (token) {
    if (!req.headers) req.headers = {};
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;