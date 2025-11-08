// src/api/orderApi.js
import axios from '../utils/axiosConfig';

const BASE_URL = '/orders';

export const orderApi = {
  createOrder: (orderData) => {
    return axios.post(`${BASE_URL}/create`, orderData);
  },

  getMyOrders: () => {
    return axios.get(`${BASE_URL}/my-orders`);
  },

  removeOrder: (orderId) => {
    return axios.delete(`${BASE_URL}/${orderId}`);
  },

  getOrderById: (orderId) => {
    return axios.get(`${BASE_URL}/${orderId}`);
  }
};