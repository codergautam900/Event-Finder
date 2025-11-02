import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:5000/api", // Backend base URL
    timeout: 10000,
});
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("ef_token");
    if (token) {
        req.headers = req.headers || {};
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});
export default API;
