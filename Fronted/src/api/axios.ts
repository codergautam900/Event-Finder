// src/api/axios.ts
import axios, { InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

instance.interceptors.request.use((req: InternalAxiosRequestConfig) => {
  if (!req.headers) {
    req.headers = new axios.AxiosHeaders();
  }

  // example: add token if needed
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.set("Authorization", `Bearer ${token}`);
  }

  return req;
});

export default instance;