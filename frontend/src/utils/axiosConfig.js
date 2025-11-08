// src/utils/axiosConfig.js
import axios from 'axios';

// Set base URL
axios.defaults.baseURL = 'https://vibe-commerce-eycx.onrender.com/api';

// Function to set auth token (call this after login)
export const setAuthToken = (token) => {
   if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
   } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
   }
};

// Initialize token from localStorage on app start
const token = localStorage.getItem('token');
if (token) {
   setAuthToken(token);
}

// Request interceptor
axios.interceptors.request.use(
   (config) => {
      // Add timestamp for cache busting if needed
      config.params = {
         ...config.params,
         _t: Date.now()
      };
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

// The old response interceptor is now removed and handled in src/store/interceptor.js

export default axios;