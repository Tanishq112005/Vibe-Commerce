// src/store/api/authApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Adjust based on your backend URL

export const authApi = {
  login: (email, password) => {
    return axios.post(`${BASE_URL}/auth/login`, { email, password });
  },
  
  signup: (userData) => {
    return axios.post(`${BASE_URL}/auth/signUp`, userData);
  },
};