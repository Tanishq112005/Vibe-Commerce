// src/store/api/itemsApi.js
import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api'; // Adjust based on your backend URL
export const itemsApi = {
  getItems: () => {
    return axios.get(`${BASE_URL}/items/getItems`);
  },
};