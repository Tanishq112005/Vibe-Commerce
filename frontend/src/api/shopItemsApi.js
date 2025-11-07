// src/store/api/shopItemsApi.js
import axios from 'axios';

export const shopItemsApi = {
  getItems: () => {
    return axios.get('/items/getItems');
  },
  
  addItem: (itemData) => {
    return axios.post('/items/add', itemData);
  },
  
  updateItem: (id, updatedFields) => {
    return axios.put(`/items/update/${id}`, updatedFields);
  },
  
  deleteItem: (id) => {
    return axios.delete(`/items/delete/${id}`);
  },

  shopKeeperItems : () => {
    return axios.get('/items/getShopkeeperItems');
  }
};