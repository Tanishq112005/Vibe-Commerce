import axios from '../utils/axiosConfig'; // <-- FIX

const BASE_URL = '/items'; // Define a base URL for this API

export const shopItemsApi = {
  getItems: () => {
    return axios.get(`${BASE_URL}/getItems`); // Use BASE_URL
  },
  
  addItem: (itemData) => {
    return axios.post(`${BASE_URL}/add`, itemData); // Use BASE_URL
  },
  
  updateItem: (id, updatedFields) => {
    return axios.put(`${BASE_URL}/update/${id}`, updatedFields); // Use BASE_URL
  },
  
  deleteItem: (id) => {
    return axios.delete(`${BASE_URL}/delete/${id}`); // Use BASE_URL
  },

  shopKeeperItems : () => {
    return axios.get(`${BASE_URL}/getShopkeeperItems`); // Use BASE_URL
  }
};