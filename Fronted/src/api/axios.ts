import axios, { InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "https://event-finder-6.onrender.com/api", // ✅ Direct backend URL
  withCredentials: true,
});

instance.interceptors.request.use((req: InternalAxiosRequestConfig) => {
  if (!req.headers) {
    req.headers = new axios.AxiosHeaders();
  }

  // 🔒 Token add kar raha hai agar login hua hai
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.set("Authorization", `Bearer ${token}`);
  }

  return req;
});

export default instance;