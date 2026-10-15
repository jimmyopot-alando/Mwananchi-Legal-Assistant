// frontend/src/utils/apiClient.js

import axios from "axios";

// Create an Axios instance with default settings
const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust to match your backend server
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (optional: add auth tokens, logging, etc.)
apiClient.interceptors.request.use(
  (config) => {
    // Example: attach token if available
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (optional: handle errors globally)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
