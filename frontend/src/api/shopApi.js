import axios from '../utils/axiosConfig'; // <-- FIX

const BASE_URL = '/shop'; // Define a base URL for this API

export const shopApi = {
  addShop: (shopData) => {
    return axios.post(`${BASE_URL}/addShop`, shopData); // Use BASE_URL
  },
  
  getShop: () => {
    return axios.get(`${BASE_URL}/getShop`); // Use BASE_URL
  },
  
  updateShop: (shopData) => {
    return axios.put(`${BASE_URL}/updateShop`, shopData); // Use BASE_URL
  }
};