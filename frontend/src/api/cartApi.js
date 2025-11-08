// src/api/cartApi.js
import axios from '../utils/axiosConfig';

const BASE_URL = '/cart';

export const cartApi = {
  getCartItems: () => {
    return axios.get(`${BASE_URL}/`);
  },

  addToCart: (itemData) => {
    return axios.post(`${BASE_URL}/add`, itemData);
  },

  updateCartItem: (item_id, quantity) => {
    console.log(item_id) ; 
    return axios.put(`${BASE_URL}/update`, { 
      item_id : item_id, 
      quantity : quantity });
  },

  removeFromCart: (itemId) => {
    return axios.delete(`${BASE_URL}/remove/${itemId}`);
  },

  clearCart: () => {
    return axios.delete(`${BASE_URL}/clear`);
  }
};