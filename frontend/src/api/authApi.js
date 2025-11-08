// src/store/api/authApi.js
import axios from '../utils/axiosConfig';
import { setAuthToken } from '../utils/axiosConfig';

const BASE_URL = '/auth';

export const authApi = {
  login: async (email, password) => {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    
    // Automatically set token after successful login
    if (response.data.token) {
      setAuthToken(response.data.token);
    }
    
    return response;
  },

  signup: async (userData) => {
    const response = await axios.post(`${BASE_URL}/signUp`, userData);
    
    // Automatically set token after successful signup if returned
    if (response.data.token) {
      setAuthToken(response.data.token);
    }
    
    return response;
  },

  logout: () => {
    setAuthToken(null);
  }
};