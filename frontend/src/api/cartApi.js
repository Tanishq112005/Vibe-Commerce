
import axios from 'axios';

export const cartApi = {
  getCart: () => {
    return axios.get('/cart/get');
  },
  
  addItem: (item_id, quantity) => {
    return axios.post('/cart/add', { item_id, quantity });
  },
  
  updateItem: (item_id, quantity) => {
    return axios.put('/cart/update', { item_id, quantity });
  },
  
  deleteItem: (item_id) => {
    return axios.delete(`/cart/delete/${item_id}`);
  },
};