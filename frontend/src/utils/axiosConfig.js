// src/utils/axiosConfig.js
import axios from 'axios';

// Set base URL - update this to match your backend URL
axios.defaults.baseURL = 'http://localhost:5000/api'; // Adjust port if different

// Add token to requests if it exists
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Add request interceptor to handle errors
axios.interceptors.request.use(
  (config) => {
    // You can add any request modifications here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      // You can redirect to login page here if needed
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axios;