// src/store/api/shopApi.js
import axios from 'axios';

export const shopApi = {
  addShop: (shopData) => {
    return axios.post('/shop/addShop', shopData);
  },
  
  // You might want to add these later
  getShop: () => {
    return axios.get('/shop/getShop');
  },
  
  updateShop: (shopData) => {
    return axios.put('/shop/updateShop', shopData);
  }
};